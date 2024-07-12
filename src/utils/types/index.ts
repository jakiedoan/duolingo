import {
  Courses,
  Lesson,
  Level,
  Native_Language,
  Progress,
  Section,
  Unit,
  User,
} from '@prisma/client';

export type WindowDimension = {
  width: number | undefined;
  height: number | undefined;
};

export type NativeCourses = Native_Language & {
  courses: Courses[];
};

export type SectionUnit = Unit & {
  levels: (UnitLevel & {
    completed: boolean;
  })[];
};

export type UnitLevel = Level & {
  lessons: Lesson[];
}[];

export type CourseSection = Section & {
  units: SectionUnit[];
};

export type UserCourse = Courses & {
  section: CourseSection[];
};

export type UserProgress = Progress & {
  active_course: Courses & {
    section: CourseSection[];
  };
};

export type UserInfo = User;
// & {
//   courses: UserCourse[];
//   progress: UserProgress;
// };
