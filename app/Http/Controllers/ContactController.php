<?php

namespace App\Http\Controllers;

use App\Http\Requests\ContactStoreRequest;
use App\Http\Requests\ContactUpdateRequest;
use App\Http\Resources\ContactCollection;
use App\Http\Resources\ContactResource;
use App\Models\Contact;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ContactController extends Controller
{
    public function index(Request $request)
    {
        return Inertia::render('Contacts/Index', [
            'filters' => $request->all('search', 'perPage'),
            'contacts' => new ContactCollection(
                Contact::orderBy('name')
                    ->filter($request->only('search', 'perPage'))
                    ->paginate($request->input('perPage', 10))
                    ->appends($request->all())
            ),
        ]);
    }

    public function create()
    {
        return Inertia::render('Contacts/Create');
    }

    public function store(ContactStoreRequest $request)
    {
        Contact::create($request->validated());

        return redirect()->route('contacts.index')->with('success', 'Contact created.');
    }

    public function edit(Contact $contact)
    {
        return Inertia::render('Contacts/Edit', [
            'contact' => new ContactResource($contact),
        ]);
    }

    public function update(Contact $contact, ContactUpdateRequest $request)
    {
        $contact->update($request->validated());

        return redirect()->back()->with('success', 'Contact updated.');
    }

    public function destroy(Contact $contact)
    {
        $contact->delete();

        return redirect()->back()->with('success', 'Contact deleted.');
    }

    public function restore(Contact $contact)
    {
        $contact->restore();

        return redirect()->back()->with('success', 'Contact restored.');
    }
}
