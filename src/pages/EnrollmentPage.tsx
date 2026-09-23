import { useState } from "react";
import { CourseCard } from "@/components/course-card";
import { RegisterDialog } from "@/components/register-dialog";
import { courses as initialCourses, currentStudent } from "@/lib/mock-data";

export default function EnrollmentPage() {
  const [courseList, setCourseList] = useState(initialCourses);

  const handleEnroll = (courseId: string, enrollTime: string) => {
    setCourseList((prev) =>
      prev.map((course) =>
        course.courseId === courseId
          ? { ...course, isEnrolled: true, enrolledAt: enrollTime }
          : course,
      ),
    );
  };

  const handleDrop = (courseId: string) => {
    setCourseList((prev) =>
      prev.map((course) =>
        course.courseId === courseId
          ? { ...course, isEnrolled: false, enrolledAt: undefined }
          : course,
      ),
    );
  };

  return (
    <div className="space-y-4 p-4">
      <div className="flex items-center justify-between gap-4">
        <div className="flex flex-col">
          <h1 className="text-xl font-semibold">รายวิชาทั้งหมด</h1>
          <span className="text-sm text-muted-foreground font-medium">
            ธรรมสรณ์ มีเที่ยง (680610682)
          </span>
        </div>
        <RegisterDialog
          courses={courseList}
          student={currentStudent}
          onEnroll={handleEnroll}
        />
      </div>

      <div className="flex flex-col gap-4">
        {courseList.map((course) => (
          <CourseCard
            key={course.courseId}
            course={course}
            student={currentStudent}
            enrolledAt={(course as any).enrolledAt}
            ondrop={(course as any).isEnrolled ? handleDrop : undefined}
          />
        ))}
      </div>
    </div>
  );
}
