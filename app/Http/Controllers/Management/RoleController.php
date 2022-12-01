<?php

namespace App\Http\Controllers\Management;

use App\Http\Controllers\Controller;
use App\Http\Requests\RoleRequest;
use App\Http\Resources\RoleCollection;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Spatie\Permission\Models\Role;

class RoleController extends Controller
{
    public function index(Request $request)
    {
        return Inertia::render('Management/Roles/Index', [
            'filters' => $request->all('search', 'perPage'),
            'contacts' => new RoleCollection(
                Role::orderBy('name')
                    ->when($request->search, function ($query) use ($request) {
                        $query->where('name', 'like', '%' . $request->search . '%');
                    })
                    ->paginate($request->input('perPage', 10))
                    ->appends($request->all())
            )
        ]);
    }

    public function create()
    {
        return Inertia::render('Management/Roles/Create');
    }

    public function store(RoleRequest $request)
    {
        $permission = new Role();
        $permission->name = $request->name;
        $permission->save();

        return redirect()->route('management.roles.index')->with('success', 'Role created.');
    }

    public function show($id)
    {
        //
    }

    public function edit($id)
    {
        $role = Role::findOrFail($id);
        return Inertia::render('Management/Roles/Edit', compact('role'));
    }

    public function update(RoleRequest $request, $id)
    {
        $role = Role::findOrFail($id);
        $role->name = $request->name;
        $role->save();

        return redirect()->back()->with('success', 'Role updated.');
    }

    public function destroy($id)
    {
        $role = Role::findOrFail($id);
        $role->delete();

        return redirect()->route('management.roles.index')->with('success', 'Role deleted.');
    }
}
