<?php

namespace App\Http\Controllers;

use App\Models\Vehiculo;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
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

    public function addVehiculoEvento($idEvento, Request $request)
    {
        try {
            $idVehiculo = $request->input('idVehiculo');

            // Verificar si el vehículo ya está en el evento
            $existe = DB::table('vehiculos_eventos')
                ->where('id_evento', $idEvento)
                ->where('id_vehiculo', $idVehiculo)
                ->exists();

            if ($existe) {
                return response()->json(['message' => 'El vehículo ya está asociado al evento.'], 200);
            }

            // Asociar el vehículo al evento
            DB::table('vehiculos_eventos')->insert([
                'id_evento' => $idEvento,
                'id_vehiculo' => $idVehiculo,
                'created_at' => now(),
                'updated_at' => now(),
            ]);

            return response()->json(['message' => 'Vehículo añadido al evento.'], 200);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Hubo un error al añadir el vehículo al evento.'], 500);
        }
    }

    public function removeVehiculoEvento($idEvento, Request $request)
    {
        try {
            $idVehiculo = $request->input('idVehiculo');

            // Eliminar la asociación entre el vehículo y el evento
            $deleted = DB::table('vehiculos_eventos')
                ->where('id_evento', $idEvento)
                ->where('id_vehiculo', $idVehiculo)
                ->delete();

            if ($deleted) {
                return response()->json(['message' => 'Vehículo eliminado del evento.'], 200);
            } else {
                return response()->json(['message' => 'El vehículo no estaba asociado al evento.'], 404);
            }
        } catch (\Exception $e) {
            return response()->json(['error' => 'Hubo un error al eliminar el vehículo del evento.'], 500);
        }
    }
}
