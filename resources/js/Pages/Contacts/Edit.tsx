import { Head, usePage, router, useForm } from '@inertiajs/react';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Breadcrumbs from '@/components/breadcrumbs';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import InputError from '@/components/input-error';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Can } from '@/components/Can';
import AuthenticatedLayout from '@/layouts/authenticated-layout';

interface Contact {
  address: string;
  city: string;
  country: string;
  created_at: string;
  deleted_at: string;
  email: string;
  id: number;
  name: string;
  phone: string;
  postal_code: string;
  region: string;
  updated_at: string;
}

const items = [
  { title: 'Home', href: route('dashboard') },
  { title: 'Contacts', href: route('contacts.index') },
  { title: 'Edit', href: '#' },
];

const Edit = () => {
  const props = usePage().props;
  const contact = props.contact as Contact;

  const { data, setData, errors, put, processing } = useForm({
    name: contact.name || '',
    email: contact.email || '',
    phone: contact.phone || '',
    address: contact.address || '',
    city: contact.city || '',
    region: contact.region || '',
    country: contact.country || '',
    postal_code: contact.postal_code || '',
  });

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    put(route('contacts.update', contact.id));
  }

  function destroy() {
    router.delete(route('contacts.destroy', contact.id));
  }

  return (
    <>
      <Head title={data.name} />

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
          <div className='w-full max-w-sm flex justify-between space-x-2'>
            <Can permission='delete contact'>
              <AlertDialog>
                <AlertDialogTrigger>
                  <Button type='button' variant='ghost'>
                    Delete
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone. This will permanently delete your data and remove your data from our
                      servers.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={destroy}>Continue</AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </Can>
            <Button type='submit' disabled={processing} loading={processing}>
              Submit
            </Button>
          </div>
        </form>
      </div>
    </>
  );
};

Edit.layout = (page: React.ReactNode) => <AuthenticatedLayout children={page} />;
export default Edit;
