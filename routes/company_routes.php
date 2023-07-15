<?php

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


// React
Route::get('/', function () {return view('react');});

// Companies
Route::middleware('auth')->group(function () {

    Route::prefix('invitation-card')->group(function () {
        Route::name('invitation-card.')->group(function () {
            Route::get('/index',[InvitationCardController::class , 'index'])->name('index');
            Route::get('/create', [InvitationCardController::class, 'create'])->name('create');
            Route::post('/store', [InvitationCardController::class, 'weddingStore'])->name('store.wedding');
            Route::get('/show/{url}', [InvitationCardController::class, 'show'])->name('show');
            Route::delete('/destroy/{id}', [InvitationCardController::class, 'destroyWedding'])->name('destroy.wedding');
            Route::get('/edit/{id}', [InvitationCardController::class, 'edit'])->name('edit.wedding');
            Route::patch('/update/{id}', [InvitationCardController::class, 'update'])->name('update.wedding');
            Route::get('/confirm-request/{id}', [InvitationCardController::class, 'confirmRequest'])->name('confirm-request');
            Route::get('/show/survey/{id}', [InvitationCardController::class, 'showSurvey'])->name('show-survey');
            Route::post('/store/paper-card', [InvitationCardController::class, 'paperStore'])->name('store.paper');
            Route::get('/edit/paper-card/{id}', [InvitationCardController::class, 'paperEdit'])->name('edit.paper');
            Route::patch('/update/paper-card/{id}', [InvitationCardController::class, 'paperUpdate'])->name('update.paper');
            Route::get('pdf/paper-card/export/{url}', [InvitationCardController::class, 'exportPaperCardPdf'])->name('export.paper');

        });

    });

    Route::post('logout', [CompanyAuthController::class, 'destroy'])->name('logout');

});


Route::middleware('guest')->group(function () {

//    Route::get('/', function () {return view('welcome');});

    Route::get('/login', [CompanyAuthController::class, 'create'])->name('login.create');
    Route::post('/login', [CompanyAuthController::class, 'store'])->name('login.store');

    Route::get('/register', [CompanyAuthController::class , 'showRegister'])->name('register.create');
    Route::post('/register', [CompanyAuthController::class, 'storeRegister'])->name('register.store');

});


Route::get('/user/register', [UserAuthController::class , 'showRegister'])->name('user.register.create');
Route::post('/user/register', [UserAuthController::class, 'storeRegister'])->name('user.register.store');


Route::get('/user/{url}', [InvitationCardController::class , 'showCardToUser'])->name('user.show.card')->middleware(ShowCardMiddleWare::class);
Route::post('/user/survey/{cardId}', [InvitationCardController::class , 'submitSurvey'])->name('user.submit-survey');
