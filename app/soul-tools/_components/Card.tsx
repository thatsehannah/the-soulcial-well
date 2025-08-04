import React, { ReactNode } from "react";

const Card = ({ children }: { children: ReactNode }) => {
  return (
    <div className='border-2 border-dark-green rounded-3xl p-8 mt-12'>
      {children}
    </div>
  );
};

export default Card;
