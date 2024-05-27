'use client'
import React, { useState, useEffect } from 'react';
import GetRequest from '@/app/ConfigAPI';
import {
    API_HOUSE_ESTATE
} from '../../../../../../api';
import { PDFViewer } from '@react-pdf/renderer';
import DocReport from '@/app/componnent/pdfComponent/Report';

export default function DocumentReceipt({ params }) {
    // console.log(params)

    function base64Decode(encodedData) {
        return JSON.parse(Buffer.from(encodedData, 'base64').toString());
    }

    const encodedData = decodeURIComponent(params.slug[0]);

    const [reportData, setReportData] = useState({});

    useEffect(() => {
        if (encodedData) {
            try {
                const decodedData = base64Decode(encodedData);
                setReportData(decodedData);
            } catch (error) {
                console.error('Error decoding data:', error);
            }
        }
    }, [encodedData]);

    console.log(reportData)
    const [showHousingEstate, setShowHousingEstate] = useState([]);

    useEffect(() => {
        const fecthHousingEstate = async () => {
            try {
                const result = await GetRequest(API_HOUSE_ESTATE, 'GET', null);
                setShowHousingEstate(result.data);
            } catch (error) {
                console.log('error', error);
            }
        }

        fecthHousingEstate();
    }, []);


    return (
        <div style={{ width: '100vw', height: '100vh' }}>
            <PDFViewer width="94%" height="100%">
                {reportData && Object.keys(reportData).length > 0 && (
                    <DocReport
                        showData={reportData.showData}
                        showRcf={reportData.showRcf}
                        activeKey={reportData.activeKey}
                        search={reportData.search}
                        tempStatus={reportData.tempStatus}
                        startDate={reportData.startDate}
                        endDate={reportData.endDate}
                        housingEstate={showHousingEstate}
                    />
                )}
            </PDFViewer>
        </div>
    );
}