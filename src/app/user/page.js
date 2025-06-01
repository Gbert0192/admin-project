'use client'

import { Pencil, Trash2, Search } from 'lucide-react'
import { useState } from 'react'

const users = [
  {
    no: 1,
    nim: '2201001',
    nama: 'Budi Santoso',
    status: 'admin',
    kelas: 'TI-1A',
    gmail: 'budi@gmail.com',
    response: 12
  },
  {
    no: 2,
    nim: '2201002',
    nama: 'Siti Aminah',
    status: 'user',
    kelas: 'TI-1B',
    gmail: 'siti@gmail.com',
    response: 8
  },
  {
    no: 3,
    nim: '2201003',
    nama: 'Agus Salim',
    status: 'user',
    kelas: 'TI-1A',
    gmail: 'agus@gmail.com',
    response: 5
  },
  {
    no: 4,
    nim: '2201004',
    nama: 'Nina Arsy',
    status: 'user',
    kelas: 'TI-1C',
    gmail: 'nina@gmail.com',
    response: 9
  },
  {
    no: 5,
    nim: '2201005',
    nama: 'John Doe',
    status: 'admin',
    kelas: 'TI-1B',
    gmail: 'john@gmail.com',
    response: 15
  },
  {
    no: 6,
    nim: '2201006',
    nama: 'Sari Dewi',
    status: 'user',
    kelas: 'TI-1C',
    gmail: 'sari@gmail.com',
    response: 4
  },
  {
    no: 7,
    nim: '2201007',
    nama: 'Rudi Hartono',
    status: 'user',
    kelas: 'TI-1A',
    gmail: 'rudi@gmail.com',
    response: 7
  },
  {
    no: 8,
    nim: '2201008',
    nama: 'Linda Wati',
    status: 'user',
    kelas: 'TI-1B',
    gmail: 'linda@gmail.com',
    response: 3
  },
  {
    no: 9,
    nim: '2201009',
    nama: 'Eka Putra',
    status: 'admin',
    kelas: 'TI-1C',
    gmail: 'eka@gmail.com',
    response: 10
  },
  {
    no: 10,
    nim: '2201010',
    nama: 'Tini Martani',
    status: 'user',
    kelas: 'TI-1A',
    gmail: 'tini@gmail.com',
    response: 2
  }
]

export default function UserPage() {
  const [search, setSearch] = useState('')
  const [filteredUsers, setFilteredUsers] = useState(users)

  const handleSearch = () => {
    if (search === '') {
      setFilteredUsers(users)
    } else {
      const result = users.filter((u) => u.nim.includes(search))
      setFilteredUsers(result)
    }
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Halaman User</h1>

      <div className="mb-6">
        <label htmlFor="search" className="block text-sm font-medium mb-1">
          Cari berdasarkan NIM
        </label>
        <div className="flex items-center gap-2">
          <input
            id="search"
            type="text"
            placeholder="Masukkan NIM"
            className="px-3 py-2 border rounded-md w-64"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button
            onClick={handleSearch}
            className="p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            title="Cari"
          >
            <Search className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="overflow-auto rounded-lg border border-gray-200 shadow-sm">
        <table className="min-w-full bg-white text-sm">
          <thead className="bg-gray-50 text-left text-xs font-semibold text-gray-600">
            <tr>
              <th className="p-3">No</th>
              <th className="p-3">NIM</th>
              <th className="p-3">Nama</th>
              <th className="p-3">Status</th>
              <th className="p-3">Kelas</th>
              <th className="p-3">Gmail</th>
              <th className="p-3">Response Task</th>
              <th className="p-3">Opsi</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.length === 0 ? (
              <tr>
                <td colSpan="8" className="p-4 text-center text-gray-500">
                  Tidak ditemukan.
                </td>
              </tr>
            ) : (
              filteredUsers.map((user) => (
                <tr key={user.no} className="border-b hover:bg-gray-50">
                  <td className="p-3">{user.no}</td>
                  <td className="p-3">{user.nim}</td>
                  <td className="p-3">{user.nama}</td>
                  <td className="p-3 capitalize">{user.status}</td>
                  <td className="p-3">{user.kelas}</td>
                  <td className="p-3">{user.gmail}</td>
                  <td className="p-3">{user.response}</td>
                  <td className="p-3 flex gap-2">
                    <button
                      className="text-blue-600 hover:underline flex items-center gap-1"
                      onClick={() => alert(`Edit ${user.nama}`)}
                    >
                      <Pencil className="w-4 h-4" />
                      Edit
                    </button>
                    <button
                      className="text-red-600 hover:underline flex items-center gap-1"
                      onClick={() => alert(`Delete ${user.nama}`)}
                    >
                      <Trash2 className="w-4 h-4" />
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
