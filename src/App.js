import { Routes, Route } from "react-router-dom";

import Navbar from './components/layouts/NavbarComponent';
import ListMahasiswa from './components/mahasiswa/ListComponent';
import AddMahasiswa from './components/mahasiswa/AddComponent';
import UpdateMahasiswa from './components/mahasiswa/UpdateComponent';

import DatatableComponent from "./components/mahasiswa/DatatableComponent";

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<DatatableComponent />} />
        <Route path="/add" element={<AddMahasiswa />} />
        <Route path="/edit/:id" element={<UpdateMahasiswa />} />
      </Routes>
    </div>
  );
}

export default App;
