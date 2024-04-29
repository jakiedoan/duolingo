import { Native_Language } from '@prisma/client';
import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET() {
  const native = await prisma.native_Language.findMany();

  let json_response = {
    status: 'Success.',
    data: native,
  };

  return new NextResponse(JSON.stringify(json_response), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}
