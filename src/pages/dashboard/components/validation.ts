import { object, string } from 'yup';

export const addSparePartsFormSchema = object({
  sku: string().required('Required field'),
  name: string().required('Required field'),
  qty: string().required('Required field').test(
    'qtyNegativeValidity',
    'Must be greater than 0',
    (value) => {
      if (
        value &&
        Number(value) <= 0
      ) {
        return false;
      }
      return true;
    }
  ),
  dealerPrice: string().required('Required field').test(
    'dealerNegativeValidity',
    'Must be greater than 0',
    (value) => {
      if (
        value &&
        Number(value) <= 0
      ) {
        return false;
      }
      return true;
    }
  ),
  mrp: string().required('Required field').test(
    'mrpNegativeValidity',
    'Must be greater than 0',
    (value) => {
      if (
        value &&
        Number(value) <= 0
      ) {
        return false;
      }
      return true;
    }
  ),
  location: string(),
  model: string(),
});