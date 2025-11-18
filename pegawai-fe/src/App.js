// src/App.jsx
import React, { useState, useEffect } from 'react';
import PegawaiList from './components/pegawaiList';
import PegawaiForm from './components/pegawaiForm';
import './App.css';

// Sesuaikan URL API Laravel Anda
const API_URL = "http://localhost:8000/api/pegawai_controller";

function App() {
  const [pegawaiList, setPegawaiList] = useState([]);
  const [currentPegawai, setCurrentPegawai] = useState(null); // null untuk mode tambah, object untuk mode edit
  const [isLoading, setIsLoading] = useState(true);

  // Fungsi untuk mengambil semua data pegawai
  const fetchPegawai = async () => {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      setPegawaiList(data);
    } catch (error) {
      console.error("Gagal mengambil data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // useEffect untuk memanggil fetchPegawai saat komponen pertama kali dimuat
  useEffect(() => {
    fetchPegawai();
  }, []);

  // Fungsi untuk menyimpan data (tambah atau edit)
  const handleSave = async (pegawaiData) => {
    const isEditing = pegawaiData.id;
    const url = isEditing ? `${API_URL}/${pegawaiData.id}` : API_URL;
    const method = isEditing ? 'PUT' : 'POST';

    try {
      const response = await fetch(url, {
        method: method,
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(pegawaiData),
      });

      if (response.ok) {
        fetchPegawai(); // Ambil ulang data untuk memperbarui tampilan
        setCurrentPegawai(null); // Tutup form
        alert(isEditing ? 'Data berhasil diperbarui!' : 'Data berhasil ditambahkan!');
      } else {
        const errorData = await response.json();
        console.error("Gagal menyimpan data:", errorData);
        alert('Gagal menyimpan data. Cek console untuk detail.');
      }
    } catch (error) {
      console.error("Gagal menyimpan data:", error);
      alert('Terjadi kesalahan saat menyimpan data.');
    }
  };

  // Fungsi untuk menghapus data
  const handleDelete = async (id) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus data ini?')) {
      try {
        const response = await fetch(`${API_URL}/${id}`, {
          method: 'DELETE',
        });

        if (response.ok) {
          fetchPegawai(); // Ambil ulang data
          alert('Data berhasil dihapus!');
        } else {
          console.error("Gagal menghapus data");
          alert('Gagal menghapus data.');
        }
      } catch (error) {
        console.error("Gagal menghapus data:", error);
        alert('Terjadi kesalahan saat menghapus data.');
      }
    }
  };

  // Fungsi untuk membuka form edit
  const handleEdit = (pegawai) => {
    setCurrentPegawai(pegawai);
  };

  // Fungsi untuk membatalkan form
  const handleCancel = () => {
    setCurrentPegawai(null);
  };

  if (isLoading) {
    return <div className="container"><h1>Loading...</h1></div>;
  }

  return (
    <div className="container">
      <h1>Manajemen Pegawai</h1>
      
      {/* Tampilkan form jika sedang menambah atau mengedit */}
      {currentPegawai !== null && (
        <PegawaiForm
          currentPegawai={currentPegawai}
          onSave={handleSave}
          onCancel={handleCancel}
        />
      )}

      {/* Tampilkan tombol tambah jika form tidak sedang aktif */}
      {currentPegawai === null && (
        <button onClick={() => setCurrentPegawai({})}>+ Tambah Pegawai</button>
      )}

      <PegawaiList
        pegawaiList={pegawaiList}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
}

export default App;