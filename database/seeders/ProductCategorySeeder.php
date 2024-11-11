<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\Product;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ProductCategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Asignar categorías a productos (puedes hacerlo de manera aleatoria o fija)
        $product1 = Product::find(1); // Producto con id 1
        $product2 = Product::find(2); // Producto con id 2

        $categoryA = Category::find(1); // Categoría con id 1
        $categoryB = Category::find(2); // Categoría con id 2
        $categoryC = Category::find(3); // Categoría con id 3

        // Asignar categorías al producto 1
        $product1->categories()->attach([$categoryA->id, $categoryB->id]);

        // Asignar categorías al producto 2
        $product2->categories()->attach([$categoryB->id, $categoryC->id]);

        // Puedes usar attach() para asociar productos y categorías o detach() para eliminarlas
    }
}
