import React, { useState, useEffect } from 'react';
import {
    Modal,
    ListGroup,
    Table,
    Button,
    Image,
    Card,
    ProgressBar
} from 'react-bootstrap';
import BookingCard from '../Modals/bookingDetailCard'
import ContractedDetailCard from '../Modals/contractedDetailCard'
import TransferDetailCard from '../Modals/transferDetailCard'

export default function ProgressBarDetail({ show, handleClose, id, selectedItemData }) {
    // console.log(selectedItemData)
    const [showData, setShowData] = useState({});
    const [step, setStep] = useState(0);

    useEffect(() => {
        if (selectedItemData && selectedItemData.h_status) {
            if (selectedItemData.h_status === 2 && selectedItemData.b_status === 1) {
                setStep(1);
            } else if (selectedItemData.h_status === 3 && selectedItemData.con_status === 1) {
                setStep(2);
            } else if (selectedItemData.h_status === 4 && selectedItemData.trans_status === 1) {
                setStep(3);
            } else if (selectedItemData.h_status === 5 && selectedItemData.trans_status === 2) {
                setStep(4);
            }
            else {
                setStep(4); // เพิ่มเงื่อนไขสำหรับ h_status เป็น 0 หรืออื่น ๆ ที่ไม่ได้ระบุไว้ในเงื่อนไขด้านบน
            }
        }
    }, [selectedItemData]);

    console.log(id)
    console.log(selectedItemData)
    return (
        <Modal show={show} onHide={handleClose} size="xl">
            <Modal.Header closeButton />
            <Modal.Body>
                {selectedItemData && (
                    <div className="m-4">
                        <div className='row mb-3'>
                            <div className='col-md-12 mb-5'>
                                {step === 1 ? (
                                    selectedItemData.h_status === 2 && selectedItemData.b_status === 1 && (
                                        <ProgressBar animated variant="success" now={3} />
                                    )
                                ) : step === 2 ? (
                                    selectedItemData.h_status === 3 && selectedItemData.con_status === 1 && (
                                        <ProgressBar animated variant="success" now={32} />
                                    )
                                ) : step === 3 ? (
                                    selectedItemData.h_status === 4 && selectedItemData.trans_status === 1 && (
                                        <ProgressBar animated variant="success" now={68} />
                                    )
                                ) : step === 4 && (
                                    selectedItemData.h_status === 5 && selectedItemData.trans_status === 2 ? (
                                        <ProgressBar animated variant="success" now={100} />
                                    ) : (
                                        <ProgressBar animated variant="danger" now={100} />
                                    )
                                )}
                                {selectedItemData.h_status !== 1 && selectedItemData.b_status !== 0 && selectedItemData.con_status !== 0 && selectedItemData.trans_status !== 0 ? (
                                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                        <span >{selectedItemData.h_status >= 2 ? "จองสำเร็จ" : "กำลังดำเนินการจอง"}</span>
                                        <span>{selectedItemData.h_status >= 3 ? "ทำสัญญาสำเร็จ" : "กำลังดำเนินการทำสัญญา"}</span>
                                        <span>{selectedItemData.h_status >= 4 ? "โอนกรรมสิทธิ์สำเร็จ" : "กำลังดำเนินการโอนกรรมสิทธิ์"}</span>
                                        <span>{selectedItemData.h_status <= 5 && "ซื้อสำเร็จ"}</span>
                                        {/* <span>{step === 4 ? "ซื้อสำเร็จ" : "ยกเลิก"}</span> */}
                                    </div>
                                ) : (
                                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                        <span >{selectedItemData.b_status === 0 ? "จอง" : "จองสำเร็จ"}</span>
                                        <span>{selectedItemData.con_status === 0 ? "ทำสัญญา" : selectedItemData.con_status !== null ? "ทำสัญญาสำเร็จ" : null}</span>
                                        <span>{selectedItemData.trans_status === 0 ? "โอนกรรมสิทธิ์" : null}</span>
                                        <span>{selectedItemData.b_status === 0 ? "ยกเลิก" : selectedItemData.con_status === 0 ? "ยกเลิก" : selectedItemData.trans_status === 0 && "ยกเลิก"}</span>
                                        {/* <span>{step === 4 ? "ซื้อสำเร็จ" : "ยกเลิก"}</span> */}
                                    </div>
                                )}

                            </div>
                            {selectedItemData.b_status === 0 && (
                                <BookingCard showData={selectedItemData} />
                            )}
                            {selectedItemData.con_status === 0 && (
                                <ContractedDetailCard showData={selectedItemData} />
                            )}
                            {selectedItemData.trans_status === 0 && (
                                <TransferDetailCard showData={selectedItemData} />
                            )}
                            {selectedItemData.b_status === 1 && (
                                <BookingCard showData={selectedItemData} />
                            )}
                            {selectedItemData.con_status === 1 && (
                                <ContractedDetailCard showData={selectedItemData} />
                            )}
                            {selectedItemData.trans_status === 1 && (
                                <TransferDetailCard showData={selectedItemData} />
                            )}
                            {selectedItemData.trans_status === 2 && (
                                <TransferDetailCard showData={selectedItemData} />
                            )}
                        </div>
                    </div>
                )}
            </Modal.Body>
        </Modal>
    );
}
