export type FooterLinksColumnProps = {
  title: string;
  titleAsSpan?: boolean;
  listClassName: string;
  itemType: string;
  items: {
    text: string;
    href?: string;
    buttonClassName?: string;
    iconSrc?: string;
    iconAlt?: string;
    itemClassName?: string;
    textClassName?: string;
  }[];
};

export const FooterLinksColumn = (props: FooterLinksColumnProps) => {
  return (
    <div className="box-border caret-transparent min-h-[auto] min-w-[auto] outline-[3px]">
      <h5 className="text-amber-600 font-bold box-border caret-transparent outline-[3px] mb-6">
        {props.titleAsSpan ? (
          <span className="box-border caret-transparent outline-[3px]">
            {props.title}
          </span>
        ) : (
          props.title
        )}
      </h5>

      <ul
        className={`box-border caret-transparent list-none outline-[3px] pl-0 ${props.listClassName}`}
      >
        {props.items.map((item, index) => (
          <li
            key={index}
            className={
              item.itemClassName
                ? item.itemClassName
                : `box-border caret-transparent outline-[3px] ${index > 0 ? "mt-4" : ""}`.trim()
            }
          >
            {props.itemType === "link" ? (
              <a
                href={item.href}
                className="box-border caret-transparent outline-[3px] hover:text-white"
              >
                <span className="box-border caret-transparent outline-[3px]">
                  {item.text}
                </span>
              </a>
            ) : props.itemType === "button" ? (
              <button
                className={
                  item.buttonClassName ||
                  "text-sm bg-transparent caret-transparent leading-5 outline-[3px] text-center p-0 hover:text-white"
                }
              >
                <span className="box-border caret-transparent outline-[3px]">
                  {item.text}
                </span>
              </button>
            ) : (
              <>
                {item.iconSrc ? (
                  <span className="text-amber-500 box-border caret-transparent block shrink-0 min-h-[auto] min-w-[auto] outline-[3px] mt-0.5">
                    <img
                      src={item.iconSrc}
                      alt={item.iconAlt || "Icon"}
                      className="box-border caret-transparent h-4 outline-[3px] w-4"
                    />
                  </span>
                ) : null}
                <span
                  className={
                    item.textClassName ||
                    "box-border caret-transparent block min-h-[auto] min-w-[auto] outline-[3px]"
                  }
                >
                  {item.href ? (
                    <a
                      href={item.href}
                      className="box-border caret-transparent outline-[3px] hover:text-white"
                    >
                      {item.text}
                    </a>
                  ) : (
                    item.text
                  )}
                </span>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};
