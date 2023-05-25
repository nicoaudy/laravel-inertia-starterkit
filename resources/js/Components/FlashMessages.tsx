import React, { useEffect } from 'react';
import { usePage } from '@inertiajs/react';
import toast, { Toaster } from 'react-hot-toast';
import { Flash } from '@/types/flash';

const FlashMessages: React.FC = () => {
  const props = usePage().props;
  const flash = props.flash as Flash;

  useEffect(() => {
    if (flash.success) {
      toast.success(flash.success);
    }

    if (flash.info) {
      toast(flash.info, {
        icon: '💪🏻',
      });
    }

    if (flash.warning) {
      toast(flash.warning, {
        icon: '⚠️',
      });
    }

    if (flash.error) {
      toast.error(flash.error);
    }
  }, [flash]);

  return (
    <>
      <Toaster
        position='top-right'
        toastOptions={{
          duration: 5000,
        }}
      />
    </>
  );
};

export default FlashMessages;
