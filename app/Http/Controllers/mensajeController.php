<?php

namespace App\Http\Controllers;

use App\Models\Mensaje;
use Illuminate\Http\Request;

class MensajeController extends Controller
{
    public function index()
    {
        return Mensaje::all();
    }

    public function store(Request $request)
    {
        $mensaje = Mensaje::create($request->all());
        return response()->json($mensaje, 201);
    }

    public function show($id)
    {
        return Mensaje::findOrFail($id);
    }

    public function update(Request $request, $id)
    {
        $mensaje = Mensaje::findOrFail($id);
        $mensaje->update($request->all());
        return response()->json($mensaje);
    }

    public function destroy($id)
    {
        $mensaje = Mensaje::findOrFail($id);
        $mensaje->delete();
        return response()->json(['message' => 'Deleted successfully']);
    }
}