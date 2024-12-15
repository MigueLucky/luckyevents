<?php

namespace App\Http\Controllers;

use App\Models\Evento;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

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

        if ($request->hasFile('foto')) {
            $path = $request->file('foto')->store('eventos', 'public');
            $path = "storage/" . $path;
        } else if ($data['foto']) {
            $path = $data['foto'];
        } else {
            $path = "/img/default/eventoDefault.png";
        }

        try {
            $links = isset($data['links']) ? json_decode($data['links'], true) : null;

            $evento = Evento::create([
                'nombre' => $data['nombre'],
                'privacidad' => $data['privacidad'],
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
        return response()->json(Evento::findOrFail($id));
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

        $eventos = Evento::whereHas('usuarios', function ($query) use ($idUsuario) {
            $query->where('id_usuario', $idUsuario);
        })
            ->orderBy('id', 'desc')
            ->get();

        return response()->json($eventos);
    }

    public function usuariosPorEvento($id)
    {
        $evento = Evento::findOrFail($id);

        $usuarios = $evento->usuarios()->get();

        return response()->json($usuarios->map(function ($usuario) {
            return [
                'id' => $usuario->id,
                'foto' => $usuario->foto,
                'nombre' => $usuario->nombre,
                'apellido' => $usuario->apellido,
            ];
        }));
    }

    public function vehiculosPorEvento($idEvento)
    {
        try {
            $vehiculos = DB::table('vehiculos_eventos')
                ->join('vehiculos', 'vehiculos_eventos.id_vehiculo', '=', 'vehiculos.id')
                ->where('vehiculos_eventos.id_evento', $idEvento)
                ->select('vehiculos.id', 'vehiculos.nombre', 'vehiculos.foto', 'vehiculos.capacidad')
                ->get();

            return response()->json($vehiculos, 200);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Error al obtener los vehículos del evento'], 500);
        }
    }
    public function participarEvento($idEvento, Request $request)
    {
        try {
            $idUsuario = $request->input('idUsuario');

            $evento = DB::table('eventos')->where('id', $idEvento)->first();
            if (!$evento) {
                return response()->json(['error' => 'El evento no existe.'], 404);
            }

            $existe = DB::table('usuario_eventos')
                ->where('id_evento', $idEvento)
                ->where('id_usuario', $idUsuario)
                ->exists();

            if ($existe) {
                return response()->json(['message' => 'Ya estás participando en este evento.'], 200);
            }

            DB::table('usuario_eventos')->insert([
                'id_evento' => $idEvento,
                'id_usuario' => $idUsuario,
                'created_at' => now(),
                'updated_at' => now()
            ]);

            return response()->json(['message' => 'Te has unido al evento exitosamente.'], 200);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Hubo un error al unirte al evento.'], 500);
        }
    }

    public function abandonarEvento($idEvento, Request $request)
    {
        try {
            $idUsuario = $request->input('idUsuario');

            $evento = DB::table('eventos')->where('id', $idEvento)->first();
            if (!$evento) {
                return response()->json(['error' => 'El evento no existe.'], 404);
            }

            $deleted = DB::table('usuario_eventos')
                ->where('id_evento', $idEvento)
                ->where('id_usuario', $idUsuario)
                ->delete();

            if ($deleted) {
                return response()->json(['message' => 'Has abandonado el evento exitosamente.'], 200);
            } else {
                return response()->json(['message' => 'No estabas participando en este evento.'], 404);
            }
        } catch (\Exception $e) {
            return response()->json(['error' => 'Hubo un error al abandonar el evento.'], 500);
        }
    }

    public function eventosPorUbiFavorita()
    {
        $ubicacionFavorita = auth()->user()->ubicacionFavorita;

        if (!$ubicacionFavorita) {
            return response()->json([]);
        }

        $eventos = Evento::where('ubicacion', $ubicacionFavorita)->get();

        $eventosFiltrados = $eventos->filter(function ($evento) {
            return !$evento->usuarios->contains(auth()->user());
        });

        return response()->json($eventosFiltrados);
    }
}
