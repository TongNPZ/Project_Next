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

    // console.log(id)
    console.log(selectedItemData)
    return (

        <Modal show={show} onHide={handleClose} size="xl">
            <Modal.Header closeButton />
            <Modal.Body>
                {selectedItemData && (
                    <div className="m-4">
                        <div className='row mb-3'>
                            <div className='col-md-12 mb-5'>
                                {selectedItemData.h_status !== 1 && selectedItemData.b_status !== 0 && selectedItemData.con_status !== 0 && selectedItemData.trans_status !== 0 ? (
                                    <div className='col-md-12 mb-4 text-center'>
                                        <div className='row'>
                                            <div className='col-md-3'>
                                                <span>{selectedItemData.h_status >= 2 ? <Image src={`/icon/checkboard.png`} alt="icon" style={{ width: '70px', height: '70px' }} /> : <Image src={`/icon/clipboard.png`} alt="icon" style={{ width: '70px', height: '70px' }} />}</span>
                                            </div>
                                            <div className='col-md-3'>
                                                <span>{selectedItemData.h_status >= 3 ? <Image src={`/icon/checkboard.png`} alt="icon" style={{ width: '70px', height: '70px' }} /> : <Image src={`/icon/contract.png`} alt="icon" style={{ width: '70px', height: '70px' }} />}</span>
                                            </div>
                                            <div className='col-md-3'>
                                                <span>{selectedItemData.h_status >= 4 ? <Image src={`/icon/transfered.png`} alt="icon" style={{ width: '70px', height: '70px' }} /> : <Image src={`/icon/transfer.png`} alt="icon" style={{ width: '70px', height: '70px' }} />}</span>
                                            </div>
                                            <div className='col-md-3 '>
                                                <span>{selectedItemData.h_status >= 5 ? <Image src={`/icon/already_bought.png`} alt="icon" style={{ width: '70px', height: '70px' }} /> : <Image src={`/icon/buy_home.png`} alt="icon" style={{ width: '70px', height: '70px' }} />}</span>
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    <div className='col-md-12 mb-4 text-center'>
                                        <div className='row'>
                                            <div className='col-md-3'>
                                                <span>{selectedItemData.b_status === 0 ? <Image src={`/icon/clipboardC.png`} alt="icon" style={{ width: '70px', height: '70px' }} /> : <Image src={`/icon/checkboardC.png`} alt="icon" style={{ width: '70px', height: '70px' }} />}</span>
                                            </div>
                                            <div className='col-md-3'>
                                                <span>{selectedItemData.con_status === 0 ? <Image src={`/icon/clipboardC.png`} alt="icon" style={{ width: '70px', height: '70px' }} /> : selectedItemData.con_status !== null ? <Image src={`/icon/checkboardC.png`} alt="icon" style={{ width: '70px', height: '70px' }} /> : null}</span>
                                            </div>
                                            <div className='col-md-3'>
                                                <span>{selectedItemData.trans_status === 0 ? <Image src={`/icon/transferC.png`} alt="icon" style={{ width: '70px', height: '70px' }} /> : selectedItemData.trans_status !== null ? <Image src={`/icon/transferedC.png`} alt="icon" style={{ width: '70px', height: '70px' }} /> : null}</span>
                                            </div>
                                            <div className='col-md-3 '>
                                                <span>{(selectedItemData.b_status === 0 || selectedItemData.con_status === 0 || selectedItemData.trans_status === 0) && <Image src={`/icon/cancel.png`} alt="icon" style={{ width: '70px', height: '70px' }} />}</span>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {step === 1 ? (
                                    selectedItemData.h_status === 2 && selectedItemData.b_status === 1 && (
                                        <ProgressBar animated variant="success" now={12} style={{ backgroundColor: '#e0e0e0' }} />
                                    )
                                ) : step === 2 ? (
                                    selectedItemData.h_status === 3 && selectedItemData.con_status === 1 && (
                                        <ProgressBar animated variant="success" now={38} style={{ backgroundColor: '#e0e0e0' }} />
                                    )
                                ) : step === 3 ? (
                                    selectedItemData.h_status === 4 && selectedItemData.trans_status === 1 && (
                                        <ProgressBar animated variant="success" now={64} style={{ backgroundColor: '#e0e0e0' }} />
                                    )
                                ) : step === 4 && (
                                    selectedItemData.h_status === 5 && selectedItemData.trans_status === 2 ? (
                                        <ProgressBar animated variant="success" now={100} style={{ backgroundColor: '#e0e0e0' }} />
                                    ) : (
                                        <ProgressBar striped variant="danger" now={100} style={{ backgroundColor: '#e0e0e0' }} />
                                    )
                                )}
                                {selectedItemData.h_status !== 1 && selectedItemData.b_status !== 0 && selectedItemData.con_status !== 0 && selectedItemData.trans_status !== 0 ? (
                                    <div className='col-md-12 mt-4 text-center'>
                                        <div className='row'>
                                            <div className='col-md-3'>
                                                <span>{selectedItemData.b_status === 1 ? "กำลังดำเนินการจอง" : "จองสำเร็จ"}</span>
                                            </div>
                                            <div className='col-md-3'>
                                                <span >{selectedItemData.con_status === null ? 'ทำสัญญาสำ' : selectedItemData.con_status === 1 ? "กำลังดำเนินการทำสัญญา" : "ทำสัญญาสำเร็จ"}</span>
                                            </div>
                                            <div className='col-md-3'>
                                                <span >{selectedItemData.trans_status === 1 ? "กำลังดำเนินการโอนกรรมสิทธิ์" : "โอนกรรมสิทธิ์สำเร็จ"}</span>
                                            </div>
                                            <div className='col-md-3 '>
                                                <span>{selectedItemData.trans_status <= 2 && "ซื้อสำเร็จ"}</span>
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    <div className='col-md-12 mt-4 text-center'>
                                        <div className='row'>
                                            <div className='col-md-3'>
                                                <span>{selectedItemData.b_status === 0 ? "จอง" : "จองสำเร็จ"}</span>
                                            </div>
                                            <div className='col-md-3'>
                                                <span>{selectedItemData.con_status === 0 ? "ทำสัญญา" : selectedItemData.con_status !== null ? "ทำสัญญาสำเร็จ" : null}</span>
                                            </div>
                                            <div className='col-md-3'>
                                                <span>{selectedItemData.trans_status === 0 ? "โอนกรรมสิทธิ์" : null}</span>
                                            </div>
                                            <div className='col-md-3 '>
                                                <div className='col-md-3 '>
                                                    <span>{(selectedItemData.b_status === 0 || selectedItemData.con_status === 0 || selectedItemData.trans_status === 0) && "ยกเลิก"}</span>
                                                </div>
                                            </div>
                                        </div>
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
                            {selectedItemData.h_status === 2 && (
                                <BookingCard showData={selectedItemData} />
                            )}
                            {selectedItemData.h_status === 3 && (
                                <ContractedDetailCard showData={selectedItemData} />
                            )}
                            {selectedItemData.h_status === 4 && (
                                <TransferDetailCard showData={selectedItemData} />
                            )}
                            {selectedItemData.h_status === 5 && (

                                <TransferDetailCard showData={selectedItemData} />

                            )}
                        </div>
                    </div>
                )}
            </Modal.Body>
        </Modal>
    );
}
