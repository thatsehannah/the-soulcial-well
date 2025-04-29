import Link from "next/link";
import React from "react";

type LinkButtonProps = {
  text: string;
  link: string;
};

const LinkButton = ({ text, link }: LinkButtonProps) => {
  return (
    <div className='bg-primary rounded-full w-52 h-10 lg:w-97 lg:h-14 hover:scale-110 hover:cursor-pointer transition-all ease-in-out flex justify-center items-center'>
      <Link
        href={link}
        className='text-sm lg:text-lg text-primary-foreground uppercase tracking-wider lg:tracking-widest font-medium'
      >
        {text}
      </Link>
    </div>
  );
};

export default LinkButton;
