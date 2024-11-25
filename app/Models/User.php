<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'admin',               
        'nombre',             
        'apellido',            
        'foto',               
        'email',              
        'password',            
        'ubicacionFavorita',   
        'leyenda',           
        'gustos',    
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected $casts = [
        'email_verified_at' => 'datetime',
        'gustos' => 'array',
        'admin' => 'boolean',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    public function vehiculos()
    {
        return $this->hasMany(Vehiculo::class, 'id_usuario');
    }
    
    public function mensajes()
    {
        return $this->hasMany(Mensaje::class, 'id_usuario');
    }
    
    public function eventos()
    {
        return $this->belongsToMany(Evento::class, 'usuario_eventos', 'id_usuario', 'id_evento')
                    ->withTimestamps();
    }
    
    public function foros()
    {
        return $this->belongsToMany(Foro::class, 'usuario_foros', 'id_usuario', 'id_foro')
                    ->withTimestamps();
    }
}
