import { useScrollReveal } from "@/hooks/useScrollReveal";

export const ServicesSectionHeader = () => {
  const { ref, visible } = useScrollReveal();
  return (
    <div
      ref={ref}
      className={`text-center mb-16 transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
    >
      <p className="text-sky-900 text-sm font-bold tracking-[2.8px] uppercase mb-4">
        What We Offer
      </p>
      <h2 className="text-4xl font-bold font-inter leading-tight mb-4 md:text-5xl">
        Our Training Services
      </h2>
      <p className="text-gray-500 text-lg max-w-2xl mx-auto leading-relaxed">
        Comprehensive safety and defense training designed for civilians, professionals, and communities throughout New Jersey.
      </p>
    </div>
  );
};
