import React from 'react';
import useFilterPagination from '@/hooks/useFilterPagination';
import { Input } from '@/components/ui/input';
import { Button } from './ui/button';
import { Cross2Icon } from '@radix-ui/react-icons';

const Filter: React.FC = () => {
  const [form, setForm, handleChange] = useFilterPagination();

  return (
    <div className='flex space-x-2'>
      <Input
        className='w-[150px] lg:w-[250px]'
        type='text'
        name='search'
        value={form.search}
        onChange={handleChange as React.ChangeEventHandler<HTMLInputElement>}
        placeholder='Search...'
      />
      {form.search && (
        <Button variant='ghost' onClick={() => setForm({ ...form, search: '' })}>
          Reset
          <Cross2Icon className='ml-2 h-4 w-4' />
        </Button>
      )}
    </div>
  );
};

export default Filter;
