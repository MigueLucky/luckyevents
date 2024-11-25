<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class foro extends Model
{
    protected $fillable = [
        'nombre',      
        'foto',        
        'descripcion',  
        'ubicacion',    
        'color',       
        'gusto',    
        'report',       
        'razonReport',
    ];

    public function usuarios()
    {
        return $this->belongsToMany(User::class, 'usuario_foros', 'id_foro', 'id_usuario')
                    ->withTimestamps();
    }
}
