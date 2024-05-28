'use client'
import React, { useEffect, useState } from 'react';
import ProtectRoute from '@/app/componnent/ProtectRoute/ProtectRoute';
import GetRequest from '@/app/ConfigAPI';
import { API_HOUSE } from './../../../../api';
import ModalDetail from './ModalDetail';
import { API_URL } from '../../../../app';

import {
    Table,
    Image,
    Card,
    Button,
    Form,
    Badge,
    ListGroup,
    Tooltip,
    InputGroup,
    Pagination,
} from 'react-bootstrap';
import {
    BsPencilSquare,
    BsFillHouseSlashFill,
    BsFillHouseAddFill,
    BsFillHouseUpFill,
    BsFillInfoCircleFill,
    BsCalendar2PlusFill,
    BsCaretRightFill,
    BsArrowCounterclockwise,
    BsSearch
} from "react-icons/bs";

const HouseView = () => {
    // fecth //
    const [showData, setShowData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPage, setTotalPage] = useState(0);
    const [search, setSearch] = useState('');
    const [status, setStatus] = useState('');

    const fecthHouse = async () => {
        try {
            const result = await GetRequest(`${API_HOUSE}?page=${currentPage}&limit=20&order=DESC&search=${search}&status=vacant`, 'GET', null);
            setShowData(result.data);
            setTotalPage(result.totalPage);
            // console.log(result.data)
        } catch (error) {
            console.log('error', error);
        }
    }

    useEffect(() => {

        if (search !== '') {
            setCurrentPage(1);
        }

        fecthHouse();
    }, [showData, currentPage, search, status]);
    // --- //

    // function
    const handlePageClick = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const handleSortReset = () => {
        setSearch('');
        setStatus('');
    };

    // modal //
    const [selectedId, setSelectedId] = useState('');
    const [selectedHouseNo, setSelectedHouseNo] = useState('');

    // +++ modal detail +++ //
    const [showDetail, setShowDetail] = useState(false);

    const handleDetailClose = () => setShowDetail(false);
    const handleDetailShow = (id) => {
        setSelectedId(id);
        setShowDetail(true);
    }
    // +++ //

    // tooltip //
    const renderTooltipDetail = (props) => (
        <Tooltip {...props}>
            ดูรายละเอียด
        </Tooltip>
    );
    // --- //
    return (
        <>
            <ModalDetail show={showDetail} handleClose={handleDetailClose} id={selectedId} />
            <Card>
                <Card.Header className='pt-4'>
                    <div className='row'>
                        <div className='col-md-6 d-flex align-items-center'>
                            <h5>ข้อมูลบ้าน</h5>
                        </div>
                        <div className='col-md-6 text-md-end'>
                        </div>
                    </div>
                </Card.Header>

                <Card.Body>
                    <div className='row'>
                        <div className='col-md-8'>
                            {/* <Form.Select value={status} onChange={(e) => setStatus(e.target.value)} style={{ width: '150px' }}>
                                <option value={''}>สถานะทั้งหมด</option>
                                <option value={'vacant'}>ว่าง</option>
                                <option value={'book'}>จอง</option>
                                <option value={'contract'}>ทำสัญญา</option>
                                <option value={'transfer'}>โอนกรรมสิทธิ์</option>
                                <option value={'sold'}>ขายแล้ว</option>
                                <option value={'cancel'}>ยกเลิกขาย</option>
                            </Form.Select> */}
                        </div>
                        <div className='col-md-4 mb-3'>
                            <InputGroup>
                                <InputGroup.Text>
                                    <BsSearch />
                                </InputGroup.Text>
                                <Form.Control
                                    type="search"
                                    placeholder="ค้นหา"
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    onKeyUp={(e) => {
                                        if (e.key === 'Enter') {
                                            setSearch(e.target.value)
                                        } else {
                                            setSearch(e.target.value)
                                        }
                                    }}
                                />
                            </InputGroup>
                        </div>
                    </div>

                    <div className='row'>
                        {showData && showData.length > 0 ? (
                            showData.map((data) => (
                                <div className="col-3 ps-3 pe-3">
                                    <ListGroup className="mb-2">
                                        <div className="">
                                            <ListGroup.Item key={data.h_id} action onClick={() => handleDetailShow(data.h_id)} className="hover-card">
                                                <div className="col-md-12 pt-2">
                                                    <Image src={`${API_URL}${data.image}`} style={{ width: '100%', height: '250px' }} fluid />
                                                </div>
                                                <div className="row">
                                                    <div className="col-md-10">
                                                        <h5 className='pt-4'> {data.house_name}</h5>
                                                        <p className="text-muted">โซน {data.name} </p>
                                                        <p className="text-muted">บ้านเลขที่ {data.house_no} </p>
                                                        <p className="text-muted"> ขนาดพื้นที่ใช้สอย {data.usable_space} ตารางเมตร</p>
                                                        <p className="text-muted "> ขนาดที่ดิน {data.hLand_space} ตารางวา&nbsp;&nbsp;&nbsp;
                                                        </p>
                                                    </div>
                                                    <p className="">ราคา {data.house_price.toLocaleString()} บาท</p>
                                                </div>
                                            </ListGroup.Item>
                                            <br />
                                        </div>
                                    </ListGroup>
                                </div>
                            ))
                        ) : (
                            <div colSpan="12" className="text-center" >
                                <h4 className='mt-5 mb-5'>
                                    ไม่มีข้อมูลที่แสดง
                                </h4>
                            </div>
                        )}
                    </div>

                    <Pagination className="float-end">
                        <Pagination.First disabled={currentPage === 1} onClick={() => handlePageClick(1)} />
                        <Pagination.Prev disabled={currentPage === 1} onClick={() => handlePageClick(Math.max(1, currentPage - 1))} />

                        {currentPage > 3 && (
                            <>
                                <Pagination.Item onClick={() => handlePageClick(1)}>1</Pagination.Item>
                                {currentPage > 4 && <Pagination.Ellipsis />}
                            </>
                        )}

                        {[...Array(totalPage)].slice(
                            Math.max(0, currentPage - 3),
                            Math.min(totalPage, currentPage + 2)
                        ).map((_, index) => {
                            const pageIndex = index + Math.max(0, currentPage - 3) + 1;
                            return (
                                <Pagination.Item
                                    key={pageIndex}
                                    active={pageIndex === currentPage}
                                    onClick={() => handlePageClick(pageIndex)}
                                >
                                    {pageIndex}
                                </Pagination.Item>
                            );
                        })}

                        {currentPage < totalPage - 2 && (
                            <>
                                {currentPage < totalPage - 3 && <Pagination.Ellipsis />}
                                <Pagination.Item onClick={() => handlePageClick(totalPage)}>{totalPage}</Pagination.Item>
                            </>
                        )}
                        <Pagination.Next disabled={currentPage === totalPage} onClick={() => handlePageClick(Math.min(totalPage, currentPage + 1))} />
                        <Pagination.Last disabled={currentPage === totalPage} onClick={() => handlePageClick(totalPage)} />
                    </Pagination>
                </Card.Body>
            </Card>
        </>
    );
};
export default HouseView;
