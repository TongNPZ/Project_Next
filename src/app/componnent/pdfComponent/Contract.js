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
            <View style={styles.contentHeading} fixed>
                <Text style={[styles.textHeading, { marginRight: 3 }]}>หน้า</Text>
                <Text style={styles.textHeading} render={({ pageNumber }) => `${pageNumber}`} />
            </View>

            <View style={styles.contentHeading}>
                <Text style={[styles.textHeading, { marginRight: 3 }]}>เลขที่สัญญา L </Text>
                <Text style={styles.textHeading}>{contract.con_number}</Text>
            </View>
            <Text style={styles.title}>สัญญาจะซื้อจะขายที่ดิน</Text>

            {housingEstate.map((data) => (
                <View key={data.he_id} style={styles.contentHeading}>
                    <Text style={styles.textHeading}>{formatAddress(data.md_address)}&nbsp;&nbsp;&nbsp;</Text>
                </View>
            ))}

            <Text style={[styles.textHeading, { textAlign: 'center', marginBottom: 20 }]}>วันที่ {DateFormat(currentDate)}</Text>

            {housingEstate.map((data) => (
                <>
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
                        <Text style={[styles.textContent, styles.textWithIndent]}>
                            ข้อ3. ผู้จะขายดำเนินการจดทะเบียนโอนกรรมสิทธิ์ในที่ดินตามสัญญานี้ให้แก่ผู้จะซื้อ เมื่อผู้จะซื้อชำระค่าที่ดินตาม&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            ข้อ2. ครบถ้วนเรียบร้อยแล้ว&nbsp;&nbsp;
                        </Text>
                        <Text style={[styles.textContent, styles.textWithIndent]}>
                            ข้อ4.&nbsp;หากผู้จะซื้อผิดนัดไม่ชำระราคาตามกำหนดใน&nbsp;ข้อ2.&nbsp;งวดหนึ่งงวดใดผู้จะซื้อจะต้องเสียดอกเบี้ยในระหว่างผิดนัดในอัตราร้อย&nbsp;
                            ละ&nbsp;2&nbsp;ต่อเดือน&nbsp;ของเงินที่จะต้องชำระแต่ละงวดให้แก่ผู้จะขาย&nbsp;&nbsp;&nbsp;
                        </Text>
                        <Text style={[styles.textContent, styles.textWithIndent]}>
                            ข้อ5.&nbsp;หากผู้จะซื้อผิดนัดไม่ชำระราคาตามกำหนดในข้อ2.&nbsp;รวมสองงวดติดกันให้ถือว่าผู้จะซื้อตกเป็นฝ่ายผิดสัญญาและให้ผู้&nbsp;
                            จะขายมีสิทธิบอกเลิกสัญญาได้และเมื่อผู้จะขายใช้สิทธิบอกเลิกสัญญาแล้วให้ผู้จะขายริบเงินมัดจำและเงินที่ผ่อนชำระได้ทั้งหมดทั้งที่&nbsp;&nbsp;&nbsp;
                            ไม่เป็นการตัดสิทธิของผู้จะขายในอันที่จะเรียกร้องค่าเสียหายอันเกิดจากการผิดสัญญาได้&nbsp;ในการที่ผู้จะขายได้ผ่อนผันในการกำหนดระยะเวลา
                            ต่างๆตามสัญญานี้ไม่ทำให้สิทธิต่างๆตามสัญญานี้ที่ผู้จะขายมีอยู่เสียไป&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;

                        </Text>
                        <Text style={[styles.textContent, styles.textWithIndent]}>
                            ข้อ6.&nbsp;ในระหว่างที่ผู้จะซื้อชำระเงินให้แก่ผู้จะขายไม่เสร็จเรียบร้อยตาม&nbsp;ข้อ2.&nbsp;หรือผิดนัดไม่ชำระตาม&nbsp;ข้อ4.&nbsp;ผู้จะซื้อจะ&nbsp;
                            ไม่นำอสังหาริมทรัพย์จะซื้อจะขายตามสัญญานี้ไปให้ผู้อื่นเช่าโดยตรงหรือปริยายหรือทำนิติกรรมใดๆอันเกี่ยวกับอสังหาริมทรัพย์ดัง&nbsp;&nbsp;&nbsp;
                            กล่าวกับผู้อื่นอันเป็นผลผูกพันในอสังหาริมทรัพย์เป็นอันขาด&nbsp;รวมทั้งไม่ก่อให้เกิดความเสียหายแก่ผู้จะขายหรือเจ้าของอสังหาริมทรัพย์&nbsp;&nbsp;&nbsp;
                            ข้างเคียงด้วยประการใดๆทั้งสิ้น&nbsp;&nbsp;&nbsp;&nbsp;
                        </Text>
                    </View>

                    <View key={data.he_id}>
                        <Text style={[styles.textContent, styles.textWithIndent]}>
                            ข้อ7.&nbsp;หากผู้จะซื้อมีความจำเป็นต้องโอนสิทธิเรียกร้องตามสัญญาจะซื้อจะขายให้แก่บุคคลอื่นให้ผู้จะซื้อแจ้งความประสงค์เป็น&nbsp;
                            ลายลักษณ์อักษรต่อผู้จะขายและผู้จะขอรับโอนสิทธิเรียกร้องจะต้องปฏิบัติตามสัญญานี้ทุกประการในการโอนสิทธิดังกล่าวผู้จะซื้อยินยอม&nbsp;
                            ชำระค่าธรรมเนียมและค่าใช้จ่ายให้แก่ผู้จะขายเป็นจำนวนเงิน&nbsp;5,000&nbsp;บาท&nbsp;(ห้าพันบาทถ้วน)&nbsp;&nbsp;&nbsp;
                        </Text>
                        <Text style={[styles.textContent, styles.textWithIndent]}>
                            ข้อ8.&nbsp;หลักฐานในการโอนกรรมสิทธิ์และค่าใช้จ่ายในการทำนิติกรรม&nbsp;ผู้จะซื้อจะต้องนำหลักฐานในการโอนกรรมสิทธิ์อันได้แก่&nbsp;
                            สำเนาบัตรประจำตัวประชาชน&nbsp;หรือบัตรข้าราชการ&nbsp;หรือบัตรพนักงานรัฐวิสาหกิจ&nbsp;สำเนาทะเบียนบ้าน(ทุกหน้า)และสำเนาทะเบียนสมรส&nbsp;
                            หรือทะเบียนหย่า(แล้วแต่กรณี)&nbsp;มามอบให้แก่ผู้จะขายภายใน&nbsp;30&nbsp;วัน&nbsp;นับแต่วันทำสัญญาฉบับนี้&nbsp;หากมีการเปลี่ยนแปลง&nbsp;รายการทางทะ&nbsp;
                            เบียนในเอกสารดังกล่าว&nbsp;ผู้จะซื้อจะต้องนำมามอบให้แก่ผู้จะขายภายใน&nbsp;3&nbsp;เดือนก่อนการชำระเงินงวดสุดท้ายซึ่ง&nbsp;ผู้จะซื้อมีหน้าที่&nbsp;
                            ต้องชำระค่าธรรมเนียม&nbsp;ภาษีอากร&nbsp;ภาษีเงินได้ภาษีธุรกิจเฉพาะ&nbsp;ค่าอากรแสตมป์ในการทำนิติกรรมและค่า&nbsp;ใช้จ่ายต่างๆในการโอนกรรม
                            สิทธิ์ที่สำนักงานที่ดินโดยเตรียมเงินสดมาชำระในวันโอนกรรมสิทธิ์&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        </Text>
                        <Text style={[styles.textContent, styles.textWithIndent]}>
                            ข้อ9.&nbsp;ผู้จะซื้อสัญญาว่า&nbsp;ถ้าผู้จะขายได้แจ้งให้ผู้จะซื้อไปชำระเงินและจดทะเบียนรับโอนกรรมสิทธิ์ที่ดินเมือใดแล้ว&nbsp;หรือให้ผู้จะซื้อ&nbsp;
                            ส่งมอบเอกสารต่างๆเพื่อใช้ในการจดทะเบียนรับโอนกรรมสิทธิ์ผู้จะซื้อจะต้องปฏิบัติตามทุกประการหากผู้จะซื้อไม่ไปรับโอนกรรมสิทธิ์&nbsp;
                            หรือไม่ดำเนินการตามที่กล่าว&nbsp;ให้ถือว่าผู้จะซื้อตกเป็นฝ่ายผิดสัญญาและให้ผู้จะขายมีสิทธิ์&nbsp;บอกเลิกสัญญาได้&nbsp;และเมื่อผู้จะขายบอก&nbsp;
                            เลิกสัญญาแล้วให้ผู้จะขายริบเงินมัดจำและเงินที่ผ่อนชำระไว้ทั้งหมดทั้งนี้ไม่เป็นการตัดสิทธิของผู้จะขายในอันที่เรียกว่าร้องค่าเสียหาย
                            อันเกิดจากการผิดสัญญาได้&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        </Text>
                        <Text style={[styles.textContent, styles.textWithIndent]}>
                            ข้อ10.&nbsp;เพื่อเป็นการรักษาความเป็นระเบียบเรียบร้อยของอาคารบ้านพักอาศัยในโครงการหากผู้จะซื้อจะทำการปลูกสร้างบ้าน
                            พักอาศัยลงที่ดินจะต้องว่าจ้าง&nbsp;{data.company}&nbsp;หรือผู้หนึ่งผู้ใดที่ผู้จะขายเห็นสมควรเป็นผู้รับจ้างปลูกสร้างบ้านพักอาศัยตามแบบแปลนที่ผู้ขายกำหนดหากสัญญาจ้างเหมาฉบับลง{data.con_record}ซึ่งผู้ซื้อทำไว้กับ&nbsp;{data.company}&nbsp;
                        </Text>
                    </View>
                </>

            ))}
        </Page>
    </Document>
);

export default DocContract;
