'use client'
import React, { useState } from 'react';
import { PDFDownloadLink, PDFViewer } from '@react-pdf/renderer';
import MyDocument from '@/app/componnent/pdfComponent/pdfComponent';

export default function DocumentPage() {
    const [loading, setLoading] = useState(true);

    return (
        <>
            <div style={{ width: '100vw', height: '100vh' }}>
                <PDFViewer width="94%" height="100%">
                    <MyDocument />
                </PDFViewer>
            </div>
            <div className='container-color'>
                <div className='row'>
                    <div className='col-md-12 mb-4' >
                        <h1>About Page</h1>
                        {/* {loading ? (
                            <p>กำลังโหลด PDF...</p>
                        ) : (
                            <PDFDownloadLink document={<MyDocument />} fileName="mypdf.pdf">
                                {({ loading, error }) => (
                                    loading ? 'กำลังโหลด...' : 'ดาวน์โหลด PDF'
                                )}
                            </PDFDownloadLink>
                        )} */}
                    </div>
                    <div className='col-md-12'>
                        <div className='container-fluid px-5'>
                            <div className='row'>
                                {/* Additional content */}
                            </div>
                            <br />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}