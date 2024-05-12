import { defaultLocale } from './../app/i18n/config';
import { useCallback, useState } from 'react';
import axios, { AxiosError } from 'axios';
import {
  QueryClient,
  QueryKey,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import { useSession } from '@/utils/provider/session';

const ROOT_URL = process.env.NEXT_PUBLIC_DATA_SOURCE_URL;

const axiosDefaultConfig = {
  headers: { 'Content-Type': 'application/json' },
};

const axiosAuthorizeConfig = (token: string) => {
  // const { token } = useSession();
  return {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  };
};

export const useFetchQuery = <T>(
  queryKey: string,
  queryUrl: string,
  authorize: boolean
) => {
  const { token } = useSession();

  async function queryFunction() {
    const result = await axios
      .get(
        ROOT_URL + queryUrl,
        authorize ? axiosAuthorizeConfig(token) : axiosDefaultConfig
      )
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
  authorize: boolean,
  onSuccessCallback: () => Promise<void> | null
  // token?: string
) => {
  const { token } = useSession();

  const queryClient = useQueryClient();
  const [data, setData] = useState<any>();
  const [error, setError] = useState<any>();

  const post = useCallback(
    async (data: BodyData) => {
      const response = await axios.post(
        ROOT_URL + query,
        data,
        authorize ? axiosAuthorizeConfig(token) : axiosDefaultConfig
      );
      return response.data.data;
    },
    [query]
  );

  const { mutateAsync, isPending } = useMutation({
    mutationFn: post,

    onSuccess: (data) => {
      setData(data);
      onSuccessCallback();
      queryClient.invalidateQueries({ queryKey: [queryKey] });
    },

    onError: (error: AxiosError) => {
      setError(error.response);
    },
  });

  return { mutateAsync, isPending, error, data };
};

export const usePutQuery = <BodyData>(
  queryKey: string,
  query: string,
  authorize: boolean
) => {
  const queryClient = useQueryClient();

  const { token } = useSession();

  const edit = useCallback(
    async (data: BodyData) => {
      await axios
        .put(
          ROOT_URL + query,
          data,
          authorize ? axiosAuthorizeConfig(token) : axiosDefaultConfig
        )
        .then((response) => response.data.data);
    },
    [query]
  );

  const { isPending, error, mutateAsync } = useMutation({
    mutationFn: edit,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [queryKey] });
    },
  });

  return { isPending, error, mutateAsync };
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

// export const useAsyncPostQuery = async () => {
//   const queryClient = new QueryClient()

// };
