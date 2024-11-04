<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Tymon\JWTAuth\Facades\JWTAuth;

class AuthController extends Controller
{
    //creamos la funcion login
    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|string|email',
            'password' => 'required|min:8'
        ]);

        $credentials = request(['email', 'password']);

        if (!$token = auth()->attempt($credentials)) {
            return jsonResponse(status: 401, message: 'Unauthorized', errors: 'Correo o contraseña invalidos');
        }

        // Obtener el usuario autenticado
        $user = JWTAuth::user();

        // Crear un array de claims personalizados
        $customClaims = [
            'name' => $user->name,
            'last_name' => $user->last_name, // Por ejemplo, si tienes roles
            'address' => $user->address,
            'phone_number' => $user->phone_number,
            'email' => $user->email,
            'password' => $user->password,
        ];

        // Generar el token con los claims personalizados
        $token = JWTAuth::customClaims($customClaims)->attempt($credentials);

        return jsonResponse(data: [
            'token' => $token,
            'expires_in' => auth()->factory()->getTTL() * 60
        ]);
    }
}
