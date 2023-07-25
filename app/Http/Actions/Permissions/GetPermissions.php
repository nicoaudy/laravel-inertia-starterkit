<?php

namespace App\Http\Actions\Permissions;

use App\Models\Permission;
use Illuminate\Http\Request;

class GetPermissions
{
    public function execute(Request $request)
    {
        return Permission::filter($request->only('search', 'perPage'))->paginate($request->input('perPage', 10))->appends($request->all());
    }
}
