<?php

use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
    //web: __DIR__.'/../routes/web.php', se desabilita para solo trabajr con api
        api: __DIR__ . '/../routes/api.php',
        apiPrefix: 'api/v1', //definimos el apiprefix podemos listar las rutas
        commands: __DIR__ . '/../routes/console.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware) {
        //
    })
    ->withExceptions(function (Exceptions $exceptions) {
        $exceptions->render(function (\Illuminate\Validation\ValidationException $throwable) {
            return jsonResponse(status: 422, message: $throwable->getMessage(), errors: $throwable->errors());
        });

    })->create();
