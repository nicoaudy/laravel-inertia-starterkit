import { useState, useEffect } from 'react';
import { usePage } from '@inertiajs/react';
import { Notification } from '@mantine/core';
import { IconCheck, IconX, IconInfoCircle } from '@tabler/icons';

const FlashMessages = () => {
  const [visible, setVisible] = useState(true);
  const { flash } = usePage().props;

  useEffect(() => {
    setVisible(true);

    setTimeout(() => {
      setVisible(false);
    }, 5000);
  }, [flash]);

  return (
    <div className="fixed top-5 right-0 space-y-2">
      {flash.success && visible && (
        <Notification
          icon={<IconCheck size={18} />}
          color="teal"
          onClick={() => setVisible(false)}
        >
          {flash.success}
        </Notification>
      )}

      {flash.info && visible && (
        <Notification
          icon={<IconInfoCircle size={18} />}
          color="primary"
          onClick={() => setVisible(false)}
        >
          {flash.info}
        </Notification>
      )}

      {flash.warning && visible && (
        <Notification
          icon={<IconInfoCircle size={18} />}
          color="yellow"
          onClick={() => setVisible(false)}
        >
          {flash.warning}
        </Notification>
      )}

      {flash.error && visible && (
        <Notification
          icon={<IconX size={18} />}
          color="red"
          onClick={() => setVisible(false)}
        >
          {flash.error}
        </Notification>
      )}
    </div>
  );
};

export default FlashMessages;
