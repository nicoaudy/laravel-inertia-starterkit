<?php

namespace App\Http\Actions\Roles;

use App\Models\Role;

class RemoveRole
{
    public function execute(Role $role)
    {
        $role->delete();
    }
}
