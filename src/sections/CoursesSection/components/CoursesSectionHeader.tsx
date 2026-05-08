import { useScrollReveal } from "@/hooks/useScrollReveal";

export const CoursesSectionHeader = () => {
  const { ref, visible } = useScrollReveal();
  return (
    <div
      ref={ref}
      className={`text-center mb-16 transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
    >
      <p className="text-sky-900 text-sm font-bold tracking-[2.8px] uppercase mb-4">
        Course Catalog
      </p>
      <h2 className="text-4xl font-bold font-inter leading-tight mb-4 md:text-5xl">
        Find the Right Course
      </h2>
      <p className="text-gray-500 text-lg max-w-2xl mx-auto leading-relaxed">
        From first aid to firearms — explore all available training programs and select the one that fits your needs.
      </p>
    </div>
  );
};
