import { useQuery } from "@animaapp/playground-react-sdk";
import { CourseInvestmentItem } from "@/sections/BookingSection/components/CourseInvestmentItem";

export const CourseInvestmentList = () => {
  const { data: courses, isPending, error } = useQuery("Course", {
    where: { switch: 1 },
    orderBy: { order: "asc" },
  });

  if (isPending) {
    return (
      <div className="box-border caret-transparent mb-12">
        <p className="text-center text-gray-400 py-8">Loading course offerings…</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="box-border caret-transparent mb-12">
        <p className="text-center text-red-400 py-8">Could not load course offerings.</p>
      </div>
    );
  }

  if (!courses || courses.length === 0) {
    return (
      <div className="box-border caret-transparent mb-12">
        <p className="text-center text-gray-400 py-8">No course offerings available.</p>
      </div>
    );
  }

  return (
    <div className="box-border caret-transparent mb-12">
      {courses.map((course, index) => (
        <CourseInvestmentItem
          key={course.id}
          title={course.title}
          duration={course.duration}
          groupPrice={course.groupPrice}
          groupPriceNote={course.groupPriceNote ?? ""}
          privatePrice={course.privatePrice ?? undefined}
          privatePriceNote={course.privatePriceNote ?? undefined}
          button1Text={course.button1Text ?? "Contact Now"}
          button2Text={course.button2Text ?? "Group Rate"}
          courseValue={course.title}
          containerClassName={index > 0 ? "mt-6" : undefined}
        />
      ))}
    </div>
  );
};
