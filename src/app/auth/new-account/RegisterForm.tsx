'use client';
import { useState } from 'react';
import Link from 'next/link';
import clsx from 'clsx';
import { type SubmitHandler, useForm } from 'react-hook-form';

import { login, registerUser } from '@/actions';

type FormInputs = {
  name: string;
  email: string;
  password: string;
};

export const RegisterForm = () => {
  const [errorMessage, setErrorMessage] = useState('');
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInputs>();

  const onSubmit: SubmitHandler<FormInputs> = async (data: FormInputs) => {
    setErrorMessage('');
    const { name, email, password } = data;

    const response = await registerUser(name, email, password);

    if (!response.ok) {
      setErrorMessage(response.message ?? 'Something went wrong');
      return;
    }

    await login(email.toLowerCase(), password);
    window.location.replace('/');
    
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
      {errors.name?.type === 'required' && (
        <span className="text-red-500">*Name is required</span>
      )}
      <label htmlFor="text">Full Name</label>
      <input
        className={clsx('px-5 py-2 border bg-gray-200 rounded mb-5', {
          'border-red-500': errors.name,
        })}
        type="text"
        autoFocus
        {...register('name', { required: true })}
        autoComplete='new-name'
      />
      {errors.email?.type === 'required' && (
        <span className="text-red-500">*Email is required</span>
      )}
      <label htmlFor="email">Email</label>
      <input
        className="px-5 py-2 border bg-gray-200 rounded mb-5"
        type="email"
        {...register('email', { required: true, pattern: /^\S+@\S+$/i })}
        autoComplete='new-email'
      />

      {errors.password?.type === 'required' && (
        <span className="text-red-500">*Password is required</span>
      )}
      {errors.password?.type === 'minLength' && (
        <span className="text-red-500">
          *Password must be at least 6 characters
        </span>
      )}
      <label htmlFor="password">Password</label>
      <input
        className={clsx('px-5 py-2 border bg-gray-200 rounded mb-5', {
          'border-red-500': errors.password,
        })}
        type="password"
        {...register('password', { required: true, minLength: 6 })}
        autoComplete='new-password'
      />

      {errorMessage && (
        <span className="text-red-500">
          {errorMessage}
        </span>
      )}

      <button className="btn-primary">Create Account</button>

      {/* divisor l ine */}
      <div className="flex items-center my-5">
        <div className="flex-1 border-t border-gray-500"></div>
        <div className="px-2 text-gray-800">Or</div>
        <div className="flex-1 border-t border-gray-500"></div>
      </div>

      <Link href="/auth/login" className="btn-secondary text-center">
        Login
      </Link>
    </form>
  );
};
