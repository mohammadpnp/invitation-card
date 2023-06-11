<?php

use App\Http\Controllers\Api\FairsController;
use App\Http\Controllers\Api\InvitationCardController;
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



Route::get('/fairs' , [FairsController::class,'index']);
Route::get('/fair-places' , [FairsController::class,'fairPlaces']);
Route::get('/invitation-cards/{fairId}' , [InvitationCardController::class,'index']);
