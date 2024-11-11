<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use Tymon\JWTAuth\Exceptions\JWTException;
use Tymon\JWTAuth\Facades\JWTAuth;

class JwtMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param \Illuminate\Http\Request $request
     * @param \Closure $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        try {
            // Intenta autenticar el token
            $user = JWTAuth::parseToken()->authenticate();
        } catch (JWTException $e) {
            // Si el token no es válido o está ausente
            return response()->json(['error' => 'Token no válido o expirado'], 401);
        }

        // Agrega el usuario autenticado a la solicitud
        $request->merge(['user' => $user]);

        return $next($request);
    }
}
