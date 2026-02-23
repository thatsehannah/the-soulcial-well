"use client";

import React, { useEffect, useState } from "react";

const Landing = () => {
  const [quote, setQuote] = useState("");

  useEffect(() => {
    const getQuote = async () => {
      const response = await fetch("/api/quotes");

      if (response.ok) {
        const data = await response.json();
        setQuote(data);
      }
    };

    getQuote();
  }, []);

  return (
    <div>
      <h1 className='text-4xl font-bold'>Hello, Wilma 😃</h1>
      <p className='text-[1rem] lg:text-xl italic mt-4'>{`"${quote}"`}</p>
    </div>
  );
};

export default Landing;
