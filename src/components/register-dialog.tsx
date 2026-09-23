import { useState } from "react";
import type { Course, Student } from "@/lib/types";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type RegisterDialogProps = {
  courses: (Course & { isEnrolled?: boolean })[];
  student?: Student;
  onEnroll: (courseId: string, enrollTime: string) => void;
};

export function RegisterDialog({
  courses = [],
  student,
  onEnroll,
}: RegisterDialogProps) {
  const [open, setOpen] = useState(false);
  const [selectedCourseId, setSelectedCourseId] = useState("");

  const getCurrentTime = () => {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");

    return `${hours}:${minutes}`;
  };

  const [enrollTime, setEnrollTime] = useState(getCurrentTime);

  const availableCourses = courses.filter((course) => !course.isEnrolled);

  const selectedCourse = availableCourses.find(
    (course) => course.courseId === selectedCourseId,
  );

  const handleOpenChange = (isOpen: boolean) => {
    setOpen(isOpen);

    if (isOpen) {
      setEnrollTime(getCurrentTime());
      setSelectedCourseId("");
    }
  };

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!selectedCourseId) return;

    onEnroll(selectedCourseId, enrollTime);

    setOpen(false);
  }

  const studentFullName = student
    ? `${student.firstName} ${student.lastName}`
    : "ธรรมสรณ์ มีเที่ยง";

  const studentProgram = student?.program ?? "CPE";

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger>
        <Button>ลงทะเบียน</Button>
      </DialogTrigger>

      <DialogContent className="w-[95vw] max-w-md min-w-0 overflow-hidden">
        <form onSubmit={handleSubmit} className="w-full min-w-0 space-y-4">
          <DialogHeader>
            <DialogTitle>ลงทะเบียนรายวิชา</DialogTitle>

            <DialogDescription>กรอกข้อมูลเพื่อลงทะเบียน</DialogDescription>
          </DialogHeader>

          {/* วิชา */}
          <div className="w-full min-w-0 space-y-2">
            <Label htmlFor="course">วิชา</Label>

            <Select
              value={selectedCourseId}
              onValueChange={(value) => setSelectedCourseId(value ?? "")}
            >
              <SelectTrigger id="course" className="w-full min-w-0 max-w-full">
                <SelectValue placeholder="เลือกวิชา">
                  {selectedCourse && (
                    <span className="block min-w-0 truncate">
                      {selectedCourse.courseId} – {selectedCourse.courseTitle}
                    </span>
                  )}
                </SelectValue>
              </SelectTrigger>

              <SelectContent className="z-[60] w-[var(--radix-select-trigger-width)] max-w-[90vw]">
                {availableCourses.length === 0 ? (
                  <div className="p-2 text-center text-sm text-muted-foreground">
                    ลงทะเบียนครบทุกวิชาแล้ว
                  </div>
                ) : (
                  availableCourses.map((course) => (
                    <SelectItem key={course.courseId} value={course.courseId}>
                      <span className="block truncate">
                        {course.courseId} – {course.courseTitle}
                      </span>
                    </SelectItem>
                  ))
                )}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="enrollTime">เลือกเวลา</Label>

            <Input
              id="enrollTime"
              type="time"
              value={enrollTime}
              onChange={(e) => setEnrollTime(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="studentId">รหัสนักศึกษา</Label>

            <Input
              id="studentId"
              value={student?.studentId ?? "680610682"}
              readOnly
              className="bg-muted text-muted-foreground cursor-not-allowed"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="fullName">ชื่อ นศ.</Label>

            <Input
              id="fullName"
              value={studentFullName}
              readOnly
              className="bg-muted text-muted-foreground cursor-not-allowed"
            />
          </div>

          {/* โปรแกรม */}
          <div className="space-y-2">
            <Label htmlFor="program">โปรแกรม</Label>

            <Input
              id="program"
              value={studentProgram}
              readOnly
              className="bg-muted text-muted-foreground cursor-not-allowed"
            />
          </div>

          <DialogFooter>
            <Button type="submit" disabled={!selectedCourseId}>
              ยืนยัน
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
