'use server';

import { cookies } from 'next/headers';

type TokenRequest = {
  token: string;
  refreshToken: string;
};

export async function createToken(request: TokenRequest) {
  cookies().set({
    name: 'sessionToken',
    value: request.token,
    httpOnly: true,
    sameSite: 'strict',
    secure: true,
  });

  cookies().set({
    name: 'refreshToken',
    value: request.refreshToken,
    httpOnly: true,
    sameSite: 'strict',
    secure: true,
  });
}
