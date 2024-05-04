import { Button, TextField } from 'components';
import { Grid, useMediaQuery, useTheme } from '@mui/material';
import React, { FC } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import { BillFormProps, FormFieldValues } from './types';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import html2canvas from 'html2canvas';

const BillForm: FC<BillFormProps> = (props) => {
  const { isGenerating } = props;
  const theme = useTheme();
  const match = useMediaQuery(theme.breakpoints.up('md'));


  const {
    control,
    handleSubmit,
    formState: { errors },
    watch
  } = useForm<FormFieldValues>({
    defaultValues: {
      mob: '',
      name: '',
      vehicle: '',
      vehicleNumber: '',
      partInfo: [{ partName: '', qty: '', amount: '' }],
      labour: ''
    }
  })
  const { fields, append, remove } = useFieldArray<FormFieldValues>({
    control,
    name: 'partInfo',
  });

  const handleGenerateBill = (values: FormFieldValues) => {
    const timeStamp = Date.now();

    const printableContent = document.getElementById('printable-content');

    if (printableContent) {
      html2canvas(printableContent).then(canvas => {
        const imgData = canvas.toDataURL('image/png');

        const imgWidth = 210; // A4 width in mm
        const imgHeight = (canvas.height * imgWidth) / canvas.width; // Calculate the height of the page to fit the content
        const doc = new jsPDF('p', 'mm', 'a4');

        doc.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
        doc.save(`${values.name}_${timeStamp}.pdf`);
      });
    }

    // Convert HTML content to PDF
    // pdf.h
    // pdf.fromHTML(printableContent, 15, 15);
    // // Open print dialog
    // pdf.autoPrint();
    // window.open(pdf.output('bloburl'), '_blank');

  };
  const submitHandler = () => {
    return handleSubmit(handleGenerateBill);
  };

  const getDate = () => {
    const date = new Date();
    return `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`
  }

  const partInfoWatchValue = watch('partInfo');
  const labourWatchValue = watch('labour');

  const totalAmt =  partInfoWatchValue.reduce((acc, partDetails) => {
      const amt = Number(partDetails.amount) || 0;
      return acc + amt;
    }, 0);

  return (
    <>
      <div className="w-full min-h-[calc(100vh-128px)] bg-white rounded-[10px] p-[32px] z-10">
        <form onSubmit={submitHandler()}>
          <Grid container={true}>
            <div className='mb-6 text-xl font-semibold'>Customer Info</div>
            <Grid
              container={true}
              item={true}
              md={12}
              sm={12}
              xs={12}
              columnSpacing={match ? 6 : 1}
              rowSpacing={match ? 6 : 3}>
              <Grid item={true} md={6} xs={12}>
                <TextField
                  name="name"
                  placeholder="Name"
                  control={control}
                  errors={errors}
                  testid="name"
                  isControlledField={true}
                />
              </Grid>
              <Grid item={true} md={6} xs={12}>
                <TextField
                  name="mob"
                  placeholder="Mobile Number"
                  control={control}
                  errors={errors}
                  type='number'
                  testid="mobile"
                  isControlledField={true}
                />
              </Grid>
              <Grid item={true} md={6} xs={12}>
                <TextField
                  name="vehicle"
                  placeholder="Vehicle"
                  control={control}
                  errors={errors}
                  testid="vehicle"
                  isControlledField={true}
                />
              </Grid>
              <Grid item={true} md={6} xs={12}>
                <TextField
                  name="vehicleNumber"
                  placeholder="Vehicle Number"
                  control={control}
                  errors={errors}
                  testid="vehiclenumber"
                  isControlledField={true}
                />
              </Grid>
            </Grid>
            <div className='my-6 text-xl font-semibold'>Part Details</div>
            <Grid container={true} gap={2}>
              {fields.map((field, index) => (
                <Grid
                  key={field.id}
                  container={true}
                  item={true}
                  md={12}
                  sm={12}
                  xs={12}
                  columnSpacing={match ? 6 : 1}
                  rowSpacing={match ? 6 : 3}>
                  <Grid item={true} md={4} xs={12}>
                    <TextField
                      name={`partInfo.${index}.partName`}
                      placeholder="Part Name"
                      control={control}
                      errors={errors}
                      testid="partname"
                      isControlledField={true}
                    />
                  </Grid>
                  <Grid item={true} md={4} xs={12}>
                    <TextField
                      name={`partInfo.${index}.qty`}
                      placeholder="Quantity"
                      control={control}
                      errors={errors}
                      type="number"
                      testid="qty"
                      isControlledField={true}
                    />
                  </Grid>
                  <Grid item={true} md={4} xs={12}>
                    <TextField
                      name={`partInfo.${index}.amount`}
                      placeholder="Amount"
                      control={control}
                      errors={errors}
                      type="number"
                      testid="amount"
                      isControlledField={true}
                    />
                  </Grid>
                  <div className='flex w-full justify-end mt-2 mr-2 z-20'>
                    <div className='text-red-500 cursor-pointer' onClick={() => remove(index)}>Delete</div>
                  </div>
                </Grid>
              ))}
            </Grid>
            <Button
              label="Add Part"
              className="py-[9px] mt-4 px-[17px] mb-2 w-full text-white bg-primaryColor md:w-auto"
              type="button"
              dataTestId="addpart"
              onClick={() => append({ partName: '', qty: '', amount: '' })}
            />
            <div className='my-6 text-xl font-semibold w-full'>Labour Charge</div>
            <Grid
              container={true}
              item={true}
              md={12}
              sm={12}
              xs={12}
              columnSpacing={match ? 6 : 1}
              rowSpacing={match ? 6 : 3}>
              <Grid item={true} md={4} xs={12}>
                <TextField
                  name="labour"
                  placeholder="Labour Charge"
                  control={control}
                  errors={errors}
                  testid="labour"
                  isControlledField={true}
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid container={true} item={true} xs={12} sm={12} md={12} mt={5}>
            <Button
              label="Generate Bill"
              className="py-[9px] px-[17px] mb-2 w-full text-white bg-primaryColor md:w-auto"
              type="submit"
              dataTestId="generateBill"
              disabled={isGenerating}
            />
          </Grid>
        </form>
      </div >
      <div className='z-20 bottom-[70px]'>
        <div className='mt-8 ml-[48px] text-xl font-semibold'>Bill Preview</div>
        <div id="printable-content" className='py-[64px] px-[72px] m-[48px] border-[1px] bg-white'>
          <div className='flex flex-col  border-b-[1px] pb-4 mb-6 border-primaryColor'>
            <div className='flex justify-between'>
              <h1 className="text-2xl font-semibold mb-2 text-slateGrey">MULTI TECH Spares & Service</h1>
              <h1 className="text-xl font-semibold text-slateGrey mb-2">INVOICE</h1>
            </div>
            <div>
              Phone: 7511156702
            </div>
          </div>
          <div className='flex flex-row justify-between mb-4'>
            <div>
              Date: {getDate()}
            </div>
            <div>
              Bill Number: #
            </div>
          </div>
          <div className='flex flex-col'>
            <div className='flex flex-row items-center  bg-blue-400 px-2 py-1 h-[32px] text-white'>
              <div className='w-[60%] mb-3'>
                Customer Info
              </div>
              <div className='w-[40%] mb-3'>
                Vehicle Info
              </div>
            </div>
            <div className='flex flex-row py-4 bg-blue-100'>
              <div className='flex flex-col w-[60%]'>

                <div className="mb-2">Name: {watch('name')}</div>
                <div className="mb-2">Mobile: {watch('mob')}</div>
              </div>
              <div className='flex flex-col w-[40%]'>

                <div className="mb-2">Vehicle: {watch('vehicle')}</div>
                <div className="mb-2">Vehicle Number: {watch('vehicleNumber')}</div>
              </div>
            </div>
            <table>
              <thead>
                <tr className='bg-blue-400 h-[32px]'>
                  <th align='left' className='pl-2'>Part#</th>
                  <th align='left'>Part Name</th>
                  <th align='left'>Qty</th>
                  <th align='left'>Unit Price</th>
                  <th align='left'>Amount</th>
                </tr>
              </thead>
              <tbody>
                {partInfoWatchValue.map((info, index) => {
                  const partId = (index + 1).toString().padStart(3, '0');
                  return (
                    <tr key={index}>
                      <td className='pl-2 py-1'>{partId}</td>
                      <td className='py-1'>{info.partName}</td>
                      <td className='py-1'>{info.qty}</td>
                      <td className='py-1'>18</td>
                      <td className='py-1'>{info.amount}</td>
                    </tr>
                  )
                }
                )}
                <tr className='h-4'>
                  <td colSpan={5}></td>
                </tr>
                <tr className='bg-blue-400 h-1'>
                  <td colSpan={5}></td>
                </tr>
                <tr className='bg-blue-100'>
                  <td className='pr-[100px] py-1 text-right' colSpan={4}>Labour Charge</td>
                  <td className='py-1'>Rs {watch('labour') || '0'}</td>
                </tr>
                <tr className='bg-blue-100'>
                  <td className='pr-[100px] py-1 text-right' colSpan={4}>Total Amount</td>
                  <td className='py-1'>Rs {totalAmt + (Number(labourWatchValue) || 0)}</td>
                </tr>
                <tr className='bg-blue-100 h-4'>
                  <td colSpan={5}></td>
                </tr>
                <tr className='bg-blue-400 h-1'>
                  <td colSpan={5}></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

    </>
  );
};

export default BillForm;