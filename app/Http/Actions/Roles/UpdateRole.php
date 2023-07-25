<?php

namespace App\Http\Actions\Roles;

use App\Models\Role;

class UpdateRole
{
    public function execute(Role $role, array $request)
    {
        $role->update(['name' => $request['name']]);
        $role->users()->sync($request['users']);
        $role->syncPermissions($request['permissions']);
    }
}
