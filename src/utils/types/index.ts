import { Courses, Native_Language, Progress, User } from '@prisma/client';

export type WindowDimension = {
  width: number | undefined;
  height: number | undefined;
};

export type NativeCourses = Native_Language & {
  courses: Courses[];
};

export type UserProgress = Progress & {
  active_course: Courses;
};

export type UserInfo = User & {
  courses: Courses[];
  progress: UserProgress;
};
