<?php

namespace App\Http\Controllers\Auth;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use App\Http\Requests\Auth\AdminLoginRequest;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class AdminAuthController extends Controller
{
    
    public function showLogin()
    {
        
        return view('auth.admin-login');
    }

    public function authenticate(AdminLoginRequest $request)
    {

        $user = User::where('mobile', $request->mobile)->first();

        if (!is_null($user) and Hash::check($request->password, $user->password)) {

            Auth::guard('user')->login($user, true);

            return redirect()->route('admin.dashboard');
        }    

        return redirect()->route('admin.login')->withError('These credentials do not match our records.');
    }

    public function username()
    {

        return 'mobile';
    }
}
