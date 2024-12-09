<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class vehiculo extends Model
{
    protected $fillable = ['id_usuario', 'nombre', 'capacidad', 'foto', 'ocupantes'];

    protected $casts = [
        'ocupantes' => 'array',
    ];

    public function usuario()
    {
        return $this->belongsTo(User::class, 'id_usuario');
    }
}
