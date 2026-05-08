export type CourseCardProps = {
  title: string;
  primaryPrice: string;
  primaryPriceLabel: string;
  secondaryPrice: string;
  secondaryPriceLabel: string;
  features: string[];
  description: string;
  featureIconSrc: string;
  featureIconAlt: string;
  primaryButtonText: string;
  secondaryButtonText: string;
};

export const CourseCard = (props: CourseCardProps) => {
  return (
    <div className="bg-white box-border caret-transparent flex flex-col min-h-[auto] min-w-[auto] outline-[3px] border border-gray-100 p-10 rounded-[40px] border-solid">
      <h4 className="text-sky-900 text-xl font-bold box-border caret-transparent leading-7 min-h-[auto] min-w-[auto] outline-[3px] mb-4">
        <span className="box-border caret-transparent outline-[3px]">
          {props.title}
        </span>
      </h4>

      <div className="box-border caret-transparent gap-x-4 flex flex-col min-h-[auto] min-w-[auto] outline-[3px] gap-y-4 mb-8">
        <div className="items-baseline box-border caret-transparent gap-x-1 flex min-h-[auto] min-w-[auto] outline-[3px]">
          <span className="text-sky-900 text-[33.6px] font-bold box-border caret-transparent block leading-[36.96px] min-h-[auto] min-w-[auto] outline-[3px]">
            {props.primaryPrice}
          </span>
          <span className="text-gray-500 text-sm box-border caret-transparent block leading-5 min-h-[auto] min-w-[auto] outline-[3px]">
            {props.primaryPriceLabel}
          </span>
        </div>

        <div className="items-baseline box-border caret-transparent gap-x-1 flex min-h-[auto] min-w-[auto] outline-[3px]">
          <span className="text-sky-900 text-[33.6px] font-bold box-border caret-transparent block leading-[36.96px] min-h-[auto] min-w-[auto] outline-[3px]">
            <span className="box-border caret-transparent outline-[3px]">
              {props.secondaryPrice}
            </span>
          </span>
          <span className="text-gray-500 text-sm box-border caret-transparent block leading-5 min-h-[auto] min-w-[auto] outline-[3px]">
            <span className="box-border caret-transparent outline-[3px]">
              {props.secondaryPriceLabel}
            </span>
          </span>
        </div>
      </div>

      <ul className="box-border caret-transparent grow list-none min-h-[auto] min-w-[auto] outline-[3px] mb-10 pl-0">
        {props.features.map((feature, index) => (
          <li
            key={`${feature}-${index}`}
            className={`text-sm items-center box-border caret-transparent gap-x-3 flex leading-5 outline-[3px] gap-y-3${index > 0 ? " mt-4" : ""}`}
          >
            <img
              src={props.featureIconSrc}
              alt={props.featureIconAlt}
              className="text-green-600 box-border caret-transparent h-[18px] max-w-full min-h-[auto] min-w-[auto] outline-[3px] w-[18px]"
            />
            <span className="box-border caret-transparent block min-h-[auto] min-w-[auto] outline-[3px]">
              {feature}
            </span>
          </li>
        ))}
      </ul>

      <div className="text-gray-500 text-sm italic bg-gray-50 box-border caret-transparent leading-[22.75px] min-h-[auto] min-w-[auto] outline-[3px] border border-gray-100 mb-6 p-4 rounded-xl border-solid">
        <span className="box-border caret-transparent outline-[3px]">
          {props.description}
        </span>
      </div>

      <button className="text-amber-600 font-bold bg-amber-50 caret-transparent block min-h-[auto] min-w-[auto] outline-[3px] text-center w-full px-0 py-4 rounded-full hover:text-amber-700 hover:bg-amber-100">
        {props.primaryButtonText}
      </button>
      <button className="text-sky-700 font-semibold bg-sky-50 caret-transparent block min-h-[auto] min-w-[auto] outline-[3px] text-center w-full mt-3 px-0 py-4 rounded-full hover:text-sky-900 hover:bg-sky-100">
        {props.secondaryButtonText}
      </button>
    </div>
  );
};
