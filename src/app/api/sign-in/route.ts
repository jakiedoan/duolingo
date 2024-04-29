import { prisma } from '@/lib/prisma';
import { compare } from 'bcrypt';
import { NextRequest, NextResponse } from 'next/server';
import { ZodError, z } from 'zod';

const signInSchema = z.object({
  email: z.string().email({ message: 'Invalid email address.' }),
  password: z.string(),
});

export async function POST(request: NextRequest) {
  try {
    const json = await request.json();

    const { email, password } = signInSchema.parse(json);

    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (!user) {
      let error_response = {
        status: 'Error.',
        message: `There is no Duolingo account associated with ${email}. Please try again.`,
      };

      return new NextResponse(JSON.stringify(error_response), {
        status: 404,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) {
      let error_response = {
        status: 'Error.',
        message: 'Wrong password. Please try again.',
      };

      return new NextResponse(JSON.stringify(error_response), {
        status: 401,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    let json_response = {
      status: 'Success.',
      data: user,
    };

    return new NextResponse(JSON.stringify(json_response), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error: any) {
    if (error instanceof ZodError) {
      let error_response = {
        status: 'Error.',
        message: error.flatten().fieldErrors,
      };

      return new NextResponse(JSON.stringify(error_response), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    let error_response = {
      status: 'Error.',
      message: error.message,
    };
    return new NextResponse(JSON.stringify(error_response), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
