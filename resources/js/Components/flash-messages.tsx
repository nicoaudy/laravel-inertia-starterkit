import React, { useEffect } from 'react';
import { usePage } from '@inertiajs/react';
import { Flash } from '@/types/interfaces';
import { Toaster } from '@/Components/ui/toaster';
import { useToast } from '@/Components/ui/use-toast';

const FlashMessages: React.FC = () => {
  const props = usePage().props;
  const flash = props.flash as Flash;
  const { toast } = useToast();

  useEffect(() => {
    if (flash.success) {
      toast({
        title: 'Berhasil',
        description: flash.success,
      });
    }

    if (flash.error) {
      toast({
        variant: 'destructive',
        description: flash.error,
      });
    }
  }, [flash]);

  return <Toaster />;
};

export default FlashMessages;
