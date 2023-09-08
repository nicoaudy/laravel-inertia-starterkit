<?php

namespace App\Http\Actions\Permissions;

use App\Models\Permission;
use Illuminate\Http\Request;

class GetPermissions
{
    public function execute(Request $request)
    {
        $query = Permission::filter($request->only('search', 'perPage'));
        if ($request->has('sortBy')) {
            $query = $query->orderBy($request->input('sortBy'), $request->input('sortDir', 'asc'));
        }

        return $query->paginate($request->input('perPage', 100))->appends($request->all());
    }
}
