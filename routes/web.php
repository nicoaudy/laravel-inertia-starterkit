<?php

use App\Http\Controllers\ContactController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\ImagesController;
use App\Http\Controllers\ReportsController;
use App\Http\Controllers\UsersController;
use Illuminate\Support\Facades\Route;

// Images
Route::get('/img/{path}', [ImagesController::class, 'show'])->where('path', '.*');

Route::middleware('auth')->group(function () {
    Route::get('/', DashboardController::class)->name('dashboard');

    Route::resource('contacts', ContactController::class);
    Route::put('contacts/{contact}/restore', [ContactController::class, 'restore'])->name('contacts.restore');

    Route::resource('users', UsersController::class);
    Route::put('users/{user}/restore', [UsersController::class, 'restore'])->name('users.restore');

    Route::get('reports', ReportsController::class)->name('reports');
});

// 500 error
Route::get('500', function () {
    abort(500);
});

require __DIR__.'/auth.php';
