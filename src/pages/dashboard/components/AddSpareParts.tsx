import React, { FC, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';


import { Button, SideModal as PopUp } from 'components';
import { CloseIcon } from 'assets/icons';
import COLORS from 'constants/colors';
import SparePartsForm from './Form';
import { FormFieldValues } from './types';
import { addSparePartsFormSchema } from './validation';
import { useAddSparePartsMutation } from '../api';

type AddSparePartsProps = {
  isPopupOpen: boolean;
  handleCancel: () => void;
}

const AddSpareParts: FC<AddSparePartsProps> = (props) => {
  const { isPopupOpen, handleCancel } = props;
  
  const [addSpareParts, addSparePartsResponse] = useAddSparePartsMutation();

  useEffect(() => {
    if (addSparePartsResponse.isSuccess) {
      handleCancel();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [addSparePartsResponse]);


  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
    getValues,
    setValue,
    reset
  } = useForm<FormFieldValues>({
    defaultValues: {
      dealerPrice: '',
      location: '',
      model: '',
      mrp: '',
      name: '',
      qty: '',
      sku: ''
    },
    resolver: yupResolver(addSparePartsFormSchema)
  })
  const handleAddParts = (values: FormFieldValues) => {
    const payload = {
      sku: values.sku,
      name: values.name,
      qty: values.qty,
      dealerPrice: values.dealerPrice,
      mrp: values.mrp,
      location: values.location,
      model: values.model
    }
    addSpareParts({payload})

  };
  const submitHandler = () => {
    return handleSubmit(handleAddParts);
  };
  return (
    <>
      <PopUp
        isOpen={isPopupOpen}
        clickOutSideClose={false}
        handleClose={handleCancel}>
        <div
          className={`flex justify-center items-center self-center
                  w-full h-full bg-transparent
                   ${isPopupOpen
              ? 'animate-zoom-to-front'
              : 'animate-zoom-to-back'
            }`}>
          <div
            className="flex overflow-auto relative flex-col p-3 w-[750px] h-full max-h-full bg-white
         md:rounded-xl lg:h-auto customTransparentScroll"
            data-testid="addTransactionPopup">
            <div className="flex flex-row justify-between px-10 pt-10 w-full">
              <span className="text-base font-medium">
                Add Spare Parts
              </span>
              <div
                className="flex absolute top-5 right-5 justify-center items-center w-7 h-7 
            bg-whiteSmoke rounded-full sm:top-10 sm:right-10">
                <Button
                  onClick={handleCancel}
                  iconStroke={COLORS.DAVY_GREY}
                  disableRipple={true}
                  dataTestId="formCloseButton"
                  Icon={CloseIcon}
                />
              </div>
            </div>
            <div className="m-10">
              <SparePartsForm
                control={control}
                submitHandler={submitHandler}
                errors={errors}
                watch={watch}
                getValues={getValues}
                setValue={setValue}
                reset={reset}
                handleCancel={handleCancel}
                isUpdatingDetails={addSparePartsResponse.isLoading}
              />
            </div>
          </div>
        </div>
      </PopUp>
    </>
  )
}

export default AddSpareParts;