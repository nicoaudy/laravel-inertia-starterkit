import React, { useState, useRef, ChangeEvent, MouseEventHandler } from 'react';
import { filesize } from '@/utils';

interface ButtonProps {
  text: string;
  onClick: MouseEventHandler<HTMLButtonElement>;
}

interface FileInputProps {
  className?: string;
  name: string;
  label?: string;
  accept: string;
  errors?: string[];
  onChange: (file: File | null) => void;
}

const Button: React.FC<ButtonProps> = ({ text, onClick }) => (
  <button
    type='button'
    className='px-4 py-1 text-xs font-medium text-white bg-gray-600 rounded-sm focus:outline-none hover:bg-gray-700'
    onClick={onClick}>
    {text}
  </button>
);

const FileInput: React.FC<FileInputProps> = ({ className, name, label, accept, errors = [], onChange }) => {
  const fileInput = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);

  function browse() {
    fileInput.current?.click();
  }

  function remove() {
    setFile(null);
    onChange(null);
    if (fileInput.current) {
      fileInput.current.value = '';
    }
  }

  function handleFileChange(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files && e.target.files[0];
    setFile(file);
    onChange(file);
  }

  return (
    <div className={className}>
      {label && (
        <label className='form-label' htmlFor={name}>
          {label}:
        </label>
      )}
      <div className={`form-input p-0 ${errors.length && 'error'}`}>
        <input id={name} ref={fileInput} accept={accept} type='file' className='hidden' onChange={handleFileChange} />
        {!file && (
          <div className='p-2'>
            <Button text='Browse' onClick={browse} />
          </div>
        )}
        {file && (
          <div className='flex items-center justify-between p-2'>
            <div className='flex-1 pr-1'>
              {file.name}
              <span className='ml-1 text-xs text-gray-600'>({filesize(file.size)})</span>
            </div>
            <Button text='Remove' onClick={remove} />
          </div>
        )}
      </div>
      {errors.length > 0 && <div className='form-error'>{errors}</div>}
    </div>
  );
};

export default FileInput;
