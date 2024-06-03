'use client'
import React, { useState, useEffect } from 'react';
import GetRequest from '@/app/ConfigAPI';
import {
    API_HOUSE_ESTATE,
    API_NOTIFY_COMMON_FEE,
    API_RECEIVE_COMMON_FEE
} from '../../../../../../api';
import { PDFViewer } from '@react-pdf/renderer';
import DocReport from '@/app/componnent/pdfComponent/Report';

export default function DocumentReport({ params }) {
    // console.log(params)

    function base64Decode(encodedData) {
        return JSON.parse(Buffer.from(encodedData, 'base64').toString());
    }

    const encodedData = decodeURIComponent(params.slug[0]);

    const [reportData, setReportData] = useState({});
    let reportCommonFee = {};

    useEffect(() => {
        if (encodedData) {
            try {
                const decodedData = base64Decode(encodedData);
                setReportData(decodedData);
                reportCommonFee = decodedData
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

    const [showNcf, setShowNcf] = useState([]);

    useEffect(() => {
        const fecthNcf = async () => {
            try {
                const result = await GetRequest(`${API_NOTIFY_COMMON_FEE}?order=DESC&search=${reportCommonFee.search === 'default' ? '' : reportCommonFee.search}&status=${reportCommonFee.tempStatus === 'default' ? '' : reportCommonFee.tempStatus}&endDate=${reportCommonFee.endDate === 'default' ? '' : reportCommonFee.endDate}`, 'GET', null);
                setShowNcf(result.data);
            } catch (error) {
                console.log('error', error);
            }
        }

        fecthNcf();
    }, []);

    const [showRcf, setShowRcf] = useState([]);

    useEffect(() => {
        const fecthRcf = async () => {
            try {
                const result = await GetRequest(`${API_RECEIVE_COMMON_FEE}?order=DESC`, 'GET', null);
                setShowRcf(result.data);

            } catch (error) {
                console.log('error', error);
            }
        }

        fecthRcf();
    }, []);

    // console.log(showNcf)
    // console.log(showRcf)

    return (
        <div style={{ width: '100vw', height: '100vh' }}>
            <PDFViewer width="94%" height="100%">
                {reportData && Object.keys(reportData).length > 0 && (
                    <DocReport
                        showData={reportData.showData === 'default' ? showNcf : reportData.showData}
                        showRcf={reportData.showRcf === 'default' && reportData.showData === 'default' ? showRcf : reportData.showRcf}
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