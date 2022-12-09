<?php

namespace App\Http\Controllers\Management;

use App\Http\Controllers\Controller;
use App\Http\Requests\RoleRequest;
use App\Models\Permission;
use App\Models\Role;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;
use stdClass;

class RoleController extends Controller
{
    public function index(Request $request)
    {
        return Inertia::render('Management/Roles/Index', [
            'filters' => $request->all('search', 'perPage'),
            'roles' => Role::filter($request->only('search', 'perPage'))->paginate($request->input('perPage', 10))->appends($request->all())
        ]);
    }

    public function create()
    {
        return Inertia::render('Management/Roles/Create', [
            'permissions' => Permission::query()->select(['name', 'id'])->get(),
        ]);
    }

    public function store(RoleRequest $request)
    {
        $role = Role::create([
            'name' => $request->name,
        ]);

        if ($request->has('permissions') && count($request->get('permissions')) > 0) {
            $role->syncPermissions($request->get('permissions'));
        }

        return redirect()->route('management.roles.index')->with('success', 'Role created.');
    }

    public function show($id)
    {
        //
    }

    public function edit(Role $role)
    {
        return Inertia::render(
            'Management/Roles/Edit',
            [
                'role' => $this->getRolesWithUsers($role),
                'users' => $this->getUsersWithRoles(),
                'rolePermissions' => $role->getAllPermissions()->pluck('id'),
                'permissions' => Permission::query()->select(['name', 'id'])->get(),
            ]
        );
    }

    public function update(RoleRequest $request, Role $role)
    {
        $role->update(['name' => $request->get('name')]);
        $role->users()->sync($request->get('users'));
        $role->syncPermissions($request->get('permissions'));

        return redirect()->back()->with('success', 'Role updated.');
    }

    public function destroy($id)
    {
        $role = Role::findOrFail($id);
        $role->delete();

        return redirect()->route('management.roles.index')->with('success', 'Role deleted.');
    }

    private function getUsersWithRoles()
    {
        $collection = collect();
        User::query()->select(['name', 'email', 'id'])->with(['roles' => function ($permission) {
            $permission->select(['id']);
        }])->get()->map(function ($user) use (&$collection) {
            $data = new stdClass();
            $data->id = $user->id;
            $data->name = $user->name;
            $data->roles = collect();

            if ($user->roles->count() > 0) {
                foreach ($user->roles as $permission) {
                    $data->roles->push($permission->id);
                }
            }

            $collection->push($data);
        });

        return $collection->sortBy('name')->values();
    }

    private function getRolesWithUsers(Role $role)
    {
        $alteredRole = new stdClass();
        $alteredRole->id = $role->id;
        $alteredRole->name = $role->name;
        $alteredRole->users = collect();

        $role->load('users');

        if ($role->users->count() > 0) {
            foreach ($role->users as $user) {
                $alteredRole->users->push($user->id);
            }
        }

        return $alteredRole;
    }
}
