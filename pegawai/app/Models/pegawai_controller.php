<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class pegawai_controller extends Model
{
    use HasFactory;
    protected $fillable = [
        'nama', 'jabatan', 'gaji'
    ];

}
