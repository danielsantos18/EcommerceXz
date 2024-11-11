<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ProductRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'name' => 'required|string|min:2|max:50', // Nombre del producto, requerido y con máximo 255 caracteres
            'description' => 'required|string|max:150', // Descripción, requerido, máximo 1000 caracteres
            'price' => 'required|numeric|min:0.01', // Precio, requerido, debe ser numérico y mayor a 0
            'image' => 'required|image|mimes:jpeg,webp,png,jpg,gif,svg|max:2048', // Imagen, requerido, debe ser una imagen con tipo específico y tamaño máximo de 2MB
        ];
    }
}
