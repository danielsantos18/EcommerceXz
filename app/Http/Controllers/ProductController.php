<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $products = Product::all();
        return jsonResponse(
            data: $products,
            status: 200,
            message: 'Productos listados con éxito!',
            errors: []
        );
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        // Intentamos encontrar el producto por su ID
        $product = Product::find($id);

        // Verificamos si el producto existe
        if (!$product) {
            // Si el producto no se encuentra, respondemos con un error 404
            return jsonResponse(
                data: [],
                status: 404,
                message: 'Producto no encontrado!',
                errors: []
            );
        }

        // Si el producto existe, devolvemos el producto en formato JSON
        return jsonResponse(
            data: $product,
            status: 200,
            message: 'Productos listado con éxito!',
            errors: []
        );
    }


    /**
     * Show the form for editing the specified resource.
     */
    public
    function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public
    function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public
    function destroy(string $id)
    {
        //
    }

    /*
    public function get_product_category(string $id)
    {
        // Usamos el query builder para evitar la inyección SQL.
        $product = DB::select('SELECT * FROM product_with_categories WHERE product_id = :id', ['id' => $id]);

        return $product;
    }
     */

    public function get_product_detail($id)
    {
        // Obtener el producto junto con las categorías asociadas
        $product = DB::table('products')
            ->join('category_product', 'products.id', '=', 'category_product.product_id')
            ->join('categories', 'categories.id', '=', 'category_product.category_id')
            ->select('products.id AS product_id', 'products.name AS product_name', 'products.description', 'products.price')
            ->where('products.id', '=', $id)
            ->first();  // Usamos 'first' porque solo esperamos un producto

        // Si no se encuentra el producto
        if (!$product) {
            return jsonResponse(
                data: [],
                status: 404,
                message: 'Producto no encontrado',
                errors: ['Producto no encontrado']
            );
        }

        // Obtener las categorías asociadas
        $categories = DB::table('categories')
            ->join('category_product', 'categories.id', '=', 'category_product.category_id')
            ->where('category_product.product_id', '=', $id)
            ->pluck('categories.name');  // Pluck para obtener solo el nombre de las categorías

        // Convertir a array
        $categories = $categories->toArray();

        // Responder con el producto y sus categorías
        return jsonResponse(
            data: [
                [
                    'product_id' => $product->product_id,
                    'name' => $product->product_name,
                    'description' => $product->description,
                    'price' => $product->price,
                    'categories' => $categories  // Devolver categorías como un array
                ]
            ],
            status: 200,
            message: 'Producto encontrado con éxito',
            errors: []
        );
    }
}
