import { PasswordField, PhoneField, TextField } from '@/components/widgets/Form/FormComponent';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useState } from 'react';
import { AppButton } from '@/components/widgets/Button/Button';
import { MethodType, useRequest } from '@/hooks/request-hook';
import Router from 'next/router';

export type RegisterInput = {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  phone: string;
};

const SignUpPage = (): JSX.Element => {
  const { register, handleSubmit, control } = useForm<RegisterInput>({ mode: 'onChange' });
  const { makeRequest, errors, loading } = useRequest({ url: '/api/v1/usr/auth/signup', method: MethodType.Post, onSuccess: () => Router.push('/home/home') });

  const onSubmit: SubmitHandler<RegisterInput> = async data => {
    makeRequest(data);
  };

  return (
    <div className="w-full max-w-xs">
      <div className="bg-gray-50 rounded p-5 mb-[0.15rem] min-h-[50px]">
        <span className="font-semibold text-gray-500">Sign Up</span>
        <p className="text-xs text-purple-400">please complete your signup process</p>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="bg-white shadow-md rounded px-6 pt-6 pb-8 mb-4">
        <TextField label="Firstname" {...register('firstname')} error={errors} />
        <TextField label="Lastname" {...register('lastname')} error={errors} />
        <TextField label="Email" type="email" {...register('email')} error={errors} />
        <PasswordField label="Password" {...register('password')} error={errors} />
        <PhoneField label="Phone" control={control} {...register('phone')} error={errors} />
        <div className="flex flex-col gap-y-3 mb-3 max-h-20 overflow-y-auto">
          {errors.map(
            content =>
              !content.field && (
                <span key={content.message} className="text-[12px] text-red-600">
                  {content.message}
                </span>
              )
          )}
        </div>
        <AppButton name={loading == true ? 'loading...' : 'SignUp'} />
      </form>
    </div>
  );
};

export default SignUpPage;
