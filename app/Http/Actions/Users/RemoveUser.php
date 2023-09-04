<?php

namespace App\Http\Actions\Users;

use App\Models\User;
use App\Traits\FileUploadTrait;

class RemoveUser
{
    use FileUploadTrait;

    public function execute(User $user)
    {
        if ($user->photo) {
            $this->remove($user->photo);
        }

        $user->delete();
    }
}
