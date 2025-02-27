<?php

use App\Http\Controllers\Api\Admin\AnimeCardController;
use App\Http\Controllers\Api\Admin\AnimiCategoryController;
use App\Http\Controllers\Api\Admin\CartController;
use App\Http\Controllers\Api\Admin\EpisodeController;
use App\Http\Controllers\Api\Admin\LoginController;
use App\Http\Controllers\Api\Admin\ProductCategoryController;
use App\Http\Controllers\Api\Admin\ProductController;
use App\Http\Controllers\Api\Admin\StripePaymentController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Illuminate\Foundation\Auth\EmailVerificationRequest;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');


Route::prefix('login')->name('login.')->group(function() {
    Route::post('register', [LoginController::class, 'register'])->name('register');
    Route::post('login', [LoginController::class, 'login'])->name('login');
    Route::get('/dashboard', [LoginController::class, 'dashboard'])->middleware( 'verified');
    Route::Post('/logout', [LoginController::class, 'logout']);
    Route::post('/auth/refresh', [LoginController::class, 'refreshToken']);
    Route::get('/index', [LoginController::class, 'index']);


    // Route::get('email/verify/{id}/{hash}', [LoginController::class, 'emailVerify'])
    // ->middleware('signed') // Validate the signed URL
    // ->name('verification.verify'); // Define the named route here

    // Route::post('email/verification-notification', [LoginController::class, 'resend'])
    //     ->middleware('throttle:6,1')
    //     ->name('verification.send');
});

Route::prefix('categoryCard')->name('categoryCard.')->group(function() {
    Route::post('categorycreate', [AnimiCategoryController::class, 'create'])->name('categorycreate');
    Route::get('categorylist', [AnimiCategoryController::class, 'list'])->name('categorylist');
    Route::delete('/categorydelete/{id}', [AnimiCategoryController::class, 'delete'])->name('categorydelete');
    Route::get('categoryshow/{id}', [AnimiCategoryController::class, 'show'])->name('categoryshow');
    Route::post('categoryupdate/{id}', [AnimiCategoryController::class, 'update'])->name('categoryupdate');
});

Route::prefix('animecard')->name('animecard.')->group(function() {
    Route::post('animecreate', [AnimeCardController::class, 'store'])->name('animecreate');
    Route::get('animelist', [AnimeCardController::class, 'list'])->name('animelist');
    Route::delete('/animedelete/{id}', [AnimeCardController::class, 'delete'])->name('animedelete');
    Route::get('animeshow/{id}', [AnimeCardController::class, 'show'])->name('animeshow');
    Route::put('animeupdate/{id}', [AnimeCardController::class, 'update'])->name('animeupdate');
    Route::get('search', [AnimeCardController::class, 'searchproduct'])->name('search');
});

Route::prefix('animeepisode')->name('animeepisode.')->group(function() {
    Route::post('episodecreate', [EpisodeController::class, 'store'])->name('episodecreate');
    Route::get('episodelist', [EpisodeController::class, 'list'])->name('episodelist');
    Route::delete('/episodedelete/{id}', [EpisodeController::class, 'delete'])->name('episodedelete');
    Route::get('episodeshow/{id}', [EpisodeController::class, 'show'])->name('episodeshow');
    Route::put('episodeupdate/{id}', [EpisodeController::class, 'update'])->name('episodeupdate');
    Route::get('/animeepisode/{animeCardId}/with-episodes', [EpisodeController::class, 'showWithEpisodes']);

});

Route::prefix('productcategory')->name('productcategory.')->group(function() {
    Route::post('productcategorycreate', [ProductCategoryController::class, 'create'])->name('productcategorycreate');
    Route::get('productcategorylist', [ProductCategoryController::class, 'list'])->name('productcategorylist');
    Route::delete('/productcategorydelete/{id}', [ProductCategoryController::class, 'delete'])->name('productcategorydelete');
    Route::get('productcategoryshow/{id}', [ProductCategoryController::class, 'show'])->name('productcategoryshow');
    Route::post('productcategoryupdate/{id}', [ProductCategoryController::class, 'update'])->name('productcategoryupdate');
});

Route::prefix('product')->name('product.')->group(function() {
    Route::post('productcreate', [ProductController::class, 'store'])->name('productcreate');
    Route::get('productlist', [productController::class, 'list'])->name('productlist');
    Route::delete('/productdelete/{id}', [productController::class, 'delete'])->name('productdelete');
    Route::get('productshow/{id}', [productController::class, 'show'])->name('productshow');
    Route::post('productupdate/{id}', [productController::class, 'update'])->name('productupdate');
    Route::get('product/{animeCardId}/products', [ProductController::class, 'getProductsByAnimeCard']);
});

Route::prefix('cart')->group(function () {
    Route::post('add/{id}', [CartController::class, 'addToCart']);
    Route::get('getCart', [CartController::class, 'getCart']);
    Route::put('update/{cartItemId}', [CartController::class, 'updateCartItem']);
    Route::delete('remove/{cartItemId}', [CartController::class, 'removeCartItem']);
    Route::post('confirmorder', [CartController::class, 'confirm_order']);
    Route::get('vieworder', [CartController::class, 'view_order']);
    Route::get('ontheway/{id}', [CartController::class, 'on_the_way']);
    Route::get('delivered/{id}', [CartController::class, 'delivered']);
    Route::get('printpdf/{id}', [CartController::class, 'print_pdf']);
    Route::get('myorder', [CartController::class, 'myorders']);
});



Route::post('stripe/create-payment-intent', [StripePaymentController::class, 'createPaymentIntent']);
Route::post('stripe/complete-order', [StripePaymentController::class, 'completeOrder']);


