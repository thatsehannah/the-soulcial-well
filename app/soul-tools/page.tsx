import React from "react";
import Card from "./_components/Card";

const SoulTools = () => {
  return (
    <main className='xl:p-32 pt-38 pb-12 px-7'>
      <section className=''>
        <p className='text-5xl lg:text-6xl text-primary text-center'>
          Candid{" "}
          <span className='font-script text-primary-foreground'>
            Conversations
          </span>
        </p>
        <div className='grid xl:grid-cols-3 lg:grid-cols-2 grid-cols-1 xl:gap-16 gap-6'>
          <Card>
            <p className='font-bold text-2xl text-center'>
              What is Candid Conversations?
            </p>
            <p className='text-xl mt-4'>
              Candid Conversations is a culturally rooted wellness model
              designed to foster deep, purposeful dialogue that moves beyound
              surface-level small talk. It&apos;s about creating safe, inclusive
              spaces where people can explore their identities, emotions, and
              relationships through storytelling, reflection, and connection.
            </p>
          </Card>
          <Card>
            <p className='font-bold text-2xl text-center'>Why It Matters</p>
            <p className='text-xl mt-4'>
              Candid Conversations is grounded in narrative therapy,
              interpersonal process, culturally responsive group work, and
              storytelling. It centers not on fixing, but on witnessing,
              honoring, and evolving through honest reflection, meaningful
              connection, and community-rooted healing- culminating in{" "}
              <span className='font-bold italic'>
                authentic human exchange.
              </span>
            </p>
          </Card>
          <Card>
            <p className='font-bold text-2xl text-center'>How It Works</p>
            <p className='text-xl mt-4'>
              Through small groups, playful icebreakers, guided storytelling,
              and reflective prompts, participants engage in meaningful
              conversations tailored to their emotional and cultural realities.
              The model incorporates community agreements and grounding rituals
              to ensure a supportive, respectful environment.
            </p>
          </Card>
          <Card>
            <p className='font-bold text-2xl text-center'>Who It&apos;s For</p>
            <p className='text-xl mt-4'>
              Candid Conversations is designed for adults from all walks of
              life—especially those from communities where mental health
              conversations have been stigmatized or silenced. Whether you’re
              seeking deeper connection, exploring your identity, or simply
              craving a space to be seen and heard, this model offers a warm,
              welcoming place to grow.
            </p>
          </Card>
          <Card>
            <p className='font-bold text-2xl text-center'>
              Theoretical Foundations
            </p>
            <p className='text-xl mt-4'>
              Our model draws from: <br />
              <span className='underline'>Narrative Therapy</span>: empowering
              individuals to reshape their personal stories <br />
              <span className='underline'>Interpersonal Process Theory</span>:
              fostering emotional safety and relational connection <br />
              <span className='underline'>
                Culturally Responsive Group Work
              </span>
              : entering diverse cultural narratives and experiences <br />
              <span className='underline'>Storytelling</span>: as a powerful
              tool for insight, healing, and belonging
            </p>
          </Card>
        </div>
      </section>
    </main>
  );
};

export default SoulTools;
