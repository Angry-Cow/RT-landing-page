export type PricingItemProps = {
  title: string;
  duration: string;
  price: string;
  priceLabel: string;
  groupPrice: string;
  groupPriceLabel: string;
  containerVariant?: string;
  primaryButtonText: string;
  secondaryButtonText: string;
};

export const PricingItem = (props: PricingItemProps) => {
  return (
    <div
      className={`items-center box-border caret-transparent flex justify-between outline-[3px] border border-gray-100 p-6 rounded-2xl border-solid ${props.containerVariant || ""}`.trim()}
    >
      <div className="box-border caret-transparent min-h-[auto] min-w-[auto] outline-[3px]">
        <h4 className="text-xl font-bold box-border caret-transparent leading-7 outline-[3px] mb-1">
          {props.title}
        </h4>
        <p className="text-gray-500 text-sm box-border caret-transparent leading-5 outline-[3px]">
          {props.duration}
        </p>
      </div>
      <div className="box-border caret-transparent shrink-0 min-h-[auto] min-w-[auto] outline-[3px] text-right ml-4">
        <p className="text-sky-900 text-[14.4px] font-bold box-border caret-transparent outline-[3px]">
          {props.price}
          <span className="text-gray-500 text-xs font-normal box-border caret-transparent leading-4 outline-[3px] ml-1">
            {props.priceLabel}
          </span>
        </p>
        <div className="box-border caret-transparent h-2 outline-[3px]"></div>
        <p className="text-sky-900 text-[14.4px] font-bold box-border caret-transparent outline-[3px]">
          {props.groupPrice}
          <span className="text-gray-500 text-xs font-normal box-border caret-transparent leading-4 outline-[3px] ml-1">
            {props.groupPriceLabel}
          </span>
        </p>
        <button className="text-amber-600 text-[10.8px] font-bold bg-transparent caret-transparent block tracking-[0.6px] leading-4 outline-[3px] text-center uppercase mt-1 p-0 hover:text-amber-700">
          {props.primaryButtonText}
        </button>
        <button className="text-sky-700 text-[10.8px] font-semibold bg-transparent caret-transparent block tracking-[0.5px] leading-4 outline-[3px] text-center uppercase mt-1 p-0 hover:text-sky-900">
          {props.secondaryButtonText}
        </button>
      </div>
    </div>
  );
};
