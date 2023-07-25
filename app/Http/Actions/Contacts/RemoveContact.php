<?php

namespace App\Http\Actions\Contacts;

use App\Models\Contact;

class RemoveContact
{
    public function execute(Contact $contact)
    {
        return $contact->delete();
    }
}
