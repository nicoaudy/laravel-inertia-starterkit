import React from 'react';

export interface ImagePreviewProps {
  files: File[];
}

export const ImagePreview = React.memo((props: React.PropsWithChildren<ImagePreviewProps>) => (
  <div className='flex space-x-2'>
    {props.files.map((file: File) => (
      <div key={`${file.name}_${file.lastModified}`} className='flex items-center space-x-2'>
        <img src={URL.createObjectURL(file)} alt='Preview' className='h-8 w-8 object-contain' />
        <span>{file.name}</span>
      </div>
    ))}
  </div>
));

ImagePreview.displayName = 'ImagePreview';
