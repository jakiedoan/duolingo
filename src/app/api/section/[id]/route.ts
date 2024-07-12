import { prisma } from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

type Props = { id: string };

export async function GET(request: NextRequest, { params }: { params: Props }) {
  const id = params.id;

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

  const course = await prisma.section.findUnique({
    where: {
      id: id,
    },
    include: {
      units: {
        include: {
          levels: true,
        },

        orderBy: {
          order: 'asc',
        },
      },
    },
    
    // include: {
    //   units: {
    //     include: {
    //       lessons: true,
    //     },

    //     orderBy: {
    //       order: 'asc',
    //     },
    //   },
    // },
  });

  if (!course) {
    let error_response = {
      status: 'Error.',
      message: 'Section not found',
    };

    return new NextResponse(JSON.stringify(error_response), {
      status: 404,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  return NextResponse.json({
    status: 'Success.',
    data: course,
  });
}
