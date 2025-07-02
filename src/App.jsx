import { useState, useEffect } from 'react'
import './App.css'

function App() {
  // 1. State untuk menyimpan data pengguna, status loading, dan error
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState({})
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 2. useEffect untuk menjalankan fungsi pengambilan data saat komponen pertama kali di-render
  useEffect(() => {
    // 3. Definisikan fungsi async untuk mengambil data
    const fetchUsers = async () => {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setUsers(data); // Simpan data ke state
      } catch (e) {
        setError(e.message); // Tangkap dan simpan pesan error
      } finally {
        setLoading(false); // Hentikan loading setelah selesai (baik sukses maupun gagal)
      }
    };

    fetchUsers(); // Panggil fungsi tersebut
  }, []); // [] dependency array kosong berarti efek ini hanya berjalan sekali

  const fetchSelectedUser = async (key) => {
    setSelectedUser({})
      try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/users/${key}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setSelectedUser(data);
      } catch (e) {
        setError(e.message);
      } finally {
        setLoading(false); // Hentikan loading setelah selesai (baik sukses maupun gagal)
      }
    };

  const userClick = (key) => {
    fetchSelectedUser(key);
  }

  useEffect(() => {
    if(selectedUser && selectedUser.id) {
      alert(`User Id: ${selectedUser.id}\nName${selectedUser.id}\nUsername: ${selectedUser.username}\nEmail: ${selectedUser.email}\nPassword : pass\nAddress: ${selectedUser.address.street}, ${selectedUser.address.suite}, ${selectedUser.address.city}, ${selectedUser.address.zipcode}\nCoordinate: lat: ${selectedUser.address.geo.lat} | long: ${selectedUser.address.geo.lng}`)
    }
  }, [selectedUser])

  // 4. Render UI berdasarkan state
  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="App">
      <h1>Daftar Pengguna situs Zeus gacor 88</h1>
      <h4>Sumpah mereka udh menang 10 juta miliar 192740123 !!!</h4>
      <div className="user-list">
        {users.map(user => (
          <div key={user.id} className="user-card" onClick={() => userClick(user.id)}>
            <h2>{user.name}</h2>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Website:</strong> {user.website}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App; 