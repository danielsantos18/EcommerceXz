<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Password;


class ResetPasswordController extends Controller
{
    public function send(Request $request)
    {
        $request->validate(['email' => 'required|email']);

        $status = Password::sendResetLink(
            $request->only('email')
        );
        $sent = $status === Password::RESET_LINK_SENT;
        return jsonResponse(message: $sent ? 'OK' : 'Error', status: $sent ? 200 : 500);
    }
}
