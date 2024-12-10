<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function index()
    {
        return User::all();
    }

    public function store(Request $request)
    {
        if (User::where('email', $request->email)->exists()) {
            return response()->json(['error' => 'El email ya está en uso'], 422);
        }

        $user = User::create([
            'nombre' => $request->nombre,
            'email' => $request->email,
            'password' => bcrypt($request->password),
            'foto' => $request->foto,
        ]);

        return response()->json($user, 201);
    }

    public function login(Request $request)
    {
        $credentials = $request->only('email', 'password');

        if (Auth::attempt($credentials)) {
            $user = Auth::user();

            return response()->json([
                'message' => 'Login successful',
                'user' => $user
            ], 200);
        } else {
            return response()->json([
                'error' => 'Unauthorized'
            ], 401);
        }
    }

    public function logout(Request $request)
    {
        Auth::logout();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return response()->json([
            'message' => 'Logout successful'
        ], 200);
    }

    public function show($id)
    {
        return User::findOrFail($id);
    }

    public function update(Request $request, $id)
{
    Log::info('Datos recibidos:', $request->all());

    $user = User::findOrFail($id);
    Log::info('Usuario encontrado:', ['id' => $user->id]);

    $data = $request->validate([
        'nombre' => 'required|string|max:255',
        'apellido' => 'nullable|string|max:255',
        'leyenda' => 'nullable|string|max:255',
        'email' => 'required|string|max:255',
        'ubicacion' => 'nullable|string|max:255',
        'foto' => 'nullable',
    ]);

    if ($request->hasFile('foto')) {
        $data['foto'] = $request->file('foto')->store('avatares', 'public');
    }

    $user->update($data);

    return response()->json($user);
}


public function cambiarContrasena(Request $request, $id)
{
    $user = User::findOrFail($id);

    $data = $request->validate([
        'antiguaContra' => 'required',
        'nuevaContra' => 'required',
    ]);

    if (!Hash::check($data['antiguaContra'], $user->password)) {
        return response()->json(['error' => 'La contraseña actual es incorrecta.'], 400);
    }

    $user->password = Hash::make($data['nuevaContra']);
    $user->save();

    return response()->json(['message' => 'Contraseña actualizada correctamente.']);
}

    public function destroy($id)
    {
        $user = User::findOrFail($id);
        $user->delete();
        return response()->json(['message' => 'Deleted successfully']);
    }
}
