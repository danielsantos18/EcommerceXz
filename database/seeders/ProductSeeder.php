<?php

namespace Database\Seeders;

use App\Models\Product;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ProductSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Product::factory()->create([
            'id' => 1,
            'name' => 'Producto A',
            'description' => 'Descripción del Producto A. Este es un producto de ejemplo.',
            'price' => 29.99,
            'image' => 'products/product_a.jpg',
            'created_at' => now(),  // Usamos la fecha actual
            'updated_at' => now(),  // Usamos la fecha actual
        ]);

        Product::factory()->create([
            'id' => 2,
            'name' => 'Producto B',
            'description' => 'Descripción del Producto B. Otro producto de ejemplo para la base de datos.',
            'price' => 49.99,
            'image' => 'products/product_b.jpg',
            'created_at' => now(),  // Usamos la fecha actual
            'updated_at' => now(),  // Usamos la fecha actual
        ]);
    }
}
