<?php

namespace App\Http\Controllers;

use App\Models\Vehiculo;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class VehiculoController extends Controller
{
    public function vehiculosPorUsuario(Request $request)
    {
        $idUsuario = $request->input('idUsuario');

        $vehiculos = Vehiculo::where('id_usuario', $idUsuario)->get();

        return response()->json($vehiculos);
    }

    public function index()
    {
        return Vehiculo::all();
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'nombre' => 'required|string|max:255',
            'capacidad' => 'required|integer|min:1',
            'idUsuario' => 'required|integer',
            'foto' => 'nullable',
        ]);
    
        if ($request->hasFile('foto')) {
            $data['foto'] = $request->file('foto')->store('vehiculos', 'public');
            $data['foto'] = "storage/" . $data['foto'];
        } else {
            $data['foto'] = 'img/default/vehiculoDefault.jpg';
        }
    
        $vehiculo = Vehiculo::create([
            'id_usuario' => $data['idUsuario'],
            'nombre' => $data['nombre'],
            'capacidad' => $data['capacidad'],
            'foto' => $data['foto'],
        ]);
    
        return response()->json($vehiculo, 201);
    }

    public function show($id)
    {
        return Vehiculo::findOrFail($id);
    }

    public function update(Request $request, $id)
    {
        $vehiculo = Vehiculo::findOrFail($id);
        $vehiculo->update($request->all());
        return response()->json($vehiculo);
    }

    public function destroy($id)
    {
        $vehiculo = Vehiculo::findOrFail($id);
        $vehiculo->delete();
        return response()->json(['message' => 'Deleted successfully']);
    }
}
