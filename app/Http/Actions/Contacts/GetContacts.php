<?php

namespace App\Http\Actions\Contacts;

use App\Models\Contact;

class GetContacts
{
    public function execute($request)
    {
        $query = Contact::filter($request->only('search', 'perPage'));
        if ($request->has('sortBy')) {
            $query = $query->orderBy($request->input('sortBy'), $request->input('sortDir', 'asc'));
        } else {
            $query = $query->orderBy('name');
        }

        return $query->paginate($request->input('perPage', 100))->appends($request->all());
    }
}
