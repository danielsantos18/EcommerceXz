<?php

namespace App\Http\Requests;

use App\Models\User;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UserRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        // Iniciamos las reglas comunes
        $rules = [
            'name' => 'required|min:2',
            'last_name' => 'required|min:2',
            'address' => 'required|min:5',
            'phone_number' => 'required|numeric|digits:10',
            // Validación del correo
            'email' => [
                'required',
                'email',
                'max:255',
                Rule::unique('users', 'email')->ignore($this->route('user')), // Ignora la validación de único para el usuario actual
            ],
        ];

        // Si estamos en el proceso de registro (POST), la contraseña es obligatoria
        if ($this->isMethod('post')) {
            $rules['password'] = 'required|string|min:8';  // La contraseña es obligatoria solo para el registro
        } else {
            // Si estamos en la actualización (PUT), la contraseña es opcional
            $rules['password'] = 'nullable|string|min:8';  // La contraseña es opcional solo en la actualización
        }

        return $rules;
    }
}
