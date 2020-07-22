<?php

use App\Helpers\SpeedtestHelper;
use App\Http\Controllers\SpeedtestController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::group([
    'middleware' => 'api',
    'prefix' => 'settings'
], function () {
    Route::get('/config', 'SettingsController@config')
         ->name('settings.config');
    Route::get('/', 'SettingsController@index')
         ->name('settings.index');
    Route::put('/', 'SettingsController@store')
         ->name('settings.store');
    Route::post('/', 'SettingsController@store')
         ->name('settings.update');
    Route::post('/bulk', 'SettingsController@bulkStore')
         ->name('settings.bulk.update');

    Route::get('/changelog', 'SettingsController@changelog')
         ->name('settings.changelog');
});

Route::group([
    'middleware' => 'api',
    'prefix' => 'uptime'
], function () {
    Route::get('status', 'UptimeController@status')
         ->name('uptime.status');
});

Route::group([
    'middleware' => 'api',
    'prefix' => 'test'
], function () {
    Route::get('/', 'PingController@index')
         ->name('ping.index');
    Route::get('run', 'PingController@run')
         ->name('ping.run');
});
