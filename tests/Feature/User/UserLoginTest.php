<?php

namespace Tests\Feature\User;

use Database\Seeders\UserSeeder;
use Illuminate\Foundation\Testing\RefreshDatabase;
use PHPUnit\Framework\Attributes\Test;
use Tests\TestCase;

class UserLoginTest extends TestCase
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
        #nos dara las exepciones completas, se usa comunmente
        $this->withoutDeprecationHandling();

        # teniendo las credenciales del usuario registrado
        $credentials = [
            'email' => 'example@example.com',
            'password' => 'password'
        ];

        # haciendo la peticion a la ruta con post
        $response = $this->postJson("{$this->apiBase}/login", $credentials); // se concatena la variable global de para facilitar el llamado de rutas

        #nos da el response de la peticion http
        //dd($response);
        $response->dump();

        # esperando un status 200 y una data como response de la peticion
        $response->assertStatus(200);
        $response->assertJsonStructure(['data' => ['token']]);
    }

    // prueba para un usuario no existenete n la BD
    #[Test]
    public function a_non_existing_user_can_login(): void
    {
        #nos dara las exepciones completas, se usa comunmente
        $this->withoutDeprecationHandling();

        # teniendo
        $credentials = [
            'email' => 'example@nonexisting.com',
            'password' => 'password'
        ];

        # haciendo
        $response = $this->postJson("{$this->apiBase}/login", $credentials);

        #nos da el response de la peticion http
        //dd($response);
        $response->dump();

        # esperando
        $response->assertStatus(401);
        $response->assertJsonFragment(['status' => 401, 'message' => 'Correo o contraseña invalidos']);
    }

    // prueba para confirmar que el email sea requerido
    #[Test]
    public function email_must_be_required(): void
    {
        #nos dara las exepciones completas, se usa comunmente
        $this->withoutDeprecationHandling();

        # teniendo la contraseña pero no el email del usuario
        $credentials = [
            'password' => 'password'
        ]; //falta el email

        # haciendo la peticion hacia la ruta establecida tipo post
        $response = $this->postJson("{$this->apiBase}/login", $credentials);

        #nos da el response de la peticion http
        //dd($response);
        $response->dump();

        # esperando un status 200 y una dat como response de la peticion
        $response->assertStatus(422);
        $response->assertJsonStructure(['message', 'data', 'status', 'errors' => ['email']]);
        $response->assertJsonFragment(['errors' => ['email' => ['The email field is required.']]]);
    }

    // prueba para confirmar que el email sea requerido
    #[Test]
    public function email_must_be_valid_email(): void
    {
        #nos dara las exepciones completas, se usa comunmente
        $this->withoutDeprecationHandling();

        # teniendo la contraseña pero no el email del usuario
        $credentials = [
            'email' => 'hola-mundo',
            'password' => 'password'
        ]; //falta el email

        # haciendo la peticion hacia la ruta establecida tipo post
        $response = $this->postJson("{$this->apiBase}/login", $credentials);

        #nos da el response de la peticion http
        //dd($response);
        $response->dump();

        # esperando un status 200 y una dat como response de la peticion
        $response->assertStatus(422);
        $response->assertJsonStructure(['message', 'data', 'status', 'errors' => ['email']]);
        $response->assertJsonFragment(['errors' => ['email' => ['The email field must be a valid email address.']]]);
    }

    // prueba para confirmar que el email sea requerido
    #[Test]
    public function email_must_be_a_string(): void
    {
        #nos dara las exepciones completas, se usa comunmente
        $this->withoutDeprecationHandling();

        # teniendo la contraseña pero no el email del usuario
        $credentials = [
            'email' => 123456,
            'password' => 'password'
        ]; //falta el email

        # haciendo la peticion hacia la ruta establecida tipo post
        $response = $this->postJson("{$this->apiBase}/login", $credentials);

        #nos da el response de la peticion http
        //dd($response);
        $response->dump();

        # esperando un status 200 y una dat como response de la peticion
        $response->assertStatus(422);
        $response->assertJsonStructure(['message', 'data', 'status', 'errors' => ['email']]);
        $response->assertJsonFragment(['errors' => ['email' => ['The email field must be a valid email address.', 'The email field must be a string.']]]);
    }

    //prueba para confirmar que el password sea requerido
    #[Test]
    public function password_must_be_required(): void
    {
        #nos dara las exepciones completas, se usa comunmente
        $this->withoutDeprecationHandling();

        # teniendo la contraseña pero no el email del usuario
        $credentials = [
            'email' => 'example@example.com'
        ]; //falta el password

        # haciendo la peticion hacia la ruta establecida tipo post
        $response = $this->postJson("{$this->apiBase}/login", $credentials);

        #nos da el response de la peticion http
        //dd($response);
        $response->dump();

        # esperando un status 200 y una dat como response de la peticion
        $response->assertStatus(422);
        $response->assertJsonStructure(['message', 'data', 'status', 'errors' => ['password']]);
        $response->assertJsonFragment(['errors' => ['password' => ['The password field is required.']]]);
    }

    #[Test]
    public function password_must_have_at_least_8_characters(): void
    {
        #nos dara las exepciones completas, se usa comunmente
        $this->withoutDeprecationHandling();

        # teniendo la contraseña pero no el email del usuario
        $credentials = [
            'email' => 'example@example.com',
            'password' => 'pass'
        ]; //por lo menos 8 caracterers

        # haciendo la peticion hacia la ruta establecida tipo post
        $response = $this->postJson("{$this->apiBase}/login", $credentials);

        #nos da el response de la peticion http
        //dd($response);
        $response->dump();

        # esperando un status 200 y una dat como response de la peticion
        $response->assertStatus(422);
        $response->assertJsonStructure(['message', 'data', 'status', 'errors' => ['password']]);
        $response->assertJsonFragment(['errors' => ['password' => ['The password field must be at least 8 characters.']]]);
    }

}
