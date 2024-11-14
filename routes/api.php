<?php

use Illuminate\Support\Facades\Route;

Route::post('/login', [\App\Http\Controllers\Auth\AuthController::class, 'login']);
Route::post('/register', [\App\Http\Controllers\User\UserController::class, 'store']);
Route::middleware('jwt.auth')->apiResource('/users', \App\Http\Controllers\User\UserController::class);
//Route::middleware('jwt.auth')->get('/users/profile/{id}', [\App\Http\Controllers\UserController::class, 'show']);
Route::apiResource('/products', \App\Http\Controllers\ProductController::class);
Route::apiResource('/categories', \App\Http\Controllers\CategoryController::class);
Route::get('/products/product-detail/{id}', [\App\Http\Controllers\ProductController::class, 'get_product_detail']);
Route::post('/reset-password', [\App\Http\Controllers\Auth\ResetPasswordController::class, 'send']);
