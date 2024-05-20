/* eslint-disable import/default */
import { createRef } from 'react';
import { FormDataType, JSON_SCHEMA_PROPERTIES, UISchema } from './hepler';

const refFormService = createRef<any>();

const showForm = (
  formData: FormDataType,
  jsonschema: JSON_SCHEMA_PROPERTIES,
  uischema: UISchema,
  onSubmit: (data: any) => void
) => {
  refFormService.current.showForm(formData, jsonschema, uischema, onSubmit);
};

export const FormService = {
  refFormService,
  showForm
};
