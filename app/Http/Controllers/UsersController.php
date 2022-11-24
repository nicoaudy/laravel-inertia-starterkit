<?php

namespace App\Http\Controllers;

use App\Http\Requests\UserStoreRequest;
use App\Http\Requests\UserUpdateRequest;
use App\Http\Resources\UserCollection;
use App\Http\Resources\UserResource;
use App\Models\User;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Request;
use Inertia\Inertia;

class UsersController extends Controller
{
    public function index()
    {
        return Inertia::render('Users/Index', [
            'filters' => Request::all('search', 'role', 'trashed'),
            'users' => new UserCollection(
                User::orderByName()
                    ->filter(Request::only('search', 'role', 'trashed'))
                    ->paginate()
                    ->appends(Request::all())
            ),
        ]);
    }

    public function create()
    {
        return Inertia::render('Users/Create');
    }

    public function store(UserStoreRequest $request)
    {
        User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => $request->password,
            'owner' => $request->owner,
            'photo_path' => $request->file('photo') ? $request->file('photo')->store('users') : null,
        ]);

        return Redirect::route('users.index')->with('success', 'User created.');
    }

    public function edit(User $user)
    {
        return Inertia::render('Users/Edit', [
            'user' => new UserResource($user),
        ]);
    }

    public function update(User $user, UserUpdateRequest $request)
    {
        $user->update([
            'name' => $request->name,
            'email' => $request->email,
            'owner' => $request->owner,
        ]);

        if ($request->file('photo')) {
            $user->update(['photo_path' => $request->file('photo')->store('users')]);
        }

        if ($request->password) {
            $user->update(['password' => bcrypt($request->password)]);
        }

        return Redirect::back()->with('success', 'User updated.');
    }

    public function destroy(User $user)
    {
        $user->delete();

        return Redirect::back()->with('success', 'User deleted.');
    }

    public function restore(User $user)
    {
        $user->restore();

        return Redirect::back()->with('success', 'User restored.');
    }
}
