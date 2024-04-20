import { Grid, useMediaQuery, useTheme } from "@mui/material";
import React, { FC, useEffect } from "react";
import { SparePartsFormProps } from "./types";
import { Button, TextField } from "components";

const SparePartsForm: FC<SparePartsFormProps> = (props) => {
  const { submitHandler, control, errors, isEdit = false, handleCancel, isUpdatingDetails, reset } = props;

  const theme = useTheme();
  const match = useMediaQuery(theme.breakpoints.up('md'));

  useEffect(() => {
    // unmount clean-up
    return () => {
      reset();
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className="w-full h-full bg-white rounded-[10px]">
      <form onSubmit={submitHandler()}>
        <Grid container={true}>
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
                name="sku"
                placeholder="SKU"
                control={control}
                errors={errors}
                testid="sku"
                isControlledField={true}
              />
            </Grid>
            <Grid item={true} md={6} xs={12}>
              <TextField
                name="name"
                placeholder="Part Name"
                control={control}
                errors={errors}
                testid="name"
                isControlledField={true}
              />
            </Grid>
            <Grid item={true} md={6} xs={12}>
              <TextField
                name="qty"
                placeholder="Quantity"
                control={control}
                errors={errors}
                type="number"
                testid="quantity"
                isControlledField={true}
              />
            </Grid>
            <Grid item={true} md={6} xs={12}>
              <TextField
                name="dealerPrice"
                placeholder="Dealer Price"
                control={control}
                errors={errors}
                type="number"
                testid="dealerPrice"
                isControlledField={true}
              />
            </Grid>
            <Grid item={true} md={6} xs={12}>
              <TextField
                name="mrp"
                placeholder="MRP"
                control={control}
                errors={errors}
                type="number"
                testid="mrp"
                isControlledField={true}
              />
            </Grid>
            <Grid item={true} md={6} xs={12}>
              <TextField
                name="location"
                placeholder="Location"
                control={control}
                errors={errors}
                testid="location"
                isControlledField={true}
              />
            </Grid>
            <Grid item={true} md={12} xs={12}>
              <TextField
                name="model"
                placeholder="Supporting Model"
                control={control}
                errors={errors}
                testid="model"
                multiline={true}
                rows={4}
                isControlledField={true}
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid container={true} item={true} xs={12} sm={12} md={12} mt={5}>
          <Button
            label="Cancel"
            className="py-[9px] px-[17px] mb-2 w-full text-black bg-white border-[1px] border-primaryColor md:w-auto"
            type="button"
            dataTestId="transactionFormCancelButton"
            onClick={handleCancel}
            disabled={isUpdatingDetails}
          />
          <Button
            label={
              isEdit
                ? 'Update Parts'
                : 'Add Parts'
            }
            className="py-[9px] px-[17px] mb-2 w-full text-white bg-primaryColor md: md:ml-3 md:w-auto"
            type="submit"
            dataTestId={
              isEdit ? 'updateTransactionButton' : 'addTransactionButton'
            }
            disabled={isUpdatingDetails}
          />
        </Grid>
      </form>
    </div>
  )
}

export default SparePartsForm;