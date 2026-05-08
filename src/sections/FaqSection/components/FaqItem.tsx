export type FaqItemProps = {
  question: string;
  answer: string;
  iconSrc: string;
  iconAlt: string;
};

export const FaqItem = (props: FaqItemProps) => {
  return (
    <div className="bg-white box-border caret-transparent outline-[3px] border-slate-200 border-b border-solid">
      <button className="items-center bg-transparent caret-transparent gap-x-4 flex justify-between outline-[3px] gap-y-4 text-left w-full px-6 py-5">
        <span className="text-slate-800 font-semibold box-border caret-transparent block leading-[22px] min-h-[auto] min-w-[auto] outline-[3px]">
          {props.question}
        </span>
        <span className="items-center bg-slate-100 box-border caret-transparent flex shrink-0 h-7 justify-center min-h-[auto] min-w-[auto] outline-[3px] w-7 rounded-full">
          <img
            src={props.iconSrc}
            alt={props.iconAlt}
            className="text-slate-500 box-border caret-transparent h-3.5 outline-[3px] w-3.5"
          />
        </span>
      </button>
      <div className="box-border caret-transparent max-h-0 opacity-0 outline-[3px] overflow-hidden">
        <div className="box-border caret-transparent outline-[3px] pb-5 px-6">
          <p className="text-slate-600 text-sm box-border caret-transparent leading-[22.75px] outline-[3px]">
            {props.answer}
          </p>
        </div>
      </div>
    </div>
  );
};
