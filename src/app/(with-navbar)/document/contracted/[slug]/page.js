'use client'
import React, { useState, useEffect } from 'react';
import GetRequest from '@/app/ConfigAPI';
import {
    API_CONTRACT,
    API_HOUSE_ESTATE
} from '../../../../../../api';
import { PDFViewer } from '@react-pdf/renderer';
import DocContract from '@/app/componnent/pdfComponent/Contract';

export default function DocumentReceipt({ params }) {
    console.log(params)

    // fetch //

    // - housing estate - //
    const [showData, setShowData] = useState([]);

    useEffect(() => {
        const fecthHousingEstate = async () => {
            try {
                const result = await GetRequest(API_HOUSE_ESTATE, 'GET', null);
                setShowData(result.data);
            } catch (error) {
                console.log('error', error);
            }
        }
        fecthHousingEstate();
    }, []);

    // - contract - //
    const [showContract, setShowContract] = useState({});

    useEffect(() => {
        async function fetchContractById() {
            try {
                const result = await GetRequest(`${API_CONTRACT}/${params.slug}`, 'GET', null);
                setShowContract(result);
            } catch (error) {
                console.log('error', error);
            }
        }

        fetchContractById();

    }, [params.slug]);

    // --- //

    return (
        <div style={{ width: '100vw', height: '100vh' }}>
            <PDFViewer width="94%" height="100%">
                <DocContract housingEstate={showData} contract={showContract} />
            </PDFViewer>
        </div>
    );
}