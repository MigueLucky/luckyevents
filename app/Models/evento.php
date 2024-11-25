<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class evento extends Model
{
    protected $fillable = [
        'nombre',       
        'privacidad',      
        'fechaHoraInicio', 
        'fechaHoraFin',    
        'foto',            
        'descripcion',     
        'ubicacion',       
        'color',           
        'links',         
        'gusto',           
        'report',          
        'razonReport', 
    ];

    protected $casts = [
        'fechaHoraInicio' => 'datetime',
        'fechaHoraFin' => 'datetime',
        'links' => 'array',
        'privacidad' => 'boolean',
        'report' => 'boolean',
    ];

    public function usuarios()
    {
        return $this->belongsToMany(User::class, 'usuario_eventos', 'id_evento', 'id_usuario')
                    ->withTimestamps();
    }
}
