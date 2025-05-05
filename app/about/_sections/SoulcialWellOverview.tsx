import Image from "next/image";

const SoulcialWellOverview = () => {
  return (
    <section className='p-8'>
      <div className='grid grid-cols-1 lg:grid-cols-3 lg:mt-8 mt-4 w-full lg:gap-12 lg:p-8 p-2'>
        <div className='flex justify-center items-center col-span-1'>
          <div className='lg:block hidden'>
            <Image
              src='/assets/overview.svg'
              alt='cross with logo inside'
              height={500}
              width={500}
            />
          </div>
        </div>
        <div className='grid gap-4 text-xl col-span-2 lg:px-30 p-6'>
          <p className='text-4xl lg:text-6xl text-center mb-4'>
            At The <span className='font-script'>Soulcial Well</span>
          </p>
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
