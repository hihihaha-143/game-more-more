<?php

use Illuminate\Support\Facades\Route;

Route::get('/ping', function () {
    return response()->json([
        'status' => 'ok',
        'message' => 'pong from Laravel',
        'timestamp' => now()->toIso8601String(),
    ]);
});
