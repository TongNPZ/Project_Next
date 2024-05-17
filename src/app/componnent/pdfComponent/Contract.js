import React from 'react';
import THBText from 'thai-baht-text'
import { DateFormat } from '@/app/Format';
import { Document, Page, Text, View, StyleSheet, Font } from '@react-pdf/renderer';

// Date
const currentDate = new Date();

// function
function formatAddress(address) {
    const splitAddress = address.split('อำเภอ');
    const formattedAddress = splitAddress.join('\nอำเภอ');
    return formattedAddress;
}

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
    title: {
        fontFamily: 'SarabunBold',
        fontSize: 14,
        textAlign: 'center',
        marginBottom: 20,
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
    textWithIndent: {
        textIndent: '1cm',
    },
    textContent: {
        fontSize: 10,
        marginBottom: 5,
        textAlign: 'justify',
        lineHeight: '1.8', // กำหนดระยะห่างระหว่างบรรทัดที่นี่

    },
    textContentBold: {
        fontFamily: 'SarabunBold',
        fontSize: 10,
    },
    textSubContent: {
        fontSize: 10,
        lineHeight: '1.8', // กำหนดระยะห่างระหว่างบรรทัดที่นี่
        // textAlign: 'justify',
    },

});

const DocContract = ({ housingEstate, contract }) => (
    <Document>
        <Page size="A4" style={styles.body}>
            <View style={styles.contentHeading}>
                <Text style={[styles.textHeading, { marginRight: 3 }]}>หน้า</Text>
                <Text style={styles.textHeading} render={({ pageNumber }) => (
                    `${pageNumber}`
                )} fixed />
            </View>
            <View style={styles.contentHeading}>
                <Text style={[styles.textHeading, { marginRight: 3 }]}>เลขที่สัญญา L </Text>
                <Text style={styles.textHeading}>{contract.con_numLandSale}</Text>
            </View>
            <Text style={styles.title}>สัญญาจะซื้อจะขายที่ดิน</Text>

            {housingEstate.map((data) => (
                <View key={data.he_id} style={styles.contentHeading}>
                    <Text style={styles.textHeading}>{formatAddress(data.md_address)}&nbsp;&nbsp;&nbsp;</Text>
                </View>
            ))}

            <Text style={[styles.textHeading, { textAlign: 'center', marginBottom: 20 }]}>วันที่ {DateFormat(currentDate)}</Text>

            {housingEstate.map((data) => (
                <View key={data.he_id}>
                    <Text style={[styles.textContent, styles.textWithIndent]}>
                        ก.&nbsp;{data.company} โดย {data.md_name} กรรมการผู้จัดการ สัญชาติ {data.md_nationality} บ้านเลขที่ {data.md_address} โทร. {data.phone} ซึ่งต่อไปในสัญญานี้จะเรียกว่า "ผู้จะขาย" ฝ่ายหนึ่งกับ
                    </Text>
                    <Text style={[styles.textContent, styles.textWithIndent]}>
                        ข.&nbsp;{contract.user_name} {contract.user_lastname} อายุ {contract.user_age} ปี สัญชาติ {contract.nationality} {contract.user_address} โทรศัพท์ {contract.user_phone} ถือบัตรประชาชนเลขที่ {contract.user_id} ออกโดย กระทรวงมหาดไทย ซึ่งต่อไปในสัญญานี้จะเรียกว่า "ผู้จะซื้อ" ฝ่ายหนึ่ง
                    </Text>
                    <Text style={[styles.textContent, styles.textWithIndent]}>
                        ทั้งสองฝ่ายได้ตกลงทำสัญญากันมีข้อความดังต่อไปนี้
                    </Text>
                    <Text style={[styles.textContent, styles.textWithIndent]}>
                        ข้อ1.&nbsp;ผู้จะขายตกลงจะขายและผู้จะซื้อตกลงจะซื้อที่ดิน โฉนดที่ดินเลขที่ {contract.num_deed} หน้าสำรวจ {contract.num_survey} หมู่บ้าน{data.name} บ้านเลขที่ {data.address} (แปลงเลขที่ {contract.house_no}) ขนาดเนื้อที่ประมาณ {contract.hLand_space} ตารางวา ในราคา {parseFloat(contract.price).toLocaleString()} บาท ({THBText(contract.price)}) หากภายหลังปรากฏว่าที่ดินเพิ่มขึ้นหรือลดลงจากที่ระบุไว้ตามสัญญานี้ คู่สัญญาตกลงเพิ่มหรือลดเงินในราคาตารางวาละ {parseFloat(contract.land_price).toLocaleString()} บาท ({THBText(contract.land_price)})
                    </Text>
                    <Text style={[styles.textContent, styles.textWithIndent]}>
                        ข้อ2.&nbsp;ผู้จะซื้อตกลงชำระเงินมัดจำค่าที่ดินให้แก่ผู้จะขายและผู้จะขายได้รับเงินมัดจำดังกล่าวไว้แล้วเป็นเงิน&nbsp;{parseFloat(contract.b_amount).toLocaleString()} บาท&nbsp;({THBText(contract.b_amount)})&nbsp;และในวันทำสัญญานี้ผู้จะซื้อได้ชำระเงินจำนวน&nbsp;{parseFloat(contract.con_amount).toLocaleString()}&nbsp;บาท&nbsp;ส่วนที่เหลืออีกจำนวน&nbsp;{parseFloat((contract.price - contract.b_amount) - contract.con_amount).toLocaleString()}&nbsp;บาท&nbsp; ({THBText((contract.price - contract.b_amount) - contract.con_amount)})&nbsp;ชำระภายในวันโอนหรือภายในเจ็ดวันหลังจากได้รับแจ้งให้ไปชำระส่วนที่เหลือและ &nbsp;
                        ทำนิติกรรมรับโอนกรรมสิทธิ์ที่ดิน&nbsp;ตั๋วเงิน&nbsp;หรือตราสารใดๆ&nbsp;นอกจากชำระด้วยเงินสดแล้วจะถือว่าผู้จะซื้อได้ชำระเสร็จเรียบร้อยแล้ว ในงวดนั้นๆ
                        &nbsp;ต่อเมื่อเช็ค&nbsp;ตั๋วเงิน&nbsp;หรือตราสารใดๆ&nbsp;นั้นขึ้นเงิน&nbsp;และผ่านเข้าบัญชีของผู้จะขายเรียบร้อยแล้ว&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    </Text>
                </View>
            ))}
            {/* ชำระภายในวันโอนหรือภายในเจ็ดวันหลังจากได้รับแจ้งให้ไปชำระส่วนที่เหลือและทำนิติกรรมรับโอนกรรมสิทธิ์ที่ดิน จากผู้จะขายการชำระเงินหากชำระด้วยเช็ค ตั๋วเงิน หรือตราสารใดๆ  นอกจากชำระด้วยเงินสดแล้วจะถือว่าผู้จะซื้อได้ชำระเสร็จเรียบร้อยแล้วในงวดนั้นๆ ต่อเมื่อเช็ค ตั๋วเงิน หรือตราสารใดๆ นั้นขึ้นเงิน และผ่านเข้าบัญชีของผู้จะขายเรียบร้อยแล้ว &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; */}

        </Page>
    </Document>
);

export default DocContract;
