<?php

namespace App\Http\Controllers\Admin;

use App\Models\Poem;
use Illuminate\Support\Str;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Storage;
use App\Http\Requests\Admin\PoemsRequest;

class PoemsController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {

        return view('admin.poems.index', [
            'poems' => Poem::paginate(15)
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        
        return view('admin.poems.create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(PoemsRequest $request)
    {
        
        $poem = Poem::create(['poem' => $request->poem]);

        $this->voice($request, $poem);

        return redirect()->route('poems.index');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        
        return view('admin.poems.show', [
            'poem' => Poem::findOrFail($id)
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {

        return view('admin.poems.edit', [
            'poem' => Poem::findOrFail($id)
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(PoemsRequest $request, string $id)
    {
        
        $poem = Poem::findOrFail($id);
        $poem->update($request->validated());
        $this->voice($request, $poem);

        return redirect()->route('poems.index')->with('message', 'Poem info changed!');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        
        $poem = Poem::findOrFail($id);
        $poem->delete();

        return redirect()->route('poems.index')->with('message', 'Poem Deleted!');
    }

    public function voice($request, $poem) {

        $storage = Storage::disk('poem_voices');

        if ($request->hasFile('voice')) {
            $file = $request->file('voice');
            if ($file->isValid()) {
                $path = date('Y/m/d');
                $extension = $file->getClientOriginalExtension();
                $name = Str::random(26) . rand(10000, 999999) . '.' . $extension;
                $fullPath = $storage->putFileAs($path, $file, $name);

                $poem->update([
                    'voice' => $fullPath,
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
