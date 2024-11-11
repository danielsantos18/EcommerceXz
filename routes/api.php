<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::post('/login', [\App\Http\Controllers\AuthController::class, 'login']);
Route::apiResource('/users', \App\Http\Controllers\UserController::class);
Route::middleware('jwt.auth')->get('/users/{id}', [\App\Http\Controllers\UserController::class, 'show']);
Route::apiResource('/products', \App\Http\Controllers\ProductController::class);
Route::apiResource('/categories', \App\Http\Controllers\CategoryController::class);
Route::get('/products/product-detail/{id}', [\App\Http\Controllers\ProductController::class, 'get_product_detail']);
