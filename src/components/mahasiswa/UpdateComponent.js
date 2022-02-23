import { Container, Form } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import { useNavigate, useParams  } from 'react-router-dom';

function UpdateComponent() {

    const [nama, setNama] = useState('');
    const [nim, setNim] = useState('');
    const [id_kelas, setid_kelas] = useState('');

    useEffect(() => {
        getMahasiswaById();
    }, []);

    const { id } = useParams();

    const getMahasiswaById = async() => {
        const response = await fetch(`http://localhost:3030/mahasiswa/${id}`);
        const data = await response.json();
        setNama(data.nama);
        setNim(data.nim);
        setid_kelas(data.id_kelas);
    }

    const navigate = useNavigate();

    const updateMahasiswa = async(e) => {
        e.preventDefault();
        const mahasiswa = { nama, nim, id_kelas };
        fetch(`http://localhost:3030/mahasiswa/${id}`, {
            method: 'PUT',
            body: JSON.stringify(mahasiswa),
            headers: {
                'Content-Type': 'application/json',
            },
        });
        navigate('/');
    }

  return (
    <div>
        <Container>
            <h3 className='mt-4'>Tambah Data Mahasiswa</h3>
            <Form onSubmit={updateMahasiswa}>
                <Form.Group className="mb-3">
                    <Form.Label>Nim</Form.Label>
                    <Form.Control type="text" value={nim} onChange={(e) => setNim(e.target.value)} placeholder="Masukan NIM" />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Nama</Form.Label>
                    <Form.Control type="text" value={nama} onChange={(e) => setNama(e.target.value)} placeholder="Masukan Nama" />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Kelas</Form.Label>
                    <Form.Control type="number" value={id_kelas} onChange={(e) => setid_kelas(e.target.value)} placeholder="Masukan ID Kelas" />
                </Form.Group>
                <button className='btn btn-primary'>Simpan</button>
            </Form>
        </Container>
    </div>
  )
}

export default UpdateComponent