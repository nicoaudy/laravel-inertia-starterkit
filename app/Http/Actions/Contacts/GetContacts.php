<?php

namespace App\Http\Actions\Contacts;

use App\Models\Contact;

class GetContacts
{
    public function execute($request)
    {
        return Contact::orderBy('name')
                        ->filter($request->only('search', 'perPage'))
                        ->paginate($request->input('perPage', 10))
                        ->appends($request->all());
    }
}
