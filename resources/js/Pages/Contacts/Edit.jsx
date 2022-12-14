import { useState } from 'react';
import { router } from '@inertiajs/react';
import { Link, Head, usePage, useForm } from '@inertiajs/react';
import { TextInput, Modal, Button, Group, Text } from '@mantine/core';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import DeleteButton from '@/Components/DeleteButton';
import LoadingButton from '@/Components/LoadingButton';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import SelectInput from '@/Components/SelectInput';

const Edit = () => {
  const { contact } = usePage().props;
  const [open, setOpen] = useState(false);

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

  function handleSubmit(e) {
    e.preventDefault();
    put(route('contacts.update', contact.id));
  }

  function destroy() {
    router.delete(route('contacts.destroy', contact.id));
  }

  return (
    <>
      <Head title={data.name} />

      <div className="flex justify-between items-center border-b border-gray-300">
        <h1 className="mt-2 mb-6 text-2xl font-semibold">
          <Link
            href={route('contacts.index')}
            className="text-indigo-600 hover:text-indigo-700"
          >
            Contacts
          </Link>
          <span className="font-medium text-indigo-600"> / </span>
          {data.name}
        </h1>
      </div>

      <div className="my-6 max-w-3xl overflow-hidden bg-white rounded shadow">
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col p-8 my-2 mb-4">
            <div className="-mx-3 md:flex mb-6">
              <div className="md:w-1/2 px-3 mb-6 md:mb-0">
                <TextInput
                  label="Name"
                  type="text"
                  name="name"
                  value={data.name}
                  onChange={(e) => setData('name', e.target.value)}
                  error={errors.name}
                />
              </div>
              <div className="md:w-1/2 px-3 mb-6 md:mb-0">
                <TextInput
                  label="Email"
                  type="email"
                  name="email"
                  value={data.email}
                  onChange={(e) => setData('email', e.target.value)}
                  error={errors.email}
                />
              </div>
            </div>

            <div className="-mx-3 md:flex mb-6">
              <div className="md:w-1/2 px-3 mb-6 md:mb-0">
                <TextInput
                  label="Phone"
                  type="text"
                  name="phone"
                  value={data.phone}
                  className="w-full"
                  onChange={(e) => setData('phone', e.target.value)}
                  error={errors.phone}
                />
              </div>

              <div className="md:w-1/2 px-3 mb-6 md:mb-0">
                <TextInput
                  label="Address"
                  type="text"
                  name="address"
                  value={data.address}
                  onChange={(e) => setData('address', e.target.value)}
                  error={errors.address}
                />
              </div>
            </div>

            <div className="-mx-3 md:flex mb-6">
              <div className="md:w-1/2 px-3 mb-6 md:mb-0">
                <TextInput
                  label="City"
                  type="text"
                  name="city"
                  value={data.city}
                  onChange={(e) => setData('city', e.target.value)}
                  error={errors.city}
                />
              </div>
              <div className="md:w-1/2 px-3 mb-6 md:mb-0">
                <TextInput
                  label="Region"
                  type="text"
                  name="region"
                  value={data.region}
                  onChange={(e) => setData('region', e.target.value)}
                  error={errors.region}
                />
              </div>
            </div>

            <div className="-mx-3 md:flex mb-6">
              <div className="md:w-1/2 px-3 mb-6 md:mb-0">
                <InputLabel forInput="country" value="Country" />
                <SelectInput
                  label="Country"
                  name="country"
                  errors={errors.country}
                  value={data.country}
                  className="w-full"
                  onChange={(e) => setData('country', e.target.value)}
                >
                  <option value=""></option>
                  <option value="CA">Canada</option>
                  <option value="US">United States</option>
                </SelectInput>
                <InputError message={errors.country} className="mt-2" />
              </div>

              <div className="md:w-1/2 px-3 mb-6 md:mb-0">
                <TextInput
                  label="Postal Code"
                  type="text"
                  name="postal_code"
                  value={data.postal_code}
                  onChange={(e) => setData('postal_code', e.target.value)}
                  error={errors.postal_code}
                />
              </div>
            </div>
          </div>
          <div className="flex items-center px-8 py-4 bg-gray-100 border-t border-gray-200">
            <DeleteButton onDelete={() => setOpen(true)}>
              Delete Contact
            </DeleteButton>
            <LoadingButton
              loading={processing}
              type="submit"
              className="ml-auto btn-primary"
            >
              Update Contact
            </LoadingButton>
          </div>
        </form>
      </div>

      <Modal
        opened={open}
        withCloseButton
        onClose={() => setOpen(false)}
        title="Are you sure want to delete this data?"
      >
        <Text size="md" color="dimmed">
          Once confirmed, you cannot redo this action
        </Text>
        <Group className="mt-4" position="right">
          <Button variant="outline" color="gray" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button variant="outline" color="red" onClick={destroy}>
            Confirm
          </Button>
        </Group>
      </Modal>
    </>
  );
};

Edit.layout = (page) => <AuthenticatedLayout children={page} />;
export default Edit;
