import { prisma } from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

type Props = { userId: string };

export async function GET(request: NextRequest, { params }: { params: Props }) {
  const userId = params.userId;

  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    include: {
      courses: true,
      progress: true,
    },
  });

  if (!user) {
    let error_response = {
      status: 'Failure.',
      message: 'User not exist.',
    };

    return new NextResponse(JSON.stringify(error_response), {
      status: 404,
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
}
