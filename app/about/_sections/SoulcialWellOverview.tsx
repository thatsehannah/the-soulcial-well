import Image from "next/image";

const SoulcialWellOverview = () => {
  return (
    <section className='xl:p-32 pt-30 pb-12 px-4'>
      <div className='grid grid-cols-1 xl:grid-cols-3 xl:mt-8 mt-4 w-full lg:gap-12 xl:p-8 p-2'>
        <div className='xl:flex hidden justify-center items-center xl:col-span-1'>
          <div>
            <Image
              src='/assets/overview.svg'
              alt='cross with logo inside'
              height={500}
              width={500}
            />
          </div>
        </div>
        <div className='grid gap-4 text-xl xl:col-span-2 xl:px-30 p-6'>
          <p className='text-5xl lg:text-6xl text-center mb-8'>
            At The <span className='font-script'>Soulcial Well</span>
          </p>
          <div className='xl:hidden flex justify-center items-center mb-8'>
            <div>
              <Image
                src='/assets/overview.svg'
                alt='cross with logo inside'
                height={500}
                width={500}
              />
            </div>
          </div>
          <p>
            We believe that self-care is more than solo rituals—it’s about
            meaningful connection, shared experiences, and holistic well-being.
            We create immersive, interactive experiences that blend mental
            wellness, social connection, and personal growth, making self-care
            engaging, dynamic, and fun.
          </p>
          <p>
            Our approach is rooted in the idea that true well-being thrives in
            community. Through thoughtfully designed events, creative
            activities, and transformative conversations, we provide spaces
            where people feel seen, heard, and empowered. Whether it’s deep
            reflection, playful exploration, or offbeat conversations, we
            challenge the idea that self-care has to be routine—because wellness
            should be felt, not just practiced.
          </p>
          <p>
            At The Soulcial Well, we bridge the gap between self-discovery and
            social connection, ensuring that no one has to navigate their
            journey alone. Ready to refill your well? Join us and experience
            self-care in a whole new way.
          </p>
          <p className='text-center'>
            ✨ Rethink self-care. Reconnect with yourself. Thrive in community.
            ✨
          </p>
        </div>
      </div>
    </section>
  );
};

export default SoulcialWellOverview;
