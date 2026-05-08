export type SectionHeaderProps = {
  containerClassName: string;
  eyebrowText: string;
  eyebrowAs: string;
  title: string;
  titleClassName: string;
  descriptionClassName: string;
  description: React.ReactNode;
  ctaText?: string;
  ctaButtonClassName?: string;
};

export const SectionHeader = (props: SectionHeaderProps) => {
  return (
    <div
      className={`box-border caret-transparent outline-[3px] text-center ${props.containerClassName}`}
    >
      {props.eyebrowAs === "span" ? (
        <span className="text-amber-600 text-xs font-bold box-border caret-transparent inline-block tracking-[1.2px] leading-4 outline-[3px] uppercase mb-3">
          {props.eyebrowText}
        </span>
      ) : (
        <p className="box-border caret-transparent outline-[3px] text-sky-900 text-sm font-bold tracking-[2.8px] leading-5 uppercase mb-4">
          {props.eyebrowText}
        </p>
      )}

      <h2
        className={`font-bold box-border caret-transparent outline-[3px] mb-4 ${props.titleClassName}`}
      >
        {props.title}
      </h2>

      <p className={props.descriptionClassName}>
        {props.description}
        {props.ctaText ? (
          <button className={props.ctaButtonClassName}>{props.ctaText}</button>
        ) : null}
      </p>
    </div>
  );
};
