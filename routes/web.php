<?php

use App\Http\Controllers\ContactController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\ImagesController;
use App\Http\Controllers\ReportsController;
use App\Http\Controllers\UsersController;
use Illuminate\Support\Facades\Route;

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

Route::resource('contacts', ContactController::class)->middleware('auth');
Route::put('contacts/{contact}/restore')->name('contact.restore')->middleware('auth');

// Reports
Route::get('reports')->name('reports')->uses(ReportsController::class)->middleware('auth');

// 500 error
Route::get('500', function () {
    echo $fail;
});


require __DIR__.'/auth.php';
