<?php

namespace Database\Seeders;

use App\Models\Product;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Http\File;
use Illuminate\Support\Facades\Storage;

class ProductSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Rutas de las imágenes originales (en storage/app/public/images)
        $imagePath1 = storage_path('app/public/images/camisa4.jpg');  // Imagen de camisa4
        $imagePath2 = storage_path('app/public/images/niño1.png');   // Imagen de niño1
        $imagePath3 = storage_path('app/public/images/niño2.png');   // Imagen de niño2
        $imagePath4 = storage_path('app/public/images/pantalon1.png'); // Imagen de pantalon1

        // Verificar que las imágenes existan
        if (!file_exists($imagePath1) || !file_exists($imagePath2) || !file_exists($imagePath3) || !file_exists($imagePath4)) {
            echo "Las imágenes no existen en la ruta especificada.\n";
            return;
        }

        // Generar nombres únicos para las imágenes
        $imageName1 = 'camisa4-' . time() . '.jpg';
        $imageName2 = 'niño1-' . time() . '.png';
        $imageName3 = 'niño2-' . time() . '.png';
        $imageName4 = 'pantalon1-' . time() . '.png';

        // Mover las imágenes al directorio de almacenamiento público
        $imageStored1 = Storage::disk('public')->putFileAs('products', new File($imagePath1), $imageName1);
        $imageStored2 = Storage::disk('public')->putFileAs('products', new File($imagePath2), $imageName2);
        $imageStored3 = Storage::disk('public')->putFileAs('products', new File($imagePath3), $imageName3);
        $imageStored4 = Storage::disk('public')->putFileAs('products', new File($imagePath4), $imageName4);

        // Obtener las URLs públicas de las imágenes almacenadas
        $imageUrl1 = Storage::url('products/' . $imageName1);
        $imageUrl2 = Storage::url('products/' . $imageName2);
        $imageUrl3 = Storage::url('products/' . $imageName3);
        $imageUrl4 = Storage::url('products/' . $imageName4);

        // Crear productos con varias imágenes almacenadas en un campo `json`
        $product1 = Product::factory()->create([
            'id' => 1,
            'name' => 'Camisa de flores',
            'description' => 'Descripción del Producto A. Este es un producto de ejemplo.',
            'price' => 29.99,
            'images' => json_encode([$imageUrl1, $imageUrl3]),  // Guardamos las URLs de las imágenes como un array en formato JSON
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        $product2 = Product::factory()->create([
            'id' => 2,
            'name' => 'Camisa básica',
            'description' => 'Descripción del Producto B. Otro producto de ejemplo para la base de datos.',
            'price' => 49.99,
            'images' => json_encode([$imageUrl2, $imageUrl4]),  // Guardamos las URLs de las imágenes como un array en formato JSON
            'created_at' => now(),
            'updated_at' => now(),
        ]);
    }
}
