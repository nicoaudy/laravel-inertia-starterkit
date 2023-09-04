<?php

namespace App\Http\Actions\Users;

use App\Models\User;
use Illuminate\Http\Request;

class GetUsers
{
    public function execute(Request $request)
    {
        return User::orderByName()->filter($request->only('search', 'perPage'))->paginate()->appends($request->all());
    }
}
