import type { Course, Student } from "@/lib/types";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "./ui/button";
import { Trash2 } from "lucide-react";

type CourseCardProps = {
  course: Course & { isEnrolled?: boolean };
  student?: Student;
  enrolledAt?: string;
  ondrop?: (courseId: string) => void;
  onCancel?: (courseId: string) => void;
};

export function CourseCard({
  course,
  student,
  enrolledAt,
  ondrop,
}: CourseCardProps) {
  const studentName =
    student?.firstName && student?.lastName
      ? `${student.firstName} ${student.lastName}`
      : "ธรรมสรณ์ มีเที่ยง";

  const studentProgram = student?.program ?? "CPE";
  return (
    <Card className="rounded-xl border border-gray-200 bg-card shadow-sm transition-all">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-1">
            <CardTitle className="text-base font-semibold leading-none tracking-tight">
              {course.courseTitle}
            </CardTitle>
            <CardDescription className="text-xs text-muted-foreground pt-1">
              รหัสวิชา: {course.courseId} · ผู้สอน:{" "}
              {course.instructors.join(", ")}
            </CardDescription>
          </div>

          {course.isEnrolled ? (
            <span
              className="shrink-0 rounded-full border px-3 py-0.5 text-xs font-medium transition-colors 
              bg-amber-100 text-amber-800 border-amber-300 
              dark:bg-purple-950/60 dark:text-purple-300 dark:border-purple-800"
            >
              ลงทะเบียนแล้ว
            </span>
          ) : (
            <span
              className="shrink-0 rounded-full border px-3 py-0.5 text-xs font-medium transition-colors 
              bg-purple-100 text-purple-700 border-purple-300 
              dark:bg-amber-950/60 dark:text-amber-300 dark:border-amber-800"
            >
              เปิดรับ
            </span>
          )}
        </div>
      </CardHeader>

      <CardContent className="flex items-end justify-between pt-0">
        <div className="space-y-1 text-xs text-muted-foreground">
          {" "}
          {course.isEnrolled && (
            <>
              {" "}
              <p>ชื่อ นศ.: {studentName}</p> <p>โปรแกรม: {studentProgram}</p>{" "}
              {enrolledAt && <p>ลงทะเบียนเมื่อ: {enrolledAt}</p>}{" "}
            </>
          )}{" "}
        </div>
        {course.isEnrolled && ondrop && (
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-rose-500 hover:text-rose-600 hover:bg-rose-50"
            onClick={() => ondrop(course.courseId)}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        )}
      </CardContent>
    </Card>
  );
}
