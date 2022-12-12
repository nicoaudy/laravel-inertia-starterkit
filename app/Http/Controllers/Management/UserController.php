<?php

namespace App\Http\Controllers\Management;

use App\Http\Controllers\Controller;
use App\Http\Requests\UserStoreRequest;
use App\Http\Requests\UserUpdateRequest;
use App\Models\User;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Request;
use Inertia\Inertia;

class UserController extends Controller
{
    public function index()
    {
        $this->can('view user');

        return Inertia::render('Management/Users/Index', [
            'filters' => Request::all('search', 'perPage'),
            'users' => User::orderByName()
                ->filter(Request::only('search', 'perPage'))
                ->paginate()
                ->appends(Request::all()),
        ]);
    }

    public function create()
    {
        return Inertia::render('Management/Users/Create');
    }

    public function store(UserStoreRequest $request)
    {
        $this->can('add user');

        User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => $request->password,
            'photo_path' => $request->file('photo') ? $request->file('photo')->store('avatar') : null,
        ]);

        return Redirect::route('management.users.index')->with('success', 'User created.');
    }

    public function edit(User $user)
    {
        return Inertia::render('Management/Users/Edit', [
            'user' => $user,
        ]);
    }

    public function update(User $user, UserUpdateRequest $request)
    {
        $this->can('edit user');

        $user->update([
            'name' => $request->name,
            'email' => $request->email,
        ]);

        if ($request->file('photo')) {
            $user->update(['photo_path' => $request->file('photo')->store('avatar')]);
        }

        if ($request->password) {
            $user->update(['password' => bcrypt($request->password)]);
        }

        return Redirect::route('management.users.index')->with('success', 'User updated.');
    }

    public function destroy(User $user)
    {
        $this->can('delete user');

        $user->delete();

        return Redirect::route('management.users.index')->with('success', 'User deleted.');
    }
}
