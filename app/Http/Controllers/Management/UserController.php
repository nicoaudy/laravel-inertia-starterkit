<?php

namespace App\Http\Controllers\Management;

use App\Http\Actions\Users\GetUsers;
use App\Http\Actions\Users\RemoveUser;
use App\Http\Actions\Users\StoreUser;
use App\Http\Actions\Users\UpdateUser;
use App\Http\Controllers\Controller;
use App\Http\Requests\UserStoreRequest;
use App\Http\Requests\UserUpdateRequest;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;

class UserController extends Controller
{
    public function index(Request $request, GetUsers $getUsers)
    {
        $this->can('view user');

        return Inertia::render('Management/Users/Index', [
            'filters' => $request->all('search', 'sortBy', 'sortDir', 'perPage'),
            'users' => $getUsers->execute($request),
        ]);
    }

    public function create()
    {
        return Inertia::render('Management/Users/Create');
    }

    public function store(UserStoreRequest $request, StoreUser $storeUser)
    {
        $this->can('add user');

        $storeUser->execute($request->validated());

        return Redirect::route('management.users.index')->with('success', 'User created.');
    }

    public function edit(User $user)
    {
        return Inertia::render('Management/Users/Edit', [
            'user' => $user,
        ]);
    }

    public function update(User $user, UserUpdateRequest $request, UpdateUser $updateUser)
    {
        $this->can('edit user');

        $updateUser->execute($user, $request->validated());

        return back()->with('success', 'User updated.');
    }

    public function destroy(User $user, RemoveUser $removeUser)
    {
        $this->can('delete user');

        $removeUser->execute($user);

        return Redirect::route('management.users.index')->with('success', 'User deleted.');
    }
}
