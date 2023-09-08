<?php

namespace App\Http\Actions\Users;

use App\Models\User;
use Illuminate\Http\Request;

class GetUsers
{
    public function execute(Request $request)
    {
        $query = User::filter($request->only('search', 'perPage'));
        if ($request->has('sortBy')) {
            $query = $query->orderBy($request->input('sortBy'), $request->input('sortDir', 'asc'));
        } else {
            $query = $query->orderBy('name');
        }

        return $query->paginate($request->input('perPage', 100))->appends($request->all());
    }
}
