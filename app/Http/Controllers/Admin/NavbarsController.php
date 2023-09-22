<?php

namespace App\Http\Controllers\Admin;

use App\Models\Navbar;
use Illuminate\Support\Str;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Storage;
use App\Http\Requests\Admin\NavbarsRequest;

class NavbarsController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {

        return view('admin.navbars.index', [
            'navbars' => Navbar::paginate(15)
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        
        return view('admin.navbars.create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(NavbarsRequest $request)
    {
        
        $navbar = Navbar::create([
            'title' => $request->title,
            'link' => $request->link
        ]);

        $this->icon($request, $navbar);

        return redirect()->route('navbars.index');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        
        return view('admin.navbars.show', [
            'navbar' => Navbar::findOrFail($id)
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {

        return view('admin.navbars.edit', [
            'navbar' => Navbar::findOrFail($id)
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(NavbarsRequest $request, string $id)
    {
        
        $navbar = Navbar::findOrFail($id);
        $navbar->update($request->validated());
        $this->icon($request, $navbar);

        return redirect()->route('navbars.index')->with('message', 'Navbar info changed!');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        
        $navbar = Navbar::findOrFail($id);
        $navbar->delete();

        return redirect()->route('navbars.index')->with('message', 'Navbar Deleted!');
    }

    public function icon($request, $navbar) {

        $storage = Storage::disk('navbar_icon');

        if ($request->hasFile('icon')) {
            $file = $request->file('icon');
            if ($file->isValid()) {
                $path = date('Y/m/d');
                $extension = $file->getClientOriginalExtension();
                $name = Str::random(26) . rand(10000, 999999) . '.' . $extension;
                $fullPath = $storage->putFileAs($path, $file, $name);

                $navbar->update([
                    'icon' => $fullPath,
                ]);
            } else {
                return false;
            }
        } else {
            return false;
        }

        return true;
    }
}
