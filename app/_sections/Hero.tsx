import { Sparkles } from "lucide-react";
import React from "react";
import LinkButton from "../_components/LinkButton";

const Hero = () => {
  return (
    <section className='flex flex-col justify-around lg:justify-between h-[100vh] p-4 bg-[url(/herobg.png)] bg-center bg-no-repeat bg-contain lg:bg-cover'>
      <div>
        <div className='w-full flex justify-center gap-2'>
          <p className='text-6xl lg:text-8xl font-medium text-primary tracking-[-.08em]'>
            The Soulcial
          </p>
          <Sparkles className='text-primary w-7 lg:w-13 h-7 lg:h-13 fill-primary' />
        </div>
        <div className='text-center'>
          <p className='text-6xl lg:text-8xl font-script text-primary'>Well</p>
        </div>
        <div className='text-center mt-6'>
          <p className='text-2xl lg:text-4xl text-primary-foreground tracking-tighter'>
            Bringing back community
          </p>
        </div>
      </div>
      <div className='grid grid-cols-2 place-items-center gap-8'>
        <LinkButton
          text='about us'
          link='/about'
        />
        <LinkButton
          text='connect with us'
          link='/connect'
        />
        <LinkButton
          text='our work'
          link='our-work'
        />
        <LinkButton
          text='join our giveaway'
          link='giveaway'
        />
        <LinkButton
          text='collabs'
          link='collabs'
        />
        <LinkButton
          text='read our blog'
          link='blog'
        />
      </div>
    </section>
  );
};

export default Hero;
