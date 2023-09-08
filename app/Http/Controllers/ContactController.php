<?php

namespace App\Http\Controllers;

use App\Http\Actions\Contacts\GetContacts;
use App\Http\Actions\Contacts\RemoveContact;
use App\Http\Actions\Contacts\StoreContact;
use App\Http\Actions\Contacts\UpdateContact;
use App\Http\Requests\ContactStoreRequest;
use App\Http\Requests\ContactUpdateRequest;
use App\Models\Contact;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ContactController extends Controller
{
    public function index(Request $request, GetContacts $getContacts)
    {
        $this->can('view contact');

        return Inertia::render('Contacts/Index', [
            'filters' => $request->all('search', 'sortBy', 'sortDir', 'perPage'),
            'contacts' => $getContacts->execute($request),
        ]);
    }

    public function create()
    {
        return Inertia::render('Contacts/Create');
    }

    public function store(ContactStoreRequest $request, StoreContact $storeContact)
    {
        $this->can('add contact');

        $storeContact->execute($request->validated());

        return redirect()->route('contacts.index')->with('success', 'Contact has been created successfully.');
    }

    public function edit(Contact $contact)
    {
        return Inertia::render('Contacts/Edit', [
            'contact' => $contact,
        ]);
    }

    public function update(Contact $contact, ContactUpdateRequest $request, UpdateContact $updateContact)
    {
        $this->can('edit contact');

        $updateContact->execute($contact, $request->validated());

        return redirect()->route('contacts.index')->with('success', 'Contact has been updated successfully.');
    }

    public function destroy(Contact $contact, RemoveContact $removeContact)
    {
        $this->can('delete contact');

        $removeContact->execute($contact);

        return redirect()->route('contacts.index')->with('error', 'Contact has been deleted successfully.');
    }
}
