<?php

use App\Http\Controllers\ContactController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\ReportsController;
use App\Http\Controllers\UsersController;
use Illuminate\Support\Facades\Route;

Route::middleware('auth')->group(function () {
    Route::get('/', DashboardController::class)->name('dashboard');

    Route::resource('contacts', ContactController::class);
    Route::put('contacts/{contact}/restore', [ContactController::class, 'restore'])->name('contacts.restore');

    Route::resource('users', UsersController::class);
    Route::put('users/{user}/restore', [UsersController::class, 'restore'])->name('users.restore');

    Route::get('reports', ReportsController::class)->name('reports');

    Route::get('dummy-users', DashboardController::class)->name('dummy-users');
    Route::get('dummy-permissions', DashboardController::class)->name('dummy-permissions');
    Route::get('dummy-roles', DashboardController::class)->name('dummy-roles');
});

// 500 error
Route::get('500', function () {
    abort(500);
});

require __DIR__.'/auth.php';
