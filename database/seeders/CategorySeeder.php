<?php

namespace Database\Seeders;

use App\Models\Category;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Category::factory()->create([
            'id' => 1,
            'name' => 'Ropa de Hombre'
        ]);

        Category::factory()->create([
            'id' => 2,
            'name' => 'Ropa de Mujer'
        ]);

        Category::factory()->create([
            'id' => 3,
            'name' => 'Ropa de Niño'
        ]);

        Category::factory()->create([
            'id' => 4,
            'name' => 'Accesorios'
        ]);
    }
}
