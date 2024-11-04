<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use PHPUnit\Framework\Attributes\Test;
use Tests\TestCase;

class UserRegisterTest extends TestCase
{
    //BD VACIA
    use RefreshDatabase;

    //HAPPY PATH 200
    #[Test]
    public function user_can_register(): void
    {

        #nos dara las exepciones completas, se usa comunmente
        $this->withoutDeprecationHandling();

        //TENIENDO LOS DATOS DEL USUARIO A REGISTRAR
        $data = [
            'name' => 'example',
            'last_name' => 'example example',
            'address' => 'fake-address',
            'phone_number' => '3205074072',
            'email' => 'email@email.com',
            'password' => 'password',
        ];

        //HACIENDO LA PETICION PARA EL REGISTRO CON LA API DE RECURSOS
        $response = $this->postJson("{$this->apiBase}/users", $data);

        #nos da el response de la peticion http
        //dd($response);
        $response->dump();

        //VERIFICAMOS LOS USUARIO ALAMACENADOS EN LA BD EN MEMORIA
        //dd(User::all());

        //ESPERANDO UN ESTADO 201 DE LA PETICION
        $response->assertStatus(201); //estado 200
        $this->assertDatabaseCount('users', 1); //cuando se haga la petricion se crea un usuario
        $this->assertDatabaseHas('users', ['email' => 'email@email.com']);
        $response->assertJsonFragment(['message' => 'Usuario registrado con exito.']);
    }

    //prueba para un usuario registrado en la BD
    #[Test]
    public function a_registered_user_can_login(): void
    {
        #nos dara las exepciones completas, se usa comunmente
        $this->withoutDeprecationHandling();

        //TENIENDO LOS DATOS DEL USUARIO A REGISTRAR
        $data = [
            'name' => 'example',
            'last_name' => 'example example',
            'address' => 'fake-address',
            'phone_number' => '3205074072',
            'email' => 'email@email.com',
            'password' => 'password',
        ];

        //HACIENDO LA PETICION PARA EL REGISTRO CON LA API DE RECURSOS
        $this->postJson("{$this->apiBase}/users", $data);
        $response = $this->postJson("{$this->apiBase}/login", ['email' => 'email@email.com', 'password' => 'password']);

        #nos da el response de la peticion http
        //dd($response);
        $response->dump();

        # esperando un status 200 y una data como response de la peticion
        $response->assertStatus(200);
        $response->assertJsonStructure(['data' => ['token']]);
    }


    /*=============================================================================================================*/
    //ERRORES 400 401 422 ETC
    /*=============================================================================================================*/

    //PRUEBAS PARA EMAIL
    //el email sea requerido
    #[Test]
    public function email_must_be_required(): void
    {
        #nos dara las exepciones completas, se usa comunmente
        $this->withoutDeprecationHandling();

        //TENIENDO LOS DATOS DEL USUARIO
        $data = [
            'name' => 'example',
            'last_name' => 'example example',
            'address' => 'fake-address',
            'phone_number' => '3205074072',
            'email' => '',
            'password' => 'password',
        ];

        //HACIENDO LA PETICION PARA EL REGISTRO CON LA API DE RECURSOS
        $response = $this->postJson("{$this->apiBase}/users", $data);


        #nos da el response de la peticion http
        //dd($response);
        $response->dump();

        # esperando un status 200 y una dat como response de la peticion
        $response->assertStatus(422);
        $response->assertJsonStructure(['message', 'data', 'status', 'errors' => ['email']]);
        $response->assertJsonFragment(['errors' => ['email' => ['The email field is required.']]]);
    }

    // prueba para confirmar que el email sea valido
    #[Test]
    public function email_must_be_valid_email(): void
    {
        #nos dara las exepciones completas, se usa comunmente
        $this->withoutDeprecationHandling();

        //TENIENDO LOS DATOS DEL USUARIO
        $data = [
            'name' => 'example',
            'last_name' => 'example example',
            'address' => 'fake-address',
            'phone_number' => '3205074072',
            'email' => 'invalid_email',
            'password' => 'password',
        ];

        //HACIENDO LA PETICION PARA EL REGISTRO CON LA API DE RECURSOS
        $response = $this->postJson("{$this->apiBase}/users", $data);

        #nos da el response de la peticion http
        //dd($response);
        $response->dump();

        # esperando un status 200 y una dat como response de la peticion
        $response->assertStatus(422);
        $response->assertJsonStructure(['message', 'data', 'status', 'errors' => ['email']]);
        $response->assertJsonFragment(['errors' => ['email' => ['The email field must be a valid email address.']]]);
    }

    #[Test]
    //prueba que valida que el email debe ser unico
    public function email_must_be_unique(): void
    {
        #nos dara las exepciones completas, se usa comunmente
        $this->withoutDeprecationHandling();

        User::factory()->create(['email' => 'same_email@email.com']);

        //TENIENDO LOS DATOS DEL USUARIO
        $data = [
            'name' => 'example',
            'last_name' => 'example example',
            'address' => 'fake-address',
            'phone_number' => '3205074072',
            'email' => 'same_email@email.com',
            'password' => 'password',
        ];

        //HACIENDO LA PETICION PARA EL REGISTRO CON LA API DE RECURSOS
        $response = $this->postJson("{$this->apiBase}/users", $data);

        #nos da el response de la peticion http
        //dd($response);
        $response->dump();

        # esperando un status 200 y una dat como response de la peticion
        $response->assertStatus(422);
        $response->assertJsonStructure(['message', 'data', 'status', 'errors' => ['email']]);
        $response->assertJsonFragment(['errors' => ['email' => ['The email has already been taken.']]]);
    }

    /*=============================================================================================================*/
    //PRUEBAS PARA PASSWORD
    /*=============================================================================================================*/

    //prueba para confirmar que el password sea requerido
    #[Test]
    public function password_must_be_required(): void
    {
        #nos dara las exepciones completas, se usa comunmente
        $this->withoutDeprecationHandling();

        //TENIENDO LOS DATOS DEL USUARIO
        $data = [
            'name' => 'example',
            'last_name' => 'example example',
            'address' => 'fake-address',
            'phone_number' => '3205074072',
            'email' => 'example@email.com',
            'password' => '',
        ];

        //HACIENDO LA PETICION PARA EL REGISTRO CON LA API DE RECURSOS
        $response = $this->postJson("{$this->apiBase}/users", $data);

        #nos da el response de la peticion http
        //dd($response);
        $response->dump();

        # esperando un status 200 y una dat como response de la peticion
        $response->assertStatus(422);
        $response->assertJsonStructure(['message', 'data', 'status', 'errors' => ['password']]);
        $response->assertJsonFragment(['errors' => ['password' => ['The password field is required.']]]);
    }

    #[Test]
    //prueba que valida que el password debe tener al menos 8 caracteres
    public function password_must_have_at_least_8_characters(): void
    {
        #nos dara las exepciones completas, se usa comunmente
        $this->withoutDeprecationHandling();

        //TENIENDO LOS DATOS DEL USUARIO
        $data = [
            'name' => 'example',
            'last_name' => 'example example',
            'address' => 'fake-address',
            'phone_number' => '3205074072',
            'email' => 'example@email.com',
            'password' => 'pass',
        ];

        //HACIENDO LA PETICION PARA EL REGISTRO CON LA API DE RECURSOS
        $response = $this->postJson("{$this->apiBase}/users", $data);

        #nos da el response de la peticion http
        //dd($response);
        $response->dump();

        # esperando un status 200 y una dat como response de la peticion
        $response->assertStatus(422);
        $response->assertJsonStructure(['message', 'data', 'status', 'errors' => ['password']]);
        $response->assertJsonFragment(['errors' => ['password' => ['The password field must be at least 8 characters.']]]);
    }

    /*=============================================================================================================*/
    //PRUEBAS PARA NAME
    /*=============================================================================================================*/

    //prueba para confirmar que el name sea requerido
    #[Test]
    public function name_must_be_required(): void
    {
        #nos dara las exepciones completas, se usa comunmente
        $this->withoutDeprecationHandling();

        //TENIENDO LOS DATOS DEL USUARIO
        $data = [
            'name' => '',
            'last_name' => 'example example',
            'address' => 'fake-address',
            'phone_number' => '3205074072',
            'email' => 'email@email.com',
            'password' => 'password',
        ];

        //HACIENDO LA PETICION PARA EL REGISTRO CON LA API DE RECURSOS
        $response = $this->postJson("{$this->apiBase}/users", $data);

        #nos da el response de la peticion http
        //dd($response);
        $response->dump();

        # esperando un status 422 y un mensaje de error
        $response->assertStatus(422);
        $response->assertJsonStructure(['message', 'data', 'status', 'errors' => ['name']]);
        $response->assertJsonFragment(['errors' => ['name' => ['The name field is required.']]]);
    }

    #[Test]
    //prueba para que el name tenga como minimo 2 caracteres
    public function name_must_have_at_least_2_characters(): void
    {
        #nos dara las exepciones completas, se usa comunmente
        $this->withoutDeprecationHandling();

        //TENIENDO LOS DATOS DEL USUARIO
        $data = [
            'name' => 'e',
            'last_name' => 'example example',
            'address' => 'fake-address',
            'phone_number' => '3205074072',
            'email' => 'email@email.com',
            'password' => 'password',
        ];

        //HACIENDO LA PETICION PARA EL REGISTRO CON LA API DE RECURSOS
        $response = $this->postJson("{$this->apiBase}/users", $data);

        #nos da el response de la peticion http
        //dd($response);
        $response->dump();

        # esperando un status 200 y una dat como response de la peticion
        $response->assertStatus(422);
        $response->assertJsonStructure(['message', 'data', 'status', 'errors' => ['name']]);
        $response->assertJsonFragment(['errors' => ['name' => ['The name field must be at least 2 characters.']]]);
    }

    /*=============================================================================================================*/
    //PRUEBAS PARA LAST NAME
    /*=============================================================================================================*/

    //prueba para confirmar que el last name sea requerido
    #[Test]
    public function last_name_must_be_required(): void
    {
        #nos dara las exepciones completas, se usa comunmente
        $this->withoutDeprecationHandling();

        //TENIENDO LOS DATOS DEL USUARIO
        $data = [
            'name' => 'example',
            'last_name' => '',
            'address' => 'fake-address',
            'phone_number' => '3205074072',
            'email' => 'email@email.com',
            'password' => 'password',
        ];

        //HACIENDO LA PETICION PARA EL REGISTRO CON LA API DE RECURSOS
        $response = $this->postJson("{$this->apiBase}/users", $data);

        #nos da el response de la peticion http
        //dd($response);
        $response->dump();

        # esperando un status 422 y un mensaje de error
        $response->assertStatus(422);
        $response->assertJsonStructure(['message', 'data', 'status', 'errors' => ['last_name']]);
        $response->assertJsonFragment(['errors' => ['last_name' => ['The last name field is required.']]]);
    }

    #[Test]
    //prueba para que el last name tenga como minimo 2 caracteres
    public function last_name_must_have_at_least_2_characters(): void
    {
        #nos dara las exepciones completas, se usa comunmente
        $this->withoutDeprecationHandling();

        //TENIENDO LOS DATOS DEL USUARIO
        $data = [
            'name' => 'example',
            'last_name' => 'e',
            'address' => 'fake-address',
            'phone_number' => '3205074072',
            'email' => 'email@email.com',
            'password' => 'password',
        ];

        //HACIENDO LA PETICION PARA EL REGISTRO CON LA API DE RECURSOS
        $response = $this->postJson("{$this->apiBase}/users", $data);

        #nos da el response de la peticion http
        //dd($response);
        $response->dump();

        # esperando un status 200 y una dat como response de la peticion
        $response->assertStatus(422);
        $response->assertJsonStructure(['message', 'data', 'status', 'errors' => ['last_name']]);
        $response->assertJsonFragment(['errors' => ['last_name' => ['The last name field must be at least 2 characters.']]]);
    }


    /*=============================================================================================================*/
    //PRUEBAS PARA ADDRESS
    /*=============================================================================================================*/

    //prueba para confirmar que el address sea requerido
    #[Test]
    public function address_must_be_required(): void
    {
        #nos dara las exepciones completas, se usa comunmente
        $this->withoutDeprecationHandling();

        //TENIENDO LOS DATOS DEL USUARIO
        $data = [
            'name' => 'example',
            'last_name' => 'example example',
            'address' => '',
            'phone_number' => '3205074072',
            'email' => 'email@email.com',
            'password' => 'password',
        ];

        //HACIENDO LA PETICION PARA EL REGISTRO CON LA API DE RECURSOS
        $response = $this->postJson("{$this->apiBase}/users", $data);

        #nos da el response de la peticion http
        //dd($response);
        $response->dump();

        # esperando un status 422 y un mensaje de error
        $response->assertStatus(422);
        $response->assertJsonStructure(['message', 'data', 'status', 'errors' => ['address']]);
        $response->assertJsonFragment(['errors' => ['address' => ['The address field is required.']]]);
    }

    //prueba para confirmar que el address sea requerido
    #[Test]
    public function address_must_have_at_least_5_characters(): void
    {
        #nos dara las exepciones completas, se usa comunmente
        $this->withoutDeprecationHandling();

        //TENIENDO LOS DATOS DEL USUARIO
        $data = [
            'name' => 'example',
            'last_name' => 'example example',
            'address' => 'fake',
            'phone_number' => '3205074072',
            'email' => 'email@email.com',
            'password' => 'password',
        ];

        //HACIENDO LA PETICION PARA EL REGISTRO CON LA API DE RECURSOS
        $response = $this->postJson("{$this->apiBase}/users", $data);

        #nos da el response de la peticion http
        //dd($response);
        $response->dump();

        # esperando un status 422 y un mensaje de error
        $response->assertStatus(422);
        $response->assertJsonStructure(['message', 'data', 'status', 'errors' => ['address']]);
        $response->assertJsonFragment(['errors' => ['address' => ['The address field must be at least 5 characters.']]]);
    }

    /*=============================================================================================================*/
    //PRUEBAS PARA PHONE NUMBER
    /*=============================================================================================================*/

    //prueba para confirmar que el address sea requerido
    #[Test]
    public function phone_number_must_be_required(): void
    {
        #nos dara las exepciones completas, se usa comunmente
        $this->withoutDeprecationHandling();

        //TENIENDO LOS DATOS DEL USUARIO
        $data = [
            'name' => 'example',
            'last_name' => 'example example',
            'address' => 'fake-address',
            'phone_number' => '',
            'email' => 'email@email.com',
            'password' => 'password',
        ];

        //HACIENDO LA PETICION PARA EL REGISTRO CON LA API DE RECURSOS
        $response = $this->postJson("{$this->apiBase}/users", $data);

        #nos da el response de la peticion http
        //dd($response);
        $response->dump();

        # esperando un status 422 y un mensaje de error
        $response->assertStatus(422);
        $response->assertJsonStructure(['message', 'data', 'status', 'errors' => ['phone_number']]);
        $response->assertJsonFragment(['errors' => ['phone_number' => ['The phone number field is required.']]]);
    }

    //prueba para confirmar que el address sea requerido
    #[Test]
    public function phone_number_must_be_numeric(): void
    {
        #nos dara las exepciones completas, se usa comunmente
        $this->withoutDeprecationHandling();

        //TENIENDO LOS DATOS DEL USUARIO
        $data = [
            'name' => 'example',
            'last_name' => 'example example',
            'address' => 'fake-address',
            'phone_number' => 'holamundo',
            'email' => 'email@email.com',
            'password' => 'password',
        ];

        //HACIENDO LA PETICION PARA EL REGISTRO CON LA API DE RECURSOS
        $response = $this->postJson("{$this->apiBase}/users", $data);

        #nos da el response de la peticion http
        //dd($response);
        $response->dump();

        # esperando un status 422 y un mensaje de error
        $response->assertStatus(422);
        $response->assertJsonStructure(['message', 'data', 'status', 'errors' => ['phone_number']]);
        $response->assertJsonFragment(['errors' => [
            'phone_number' => [
                'The phone number field must be a number.',
                'The phone number field must be 10 digits.'
            ]]]);
    }

    //prueba para confirmar que el address sea requerido
    #[Test]
    public function phone_number_must_have_at_least_10_characters(): void
    {
        #nos dara las exepciones completas, se usa comunmente
        $this->withoutDeprecationHandling();

        //TENIENDO LOS DATOS DEL USUARIO
        $data = [
            'name' => 'example',
            'last_name' => 'example example',
            'address' => 'fake-address',
            'phone_number' => '123456789',
            'email' => 'email@email.com',
            'password' => 'password',
        ];

        //HACIENDO LA PETICION PARA EL REGISTRO CON LA API DE RECURSOS
        $response = $this->postJson("{$this->apiBase}/users", $data);

        #nos da el response de la peticion http
        //dd($response);
        $response->dump();

        # esperando un status 422 y un mensaje de error
        $response->assertStatus(422);
        $response->assertJsonStructure(['message', 'data', 'status', 'errors' => ['phone_number']]);
        $response->assertJsonFragment(['errors' => ['phone_number' => ['The phone number field must be 10 digits.']]]);
    }
}
