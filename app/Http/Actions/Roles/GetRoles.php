<?php

namespace App\Http\Actions\Roles;

use App\Models\Role;
use Illuminate\Http\Request;

class GetRoles
{
    public function execute(Request $request)
    {
        return Role::filter($request->only('search', 'perPage'))->paginate($request->input('perPage', 10))->appends($request->all());
    }
}
