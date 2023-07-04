import * as yup from 'yup';

export const auctionValidationSchema = yup.object().shape({
  name: yup.string().required(),
  auctioneer_id: yup.string().nullable(),
  inventory_specialist_id: yup.string().nullable(),
});
