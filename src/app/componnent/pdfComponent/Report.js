import React from 'react';
import {
    DateTimeFormat,
    DateFormat,
    PriceWithCommas
} from '@/app/Format';
import { API_URL } from '../../../../app';
import { Document, Page, Text, View, StyleSheet, Font, Image } from '@react-pdf/renderer';

// PDF
Font.register({
    family: 'Sarabun',
    src: '/font/Sarabun-Regular.ttf'
});

Font.register({
    family: 'SarabunBold',
    src: '/font/Sarabun-Bold.ttf'
});

const styles = StyleSheet.create({
    body: {
        paddingTop: '0.95cm',
        paddingBottom: '1.59cm',
        paddingLeft: '1.27cm',
        paddingRight: '1.27cm',
        fontFamily: 'Sarabun',
        fontStyle: 'normal',
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        width: '100%',
        marginBottom: 5,
    },
    logo: {
        marginHorizontal: 'auto',
        width: '30%',
        marginBottom: 10,
    },
    horizontalLine: {
        width: '100%',
        borderBottomWidth: 1,
        borderBottomColor: 'black',
        marginVertical: 5,
    },
    horizontalLineDotted: {
        width: '100%',
        borderBottomWidth: 1,
        borderBottomColor: 'black',
        borderStyle: 'dotted',
        marginVertical: 10,
    },
    title: {
        fontSize: 12,
        textAlign: 'center',
        marginBottom: 10,
    },
    contentHeading: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        flexWrap: 'wrap',
        marginBottom: 10,
    },
    textHeading: {
        fontSize: 10,
        textAlign: 'justify',
    },
    textContent: {
        fontSize: 8,
        marginBottom: 5,
    },
    textFrontRow: {
        fontSize: 8,
        width: '20%',
        textAlign: 'right',
    },
    textBehindRow: {
        fontSize: 8,
        width: '10%',
        textAlign: 'right',
    },
    textNumberRow: {
        fontSize: 8,
        width: '20%',
        textAlign: 'right',
    },
    table: {
        display: 'table',
        width: 'auto',
        marginVertical: 5,
    },
    tableRow: {
        flexDirection: 'row',
    },
    tableCol: {
        width: '30%',
    },
    tableCell: {
        fontSize: 8,
        textAlign: 'center'
    },
    tableCellData: {
        fontSize: 7,
        textAlign: 'center'
    },
});

const DocReport = ({ showData, showRcf, activeKey, search, tempStatus, startDate, endDate, housingEstate }) => {

    // house
    const filteredDataVacant = showData.filter(data => data.h_status === 1);
    const filteredDataBook = showData.filter(data => data.h_status === 2);
    const filteredDataContract = showData.filter(data => data.h_status === 3);
    const filteredDataTransfer = showData.filter(data => data.h_status === 4);
    const filteredDataSold = showData.filter(data => data.h_status === 5);
    const filteredDataCancel = showData.filter(data => data.h_status === 0);

    const totalPriceSold = filteredDataSold.reduce((sum, data) => {
        return sum + parseFloat(data.price);
    }, 0);
    const totalPriceSoldFormatted = PriceWithCommas(totalPriceSold);

    const totalPriceSoldฺBooked = filteredDataSold.reduce((sum, data) => {
        return sum + parseFloat(data.b_amount);
    }, 0);
    const totalPriceSoldBookedFormatted = PriceWithCommas(totalPriceSoldฺBooked);

    const totalPriceSoldContracted = filteredDataSold.reduce((sum, data) => {
        return sum + parseFloat(data.con_amount);
    }, 0);
    const totalPriceSoldContractedFormatted = PriceWithCommas(totalPriceSoldContracted);

    const totalPriceSoldTransferred = filteredDataSold.reduce((sum, data) => {
        return sum + parseFloat(data.trans_amount);
    }, 0);
    const totalPriceSoldTransferredFormatted = PriceWithCommas(totalPriceSoldTransferred);

    // booked
    const filteredDataBooked = showData.filter(data => data.b_id);

    const totalPriceBooked = filteredDataBooked.reduce((sum, data) => {
        return sum + parseFloat(data.b_amount);
    }, 0);
    const totalPriceBookedFormatted = PriceWithCommas(totalPriceBooked);

    // contracted
    const filteredDataContracted = showData.filter(data => data.b_id);

    const totalPriceContracted = filteredDataContracted.reduce((sum, data) => {
        return sum + parseFloat(data.con_amount);
    }, 0);
    const totalPriceContractedFormatted = PriceWithCommas(totalPriceContracted);

    // transferred
    const filteredDataTransferred = showData.filter(data => data.b_id);

    const totalPriceTransferred = filteredDataTransferred.reduce((sum, data) => {
        return sum + parseFloat(data.trans_amount);
    }, 0);
    const totalPriceTransferredFormatted = PriceWithCommas(totalPriceTransferred);

    // commonFee

    let filteredShowData;
    
    if (activeKey === 'commonFee') {
        filteredShowData = showData && showData.filter(data => {
            const rcfFindData = showRcf && showRcf.find(rcf => rcf.ncf_id === data.ncf_id);
            return rcfFindData || data.ncf_status === 0;
        });
    }

    const filteredDataOverdue = showData.filter(data => data.ncf_status === 0);

    const totalPriceOverdue = filteredDataOverdue.reduce((sum, data) => {
        return sum + parseFloat(data.ncf_amount);
    }, 0);
    const totalPriceOverdueFormatted = PriceWithCommas(totalPriceOverdue);

    const filteredDataPaid = showData.filter(data => data.ncf_status === 1);

    const totalPricePaid = filteredDataPaid.reduce((sum, data) => {
        return sum + parseFloat(data.ncf_amount);
    }, 0);
    const totalPricePaidFormatted = PriceWithCommas(totalPricePaid);

    // expenses
    const filteredDataExpenses = showData.filter(data => data.ex_id);

    const totalPriceExpenses = filteredDataExpenses.reduce((sum, data) => {
        return sum + parseFloat(data.ex_amount);
    }, 0);
    const totalPriceExpensesFormatted = PriceWithCommas(totalPriceExpenses);

    // reportProblem
    const filteredDataReportProblem = showData.filter(data => data.rp_id);
    const filteredDataPending = showData.filter(data => data.rp_status === 0);
    const filteredDataResolved = showData.filter(data => data.rp_status === 1);

    return (
        <Document>
            <Page size="A4" style={styles.body}>
                <View style={styles.contentHeading} fixed>
                    <Text style={[styles.textHeading, { marginRight: 3 }]}>หน้า</Text>
                    <Text style={styles.textHeading} render={({ pageNumber }) => `${pageNumber}`} />
                </View>

                {housingEstate.map((he, index) => (
                    <div key={index}>
                        <Image
                            style={styles.logo}
                            src={`${API_URL}${he.image}`}

                        />
                        <Text style={styles.title}>{he.company}&nbsp;</Text>

                        {activeKey === 'house' ? (
                            <Text style={styles.title}>รายงานข้อมูลบ้าน</Text>
                        ) : activeKey === 'commonFee' ? (
                            <Text style={styles.title}>รายงานค่าส่วนกลาง</Text>
                        ) : activeKey === 'expenses' ? (
                            <Text style={styles.title}>รายงานค่าใช้จ่ายโครงการ</Text>
                        ) : activeKey === 'reportProblem' && (
                            <Text style={styles.title}>รายงานการแจ้งปัญหา</Text>
                        )}
                    </div>
                ))}

                <Text style={styles.textContent}>
                    ประเภทรายงาน&nbsp;:&nbsp;
                    {tempStatus === 'default' ? 'ทั้งหมด' :
                        tempStatus === 'vacant' ? 'ว่าง' :
                            tempStatus === 'booked' ? 'จอง' :
                                tempStatus === 'contracted' ? 'ทำสัญญา' :
                                    tempStatus === 'transferred' ? 'โอนกรรมสิทธิ์' :
                                        tempStatus === 'sold' ? 'ขายแล้ว' :
                                            tempStatus === 'cancel' ? 'ยกเลิกขาย' :
                                                tempStatus === 'overdue' ? 'ค้างจ่าย' :
                                                    tempStatus === 'paid' ? 'ชำระแล้ว' :
                                                        tempStatus === 'pending' ? 'กำลังแก้ไข' :
                                                            tempStatus === 'resolved' ? 'แก้ไขแล้ว' : null
                    }
                    {search !== 'default' ? `, ค้นหา : เฉพาะที่มีรายการ ${search}` : null}
                    {startDate !== 'default' && endDate !== 'default' ? `, จากวันที่ ${DateFormat(startDate)} ถึง ${DateFormat(endDate)}` : null}&nbsp;
                </Text>

                {activeKey === 'house' ? (
                    tempStatus === 'default' || tempStatus === 'sold' || tempStatus === 'vacant' || tempStatus === 'cancel' ? (
                        <>
                            <View style={styles.horizontalLine} />

                            {tempStatus !== 'sold' ? (
                                <View style={styles.table}>
                                    <View style={styles.tableRow}>
                                        <View style={styles.tableCol}>
                                            <Text style={styles.tableCell}>ลำดับ&nbsp;</Text>
                                        </View>
                                        <View style={styles.tableCol}>
                                            <Text style={styles.tableCell}>บ้านเลขที่</Text>
                                        </View>
                                        <View style={styles.tableCol}>
                                            <Text style={styles.tableCell}>โซนบ้าน</Text>
                                        </View>
                                        <View style={styles.tableCol}>
                                            <Text style={styles.tableCell}>ชื่อแบบบ้าน</Text>
                                        </View>
                                        <View style={styles.tableCol}>
                                            <Text style={styles.tableCell}>เลขที่โฉนดที่ดิน</Text>
                                        </View>
                                        <View style={styles.tableCol}>
                                            <Text style={styles.tableCell}>เลขที่หน้าสำรวจ&nbsp;</Text>
                                        </View>
                                        <View style={styles.tableCol}>
                                            <View style={{ flexDirection: 'column' }}>
                                                <Text style={styles.tableCell}>ขนาดพื้นที่ดิน</Text>
                                                <Text style={styles.tableCell}>(ตารางวา)</Text>
                                            </View>
                                        </View>
                                        <View style={styles.tableCol}>
                                            <View style={{ flexDirection: 'column' }}>
                                                <Text style={styles.tableCell}>ขนาดพื้นที่ใช้สอย</Text>
                                                <Text style={styles.tableCell}>(ตารางเมตร)</Text>
                                            </View>
                                        </View>
                                        <View style={styles.tableCol}>
                                            <View style={{ flexDirection: 'column' }}>
                                                <Text style={styles.tableCell}>ราคาบ้าน</Text>
                                                <Text style={styles.tableCell}>พร้อมที่ดิน</Text>
                                            </View>
                                        </View>
                                    </View>
                                </View>
                            ) : (
                                <View style={styles.table}>
                                    <View style={styles.tableRow}>
                                        <View style={styles.tableCol}>
                                            <Text style={styles.tableCell}>ลำดับ&nbsp;</Text>
                                        </View>
                                        <View style={styles.tableCol}>
                                            <Text style={styles.tableCell}>บ้านเลขที่</Text>
                                        </View>
                                        <View style={styles.tableCol}>
                                            <Text style={styles.tableCell}>โซนบ้าน</Text>
                                        </View>
                                        <View style={styles.tableCol}>
                                            <Text style={styles.tableCell}>ชื่อแบบบ้าน</Text>
                                        </View>
                                        <View style={styles.tableCol}>
                                            <Text style={styles.tableCell}>เลขที่โฉนด</Text>
                                        </View>
                                        <View style={styles.tableCol}>
                                            <View style={{ flexDirection: 'column' }}>
                                                <Text style={styles.tableCell}>เลขที่</Text>
                                                <Text style={styles.tableCell}>หน้าสำรวจ&nbsp;</Text>
                                            </View>
                                        </View>
                                        <View style={styles.tableCol}>
                                            <View style={{ flexDirection: 'column' }}>
                                                <Text style={styles.tableCell}>พื้นที่ดิน</Text>
                                                <Text style={styles.tableCell}>(ตร.ว.)</Text>
                                            </View>
                                        </View>
                                        <View style={styles.tableCol}>
                                            <View style={{ flexDirection: 'column' }}>
                                                <Text style={styles.tableCell}>พื้นที่ใช้สอย</Text>
                                                <Text style={styles.tableCell}>(ตร.ม.)</Text>
                                            </View>
                                        </View>
                                        <View style={styles.tableCol}>
                                            <View style={{ flexDirection: 'column' }}>
                                                <Text style={styles.tableCell}>ราคาบ้าน</Text>
                                                <Text style={styles.tableCell}>พร้อมที่ดิน</Text>
                                            </View>
                                        </View>
                                        <View style={styles.tableCol}>
                                            <Text style={styles.tableCell}>ค่าจอง&nbsp;</Text>
                                        </View>
                                        <View style={styles.tableCol}>
                                            <Text style={styles.tableCell}>ค่ามัดจำ&nbsp;</Text>
                                        </View>
                                        <View style={styles.tableCol}>
                                            <View style={{ flexDirection: 'column' }}>
                                                <Text style={styles.tableCell}>จำนวน&nbsp;</Text>
                                                <Text style={styles.tableCell}>คงเหลือ</Text>
                                            </View>
                                        </View>
                                    </View>
                                </View>
                            )}

                            <View style={styles.horizontalLine} />

                            {filteredDataVacant && filteredDataVacant.length > 0 ? (
                                <>
                                    <Text style={styles.textContent}>สถานะ&nbsp;:&nbsp;ว่าง</Text>
                                    {showData.map((data, index) => (
                                        data.h_status === 1 && (
                                            <View key={index} style={styles.table}>
                                                <View style={styles.tableRow}>
                                                    <View style={styles.tableCol}>
                                                        <Text style={styles.tableCellData}>{index + 1}</Text>
                                                    </View>
                                                    <View style={styles.tableCol}>
                                                        <Text style={styles.tableCellData}>{data.house_no}</Text>
                                                    </View>
                                                    <View style={styles.tableCol}>
                                                        <Text style={styles.tableCellData}>{data.name}</Text>
                                                    </View>
                                                    <View style={styles.tableCol}>
                                                        <Text style={styles.tableCellData}>{data.house_name}&nbsp;</Text>
                                                    </View>
                                                    <View style={styles.tableCol}>
                                                        <Text style={styles.tableCellData}>{data.num_deed}</Text>
                                                    </View>
                                                    <View style={styles.tableCol}>
                                                        <Text style={styles.tableCellData}>{data.num_survey}</Text>
                                                    </View>
                                                    <View style={styles.tableCol}>
                                                        <Text style={styles.tableCellData}>{parseFloat(data.hLand_space).toLocaleString()}</Text>
                                                    </View>
                                                    <View style={styles.tableCol}>
                                                        <Text style={styles.tableCellData}>{parseFloat(data.usable_space).toLocaleString()}</Text>
                                                    </View>
                                                    <View style={styles.tableCol}>
                                                        <Text style={styles.tableCellData}>{PriceWithCommas(parseFloat(data.price))}</Text>
                                                    </View>
                                                </View>
                                            </View>
                                        )
                                    ))}
                                    <View style={styles.horizontalLineDotted} />
                                    <View style={styles.row}>
                                        <Text style={styles.textFrontRow}>รวมจำนวนบ้านที่ว่าง&nbsp;&nbsp;</Text>
                                        <Text style={styles.textNumberRow}>{filteredDataVacant.length}</Text>
                                        <Text style={styles.textBehindRow}>หลัง</Text>
                                    </View>
                                    <View style={styles.horizontalLineDotted} />
                                </>
                            ) : null}

                            {filteredDataBook && filteredDataBook.length > 0 ? (
                                <>
                                    <Text style={styles.textContent}>สถานะ&nbsp;:&nbsp;กำลังดำเนินการจอง&nbsp;&nbsp;</Text>
                                    {showData.map((data, index) => (
                                        data.h_status === 2 && (
                                            <View key={index} style={styles.table}>
                                                <View style={styles.tableRow}>
                                                    <View style={styles.tableCol}>
                                                        <Text style={styles.tableCellData}>{index + 1}</Text>
                                                    </View>
                                                    <View style={styles.tableCol}>
                                                        <Text style={styles.tableCellData}>{data.house_no}</Text>
                                                    </View>
                                                    <View style={styles.tableCol}>
                                                        <Text style={styles.tableCellData}>{data.name}</Text>
                                                    </View>
                                                    <View style={styles.tableCol}>
                                                        <Text style={styles.tableCellData}>{data.house_name}&nbsp;</Text>
                                                    </View>
                                                    <View style={styles.tableCol}>
                                                        <Text style={styles.tableCellData}>{data.num_deed}</Text>
                                                    </View>
                                                    <View style={styles.tableCol}>
                                                        <Text style={styles.tableCellData}>{data.num_survey}</Text>
                                                    </View>
                                                    <View style={styles.tableCol}>
                                                        <Text style={styles.tableCellData}>{parseFloat(data.hLand_space).toLocaleString()}</Text>
                                                    </View>
                                                    <View style={styles.tableCol}>
                                                        <Text style={styles.tableCellData}>{parseFloat(data.usable_space).toLocaleString()}</Text>
                                                    </View>
                                                    <View style={styles.tableCol}>
                                                        <Text style={styles.tableCellData}>{PriceWithCommas(parseFloat(data.price))}</Text>
                                                    </View>
                                                </View>
                                            </View>
                                        )
                                    ))}
                                    <View style={styles.horizontalLineDotted} />
                                    <View style={styles.row}>
                                        <Text style={styles.textFrontRow}>รวมจำนวนบ้านที่กำลังจอง&nbsp;&nbsp;</Text>
                                        <Text style={styles.textNumberRow}>{filteredDataBook.length}</Text>
                                        <Text style={styles.textBehindRow}>หลัง</Text>
                                    </View>
                                    <View style={styles.horizontalLineDotted} />
                                </>
                            ) : null}

                            {filteredDataContract && filteredDataContract.length > 0 ? (
                                <>
                                    <Text style={styles.textContent}>สถานะ&nbsp;:&nbsp;กำลังดำเนินการทำสัญญา&nbsp;&nbsp;&nbsp;</Text>
                                    {showData.map((data, index) => (
                                        data.h_status === 3 && (
                                            <View key={index} style={styles.table}>
                                                <View style={styles.tableRow}>
                                                    <View style={styles.tableCol}>
                                                        <Text style={styles.tableCellData}>{index + 1}</Text>
                                                    </View>
                                                    <View style={styles.tableCol}>
                                                        <Text style={styles.tableCellData}>{data.house_no}</Text>
                                                    </View>
                                                    <View style={styles.tableCol}>
                                                        <Text style={styles.tableCellData}>{data.name}</Text>
                                                    </View>
                                                    <View style={styles.tableCol}>
                                                        <Text style={styles.tableCellData}>{data.house_name}&nbsp;</Text>
                                                    </View>
                                                    <View style={styles.tableCol}>
                                                        <Text style={styles.tableCellData}>{data.num_deed}</Text>
                                                    </View>
                                                    <View style={styles.tableCol}>
                                                        <Text style={styles.tableCellData}>{data.num_survey}</Text>
                                                    </View>
                                                    <View style={styles.tableCol}>
                                                        <Text style={styles.tableCellData}>{parseFloat(data.hLand_space).toLocaleString()}</Text>
                                                    </View>
                                                    <View style={styles.tableCol}>
                                                        <Text style={styles.tableCellData}>{parseFloat(data.usable_space).toLocaleString()}</Text>
                                                    </View>
                                                    <View style={styles.tableCol}>
                                                        <Text style={styles.tableCellData}>{PriceWithCommas(parseFloat(data.price))}</Text>
                                                    </View>
                                                </View>
                                            </View>
                                        )
                                    ))}
                                    <View style={styles.horizontalLineDotted} />
                                    <View style={styles.row}>
                                        <Text style={styles.textFrontRow}>รวมจำนวนบ้านที่กำลังทำสัญญา&nbsp;&nbsp;</Text>
                                        <Text style={styles.textNumberRow}>{filteredDataContract.length}</Text>
                                        <Text style={styles.textBehindRow}>หลัง</Text>
                                    </View>
                                    <View style={styles.horizontalLineDotted} />
                                </>
                            ) : null}

                            {filteredDataTransfer && filteredDataTransfer.length > 0 ? (
                                <>
                                    <Text style={styles.textContent}>สถานะ&nbsp;:&nbsp;กำลังดำเนินการโอนกรรมสิทธิ์&nbsp;&nbsp;</Text>
                                    {showData.map((data, index) => (
                                        data.h_status === 4 && (
                                            <View key={index} style={styles.table}>
                                                <View style={styles.tableRow}>
                                                    <View style={styles.tableCol}>
                                                        <Text style={styles.tableCellData}>{index + 1}</Text>
                                                    </View>
                                                    <View style={styles.tableCol}>
                                                        <Text style={styles.tableCellData}>{data.house_no}</Text>
                                                    </View>
                                                    <View style={styles.tableCol}>
                                                        <Text style={styles.tableCellData}>{data.name}</Text>
                                                    </View>
                                                    <View style={styles.tableCol}>
                                                        <Text style={styles.tableCellData}>{data.house_name}&nbsp;</Text>
                                                    </View>
                                                    <View style={styles.tableCol}>
                                                        <Text style={styles.tableCellData}>{data.num_deed}</Text>
                                                    </View>
                                                    <View style={styles.tableCol}>
                                                        <Text style={styles.tableCellData}>{data.num_survey}</Text>
                                                    </View>
                                                    <View style={styles.tableCol}>
                                                        <Text style={styles.tableCellData}>{parseFloat(data.hLand_space).toLocaleString()}</Text>
                                                    </View>
                                                    <View style={styles.tableCol}>
                                                        <Text style={styles.tableCellData}>{parseFloat(data.usable_space).toLocaleString()}</Text>
                                                    </View>
                                                    <View style={styles.tableCol}>
                                                        <Text style={styles.tableCellData}>{PriceWithCommas(parseFloat(data.price))}</Text>
                                                    </View>
                                                </View>
                                            </View>
                                        )
                                    ))}
                                    <View style={styles.horizontalLineDotted} />
                                    <View style={styles.row}>
                                        <Text style={styles.textFrontRow}>รวมจำนวนบ้านที่กำลังโอนกรรมสิทธิ์&nbsp;&nbsp;</Text>
                                        <Text style={styles.textNumberRow}>{filteredDataTransfer.length}</Text>
                                        <Text style={styles.textBehindRow}>หลัง</Text>
                                    </View>
                                    <View style={styles.horizontalLineDotted} />
                                </>
                            ) : null}

                            {filteredDataSold && filteredDataSold.length > 0 ? (
                                <>
                                    <Text style={styles.textContent}>สถานะ&nbsp;:&nbsp;ขายแล้ว&nbsp;</Text>
                                    {showData.map((data, index) => (
                                        data.h_status === 5 && (
                                            <View key={index} style={styles.table}>
                                                <View style={styles.tableRow}>
                                                    <View style={styles.tableCol}>
                                                        <Text style={styles.tableCellData}>{index + 1}</Text>
                                                    </View>
                                                    <View style={styles.tableCol}>
                                                        <Text style={styles.tableCellData}>{data.house_no}</Text>
                                                    </View>
                                                    <View style={styles.tableCol}>
                                                        <Text style={styles.tableCellData}>{data.name}</Text>
                                                    </View>
                                                    <View style={styles.tableCol}>
                                                        <Text style={styles.tableCellData}>{data.house_name}&nbsp;</Text>
                                                    </View>
                                                    <View style={styles.tableCol}>
                                                        <Text style={styles.tableCellData}>{data.num_deed}</Text>
                                                    </View>
                                                    <View style={styles.tableCol}>
                                                        <Text style={styles.tableCellData}>{data.num_survey}</Text>
                                                    </View>
                                                    <View style={styles.tableCol}>
                                                        <Text style={styles.tableCellData}>{parseFloat(data.hLand_space).toLocaleString()}</Text>
                                                    </View>
                                                    <View style={styles.tableCol}>
                                                        <Text style={styles.tableCellData}>{parseFloat(data.usable_space).toLocaleString()}</Text>
                                                    </View>
                                                    <View style={styles.tableCol}>
                                                        <Text style={styles.tableCellData}>{PriceWithCommas(parseFloat(data.price))}</Text>
                                                    </View>

                                                    {tempStatus !== 'default' && (
                                                        <>
                                                            <View style={styles.tableCol}>
                                                                <Text style={styles.tableCellData}>{PriceWithCommas(parseFloat(data.b_amount))}</Text>
                                                            </View>
                                                            <View style={styles.tableCol}>
                                                                <Text style={styles.tableCellData}>{PriceWithCommas(parseFloat(data.con_amount))}</Text>
                                                            </View>
                                                            <View style={styles.tableCol}>
                                                                <Text style={styles.tableCellData}>{PriceWithCommas(parseFloat(data.trans_amount))}</Text>
                                                            </View>
                                                        </>
                                                    )}

                                                </View>
                                            </View>
                                        )
                                    ))}
                                    <View style={styles.horizontalLineDotted} />
                                    <View style={styles.row}>
                                        <Text style={styles.textFrontRow}>รวมจำนวนบ้านที่ขายแล้ว&nbsp;&nbsp;</Text>
                                        <Text style={styles.textNumberRow}>{filteredDataSold.length}</Text>
                                        <Text style={styles.textBehindRow}>หลัง</Text>
                                    </View>
                                    <View style={styles.row}>
                                        <Text style={styles.textFrontRow}>รวมมูลค่าบ้านพร้อมที่ดิน&nbsp;&nbsp;</Text>
                                        <Text style={styles.textNumberRow}>{totalPriceSoldFormatted}</Text>
                                        <Text style={styles.textBehindRow}>บาท</Text>
                                    </View>

                                    {tempStatus !== 'default' && (
                                        <>
                                            <View style={styles.row}>
                                                <Text style={styles.textFrontRow}>รวมมูลค่าจอง&nbsp;&nbsp;</Text>
                                                <Text style={styles.textNumberRow}>{totalPriceSoldBookedFormatted}</Text>
                                                <Text style={styles.textBehindRow}>บาท</Text>
                                            </View>
                                            <View style={styles.row}>
                                                <Text style={styles.textFrontRow}>รวมมูลค่าเงินดาวน์&nbsp;&nbsp;</Text>
                                                <Text style={styles.textNumberRow}>{totalPriceSoldContractedFormatted}</Text>
                                                <Text style={styles.textBehindRow}>บาท</Text>
                                            </View>
                                            <View style={styles.row}>
                                                <Text style={styles.textFrontRow}>รวมมูลค่าคงเหลือ&nbsp;&nbsp;</Text>
                                                <Text style={styles.textNumberRow}>{totalPriceSoldTransferredFormatted}</Text>
                                                <Text style={styles.textBehindRow}>บาท</Text>
                                            </View>
                                        </>
                                    )}

                                    <View style={styles.horizontalLineDotted} />
                                </>
                            ) : null}

                            {filteredDataCancel && filteredDataCancel.length > 0 ? (
                                <>
                                    <Text style={styles.textContent}>สถานะ&nbsp;:&nbsp;ยกเลิกขาย&nbsp;</Text>
                                    {showData.map((data, index) => (
                                        data.h_status === 0 && (
                                            <View key={index} style={styles.table}>
                                                <View style={styles.tableRow}>
                                                    <View style={styles.tableCol}>
                                                        <Text style={styles.tableCellData}>{index + 1}</Text>
                                                    </View>
                                                    <View style={styles.tableCol}>
                                                        <Text style={styles.tableCellData}>{data.house_no}</Text>
                                                    </View>
                                                    <View style={styles.tableCol}>
                                                        <Text style={styles.tableCellData}>{data.name}</Text>
                                                    </View>
                                                    <View style={styles.tableCol}>
                                                        <Text style={styles.tableCellData}>{data.house_name}&nbsp;</Text>
                                                    </View>
                                                    <View style={styles.tableCol}>
                                                        <Text style={styles.tableCellData}>{data.num_deed}</Text>
                                                    </View>
                                                    <View style={styles.tableCol}>
                                                        <Text style={styles.tableCellData}>{data.num_survey}</Text>
                                                    </View>
                                                    <View style={styles.tableCol}>
                                                        <Text style={styles.tableCellData}>{parseFloat(data.hLand_space).toLocaleString()}</Text>
                                                    </View>
                                                    <View style={styles.tableCol}>
                                                        <Text style={styles.tableCellData}>{parseFloat(data.usable_space).toLocaleString()}</Text>
                                                    </View>
                                                    <View style={styles.tableCol}>
                                                        <Text style={styles.tableCellData}>{PriceWithCommas(parseFloat(data.price))}</Text>
                                                    </View>
                                                </View>
                                            </View>
                                        )
                                    ))}
                                    <View style={styles.horizontalLineDotted} />
                                    <View style={styles.row}>
                                        <Text style={styles.textFrontRow}>รวมจำนวนบ้านที่ยกเลิกขาย&nbsp;&nbsp;</Text>
                                        <Text style={styles.textNumberRow}>{filteredDataCancel.length}</Text>
                                        <Text style={styles.textBehindRow}>หลัง</Text>
                                    </View>
                                    <View style={styles.horizontalLineDotted} />
                                </>
                            ) : null}
                        </>
                    ) : tempStatus === 'booked' ? (
                        <>
                            <View style={styles.horizontalLine} />
                            <View style={styles.table}>
                                <View style={styles.tableRow}>
                                    <View style={styles.tableCol}>
                                        <Text style={styles.tableCell}>ลำดับ&nbsp;</Text>
                                    </View>
                                    <View style={styles.tableCol}>
                                        <Text style={styles.tableCell}>บ้านเลขที่</Text>
                                    </View>
                                    <View style={styles.tableCol}>
                                        <Text style={styles.tableCell}>ชื่อผู้จอง</Text>
                                    </View>
                                    <View style={styles.tableCol}>
                                        <Text style={styles.tableCell}>จำนวนเงินจอง&nbsp;</Text>
                                    </View>
                                    <View style={styles.tableCol}>
                                        <Text style={styles.tableCell}>วันที่จอง</Text>
                                    </View>
                                    <View style={styles.tableCol}>
                                        <Text style={styles.tableCell}>หมายเหตุ</Text>
                                    </View>
                                </View>
                            </View>
                            <View style={styles.horizontalLine} />

                            {filteredDataBooked && filteredDataBooked.length > 0 ? (
                                <>
                                    <Text style={styles.textContent}>สถานะ&nbsp;:&nbsp;รายการจองที่ชำระแล้ว&nbsp;</Text>
                                    {showData.map((data, index) => (
                                        <View style={styles.table}>
                                            <View style={styles.tableRow}>
                                                <View style={styles.tableCol}>
                                                    <Text style={styles.tableCellData}>{index + 1}</Text>
                                                </View>
                                                <View style={styles.tableCol}>
                                                    <Text style={styles.tableCellData}>{data.house_no}</Text>
                                                </View>
                                                <View style={styles.tableCol}>
                                                    <Text style={styles.tableCellData}>{data.user_name} {data.user_lastname}</Text>
                                                </View>
                                                <View style={styles.tableCol}>
                                                    <Text style={styles.tableCellData}>{PriceWithCommas(parseFloat(data.b_amount))}&nbsp;</Text>
                                                </View>
                                                <View style={styles.tableCol}>
                                                    <Text style={styles.tableCellData}>{DateTimeFormat(data.b_date)}</Text>
                                                </View>
                                                <View style={styles.tableCol}>
                                                    <Text style={styles.tableCellData}>{data.b_note}</Text>
                                                </View>
                                            </View>
                                        </View>
                                    ))}
                                    <View style={styles.horizontalLineDotted} />
                                    <View style={styles.row}>
                                        <Text style={styles.textFrontRow}>รวมจำนวนรายการจอง&nbsp;&nbsp;</Text>
                                        <Text style={styles.textNumberRow}>{filteredDataBooked.length}</Text>
                                        <Text style={styles.textBehindRow}>รายการ</Text>
                                    </View>
                                    <View style={styles.row}>textFrontRow
                                        <Text style={styles.textFrontRow}>รวมจำนวนเงินจอง&nbsp;&nbsp;</Text>
                                        <Text style={styles.textNumberRow}>{totalPriceBookedFormatted}</Text>
                                        <Text style={styles.textBehindRow}>บาท</Text>
                                    </View>
                                    <View style={styles.horizontalLineDotted} />
                                </>
                            ) : null}
                        </>
                    ) : tempStatus === 'contracted' ? (
                        <>
                            <View style={styles.horizontalLine} />
                            <View style={styles.table}>
                                <View style={styles.tableRow}>
                                    <View style={styles.tableCol}>
                                        <Text style={styles.tableCell}>ลำดับ&nbsp;</Text>
                                    </View>
                                    <View style={styles.tableCol}>
                                        <Text style={styles.tableCell}>เลขที่สัญญา</Text>
                                    </View>
                                    <View style={styles.tableCol}>
                                        <Text style={styles.tableCell}>วันที่ทำสัญญา&nbsp;</Text>
                                    </View>
                                    <View style={styles.tableCol}>
                                        <Text style={styles.tableCell}>ชื่อผู้ทำสัญญา&nbsp;</Text>
                                    </View>
                                    <View style={styles.tableCol}>
                                        <Text style={styles.tableCell}>บ้านเลขที่</Text>
                                    </View>
                                    <View style={styles.tableCol}>
                                        <View style={{ flexDirection: 'column' }}>
                                            <Text style={styles.tableCell}>จำนวนเงิน&nbsp;</Text>
                                            <Text style={styles.tableCell}>ทำสัญญา&nbsp;</Text>
                                        </View>
                                    </View>
                                    <View style={styles.tableCol}>
                                        <Text style={styles.tableCell}>ชื่อพยาน</Text>
                                    </View>
                                    <View style={styles.tableCol}>
                                        <Text style={styles.tableCell}>ชื่อพยาน</Text>
                                    </View>
                                    <View style={styles.tableCol}>
                                        <Text style={styles.tableCell}>หมายเหตุ</Text>
                                    </View>
                                </View>
                            </View>
                            <View style={styles.horizontalLine} />

                            {filteredDataContracted && filteredDataContracted.length > 0 ? (
                                <>
                                    <Text style={styles.textContent}>สถานะ&nbsp;:&nbsp;รายการทำสัญญาที่ชำระแล้ว&nbsp;&nbsp;</Text>
                                    {showData.map((data, index) => (
                                        <View style={styles.table}>
                                            <View style={styles.tableRow}>
                                                <View style={styles.tableCol}>
                                                    <Text style={styles.tableCellData}>{index + 1}</Text>
                                                </View>
                                                <View style={styles.tableCol}>
                                                    <Text style={styles.tableCellData}>{data.con_number}</Text>
                                                </View>
                                                <View style={styles.tableCol}>
                                                    <Text style={styles.tableCellData}>{DateTimeFormat(data.con_date)}</Text>
                                                </View>
                                                <View style={styles.tableCol}>
                                                    <Text style={styles.tableCellData}>{data.user_name} {data.user_lastname}</Text>
                                                </View>
                                                <View style={styles.tableCol}>
                                                    <Text style={styles.tableCellData}>{data.house_no}</Text>
                                                </View>
                                                <View style={styles.tableCol}>
                                                    <Text style={styles.tableCellData}>{PriceWithCommas(parseFloat(data.con_amount))}</Text>
                                                </View>
                                                <View style={styles.tableCol}>
                                                    <Text style={styles.tableCellData}>{data.witnessone_name}</Text>
                                                </View>
                                                <View style={styles.tableCol}>
                                                    <Text style={styles.tableCellData}>{data.witnesstwo_name}</Text>
                                                </View>
                                                <View style={styles.tableCol}>
                                                    <Text style={styles.tableCellData}>{data.con_note}</Text>
                                                </View>
                                            </View>
                                        </View>
                                    ))}
                                    <View style={styles.horizontalLineDotted} />
                                    <View style={styles.row}>
                                        <Text style={styles.textFrontRow}>รวมจำนวนรายการทำสัญญา&nbsp;&nbsp;</Text>
                                        <Text style={styles.textNumberRow}>{filteredDataContracted.length}</Text>
                                        <Text style={styles.textBehindRow}>รายการ</Text>
                                    </View>
                                    <View style={styles.row}>
                                        <Text style={styles.textFrontRow}>รวมจำนวนเงินมัดจำ&nbsp;&nbsp;</Text>
                                        <Text style={styles.textNumberRow}>{totalPriceContractedFormatted}</Text>
                                        <Text style={styles.textBehindRow}>บาท</Text>
                                    </View>
                                    <View style={styles.horizontalLineDotted} />
                                </>
                            ) : null}
                        </>
                    ) : tempStatus === 'transferred' && (
                        <>
                            <View style={styles.horizontalLine} />
                            <View style={styles.table}>
                                <View style={styles.tableRow}>
                                    <View style={styles.tableCol}>
                                        <Text style={styles.tableCell}>ลำดับ&nbsp;</Text>
                                    </View>
                                    <View style={styles.tableCol}>
                                        <Text style={styles.tableCell}>บ้านเลขที่</Text>
                                    </View>
                                    <View style={styles.tableCol}>
                                        <Text style={styles.tableCell}>วันที่โอนกรรมสิทธิ์&nbsp;</Text>
                                    </View>
                                    <View style={styles.tableCol}>
                                        <Text style={styles.tableCell}>ชื่อผู้รับโอน&nbsp;</Text>
                                    </View>
                                    <View style={styles.tableCol}>
                                        <Text style={styles.tableCell}>จำนวนเงินส่วนที่เหลือ&nbsp;</Text>
                                    </View>
                                    <View style={styles.tableCol}>
                                        <Text style={styles.tableCell}>หมายเหตุ</Text>
                                    </View>
                                </View>
                            </View>
                            <View style={styles.horizontalLine} />

                            {filteredDataTransferred && filteredDataTransferred.length > 0 ? (
                                <>
                                    <Text style={styles.textContent}>สถานะ&nbsp;:&nbsp;รายการโอนกรรมสิทธิ์ที่ชำระแล้ว&nbsp;&nbsp;</Text>
                                    {showData.map((data, index) => (
                                        <View style={styles.table}>
                                            <View style={styles.tableRow}>
                                                <View style={styles.tableCol}>
                                                    <Text style={styles.tableCellData}>{index + 1}</Text>
                                                </View>
                                                <View style={styles.tableCol}>
                                                    <Text style={styles.tableCellData}>{data.house_no}</Text>
                                                </View>
                                                <View style={styles.tableCol}>
                                                    <Text style={styles.tableCellData}>{DateTimeFormat(data.trans_date)}</Text>
                                                </View>
                                                <View style={styles.tableCol}>
                                                    <Text style={styles.tableCellData}>{data.trans_name}</Text>
                                                </View>
                                                <View style={styles.tableCol}>
                                                    <Text style={styles.tableCellData}>{PriceWithCommas(parseFloat(data.trans_amount))}</Text>
                                                </View>
                                                <View style={styles.tableCol}>
                                                    <Text style={styles.tableCellData}>{data.trans_note}</Text>
                                                </View>
                                            </View>
                                        </View>
                                    ))}
                                    <View style={styles.horizontalLineDotted} />
                                    <View style={styles.row}>
                                        <Text style={styles.textFrontRow}>รวมจำนวนรายการโอนกรรมสิทธิ์&nbsp;&nbsp;</Text>
                                        <Text style={styles.textNumberRow}>{filteredDataTransferred.length}</Text>
                                        <Text style={styles.textBehindRow}>รายการ</Text>
                                    </View>
                                    <View style={styles.row}>
                                        <Text style={styles.textFrontRow}>รวมจำนวนเงินส่วนที่เหลือ&nbsp;&nbsp;</Text>
                                        <Text style={styles.textNumberRow}>{totalPriceTransferredFormatted}</Text>
                                        <Text style={styles.textBehindRow}>บาท</Text>
                                    </View>
                                    <View style={styles.horizontalLineDotted} />
                                </>
                            ) : null}
                        </>
                    )
                ) : activeKey === 'commonFee' ? (
                    tempStatus === 'default' || tempStatus === 'overdue' || tempStatus === 'paid' ? (
                        <>
                            <View style={styles.horizontalLine} />
                            <View style={styles.table}>
                                <View style={styles.tableRow}>
                                    <View style={styles.tableCol}>
                                        <Text style={styles.tableCell}>ลำดับ&nbsp;</Text>
                                    </View>
                                    <View style={styles.tableCol}>
                                        <Text style={styles.tableCell}>บ้านเลขที่</Text>
                                    </View>
                                    <View style={styles.tableCol}>
                                        <Text style={styles.tableCell}>จำนวนเงิน&nbsp;</Text>
                                    </View>
                                    <View style={styles.tableCol}>
                                        <Text style={styles.tableCell}>วันที่กำหนดชำระ&nbsp;&nbsp;</Text>
                                    </View>

                                    {tempStatus !== 'overdue' && (
                                        <View style={styles.tableCol}>
                                            <Text style={styles.tableCell}>วันที่ชำระ&nbsp;</Text>
                                        </View>
                                    )}

                                </View>
                            </View>
                            <View style={styles.horizontalLine} />

                            {filteredDataOverdue && filteredDataOverdue.length > 0 && startDate === 'default' && endDate === 'default' || tempStatus === 'overdue' && startDate !== 'default' && endDate !== 'default' ? (
                                <>
                                    <Text style={styles.textContent}>สถานะ&nbsp;:&nbsp;ค้างชำระ&nbsp;</Text>
                                    {filteredShowData.map((data, index) => {
                                        return (
                                            data.ncf_status === 0 && (
                                                <View key={index} style={styles.table}>
                                                    <View style={styles.tableRow}>
                                                        <View style={styles.tableCol}>
                                                            <Text style={styles.tableCellData}>{index + 1}</Text>
                                                        </View>
                                                        <View style={styles.tableCol}>
                                                            <Text style={styles.tableCellData}>{data.house_no}</Text>
                                                        </View>
                                                        <View style={styles.tableCol}>
                                                            <Text style={styles.tableCellData}>{PriceWithCommas(parseFloat(data.ncf_amount))}</Text>
                                                        </View>
                                                        <View style={styles.tableCol}>
                                                            <Text style={styles.tableCellData}>{DateFormat(data.ncf_date)}&nbsp;</Text>
                                                        </View>

                                                        {tempStatus === 'default' && (
                                                            <View style={styles.tableCol}>
                                                                <Text style={styles.tableCellData}>-</Text>
                                                            </View>
                                                        )}

                                                    </View>
                                                </View>
                                            )
                                        )
                                    })}
                                    <View style={styles.horizontalLineDotted} />
                                    <View style={styles.row}>
                                        <Text style={styles.textFrontRow}>รวมรายการค้างชำระ&nbsp;&nbsp;</Text>
                                        <Text style={styles.textNumberRow}>{filteredDataOverdue.length}</Text>
                                        <Text style={styles.textBehindRow}>รายการ</Text>
                                    </View>
                                    <View style={styles.row}>
                                        <Text style={styles.textFrontRow}>รวมจำนวนเงินค้างชำระ&nbsp;&nbsp;</Text>
                                        <Text style={styles.textNumberRow}>{totalPriceOverdueFormatted}</Text>
                                        <Text style={styles.textBehindRow}>บาท</Text>
                                    </View>
                                    <View style={styles.horizontalLineDotted} />
                                </>
                            ) : null}

                            {filteredDataPaid && filteredDataPaid.length > 0 ? (
                                <>
                                    <Text style={styles.textContent}>สถานะ&nbsp;:&nbsp;ชำระแล้ว&nbsp;</Text>
                                    {filteredShowData.map((data, index) => {
                                        const rcfFindData = showRcf && showRcf.find(rcf => rcf.ncf_id === data.ncf_id);
                                        const rcfSomeData = rcfFindData !== undefined;

                                        return (
                                            data.ncf_status === 1 && (
                                                <View key={index} style={styles.table}>
                                                    <View style={styles.tableRow}>
                                                        <View style={styles.tableCol}>
                                                            <Text style={styles.tableCellData}>{index + 1}</Text>
                                                        </View>
                                                        <View style={styles.tableCol}>
                                                            <Text style={styles.tableCellData}>{data.house_no}</Text>
                                                        </View>
                                                        <View style={styles.tableCol}>
                                                            <Text style={styles.tableCellData}>{PriceWithCommas(parseFloat(data.ncf_amount))}</Text>
                                                        </View>
                                                        <View style={styles.tableCol}>
                                                            <Text style={styles.tableCellData}>{DateFormat(data.ncf_date)}&nbsp;</Text>
                                                        </View>

                                                        {rcfSomeData && rcfFindData.rcf_date ? (
                                                            <View style={styles.tableCol}>
                                                                <Text style={styles.tableCellData}>{DateFormat(rcfFindData.rcf_date)}</Text>
                                                            </View>
                                                        ) : (
                                                            <View style={styles.tableCol}>
                                                                <Text style={styles.tableCellData}>-</Text>
                                                            </View>
                                                        )}

                                                    </View>
                                                </View>
                                            )
                                        )
                                    })}
                                    <View style={styles.horizontalLineDotted} />
                                    <View style={styles.row}>
                                        <Text style={styles.textFrontRow}>รวมรายการชำระแล้ว&nbsp;&nbsp;</Text>
                                        <Text style={styles.textNumberRow}>{filteredDataPaid.length}</Text>
                                        <Text style={styles.textBehindRow}>รายการ</Text>
                                    </View>
                                    <View style={styles.row}>
                                        <Text style={styles.textFrontRow}>รวมจำนวนเงินชำระแล้ว&nbsp;&nbsp;</Text>
                                        <Text style={styles.textNumberRow}>{totalPricePaidFormatted}</Text>
                                        <Text style={styles.textBehindRow}>บาท</Text>
                                    </View>
                                    <View style={styles.horizontalLineDotted} />
                                </>
                            ) : null}
                        </>
                    ) : null
                ) : activeKey === 'expenses' ? (
                    tempStatus === 'default' ? (
                        <>
                            <View style={styles.horizontalLine} />
                            <View style={styles.table}>
                                <View style={styles.tableRow}>
                                    <View style={styles.tableCol}>
                                        <Text style={styles.tableCell}>ลำดับ&nbsp;</Text>
                                    </View>
                                    <View style={styles.tableCol}>
                                        <Text style={styles.tableCell}>รายการ</Text>
                                    </View>
                                    <View style={styles.tableCol}>
                                        <Text style={styles.tableCell}>จำนวนเงิน&nbsp;</Text>
                                    </View>
                                    <View style={styles.tableCol}>
                                        <Text style={styles.tableCell}>วันที่ลงบันทึก&nbsp;&nbsp;</Text>
                                    </View>
                                    <View style={styles.tableCol}>
                                        <Text style={styles.tableCell}>วันที่ชำระ&nbsp;</Text>
                                    </View>
                                </View>
                            </View>
                            <View style={styles.horizontalLine} />

                            {filteredDataExpenses && filteredDataExpenses.length > 0 ? (
                                <>
                                    <Text style={styles.textContent}>สถานะ&nbsp;:&nbsp;ทั้งหมด&nbsp;</Text>

                                    {showData.map((data, index) => (
                                        <View key={index} style={styles.table}>
                                            <View style={styles.tableRow}>
                                                <View style={styles.tableCol}>
                                                    <Text style={styles.tableCellData}>{index + 1}</Text>
                                                </View>
                                                <View style={styles.tableCol}>
                                                    <Text style={styles.tableCellData}>{data.ex_list}</Text>
                                                </View>
                                                <View style={styles.tableCol}>
                                                    <Text style={styles.tableCellData}>{PriceWithCommas(parseFloat(data.ex_amount))}</Text>
                                                </View>
                                                <View style={styles.tableCol}>
                                                    <Text style={styles.tableCellData}>{DateTimeFormat(data.ex_record)}&nbsp;</Text>
                                                </View>
                                                <View style={styles.tableCol}>
                                                    <Text style={styles.tableCellData}>{DateFormat(data.ex_date)}</Text>
                                                </View>
                                            </View>
                                        </View>
                                    ))}

                                    <View style={styles.horizontalLineDotted} />
                                    <View style={styles.row}>
                                        <Text style={styles.textFrontRow}>รวมรายการค่าใช้จ่าย&nbsp;&nbsp;</Text>
                                        <Text style={styles.textNumberRow}>{filteredDataExpenses.length}</Text>
                                        <Text style={styles.textBehindRow}>รายการ</Text>
                                    </View>
                                    <View style={styles.row}>
                                        <Text style={styles.textFrontRow}>รวมจำนวนเงินค่าใช้จ่าย&nbsp;&nbsp;</Text>
                                        <Text style={styles.textNumberRow}>{totalPriceExpensesFormatted}</Text>
                                        <Text style={styles.textBehindRow}>บาท</Text>
                                    </View>
                                    <View style={styles.horizontalLineDotted} />
                                </>
                            ) : null}
                        </>
                    ) : null
                ) : activeKey === 'reportProblem' && (
                    <>
                        {tempStatus === 'default' || tempStatus === 'pending' ? (
                            filteredDataPending && filteredDataPending.length > 0 ? (
                                <>
                                    <View style={styles.horizontalLine} />
                                    <View style={styles.table}>
                                        <View style={styles.tableRow}>
                                            <View style={styles.tableCol}>
                                                <Text style={styles.tableCell}>ลำดับ&nbsp;</Text>
                                            </View>
                                            <View style={styles.tableCol}>
                                                <Text style={styles.tableCell}>บ้านเลขที่</Text>
                                            </View>
                                            <View style={styles.tableCol}>
                                                <Text style={styles.tableCell}>ชื่อผู้แจ้ง&nbsp;</Text>
                                            </View>
                                            <View style={styles.tableCol}>
                                                <Text style={styles.tableCell}>รายละเอียดการแจ้ง&nbsp;&nbsp;</Text>
                                            </View>
                                            <View style={styles.tableCol}>
                                                <Text style={styles.tableCell}>วันที่แจ้ง&nbsp;</Text>
                                            </View>
                                        </View>
                                    </View>
                                    <View style={styles.horizontalLine} />

                                    <Text style={styles.textContent}>สถานะ&nbsp;:&nbsp;กำลังแก้ไข&nbsp;</Text>

                                    {showData.map((data, index) => (
                                        data.rp_status === 0 && (
                                            <View key={index} style={styles.table}>
                                                <View style={styles.tableRow}>
                                                    <View style={styles.tableCol}>
                                                        <Text style={styles.tableCellData}>{index + 1}</Text>
                                                    </View>
                                                    <View style={styles.tableCol}>
                                                        <Text style={styles.tableCellData}>{data.house_no}</Text>
                                                    </View>
                                                    <View style={styles.tableCol}>
                                                        <Text style={styles.tableCellData}>{data.user_name} {data.user_lastname}</Text>
                                                    </View>
                                                    <View style={styles.tableCol}>
                                                        <Text style={styles.tableCellData}>{data.rp_problem_details}&nbsp;&nbsp;&nbsp;</Text>
                                                    </View>
                                                    <View style={styles.tableCol}>
                                                        <Text style={styles.tableCellData}>{DateTimeFormat(data.rp_problem_date)}</Text>
                                                    </View>
                                                </View>
                                            </View>
                                        )
                                    ))}

                                    <View style={styles.horizontalLineDotted} />
                                    <View style={styles.row}>
                                        <Text style={styles.textFrontRow}>รวมรายการกำลังแก้ไข&nbsp;&nbsp;</Text>
                                        <Text style={styles.textNumberRow}>{filteredDataPending.length}</Text>
                                        <Text style={styles.textBehindRow}>รายการ</Text>
                                    </View>
                                    <View style={styles.horizontalLineDotted} />
                                </>
                            ) : null
                        ) : null}

                        {tempStatus === 'default' || tempStatus === 'resolved' ? (
                            filteredDataResolved && filteredDataResolved.length > 0 ? (
                                <>
                                    <View style={styles.horizontalLine} />
                                    <View style={styles.table}>
                                        <View style={styles.tableRow}>
                                            <View style={styles.tableCol}>
                                                <Text style={styles.tableCell}>ลำดับ&nbsp;</Text>
                                            </View>
                                            <View style={styles.tableCol}>
                                                <Text style={styles.tableCell}>บ้านเลขที่</Text>
                                            </View>
                                            <View style={styles.tableCol}>
                                                <Text style={styles.tableCell}>ชื่อผู้แจ้ง&nbsp;</Text>
                                            </View>
                                            <View style={styles.tableCol}>
                                                <Text style={styles.tableCell}>รายละเอียดการแจ้ง&nbsp;&nbsp;</Text>
                                            </View>
                                            <View style={styles.tableCol}>
                                                <Text style={styles.tableCell}>วันที่แจ้ง&nbsp;</Text>
                                            </View>
                                            <View style={styles.tableCol}>
                                                <Text style={styles.tableCell}>รายละเอียดการแก้ไข&nbsp;&nbsp;</Text>
                                            </View>
                                            <View style={styles.tableCol}>
                                                <Text style={styles.tableCell}>วันที่แก้ไข&nbsp;</Text>
                                            </View>
                                        </View>
                                    </View>
                                    <View style={styles.horizontalLine} />

                                    <Text style={styles.textContent}>สถานะ&nbsp;:&nbsp;แก้ไขแล้ว&nbsp;</Text>

                                    {showData.map((data, index) => (
                                        data.rp_status === 1 && (
                                            <View key={index} style={styles.table}>
                                                <View style={styles.tableRow}>
                                                    <View style={styles.tableCol}>
                                                        <Text style={styles.tableCellData}>{index + 1}</Text>
                                                    </View>
                                                    <View style={styles.tableCol}>
                                                        <Text style={styles.tableCellData}>{data.house_no}</Text>
                                                    </View>
                                                    <View style={styles.tableCol}>
                                                        <Text style={styles.tableCellData}>{data.user_name} {data.user_lastname}</Text>
                                                    </View>
                                                    <View style={styles.tableCol}>
                                                        <Text style={styles.tableCellData}>{data.rp_problem_details}&nbsp;</Text>
                                                    </View>
                                                    <View style={styles.tableCol}>
                                                        <Text style={styles.tableCellData}>{DateTimeFormat(data.rp_problem_date)}</Text>
                                                    </View>
                                                    <View style={styles.tableCol}>
                                                        <Text style={styles.tableCellData}>{data.rp_solved_details}&nbsp;</Text>
                                                    </View>
                                                    <View style={styles.tableCol}>
                                                        <Text style={styles.tableCellData}>{DateTimeFormat(data.rp_solved_date)}</Text>
                                                    </View>
                                                </View>
                                            </View>
                                        )
                                    ))}

                                    <View style={styles.horizontalLineDotted} />
                                    <View style={styles.row}>
                                        <Text style={styles.textFrontRow}>รวมรายการแก้ไขแล้ว&nbsp;&nbsp;</Text>
                                        <Text style={styles.textNumberRow}>{filteredDataResolved.length}</Text>
                                        <Text style={styles.textBehindRow}>รายการ</Text>
                                    </View>
                                    <View style={styles.horizontalLineDotted} />
                                </>
                            ) : null
                        ) : null}

                        {tempStatus === 'default' && (
                            <>
                                <View style={styles.row}>
                                    <Text style={styles.textFrontRow}>รวมรายการแจ้งปัญหา&nbsp;&nbsp;</Text>
                                    <Text style={styles.textNumberRow}>{filteredDataReportProblem.length}</Text>
                                    <Text style={styles.textBehindRow}>รายการ</Text>
                                </View>
                                <View style={styles.horizontalLineDotted} />
                            </>
                        )}

                    </>
                )}

            </Page>
        </Document>
    )
};

export default DocReport;
