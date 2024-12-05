<?php

namespace App\Http\Controllers;

use App\Models\Evento;
use Illuminate\Http\Request;

class EventoController extends Controller
{
    public function index()
    {
        return Evento::all();
    }

    public function store(Request $request)
{
    $data = $request->only([
        'nombre', 
        'privacidad', 
        'fechaHoraInicio', 
        'fechaHoraFin', 
        'foto', 
        'descripcion', 
        'ubicacion', 
        'color', 
        'links', 
        'gusto'
    ]);

    $privacidad = $request->has('privacidad') && $request->privacidad == 'on';

    if ($request->hasFile('foto')) {
        $path = $request->file('foto')->store('eventos', 'public');
        $path = "storage/" . $path;
    }else{
        $path = "/img/default/eventoDefault.png";
    }

    try {
        $links = isset($data['links']) ? json_decode($data['links'], true) : null;

        $evento = Evento::create([
            'nombre' => $data['nombre'],
            'privacidad' => $privacidad,
            'fechaHoraInicio' => $data['fechaHoraInicio'],
            'fechaHoraFin' => $data['fechaHoraFin'],
            'foto' => $path,
            'descripcion' => $data['descripcion'] ?? null,
            'ubicacion' => $data['ubicacion'] ?? null,
            'color' => $data['color'] ?? '#618264',
            'links' => $links,
        ]);

        $idUsuario = auth()->id();
        $evento->usuarios()->attach($idUsuario);

        return response()->json($evento, 201);
    } catch (\Exception $e) {
        return response()->json(['error' => 'Error al crear el evento: ' . $e->getMessage()], 500);
    }
}

    public function show($id)
    {
        return Evento::findOrFail($id);
    }

    public function update(Request $request, $id)
    {
        $evento = Evento::findOrFail($id);
        $evento->update($request->all());
        return response()->json($evento);
    }

    public function destroy($id)
    {
        $evento = Evento::findOrFail($id);
        $evento->delete();
        return response()->json(['message' => 'Deleted successfully']);
    }

    public function eventosPorUsuario(Request $request)
    {
        $idUsuario = $request->input('idUsuario');
    
        $eventos = Evento::whereHas('usuarios', function($query) use ($idUsuario) {
            $query->where('id_usuario', $idUsuario);
        })
        ->orderBy('id', 'desc')
        ->get();

        return response()->json($eventos);
    }
}
