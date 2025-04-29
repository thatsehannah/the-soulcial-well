import React from "react";

type LinkButtonProps = {
  text: string;
};

const LinkButton = ({ text }: LinkButtonProps) => {
  return (
    <div className='bg-primary rounded-full w-52 h-10 lg:w-97 lg:h-14 hover:scale-110 hover:cursor-pointer transition-all ease-in-out flex justify-center items-center'>
      <p className='text-sm lg:text-lg text-primary-foreground uppercase tracking-wider lg:tracking-widest font-medium'>
        {text}
      </p>
    </div>
  );
};

export default LinkButton;
