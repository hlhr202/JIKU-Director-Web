<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the controller to call when that URI is requested.
|
*/

use \App\Http\Middleware\JWTEnsureAuth;

Route::get('/', function () {
    return view('index');
});

/* all authentication related */
Route::group(['middleware'=>'cors','prefix' => 'api'], function()
{
    Route::resource('authenticate', 'AuthenticateController', ['only' => ['index']]);
    Route::post('login', 'AuthenticateController@login');
    Route::post('registry', 'AuthenticateController@registry');
    Route::get('auth', 'AuthenticateController@auth')->middleware(JWTEnsureAuth::class);
});

/* collection control */
Route::group(['middleware'=>['cors','jwtensure'],'prefix'=>'api'], function(){
    Route::get('collections/getall','CollectionController@getCollections');
    Route::post('collections/create', 'CollectionController@createCollection');
});

/* upload control */
Route::group(['middleware'=>['cors','jwtensure'],'prefix'=>'api'], function(){
    Route::post('upload', 'UploadController@post');
});

/* video control */
Route::group(['middleware'=>['cors','jwtensure'],'prefix'=>'api'], function(){
    Route::get('video/getvideos', 'VideoController@getVideos');
    Route::get('video/processbrightness', 'VideoController@processBrightness');
});