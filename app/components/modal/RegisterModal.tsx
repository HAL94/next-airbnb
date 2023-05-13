'use client';
import axios from 'axios';
import { AiFillGithub } from 'react-icons/ai';
import { FcGoogle } from 'react-icons/fc';
import { useCallback, useState } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import useRegisterModal from '@/app/hooks/use-register-modal';
import Modal from './Modal';
import Heading from '../heading/Heading';
import Input from '../input/Input';
import { toast } from 'react-hot-toast';
import Button from '../button/Button';
import { signIn } from 'next-auth/react';
import useLoginModal from '@/app/hooks/use-login-modal';

const RegisterModal = () => {
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    console.log('data', data);
    setIsLoading(true);

    axios
      .post('/api/register', data)
      .then(() => {
        toast.success('Success!');
        registerModal.onClose();
        loginModal.onOpen();
      })
      .catch((error) => {
        // console.log(error);
        toast.error('Something went wrong');
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading title="Welcome to Airbnb" subtitle="Create an account!" />
      <Input type={'email'} id={'email'} label={'email'} errors={errors} register={register} required />
      <Input type={'text'} id={'name'} label={'name'} errors={errors} register={register} required />
      <Input type={'password'} id={'password'} label={'password'} errors={errors} register={register} required />
    </div>
  );

  const footerContent = (
    <div className='flex flex-col gap-4 mt-3'>
      <hr />
      <Button outline label='Continue with Google' icon={FcGoogle} onClick={() => signIn('google')}/>
      <Button outline label='Continue with Github' icon={AiFillGithub} onClick={() => signIn('github')}/>
      <div className='text-neutral-500 text-center mt-4 font-light'>
        <div className='flex flex-row justify-center items-center gap-2'>
          <div>
            Already have an account?
          </div>
          <div className='text-neutral-800 cursor-pointer hover:underline' onClick={() => {
            registerModal.onClose();
            loginModal.onOpen();
          }}>
            Log In
          </div>
        </div>
      </div>
    </div>
  )
  return (
    <Modal
      disabled={isLoading}
      isOpen={registerModal.isOpen}
      title={'Register'}
      actionLabel={'Continue'}
      onClose={registerModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
      footer={footerContent}
    />
  );
};

export default RegisterModal;
