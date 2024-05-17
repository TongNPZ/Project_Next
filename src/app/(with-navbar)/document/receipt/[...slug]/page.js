'use client'
import React, { useState, useEffect } from 'react';
import GetRequest from '@/app/ConfigAPI';
import {
    API_BOOK,
    API_CONTRACT,
    API_TRANSFER,
    API_NOTIFY_COMMON_FEE,
    API_HOUSE_ESTATE
} from '../../../../../../api';
import { PDFViewer } from '@react-pdf/renderer';
import MyDocument from '@/app/componnent/pdfComponent/Receipt';

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

    // - book - //
    const [showBook, setShowBook] = useState({});

    useEffect(() => {

        if (params.slug[0] === 'book') {
            async function fetchBookById() {
                try {
                    const result = await GetRequest(`${API_BOOK}/${params.slug[1]}`, 'GET', null);
                    setShowBook(result);
                } catch (error) {
                    console.log('error', error);
                }
            }

            fetchBookById();
        } else {
            setShowBook(null);
        }

    }, [params.slug[1]]);

    // - contract - //
    const [showContract, setShowContract] = useState({});

    useEffect(() => {

        if (params.slug[0] === 'contract') {
            async function fetchContractById() {
                try {
                    const result = await GetRequest(`${API_CONTRACT}/${params.slug[1]}`, 'GET', null);
                    setShowContract(result);
                } catch (error) {
                    console.log('error', error);
                }
            }

            fetchContractById();
        } else {
            setShowContract(null);
        }

    }, [params.slug[1]]);

    // - transfer - //
    const [showTransfer, setShowTransfer] = useState({});

    useEffect(() => {

        if (params.slug[0] === 'transfer') {
            async function fetchTransferById() {
                try {
                    const result = await GetRequest(`${API_TRANSFER}/${params.slug[1]}`, 'GET', null);
                    setShowTransfer(result);
                } catch (error) {
                    console.log('error', error);
                }
            }

            fetchTransferById();
        } else {
            setShowTransfer(null);
        }

    }, [params.slug[1]]);

    // - common fee - //
    const [showCommonFee, setShowCommonFee] = useState({});

    useEffect(() => {

        if (params.slug[0] === 'commonFee') {
            async function fetchCommonFeeById() {
                try {
                    const result = await GetRequest(`${API_NOTIFY_COMMON_FEE}/${params.slug[1]}`, 'GET', null);
                    setShowCommonFee(result);
                } catch (error) {
                    console.log('error', error);
                }
            }

            fetchCommonFeeById();
        } else {
            setShowCommonFee(null);
        }

    }, [params.slug[1]]);

    // --- //

    return (
        <div style={{ width: '100vw', height: '100vh' }}>
            <PDFViewer width="94%" height="100%">
                <MyDocument housingEstate={showData} book={showBook} contract={showContract} transfer={showTransfer} commonFee={showCommonFee} />
            </PDFViewer>
        </div>
    );
}