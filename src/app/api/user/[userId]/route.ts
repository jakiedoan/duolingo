import { prisma } from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

type Props = { userId: string };

export async function GET(request: NextRequest, { params }: { params: Props }) {
  const userId = params.userId;

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

  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    // include: {
    //   courses: true,
      // progress: true
      // {
        // include: {
          // active_course: {
            
            // include: {
            //   section: {
            //     include: {
            //       units: {
            //         include: {
            //           lessons: true,
            //         },

            //         orderBy: {
            //           order: 'asc',
            //         },
            //       },
            //     },

            //     orderBy: {
            //       title: 'asc',
            //     },
            //   },
            // },
          // },
        // },
      // },
    // },
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
