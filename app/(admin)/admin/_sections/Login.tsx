"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/context/AuthContext";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { FormEvent, useEffect, useState } from "react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const { user, login, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && user) {
      router.push("/admin/home");
    }
  }, [user, loading, router]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      await login(email, password);
      setSuccess("Successful login");
      router.push("/admin/home");
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      setError("Invalid email or password");
    }
  };

  return (
    <section className='flex flex-col justify-around lg:justify-between h-[100vh] p-4 relative'>
      <div className='absolute left-0 xl:top-[36%] lg:top-[36%] md:top-[38%] top-[43%] w-[43vw] 2xl:h-65 xl:h-55 lg:h-48 md:h-34 h-20 left-arm'>
        <Image
          src='/assets/leftarm.png'
          alt='left arm'
          fill
          quality={100}
        />
      </div>
      <div className='absolute right-0 2xl:top-[24%] lg:top-[27%] md:top-[35%] top-[39%] w-[43vw] 2xl:h-63 xl:h-50 lg:h-48 md:h-27 h-20 right-arm'>
        <Image
          src='/assets/rightarm.png'
          alt='left arm'
          fill
          quality={100}
        />
      </div>
      <div className='w-fit mx-auto xl:mt-3 p-2'>
        <div className='w-full gap-1'>
          <p className='xl:text-5xl text-3xl text-primary tracking-[-.08em] ml-5 heroTitle'>
            The
          </p>
        </div>
        <div className='flex items-center text-center -mt-5'>
          <p className='xl:text-7xl text-5xl text-primary heroTitle'>
            <span className='font-script text-primary-foreground xl:text-8xl text-6xl will-change-transform'>
              soul
            </span>
            cial well{" "}
          </p>
          <div className='relative xl:h-22 h-14 xl:w-22 w-14 logo'>
            <Image
              src='/assets/logo-default.svg'
              alt='icon'
              fill
              quality={100}
            />
          </div>
        </div>
        <div className='text-center mt-6 lg:mt-8'>
          <p className='subtitle xl:text-3xl text-2xl text-primary-foreground tracking-tighter'>
            Bringing back community
          </p>
        </div>
      </div>
      <div className='flex flex-col justify-center items-center'>
        <h1 className='text-2xl uppercase font-bold'>Admin Login</h1>
        <form
          onSubmit={handleSubmit}
          className='flex flex-col justify-center items-center gap-8 p-2 w-full mt-4'
        >
          <Input
            type='text'
            placeholder='Email'
            className='bg-main-bg placeholder:text-lg w-1/5 text-black ring-0 rounded-md'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Input
            type='password'
            placeholder='Password'
            className='bg-main-bg placeholder:text-lg w-1/5 text-black rounded-md'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {error && <p className='text-red-500 text-sm'>{error}</p>}
          {success && <p className='text-green-500 text-sm'>{success}</p>}
          <Button
            type='submit'
            className='w-1/4 text-lg cursor-pointer hover:scale-105'
          >
            Submit
          </Button>
        </form>
      </div>
    </section>
  );
};

export default Login;
