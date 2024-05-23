import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import Select from 'react-select';
import { API_EXPENSES_COMMON_FEE } from '../../../../../../api';
import GetRequest from '@/app/ConfigAPI';
import { ConfirmInsert, ConfirmCancel, Success, ConfirmRestore } from '@/app/componnent/SweetAlertComponent/ResponseMessage';

export default function ModalAdd({ show, handleClose }) {
    const [exList, setExList] = useState('');
    const [exAmount, setExAmount] = useState('');
    const [recordDateTime, setRecordDateTime] = useState('');
    const [options, setOptions] = useState([
        { value: 'ค่าไฟถนน', label: 'ค่าไฟถนน' },
        { value: 'ค่าพนักงานรักษาความปลอดภัย', label: 'ค่าพนักงานรักษาความปลอดภัย' },
        { value: 'ค่าเก็บขยะ', label: 'ค่าเก็บขยะ' },
        { value: 'ค่าคนสวน', label: 'ค่าคนสวน' }
    ]);
    ค่าไฟถนน
    ค่าพนักงานรักษาความปลอดภัย
    ค่าเก็บขยะ
    ค่าคนสวน
    const ResetData = () => {
        setExList('');
        setExAmount('');
        setRecordDateTime('');
    }

    const handleCloseResetData = () => {
        ResetData();
        handleClose();
    }

    const handleCancel = () => {
        ConfirmCancel().then((result) => {
            if (result.isConfirmed) {
                handleCloseResetData();
            }
        });
    }

    const handleRestore = (event) => {
        event.preventDefault();

        ConfirmRestore().then((result) => {
            if (result.isConfirmed) {
                ResetData();
            }
        });
    }

    const handleSubmit = (event) => {
        event.preventDefault();

        ConfirmInsert().then((result) => {
            if (result.isConfirmed) {
                const addData = async () => {
                    try {
                        const data = {
                            exList: exList,
                            exAmount: exAmount,
                            exDate: recordDateTime,
                        }

                        const response = await GetRequest(API_EXPENSES_COMMON_FEE, 'POST', data)

                        if (response.message === 'Insert Successfully!') {
                            Success("เพิ่มข้อมูลสำเร็จ!").then(() => {
                                handleCloseResetData();
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

    const handleExListChange = (selectedOption) => {
        setExList(selectedOption ? selectedOption.value : '');
    };

    const handleCreateOption = (inputValue) => {
        const newOption = { value: inputValue, label: inputValue };
        setOptions([...options, newOption]);
        setExList(inputValue);
    };

    return (
        <Modal show={show} onHide={handleCancel} size='lg'>
            <Modal.Header closeButton>
                <Modal.Title>บันทึกค่าใช้จ่ายส่วนกลาง</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label className="col-form-label">รายการ</label>
                        <div className="mt-1">
                            <Select
                                value={options.find(option => option.value === exList)}
                                onChange={handleExListChange}
                                onCreateOption={handleCreateOption}
                                options={options}
                                isClearable
                                isSearchable
                                placeholder="เลือกรายการหรือพิมพ์เพื่อเพิ่มใหม่"
                                formatCreateLabel={(inputValue) => `สร้าง "${inputValue}"`}
                            />
                        </div>
                    </div>
                    <div className="row mb-3">
                        <div className='col-md-6'>
                            <label className="col-form-label">จำนวนเงิน</label>
                            <div className="mt-1">
                                <Form.Control
                                    type="number"
                                    placeholder="จำนวนเงิน"
                                    value={exAmount}
                                    onChange={(e) => setExAmount(e.target.value)}
                                    maxLength={6}
                                    required
                                />
                            </div>
                        </div>
                        <div className='col-md-6'>
                            <label className="col-form-label">วันที่ชำระ</label>
                            <div className="mt-1">
                                <Form.Control
                                    type="date"
                                    value={recordDateTime}
                                    onChange={(e) => setRecordDateTime(e.target.value)}
                                />
                            </div>
                        </div>
                    </div>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleRestore}>
                            คืนค่า
                        </Button>
                        <Button variant="success" type='submit'>
                            บันทึก
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal.Body>
        </Modal>
    );
}
