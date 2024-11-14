<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Http\Requests\UserRequest;
use App\Models\User;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $users = User::all();
        return jsonResponse(data: $users, message: 'Usuario registrado con exito.', status: 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(UserRequest $request)
    {
        User::create($request->all());
        return jsonResponse(message: 'Usuario registrado con exito.', status: 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        // Buscar el usuario por ID
        $user = User::find($id);

        if (!$user) {
            // Si el usuario no existe, devolver un error
            return jsonResponse(
                data: null,
                message: 'Usuario no encontrado.',
                status: 404,
                errors: ['Usuario no existente']
            );
        }

        // Si el usuario es encontrado, devolverlo con el mensaje de éxito
        return jsonResponse(
            data: $user,
            message: 'Usuario encontrado',
            status: 200
        );
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UserRequest $request, string $id)
    {
        try {
            // Buscar el usuario por ID
            $user = User::find($id);

            if (!$user) {
                // Si el usuario no existe, devolver un error
                return jsonResponse(
                    data: null,
                    message: 'Usuario no encontrado.',
                    status: 404,
                    errors: ['Usuario no existente']
                );
            }

            // Obtener los datos validados de la solicitud
            $validatedData = $request->validated();

            // Eliminar la contraseña de los datos a actualizar si está presente
            // Esto evita que la contraseña se actualice por error
            unset($validatedData['password']);

            // Realizar la actualización
            if ($user->update($validatedData)) {
                // Si la actualización es exitosa
                return jsonResponse(
                    data: $user,
                    message: 'Usuario actualizado exitosamente.',
                    status: 200
                );
            } else {
                // Si no se pudo actualizar
                return jsonResponse(
                    data: null,
                    message: 'Error al actualizar el usuario.',
                    status: 500,
                    errors: ['No se pudo actualizar el usuario']
                );
            }
        } catch (\Exception $e) {
            // Capturar errores inesperados y devolver un error genérico
            return jsonResponse(
                data: null,
                message: 'Error interno del servidor.',
                status: 500,
                errors: [$e->getMessage()]
            );
        }
    }


    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
