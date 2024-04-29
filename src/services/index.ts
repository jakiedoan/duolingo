import { useCallback, useState } from 'react';
import axios, { AxiosError } from 'axios';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

const ROOT_URL = process.env.NEXT_PUBLIC_DATA_SOURCE_URL;

export const useFetchQuery = <T>(queryKey: string, queryUrl: string) => {
  async function queryFunction() {
    const result = await axios
      .get(ROOT_URL + queryUrl, {
        headers: { 'Content-Type': 'application/json' },
      })
      .then((response) => response.data.data);

    return result;
  }

  const { isPending, data, error } = useQuery<T>({
    queryKey: [queryKey!],
    queryFn: queryFunction,
    retry: 0,
  });

  return { isPending, error, data };
};

export const usePostQuery = <BodyData>(
  queryKey: string,
  query: string,
  onSuccessCallback?: () => void
) => {
  const queryClient = useQueryClient();
  const [data, setData] = useState<any>();
  const [error, setError] = useState<any>();

  const post = useCallback(
    async (data: BodyData) => {
      const result = await axios.post(ROOT_URL + query, data, {
        headers: { 'Content-Type': 'application/json' },
      });
      // .then((response) => {
      //   response.data.data;
      //   // setData(response.data.data);
      // }),

      return result;
    },
    [query]
  );

  const { isPending, mutate } = useMutation({
    mutationFn: post,
    onSuccess: (data) => {
      setData(data);
      onSuccessCallback!();
      queryClient.invalidateQueries({ queryKey: [queryKey] });
    },
    onError: (error: AxiosError) => {
      setError(error.response);
    },
  });

  return { isPending, error, mutate, data };
};

export const usePutQuery = <BodyData>(queryKey: string, query: string) => {
  const queryClient = useQueryClient();

  const edit = useCallback(
    async (data: BodyData) => {
      await axios
        .put(ROOT_URL + query, {
          data: data,
          headers: { 'Content-Type': 'application/json' },
        })
        .then((response) => response.data.data);
    },
    [query]
  );

  const { isPending, error, mutate } = useMutation({
    mutationFn: edit,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [queryKey] });
    },
  });

  return { isPending, error, mutate };
};

export const useDeleteQuery = <BodyData>(queryKey: string, query: string) => {
  const queryClient = useQueryClient();

  const remove = useCallback(
    async (data: BodyData) => {
      await axios
        .delete(ROOT_URL + query, {
          data: data,
          headers: { 'Content-Type': 'application/json' },
        })
        .then((response) => response.data.data);
    },
    [query]
  );

  const { isPending, error, mutate } = useMutation({
    mutationFn: remove,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [queryKey] });
    },
  });

  return { isPending, error, mutate };
};

export const useAsyncPostQuery = () => {};
