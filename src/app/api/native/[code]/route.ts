import { prisma } from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

type Props = { code: string };

export async function GET(request: NextRequest, { params }: { params: Props }) {
  const code = params.code;

  const native = await prisma.native_Language.findUnique({
    where: {
      code: code,
    },
    include: {
      courses: true,
    },
  });

  // return NextResponse.json({
  //   status: 'Success.',
  //   data: native,
  // });

  let json_response = {
    status: 'Success.',
    data: native,
  };

  return new NextResponse(JSON.stringify(json_response), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}
