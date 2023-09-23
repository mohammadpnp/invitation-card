<?php

namespace App\Http\Controllers\Admin;

use App\Models\Fair;
use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\FairsRequest;

class FairsController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {

        return view('admin.descriptions.index', [
            'descriptions' => Fair::paginate(15)
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
    public function store(FairsRequest $request)
    {
        
        Fair::create($request->validated());

        return redirect()->route('descriptions.index');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        
        return view('admin.descriptions.show', [
            'description' => Fair::findOrFail($id)
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {

        return view('admin.descriptions.edit', [
            'description' => Fair::findOrFail($id)
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(FairsRequest $request, string $id)
    {
        
        $description = Fair::findOrFail($id);
        $description->update($request->validated());

        return redirect()->route('descriptions.index')->with('message', 'Fair info changed!');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        
        $description = Fair::findOrFail($id);
        $description->delete();

        return redirect()->route('descriptions.index')->with('message', 'Fair Deleted!');
    }
}
