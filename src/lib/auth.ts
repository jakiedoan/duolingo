import { SignJWT, base64url, jwtDecrypt, jwtVerify } from 'jose';
import { cookies } from 'next/headers';

const key = new TextEncoder().encode(process.env.AUTH_SECRET);

export async function encrypt(data: any) {
  return await new SignJWT(data)
    .setProtectedHeader({ alg: 'HS256', typ: 'JWT' })
    .setIssuedAt()
    .sign(key);
}

export async function decrypt(input: string): Promise<any> {
  const { payload } = await jwtVerify(input, key, {
    algorithms: ['HS256'],
  });

  return payload;
}

export async function getSession(session: string) {
  // const session = cookies().get('sessionToken')?.value;

  if (!session) return;

  return await decrypt(session);
}
