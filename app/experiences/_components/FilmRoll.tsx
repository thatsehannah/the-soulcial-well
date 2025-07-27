import React from "react";

const FilmRoll = () => {
  return (
    <div className='flex flex-col'>
      {new Array(3).map((_, index) => (
        <div
          className='border-4 border-main-foreground w-10 h-10 p-16'
          key={index}
        />
      ))}
      <div className='border-[12px] border-main-foreground w-50 h-50' />
      <div className='border-[12px] border-main-foreground w-50 h-50' />
      <div className='border-[12px] border-main-foreground w-50 h-50 border-b-[48px]' />
    </div>
  );
};

export default FilmRoll;
