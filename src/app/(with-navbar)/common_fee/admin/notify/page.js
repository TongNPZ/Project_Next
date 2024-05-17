'use client'
import React, { useEffect, useState } from 'react';
import { DateFormat } from '@/app/Format';
import ProtectRoute from '@/app/componnent/ProtectRoute/ProtectRoute';
import GetRequest from '@/app/ConfigAPI';
import {
    API_NOTIFY_COMMON_FEE,
    API_HOUSE_OWNER
} from '../../../../../../api';
import ModalAdd from './ModalAdd';
import {
    Table,
    Card,
    Button,
    Form,
    OverlayTrigger,
    Tooltip
} from 'react-bootstrap';
import {
    BsEnvelopeArrowUpFill
} from "react-icons/bs";

export default function NotifyCommonFee() {
    const currentDate = new Date

    // - fecth - //
    const [showData, setShowData] = useState([]);
    const [showNcf, setShowNcf] = useState([]);

    useEffect(() => {
        const fetchHouseOwner = async () => {
            try {
                const result = await GetRequest(API_HOUSE_OWNER, 'GET', null);
                setShowData(result.data);
            } catch (error) {
                console.log('error', error);
            }
        }

        const fetchNcf = async () => {
            try {
                const result = await GetRequest(`${API_NOTIFY_COMMON_FEE}?order=DESC`, 'GET', null);
                setShowNcf(result.data);
            } catch (error) {
                console.log('error', error);
            }
        }

        const timeout = setTimeout(() => {
            fetchHouseOwner();
            fetchNcf();
        }, 60);

        return () => clearTimeout(timeout);
    }, [currentDate]);

    // --- //

    // modal
    const [selected, setSelected] = useState({
        hId: '',
        houseNo: '',
        userName: '',
        userLastname: '',
        transDate: '',
        ncfNextDate: '',
        ncfAmount: '',
    });

    const [showAdd, setShowAdd] = useState(false);

    const handleAddClose = () => setShowAdd(false);
    const handleAddShow = (selected) => {
        setSelected(selected);
        setShowAdd(true);
    }

    // tooltip
    const renderTooltipAddNotifyCommonFee = (props) => (
        <Tooltip {...props}>
            แจ้งชำระค่าส่วนกลาง
        </Tooltip>
    );

    return (
        <ProtectRoute requireRoles={[1]}>

            {/* modal */}
            <ModalAdd show={showAdd} handleClose={handleAddClose} selected={selected} />
            {/* --- */}

            <Card>
                <Card.Header>

                    <div className='row'>
                        <div className='col-md-6 d-flex align-items-center'>
                            <h5>ตารางข้อมูลแจ้งชำระค่าส่วนกลาง</h5>
                        </div>
                        <div className='col-md-6 text-md-end'>
                            <Button variant="success" href='/common_fee/admin/receive'>
                                ตรวจสอบการรับเงินค่าส่วนกลาง
                            </Button>
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
                        <Table bordered hover responsive>
                            <thead>
                                <tr>
                                    <th>ลำดับ</th>
                                    <th>บ้านเลขที่</th>
                                    <th>ชื่อเจ้าของบ้าน</th>
                                    <th>วันที่โอนกรรมสิทธิ์</th>
                                    <th>วันที่แจ้งชำระค่าส่วนกลาง</th>
                                    <th>จำนวนเงินค่าส่วนกลาง</th>
                                    <th>การจัดการ</th>
                                </tr>
                            </thead>
                            <tbody>

                                {showData && showData.length > 0 ? (
                                    showData.map((data, index) => {
                                        const currentDate = new Date();
                                        const ncfData = showNcf.find((ncf) => ncf.h_id === data.h_id);
                                        if (!ncfData) {
                                            return null
                                        } else {
                                            const commonRate = ncfData.common_rate;
                                            const commonMonth = ncfData.common_month;
                                            const totalPrice = (data.hLand_space * commonRate) * commonMonth;

                                            if (currentDate < new Date(ncfData.ncf_nextDate)) {
                                                return (
                                                    <tr key={index}>
                                                        <td>{index + 1}</td>
                                                        <td>{data.house_no}</td>
                                                        <td>{data.user_name} {data.user_lastname}</td>
                                                        <td>{DateFormat(data.trans_date)}</td>
                                                        <td>{DateFormat(ncfData.ncf_nextDate)}</td>
                                                        <td>{parseFloat(totalPrice).toLocaleString()}</td>
                                                        <td>
                                                            <OverlayTrigger overlay={renderTooltipAddNotifyCommonFee}>
                                                                <a style={{ cursor: 'pointer' }} onClick={() => handleAddShow({
                                                                    hId: data.h_id,
                                                                    houseNo: data.house_no,
                                                                    userName: data.user_name,
                                                                    userLastname: data.user_lastname,
                                                                    transDate: data.trans_date,
                                                                    ncfNextDate: ncfData.ncf_nextDate,
                                                                    ncfAmount: totalPrice,
                                                                })} >
                                                                    <BsEnvelopeArrowUpFill className='me-2 text-secondary' style={{ fontSize: '24px' }} />
                                                                </a>
                                                            </OverlayTrigger>
                                                        </td>
                                                    </tr>
                                                );
                                            } else {
                                                return (
                                                    <tr>
                                                        <td colSpan="12" className="text-center">
                                                            <h4 className='mt-5 mb-5'>
                                                                ยังไม่ถึงเวลาที่แจ้งชำระ
                                                            </h4>
                                                        </td>
                                                    </tr>
                                                )
                                            }

                                        }
                                    })
                                ) : (
                                    <tr>
                                        <td colSpan="12" className="text-center">
                                            <h4 className='mt-5 mb-5'>
                                                ไม่มีข้อมูลที่แสดง
                                            </h4>
                                        </td>
                                    </tr>
                                )}

                            </tbody>
                        </Table>
                    </div>
                </Card.Body>
            </Card>
        </ProtectRoute>
    );
}