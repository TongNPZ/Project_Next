import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import Select from 'react-select';
import { API_EXPENSES_COMMON_FEE } from '../../../../../../api';
import GetRequest from '@/app/ConfigAPI';
import {
    ConfirmUpdate, ConfirmCancel, Success, ConfirmRestore,
} from '@/app/componnent/SweetAlertComponent/ResponseMessage';
import { DateInputFormat } from '@/app/Format';

export default function ModalEdit({ show, handleClose, id }) {
    const [defaultValues, setDefaultValues] = useState({});
    const [exList, setExList] = useState('');
    const [exAmount, setExAmount] = useState('');
    const [recordDate, setRecordDate] = useState('');
    const [options, setOptions] = useState([
        { value: 'ค่าไฟถนน', label: 'ค่าไฟถนน' },
        { value: 'ค่าพนักงานรักษาความปลอดภัย', label: 'ค่าพนักงานรักษาความปลอดภัย' },
        { value: 'ค่าเก็บขยะ', label: 'ค่าเก็บขยะ' },
        { value: 'ค่าคนสวน', label: 'ค่าคนสวน' }
    ]);

    const ResetData = () => {
        setExList(defaultValues.ex_list);
        setExAmount(defaultValues.ex_amount);
        setRecordDate(defaultValues.ex_date);
    };

    const handleCloseResetData = () => {
        ResetData();
        handleClose();
    };

    const fetchExpensesRecord = async () => {
        try {
            const result = await GetRequest(`${API_EXPENSES_COMMON_FEE}/${id}`, 'GET', null);
            setDefaultValues(result);
            setExList(result.ex_list);
            setExAmount(result.ex_amount);
            setRecordDate(result.ex_date);
        } catch (error) {
            console.log('error', error);
        }
    };

    useEffect(() => {
        if (show) {
            fetchExpensesRecord();
        }
    }, [show, id]);

    const handleCancel = () => {
        ConfirmCancel().then((result) => {
            if (result.isConfirmed) {
                handleCloseResetData();
            }
        });
    };

    const handleRestore = (event) => {
        event.preventDefault();
        ConfirmRestore().then((result) => {
            if (result.isConfirmed) {
                ResetData();
            }
        });
    };

    useEffect(() => {
        setRecordDate(DateInputFormat(recordDate));
    }, [recordDate]);

    const handleSubmit = (event) => {
        event.preventDefault();
        ConfirmUpdate().then((result) => {
            if (result.isConfirmed) {
                const editData = async () => {
                    try {
                        const data = {
                            id: id,
                            exList: exList,
                            exAmount: exAmount,
                            exDate: recordDate
                        };

                        const response = await GetRequest(API_EXPENSES_COMMON_FEE, 'PATCH', data);
                        if (response.message === 'Update Successfully!') {
                            Success("แก้ไขข้อมูลสำเร็จ!").then(() => {
                                handleClose();
                            });
                        }
                    } catch (error) {
                        console.log('error', error);
                    }
                };
                editData();
            }
        });
    };

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
                <Modal.Title>แก้ไขข้อมูลค่าใช้จ่ายส่วนกลาง</Modal.Title>
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
                                    value={recordDate}
                                    onChange={(e) => setRecordDate(e.target.value)}
                                    required
                                />
                            </div>
                        </div>
                    </div>
                    <Modal.Footer>
                        <Button variant="warning" type='submit'>
                            แก้ไขข้อมูล
                        </Button>
                        <Button variant="secondary" onClick={handleRestore}>
                            คืนค่า
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal.Body>
        </Modal>
    );
}
