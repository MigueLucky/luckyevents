<?php

namespace App\Http\Controllers;

use App\Models\Mensaje;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

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

    public function amigosPorUsuario(Request $request)
    {
        $idUsuario = $request->input('idUsuario');
    
        // Usuarios a los que envió mensajes
        $amigosEnviados = Mensaje::where('id_usuario', $idUsuario)
            ->join('users', 'mensajes.id_usuario2', '=', 'users.id')
            ->select('users.id', 'users.nombre', 'users.foto');
    
        // Usuarios que le enviaron mensajes
        $amigosRecibidos = Mensaje::where('id_usuario2', $idUsuario)
            ->join('users', 'mensajes.id_usuario', '=', 'users.id')
            ->select('users.id', 'users.nombre', 'users.foto');
    
        // Combina ambas consultas y elimina duplicados
        $amigos = $amigosEnviados
            ->union($amigosRecibidos)
            ->distinct()
            ->get();
    
        return response()->json($amigos);
    }
    

    public function obtenerMensajes($idUsuario, $idAmigo = null, $tipo = null, $id = null)
    {
        $query = Mensaje::query();

        if ($tipo == 'usuario' && $idAmigo) {
            $query->where(function ($q) use ($idUsuario, $idAmigo) {
                $q->where(function ($q1) use ($idUsuario, $idAmigo) {
                    $q1->where('id_usuario', $idUsuario)->where('id_usuario2', $idAmigo);
                })
                    ->orWhere(function ($q2) use ($idUsuario, $idAmigo) {
                        $q2->where('id_usuario', $idAmigo)->where('id_usuario2', $idUsuario);
                    });
            });
        }

        if ($tipo == 'foro' && $id) {
            $query->where('id_foro', $id);
        }

        if ($tipo == 'evento' && $id) {
            $query->where('id_evento', $id);
        }

        $mensajes = $query->orderBy('created_at', 'asc')->get();

        return response()->json($mensajes);
    }

    // Función para enviar un mensaje a un usuario, evento o foro
    public function enviarMensaje(Request $request, $idUsuario)
    {
        $validator = Validator::make($request->all(), [
            'contenido' => 'required|string|max:255',
            'tipo' => 'required|string|in:usuario,evento,foro',
            'id_destino' => 'required|integer',
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => 'Datos invalidos: ' . $validator->errors()->first()], 400);
        }

        $mensaje = new Mensaje();
        $mensaje->contenido = $request->contenido;

        if ($request->tipo == 'usuario') {
            $mensaje->id_usuario = $idUsuario;
            $mensaje->id_usuario2 = $request->id_destino;
        } elseif ($request->tipo == 'evento') {
            $mensaje->id_usuario = $idUsuario;
            $mensaje->id_evento = $request->id_destino;
        } elseif ($request->tipo == 'foro') {
            $mensaje->id_usuario = $idUsuario;
            $mensaje->id_foro = $request->id_destino;
        }

        $mensaje->save();

        return response()->json($mensaje, 201);
    }
}
