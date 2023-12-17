'use client';
import { useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import clsx from 'clsx';

import { setUserAddress, deleteUserAddress} from '@/actions';

import { useAddressStore } from '@/store';

import { CountryOptions } from './CountryOptions';
import { CheckForm } from './CheckForm';

import type { Address, Country } from '@/interfaces';

interface FormInputs {
  firstName: string;
  lastName: string;
  address: string;
  address2?: string;
  postalCode: string;
  city: string;
  country: string;
  phone: string;
  rememberAddress: boolean;
}

interface Props {
  countries: Country[];
  userStoredAddress?: Partial<Address>;
}

export const AddressForm = ({countries, userStoredAddress = {}}: Props) => {
  const {
    handleSubmit,
    register,
    formState: { isValid },
    reset,
  } = useForm<FormInputs>({
    defaultValues: {
      //? read from database
      ...(userStoredAddress as any),
      rememberAddress: false,
    },
  });


  const router = useRouter();
  const { data: session } = useSession({required: true});

  const setAddress = useAddressStore((state) => state.setAddress);
  const address = useAddressStore((state) => state.address);

  useEffect(() => {
    if(address.firstName){
      reset(address);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  

  const onSubmit = async (data: FormInputs) => {
    const { rememberAddress, ...restAddress } = data;
    setAddress(restAddress);

    if(rememberAddress){
      //? save to database via server action
      await setUserAddress(restAddress, session!.user.id );
    } else {
      //? delete from database via server action
      await deleteUserAddress(session!.user.id);
    }

    router.push('/checkout');
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="grid grids-cols-1 gap-2 sm:gap-5 sm:grid-cols-2"
    >
      <div className="flex flex-col mb-2">
        <span>Name</span>
        <input type="text" className="p-2 border rounded-md bg-gray-200" {...register('firstName',{required: true})} />
      </div>
      <div className="flex flex-col mb-2">
        <span>Lastname</span>
        <input type="text" className="p-2 border rounded-md bg-gray-200" {...register('lastName',{required: true})} />
      </div>
      <div className="flex flex-col mb-2">
        <span>Address</span>
        <input type="text" className="p-2 border rounded-md bg-gray-200" {...register('address',{required: true})} />
      </div>
      <div className="flex flex-col mb-2">
        <span>Address 2 (optional)</span>
        <input type="text" className="p-2 border rounded-md bg-gray-200" {...register('address2')} />
      </div>
      <div className="flex flex-col mb-2">
        <span>Postal Code</span>
        <input type="text" className="p-2 border rounded-md bg-gray-200" {...register('postalCode',{required: true})} />
      </div>
      <div className="flex flex-col mb-2">
        <span>City</span>
        <input type="text" className="p-2 border rounded-md bg-gray-200" {...register('city',{required: true})} />
      </div>
      <div className="flex flex-col mb-2">
        <span>Country</span>
        <select id="" className="p-2 border rounded-md bg-gray-200" {...register('country',{required: true})}>
          <CountryOptions countries={countries} />
        </select>
      </div>
      <div className="flex flex-col mb-2">
        <span>Phone</span>
        <input type="text" className="p-2 border rounded-md bg-gray-200" {...register('phone',{required: true})} />
      </div>

      <div className="flex flex-col mb-2 sm:mt-1">
        <CheckForm register={register('rememberAddress')}/>
        <button
        //   href="/checkout"
          type="submit"
          className={clsx("flex w0full sm:w-1/2 justify-center",{
            "btn-primary": isValid,
            "btn-disabled opacity-50 cursor-not-allowed": !isValid,
          })}        
        >
          Next
        </button>
      </div>
    </form>
  );
};
