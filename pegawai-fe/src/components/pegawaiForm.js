// src/components/PegawaiForm.jsx
import React, { useState, useEffect } from 'react';

function PegawaiForm({ currentPegawai, onSave, onCancel }) {
  const [pegawai, setPegawai] = useState({
    nama: '',
    jabatan: '',
    gaji: '',
  });

  // Effect untuk mengisi form saat ada data pegawai yang dipilih untuk diedit
  useEffect(() => {
    if (currentPegawai) {
      setPegawai(currentPegawai);
    } else {
      // Kosongkan form jika tidak ada pegawai yang dipilih (mode tambah)
      setPegawai({ nama: '', jabatan: '', gaji: '' });
    }
  }, [currentPegawai]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPegawai({ ...pegawai, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Validasi sederhana
    if (!pegawai.nama || !pegawai.jabatan || !pegawai.gaji) {
      alert('Semua field harus diisi!');
      return;
    }
    onSave(pegawai);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>{currentPegawai && currentPegawai.id ? 'Edit Pegawai' : 'Tambah Pegawai Baru'}</h2>
      <div className="form-group">
        <label>Nama</label>
        <input
          type="text"
          name="nama"
          value={pegawai.nama}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label>Jabatan</label>
        <input
          type="text"
          name="jabatan"
          value={pegawai.jabatan}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label>Gaji</label>
        <input
          type="number"
          name="gaji"
          value={pegawai.gaji}
          onChange={handleChange}
        />
      </div>
      <button type="submit">Simpan</button>
      <button type="button" className="cancel" onClick={onCancel}>Batal</button>
    </form>
  );
}

export default PegawaiForm;