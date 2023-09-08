import { Head, useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/layouts/authenticated-layout';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Breadcrumbs from '@/components/breadcrumbs';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import InputError from '@/components/input-error';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';

const items = [
  { title: 'Home', href: route('dashboard') },
  { title: 'Contacts', href: route('contacts.index') },
  { title: 'Create', href: '#' },
];

const Create = () => {
  const { data, setData, errors, post, processing } = useForm<{
    name: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    region: string;
    country: string;
    postal_code: string;
  }>({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    region: '',
    country: '',
    postal_code: '',
  });

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    post(route('contacts.store'));
  }

  return (
    <>
      <Head title='Create Contact' />

      <div className='space-y-6'>
        <Breadcrumbs items={items} />

        <form className='space-y-6' onSubmit={handleSubmit}>
          <div className='grid w-full max-w-sm items-center gap-1.5'>
            <Label htmlFor='name'>Name</Label>
            <Input name='name' type='text' value={data.name} onChange={(e) => setData('name', e.target.value)} />
            <InputError message={errors.name} />
          </div>
          <div className='grid w-full max-w-sm items-center gap-1.5'>
            <Label htmlFor='email'>Email</Label>
            <Input name='email' type='email' value={data.email} onChange={(e) => setData('email', e.target.value)} />
            <InputError message={errors.email} />
          </div>
          <div className='grid w-full max-w-sm items-center gap-1.5'>
            <Label htmlFor='phone'>Phone</Label>
            <Input name='phone' type='tel' value={data.phone} onChange={(e) => setData('phone', e.target.value)} />
            <InputError message={errors.phone} />
          </div>
          <div className='grid w-full max-w-sm items-center gap-1.5'>
            <Label htmlFor='address'>Address</Label>
            <Textarea name='address' value={data.address} onChange={(e) => setData('address', e.target.value)} />
            <InputError message={errors.phone} />
          </div>
          <div className='grid w-full max-w-sm items-center gap-1.5'>
            <Label htmlFor='city'>City</Label>
            <Input name='city' type='text' value={data.city} onChange={(e) => setData('city', e.target.value)} />
            <InputError message={errors.city} />
          </div>
          <div className='grid w-full max-w-sm items-center gap-1.5'>
            <Label htmlFor='region'>Region</Label>
            <Input name='region' type='text' value={data.region} onChange={(e) => setData('region', e.target.value)} />
            <InputError message={errors.region} />
          </div>
          <div className='grid w-full max-w-sm items-center gap-1.5'>
            <Label htmlFor='country'>Country</Label>
            <Select onValueChange={(e) => setData('country', e)} defaultValue={data.country}>
              <SelectTrigger>
                <SelectValue placeholder='Pilih' />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {[
                    { value: 'CA', label: 'Canada' },
                    { value: 'US', label: 'United States' },
                  ].map((item) => (
                    <SelectItem key={item.value} value={item.value}>
                      {item.label}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className='grid w-full max-w-sm items-center gap-1.5'>
            <Label htmlFor='postal_code'>Postal Code</Label>
            <Input
              name='postal_code'
              type='text'
              value={data.postal_code}
              onChange={(e) => setData('postal_code', e.target.value)}
            />
            <InputError message={errors.postal_code} />
          </div>
          <Button type='submit' disabled={processing} loading={processing}>
            Submit
          </Button>
        </form>
      </div>
    </>
  );
};

Create.layout = (page: React.ReactNode) => <AuthenticatedLayout children={page} />;
export default Create;
