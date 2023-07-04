import AppLayout from 'layout/app-layout';
import React, { useState } from 'react';
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Box,
  Spinner,
  FormErrorMessage,
  Switch,
  NumberInputStepper,
  NumberDecrementStepper,
  NumberInputField,
  NumberIncrementStepper,
  NumberInput,
} from '@chakra-ui/react';
import { useFormik, FormikHelpers } from 'formik';
import * as yup from 'yup';
import DatePicker from 'react-datepicker';
import { FiEdit3 } from 'react-icons/fi';
import { useRouter } from 'next/router';
import { createAuction } from 'apiSdk/auctions';
import { Error } from 'components/error';
import { auctionValidationSchema } from 'validationSchema/auctions';
import { AsyncSelect } from 'components/async-select';
import { ArrayFormField } from 'components/array-form-field';
import { AccessOperationEnum, AccessServiceEnum, requireNextAuth, withAuthorization } from '@roq/nextjs';
import { compose } from 'lib/compose';
import { AuctioneerInterface } from 'interfaces/auctioneer';
import { UserInterface } from 'interfaces/user';
import { getAuctioneers } from 'apiSdk/auctioneers';
import { getUsers } from 'apiSdk/users';
import { AuctionInterface } from 'interfaces/auction';

function AuctionCreatePage() {
  const router = useRouter();
  const [error, setError] = useState(null);

  const handleSubmit = async (values: AuctionInterface, { resetForm }: FormikHelpers<any>) => {
    setError(null);
    try {
      await createAuction(values);
      resetForm();
      router.push('/auctions');
    } catch (error) {
      setError(error);
    }
  };

  const formik = useFormik<AuctionInterface>({
    initialValues: {
      name: '',
      auctioneer_id: (router.query.auctioneer_id as string) ?? null,
      inventory_specialist_id: (router.query.inventory_specialist_id as string) ?? null,
    },
    validationSchema: auctionValidationSchema,
    onSubmit: handleSubmit,
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: false,
  });

  return (
    <AppLayout>
      <Box bg="white" p={4} rounded="md" shadow="md">
        <Box mb={4}>
          <Text as="h1" fontSize="2xl" fontWeight="bold">
            Create Auction
          </Text>
        </Box>
        {error && (
          <Box mb={4}>
            <Error error={error} />
          </Box>
        )}
        <form onSubmit={formik.handleSubmit}>
          <FormControl id="name" mb="4" isInvalid={!!formik.errors?.name}>
            <FormLabel>Name</FormLabel>
            <Input type="text" name="name" value={formik.values?.name} onChange={formik.handleChange} />
            {formik.errors.name && <FormErrorMessage>{formik.errors?.name}</FormErrorMessage>}
          </FormControl>
          <AsyncSelect<AuctioneerInterface>
            formik={formik}
            name={'auctioneer_id'}
            label={'Select Auctioneer'}
            placeholder={'Select Auctioneer'}
            fetcher={getAuctioneers}
            renderOption={(record) => (
              <option key={record.id} value={record.id}>
                {record?.name}
              </option>
            )}
          />
          <AsyncSelect<UserInterface>
            formik={formik}
            name={'inventory_specialist_id'}
            label={'Select User'}
            placeholder={'Select User'}
            fetcher={getUsers}
            renderOption={(record) => (
              <option key={record.id} value={record.id}>
                {record?.email}
              </option>
            )}
          />
          <Button isDisabled={formik?.isSubmitting} colorScheme="blue" type="submit" mr="4">
            Submit
          </Button>
        </form>
      </Box>
    </AppLayout>
  );
}

export default compose(
  requireNextAuth({
    redirectTo: '/',
  }),
  withAuthorization({
    service: AccessServiceEnum.PROJECT,
    entity: 'auction',
    operation: AccessOperationEnum.CREATE,
  }),
)(AuctionCreatePage);
