<?php

use App\Http\Controllers\Api\DeputizeController;
use App\Http\Controllers\Api\FairsController;
use App\Http\Controllers\Api\InvitationCardController;
use App\Http\Controllers\Api\PaperCardController;
use App\Http\Controllers\Api\SpecialSellController;
use App\Http\Controllers\Api\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

//Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//    return $request->user();
//});


Route::prefix('fairs')->group(function () {
    Route::get('' , [FairsController::class,'index']);
    Route::get('/fair-places' , [FairsController::class,'fairPlaces']);
});

Route::prefix('invitation-cards')->group(function () {
    Route::get('{fairId}' , [InvitationCardController::class,'index']);
    Route::get('{id}/show' , [InvitationCardController::class,'show']);
    Route::post('{id}/survey' , [InvitationCardController::class,'survey']);
});


Route::prefix('paper-cards')->group(function () {
    Route::get('{id}/show' ,[PaperCardController::class , 'show']);
});

Route::prefix('special-sells')->group(function () {
    Route::get('{id}/show' ,[SpecialSellController::class , 'show']);
});

Route::prefix('deputize')->group(function () {
    Route::get('{id}/show' ,[DeputizeController::class , 'show']);
});

//Route::prefix('user')->group(function () {
//    Route::post('' ,[UserController::class , 'store']);
//});
