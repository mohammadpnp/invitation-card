<?php

use App\Http\Controllers\Admin\UsersController;
use App\Http\Controllers\Auth\AdminAuthController;
use App\Http\Controllers\Auth\CompanyAuthController;
use App\Http\Controllers\Auth\UserAuthController ;
use App\Http\Controllers\InvitationCard\InvitationCardController;
use App\Http\Middleware\ShowCardMiddleWare;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::prefix('/admin')->group(function (){

    // Public:
    Route::controller(AdminAuthController::class)->middleware('guest')->group(function() {

        Route::get('/login', 'showLogin')->name('admin.login');
        Route::post('/login', 'authenticate')->name('admin.authenticate');
    });

    // authentication nedded:
    Route::prefix('')->group(function () {

        Route::get('/dashboard', function(){

            return 'logged in';
        })->name('admin.dashboard');

        Route::resource('/users', UsersController::class);
    });
})->name('admin');
