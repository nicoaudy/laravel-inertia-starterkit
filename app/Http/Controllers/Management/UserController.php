<?php

namespace App\Http\Controllers\Management;

use App\Http\Controllers\Controller;
use App\Http\Requests\UserStoreRequest;
use App\Http\Requests\UserUpdateRequest;
use App\Models\User;
use App\Traits\FileUploadTrait;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Request;
use Inertia\Inertia;

class UserController extends Controller
{
    use FileUploadTrait;

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

        if ($request->hasFile('file')) {
            $request->merge(['photo' => $this->upload($request->file('file'))]);
        }

        User::create($request->all());

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

        if ($request->is_photo_removed) {
            $this->remove($user->photo);
            $user->update(['photo' => null]);
        }

        if ($request->hasFile('file')) {
            $this->remove($user->photo);
            $user->update(['photo' => $this->upload($request->file('file'))]);
        }

        if ($request->password) {
            $user->update(['password' => bcrypt($request->password)]);
        }

        return back()->with('success', 'User updated.');
    }

    public function destroy(User $user)
    {
        $this->can('delete user');

        if ($user->photo) {
            $this->remove($user->photo);
        }
        $user->delete();

        return Redirect::route('management.users.index')->with('success', 'User deleted.');
    }
}
