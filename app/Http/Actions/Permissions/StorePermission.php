<?php

namespace App\Http\Actions\Permissions;

use App\Models\Permission;

class StorePermission
{
    public function execute(array $request)
    {
        Permission::create([
            'name' => $request['name'],
        ]);
    }
}
