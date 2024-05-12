import { prisma } from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

type Props = { user_id: string };

export async function GET(request: NextRequest, { params }: { params: Props }) {
  const userId = params.user_id;

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

  const progress = await prisma.progress.findUnique({
    where: {
      user_id: userId,
    },
    include: {
      active_course: true,
    },
  });

  let json_response = {
    status: 'Success.',
    data: progress,
  };

  return new NextResponse(JSON.stringify(json_response), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}

export async function PUT(request: NextRequest, { params }: { params: Props }) {
  try {
    const userId = params.user_id;

    const json = await request.json();

    const { activeCourseId } = json;

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
      include: {
        courses: true,
        progress: {
          include: {
            active_course: true,
          },
        },
      },
    });

    if (!user) {
      let error_response = {
        status: 'Error.',
        message: 'User not exist.',
      };

      return new NextResponse(JSON.stringify(error_response), {
        status: 404,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const updateProgress = await prisma.progress.update({
      where: {
        user_id: userId,
      },
      data: {
        active_course_id: activeCourseId,
      },
    });

    if (!user.courses.includes(activeCourseId)) {
      const course = await prisma.courses.findUnique({
        where: {
          id: activeCourseId,
        },
      });

      if (course) {
        await prisma.user.update({
          where: {
            id: userId,
          },
          data: {
            courses: {
              set: [...user.courses, course],
            },
          },
        });
      }
    }

    let json_response = {
      status: 'Success.',
      data: updateProgress,
    };

    return new NextResponse(JSON.stringify(json_response), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    let error_response = {
      status: 'Error.',
      message: error,
    };

    return new NextResponse(JSON.stringify(error_response), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
