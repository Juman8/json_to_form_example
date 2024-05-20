import { Select, FormControl, FormLabel } from '@chakra-ui/react';

export const CustomSelect = (props: any) => {
  const mData = props.schema.enum ?? [];

  return (
    <FormControl isRequired={props.required} isInvalid={props.rawErrors && props.rawErrors.length > 0}>
      <FormLabel htmlFor={props.id}>{props.label}</FormLabel>
      <Select
        required={props.required}
        placeholder={props.placeholder || 'Select option'}
        value={props.value}
        onChange={(e) => props.onChange(e.target.value)}
      >
        {mData.map((it: string, index: number) => {
          return (
            <option key={it + index} value={it}>
              {it}
            </option>
          );
        })}
      </Select>
    </FormControl>
  );
};
