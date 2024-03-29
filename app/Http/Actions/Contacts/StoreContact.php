<?php

namespace App\Http\Actions\Contacts;

use App\Models\Contact;

class StoreContact
{
    public function execute(array $request)
    {
        Contact::create([
            'name' => $request['name'],
            'email' => $request['email'],
            'phone' => $request['phone'],
            'address' => $request['address'],
            'city' => $request['city'],
            'region' => $request['region'],
            'country' => $request['country'],
            'postal_code' => $request['postal_code'],
        ]);
    }
}
