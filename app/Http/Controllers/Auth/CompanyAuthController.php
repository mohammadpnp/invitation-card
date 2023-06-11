<?php

namespace App\Http\Controllers\Auth;

use App\Models\Fair;
use App\Models\Activity;
use Illuminate\Http\Request;
use App\Models\CompanyMember;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Auth\Events\Registered;
use App\Providers\RouteServiceProvider;
use Illuminate\Support\Facades\Storage;
use App\Http\Requests\Auth\LoginRequest;
use App\Http\Requests\Auth\CompanyRegisterRequest;

class CompanyAuthController extends Controller
{

    public function showRegister(){
        $fairs = Fair::get(['name', 'id']);
        $activities = Activity::all();

        return view('auth.register', compact('fairs', 'activities'));
    }

    public function storeRegister(CompanyRegisterRequest $request){

        $data = $request->validated();

        Auth::login( $member = CompanyMember::create([
            'company_name' => $data['company_name'],
            'mobile' => $data['mobile'],
            'email' => $data['email'],
            'password' => Hash::make($data['password']),
            'manager_name' => $data['manager_name'],
            'main_phone' => $data['main_phone'],
            'main_address' => $data['main_address'],
            'second_phone' => $data['second_phone'],
            'second_address' => $data['second_address'],
        ]));

        if (isset($data['activities'])) {
            $member->activities()->sync($data['activities']);
        }

        if (isset($data['fairs'])) {
            $member->fairs()->sync($data['fairs']);
        }

        $this->saveFile($request, $member);

        event(new Registered($member));

        return redirect()->intended(RouteServiceProvider::HOME);

    }

    /**
     * Display the login view.
     *
     * @return \Illuminate\View\View
     */
    public function create()
    {
        return view('auth.login' );
    }

    /**
     * Handle an incoming authentication request.
     *
     * @param  \App\Http\Requests\Auth\LoginRequest  $request
     * @return \Illuminate\Http\RedirectResponse
     */
    public function store(LoginRequest $request)
    {
        $request->authenticate();

        $request->session()->regenerate();

        return redirect()->intended(RouteServiceProvider::HOME);
    }

    /**
     * Destroy an authenticated session.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\RedirectResponse
     */
    public function destroy(Request $request)
    {
        Auth::guard('company_member')->logout();

        $request->session()->invalidate();

        $request->session()->regenerateToken();

        return redirect('/');
    }

    private function saveFile($request, $member)
    {
        $storage = Storage::disk('company_member_files');

        if ($request->hasFile('file')) {
            $file = $request->file('file');
            if ($file->isValid()) {
                if ($member->file) {
                    $storage->delete($member->file);
                }

                $path = date('Y/m/d');
                $extension = $file->getClientOriginalExtension();
                $name = \Str::random(26) . rand(10000, 999999) . '.' . $extension;
                $fullPath = $storage->putFileAs($path, $file, $name);

                $member->update([
                    'file' => $fullPath
                ]);
            } else {
                return false;
            }
        } else {
            return false;
        }
    }
}
