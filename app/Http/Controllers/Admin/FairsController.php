<?php

namespace App\Http\Controllers\Admin;

use App\Models\Fair;
use Illuminate\Support\Str;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Storage;
use App\Http\Requests\Admin\FairsRequest;
use App\Models\FairPlace;

class FairsController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {

        return view('admin.fairs.index', [
            'fairs' => Fair::paginate(15)
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        
        return view('admin.fairs.create', [
            'fairPlaces' => FairPlace::all()
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(FairsRequest $request)
    {
        
        $fair = Fair::create($request->validated());

        $this->poster($request, $fair);

        return redirect()->route('fairs.index');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        
        return view('admin.fairs.show', [
            'fair' => Fair::findOrFail($id)
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {

        return view('admin.fairs.edit', [
            'fair' => Fair::findOrFail($id),
            'fairPlaces' => FairPlace::all()
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(FairsRequest $request, string $id)
    {
        
        $fair = Fair::findOrFail($id);
        $fair->update($request->validated());

        $this->poster($request, $fair);

        return redirect()->route('fairs.index')->with('message', 'Fair info changed!');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        
        $fair = Fair::findOrFail($id);
        $fair->delete();

        return redirect()->route('fairs.index')->with('message', 'Fair Deleted!');
    }

    public function poster($request, $navbar) {

        $storage = Storage::disk('fairs_pictures');

        if ($request->hasFile('poster')) {
            $file = $request->file('poster');
            if ($file->isValid()) {
                $path = date('Y/m/d');
                $extension = $file->getClientOriginalExtension();
                $name = Str::random(26) . rand(10000, 999999) . '.' . $extension;
                $fullPath = $storage->putFileAs($path, $file, $name);

                $navbar->update([
                    'poster' => $fullPath,
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
