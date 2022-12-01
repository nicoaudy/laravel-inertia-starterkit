import React from 'react';
import {Inertia} from '@inertiajs/inertia';
import {Link, Head, usePage, useForm} from '@inertiajs/inertia-react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import DeleteButton from '@/Components/DeleteButton';
import LoadingButton from '@/Components/LoadingButton';
import TextInput from '@/Components/TextInput';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import TrashedMessage from '@/Components/TrashedMessage';

const Edit = () => {
    const pageProps = usePage().props;
    const permission = pageProps.permission;

    const {data, setData, errors, put, processing} = useForm({
        name: permission.name || '',
    });

    function handleSubmit(e) {
        e.preventDefault();
        put(route('management.permissions.update', permission.id));
    }

    function destroy() {
        if (confirm('Are you sure you want to delete this permission?')) {
            Inertia.delete(route('management.permissions.destroy', permission.id));
        }
    }

    function restore() {
        if (confirm('Are you sure you want to restore this permission?')) {
            Inertia.put(route('management.permissions.restore', permission.id));
        }
    }

    return (
        <AuthenticatedLayout>
            <Head title={permission.name}/>

            <h1 className="mb-8 text-3xl font-bold">
                <Link
                    href={route('management.permissions.index')}
                    className="text-indigo-600 hover:text-indigo-700"
                >
                    Permissions
                </Link>
                <span className="mx-2 font-medium text-indigo-600">/</span>
                {permission.name}
            </h1>
            {permission.deleted_at && (
                <TrashedMessage onRestore={restore}>
                    This contact has been deleted.
                </TrashedMessage>
            )}
            <div className="max-w-3xl overflow-hidden bg-white rounded shadow">
                <form onSubmit={handleSubmit}>
                    <div className="flex flex-col p-8 my-2 mb-4">
                        <div className="-mx-3 md:flex mb-6">
                            <div className="md:w-1/2 px-3 mb-6 md:mb-0">
                                <InputLabel forInput="name" value="Name"/>
                                <TextInput
                                    type="text"
                                    name="name"
                                    value={data.name}
                                    className="w-full"
                                    handleChange={(e) => setData('name', e.target.value)}
                                />
                                <InputError message={errors.name} className="mt-2"/>
                            </div>
                        </div>

                    </div>
                    <div className="flex items-center px-8 py-4 bg-gray-100 border-t border-gray-200">
                        {!permission.deleted_at && (
                            <DeleteButton onDelete={destroy}>Delete Permission</DeleteButton>
                        )}
                        <LoadingButton
                            loading={processing}
                            type="submit"
                            className="ml-auto btn-primary"
                        >
                            Update Permission
                        </LoadingButton>
                    </div>
                </form>
            </div>
        </AuthenticatedLayout>
    );
};

export default Edit;
