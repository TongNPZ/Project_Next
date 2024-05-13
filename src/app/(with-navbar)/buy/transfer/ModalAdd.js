import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { FormatThaiNationalID } from '@/app/Format';
import GetRequest from '@/app/ConfigAPI';
import {
    API_TRANSFER,
    API_CONTRACT
} from '../../../../../api';
import {
    ConfirmInsert,
    ConfirmCancel,
    ConfirmRestore,
    Success
} from '@/app/componnent/SweetAlertComponent/ResponseMessage'
import {
    Modal,
    Button,
    Form,
    ListGroup,
    Table
} from 'react-bootstrap';

export default function ModalTransferAdd({ show, handleClose, id }) {

    // useState //

    // + show input + //
    const [showInput, setShowInput] = useState(false);

    // + transfer + //
    const [bankName, setBankName] = useState('');
    const [bankBranch, setBankBranch] = useState('');
    const [bankNum, setBankNum] = useState('');
    const [bankDate, setBankDate] = useState('');
    const [transNote, setTransNote] = useState('');

    // --- //

    // *** function *** //

    // + reset data + //
    const ResetData = () => {

        // user //
        setBankName('');
        setBankBranch('');
        setBankNum('');
        setBankDate('');
        setTransNote('');

        // show input //
        setShowInput(false);
    }

    // + handle close reset data + //
    const router = useRouter();

    const handleCloseResetData = async () => {
        ResetData();
        handleClose();
    }

    // *** //

    // fetch //

    // +++ show transfer +++ //
    const [showTransfer, setShowTransfer] = useState([]);

    const fecthTransfer = async () => {
        try {
            const result = await GetRequest(API_TRANSFER, 'GET', null);
            setShowTransfer(result.data);
        } catch (error) {
            console.log('error', error);
        }
    }

    useEffect(() => {
        fecthTransfer();
    }, [showTransfer]);
    // +++ //

    // +++ show transfer +++ //
    const [contract, setContract] = useState({});

    const fecthContract = async () => {
        try {
            const result = await GetRequest(`${API_CONTRACT}/${id}`, 'GET', null);
            setContract(result);
        } catch (error) {
            console.log('error', error);
        }
    }

    useEffect(() => {
        fecthContract();
    }, [show, id]);
    // +++ //

    // --- //

    // submit //
    const handleSubmit = (event) => {
        event.preventDefault();

        ConfirmInsert().then((result) => {
            if (result.isConfirmed) {
                const addData = async () => {
                    try {
                        let raw

                        if (!showInput) {
                            raw = {
                                "id": id,
                                "transNote": transNote === '' ? '-' : transNote
                            }
                        } else {
                            raw = {
                                "id": id,
                                "bankName": bankName,
                                "bankBranch": bankBranch,
                                "bankNum": bankNum,
                                "bankDate": bankDate,
                                "transNote": transNote === '' ? '-' : transNote
                            }
                        }

                        const response = await GetRequest(API_TRANSFER, 'POST', raw)

                        if (response.message === 'Insert Successfully!') {
                            Success("เพิ่มข้อมูลสำเร็จ!")
                                .then(() => {
                                    handleCloseResetData();
                                })
                                .then(() => {
                                    router.push('/buy/transfer');
                                })
                        }
                    } catch (error) {
                        console.log('error', error);
                    }
                }

                addData()
            }
        });
    }
    // --- //

    // cancel
    const handleCancel = () => {
        ConfirmCancel().then((result) => {
            if (result.isConfirmed) {
                handleCloseResetData();
            }
        });
    }
    // -- //

    // restore //
    const handleRestore = (event) => {
        event.preventDefault();

        ConfirmRestore().then((result) => {
            if (result.isConfirmed) {
                ResetData();
            }
        });
    }
    // --- //

    return (
        <Modal show={show} onHide={handleCancel} size='lg'>
            <Modal.Header closeButton>
                <Modal.Title>กรอกข้อมูลโอนกรรมสิทธิ์</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <div className='mb-3'>
                                <div className='row'>
                                    <div className='col-md-4'>
                                        <p className="col-form-label"><strong>เลขบัตรประจำตัวประชาชน:</strong></p>
                                    </div>
                                    <div className='col-md-8'>
                                        <p className="col-form-label">{FormatThaiNationalID(contract.user_id)}</p>
                                    </div>
                                </div>
                                <div className='row'>
                                    <div className='col-md-4'>
                                        <p className="col-form-label"><strong>ชื่อผู้รับโอนกรรมสิทธิ์:</strong></p>
                                    </div>
                                    <div className='col-md-8'>
                                        <p className="col-form-label">{`${contract.user_name} ${contract.user_lastname}`}</p>
                                    </div>
                                </div>
                            </div>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <div className='mt-3 mb-3'>
                                <Table borderless>
                                    <thead>
                                        <tr>
                                            <th>บ้านเลขที่</th>
                                            <th>โซนบ้าน</th>
                                            <th>แบบบ้าน</th>
                                            <th>ราคาบ้านพร้อมที่ดิน (บาท)</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>{contract.house_no}</td>
                                            <td>{contract.name}</td>
                                            <td>{contract.house_name}</td>
                                            <td>{parseFloat(contract.price).toLocaleString()}</td>
                                        </tr>
                                    </tbody>
                                </Table>
                            </div>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            {/* show input */}
                            {showInput ? (
                                <>
                                    <div className="row mb-3">
                                        <div className='col-md-6'>
                                            <label className="col-form-label">ธนาคาร</label>
                                            <div className="mt-1">
                                                <Form.Control
                                                    type="text"
                                                    placeholder="ชื่อธนาคาร"
                                                    value={bankName}
                                                    onChange={(e) => setBankName(e.target.value)}
                                                    required
                                                />
                                            </div>
                                        </div>
                                        <div className='col-md-6'>
                                            <label className="col-form-label">สาขา</label>
                                            <div className="mt-1">
                                                <Form.Control
                                                    type="text"
                                                    placeholder="สาขา"
                                                    value={bankBranch}
                                                    onChange={(e) => setBankBranch(e.target.value)}
                                                    required
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row mb-3">
                                        <div className='col-md-6'>
                                            <label className="col-form-label">เลขที่</label>
                                            <div className="mt-1">
                                                <Form.Control
                                                    type="number"
                                                    placeholder="เลขที่"
                                                    value={bankNum}
                                                    onChange={(e) => setBankNum(e.target.value)}
                                                    required
                                                />
                                            </div>
                                        </div>
                                        <div className='col-md-6'>
                                            <label className="col-form-label">วันที่</label>
                                            <div className="mt-1">
                                                <Form.Control
                                                    type="date"
                                                    placeholder="วันที่"
                                                    value={bankDate}
                                                    onChange={(e) => setBankDate(e.target.value)}
                                                    required
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </>
                            ) : null}
                            {/* --- */}

                            <div className='mt-3 mb-3'>
                                <Form.Check
                                    inline
                                    type='switch'
                                    label="จ่ายด้วยเช็ค"
                                    checked={showInput}
                                    onChange={() => {
                                        if (showInput) {
                                            setShowInput(false);
                                            setBankName('');
                                            setBankBranch('');
                                            setBankNum('');
                                            setBankDate('');
                                        } else {
                                            setShowInput(true);
                                        }
                                    }}
                                />
                            </div>
                            <div className="mb-3">
                                <label className="col-form-label">หมายเหตุ</label>
                                <div className="mt-1">
                                    <Form.Control
                                        as='textarea'
                                        placeholder="หมายเหตุ (ถ้าไม่ต้องการกรอกหมายเหตุให้เว้นช่องกรอกนี้ไว้)"
                                        value={transNote}
                                        onChange={(e) => setTransNote(e.target.value)}
                                    />
                                </div>
                            </div>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <div className='row mt-3 mb-3'>
                                <div className='col-md-6' />
                                <div className='col-md-6'>
                                    <div className='row'>
                                        <div className='col-md-6'>
                                            <p className="col-form-label">ราคาบ้านพร้อมที่ดิน:</p>
                                        </div>
                                        <div className='col-md-4 text-end'>
                                            <p className="col-form-label">{parseFloat(contract.price).toLocaleString()}</p>
                                        </div>
                                        <div className='col-md-2 text-end'>
                                            <p className="col-form-label">บาท</p>
                                        </div>
                                    </div>
                                    <div className='row'>
                                        <div className='col-md-6'>
                                            <p className="col-form-label">จำนวนเงินจอง:</p>
                                        </div>
                                        <div className='col-md-4 text-end'>
                                            <p className="col-form-label">{`- ${parseFloat(contract.b_amount).toLocaleString()}`}</p>
                                        </div>
                                        <div className='col-md-2 text-end'>
                                            <p className="col-form-label">บาท</p>
                                        </div>
                                    </div>
                                    <div className='row mb-3'>
                                        <div className='col-md-6'>
                                            <p className="col-form-label">จำนวนเงินทำสัญญา:</p>
                                        </div>
                                        <div className='col-md-4 text-end'>
                                            <p className="col-form-label">{`- ${parseFloat(contract.con_amount).toLocaleString()}`}</p>
                                        </div>
                                        <div className='col-md-2 text-end'>
                                            <p className="col-form-label">บาท</p>
                                        </div>
                                    </div>
                                    <div className='row'>
                                        <div className='col-md-6'>
                                            <p className="col-form-label"><strong>จำนวนเงินส่วนที่เหลือ:</strong></p>
                                        </div>
                                        <div className='col-md-4 text-end'>
                                            <h4>{parseFloat((contract.price - contract.b_amount) - contract.con_amount).toLocaleString()}</h4>
                                        </div>
                                        <div className='col-md-2 text-end'>
                                            <p className="col-form-label"><strong>บาท</strong></p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </ListGroup.Item>
                    </ListGroup>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleRestore}>
                            คืนค่า
                        </Button>
                        <Button variant="success" type='submit'>
                            เพื่มข้อมูล
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal.Body>
        </Modal>
    );
}