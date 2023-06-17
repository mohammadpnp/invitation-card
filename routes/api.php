<?php

use App\Http\Controllers\Api\DeputizeController;
use App\Http\Controllers\Api\FairsController;
use App\Http\Controllers\Api\InvitationCardController;
use App\Http\Controllers\Api\PaperCardController;
use App\Http\Controllers\Api\SpecialSellController;
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
    Route::get('show/{Id}' , [InvitationCardController::class,'show']);
});


Route::prefix('paper-cards')->group(function () {
    Route::get('{Id}/show' ,[PaperCardController::class , 'show']);
});

Route::prefix('special-sells')->group(function () {
    Route::get('{Id}/show' ,[SpecialSellController::class , 'show']);
});

Route::prefix('deputize')->group(function () {
    Route::get('{Id}/show' ,[DeputizeController::class , 'show']);
});
