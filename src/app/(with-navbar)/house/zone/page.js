'use client'
import React, { useEffect, useState } from 'react';
import GetRequest from '../../../ConfigAPI';
import { GET_API_HOUSE_ZONE } from '../../../../../api';
import { Table } from 'react-bootstrap';

export default function HouseZone() {
    console.log(GET_API_HOUSE_ZONE)
    const [showData, setShowData] = useState([]);

    const fecthHouseZone = async () => {
        try {
            const result = await GetRequest(GET_API_HOUSE_ZONE, 'GET', null);
            setShowData(result.data);
        } catch (error) {
            console.log('error', error);
        }
    }

    useEffect(() => {
        fecthHouseZone();
    }, []);

    return (
        <div className='container mt-5'>
            <div className='col-md-12'>
                <Table hover>
                    <thead>
                        <tr>
                            <th>รหัสโซน</th>
                            <th>ชื่อโซน</th>
                            <th>ราคาตารางวา</th>
                            <th>สถานะ</th>
                        </tr>
                    </thead>
                    <tbody>
                        {showData.map((data) => (
                            <tr key={data.hz_id}>
                                <td>{data.hz_id}</td>
                                <td>{data.name}</td>
                                <td>{data.landArea_price}</td>
                                <td>{data.status}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>
        </div>
    );
}