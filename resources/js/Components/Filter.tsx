import useFilterPagination from '@/hooks/useFilterPagination';
import { TextInput } from '@mantine/core';

const Filter = () => {
  const [form, , handleChange] = useFilterPagination();

  return (
    <div className='flex flex-col md:flex-row justify-between my-6'>
      <div className='flex md:justify-start items-center mb-2 md:mb-0'>
        <label className='mr-2'>Showing</label>
        <div>
          <select className='form-select form-select-sm' name='perPage' value={form.perPage} onChange={handleChange}>
            <option value='10'>10</option>
            <option value='25'>25</option>
            <option value='50'>50</option>
            <option value='100'>100</option>
          </select>
        </div>
        <label className='ml-2'>Entries</label>
      </div>
      <TextInput
        className='w-full md:w-1/3'
        type='text'
        name='search'
        value={form.search}
        onChange={handleChange}
        placeholder='Search…'
      />
    </div>
  );
};

export default Filter;
