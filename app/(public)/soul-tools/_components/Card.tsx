import React, { ReactNode } from "react";

const Card = ({ children }: { children: ReactNode }) => {
  return (
    <div className='border-2 border-dark-green rounded-3xl py-8 px-5 mt-12'>
      {children}
    </div>
  );
};

export default Card;
