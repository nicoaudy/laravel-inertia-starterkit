<?php

use App\Http\Controllers\ContactsController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\ImagesController;
use App\Http\Controllers\OrganizationsController;
use App\Http\Controllers\ReportsController;
use App\Http\Controllers\UsersController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// Route::get('/', function () {
    // return Inertia::render('Dashboard/Index');
    // return Inertia::render('Welcome', [
    //     'canLogin' => Route::has('login'),
    //     'canRegister' => Route::has('register'),
    //     'laravelVersion' => Application::VERSION,
    //     'phpVersion' => PHP_VERSION,
    // ]);
// });


// Route::get('/dashboard', function () {
//     return Inertia::render('Dashboard');
// })->middleware(['auth', 'verified'])->name('dashboard');


// Route::get('login')->name('login')->uses([LoginController::class, 'showLoginForm'])->middleware('guest');
// Route::post('login')->name('login.attempt')->uses([LoginController::class, 'login'])->middleware('guest');
// Route::post('logout')->name('logout')->uses([LoginController::class, 'logout']);

// Dashboard
Route::get('/')->name('dashboard')->uses(DashboardController::class)->middleware('auth');

// Users
Route::get('users')->name('users')->uses([UsersController::class, 'index'])->middleware('remember', 'auth');
Route::get('users/create')->name('users.create')->uses([UsersController::class, 'create'])->middleware('auth');
Route::post('users')->name('users.store')->uses([UsersController::class, 'store'])->middleware('auth');
Route::get('users/{user}/edit')->name('users.edit')->uses([UsersController::class, 'edit'])->middleware('auth');
Route::put('users/{user}')->name('users.update')->uses([UsersController::class, 'update'])->middleware('auth');
Route::delete('users/{user}')->name('users.destroy')->uses([UsersController::class, 'destroy'])->middleware('auth');
Route::put('users/{user}/restore')->name('users.restore')->uses([UsersController::class, 'restore'])->middleware('auth');

// Images
Route::get('/img/{path}', [ImagesController::class, 'show'])->where('path', '.*');

// Organizations
Route::get('organizations')->name('organizations')->uses([OrganizationsController::class, 'index'])->middleware('remember', 'auth');
Route::get('organizations/create')->name('organizations.create')->uses([OrganizationsController::class, 'create'])->middleware('auth');
Route::post('organizations')->name('organizations.store')->uses([OrganizationsController::class, 'store'])->middleware('auth');
Route::get('organizations/{organization}/edit')->name('organizations.edit')->uses([OrganizationsController::class, 'edit'])->middleware('auth');
Route::put('organizations/{organization}')->name('organizations.update')->uses([OrganizationsController::class, 'update'])->middleware('auth');
Route::delete('organizations/{organization}')->name('organizations.destroy')->uses([OrganizationsController::class, 'destroy'])->middleware('auth');
Route::put('organizations/{organization}/restore')->name('organizations.restore')->uses([OrganizationsController::class, 'restore'])->middleware('auth');

// Contacts
Route::get('contacts')->name('contacts')->uses([ContactsController::class, 'index'])->middleware('remember', 'auth');
Route::get('contacts/create')->name('contacts.create')->uses([ContactsController::class, 'create'])->middleware('auth');
Route::post('contacts')->name('contacts.store')->uses([ContactsController::class, 'store'])->middleware('auth');
Route::get('contacts/{contact}/edit')->name('contacts.edit')->uses([ContactsController::class, 'edit'])->middleware('auth');
Route::put('contacts/{contact}')->name('contacts.update')->uses([ContactsController::class, 'update'])->middleware('auth');
Route::delete('contacts/{contact}')->name('contacts.destroy')->uses([ContactsController::class, 'destroy'])->middleware('auth');
Route::put('contacts/{contact}/restore')->name('contacts.restore')->uses([ContactsController::class, 'restore'])->middleware('auth');

// Reports
Route::get('reports')->name('reports')->uses(ReportsController::class)->middleware('auth');

// 500 error
Route::get('500', function () {
    echo $fail;
});


require __DIR__.'/auth.php';
