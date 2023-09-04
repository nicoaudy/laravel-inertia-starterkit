<?php

namespace App\Http\Actions\Users;

use App\Models\User;
use App\Traits\FileUploadTrait;

class UpdateUser
{
    use FileUploadTrait;

    public function execute(User $user, array $request)
    {
        $user->update([
            'name' => $request['name'],
            'email' => $request['email'],
        ]);

        if ($request['is_photo_removed']) {
            $this->remove($user->photo);
            $user->update(['photo' => null]);
        }

        if ($request['file']) {
            $this->remove($user->photo);
            $user->update(['photo' => $this->upload($request['file'])]);
        }

        if ($request['password']) {
            $user->update(['password' => bcrypt($request['password'])]);
        }
    }
}
