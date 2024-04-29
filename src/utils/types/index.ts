import { Courses, Native_Language } from '@prisma/client';

export type WindowDimension = {
  width: number | undefined;
  height: number | undefined;
};

export type NativeCourses = Native_Language & {
  courses: Courses[];
};
