<?php

namespace App\Http\Controllers;

use App\Models\pegawai_controller;
use Illuminate\Http\Request;

class PegawaiControllerController extends Controller
{
   public function index() { return pegawai_controller::all(); }

    public function store(Request $request) {
        $validated = $request->validate([
            'nama'=>'required|string|max:255',
            'jabatan'=>'required|string|max:255',
            'gaji'=>'required|integer'
        ]);
        return pegawai_controller::create($validated);
        return response()->json([
            'message'=>'Data pegawai berhasil di tambahkan',
            'data'=>$validated
        ],201);
    }

    public function show(pegawai_controller $buku) { return $buku; }

    public function update(Request $request, $id) {
        $pegawai = pegawai_controller::findOrFail($id);
        $validated = $request->validate([
           'nama'=>'required|string|max:255',
            'jabatan'=>'required|string|max:255',
            'gaji'=>'required|integer'
        ]);
        $pegawai->update($validated);
        return $pegawai;
    }

    public function destroy($id) {
        $pegawai= pegawai_controller::findOrFail($id);
        $pegawai->delete();
        return response()->json([
            'message'=>'Data Berhasil dihapus'
        ]);
    }
}
