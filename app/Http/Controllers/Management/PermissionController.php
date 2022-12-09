<?php

namespace App\Http\Controllers\Management;

use App\Http\Controllers\Controller;
use App\Http\Requests\PermissionRequest;
use App\Http\Resources\PermissionCollection;
use App\Models\Permission;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;
use stdClass;

class PermissionController extends Controller
{
    public function index(Request $request)
    {
        return Inertia::render('Management/Permissions/Index', [
            'filters' => $request->all('search', 'perPage'),
            'contacts' => new PermissionCollection(
                Permission::filter($request->only('search', 'perPage'))->paginate($request->input('perPage', 10))->appends($request->all())
            ),
        ]);
    }

    public function create()
    {
        return Inertia::render('Management/Permissions/Create');
    }

    public function store(PermissionRequest $request)
    {
        $permission = new Permission();
        $permission->name = $request->name;
        $permission->save();

        return redirect()->route('management.permissions.index')->with('success', 'Permission created.');
    }

    public function show($id)
    {
        //
    }

    public function edit(Permission $permission)
    {
        return Inertia::render('Management/Permissions/Edit', [
            'permission' => $this->getPermissionWithUsers($permission),
            'users' => $this->getUsersWithPermissions(),
        ]);
    }

    public function update(PermissionRequest $request, Permission $permission)
    {
        $permission->update(['name' => strtolower($request->get('name'))]);
        $permission->users()->sync($request->get('users'));

        return redirect()->back()->with('success', 'Permission updated.');
    }

    public function destroy($id)
    {
        $permission = Permission::findOrFail($id);
        $permission->delete();

        return redirect()->route('management.permissions.index')->with('success', 'Permission deleted.');
    }

    private function getUsersWithPermissions()
    {
        $collection = collect();
        User::query()->select(['name', 'email', 'id'])->with(['permissions' => function ($permission) {
            $permission->select(['id']);
        }])->get()->map(function ($user) use (&$collection) {
            $data = new stdClass();
            $data->id = $user->id;
            $data->name = $user->name;
            $data->permissions = collect();

            if ($user->permissions->count() > 0) {
                foreach ($user->permissions as $permission) {
                    $data->permissions->push($permission->id);
                }
            }

            $collection->push($data);
        });

        return $collection->sortBy('name')->values();
    }

    private function getPermissionWithUsers(Permission $permission)
    {
        $alteredPermission = new stdClass();
        $alteredPermission->id = $permission->id;
        $alteredPermission->name = $permission->name;
        $alteredPermission->users = collect();

        $permission->load('users');

        if ($permission->users->count() > 0) {
            foreach ($permission->users as $user) {
                $alteredPermission->users->push($user->id);
            }
        }

        return $alteredPermission;
    }
}
