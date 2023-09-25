<?php

namespace App\Http\Controllers\Admin;

use App\Models\Description;
use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\PasswordRequest;
use App\Http\Requests\Admin\DescriptionsRequest;
use Illuminate\Support\Facades\Hash;

class DescriptionsController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {

        return view('admin.descriptions.index', [
            'descriptions' => Description::paginate(15)
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        
        return view('admin.descriptions.create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(DescriptionsRequest $request)
    {
        
        Description::create($request->validated());

        return redirect()->route('descriptions.index');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        
        return view('admin.descriptions.show', [
            'description' => Description::findOrFail($id)
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {

        return view('admin.descriptions.edit', [
            'description' => Description::findOrFail($id)
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(DescriptionsRequest $request, string $id)
    {
        
        $description = Description::findOrFail($id);
        $description->update($request->validated());

        return redirect()->route('descriptions.index')->with('message', 'Description info changed!');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        
        $description = Description::findOrFail($id);
        $description->delete();

        return redirect()->route('descriptions.index')->with('message', 'Description Deleted!');
    }
}
