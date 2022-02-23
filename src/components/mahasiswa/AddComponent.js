import { Container, Form } from 'react-bootstrap';
import { useState } from 'react';
import { useNavigate  } from 'react-router-dom';

function AddComponent() {

    const [nama, setNama] = useState('');
    const [nim, setNim] = useState('');
    const [id_kelas, setid_kelas] = useState('');

    const [formErrors, setFormErrors] = useState({});

    const navigate = useNavigate();

    const saveMahasiswa = async(e) => {
        e.preventDefault();

        const mahasiswa = { nama, nim, id_kelas };

        setFormErrors(validate(mahasiswa));
        
        if(Object.keys(formErrors).length === 0 ){
            
            fetch('http://localhost:3030/mahasiswa', {
                method: 'POST',
                body: JSON.stringify(mahasiswa),
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            navigate('/');

        }

    }

    const validate = (values) => {
        const errors = {};

        if (!values.nim) {
          errors.nim = "nim is required!";
        }

        if (!values.nama) {
            errors.nama = "nama is required!";
        }

        if (!values.id_kelas) {
            errors.id_kelas = "kelas is required!";
        }

        return errors;
    };

  return (
    <div>
        <Container>
            <h3 className='mt-4'>Tambah Data Mahasiswa</h3>
            <Form onSubmit={saveMahasiswa}>
                <Form.Group className="mb-3">
                    <Form.Label>Nim</Form.Label>
                    <Form.Control type="text" value={nim} onChange={(e) => setNim(e.target.value)} placeholder="Masukan NIM"/>
                    <p className="text-danger">{formErrors.nim}</p>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Nama</Form.Label>
                    <Form.Control type="text" value={nama} onChange={(e) => setNama(e.target.value)} placeholder="Masukan Nama"/>
                    <p className="text-danger">{formErrors.nama}</p>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Kelas</Form.Label>
                    <Form.Control type="number" value={id_kelas} onChange={(e) => setid_kelas(e.target.value)} placeholder="Masukan ID Kelas"/>
                    <p className="text-danger">{formErrors.id_kelas}</p>
                </Form.Group>
                <button className='btn btn-primary'>Simpan</button>
            </Form>
        </Container>
    </div>
  )
}

export default AddComponent