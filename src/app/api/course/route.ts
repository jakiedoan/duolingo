import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET() {
  const courses = await prisma.courses.findMany();

  return NextResponse.json({
    status: 'Success.',
    data: courses,
  });
}
