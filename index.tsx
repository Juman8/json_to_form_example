import { forwardRef, useImperativeHandle, useState } from 'react';
import Form from '@rjsf/chakra-ui';
import { NullField } from './components/NullField';
import { CustomSelect } from './components/CustomDropdown';
import validator from '@rjsf/validator-ajv8';
import styled from '@emotion/styled';
import { Button } from '@chakra-ui/react';
import { CloseIcon } from '@chakra-ui/icons';
import FileUploadWidget from './components/FileUploadWidget';
// import { FORM_DATA, JSON_SCHEMA, UI_SCHEMA } from './hepler';

let onSubmit: any = null;
const FormContainer = forwardRef<any, any>((props, ref) => {
  const [formData, setFormData] = useState();
  const [jsonschema, setJsonSchema] = useState();
  const [uischema, setUiSchema] = useState();

  // Custom field sử dụng VirtualizedSelect

  const widgets = {
    selectFromData: CustomSelect,
    fileUploadWidget: FileUploadWidget
  };
  const fields = {
    NullField
  };

  useImperativeHandle(
    ref,
    () => ({
      showForm: (formData: any, jsonschema: any, uischema: any, _onSubmit: () => void): any => {
        setFormData(formData);
        setJsonSchema(jsonschema);
        setUiSchema(uischema);
        onSubmit = _onSubmit;
      }
    }),
    []
  );

  const onHide = () => {
    setFormData(undefined);
    setJsonSchema(undefined);
    setUiSchema(undefined);
  };
  if (!formData) {
    return null;
  }

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        background: 'rgba(0,0,0, 0.1)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 9999,
        overflow: 'auto'
      }}
    >
      <div
        style={{
          maxWidth: '80vw',
          maxHeight: '90%',
          background: '#fff',
          padding: 30,
          borderRadius: 8,
          overflow: 'auto',
          position: 'relative'
        }}
      >
        <StyleContainer>
          <Form
            schema={jsonschema as any}
            uiSchema={uischema}
            formData={formData}
            noHtml5Validate
            showErrorList={false}
            fields={fields}
            widgets={widgets}
            onSubmit={({ formData }) => {
              onSubmit?.(formData);
              onHide();
            }}
            // onChange={({ formData }) => console.log(formData)}
            validator={validator}
            className='bottom_class'
          />
        </StyleContainer>
        <Button
          style={{
            width: '24px',
            background: 'white'
          }}
          minW='auto'
          borderRadius='50%'
          boxSize={5}
          p={0}
          onClick={onHide}
          pos={'absolute'}
          top={2}
          right={2}
        >
          <CloseIcon boxSize={3} />
        </Button>
      </div>
    </div>
  );
});

const StyleContainer = styled.div`
  min-width: max(350px, 40vw);
  bottom_class: {
    padding-bottom: 16;
  }
  .css-qq8aff {
    grid-gap: 8px;
  }
  .Select-control {
    display: flex;
    justify-content: space-between;
    width: 100%;
    background-color: red;
  }
`;

FormContainer.displayName = 'FormContainer';
export default FormContainer;
