import * as yup from 'yup';

export const itemValidationSchema = yup.object().shape({
  name: yup.string().required(),
  description: yup.string(),
  image: yup.string(),
  auction_id: yup.string().nullable(),
});
