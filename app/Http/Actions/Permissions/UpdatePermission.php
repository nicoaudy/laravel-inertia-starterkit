<?php

namespace App\Http\Actions\Permissions;

use App\Models\Permission;

class UpdatePermission
{
    public function execute(Permission $permission, array $request)
    {
        $permission->update(['name' => strtolower($request['name'])]);
        $permission->users()->sync($request['users']);
    }
}
