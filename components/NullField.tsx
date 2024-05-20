import { Heading } from '@chakra-ui/react';

export const NullField = (props: any) => {
  return (
    <Heading borderBottom='1px' borderBottomColor='gray.200' as='h2'>
      {props.schema.title}
    </Heading>
  );
};
