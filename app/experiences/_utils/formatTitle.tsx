import { ReactNode } from "react";

export const formatTitle = (
  rawTitle: string,
  isEvenSection?: boolean
): ReactNode => {
  const baseClass = "lg:text-6xl text-5xl text-white";
  const spanClass = `font-script ${
    isEvenSection ? "text-main-foreground" : "text-primary"
  } `;

  //for titles with a comma
  if (rawTitle.indexOf(",") !== -1) {
    const splitTitleWithComma = rawTitle.split(",");

    return (
      <p className={baseClass}>
        {splitTitleWithComma[0]}
        {", "}
        <span className={spanClass}>{splitTitleWithComma[1]}</span>
      </p>
    );
  }

  const splitTitle = rawTitle.split(" ");

  if (splitTitle[1] === "&" || splitTitle[1] === "+") {
    return (
      <p className={baseClass}>
        {splitTitle[0]} {splitTitle[1]}{" "}
        <span className={spanClass}>{splitTitle.slice(2)}</span>
      </p>
    );
  }

  return (
    <p className={baseClass}>
      {splitTitle[0]}{" "}
      <span className={spanClass}>{splitTitle.slice(1).join(" ")}</span>
    </p>
  );
};
