<?php

namespace App\Http\Controllers\Admin;

use App\Models\FairPlace;
use Illuminate\Support\Str;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Storage;
use App\Http\Requests\Admin\FairPlacesRequest;

class FairPlacesController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {

        return view('admin.fairPlaces.index', [
            'fairPlaces' => FairPlace::paginate(15)
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        
        return view('admin.fairPlaces.create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(FairPlacesRequest $request)
    {
        
        $fairPlace = FairPlace::create($request->only(['name', 'is_internal', 'description']));
        $this->poster($request, $fairPlace);

        return redirect()->route('fairPlaces.index');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        
        return view('admin.fairPlaces.show', [
            'fairPlace' => FairPlace::findOrFail($id)
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {

        return view('admin.fairPlaces.edit', [
            'fairPlace' => FairPlace::findOrFail($id)
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(FairPlacesRequest $request, string $id)
    {
        
        $fairPlace = FairPlace::findOrFail($id);
        $fairPlace->update($request->validated());

        $this->poster($request, $fairPlace);

        return redirect()->route('fairPlaces.index')->with('message', 'FairPlace info changed!');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        
        $fairPlace = FairPlace::findOrFail($id);
        $fairPlace->delete();

        return redirect()->route('fairPlaces.index')->with('message', 'FairPlace Deleted!');
    }

    public function poster($request, $fairPlace) {

        $storage = Storage::disk('fair_places_pictures');

        if ($request->hasFile('icon')) {
            $file = $request->file('icon');
            if ($file->isValid()) {
                $path = date('Y/m/d');
                $extension = $file->getClientOriginalExtension();
                $name = Str::random(26) . rand(10000, 999999) . '.' . $extension;
                $fullPath = $storage->putFileAs($path, $file, $name);

                $fairPlace->update([
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
