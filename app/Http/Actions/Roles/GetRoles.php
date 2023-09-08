<?php

namespace App\Http\Actions\Roles;

use App\Models\Role;
use Illuminate\Http\Request;

class GetRoles
{
    public function execute(Request $request)
    {
        $query = Role::filter($request->only('search', 'perPage'));
        if ($request->has('sortBy')) {
            $query = $query->orderBy($request->input('sortBy'), $request->input('sortDir', 'asc'));
        }

        return $query->paginate($request->input('perPage', 100))->appends($request->all());
    }
}
