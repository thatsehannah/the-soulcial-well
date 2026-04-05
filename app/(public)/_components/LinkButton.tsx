import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { BellDot } from "lucide-react";
import Link from "next/link";
import React from "react";

type LinkButtonProps = {
  text: string;
  link: string;
  badge?: boolean;
  badgeUrl?: string;
  tooltipText?: string;
};

const LinkButton = ({
  text,
  link,
  badge = false,
  badgeUrl,
  tooltipText,
}: LinkButtonProps) => {
  return (
    <div className='relative hover:scale-110 transition-all ease-in-out'>
      {badge && (
        <div className='absolute -right-1 -top-2 bg-dark-green text-white z-10 rounded-full lg:p-[6px] p-1 upcoming-badge'>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link href={badgeUrl!}>
                <BellDot className='w-4 h-4 stroke-3 hover:cursor-pointer' />
              </Link>
            </TooltipTrigger>
            <TooltipContent className='bg-dark-green text-white'>
              <p>{tooltipText}</p>
            </TooltipContent>
          </Tooltip>
        </div>
      )}
      <Link
        href={link}
        className='text-sm lg:text-lg text-primary-foreground uppercase tracking-wider lg:tracking-widest font-medium bg-primary rounded-full w-44 h-10 md:w-82 md:h-13 lg:w-82 lg:h-11 text-center xl:p-8 flex justify-center items-center opacity-0 linkButton'
      >
        {text}
      </Link>
    </div>
  );
};

export default LinkButton;
