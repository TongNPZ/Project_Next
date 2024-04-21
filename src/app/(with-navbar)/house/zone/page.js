'use client'
import React, { useEffect, useState } from 'react';
import GetRequest from '@/app/ConfigAPI';
import { API_HOUSE_ZONE } from '../../../../../api';
import ModalAdd from './ModalAdd'
import {
    Table,
    Card,
    Button,
    Form
} from 'react-bootstrap';
import {
    BsPencilSquare,
    BsFillHouseSlashFill,
    BsFillHouseAddFill
} from "react-icons/bs";

export default function HouseZone() {

    // fecth //
    const [showData, setShowData] = useState([]);

    const fecthHouseZone = async () => {
        try {
            const result = await GetRequest(API_HOUSE_ZONE, 'GET', null);
            setShowData(result.data);
        } catch (error) {
            console.log('error', error);
        }
    }

    useEffect(() => {
        fecthHouseZone();
    }, [showData]);
    // --- //

    // modal //
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    // --- //

    return (
        <div className='container-fluid px-4'>
            <Card>
                <Card.Header>
                    <div className='row'>
                        <div className='col-md-6 d-flex align-items-center'>
                            <h5>ตารางข้อมูลโซนบ้าน</h5>
                        </div>
                        <div className='col-md-6 text-md-end'>
                            <Button variant="success" onClick={handleShow}>
                                <BsFillHouseAddFill style={{ fontSize: '24px' }} />
                            </Button>
                            <ModalAdd show={show} handleClose={handleClose} />
                        </div>
                    </div>
                </Card.Header>
                <Card.Body>
                    <div className='row'>
                        <div className='col-md-8' />
                        <div className='col-md-4 text-md-end mb-3'>
                            <Form.Control
                                type="search"
                                placeholder="ค้นหา"
                            />
                        </div>
                    </div>
                    <div>
                        <Table bordered hover>
                            <thead>
                                <tr>
                                    <th>รหัสโซนบ้าน</th>
                                    <th>ชื่อโซนบ้าน</th>
                                    <th>ราคาบ้านต่อที่ดิน</th>
                                    <th>สถานะ</th>
                                    <th>การจัดการ</th>
                                </tr>
                            </thead>
                            <tbody>
                                {showData.map((data) => (
                                    <tr key={data.hz_id}>
                                        <td>{data.hz_id}</td>
                                        <td>{data.name}</td>
                                        <td>{data.landArea_price}</td>

                                        {data.status === 1 ? (
                                            <td>
                                                <p className='text-success'>โซนเปิดใช้งาน</p>
                                            </td>
                                        ) : (
                                            <td>
                                                <p className='text-danger'>โซนปิดใช้งาน</p>
                                            </td>
                                        )}

                                        <td>
                                            <BsPencilSquare className='me-2 text-warning' style={{ fontSize: '24px' }} />
                                            <BsFillHouseSlashFill className='text-danger' style={{ fontSize: '24px' }} />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </div>
                </Card.Body>
            </Card>
        </div>
    );
}