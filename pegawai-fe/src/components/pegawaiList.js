// src/components/PegawaiList.jsx
import React from 'react';

function PegawaiList({ pegawaiList, onEdit, onDelete }) {
  return (
    <div>
      <h2>Daftar Pegawai</h2>
      {pegawaiList.length === 0 ? (
        <p>Belum ada data pegawai.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>No</th>
              <th>Nama</th>
              <th>Jabatan</th>
              <th>Gaji</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {pegawaiList.map((pegawai, index) => (
              <tr key={pegawai.id}>
                <td>{index + 1}</td>
                <td>{pegawai.nama}</td>
                <td>{pegawai.jabatan}</td>
                <td>Rp {pegawai.gaji.toLocaleString('id-ID')}</td>
                <td>
                  <button className="edit" onClick={() => onEdit(pegawai)}>Edit</button>
                  <button className="delete" onClick={() => onDelete(pegawai.id)}>Hapus</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default PegawaiList;