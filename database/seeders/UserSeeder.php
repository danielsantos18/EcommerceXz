<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{

    public function run(): void
    {
        User::factory()->create([
            'name' => 'Test User',
            'last_name' => 'example',
            'address' => 'example_street',
            'phone_number' => '1234567890',
            'email' => 'example@example.com',
            'password' => 'password',
        ]);
    }
}
