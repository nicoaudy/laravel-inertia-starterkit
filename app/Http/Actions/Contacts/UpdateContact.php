<?php

namespace App\Http\Actions\Contacts;

use App\Models\Contact;

class UpdateContact
{
    public function execute(Contact $contact, array $request)
    {
        return $contact->update([
            "name" => $request['name'],
            "email" => $request['email'],
            "phone" => $request['phone'],
            "address" => $request['address'],
            "city" => $request['city'],
            "region" => $request['region'],
            "country" => $request['country'],
            "postal_code" => $request['postal_code'],
        ]);
    }
}
