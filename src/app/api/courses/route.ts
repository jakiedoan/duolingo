import { prisma } from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const authorizationToken = request.headers.get('authorization');

  if (!authorizationToken) {
    let error_response = {
      status: 'Error.',
      message: 'Unauthorized. Please provide the bearer token.',
    };

    return new NextResponse(JSON.stringify(error_response), {
      status: 401,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const courses = await prisma.courses.findMany();

  return NextResponse.json({
    status: 'Success.',
    data: courses,
  });
}
