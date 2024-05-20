import { Box, Text } from '@chakra-ui/react';
import React, { useRef, useState } from 'react';

const FileUploadWidget = ({ id, required, readonly, disabled, value, onChange, label }: any) => {
  const [preview, setPreview] = useState(value);

  const refInput = useRef<any>(null);

  const handleFileChange = (event: any) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result.split(',')[1];
        setPreview(reader.result);
        onChange(base64String); // Change here to store base64 string
      };
      reader.readAsDataURL(file);
    }
  };

  const onOpen = () => {
    refInput.current?.click();
  };

  /*
    EXAMPLE FOR UPLOAD
    case 'file':
      if (data?.media?.fullUrlSmall === dataChanges[el]) {
        break;
      }
      if (!dataChanges[el]) {
        obj.file = null;
        break;
      }
      const base64String = dataChanges[el];

      // Chuyển đổi base64 string trở lại thành file
      const byteCharacters = atob(base64String);
      const byteNumbers = new Array(byteCharacters.length);
      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      const blob = new Blob([byteArray], { type: 'image/png' }); // Cập nhật type tùy thuộc vào loại ảnh của bạn
      const file = new File([blob], 'logo.png', { type: 'image/png' });
      obj.file = file;
      break;
  */
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      <label className='css-g6pte' htmlFor={id}>
        {label}
      </label>
      <input
        ref={refInput}
        hidden
        id={id}
        type='file'
        required={required}
        disabled={disabled || readonly}
        onChange={handleFileChange}
      />
      <Box position={'relative'} onClick={onOpen} cursor={'pointer'}>
        {preview ? (
          <img src={preview} alt='Preview' style={{ width: '100px', borderRadius: 4 }} />
        ) : (
          <div
            style={{
              width: 120,
              height: 120,
              background: '#f5f5f5',
              padding: 10,
              borderRadius: 4,
              alignItems: 'center',
              display: 'flex'
            }}
          >
            <Text color={'yellow.500'}>Upload image</Text>
          </div>
        )}
      </Box>
    </div>
  );
};

export default FileUploadWidget;
