import React from 'react';
import THBText from 'thai-baht-text'
import { DateFormat } from '@/app/Format';
import { API_URL } from '../../../../app';
import { Document, Page, Text, View, StyleSheet, Font, Image } from '@react-pdf/renderer';

// Date
const currentDate = new Date();


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
        alignItems: 'center',
        marginHorizontal: 12,
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
    textContentRow: {
        fontSize: 8,
        width: '15%',
        marginHorizontal: 5,
        marginBottom: 5,
    },
    textNumberRow: {
        fontSize: 8,
        textAlign: 'right',
        width: '10%',
        marginHorizontal: '10%',
        marginBottom: 5,
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
        width: '12.5%',
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

const DocReport = ({ showData, activeKey, search, tempStatus, startDate, endStart, housingEstate }) => {
    const filteredDataVacant = showData.filter(data => data.h_status === 1);
    const filteredDataBook = showData.filter(data => data.h_status === 2);
    const filteredDataContract = showData.filter(data => data.h_status === 3);
    const filteredDataTransfer = showData.filter(data => data.h_status === 4);
    const filteredDataSold = showData.filter(data => data.h_status === 5);
    const filteredDataCancel = showData.filter(data => data.h_status === 0);

    const totalPriceSold = filteredDataSold.reduce((sum, data) => {
        return sum + parseFloat(data.price);
    }, 0);

    const totalPriceSoldFormatted = totalPriceSold.toLocaleString();

    return (
        <Document>
            <Page size="A4" style={styles.body}>
                <View style={styles.contentHeading}>
                    <Text style={[styles.textHeading, { marginRight: 3 }]}>หน้า</Text>
                    <Text style={styles.textHeading} render={({ pageNumber }) => (
                        `${pageNumber}`
                    )} fixed />
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
                        ) : (
                            <Text style={styles.title}>ทดสอบ</Text>
                        )}
                    </div>
                ))}

                <Text style={styles.textContent}>ประเภทรายงาน&nbsp;:&nbsp;{tempStatus === 'default' ? 'ทั้งหมด' : tempStatus}{search !== 'default' ? `, ค้นหา : เฉพาะที่มีรายการ${search}` : null}</Text>
                <View style={styles.horizontalLine} />
                <View style={styles.table}>
                    <View style={styles.tableRow}>
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
                            <Text style={styles.tableCell}>ราคาบ้านพร้อมที่ดิน</Text>
                        </View>
                    </View>
                </View>
                <View style={styles.horizontalLine} />

                {filteredDataVacant && filteredDataVacant.length > 0 ? (
                    <>
                        <Text style={styles.textContent}>สถานะ&nbsp;:&nbsp;ว่าง</Text>
                        {showData.map((data) => (
                            data.h_status === 1 && (
                                <View style={styles.table}>
                                    <View style={styles.tableRow}>
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
                                            <Text style={styles.tableCellData}>{parseFloat(data.price).toLocaleString()}</Text>
                                        </View>
                                    </View>
                                </View>
                            )
                        ))}
                        <View style={styles.horizontalLineDotted} />
                        <View style={styles.row}>
                            <Text style={styles.textContentRow}>รวมจำนวนบ้านที่ว่าง&nbsp;&nbsp;</Text>
                            <Text style={styles.textNumberRow}>{filteredDataVacant.length}</Text>
                            <Text style={styles.textContentRow}>หลัง</Text>
                        </View>
                        <View style={styles.horizontalLineDotted} />
                    </>
                ) : null}

                {filteredDataBook && filteredDataBook.length > 0 ? (
                    <>
                        <Text style={styles.textContent}>สถานะ&nbsp;:&nbsp;จอง</Text>
                        {showData.map((data) => (
                            data.h_status === 2 && (
                                <View style={styles.table}>
                                    <View style={styles.tableRow}>
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
                                            <Text style={styles.tableCellData}>{parseFloat(data.price).toLocaleString()}</Text>
                                        </View>
                                    </View>
                                </View>
                            )
                        ))}
                        <View style={styles.horizontalLineDotted} />
                        <View style={styles.row}>
                            <Text style={styles.textContentRow}>รวมจำนวนบ้านที่จอง&nbsp;&nbsp;</Text>
                            <Text style={styles.textNumberRow}>{filteredDataBook.length}</Text>
                            <Text style={styles.textContentRow}>หลัง</Text>
                        </View>
                        <View style={styles.horizontalLineDotted} />
                    </>
                ) : null}

                {filteredDataContract && filteredDataContract.length > 0 ? (
                    <>
                        <Text style={styles.textContent}>สถานะ&nbsp;:&nbsp;ทำสัญญา&nbsp;</Text>
                        {showData.map((data) => (
                            data.h_status === 3 && (
                                <View style={styles.table}>
                                    <View style={styles.tableRow}>
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
                                            <Text style={styles.tableCellData}>{parseFloat(data.price).toLocaleString()}</Text>
                                        </View>
                                    </View>
                                </View>
                            )
                        ))}
                        <View style={styles.horizontalLineDotted} />
                        <View style={styles.row}>
                            <Text style={styles.textContentRow}>รวมจำนวนบ้านที่ทำสัญญา&nbsp;&nbsp;</Text>
                            <Text style={styles.textNumberRow}>{filteredDataContract.length}</Text>
                            <Text style={styles.textContentRow}>หลัง</Text>
                        </View>
                        <View style={styles.horizontalLineDotted} />
                    </>
                ) : null}

                {filteredDataTransfer && filteredDataTransfer.length > 0 ? (
                    <>
                        <Text style={styles.textContent}>สถานะ&nbsp;:&nbsp;โอนกรรมสิทธิ์&nbsp;</Text>
                        {showData.map((data) => (
                            data.h_status === 4 && (
                                <View style={styles.table}>
                                    <View style={styles.tableRow}>
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
                                            <Text style={styles.tableCellData}>{parseFloat(data.price).toLocaleString()}</Text>
                                        </View>
                                    </View>
                                </View>
                            )
                        ))}
                        <View style={styles.horizontalLineDotted} />
                        <View style={styles.row}>
                            <Text style={styles.textContentRow}>รวมจำนวนบ้านที่โอนกรรมสิทธิ์&nbsp;&nbsp;</Text>
                            <Text style={styles.textNumberRow}>{filteredDataTransfer.length}</Text>
                            <Text style={styles.textContentRow}>หลัง</Text>
                        </View>
                        <View style={styles.horizontalLineDotted} />
                    </>
                ) : null}

                {filteredDataSold && filteredDataSold.length > 0 ? (
                    <>
                        <Text style={styles.textContent}>สถานะ&nbsp;:&nbsp;ขายแล้ว&nbsp;</Text>
                        {showData.map((data) => (
                            data.h_status === 5 && (
                                <View style={styles.table}>
                                    <View style={styles.tableRow}>
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
                                            <Text style={styles.tableCellData}>{parseFloat(data.price).toLocaleString()}</Text>
                                        </View>
                                    </View>
                                </View>
                            )
                        ))}
                        <View style={styles.horizontalLineDotted} />
                        <View style={styles.row}>
                            <Text style={styles.textContentRow}>รวมจำนวนบ้านที่ขายแล้ว&nbsp;&nbsp;</Text>
                            <Text style={styles.textNumberRow}>{filteredDataSold.length}</Text>
                            <Text style={styles.textContentRow}>หลัง</Text>
                        </View>
                        <View style={styles.row}>
                            <Text style={styles.textContentRow}>รวมจำนวนราคาบ้านที่ขายแล้ว&nbsp;&nbsp;</Text>
                            <Text style={styles.textNumberRow}>{totalPriceSoldFormatted}</Text>
                            <Text style={styles.textContentRow}>บาท</Text>
                        </View>
                        <View style={styles.horizontalLineDotted} />
                    </>
                ) : null}

                {filteredDataCancel && filteredDataCancel.length > 0 ? (
                    <>
                        <Text style={styles.textContent}>สถานะ&nbsp;:&nbsp;ยกเลิกขาย&nbsp;</Text>
                        {showData.map((data) => (
                            data.h_status === 5 && (
                                <View style={styles.table}>
                                    <View style={styles.tableRow}>
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
                                            <Text style={styles.tableCellData}>{parseFloat(data.price).toLocaleString()}</Text>
                                        </View>
                                    </View>
                                </View>
                            )
                        ))}
                        <View style={styles.horizontalLineDotted} />
                        <View style={styles.row}>
                            <Text style={styles.textContentRow}>รวมจำนวนบ้านที่ยกเลิกขาย&nbsp;&nbsp;</Text>
                            <Text style={styles.textNumberRow}>{filteredDataCancel.length}</Text>
                            <Text style={styles.textContentRow}>หลัง</Text>
                        </View>
                        <View style={styles.horizontalLineDotted} />
                    </>
                ) : null}

            </Page>
        </Document>
    )
};

export default DocReport;
