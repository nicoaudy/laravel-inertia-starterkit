<?php

namespace App\Http\Controllers;

use App\Http\Requests\ContactStoreRequest;
use App\Http\Requests\ContactUpdateRequest;
use App\Models\Contact;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ContactController extends Controller
{
    public function index(Request $request)
    {
        return Inertia::render('Contacts/Index', [
            'filters' => $request->all('search', 'perPage'),
            'contacts' => Contact::orderBy('name')
                ->filter($request->only('search', 'perPage'))
                ->paginate($request->input('perPage', 10))
                ->appends($request->all()),

        ]);
    }

    public function create()
    {
        return Inertia::render('Contacts/Create');
    }

    public function store(ContactStoreRequest $request)
    {
        Contact::create($request->validated());

        return redirect()->route('contacts.index')->with('success', 'Contact has been created successfully.');
    }

    public function edit(Contact $contact)
    {
        return Inertia::render('Contacts/Edit', [
            'contact' => $contact,
        ]);
    }

    public function update(Contact $contact, ContactUpdateRequest $request)
    {
        $contact->update($request->validated());

        return redirect()->route('contacts.index')->with('success', 'Contact has been updated successfully.');
    }

    public function destroy(Contact $contact)
    {
        $contact->delete();

        return redirect()->route('contacts.index')->with('error', 'Contact has been deleted successfully.');
    }
}
