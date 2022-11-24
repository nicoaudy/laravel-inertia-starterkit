import React from 'react';
import MainMenu from '@/Components/MainMenu';
import FlashMessages from '@/Components/FlashMessages';
import TopHeader from '@/Components/TopHeader';
import BottomHeader from '@/Components/BottomHeader';

export default function AuthenticatedLayout({ children }) {
  return (
    <div className="flex flex-col">
      <div className="flex flex-col h-screen">
        <div className="md:flex">
          <TopHeader />
          <BottomHeader />
        </div>
        <div className="flex flex-grow overflow-hidden">
          <MainMenu className="flex-shrink-0 hidden w-56 p-12 overflow-y-auto bg-indigo-800 md:block" />
          {/* To reset scroll region (https://inertiajs.com/pages#scroll-regions) add `scroll-region="true"` to div below */}
          <div className="w-full px-4 py-8 overflow-hidden overflow-y-auto md:p-12">
            <FlashMessages />
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
