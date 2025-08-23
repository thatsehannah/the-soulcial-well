import SvgInstagram from "./Instagram";

const Footer = () => {
  return (
    <div className='flex w-full h-24 bg-main-bg justify-between items-center px-8 py-3'>
      <a
        href='https://www.instagram.com/thesoulcialwell'
        target='_blank'
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
              href='https://www.thatsehannah.com'
              target='_blank'
            >
              {" "}
              TECH3
            </a>
          </span>{" "}
          <sup>&copy;</sup>.
        </p>
      </div>
    </div>
  );
};

export default Footer;
