import React, { useState, useEffect } from 'react';
import {
    Modal,
    OverlayTrigger,
    Tooltip,
} from 'react-bootstrap';
import Link from 'next/link'
import TransferDetailCard from './transferDetailCard'
import BookingCard from './bookingDetailCard'
import ContractedDetailCard from './contractedDetailCard'
import { API_URL } from '../../../../app'
import {
    BsFileEarmarkTextFill,
    BsDownload,
} from "react-icons/bs";
export default function HouseModal({ show, handleClose, id, selectedItemData }) {
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

    const renderTooltipDownload = (props) => (
        <Tooltip {...props}>
            ดาวน์โหลดเอกสารใบเสร็จ
        </Tooltip>
    );

    const renderTooltipContract = (props) => (
        <Tooltip {...props}>
            แสดงเอกสารสัญญา
        </Tooltip>
    );

    const renderTooltipDownloadReceipt = (props) => (
        <Tooltip {...props}>
            ดาวน์โหลดเอกสารใบเสร็จ
        </Tooltip>
    );

    // console.log(id)
    // console.log(selectedItemData)
    console.log(selectedItemData)
    return (
        <Modal show={show} onHide={handleClose} size="xl">
            <Modal.Header closeButton />
            <Modal.Body>
                {selectedItemData && (
                    <div className="m-4">
                        <div className='row mb-3'>

                            <TransferDetailCard className='m-5' showData={selectedItemData} />
                            <ContractedDetailCard className='m-5' showData={selectedItemData} />
                            {selectedItemData.con_status === 2 ? (
                                <>
                                    <div className='col-6 mb-3 text-center'>
                                        <OverlayTrigger overlay={renderTooltipContract}>
                                            <a href={`${API_URL}${selectedItemData.contract}`} target="_blank" style={{ cursor: 'pointer' }}>
                                                <BsFileEarmarkTextFill className='me-2 mb-2 text-primary' style={{ fontSize: '28px' }} />
                                                เอกสารสัญญา
                                            </a>
                                        </OverlayTrigger>
                                    </div>
                                    <div className='col-6 mb-3'>
                                        <OverlayTrigger overlay={renderTooltipDownloadReceipt}>
                                            <a href={`/document/receipt/contract/${selectedItemData.b_id}`} target="_blank" style={{ cursor: 'pointer' }}>
                                                <BsDownload className='me-2 text-primary' style={{ fontSize: '28px' }} />
                                                ใบเสร็จรับเงินทำสัญญาจอง
                                            </a>
                                        </OverlayTrigger>
                                    </div>
                                </>
                            ) : (
                                null
                            )}
                            <BookingCard className='m-5' showData={selectedItemData} />
                            <div className='col-12 mb-3 text-center'>
                                {selectedItemData.b_status === 1 || selectedItemData.b_status === 2 ? (
                                    <OverlayTrigger overlay={renderTooltipDownload}>
                                        <Link href={`/document/receipt/book/${selectedItemData.b_id}`} target="_blank" style={{ cursor: 'pointer' }}>
                                            <BsDownload className='me-2 text-primary' style={{ fontSize: '28px' }} />
                                            ใบเสร็จจอง
                                        </Link>
                                    </OverlayTrigger>
                                ) : (
                                    null
                                )}
                            </div>
                        </div>
                    </div>
                )}




            </Modal.Body>
        </Modal>
    );
}
