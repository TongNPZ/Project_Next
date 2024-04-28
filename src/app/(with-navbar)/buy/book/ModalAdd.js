import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import GetRequest from '@/app/ConfigAPI';
import {
    API_BOOK,
    GET_API_DATA_USER
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
    Nav
} from 'react-bootstrap';

export default function ModalBookAdd({ show, handleClose, hId, houseNo }) {

    // useState //

    // +++ user +++ //
    const [userId, setUserId] = useState('');
    const [userName, setUserName] = useState('');
    const [userLastname, setUserLastname] = useState('');
    const [userAddress, setUserAddress] = useState('');
    const [userAge, setUserAge] = useState(0);
    const [nationality, setNationality] = useState('');
    const [userPhone, setUserPhone] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const [userPassword, setUserPassword] = useState('');
    const role = 2;
    // +++ //

    // +++ book +++ //
    const [bAmount, setBAmount] = useState(0);
    const [bNote, setBNote] = useState('');
    // +++ //

    // +++ event key +++ //
    const [eventKey, setEventKey] = useState("link-1");
    // +++ //

    // --- //


    // *** function *** //

    // reset data
    const ResetData = () => {

        // user //
        setUserId('');
        setUserName('');
        setUserLastname('');
        setUserAddress('');
        setUserAge(0);
        setNationality('');
        setUserPhone('');
        setUserEmail('');
        setUserPassword('');

        // book //
        setBAmount(0);
        setBNote('');
    }

    // handle close reset data
    const router = useRouter();

    const handleCloseResetData = async () => {
        ResetData();
        handleClose();
    }

    // *** //

    // fetch user //
    const [showUser, setShowUser] = useState([]);

    const fecthUser = async () => {
        try {
            const result = await GetRequest(GET_API_DATA_USER, 'GET', null);
            setShowUser(result.data);
        } catch (error) {
            console.log('error', error);
        }
    }

    useEffect(() => {
        fecthUser();
    }, [showUser]);
    // --- //

    // submit //
    const handleSubmit = (event) => {
        event.preventDefault();

        if (eventKey === 'link-1') {
            ConfirmInsert().then((result) => {
                if (result.isConfirmed) {
                    const addData = async () => {
                        try {
                            const userRaw = {
                                userId: userId,
                                userName: userName,
                                userLastname: userLastname,
                                userAddress: userAddress,
                                userAge: parseInt(userAge),
                                nationality: nationality,
                                userPhone: userPhone,
                                userEmail: userEmail,
                                userPassword: userPassword,
                                role: parseInt(role)
                            }

                            const bookRaw = {
                                bAmount: parseFloat(bAmount),
                                bNote: bNote,
                                hId: parseInt(hId),
                                userId: userId,
                            }

                            const userResponse = await GetRequest(GET_API_DATA_USER, 'POST', userRaw)

                            if (userResponse.message === 'Insert Successfully!') {

                                const bookResponse = await GetRequest(API_BOOK, 'POST', bookRaw)

                                if (bookResponse.message === 'Insert Successfully!') {
                                    Success("เพิ่มข้อมูลสำเร็จ!")
                                        .then(() => {
                                            handleCloseResetData();
                                        })
                                        .then(() => {
                                            router.push('/buy/book');
                                        })
                                }
                            }
                        } catch (error) {
                            console.log('error', error);
                        }
                    }

                    addData()
                }
            });
        } else {
            ConfirmInsert().then((result) => {
                if (result.isConfirmed) {
                    const addData = async () => {
                        try {
                            const raw = {
                                bAmount: parseFloat(bAmount),
                                bNote: bNote,
                                hId: parseInt(hId),
                                userId: userId,
                            }

                            const response = await GetRequest(API_BOOK, 'POST', raw)

                            if (response.message === 'Insert Successfully!') {
                                Success("เพิ่มข้อมูลสำเร็จ!")
                                    .then(() => {
                                        handleCloseResetData();
                                    })
                                    .then(() => {
                                        router.push('/buy/book');
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
                <Nav variant="pills" defaultActiveKey="link-1">
                    <Nav.Item>
                        <Nav.Link eventKey="link-1" active={eventKey === "link-1"} onClick={() => setEventKey("link-1")}>ผู้ซื้อใหม่</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link eventKey="link-2" active={eventKey === "link-2"} onClick={() => setEventKey("link-2")}>ผู้ซื้อเก่า</Nav.Link>
                    </Nav.Item>
                </Nav>
            </Modal.Header>
            <Modal.Body>

                {/* link-1 */}
                {eventKey === 'link-1' && (
                    <Form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label className="col-form-label">บ้านเลขที่</label>
                            <div className="mt-1">
                                <Form.Control
                                    type="text"
                                    defaultValue={houseNo}
                                    disabled
                                />
                            </div>
                        </div>
                        <div className="mb-3">
                            <label className="col-form-label">รหัสบัตรประชาชน</label>
                            <div className="mt-1">
                                <Form.Control
                                    type="text"
                                    placeholder="รหัสบัตรประชาชน"
                                    value={userId}
                                    onChange={(e) => setUserId(e.target.value)}
                                    maxLength={13}
                                    required
                                />
                            </div>
                        </div>
                        <div className="row mb-3">
                            <div className='col-md-6'>
                                <label className="col-form-label">ชื่อจริง</label>
                                <div className="mt-1">
                                    <Form.Control
                                        type="text"
                                        placeholder="ชื่อจริง"
                                        value={userName}
                                        onChange={(e) => setUserName(e.target.value)}
                                        required
                                    />
                                </div>
                            </div>
                            <div className='col-md-6'>
                                <label className="col-form-label">นามสกุล</label>
                                <div className="mt-1">
                                    <Form.Control
                                        type="text"
                                        placeholder="นามสกุล"
                                        value={userLastname}
                                        onChange={(e) => setUserLastname(e.target.value)}
                                        required
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="mb-3">
                            <label className="col-form-label">ที่อยู่</label>
                            <div className="mt-1">
                                <Form.Control
                                    as='textarea'
                                    placeholder="ที่อยู่"
                                    value={userAddress}
                                    onChange={(e) => setUserAddress(e.target.value)}
                                    required
                                />
                            </div>
                        </div>
                        <div className="row mb-3">
                            <div className='col-md-6'>
                                <label className="col-form-label">อายุ</label>
                                <div className="mt-1">
                                    <Form.Control
                                        type="text"
                                        placeholder="อายุ"
                                        value={userAge}
                                        onChange={(e) => setUserAge(e.target.value)}
                                        required
                                    />
                                </div>
                            </div>
                            <div className='col-md-6'>
                                <label className="col-form-label">สัญชาติ</label>
                                <div className="mt-1">
                                    <Form.Control
                                        type="text"
                                        placeholder="สัญชาติ"
                                        value={nationality}
                                        onChange={(e) => setNationality(e.target.value)}
                                        required
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="mb-3">
                            <label className="col-form-label">เบอร์โทรศัพท์</label>
                            <div className="mt-1">
                                <Form.Control
                                    type="text"
                                    placeholder="เบอร์โทรศัพท์"
                                    value={userPhone}
                                    onChange={(e) => setUserPhone(e.target.value)}
                                    maxLength={10}
                                    required
                                />
                            </div>
                        </div>
                        <div className="mb-3">
                            <label className="col-form-label">อีเมล</label>
                            <div className="mt-1">
                                <Form.Control
                                    type='text'
                                    placeholder="อีเมล"
                                    value={userEmail}
                                    onChange={(e) => setUserEmail(e.target.value)}
                                    required
                                />
                            </div>
                        </div>
                        <div className="mb-3">
                            <label className="col-form-label">รหัสผ่าน</label>
                            <div className="mt-1">
                                <Form.Control
                                    type='password'
                                    placeholder="รหัสผ่าน"
                                    value={userPassword}
                                    onChange={(e) => setUserPassword(e.target.value)}
                                    required
                                />
                            </div>
                        </div>
                        <div className="mb-3">
                            <label className="col-form-label">จำนวนเงินจอง</label>
                            <div className="mt-1">
                                <Form.Control
                                    type='number'
                                    placeholder="จำนวนเงินจอง"
                                    value={bAmount}
                                    onChange={(e) => setBAmount(e.target.value)}
                                    required
                                />
                            </div>
                        </div>
                        <div className="mb-3">
                            <label className="col-form-label">หมายเหตุ</label>
                            <div className="mt-1">
                                <Form.Control
                                    as='textarea'
                                    placeholder="หมายเหตุ (ถ้าไม่มีหมายเหตุให้ใส่ - ช่องกรอกนี้)"
                                    value={bNote}
                                    onChange={(e) => setBNote(e.target.value)}
                                />
                            </div>
                        </div>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleRestore}>
                                คืนค่า
                            </Button>
                            <Button variant="success" type='submit'>
                                เพื่มข้อมูล
                            </Button>
                        </Modal.Footer>
                    </Form>
                )}
                {/* --- */}

                {/* link-2 */}
                {eventKey === 'link-2' && (
                    <Form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label className="col-form-label">บ้านเลขที่</label>
                            <div className="mt-1">
                                <Form.Control
                                    type="text"
                                    defaultValue={houseNo}
                                    disabled
                                />
                            </div>
                        </div>
                        <div className='mb-3'>
                            <label className="col-form-label">ชื่อผู้ซื้อบ้าน</label>

                            <Form.Select value={userId} onChange={(e) => setUserId(e.target.value)}>
                                <option>กรุณาเลือกผู้ซื้อบ้าน</option>

                                {showUser.map((data) => (
                                    data.role === 2 || data.role === 3 ? (
                                        <option key={data.user_id} value={data.user_id}>{data.user_name} {data.user_lastname}</option>
                                    ) : null
                                ))}

                            </Form.Select>


                        </div>
                        <div className="mb-3">
                            <label className="col-form-label">จำนวนเงินจอง</label>
                            <div className="mt-1">
                                <Form.Control
                                    type='number'
                                    placeholder="จำนวนเงินจอง"
                                    value={bAmount}
                                    onChange={(e) => setBAmount(e.target.value)}
                                    required
                                />
                            </div>
                        </div>
                        <div className="mb-3">
                            <label className="col-form-label">หมายเหตุ</label>
                            <div className="mt-1">
                                <Form.Control
                                    as='textarea'
                                    placeholder="หมายเหตุ (ถ้าไม่มีหมายเหตุให้ใส่ - ช่องกรอกนี้)"
                                    value={bNote}
                                    onChange={(e) => setBNote(e.target.value)}
                                />
                            </div>
                        </div>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleRestore}>
                                คืนค่า
                            </Button>
                            <Button variant="success" type='submit'>
                                เพื่มข้อมูล
                            </Button>
                        </Modal.Footer>
                    </Form>
                )}
                {/* --- */}

            </Modal.Body>
        </Modal>
    );
}