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
    }, [params.slug[0], params.slug[2]]);

    const activeKey = params.slug[1]
    let tempStatus = params.slug[3]
    let startDate = params.slug[4]
    let endDate = params.slug[5]

    console.log('showData = ', showData)
    console.log('activeKey = ', activeKey)
    console.log('search = ', search)
    console.log('tempStatus = ', tempStatus)
    console.log('startDate = ', startDate)
    console.log('endDate = ', endDate)

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
                <DocReport showData={showData} activeKey={activeKey} search={search} tempStatus={tempStatus} startDate={startDate} endDate={endDate} housingEstate={showHousingEstate} />
            </PDFViewer>
        </div>
    );
}