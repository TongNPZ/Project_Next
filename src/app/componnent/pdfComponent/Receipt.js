import React from 'react';
import THBText from 'thai-baht-text'
import { 
    DateFormatNum,
    DateFormat
 } from '@/app/Format';
import { API_URL } from '../../../../app';
import { Document, Page, Text, View, StyleSheet, Font, Image } from '@react-pdf/renderer';

// Date
const currentDate = new Date();

Font.register({
    family: 'Sarabun',
    src: '/font/Sarabun-Regular.ttf'
});

const styles = StyleSheet.create({
    body: {
        paddingTop: 35,
        paddingBottom: 65,
        paddingHorizontal: 35,
        fontFamily: 'Sarabun',
        fontWeight: 400,
        fontStyle: 'normal',
    },
    title: {
        fontSize: 18,
        textAlign: 'center',
        textDecoration: 'underline',
    },
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 5
    },
    text: {
        marginTop: 5,
        marginBottom: 5,
        fontSize: 12,
        textAlign: 'justify',
    },
    textContent: {
        fontSize: 10,
        textAlign: 'center',
    },
    textUnContent: {
        padding: 7,
    },
    line: {
        flex: 1,
        borderBottomWidth: 1,
        borderBottomColor: 'black',
        borderStyle: 'dotted',
    },
    lineCustom: {
        paddingLeft: '10%',
        paddingRight: '10%',
        borderBottomWidth: 1,
        borderBottomColor: 'black',
        borderStyle: 'dotted',
    },
    projecttext: {
        paddingTop: 30,
        fontSize: 12,
        textAlign: 'justify',
        marginLeft: 80,
    },
    projectContent: {
        paddingTop: 30,
        fontSize: 10,
        textAlign: 'center',
    },
    lineProject: {
        width: '40%',
        borderBottomWidth: 1,
        borderBottomColor: 'black',
        borderStyle: 'dotted',
    },
    datetext: {
        paddingTop: 10,
        marginLeft: 310,
        fontSize: 12,
    },
    dateContent: {
        paddingTop: 8,
        fontSize: 10,
        textAlign: 'center',
    },
    checkboxContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 5,
        marginBottom: 5,
    },
    checkbox: {
        width: 15,
        height: 15,
        marginRight: 5,
        marginLeft: 5,
        borderWidth: 1,
        borderColor: 'black',
        justifyContent: 'center',
        alignItems: 'center',
    },
    checkIcon: {
        width: 10,
        height: 10
    },
    checkboxText: {
        fontSize: 12,
        marginRight: 5
    },
    image: {
        marginVertical: 15,
        marginHorizontal: 100,
    },
    logo: {
        marginVertical: 15,
        marginHorizontal: 'auto',
        width: '150px',
        height: '100px',
    },
    header: {
        fontSize: 12,
        marginBottom: 20,
        textAlign: 'center',
        color: 'grey',
    },
    pageNumber: {
        position: 'absolute',
        fontSize: 12,
        bottom: 30,
        left: 0,
        right: 0,
        textAlign: 'center',
        color: 'grey',
    },
    rectangle: {
        width: 260,
        height: 30,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 5,
        marginLeft: 5,
        border: '2pt solid black',
    },
    signatureContainer: {
        marginTop: 20,
        // flexDirection: 'row',
        justifyContent: 'center', // จัดให้เนื้อหาตรงกลางแนวนอน
        alignItems: 'center', // จัดให้เนื้อหาตรงกลางแนวตั้ง
    },
    row: {
        marginTop: 20,
        flexDirection: 'row',
        justifyContent: 'space-between', // จัดให้เนื้อหาตรงกลางแนวนอน
    },
    note: {
        marginTop: 20,
        textAlign: 'left',
        fontSize: 8,

    },
});

const MyDocument = ({ housingEstate, book, contract, transfer, commonFee }) => (
    <Document>
        <Page size="A4" style={styles.body}>

            {housingEstate.map((data) => (
                <Image
                    key={data.he_id}
                    style={styles.logo}
                    src={`${API_URL}${data.image}`}
                />
            ))}

            <Text style={styles.title}>ใบรับเงินชั่วคราว</Text>

            {housingEstate.map((data) => (
                <View style={styles.container} key={data.he_id}>
                    <Text style={styles.projecttext}>โครงการ </Text>
                    <View style={styles.lineProject}>
                        <Text style={styles.projectContent}>{data.name}</Text>
                    </View>
                </View>
            ))}

            <View style={styles.container}>
                <Text style={styles.datetext}>วันที่</Text>
                <View style={styles.lineProject}>
                    <Text style={styles.dateContent}>{DateFormat(currentDate)}</Text>
                </View>
            </View>

            {book ? (
                <View style={styles.container}>
                    <Text style={styles.text}>ได้รับเงินจาก</Text>
                    <View style={styles.line}>
                        <Text style={styles.textContent}>{book.user_name} {book.user_lastname}</Text>
                    </View>
                </View>
            ) : contract ? (
                <View style={styles.container}>
                    <Text style={styles.text}>ได้รับเงินจาก</Text>
                    <View style={styles.line}>
                        <Text style={styles.textContent}>{contract.user_name} {contract.user_lastname}</Text>
                    </View>
                </View>
            ) : transfer ? (
                <View style={styles.container}>
                    <Text style={styles.text}>ได้รับเงินจาก</Text>
                    <View style={styles.line}>
                        <Text style={styles.textContent}>{transfer.user_name} {transfer.user_lastname}</Text>
                    </View>
                </View>
            ) : (
                <View style={styles.container}>
                    <Text style={styles.text}>ได้รับเงินจาก</Text>
                    <View style={styles.line}>
                        <Text style={styles.textContent}>{commonFee.user_name} {commonFee.user_lastname}</Text>
                    </View>
                </View>
            )}

            {book ? (
                <View style={styles.container}>
                    <Text style={styles.text}>ที่อยู่</Text>
                    <View style={styles.line}>
                        <Text style={styles.textContent}>{book.user_address}</Text>
                    </View>
                </View>
            ) : contract ? (
                <View style={styles.container}>
                    <Text style={styles.text}>ที่อยู่</Text>
                    <View style={styles.line}>
                        <Text style={styles.textContent}>{contract.user_address}</Text>
                    </View>
                </View>
            ) : transfer ? (
                <View style={styles.container}>
                    <Text style={styles.text}>ที่อยู่</Text>
                    <View style={styles.line}>
                        <Text style={styles.textContent}>{transfer.user_address}</Text>
                    </View>
                </View>
            ) : (
                <View style={styles.container}>
                    <Text style={styles.text}>ที่อยู่</Text>
                    <View style={styles.line}>
                        <Text style={styles.textContent}>{commonFee.user_address}</Text>
                    </View>
                </View>
            )}

            {book ? (
                <View style={[styles.container, { marginBottom: 5 }]}>
                    <Text style={styles.text}>โทรศัพท์</Text>
                    <View style={styles.line}>
                        <Text style={styles.textContent}>{book.user_phone}</Text>
                    </View>
                    <Text style={styles.text}>ตามสัญญาเลขที่</Text>
                    <View style={styles.line}>
                        <Text style={styles.textUnContent}></Text>
                    </View>
                    <Text style={styles.text}>แปลงที่</Text>
                    <View style={styles.line}>
                        <Text style={styles.textContent}>{book.house_no}</Text>
                    </View>
                </View>
            ) : contract ? (
                <View style={[styles.container, { marginBottom: 5 }]}>
                    <Text style={styles.text}>โทรศัพท์</Text>
                    <View style={styles.line}>
                        <Text style={styles.textContent}>{contract.user_phone}</Text>
                    </View>
                    <Text style={styles.text}>ตามสัญญาเลขที่</Text>
                    <View style={styles.line}>
                        <Text style={styles.textContent}>{contract.con_number}</Text>
                    </View>
                    <Text style={styles.text}>แปลงที่</Text>
                    <View style={styles.line}>
                        <Text style={styles.textContent}>{contract.house_no}</Text>
                    </View>
                </View>
            ) : transfer ? (
                <View style={[styles.container, { marginBottom: 5 }]}>
                    <Text style={styles.text}>โทรศัพท์</Text>
                    <View style={styles.line}>
                        <Text style={styles.textContent}>{transfer.user_phone}</Text>
                    </View>
                    <Text style={styles.text}>ตามสัญญาเลขที่</Text>
                    <View style={styles.line}>
                        <Text style={styles.textContent}>{transfer.con_number}</Text>
                    </View>
                    <Text style={styles.text}>แปลงที่</Text>
                    <View style={styles.line}>
                        <Text style={styles.textContent}>{transfer.house_no}</Text>
                    </View>
                </View>
            ) : (
                <View style={[styles.container, { marginBottom: 5 }]}>
                    <Text style={styles.text}>โทรศัพท์</Text>
                    <View style={styles.line}>
                        <Text style={styles.textContent}>{commonFee.user_phone}</Text>
                    </View>
                    <Text style={styles.text}>ตามสัญญาเลขที่</Text>
                    <View style={styles.line}>
                        <Text style={styles.textUnContent} />
                    </View>
                    <Text style={styles.text}>แปลงที่</Text>
                    <View style={styles.line}>
                        <Text style={styles.textContent}>{commonFee.house_no}</Text>
                    </View>
                </View>
            )}

            {book ? (
                <View style={styles.checkboxContainer}>
                    <View style={styles.checkbox}>
                        <Image src={`/images/check.png`} style={styles.checkIcon} />
                    </View>
                    <Text style={styles.checkboxText}>เงินจอง</Text>
                    <View style={styles.checkbox} />
                    <Text style={styles.checkboxText}>เงินทำสัญญา&nbsp;</Text>
                    <View style={styles.checkbox} />
                    <Text style={styles.checkboxText}>เงินส่วนที่เหลือ</Text>
                    <View style={styles.checkbox} />
                    <Text style={styles.checkboxText}>ค่าส่วนกลาง</Text>
                </View>
            ) : contract ? (
                <View style={styles.checkboxContainer}>
                    <View style={styles.checkbox} />
                    <Text style={styles.checkboxText}>เงินจอง</Text>
                    <View style={styles.checkbox}>
                        <Image src={`/images/check.png`} style={styles.checkIcon} />
                    </View>
                    <Text style={styles.checkboxText}>เงินทำสัญญา&nbsp;</Text>
                    <View style={styles.checkbox} />
                    <Text style={styles.checkboxText}>เงินส่วนที่เหลือ</Text>
                    <View style={styles.checkbox} />
                    <Text style={styles.checkboxText}>ค่าส่วนกลาง</Text>
                </View>
            ) : transfer ? (
                <View style={styles.checkboxContainer}>
                    <View style={styles.checkbox} />
                    <Text style={styles.checkboxText}>เงินจอง</Text>
                    <View style={styles.checkbox} />
                    <Text style={styles.checkboxText}>เงินทำสัญญา&nbsp;</Text>
                    <View style={styles.checkbox}>
                        <Image src={`/images/check.png`} style={styles.checkIcon} />
                    </View>
                    <Text style={styles.checkboxText}>เงินส่วนที่เหลือ</Text>
                    <View style={styles.checkbox} />
                    <Text style={styles.checkboxText}>ค่าส่วนกลาง</Text>
                </View>
            ) : (
                <View style={styles.checkboxContainer}>
                    <View style={styles.checkbox} />
                    <Text style={styles.checkboxText}>เงินจอง</Text>
                    <View style={styles.checkbox} />
                    <Text style={styles.checkboxText}>เงินทำสัญญา&nbsp;</Text>
                    <View style={styles.checkbox} />
                    <Text style={styles.checkboxText}>เงินส่วนที่เหลือ</Text>
                    <View style={styles.checkbox}>
                        <Image src={`/images/check.png`} style={styles.checkIcon} />
                    </View>
                    <Text style={styles.checkboxText}>ค่าส่วนกลาง</Text>
                </View>
            )}

            {book || contract || commonFee || !transfer.bank_name && !transfer.bank_branch && !transfer.bank_num && !transfer.bank_date ? (
                <View style={styles.checkboxContainer}>
                    <View style={styles.checkbox}>
                        <Image src={`/images/check.png`} style={styles.checkIcon} />
                    </View>
                    <Text style={styles.checkboxText}>เงินสด</Text>
                    <View style={[styles.checkbox, { marginLeft: 10 }]} />
                    <Text style={styles.text}>เช็ค ธนาคาร</Text>
                    <View style={styles.line}>
                        <Text style={styles.textUnContent}></Text>
                    </View>
                    <Text style={styles.text}>สาขา</Text>
                    <View style={styles.line}>
                        <Text style={styles.textUnContent}></Text>
                    </View>
                    <Text style={styles.text}>เลขที่</Text>
                    <View style={styles.line}>
                        <Text style={styles.textUnContent}></Text>
                    </View>
                    <Text style={styles.text}>วันที่</Text>
                    <View style={styles.line}>
                        <Text style={styles.textUnContent}></Text>
                    </View>
                </View>
            ) : (
                <View style={styles.checkboxContainer}>
                    <View style={styles.checkbox} />
                    <Text style={styles.checkboxText}>เงินสด</Text>
                    <View style={[styles.checkbox, { marginLeft: 10 }]}>
                        <Image src={`/images/check.png`} style={styles.checkIcon} />
                    </View>
                    <Text style={styles.text}>เช็ค ธนาคาร</Text>
                    <View style={styles.line}>
                        <Text style={styles.textContent}>{transfer.bank_name}</Text>
                    </View>
                    <Text style={styles.text}>สาขา</Text>
                    <View style={styles.line}>
                        <Text style={styles.textContent}>{transfer.bank_branch}</Text>
                    </View>
                    <Text style={styles.text}>เลขที่</Text>
                    <View style={styles.line}>
                        <Text style={styles.textContent}>{transfer.bank_num}</Text>
                    </View>
                    <Text style={styles.text}>วันที่</Text>
                    <View style={styles.line}>
                        <Text style={styles.textContent}>{DateFormatNum(transfer.bank_date)}</Text>
                    </View>
                </View>
            )}

            {book ? (
                <View style={styles.container}>
                    <Text style={styles.text}>จำนวนเงิน&nbsp;</Text>
                    <View style={styles.line}>
                        <Text style={styles.textContent}>{parseFloat(book.b_amount).toLocaleString()}</Text>
                    </View>
                    <Text style={styles.text}>บาท</Text>
                    <View style={styles.rectangle}>
                        <Text style={styles.text}>{THBText(book.b_amount)}</Text>
                    </View>
                </View>
            ) : contract ? (
                <View style={styles.container}>
                    <Text style={styles.text}>จำนวนเงิน&nbsp;</Text>
                    <View style={styles.line}>
                        <Text style={styles.textContent}>{parseFloat(contract.con_amount).toLocaleString()}</Text>
                    </View>
                    <Text style={styles.text}>บาท</Text>
                    <View style={styles.rectangle}>
                        <Text style={styles.text}>{THBText(contract.con_amount)}</Text>
                    </View>
                </View>
            ) : transfer ? (
                <View style={styles.container}>
                    <Text style={styles.text}>จำนวนเงิน&nbsp;</Text>
                    <View style={styles.line}>
                        <Text style={styles.textContent}>{parseFloat(transfer.trans_amount).toLocaleString()}</Text>
                    </View>
                    <Text style={styles.text}>บาท</Text>
                    <View style={styles.rectangle}>
                        <Text style={styles.text}>{THBText(transfer.trans_amount)}</Text>
                    </View>
                </View>
            ) : (
                <View style={styles.container}>
                    <Text style={styles.text}>จำนวนเงิน&nbsp;</Text>
                    <View style={styles.line}>
                        <Text style={styles.textContent}>{parseFloat(commonFee.ncf_amount).toLocaleString()}</Text>
                    </View>
                    <Text style={styles.text}>บาท</Text>
                    <View style={styles.rectangle}>
                        <Text style={styles.text}>{THBText(commonFee.ncf_amount)}</Text>
                    </View>
                </View>
            )}

            <View style={styles.row}>
                <View style={styles.signatureContainer}>
                    <Text style={styles.text}>ลงชื่อ................................................ผู้จัดการ</Text>

                    {housingEstate.map((data) => (
                        <View style={styles.container} key={data.he_id}>
                            <Text style={styles.text}>{'('}</Text>
                            <View style={styles.lineCustom}>
                                <Text style={styles.textContent}>{data.user_name} {data.user_lastname}</Text>
                            </View>
                            <Text style={styles.text}>{')'}</Text>
                        </View>
                    ))}

                </View>
                <View style={styles.signatureContainer}>
                    <Text style={styles.text}>ลงชื่อ................................................ผู้รับเงิน</Text>

                    {housingEstate.map((data) => (
                        <View style={styles.container} key={data.he_id}>
                            <Text style={styles.text}>{'('}</Text>
                            <View style={styles.lineCustom}>
                                <Text style={styles.textContent}>{data.md_name}</Text>
                            </View>
                            <Text style={styles.text}>{')'}</Text>
                        </View>
                    ))}

                </View>
            </View>

            <Text style={styles.note}>หมายเหตุ : ใบเสร็จรับเงินฉบับนี้ จะสมบูรณ์ต่อเมื่อมีลายเซ็นผู้จัดการและผู้รับเงิน และบริษัทฯ ได้เรียกเก็บเงินตามเช็คได้ครบถ้วนแล้ว
            </Text>
            <Text style={styles.pageNumber} render={({ pageNumber, totalPages }) => (
                `${pageNumber} / ${totalPages}`
            )} fixed />
        </Page>
    </Document>
);

export default MyDocument;
