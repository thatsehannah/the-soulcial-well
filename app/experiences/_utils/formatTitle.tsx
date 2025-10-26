import { ReactNode } from "react";

export const formatTitle = (
  rawTitle: string,
  isEvenSection?: boolean
): ReactNode => {
  const baseClass = `${rawTitle.length > 25 ? "lg:text-5xl" : "lg:text-6xl"} text-[2.5rem] leading-[2.75rem] text-white`;
  const spanClass = `font-script ${
    isEvenSection ? "text-main-foreground" : "text-primary"
  } `;

  //for titles with a colon
  if (rawTitle.indexOf(":") !== -1) {
    const splitTitleWithColon = rawTitle.split(":");

    return (
      <p className={baseClass}>
        {splitTitleWithColon[0]}:{" "}
        <span className={spanClass}>{splitTitleWithColon[1]}</span>
      </p>
    );
  }

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

  //for titles that contain an ampersand or a plus sign
  if (splitTitle[1] === "&" || splitTitle[1] === "+") {
    return (
      <p className={baseClass}>
        {splitTitle[0]} {splitTitle[1]}{" "}
        <span className={spanClass}>{splitTitle.slice(2)}</span>
      </p>
    );
  }

  //for titles that just have a space
  return (
    <p className={baseClass}>
      {splitTitle[0]}{" "}
      <span className={spanClass}>{splitTitle.slice(1).join(" ")}</span>
    </p>
  );
};
