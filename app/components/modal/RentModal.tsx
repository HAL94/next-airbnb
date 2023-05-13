'use client';
import { useEffect, useMemo, useState } from 'react';
import Modal from './Modal';
import useRentModal from '@/app/hooks/use-rent-modal';
import Heading from '../heading/Heading';
import { categories } from '../navbar/Categories';
import CategoryInput from '../input/CategoryInput';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import CountrySelect from '../input/CountrySelect';
// import Map from '../map/Map';
import dynamic from 'next/dynamic';
import Counter from '../counter/Counter';
import { ImageUpload } from '../input/ImageUpload';
import Input from '../input/Input';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';

enum STEPS {
  CATEGORY = 0,
  LOCATION = 1,
  INFO = 2,
  IMAGES = 3,
  DESCRIPTION = 4,
  PRICE = 5,
}
const RentModal = () => {
  const rentModal = useRentModal();
  const router = useRouter()
  const [step, setStep] = useState(STEPS.CATEGORY);
  const [isLoading, setIsLoading] = useState(false);
  const onBack = () => setStep((value) => value - 1);
  const onNext = () => setStep((value) => value + 1);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    reset,
  } = useForm<FieldValues>({
    defaultValues: {
      category: '',
      location: null,
      guestCount: 1,
      roomCount: 1,
      bathroomCount: 1,
      imageSrc: '',
      price: 1,
      title: '',
      description: '',
    },
  });

  const categoryWatch = watch('category');
  const locationWatch = watch('location');
  const guestCountWatch = watch('guestCount');
  const roomCountWatch = watch('roomCount');
  const bathroomCountWatch = watch('bathroomCount');
  const imageSrcWatch = watch('imageSrc');

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    if (step !== STEPS.PRICE) {
      return onNext();
    }

    setIsLoading(true);

    axios.post('/api/listings', data)
      .then(() => {
        toast.success('Listing Created')
        router.refresh()
        reset()
        setStep(STEPS.CATEGORY)
        rentModal.onClose()
      })
      .catch((error) => {
        toast.error('Something went wrong!')
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  const Map = useMemo(
    () =>
      dynamic(() => import('../map/Map'), {
        ssr: false,
      }),
    [locationWatch],
  );

  const setCustomValue = (id: string, value: any) => {
    setValue(id, value, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    });
  };

  const actionLabel = useMemo(() => {
    if (step === STEPS.PRICE) {
      return 'Create';
    }

    return 'Next';
  }, [step]);

  const secondaryActionLabel = useMemo(() => {
    if (step === STEPS.CATEGORY) {
      return undefined;
    }
    return 'Back';
  }, [step]);

  let bodyContent = (
    <div className="flex flex-col gap-8">
      <Heading
        title="Which of these best describes your place?"
        subtitle="Pick a category"
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[50vh] overflow-y-auto">
        {categories.map((cat) => (
          <div key={cat.label} className="col-span-1">
            <CategoryInput
              onClick={(category) => setCustomValue('category', category)}
              selected={categoryWatch === cat.label}
              label={cat.label}
              icon={cat.icon}
            />
          </div>
        ))}
      </div>
    </div>
  );

  if (step === STEPS.LOCATION) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Where is your place located"
          subtitle="Help Guests find you"
        />
        <CountrySelect
          value={locationWatch}
          onChange={(value) => setCustomValue('location', value)}
        />
        <Map center={locationWatch?.latlng} />
      </div>
    );
  }

  if (step === STEPS.INFO) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          subtitle="What amenities do you have?"
          title="Share some basic information about your place"
        />
        <Counter
          title="Guests"
          subtitle="How many guests do you allow?"
          value={guestCountWatch}
          onChange={(value) => setCustomValue('guestCount', value)}
        />
        <hr />
        <Counter
          title="Rooms"
          subtitle="How many rooms do you have?"
          value={roomCountWatch}
          onChange={(value) => setCustomValue('roomCount', value)}
        />
        <hr />
        <Counter
          title="Bathrooms"
          subtitle="How many bathrooms do you have?"
          value={bathroomCountWatch}
          onChange={(value) => setCustomValue('bathroomCount', value)}
        />
      </div>
    );
  }

  if (step === STEPS.IMAGES) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Add a photo of your place"
          subtitle="Show guests what your place looks like"
        />
        <ImageUpload onChange={(value) => {
          console.log('received value', value);
          setCustomValue('imageSrc', value)
        }} value={imageSrcWatch} />
      </div>
    );
  }

  if (step === STEPS.DESCRIPTION) {
    bodyContent = (
      <div className='flex flex-col gap-8'>
        <Heading title='How would you describe your place?' subtitle='Short and sweet works best' />
        <Input id='title' label='Title' disabled={isLoading} errors={errors} register={register} required />
        <hr/>
        <Input id='description' label='Description' disabled={isLoading} errors={errors} register={register} required />
      </div>
    )
  }
  
  if (step === STEPS.PRICE) {
    bodyContent = (
      <div className='flex flex-col gap-8'>
        <Heading title='Now set your price' subtitle='How much do you charge per night?' />
        <Input formatPrice id='price' label='Price' disabled={isLoading} errors={errors} register={register} type='number' required />
      </div>
    )
  }
  
  return (
    <Modal
      isOpen={rentModal.isOpen}
      title={'Airbnb your home!'}
      actionLabel={actionLabel}
      secondaryActionLabel={secondaryActionLabel}
      secondaryAction={step === STEPS.CATEGORY ? undefined : onBack}
      onClose={rentModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
    />
  );
};

export default RentModal;
