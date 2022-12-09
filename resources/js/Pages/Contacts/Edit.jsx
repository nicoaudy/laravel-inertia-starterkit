import { router } from '@inertiajs/react';
import { Link, Head, usePage, useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import DeleteButton from '@/Components/DeleteButton';
import LoadingButton from '@/Components/LoadingButton';
import TextInput from '@/Components/TextInput';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import SelectInput from '@/Components/SelectInput';

const Edit = () => {
  const { contact } = usePage().props;

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
    if (confirm('Are you sure you want to delete this contact?')) {
      router.delete(route('contacts.destroy', contact.id));
    }
  }

  return (
    <AuthenticatedLayout>
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
                <InputLabel forInput="name" value="Name" />
                <TextInput
                  type="text"
                  name="name"
                  value={data.name}
                  className="w-full"
                  handleChange={(e) => setData('name', e.target.value)}
                />
                <InputError message={errors.name} className="mt-2" />
              </div>
              <div className="md:w-1/2 px-3 mb-6 md:mb-0">
                <InputLabel forInput="email" value="Email" />
                <TextInput
                  type="email"
                  name="email"
                  value={data.email}
                  className="w-full"
                  handleChange={(e) => setData('email', e.target.value)}
                />
                <InputError message={errors.email} className="mt-2" />
              </div>
            </div>

            <div className="-mx-3 md:flex mb-6">
              <div className="md:w-1/2 px-3 mb-6 md:mb-0">
                <InputLabel forInput="phone" value="Phone" />
                <TextInput
                  type="number"
                  name="phone"
                  value={data.phone}
                  className="w-full"
                  handleChange={(e) => setData('phone', e.target.value)}
                />
                <InputError message={errors.phone} className="mt-2" />
              </div>

              <div className="md:w-1/2 px-3 mb-6 md:mb-0">
                <InputLabel forInput="address" value="Address" />
                <TextInput
                  type="text"
                  name="address"
                  value={data.address}
                  className="w-full"
                  handleChange={(e) => setData('address', e.target.value)}
                />
                <InputError message={errors.address} className="mt-2" />
              </div>
            </div>

            <div className="-mx-3 md:flex mb-6">
              <div className="md:w-1/2 px-3 mb-6 md:mb-0">
                <InputLabel forInput="city" value="City" />
                <TextInput
                  type="text"
                  name="city"
                  value={data.city}
                  className="w-full"
                  handleChange={(e) => setData('city', e.target.value)}
                />
                <InputError message={errors.city} className="mt-2" />
              </div>
              <div className="md:w-1/2 px-3 mb-6 md:mb-0">
                <InputLabel forInput="region" value="Province/State" />
                <TextInput
                  type="text"
                  name="region"
                  value={data.region}
                  className="w-full"
                  handleChange={(e) => setData('region', e.target.value)}
                />
                <InputError message={errors.region} className="mt-2" />
              </div>
            </div>

            <div className="-mx-3 md:flex mb-6">
              <div className="md:w-1/2 px-3 mb-6 md:mb-0">
                <InputLabel forInput="country" value="Country" />
                <SelectInput
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
              </div>

              <div className="md:w-1/2 px-3 mb-6 md:mb-0">
                <InputLabel forInput="postal_code" value="Postal Code" />
                <TextInput
                  type="text"
                  name="postal_code"
                  value={data.postal_code}
                  className="w-full"
                  handleChange={(e) => setData('postal_code', e.target.value)}
                />
                <InputError message={errors.postal_code} className="mt-2" />
              </div>
            </div>
          </div>
          <div className="flex items-center px-8 py-4 bg-gray-100 border-t border-gray-200">
            {!contact.deleted_at && (
              <DeleteButton onDelete={destroy}>Delete Contact</DeleteButton>
            )}
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
    </AuthenticatedLayout>
  );
};

export default Edit;
