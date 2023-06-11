<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\UserRegisterRequest;
use App\Models\Activity;
use App\Models\CompanyMember;
use App\Models\Fair;
use App\Models\User;
use Illuminate\Http\Request;

class UserAuthController extends Controller
{
    public function showRegister()
    {
        $companies = CompanyMember::all();
        $activities = Activity::all();
        $fairs = Fair::all();

        return view('user.register',compact('companies','activities','fairs'));
    }


    public function storeRegister(UserRegisterRequest $request)
    {
        $data = $request->validated();

        $user = User::where('mobile' , $data['mobile'])
            ->with(['activities','fairs','companies'])
            ->first();

        if (!$user){
            $user = User::create([
                'first_name' => $data['first_name'],
                'last_name' => $data['last_name'],
                'mobile' => $data['mobile'],
                'address' => $data['address'] ?? null,
                'email' => $data['email'] ?? null,
            ]);
        }

        if (isset($data['activities'])) {
            $user->activities()->sync($data['activities']);
        }

        if (isset($data['fairs'])) {
            $user->fairs()->sync($data['fairs']);
        }

        if (isset($data['companies'])) {
            $user->companies()->sync($data['companies']);
        }

        session(['user' => $user->id]);

        if (!session('url'))
            abort(404);
        return redirect()->route('user.show.card',session('url'));
    }
}
