<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class mensaje extends Model
{
    protected $fillable = [
        'id_usuario', 
        'id_usuario2',
        'id_evento',   
        'id_foro', 
    ];

    public function usuario()
    {
        return $this->belongsTo(User::class, 'id_usuario');
    }

    public function usuarioSecundario()
    {
        return $this->belongsTo(User::class, 'id_usuario2');
    }

    public function evento()
    {
        return $this->belongsTo(Evento::class, 'id_evento');
    }

    public function foro()
    {
        return $this->belongsTo(Foro::class, 'id_foro');
    }
}
