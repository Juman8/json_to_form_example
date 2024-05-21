import { useCustomToast } from '@/hooks';
import { Box, Text } from '@chakra-ui/react';
import styled from '@emotion/styled';
import { useRef, useState } from 'react';

const FileUploadWidget = ({ id, required, readonly, disabled, value, onChange, label, ...props }: any) => {
  const [preview, setPreview] = useState(value);

  const refInput = useRef<any>(null);

  const { toastFail } = useCustomToast();

  const fileTypeAccepted = props.schema.fileType;

  const handleFileChange = (event: any) => {
    const file = event.target.files[0];
    if (file) {
      if (fileTypeAccepted && !fileTypeAccepted.includes(file?.type)) {
        toastFail({
          title: `Image files must be in the following formats: ${fileTypeAccepted}`
        });
        return;
      }
      const reader: any = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result.split(',')[1];
        const fileType = `${file.type}`;
        setPreview(reader.result);
        onChange(base64String + `$_$${fileType}`); // Change here to store base64 string
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) {
      if (!file.type || (fileTypeAccepted && !fileTypeAccepted.includes(file.type))) {
        toastFail({
          title: `Image files must be in the following formats: ${fileTypeAccepted}`
        });
        return;
      }
      const reader: any = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result.split(',')[1];
        const fileType = `${file.type}`;
        setPreview(reader.result);
        onChange(base64String + `$_$${fileType}`); // Change here to store base64 string
      };
      reader.readAsDataURL(file);
    }
  };

  const getFileForm = () =>{
      case 'file':
        if (previousUrlFile === dataChanges[el]) {
          break;
        }
        if (!dataChanges[el]) {
          obj.file = null;
          break;
        }
        const arrData = dataChanges[el].split('$_$');
        const base64String = arrData[0];
        const fileType = arrData[1] ?? 'image/png';

        // Chuyển đổi base64 string trở lại thành file
        const byteCharacters = atob(base64String);
        const byteNumbers = new Array(byteCharacters.length);
        for (let i = 0; i < byteCharacters.length; i++) {
          byteNumbers[i] = byteCharacters.charCodeAt(i);
        }
        const byteArray = new Uint8Array(byteNumbers);
        const blob = new Blob([byteArray], { type: fileType }); // Cập nhật type tùy thuộc vào loại ảnh của bạn
        const file = new File([blob], 'logo.png', { type: fileType });
        obj.file = file;
        break;
  }

  const overlayDrop = useRef<HTMLDivElement | null>(null);

  const onOpen = () => {
    refInput.current?.click();
  };
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column'
      }}
      onDrop={(e) => {
        e.preventDefault();
        handleDrop(e);
        if (overlayDrop.current) {
          overlayDrop.current.style.display = 'none';
        }
      }}
      onDragLeave={(e) => {
        e.preventDefault();
        if (overlayDrop.current) {
          overlayDrop.current.style.display = 'none';
        }
      }}
      onDragOver={(e) => e.preventDefault()}
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
        accept={fileTypeAccepted}
      />
      <Box
        position={'relative'}
        onClick={onOpen}
        cursor={'pointer'}
        style={{
          width: 'fit-content'
        }}
      >
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
const DropImageHere = styled.div`
  @keyframes scale {
    from {
      transform: scale(0.9);
    }
    to {
      transform: scale(1.3);
    }
  }
  animation: scale 1.5s cubic-bezier(0.68, -0.55, 0.265, 1.55) infinite alternate;
`;

export default FileUploadWidget;
