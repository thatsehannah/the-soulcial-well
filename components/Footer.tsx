import SvgInstagram from "./Instagram";

const Footer = () => {
  return (
    <footer className='flex w-full h-24 bg-main-bg justify-between items-center px-8 py-3'>
      <a
        href='https://www.instagram.com/thesoulcialwell'
        target='_blank'
        aria-label="Check out The Soulcial Well's Instagram!"
      >
        <SvgInstagram className='fill-dark-green opacity-80 h-5 w-5 hover:scale-110 transition-all ease-in-out' />
      </a>
      <div>
        <p className='text-xs'>
          All rights reserved. &copy; - {new Date().getFullYear()} - The
          Soulcial Well
        </p>
        <p className='text-xs text-center'>
          Built by{" "}
          <span className='underline'>
            <a
              href='https://www.thirdgenstudio.dev'
              target='_blank'
              aria-label="Third Gen Studio's website"
            >
              {" "}
              Third Gen Studio
            </a>
          </span>{" "}
          <sup>&copy;</sup>.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
