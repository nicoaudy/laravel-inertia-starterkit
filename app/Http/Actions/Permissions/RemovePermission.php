<?php

namespace App\Http\Actions\Permissions;

use App\Models\Permission;

class RemovePermission
{
    public function execute(Permission $permission)
    {
        $permission->delete();
    }
}
