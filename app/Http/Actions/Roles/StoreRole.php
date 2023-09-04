<?php

namespace App\Http\Actions\Roles;

use App\Models\Role;

class StoreRole
{
    public function execute(array $request)
    {
        $role = Role::create([
            'name' => $request['name'],
        ]);

        if (count($request['permissions']) > 0) {
            $role->syncPermissions($request['permissions']);
        }
    }
}
