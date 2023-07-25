<?php

namespace App\Http\Actions\Users;

use App\Models\User;
use App\Traits\FileUploadTrait;

class StoreUser
{
    use FileUploadTrait;

    public function execute(array $request)
    {
        if ($request['file']) {
            $request['photo'] = $this->upload($request['file']);
        }

        User::create($request);
    }
}
