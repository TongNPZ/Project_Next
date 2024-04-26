'use client'
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Form } from 'react-bootstrap';
import {
    API_HOUSE_ESTATE,
} from '../../../../api'
import GetRequest from '../../ConfigAPI'
import { UseAuth } from '@/app/componnent/AuthContext/AuthContext';

export default function House_estate() {
    const [data, setData] = useState([]);

    useEffect(() => {
        async function fecthHouse_Estate() {
            try {
                const result = await GetRequest(API_HOUSE_ESTATE, 'GET', null);
                setData(result.data);
            } catch (error) {
                console.log('error', error);
            }
        }
        fecthHouse_Estate();
    }, []);

    return (
        <>
            <div className="container mt-4">
                <h1 className="text-center mb-4">ข้อมูลโครงการ</h1>
                <div className="row d-flex justify-content-center">
                    {data[0] && data.map((val, idx) => (
                        <div className="col-lg-8" key={idx}>
                            <div className="card mb-4 box02">
                                <div className="card-body text-center">
                                    <div className="d-flex justify-content-end">
                                        {/* Insert any content you want to display in this section */}
                                    </div>
                                    {/* <img
                    className="card-img-top mb-3"
                    src={val.image}
                    alt={`House ${val.he_id}`}
                    style={{ width: "400px", height: "200px" }}
                /> */}
                                    <h5>โครงการ {val.name}</h5>
                                    <div className='card text-left p-4'>

                                        <p>ชื่อบริษัท : {val.company}</p>
                                        <p>ชื่อผู้จัดการ : {val.md_name} </p>
                                        <p>ที่อยู่โครงการ : {val.address}</p>
                                        <p>เบอร์โทร : {val.user_phone}</p>
                                        <p>อัตตราผ่อน : {val.down_rate} %</p>
                                        {/* <p>เงินส่วนกลาง : {val.common_money}</p> */}
                                    </div>
                                    <br />
                                    {/* {Auth.isLoggedIn && Auth.status == 1 && (
                    <div className='row mt-3'>
                        <div className='col-6'>
                            <button className="btn button09" onClick={() => { navigate('/AdminProfileEdit'); }}>
                                แก้ไขข้อมูล
                            </button>
                        </div>
                        <div className='col-6'>
                            <button className="btn button09" onClick={() => { navigate(`/AdminUsePassEdit/${val.he_id}`); }}>
                                แก้ไขรหัสผ่าน
                            </button>
                        </div>
                    </div>
                )} */}
                                </div>
                            </div>
                        </div>
                    ))}

                </div>
            </div>
        </>
    );
}