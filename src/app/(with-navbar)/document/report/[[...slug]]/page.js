'use client'
import React, { useState, useEffect } from 'react';
import GetRequest from '@/app/ConfigAPI';
import {
    API_HOUSE_ESTATE
} from '../../../../../../api';
import { PDFViewer } from '@react-pdf/renderer';
import DocReport from '@/app/componnent/pdfComponent/Report';

export default function DocumentReceipt({ params }) {
    console.log(params)

    const [showData, setShowData] = useState([]);
    const [search, setSearch] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [showRcf, setShowRcf] = useState([]);

    useEffect(() => {

        if (params.slug[0]) {
            const decodedArray = decodeURIComponent(params.slug[0]);
            const parsedArray = JSON.parse(decodedArray);
            setShowData(parsedArray);
        }

        if (params.slug[2]) {
            const decodedArray = decodeURIComponent(params.slug[2]);
            setSearch(decodedArray);
        }

        if (params.slug[4]) {
            const decodedArray = decodeURIComponent(params.slug[4]);
            setStartDate(decodedArray);
        }

        if (params.slug[5]) {
            const decodedArray = decodeURIComponent(params.slug[5]);
            setEndDate(decodedArray);
        }

        if (params.slug[6]) {
            const decodedArray = decodeURIComponent(params.slug[6]);

            if (decodedArray !== 'default') {
                const parsedArray = JSON.parse(decodedArray);
                setShowRcf(parsedArray);
            } else {
                setShowRcf([]);
            }
        }

    }, [params.slug[0], params.slug[2], params.slug[4], params.slug[5], params.slug[6]]);

    const activeKey = params.slug[1]
    let tempStatus = params.slug[3]

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
                <DocReport showData={showData} showRcf={showRcf} activeKey={activeKey} search={search} tempStatus={tempStatus} startDate={startDate} endDate={endDate} housingEstate={showHousingEstate} />
            </PDFViewer>
        </div>
    );
}