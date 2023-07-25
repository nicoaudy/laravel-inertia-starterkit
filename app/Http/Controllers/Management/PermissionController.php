<?php

namespace App\Http\Controllers\Management;

use App\Http\Actions\Permissions\GetPermissions;
use App\Http\Actions\Permissions\RemovePermission;
use App\Http\Actions\Permissions\StorePermission;
use App\Http\Actions\Permissions\UpdatePermission;
use App\Http\Controllers\Controller;
use App\Http\Requests\PermissionRequest;
use App\Models\Permission;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;
use stdClass;

class PermissionController extends Controller
{
    public function index(Request $request, GetPermissions $getPermissions)
    {
        $this->can('view permission');

        return Inertia::render('Management/Permissions/Index', [
            'filters' => $request->all('search', 'perPage'),
            'permissions' => $getPermissions->execute($request),
        ]);
    }

    public function create()
    {
        return Inertia::render('Management/Permissions/Create');
    }

    public function store(PermissionRequest $request, StorePermission $storePermission)
    {
        $this->can('add permission');

        $storePermission->execute($request->validated());

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

    public function update(PermissionRequest $request, Permission $permission, UpdatePermission $updatePermission)
    {
        $this->can('edit permission');

        $updatePermission->execute($permission, $request->validated());

        return redirect()->back()->with('success', 'Permission updated.');
    }

    public function destroy(Permission $permission, RemovePermission $removePermission)
    {
        $this->can('delete permission');

        $removePermission->execute($permission);

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
