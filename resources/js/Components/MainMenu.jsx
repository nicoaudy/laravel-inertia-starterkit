import React from 'react';
import MainMenuItem from '@/Components/MainMenuItem';

export default ({ className }) => {
  return (
    <div className={className}>
      <MainMenuItem text="Dashboard" link="dashboard" icon="dashboard" />
      <MainMenuItem text="Contacts" link="contacts.index" icon="office" />
      <MainMenuItem text="Reports" link="reports" icon="printer" />
    </div>
  );
};
