<?php

namespace Database\Seeders;

use App\Models\Contact;
use App\Models\User;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class DatabaseSeeder extends Seeder
{
    public function run()
    {
        app()[\Spatie\Permission\PermissionRegistrar::class]->forgetCachedPermissions();

        $adminRole = Role::create(['name' => 'admin']);
        Permission::insert([
            ['guard_name' => 'web', 'name' => 'impersonate', 'created_at' => now()],

            ['guard_name' => 'web', 'name' => 'add contact', 'created_at' => now()],
            ['guard_name' => 'web', 'name' => 'edit contact', 'created_at' => now()],
            ['guard_name' => 'web', 'name' => 'delete contact', 'created_at' => now()],
            ['guard_name' => 'web', 'name' => 'view contact', 'created_at' => now()],

            ['guard_name' => 'web', 'name' => 'add user', 'created_at' => now()],
            ['guard_name' => 'web', 'name' => 'edit user', 'created_at' => now()],
            ['guard_name' => 'web', 'name' => 'delete user', 'created_at' => now()],
            ['guard_name' => 'web', 'name' => 'view user', 'created_at' => now()],

            ['guard_name' => 'web', 'name' => 'add role', 'created_at' => now()],
            ['guard_name' => 'web', 'name' => 'edit role', 'created_at' => now()],
            ['guard_name' => 'web', 'name' => 'delete role', 'created_at' => now()],
            ['guard_name' => 'web', 'name' => 'view role', 'created_at' => now()],

            ['guard_name' => 'web', 'name' => 'add permission', 'created_at' => now()],
            ['guard_name' => 'web', 'name' => 'edit permission', 'created_at' => now()],
            ['guard_name' => 'web', 'name' => 'delete permission', 'created_at' => now()],
            ['guard_name' => 'web', 'name' => 'view permission', 'created_at' => now()],
        ]);
        $adminRole->syncPermissions(Permission::all());

        $adminUser = User::factory()->create([
            'name' => 'John Doe',
            'email' => 'johndoe@example.com',
            'password' => bcrypt('password'),
        ]);
        $adminUser->assignRole('admin');

        $userRole = Role::create(['name' => 'user']);
        $userRole->syncPermissions(['view user', 'view role', 'view permission']);

        User::factory()->count(100)->create();

        foreach (User::where('id', '!=', 1)->get() as $user) {
            $user->assignRole('user');
        }

        Contact::factory()->count(1000)->create();
    }
}
