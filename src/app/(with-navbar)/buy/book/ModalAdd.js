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
} from 'react-bootstrap';

export default function ModalBookAdd({ show, handleClose, hId, houseNo }) {

    // useState //

    // +++ show input +++ //
    const [showInputUserId, setShowInputUserId] = useState(false);
    // +++ //

    // +++ select user id +++ //
    const [selectUserId, setSelectShowUserId] = useState('');
    // +++ //

    // +++ user +++ //
    const [userId, setUserId] = useState('');
    const [userName, setUserName] = useState('');
    const [userLastname, setUserLastname] = useState('');
    const [userAddress, setUserAddress] = useState('');
    const [userAge, setUserAge] = useState('');
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

    // --- //


    // *** function *** //

    // reset data
    const ResetData = () => {

        // select user id //
        setSelectShowUserId('');

        // user //
        setUserId('');
        setUserName('');
        setUserLastname('');
        setUserAddress('');
        setUserAge('');
        setNationality('');
        setUserPhone('');
        setUserEmail('');
        setUserPassword('');

        // book //
        setBAmount(0);
        setBNote('');

        // show input user id //
        setShowInputUserId(false);
    }

    // handle close reset data
    const router = useRouter();

    const handleCloseResetData = async () => {
        ResetData();
        handleClose();
    }

    // *** //

    // fetch //

    // +++ show user +++ //
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
    // +++ //

    // +++ show user by id +++ //
    const [showUserById, setShowUserById] = useState({});

    useEffect(() => {
        const fecthUserById = async () => {
            try {
                const result = await GetRequest(`${GET_API_DATA_USER}/${selectUserId}`, 'GET', null);
                setShowUserById(result);
            } catch (error) {
                console.log('error', error);
            }
        }

        fecthUserById();
    }, [selectUserId]);
    // +++ //

    // --- //

    // submit //
    const handleSubmit = (event) => {
        event.preventDefault();

        if (!showInputUserId) {
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
                                bNote: bNote === '' ? '-' : bNote,
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
                                bNote: bNote === '' ? '-' : bNote,
                                hId: parseInt(hId),
                                userId: selectUserId,
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
                <Modal.Title>กรอกข้อมูลจอง</Modal.Title>
            </Modal.Header>
            <Modal.Body>

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

                    {/* show input user id */}
                    {!showInputUserId ? (
                        <div className="mb-3">
                            <label className="col-form-label">เลขบัตรประจำตัวประชาชน</label>
                            <div className="mt-1">
                                <Form.Control
                                    type="text"
                                    placeholder="เลขบัตรประจำตัวประชาชน"
                                    value={userId}
                                    onChange={(e) => setUserId(e.target.value)}
                                    maxLength={13}
                                    required
                                />
                            </div>
                        </div>
                    ) : (
                        <div className='mb-3'>
                            <label className="col-form-label">เลขบัตรประจำตัวประชาชน</label>
                            <Form.Select value={selectUserId} onChange={(e) => setSelectShowUserId(e.target.value)}>
                                <option value={''}>กรุณาเลือกเลขบัตรประจำตัวประชาชน</option>

                                {showUser.map((data) => (
                                    data.role !== 1 && data.role !== 0 ? (
                                        <option key={data.user_id} value={data.user_id}>{data.user_id}</option>
                                    ) : null
                                ))}

                            </Form.Select>
                        </div>
                    )}
                    {/* --- */}

                    <div className='mb-3'>
                        <Form.Check
                            inline
                            type='switch'
                            label="ผู้ใช้เก่า"
                            checked={showInputUserId}
                            onChange={() => {
                                if (showInputUserId) {
                                    setShowInputUserId(false);
                                    setSelectShowUserId('');
                                } else {
                                    setShowInputUserId(true);
                                }
                            }}
                        />
                    </div>

                    {!showInputUserId ? (
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
                    ) : (
                        <div className="row mb-3">
                            <div className='col-md-6'>
                                <label className="col-form-label">ชื่อจริง</label>
                                <div className="mt-1">
                                    <Form.Control
                                        placeholder="ชื่อจริง"
                                        value={showUserById.user_name || ''}
                                        disabled
                                    />
                                </div>
                            </div>
                            <div className='col-md-6'>
                                <label className="col-form-label">นามสกุล</label>
                                <div className="mt-1">
                                    <Form.Control
                                        placeholder="นามสกุล"
                                        value={showUserById.user_lastname || ''}
                                        disabled
                                    />
                                </div>
                            </div>
                        </div>
                    )}

                    {!showInputUserId ? (
                        <div className="mb-3">
                            <label className="col-form-label">ที่อยู่ตามทะเบียนบ้าน</label>
                            <div className="mt-1">
                                <Form.Control
                                    as='textarea'
                                    placeholder="ที่อยู่ตามทะเบียนบ้าน"
                                    value={userAddress}
                                    onChange={(e) => setUserAddress(e.target.value)}
                                    required
                                />
                            </div>
                        </div>
                    ) : (
                        <div className="mb-3">
                            <label className="col-form-label">ที่อยู่ตามทะเบียนบ้าน</label>
                            <div className="mt-1">
                                <Form.Control
                                    as='textarea'
                                    placeholder="ที่อยู่ตามทะเบียนบ้าน"
                                    value={showUserById.user_address || ''}
                                    disabled
                                />
                            </div>
                        </div>
                    )}

                    {!showInputUserId ? (
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
                    ) : (
                        <div className="row mb-3">
                            <div className='col-md-6'>
                                <label className="col-form-label">อายุ</label>
                                <div className="mt-1">
                                    <Form.Control
                                        placeholder="อายุ"
                                        value={showUserById.user_age || ''}
                                        disabled
                                    />
                                </div>
                            </div>
                            <div className='col-md-6'>
                                <label className="col-form-label">สัญชาติ</label>
                                <div className="mt-1">
                                    <Form.Control
                                        placeholder="สัญชาติ"
                                        value={showUserById.nationality || ''}
                                        disabled
                                    />
                                </div>
                            </div>
                        </div>
                    )}

                    {!showInputUserId ? (
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
                    ) : (
                        <div className="mb-3">
                            <label className="col-form-label">เบอร์โทรศัพท์</label>
                            <div className="mt-1">
                                <Form.Control
                                    placeholder="เบอร์โทรศัพท์"
                                    value={showUserById.user_phone || ''}
                                    disabled
                                />
                            </div>
                        </div>
                    )}

                    {!showInputUserId ? (
                        <>
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
                        </>
                    ) : null}

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
                                placeholder="หมายเหตุ (ถ้าไม่ต้องการกรอกหมายเหตุให้เว้นช่องกรอกนี้ไว้)"
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

            </Modal.Body>
        </Modal>
    );
}