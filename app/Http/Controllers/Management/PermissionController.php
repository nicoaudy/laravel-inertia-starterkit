<?php

namespace App\Http\Controllers\Management;

use App\Http\Controllers\Controller;
use App\Http\Requests\PermissionRequest;
use App\Http\Resources\PermissionCollection;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Spatie\Permission\Models\Permission;

class PermissionController extends Controller
{
    public function index(Request $request)
    {
        return Inertia::render('Management/Permissions/Index', [
            'filters' => $request->all('search', 'perPage'),
            'contacts' => new PermissionCollection(
                Permission::orderBy('name')
                    ->when($request->search, function ($query) use ($request) {
                        $query->where('name', 'like', '%'.$request->search.'%');
                    })
                    ->paginate($request->input('perPage', 10))
                    ->appends($request->all())
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

    public function edit($id)
    {
        $permission = Permission::findOrFail($id);

        return Inertia::render('Management/Permissions/Edit', compact('permission'));
    }

    public function update(PermissionRequest $request, $id)
    {
        $permission = Permission::findOrFail($id);
        $permission->name = $request->name;
        $permission->save();

        return redirect()->back()->with('success', 'Permission updated.');
    }

    public function destroy($id)
    {
        $permission = Permission::findOrFail($id);
        $permission->delete();

        return redirect()->route('management.permissions.index')->with('success', 'Permission deleted.');
    }
}
