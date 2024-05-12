import { prisma } from '@/lib/prisma';
import { hash } from 'bcrypt';
import { ZodError, z } from 'zod';
import { NextRequest, NextResponse } from 'next/server';
import { encrypt } from '@/lib/auth';

const registerSchema = z.object({
  age: z.number().positive({ message: 'Please enter your real age.' }),
  name: z.string().optional(),
  email: z.string().email({ message: 'Invalid email address.' }),
  password: z.string().min(8, { message: 'Password to short.' }),
});

export async function POST(request: NextRequest) {
  try {
    const json = await request.json();

    const { age, name, email, password } = registerSchema.parse(json);

    const existingUser = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (existingUser) {
      let error_response = {
        status: 'Error.',
        message: 'Email already taken.',
      };

      return new NextResponse(JSON.stringify(error_response), {
        status: 409,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const hashedPassword = await hash(password, 10);
    const newUser = await prisma.user.create({
      data: {
        age,
        name,
        email,
        password: hashedPassword,
      },
    });

    const { password: newUserPassword, ...rest } = newUser;

    const token = await encrypt({ rest });

    // let data = { ...rest, token };

    let json_response = {
      status: 'Success.',
      data: { token },
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
