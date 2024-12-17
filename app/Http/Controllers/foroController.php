<?php

namespace App\Http\Controllers;

use App\Models\Foro;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ForoController extends Controller
{
    public function index()
    {
        return Foro::all();
    }

    public function store(Request $request)
    {
        $data = $request->only([
            'nombre',
            'foto',
            'descripcion',
            'ubicacion',
            'color'
        ]);

        if ($request->hasFile('foto')) {
            $path = $request->file('foto')->store('foros', 'public');
            $path = "storage/" . $path;
        } else if ($data['foto']) {
            $path = $data['foto'];
        } else {
            $path = "/img/default/foroDefault.jpg";
        }

        try {

            $foro = Foro::create([
                'nombre' => $data['nombre'],
                'foto' => $path,
                'descripcion' => $data['descripcion'] ?? null,
                'ubicacion' => $data['ubicacion'] ?? null,
                'color' => $data['color'] ?? '#618264',
            ]);

            $idUsuario = auth()->id();
            $foro->usuarios()->attach($idUsuario);

            return response()->json($foro, 201);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Error al crear el foro: ' . $e->getMessage()], 500);
        }
    }

    public function show($id)
    {
        return response()->json(Foro::findOrFail($id));
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

    // Método para quitar el reporte de un foro
    public function quitarReporte($id)
    {
        $foro = Foro::find($id);

        if (!$foro) {
            return response()->json(['error' => 'Foro no encontrado.'], 404);
        }

        // Establecemos el estado de "reportado" a false
        $foro->report = false;
        $foro->razonReport = null; // Limpiamos la razón del reporte
        $foro->save();

        return response()->json(['message' => 'Reporte del foro eliminado correctamente.']);
    }

    public function forosPorUsuario(Request $request)
    {
        $idUsuario = $request->input('idUsuario');

        $foros = Foro::whereHas('usuarios', function ($query) use ($idUsuario) {
            $query->where('id_usuario', $idUsuario);
        })
            ->orderBy('id', 'desc')
            ->get();

        return response()->json($foros);
    }

    public function usuariosPorForo($id)
    {
        $foro = Foro::findOrFail($id);

        $usuarios = $foro->usuarios()->get();

        return response()->json($usuarios->map(function ($usuario) {
            return [
                'id' => $usuario->id,
                'foto' => $usuario->foto,
                'nombre' => $usuario->nombre,
                'apellido' => $usuario->apellido,
            ];
        }));
    }

    public function reportarForo($id, Request $request)
    {
        // Validar la razón del reporte
        $request->validate([
            'razonReport' => 'required|string|max:255',
        ]);

        try {
            // Buscar el foro por ID
            $foro = Foro::findOrFail($id);

            // Actualizar o sobrescribir el reporte
            $foro->update([
                'report' => true,
                'razonReport' => $request->razonReport,
            ]);

            return response()->json([
                'success' => true,
                'message' => 'Foro reportado correctamente.',
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error al reportar el foro.',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    public function participarForo($idForo, Request $request)
    {
        try {
            $idUsuario = $request->input('idUsuario');

            $foro = DB::table('foros')->where('id', $idForo)->first();
            if (!$foro) {
                return response()->json(['error' => 'El foro no existe.'], 404);
            }

            $existe = DB::table('usuario_foros')
                ->where('id_foro', $idForo)
                ->where('id_usuario', $idUsuario)
                ->exists();

            if ($existe) {
                return response()->json(['message' => 'Ya estás participando en este foro.'], 200);
            }

            DB::table('usuario_foros')->insert([
                'id_foro' => $idForo,
                'id_usuario' => $idUsuario,
                'created_at' => now(),
                'updated_at' => now()
            ]);

            return response()->json(['message' => 'Te has unido al foro exitosamente.'], 200);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Hubo un error al unirte al foro.'], 500);
        }
    }

    public function abandonarForo($idForo, Request $request)
    {
        try {
            $idUsuario = $request->input('idUsuario');

            $foro = DB::table('foros')->where('id', $idForo)->first();
            if (!$foro) {
                return response()->json(['error' => 'El foro no existe.'], 404);
            }

            $deleted = DB::table('usuario_foros')
                ->where('id_foro', $idForo)
                ->where('id_usuario', $idUsuario)
                ->delete();

            if ($deleted) {
                return response()->json(['message' => 'Has abandonado el foro exitosamente.'], 200);
            } else {
                return response()->json(['message' => 'No estabas participando en este foro.'], 404);
            }
        } catch (\Exception $e) {
            return response()->json(['error' => 'Hubo un error al abandonar el foro.'], 500);
        }
    }
}
