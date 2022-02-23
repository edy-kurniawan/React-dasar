import { Container, Table, Col, Row } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';

function ListComponent() {

    const [mahasiswa, setMahasiswa] = useState([]);

    useEffect(() => {
        fetchData();
        document.title = "React Basic";
    }, []);

    const fetchData = async() => {
        fetch('http://localhost:3030/mahasiswa')
        .then(response => response.json())
        .then(json => {
            setMahasiswa(json);
        });
    }

    const deleteMahasiswa = async(id) => {
        await fetch(`http://localhost:3030/mahasiswa/${id}`, {
            method: 'DELETE',
        });
        fetchData();
    }

  return (
    <div>
        <Container>
        <Row className='mt-4'>
            <Col md={6}>
                <h3 className='mt-2'>Data Mahasiswa</h3>
            </Col>
            <Col md={6}>
                <h3 className='mt-2'>
                    <Link className='btn btn-primary float-end' to="add"><FontAwesomeIcon icon={faPlus}></FontAwesomeIcon> Tambah Data</Link>
                </h3>
            </Col>
        </Row>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>NIM</th>
                        <th>Nama</th>
                        <th>Kelas</th>
                        <th>Aksi</th>
                    </tr>
                </thead>
                <tbody>
                    {mahasiswa.map((mhs, index) => {
                        return (
                            <tr key={mhs.id}>
                                <td>{index + 1}</td>
                                <td>{mhs.nim}</td>
                                <td>{mhs.nama}</td>
                                <td>{mhs.id_kelas}</td>
                                <td>
                                    <Link to={`/edit/${mhs.id}`} className='btn btn-sm btn-success mx-1'><FontAwesomeIcon icon={faEdit}></FontAwesomeIcon> Edit</Link>
                                    <button onClick={() => deleteMahasiswa(mhs.id)} className='btn btn-sm btn-danger'><FontAwesomeIcon icon={faTrash}></FontAwesomeIcon> Hapus</button>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </Table>
        </Container>
    </div>
  )
}

export default ListComponent