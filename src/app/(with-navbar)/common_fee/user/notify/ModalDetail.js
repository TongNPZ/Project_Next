import React, { useState, useEffect } from 'react';
import { DateFormat } from '@/app/Format';
import GetRequest from '@/app/ConfigAPI';
import {
    API_URL,
    NCF
} from '../../../../../../app';
import {
    API_NOTIFY_COMMON_FEE,
    API_RECEIVE_COMMON_FEE,
    API_HOUSE_ESTATE
} from '../../../../../../api';
import ModalAddSlip from "./ModalAddSlip";
import ModalChangedSlip from './ModalChangedSlip';
import {
    Modal,
    Image,
    ListGroup,
    Table,
    Button
} from 'react-bootstrap';
import {
    BsDownload,
    BsSearch,
} from "react-icons/bs";

export default function ModalDetail({ show, handleClose, id }) {


    // - fecth - //

    // housing estate
    const [housingEstate, setHousingEstate] = useState([]);

    const fecthHousingEstate = async () => {
        try {
            const result = await GetRequest(API_HOUSE_ESTATE, 'GET', null);
            setHousingEstate(result.data);
        } catch (error) {
            console.log('error', error);
        }
    }

    useEffect(() => {
        fecthHousingEstate()
    }, [housingEstate]);

    // common fee by id
    const [showData, setShowData] = useState({});

    const fetchCommonFeeById = async () => {
        try {
            const result = await GetRequest(`${API_NOTIFY_COMMON_FEE}/${id}`, 'GET', null);
            setShowData(result);
        } catch (error) {
            console.log('error', error);
        }

    }

    useEffect(() => {
        if (show) {
            fetchCommonFeeById();
        }
    }, [show, id]);

    // show receive common fee
    const [showRcf, setShowRcf] = useState([]);

    useEffect(() => {
        if (show) {
            const fetchRcf = async () => {
                try {
                    const result = await GetRequest(API_RECEIVE_COMMON_FEE, 'GET', null);
                    setShowRcf(result.data);
                } catch (error) {
                    console.log('error', error);
                }
            }

            fetchRcf();
        }
    }, [showRcf, showData]);
    // --- //

    // - modal - //
    const [selectedRcfId, setSelectedRcfId] = useState('')
    const [selectedNcfId, setSelectedNcfId] = useState('')
    const [selectedCommonReceive, setSelectedCommonReceive] = useState('')

    // add slip
    const [showAddSlip, setShowAddSlip] = useState(false);

    const handleAddSlipClose = () => setShowAddSlip(false);
    const handleAddSlipShow = (ncfId, commonReceive) => {
        setSelectedNcfId(ncfId);
        setSelectedCommonReceive(commonReceive);
        setShowAddSlip(true);
    }

    // changed slip
    const [showChangedSlip, setShowChangedSlip] = useState(false);

    const handleChangedSlipClose = () => setShowChangedSlip(false);
    const handleChangedSlipShow = (id) => {
        setSelectedRcfId(id);
        setShowChangedSlip(true);
    }

    // --- //

    return (
        <Modal show={show} onHide={handleClose} size="xl">

            {/* modal */}
            <ModalAddSlip show={showAddSlip} handleClose={handleAddSlipClose} ncfId={selectedNcfId} commonReceive={selectedCommonReceive} />
            <ModalChangedSlip show={showChangedSlip} handleClose={handleChangedSlipClose} id={selectedRcfId} />
            {/* --- */}

            <Modal.Header closeButton />
            <Modal.Body>
                <div className='row mb-3'>
                    <div className='col-md-6'>
                        <div className='mb-4'>

                            {housingEstate.map((data) => (
                                <div key={data.he_id} className='mb-3 text-center'>
                                    <Image src={`${API_URL}${data.image}`} style={{ width: '40%' }} fluid />
                                </div>
                            ))}

                            <div>
                                <p>
                                    {showData.company} <br />
                                    {showData.address} <br />
                                    โทร. {showData.phone}
                                </p>
                            </div>
                        </div>
                        <div>
                            <p>
                                <b>เจ้าของบ้าน</b> <br />
                                เลขที่ {showData.house_no} โซน {showData.name} {showData.house_name} พื้นที่ดิน {showData.hLand_space} ตารางวา พื้นที่ใช้สอย {showData.usable_space} ตารางเมตร <br />
                            </p>
                        </div>
                    </div>
                    <div className='col-md-6'>

                        {housingEstate.map((data) => (
                            <ListGroup key={data.he_id} variant="flush">
                                <ListGroup.Item>

                                    {!showRcf.some((rcf) => rcf.ncf_id === showData.ncf_id) ? (
                                        <h3 className='text-center'>แจ้งชำระค่าส่วนกลาง</h3>
                                    ) : (
                                        <h3 className='text-center'>รายละเอียดชำระค่าส่วนกลาง</h3>
                                    )}

                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <div className='row'>
                                        <div className='col-md-6'>
                                            <p className="col-form-label"><strong>เลขที่แจ้งชำระ:</strong></p>
                                        </div>
                                        <div className='col-md-6'>
                                            <p className="col-form-label">{showData.ncf_id}</p>
                                        </div>
                                    </div>
                                    <div className='row'>
                                        <div className='col-md-6'>
                                            <p className="col-form-label"><strong>วันที่แจ้งชำระ:</strong></p>
                                        </div>
                                        <div className='col-md-6'>
                                            <p className="col-form-label">{DateFormat(showData.ncf_record)}</p>
                                        </div>
                                    </div>
                                    <div className='row'>
                                        <div className='col-md-6'>
                                            <p className="col-form-label"><strong>วันที่กำหนดชำระ:</strong></p>
                                        </div>
                                        <div className='col-md-6'>
                                            <p className="col-form-label">{DateFormat(showData.ncf_date)}</p>
                                        </div>
                                    </div>
                                    <div className='row'>
                                        <div className='col-md-6'>
                                            <p className="col-form-label"><strong>สิ้นสุดวันที่ชำระ:</strong></p>
                                        </div>
                                        <div className='col-md-6'>
                                            <p className="col-form-label">{DateFormat(showData.ncf_nextDate)}</p>
                                        </div>
                                    </div>

                                    {showRcf.some((rcf) => rcf.ncf_id === showData.ncf_id) && (
                                        <div className='row'>
                                            <div className='col-md-6'>
                                                <p className="col-form-label"><strong>วันที่ชำระ:</strong></p>
                                            </div>
                                            <div className='col-md-6'>
                                                <p className="col-form-label">{DateFormat(showRcf.find((rcf) => rcf.ncf_id === showData.ncf_id).rcf_date)}</p>
                                            </div>
                                        </div>
                                    )}

                                    <div className='row'>
                                        <div className='col-md-6'>
                                            <p className="col-form-label"><strong>ผู้จัดการ:</strong></p>
                                        </div>
                                        <div className='col-md-6'>
                                            <p className="col-form-label">{`${data.user_name} ${data.user_lastname}`}</p>
                                        </div>
                                    </div>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <div className='row'>
                                        <div className='col-md-6'>
                                            <p className="col-form-label"><strong>เรื่อง:</strong></p>
                                        </div>
                                        <div className='col-md-6'>
                                            <p className="col-form-label">เก็บค่าบริการสาธารณะ</p>
                                        </div>
                                    </div>
                                    <div className='row'>
                                        <div className='col-md-6'>
                                            <p className="col-form-label"><strong>ชื่อเจ้าของบ้าน:</strong></p>
                                        </div>
                                        <div className='col-md-6'>
                                            <p className="col-form-label">{`${showData.user_name} ${showData.user_lastname}`}</p>
                                        </div>
                                    </div>
                                    <div className='row'>
                                        <div className='col-md-6'>
                                            <p className="col-form-label"><strong>เบอร์โทรศัพท์:</strong></p>
                                        </div>
                                        <div className='col-md-6'>
                                            <p className="col-form-label">{showData.user_phone}</p>
                                        </div>
                                    </div>
                                </ListGroup.Item>
                            </ListGroup>
                        ))}

                    </div>
                </div>
                <div>
                    <Table size="sm">
                        <thead>
                            <tr>
                                <th>เลขที่แจ้งชำระ</th>
                                <th>รายละเอียด</th>
                                <th>อัตราเก็บค่าส่วนกลาง (ตารางวา)</th>
                                <th>จำนวนเดือนที่เก็บ</th>
                                <th>พื้นที่ดิน (ตารางวา)</th>
                                <th>ยอดรวม</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>{showData.ncf_id}</td>
                                <td>เก็บค่าบริการสาธารณะ</td>
                                <td>{showData.common_rate}</td>
                                <td>{showData.ncf_common_month}</td>
                                <td>{parseFloat(showData.hLand_space).toLocaleString()}</td>
                                <td>{parseFloat(showData.ncf_amount).toLocaleString()}</td>
                            </tr>
                        </tbody>
                    </Table>
                    <div className='row mt-4 mb-3'>
                        <div className='col-md-8' />
                        <div className='col-md-4'>
                            <div className='row'>
                                <div className='col-md-4'>
                                    <p className="col-form-label"><strong>พื้นที่ดิน:</strong></p>
                                </div>
                                <div className='col-md-4 text-end'>
                                    <p className="col-form-label">{parseFloat(showData.hLand_space).toLocaleString()}</p>
                                </div>
                                <div className='col-md-4 text-end'>
                                    <p className="col-form-label">ตารางวา</p>
                                </div>
                            </div>
                            <div className='row'>
                                <div className='col-md-6'>
                                    <p className="col-form-label"><strong>คิดในอัตราตารางวาละ:</strong></p>
                                </div>
                                <div className='col-md-4 text-end'>
                                    <p className="col-form-label">{parseFloat(showData.common_rate).toLocaleString()}</p>
                                </div>
                                <div className='col-md-2 text-end'>
                                    <p className="col-form-label">บาท</p>
                                </div>
                            </div>
                            <div className='row'>
                                <div className='col-md-6'>
                                    <p className="col-form-label"><strong>จำนวนเดือนที่เก็บ:</strong></p>
                                </div>
                                <div className='col-md-4 text-end'>
                                    <p className="col-form-label">{showData.ncf_common_month}</p>
                                </div>
                                <div className='col-md-2 text-end'>
                                    <p className="col-form-label">เดือน</p>
                                </div>
                            </div>
                            <div className='row mt-4'>
                                <div className='col-md-6'>
                                    <p className="col-form-label"><strong>รวมเป็นเงิน:</strong></p>
                                </div>
                                <div className='col-md-4 text-end'>
                                    <h3>{parseFloat(showData.ncf_amount).toLocaleString()}</h3>
                                </div>
                                <div className='col-md-2 text-end'>
                                    <p className="col-form-label"><strong>บาท</strong></p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <Modal.Footer>

                    {!showRcf.some((rcf) => rcf.ncf_id === showData.ncf_id) ? (
                        <Button variant="success" onClick={() => handleAddSlipShow(showData.ncf_id, showData.common_receive)}>
                            ชำระเงินออนไลน์
                        </Button>
                    ) : showRcf.some((rcf) => rcf.ncf_id === showData.ncf_id && !rcf.rcf_slip) ? (
                        <a class="btn btn-primary" href={`/document/receipt/commonFee/${showData.ncf_id}`} target="_blank" style={{ cursor: 'pointer' }}>
                            ดาวน์โหลดใบเสร็จรับเงิน
                        </a>
                    ) : showRcf.some((rcf) => rcf.ncf_id === showData.ncf_id && rcf.rcf_slip) && (
                        <>
                            <a class="btn btn-primary" href={`/document/receipt/commonFee/${showData.ncf_id}`} target="_blank" style={{ cursor: 'pointer' }}>
                                ดาวน์โหลดใบเสร็จรับเงิน
                            </a>
                            <Button variant="success" onClick={() => handleChangedSlipShow(showRcf.find((rcf) => rcf.ncf_id === showData.ncf_id).rcf_id)}>
                                ดูสลิปที่ชำระ
                            </Button>
                        </>
                    )}

                </Modal.Footer>
            </Modal.Body>
        </Modal>
    );
}