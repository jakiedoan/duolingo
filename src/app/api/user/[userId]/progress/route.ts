import { prisma } from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

type Props = { userId: string };

export async function GET(request: NextRequest, { params }: { params: Props }) {
  const id = params.userId;

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

  const courses = await prisma.user.findUnique({
    where: {
      id: id,
    },
    select: {
      progress: {
        include: {
          active_course: {
            include: {
              section: {
                include: {
                  units: {
                    include: {
                      levels: {
                        orderBy: {
                          order: 'asc',
                        },
                      },
                    },

                    orderBy: {
                      order: 'asc',
                    },
                  },
                },
                orderBy: {
                  order: 'asc',
                },
              },
            },
          },
        },
      },
    },
  });

  if (!courses) {
    let error_response = {
      status: 'Error.',
      message: 'User not found',
    };

    return new NextResponse(JSON.stringify(error_response), {
      status: 404,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  return NextResponse.json({
    status: 'Success.',
    data: courses.progress,
  });
}
