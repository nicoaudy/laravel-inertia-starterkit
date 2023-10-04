import React, { useCallback } from "react";
import { Accept, useDropzone } from "react-dropzone";

interface FileDropzoneProps {
  onDrop: (acceptedFiles: File[]) => void;
  accept?: Accept;
  maxSize?: number;
  multiple?: boolean; // New prop for allowing multiple files
  children: React.ReactNode;
}

const FileDropzone: React.FC<FileDropzoneProps> = ({ onDrop, children, accept, maxSize, multiple }) => {
  const handleDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (onDrop) {
        onDrop(acceptedFiles);
      }
    },
    [onDrop]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: handleDrop,
    accept,
    maxSize,
    multiple,
  });

  return (
    <div
      className={`hover:cursor-pointer border-dashed border-2 ${
        isDragActive ? "border-blue-500" : "border-gray-300"
      } p-8 rounded-md text-center`}
      {...getRootProps()}>
      <input {...getInputProps()} />
      {isDragActive ? <div className='text-blue-500'>{children}</div> : <div>{children}</div>}
    </div>
  );
};

export default FileDropzone;
