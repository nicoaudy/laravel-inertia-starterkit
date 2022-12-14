import { Head, Link, useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { TextInput, Select } from '@mantine/core';
import PrimaryButton from '@/Components/PrimaryButton';

const Create = () => {
  const { data, setData, errors, post, processing } = useForm({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    region: '',
    country: '',
    postal_code: '',
  });

  function handleSubmit(e) {
    e.preventDefault();
    post(route('contacts.store'));
  }

  return (
    <>
      <Head title="Create Contact" />

      <div className="flex justify-between items-center border-b border-gray-300">
        <h1 className="mt-2 mb-6 text-2xl font-semibold">
          <Link
            href={route('contacts.index')}
            className="text-indigo-600 hover:text-indigo-700"
          >
            Contacts
          </Link>
          <span className="font-medium text-indigo-600"> /</span> Create
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
                <Select
                  label="Country"
                  name="country"
                  errors={errors.country}
                  value={data.country}
                  onChange={(e) => setData('country', e)}
                  data={[
                    { value: 'CA', label: 'Canada' },
                    { value: 'US', label: 'United States' },
                  ]}
                />
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
          <div className="flex items-center justify-end px-8 py-4 bg-gray-100 border-t border-gray-200">
            <PrimaryButton processing={processing} type="submit">
              Submit
            </PrimaryButton>
          </div>
        </form>
      </div>
    </>
  );
};

Create.layout = (page) => <AuthenticatedLayout children={page} />;
export default Create;
