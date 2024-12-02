<?php

namespace App\Http\Controllers;

use App\Models\Foro;
use Illuminate\Http\Request;

class ForoController extends Controller
{
    public function index()
    {
        return Foro::all();
    }

    public function store(Request $request)
    {
        $foro = Foro::create($request->all());
        return response()->json($foro, 201);
    }

    public function show($id)
    {
        return Foro::findOrFail($id);
    }

    public function update(Request $request, $id)
    {
        $foro = Foro::findOrFail($id);
        $foro->update($request->all());
        return response()->json($foro);
    }

    public function destroy($id)
    {
        $foro = Foro::findOrFail($id);
        $foro->delete();
        return response()->json(['message' => 'Deleted successfully']);
    }
}
