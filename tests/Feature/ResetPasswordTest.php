<?php

namespace Tests\Feature;

use App\Models\User;
use App\Notifications\ResetPasswordNotification;
use Database\Seeders\UserSeeder;
use Illuminate\Auth\Notifications\ResetPassword;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Support\Facades\Notification;
use PHPUnit\Framework\Attributes\Test;
use Tests\TestCase;

class ResetPasswordTest extends TestCase
{
    use RefreshDatabase;

    //para trabajar con los seeders

    //funcion protegida
    protected function setUp(): void
    {
        parent::setUp();
        $this->seed(UserSeeder::class);// le decimos la clase seed a la cual queremos llamar
    }

    //hacer los maximos entornos posibles, se copia y pega mucho
    //prueba para un usuario existenete en la BD
    #[Test]
    public function an_existing_user_can_login(): void
    {
        //HACE QUE LAS NOTIFICACIONES NO SE ENVIEN PERO SI TESTEAR SOBRE ELLAS
        Notification::fake();

        #nos dara las exepciones completas, se usa comunmente
        //$this->withoutDeprecationHandling();

        # teniendo las credenciales del usuario registrado
        $data = [
            'email' => 'example@example.com'
        ];

        # haciendo la peticion a la ruta con post
        $response = $this->postJson("{$this->apiBase}/reset-password", $data); // se concatena la variable global de para facilitar el llamado de rutas

        #nos da el response de la peticion http
        //dd($response);
        $response->dump();

        # esperando un status 200 y una data como response de la peticion
        $response->assertStatus(200);
        $response->assertJsonFragment(['message' => ['OK']]);
        $user = User::find(1);
        Notification::assertSentTo([$user], ResetPasswordNotification::class);
    }
}
