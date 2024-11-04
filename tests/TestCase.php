<?php

namespace Tests;

use Illuminate\Foundation\Testing\TestCase as BaseTestCase;

abstract class TestCase extends BaseTestCase
{
    // se coloca un protected para definir una variablñe global para facilitar el llamado de rutas
    protected $apiBase = '/api/v1';
}
