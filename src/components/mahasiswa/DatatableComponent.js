import { Container, Row, Col } from 'react-bootstrap';
import DataTable from 'react-data-table-component';
import { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash, faPlus } from '@fortawesome/free-solid-svg-icons';


function DatatableComponent() {

    // delete data
    const deleteMahasiswa = async(id) => {
        await fetch(`http://localhost:3030/mahasiswa/${id}`, {
            method: 'DELETE',
        });
        fetchData();
    }

    //make array
    const columns = [
        {
            name: 'NIM',
            selector: row => row.nim,
            sortable: true,
        },
        {
            name: 'Nama',
            selector: row => row.nama,
            sortable: true,
        },
        {
            name: 'Kelas',
            selector: row => row.id_kelas,
            sortable: true,
        },
        {
            name: 'Aksi',
            selector: row => row.id,
            cell: (row) => {
                return (
                    <div>
                        <Link to={`/edit/${row.id}`} className='btn btn-sm btn-success mx-1'><FontAwesomeIcon icon={faEdit}></FontAwesomeIcon> Edit</Link>
                        <button onClick={() => deleteMahasiswa(row.id)} className='btn btn-sm btn-danger'><FontAwesomeIcon icon={faTrash}></FontAwesomeIcon> Hapus</button>
                    </div>
                )
            }
        },
        
    ];

    const [dataMhs, setDataMahasiswa] = useState([]);

    // on mount
    useEffect(() => {
        fetchData();
        console.log(dataMhs);

    }, []);

    // get data
    const fetchData = async() => {
        fetch('http://localhost:3030/mahasiswa')
        .then(response => response.json())
        .then(json => {
            setDataMahasiswa(json);
        });
    }


  return (
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
          <DataTable
                  columns={columns}
                  data={dataMhs}
                  pagination={true}
              />
      </Container>
  )
}

export default DatatableComponent