export type TestimonialCardProps = {
  testimonial: string;
  name: string;
  subtitle: string;
  initials: string;
  initialsVariant: string;
  starIconUrl: string;
  starAlt: string;
  rating: string;
};

export const TestimonialCard = (props: TestimonialCardProps) => {
  return (
    <div className="bg-slate-50 box-border caret-transparent gap-x-4 flex flex-col min-h-[auto] min-w-[auto] opacity-0 outline-[3px] gap-y-4 translate-y-8 border border-gray-100 p-8 rounded-3xl border-solid">
      <div className="box-border caret-transparent gap-x-0.5 flex min-h-[auto] min-w-[auto] outline-[3px] gap-y-0.5 mb-4">
        {Array.from({ length: Number(props.rating) }).map((_, index) => (
          <img
            key={index}
            src={props.starIconUrl}
            alt={props.starAlt}
            className="text-amber-500 box-border caret-transparent h-4 outline-[3px] w-4"
          />
        ))}
      </div>
      <p className="text-gray-700 box-border caret-transparent grow leading-[26px] min-h-[auto] min-w-[auto] outline-[3px]">
        {props.testimonial}
      </p>
      <div className="items-center box-border caret-transparent gap-x-3 flex min-h-[auto] min-w-[auto] outline-[3px] gap-y-3 mt-2">
        <div
          className={`text-sm font-bold items-center box-border caret-transparent flex shrink-0 h-10 justify-center leading-5 min-h-[auto] min-w-[auto] outline-[3px] w-10 rounded-full ${props.initialsVariant}`}
        >
          {props.initials}
        </div>
        <div className="box-border caret-transparent min-h-[auto] min-w-[auto] outline-[3px]">
          <p className="text-sm font-bold box-border caret-transparent leading-[17.5px] outline-[3px]">
            {props.name}
          </p>
          <p className="text-gray-400 text-xs box-border caret-transparent leading-4 outline-[3px]">
            {props.subtitle}
          </p>
        </div>
      </div>
    </div>
  );
};
