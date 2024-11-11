<?php

namespace Category;

use Database\Seeders\CategorySeeder;
use Database\Seeders\ProductSeeder;
use Illuminate\Foundation\Testing\RefreshDatabase;
use PHPUnit\Framework\Attributes\Test;
use Tests\TestCase;

class CategoryListTest extends TestCase
{

    //para trabajar con los seeders
    use RefreshDatabase;

    //funcion protegida
    protected function setUp(): void
    {
        parent::setUp();
        $this->seed(CategorySeeder::class);// le decimos la clase seed a la cual queremos llamar
    }

    #[Test]
    public function categories_can_be_listed(): void
    {
        #nos dara las exepciones completas, se usa comunmente
        $this->withoutDeprecationHandling();

        //TENIENDO LOS PRODUCTOS EN BD
        //HACIENDO LA PETICIION GET PARA OBTENER LOS PRODUCTOS
        $response = $this->getJson("{$this->apiBase}/categories"); // se concatena la variable global de para facilitar el llamado de rutas

        $response->dump();  // Muestra la respuesta
        //dd($response->getContent());

        //ESPERANDO UN STATUS 200 Y LA DATA CON LOS PRODUCTOS
        $response->assertStatus(200);
    }
}
