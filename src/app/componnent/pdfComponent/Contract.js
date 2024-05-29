import React from 'react';
import THBText from 'thai-baht-text'
import { DateFormat } from '@/app/Format';
import { Document, Page, Text, View, StyleSheet, Font, Image } from '@react-pdf/renderer';
import { API_URL } from '../../../../app';

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
    signatureContainer: {
        marginTop: 20,
        // flexDirection: 'row',
        justifyContent: 'center', // จัดให้เนื้อหาตรงกลางแนวนอน
        alignItems: 'center', // จัดให้เนื้อหาตรงกลางแนวตั้ง
    },
    signatureImage: {
        width: '130px',
        // height: '50px',
        paddingBottom: 1,
        textAlign: 'center',
    },
    textSignature: {
        marginTop: 5,
        fontSize: 10,
        // textAlign: 'justify',
    },
    lineSignature: {
        fontSize: 10,
        // paddingLeft: '5%',
        // paddingRight: '5%',
        // borderBottomWidth: 1,
        // borderBottomColor: 'black',
        // borderStyle: 'dotted',
    },
    text: {
        marginTop: 5,
        marginBottom: 2,
        fontSize: 10,
        textAlign: 'justify',
    },
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        // marginBottom: 5
    },

});

const DocContract = ({ housingEstate, contract }) => (
    <Document>
        <Page size="A4" style={styles.body}>
            <View style={styles.contentHeading} fixed>
                <Text style={[styles.textHeading, { marginRight: 3, marginBottom: 3 }]}>หน้า</Text>
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
                            ทั้งสองฝ่ายได้ตกลงทำสัญญากันมีข้อความดังต่อไปนี้&nbsp;
                        </Text>
                        <Text style={[styles.textContent, styles.textWithIndent]}>
                            ข้อ1.&nbsp;ผู้จะขายตกลงจะขายและผู้จะซื้อตกลงจะซื้อที่ดิน โฉนดที่ดินเลขที่ {contract.num_deed} หน้าสำรวจ {contract.num_survey} หมู่บ้าน{data.name} บ้านเลขที่ {data.address} (แปลงเลขที่ {contract.house_no}) ขนาดเนื้อที่ประมาณ {contract.hLand_space} ตารางวา ในราคา {parseFloat(contract.price).toLocaleString()} บาท ({THBText(contract.price)}) หากภายหลังปรากฏว่าที่ดินเพิ่มขึ้นหรือลดลงจากที่ระบุไว้ตามสัญญานี้ คู่สัญญาตกลงเพิ่มหรือลดเงินในราคาตารางวาละ {parseFloat(contract.land_price).toLocaleString()} บาท ({THBText(contract.land_price)})
                        </Text>
                        <Text style={[styles.textContent, styles.textWithIndent]}>
                            ข้อ2.&nbsp;ผู้จะซื้อตกลงชำระเงินมัดจำค่าที่ดินให้แก่ผู้จะขายและผู้จะขายได้รับเงินมัดจำดังกล่าวไว้แล้วเป็นเงิน&nbsp;{parseFloat(contract.b_amount).toLocaleString()} บาท&nbsp;({THBText(contract.b_amount)})&nbsp;และในวันทำสัญญานี้ผู้จะซื้อได้ชำระเงินจำนวน&nbsp;{parseFloat(contract.con_amount).toLocaleString()}&nbsp;บาท&nbsp;ส่วนที่เหลืออีกจำนวน&nbsp;{parseFloat((contract.price - contract.b_amount) - contract.con_amount).toLocaleString()}&nbsp;บาท&nbsp; ({THBText((contract.price - contract.b_amount) - contract.con_amount)})&nbsp;ชำระภายในวันโอนหรือภายในเจ็ดวันหลังจากได้รับแจ้งให้ไปชำระส่วนที่เหลือและทำนิติกรรม&nbsp;&nbsp;
                            รับโอนกรรมสิทธิ์ที่ดินตั๋วเงินหรือตราสารใดๆนอกจากชำระด้วยเงินสดแล้วจะถือว่าผู้จะซื้อได้ชำระเสร็จเรียบร้อยแล้ว&nbsp;ในงวดนั้นๆ&nbsp;&nbsp;&nbsp;&nbsp;
                            ต่อเมื่อเช็คตั๋วเงินหรือตราสารใดๆนั้นขึ้นเงินและผ่านเข้าบัญชีของผู้จะขายเรียบร้อยแล้ว&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
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
                            ไม่เป็นการตัดสิทธิของผู้จะขายในอันที่จะเรียกร้องค่าเสียหายอันเกิดจากการผิดสัญญาได้&nbsp;ในการที่ผู้จะขายได้ผ่อนผันในการกำหนด&nbsp;&nbsp;&nbsp;&nbsp;
                            ระยะเวลาต่างๆตามสัญญานี้ไม่ทำให้สิทธิต่างๆตามสัญญานี้ที่ผู้จะขายมีอยู่เสียไป&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;

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
                            ลายลักษณ์อักษรต่อผู้จะขายและผู้จะขอรับโอนสิทธิเรียกร้องจะต้องปฏิบัติตามสัญญานี้ทุกประการในการโอนสิทธิดังกล่าวผู้จะซื้อ&nbsp;
                            ยินยอมชำระค่าธรรมเนียมและค่าใช้จ่ายให้แก่ผู้จะขายเป็นจำนวนเงิน&nbsp;5,000&nbsp;บาท&nbsp;(ห้าพันบาทถ้วน)&nbsp;&nbsp;&nbsp;
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
                            ข้อ10.&nbsp;เพื่อเป็นการรักษาความเป็นระเบียบเรียบร้อยของอาคารบ้านพักอาศัยในโครงการหากผู้จะซื้อจะทำการปลูกสร้างบ้านพัก
                            อาศัยลงที่ดินจะต้องว่าจ้าง {data.company} หรือผู้หนึ่งผู้ใดที่ผู้จะขายเห็นสมควรเป็นผู้รับจ้างปลูกสร้างบ้านพัก
                            อาศัยตามแบบแปลนที่ผู้ขายกำหนดหากสัญญาจ้างเหมาฉบับลงวันที่ {DateFormat(data.con_record)} ซึ่งผู้ซื้อทำไว้กับ {data.company} เพื่อพัฒนาและปลูกสร้างบ้านบนที่ดินตามสัญญานี้เป็นอันระงับสิ้นไปโดยให้ถือว่าผู้จะซื้อเป็นฝ่ายผิดสัญญาฉบับ
                            นี้ด้วยและผู้จะขายมีสิทธิริบเงินที่ผู้จะซื้อได้ชำระไว้ทั้งหมด&nbsp;
                        </Text>
                        <Text style={[styles.textContent, styles.textWithIndent]}>
                            ข้อ11.&nbsp;ผู้จะซื้อจะต้องปลูกสร้างอาคารพักอาศัยภายในกำหนด&nbsp;3&nbsp;ปี&nbsp;นับจากวันที่โอนกรรมสิทธิ์นี้&nbsp;ถ้าหากผู้จะซื้อไม่ปลูกสร้างอาคาร&nbsp;
                            พักอาศัยภายในกำหนดเวลาดังกล่าวข้างต้นผู้จะซื้อยินยอมจ่ายบำรุงรักษาสาธารณูปโภคและบริการต่างๆที่ได้มีการจัดเก็บขึ้นโดยไม่มี&nbsp;&nbsp;
                            ข้อโต้แย้งใดๆทั้งสิ้นหรือผู้ซื้อจะยินยอมให้ผู้จะขายซื้อที่ดินคืนจากผู้ซื้อตามราคาเดิมที่ตกลงกันตามสัญญานี้ก็ได้การเลือก&nbsp;&nbsp;
                            ใช้ในกรณีใดกรณีหนึ่งข้างต้นนี้คู่สัญญาตกลงกันว่าสิทธิเด็ดขาดในการเลือกใช้มอบให้แก่ผู้จะขาย
                        </Text>
                        <Text style={[styles.textContent, styles.textWithIndent]}>
                            ข้อ12.&nbsp;โดยที่ผู้จะขายและผู้จะซื้อต่างมีเจตนารมณ์ที่จะให้ที่ดินในบริเวณแห่งนี้เป็นถิ่นที่อยู่อาศัยชั้นดี&nbsp;มีความสวยงาม&nbsp;
                            และเป็นระเบียบเรียบร้อย&nbsp;อีกทั้งเพื่อประโยชน์สุขของผู้จะซื้อและผู้อาศัยทั้งหลาย&nbsp;คู่สัญญาทั้งสองฝ่ายต่างตกลงให้ข้อความต่อไปนี้เป็น&nbsp;
                            สาระสำคัญของสัญญานี้ด้วย&nbsp;ซึ่งถ้าคู่สัญญาฝ่ายหนึ่งฝ่ายใดประพฤติผิดสัญญาข้อนี้เพียงข้อหนึ่งข้อใดคู่สัญญาอีกฝ่ายหนึ่งมีสิทธิบอกเลิก&nbsp;
                            สัญญาได้ทันที่&nbsp;&nbsp;&nbsp;&nbsp;
                        </Text>
                        <Text style={[styles.textContent, styles.textWithIndent]}>
                            ข้อ12.1&nbsp;ผู้จะซื้อสัญญาว่าจะนำที่ดินที่ซื้อไปปลูกสร้างอาคารเป็นที่อยู่อาศัยโดยปฏิบัติตามความในข้อ10.&nbsp;เท่านั้นและจะไม่นำที่&nbsp;
                            ดินหรืออาคารไปใช้ประโยชน์อย่างอื่นเช่นอุตสาหกรรม&nbsp;พาณิชยกรรม&nbsp;หรือเพื่อประกอบการ&nbsp;หอพัก&nbsp;โรงแรม&nbsp;ร้านค้า&nbsp;ร้านอาหาร&nbsp;ภัตตาคาร&nbsp;
                            โกดังสินค้า&nbsp;อู่ซ่อมรถ&nbsp;อุปกรณ์เครื่องจักรกลทุกชนิดหรือประกอบการอื่นใดที่ขัดต่อความสงบเรียบร้อยหรือศีลธรรมอันดีของประชาชน&nbsp;
                            ขัดเทศบัญญัติหรือขัดต่อกฎหมายบ้านเมือง&nbsp;&nbsp;&nbsp;
                        </Text>
                        <Text style={[styles.textContent, styles.textWithIndent]}>
                            ข้อ12.2&nbsp;ผู้จะซื้อสัญญาว่าจะไม่ทำการติดป้ายหรือแผงโฆษณาหรือข้อความอื่นใดในทางการโฆษณากับตัวอาคารหรือบริเวณที่อยู่&nbsp;
                            อาศัย&nbsp;บริเวณถนน&nbsp;ทางเดิน&nbsp;หรือที่สาธารณะ&nbsp;อันเป็นต่อการขัดต่อเจตนารมณ์ของที่พัฒนาแห่งนี้&nbsp;&nbsp;&nbsp;
                        </Text>
                        <Text style={[styles.textContent, styles.textWithIndent]}>
                            ข้อ12.3&nbsp;ผู้จะซื้อรับว่าจะไม่ใช้ถนน&nbsp;ทางเดิน&nbsp;หรือที่สาธารณะในการแข่งขันรถยนต์&nbsp;รถจักรยานยนต์รถจักรยานหรือยานพาหนะอื่น&nbsp;
                            ใดอันจะก่อให้เกิดอันตรายต่อชีวิต&nbsp;ร่างกาย&nbsp;อนามัย&nbsp;เสรีภาพ&nbsp;ทรัพย์สิน&nbsp;หรือสิทธิอย่างหนึ่งอย่างใดของบุคคลอื่น
                        </Text>
                        <Text style={[styles.textContent, styles.textWithIndent]}>
                            ข้อ12.4&nbsp;ผู้ซื้อรับว่ารั้วรอบโครงการเป็นกรรมสิทธิ์ของผู้จะขาย&nbsp;ผู้จะซื้อจะรื้อทำลายหรือเปลี่ยนแปลงสภาพด้วยประการใดๆมิได้&nbsp;
                        </Text>
                        <Text style={[styles.textContent, styles.textWithIndent]}>
                            ข้อ12.5&nbsp;เพื่ออำนวยและคุ้มครองประโยชน์แก่ผู้จะซื้อเป็นส่วนรวม&nbsp;ผู้จะซื้อจะต้องไม่ใช้หรือยินยอมให้บริวารของผู้จะซื้อหรือผู้อื่น&nbsp;
                            ใช้ที่ดินหรือส่วนหนึ่งส่วนใดของที่ดินที่จะซื้อจะขายเป็นทางผ่านเข้าไปในหรือไปนอกเขตที่ดินที่จะซื้อจะขายหรือเป็นทางผ่านไปใช้ถนน&nbsp;
                            ซอยถนนในบริเวณหรือนอกบริเวณที่ดินซึ่งผู้จะขายพัฒนาอยู่รวมทั้งต้องไม่ให้หรือยินยอมให้ผู้อื่นใช้&nbsp;เพื่อการติดตั้ง&nbsp;วางสายและ/ฝังท่อ
                            สำหรับการไฟฟ้า&nbsp;น้ำประปา&nbsp;โทรศัพท์&nbsp;ทางระบายน้ำตลอดจนสาธารณูปโภคอื่นใดบนพื้นดินด้วย&nbsp;ทั้งนี้เว้นแต่จะได้รับความยินยอมจาก
                            ผู้จะขายเป็นลายลักษณ์อักษรก่อน&nbsp;&nbsp;&nbsp;&nbsp;
                        </Text>
                        <Text style={[styles.textContent, styles.textWithIndent]}>
                            ข้อ12.6&nbsp;หากผู้จะซื้อมีความจำเป็นจะต้องจำหน่ายจ่ายโอนกรรมสิทธิ์ในที่ดิน&nbsp;หรือสิ่งปลูกสร้างพร้อมที่ดินให้แก่บุคคลอื่น&nbsp;
                            ให้ผู้จะซื้อแจ้งความประสงค์เป็นลายลักษณ์อักษรต่อผู้จะขาย&nbsp;และผู้จะซื้อต้องแจ้งให้ผู้รับโอนกรรมสิทธิ์ทราบถึงระเบียบข้อบังคับ&nbsp;
                            ต่างๆของผู้จะขาย&nbsp;ซึ่งรับโอนกรรมสิทธิ์จะต้องยอมรับปฏิบัติสัญญานี้เป็นลายลักษณ์อักษรทุกประการด้วย&nbsp;&nbsp;
                        </Text>
                        <Text style={[styles.textContent, styles.textWithIndent]}>
                            ข้อ12.7&nbsp;ผู้จะขายหรือตัวแทนของผู้จะขายมีอำนาจห้ามมิให้ยานพาหนะของผู้จะซื้อ&nbsp;บริวาร&nbsp;หรือลูกจ้างของผู้จะซื้อหรือ&nbsp;บุคคลอื่นใด&nbsp;
                            ที่ฝ่าฝืนระเบียบข้อบังคับ&nbsp;เกี่ยวกับการรักษาความปลอดภัยของผู้จะขายผ่านเข้าออกบริเวณที่อยู่อาศัยจนกว่าจะได้ปฏิบัติให้ถูกต้องตาม&nbsp;
                            ระเบียบข้อบังคับ&nbsp;
                        </Text>
                        <Text style={[styles.textContent, styles.textWithIndent]}>
                            ข้อ12.8&nbsp;ผู้จะซื้อสัญญาว่าจะดูแลสัตว์เลี้ยงไม่ก่อให้เกิดความรำคาญเดือดร้อนแก่ผู้อื่น&nbsp;&nbsp;
                        </Text>
                        <Text style={[styles.textContent, styles.textWithIndent]}>
                            ข้อ13.&nbsp;หากผู้จะซื้อผิดสัญญาข้อใดข้อหนึ่งให้ผู้จะขายมีสิทธิบอกเลิกสัญญาได้โดยผู้จะขายมีสิทธิริบเงินมัดจำและเงินต่างๆที่ผู้จะขาย
                            ได้รับชำระจากผู้จะซื้อได้ทั้งหมดทันที่โดยไม่ต้องมีการบอกกล่าวล่วงหน้าและผู้จะขายมีสิทธิเรียกร้องค่าเสียหายที่จะเกิดจากการผิดสัญญาข้อ&nbsp;
                            ใดข้อหนึ่งจากผู้จะซื้อได้&nbsp;&nbsp;
                        </Text>
                        <Text style={[styles.textContent, styles.textWithIndent]}>
                            ข้อ14.&nbsp;บรรดาเอกสารหนังสือและหนังสือบอกกล่าวใดๆที่ผู้จะขายมีถึงผู้จะซื้อตามที่อยู่ที่ปรากฏในสัญญานี้ให้ถือว่าผู้จะซื้อได้รับ&nbsp;
                            ทราบข้อความนั้นตลอดแล้วกรณีผู้จะซื้อย้ายที่อยู่หรือภูมิลำเนาให้เป็นหน้าที่ของผู้จะซื้อต้องแจ้งให้ผู้จะขายทราบเป็นหนังสือภายใน เจ็ดวันนับแต่วันที่ย้าย มิฉะนั้นให้ถือว่าบรรดาเอกสารหนังสือบอกกล่าวที่ส่งไปตามที่กล่าวในวรรคก่อนเป็นการส่งโดยชอบแล้ว&nbsp;
                        </Text>
                        <Text style={[styles.textContent, styles.textWithIndent]}>
                            สัญญานี้ทำขึ้นเป็นสองฉบับ&nbsp;มีข้อความถูกต้องตรงกันคู่สัญญาได้อ่านและเข้าใจข้อความในสัญญาโดยตลอดเห็น&nbsp;แล้วว่าตรง
                            กับเจตนาของทั้งสองฝ่าย&nbsp;จึงได้ลงลายมือชื่อไว้เป็นสำคัญต่อหน้าพยานพร้อมทั้งประทับตรา(ถ้ามี)และยึดถือไว้ฝ่ายละฉบับ&nbsp;&nbsp;
                        </Text>
                    </View>

                    {housingEstate.map((data, index) => (
                        <View key={index} style={styles.row}>
                            <View style={styles.signatureContainer}>
                                <View style={styles.container}>
                                    <Text style={styles.textSignature}>ลงชื่อ&nbsp;</Text>
                                    <View style={styles.lineSignature}>
                                        <Text>
                                        </Text>
                                        <Text style={styles.textSignature}>
                                            ..............................................................
                                        </Text>
                                    </View>
                                    <Text style={styles.textSignature}>ผู้จะขาย</Text>
                                </View>
                                <View style={styles.container}>
                                    <Text style={styles.text}>{data.company}&nbsp;&nbsp;</Text>
                                </View>
                                <View style={styles.container}>
                                    <Text style={styles.text}>{'('}</Text>
                                    <View style={styles.lineCustom}>
                                        <Text style={styles.text}>{data.md_name}</Text>
                                    </View>
                                    <Text style={styles.text}>{')'}</Text>
                                </View>
                                <View style={styles.container}>
                                    <Text style={styles.text}> กรรมการผู้จัดการ </Text>
                                </View>
                            </View>

                            <View style={styles.signatureContainer}>
                                <View style={styles.container}>
                                    <Text style={styles.textSignature}>ลงชื่อ&nbsp;</Text>
                                    <View style={styles.lineSignature}>
                                        <Text>
                                        </Text>
                                        <Text style={styles.textSignature}>
                                            ..............................................................
                                        </Text>
                                    </View>
                                    <Text style={styles.textSignature}>ผู้จะซื้อ</Text>
                                </View>
                                <View style={styles.container}>
                                </View>
                                <View style={styles.container}>
                                    <Text style={styles.text}>{'('}</Text>
                                    <View style={styles.lineCustom}>
                                        <Text style={styles.text}>{data.user_name} {data.user_lastname}</Text>
                                    </View>
                                    <Text style={styles.text}>{')'}</Text>
                                </View>
                            </View>

                            <View style={styles.signatureContainer}>
                                <View style={styles.container}>
                                    <Text style={styles.textSignature}>ลงชื่อ&nbsp;</Text>
                                    <View style={styles.lineSignature}>
                                        <Text>
                                        </Text>
                                        <Text style={styles.textSignature}>
                                            ..............................................................
                                        </Text>
                                    </View>
                                    <Text style={styles.textSignature}>พยาน</Text>
                                </View>
                                <View style={styles.container}>
                                    <Text style={styles.text}>{'('}</Text>
                                    <View style={styles.lineCustom}>
                                        <Text style={styles.text}>{contract.witnessone_name}</Text>
                                    </View>
                                    <Text style={styles.text}>{')'}</Text>
                                </View>
                            </View>

                            <View style={styles.signatureContainer}>
                                <View style={styles.container}>
                                    <Text style={styles.textSignature}>ลงชื่อ&nbsp;</Text>
                                    <View style={styles.lineSignature}>
                                        <Text>
                                        </Text>
                                        <Text style={styles.textSignature}>
                                            ..............................................................
                                        </Text>
                                    </View>
                                    <Text style={styles.textSignature}>พยาน</Text>
                                </View>
                                <View style={styles.container}>
                                    <Text style={styles.text}>{'('}</Text>
                                    <View style={styles.lineCustom}>
                                        <Text style={styles.text}>{contract.witnesstwo_name}</Text>
                                    </View>
                                    <Text style={styles.text}>{')'}</Text>
                                </View>
                            </View>
                        </View>
                    ))}
                </>
            ))}
        </Page>

        <Page size="A4" style={styles.body}>
            <View style={styles.contentHeading} fixed>
                <Text style={[styles.textHeading, { marginRight: 3 }]}>หน้า</Text>
                <Text style={styles.textHeading} render={({ pageNumber }) => `${pageNumber}`} />
            </View>
            <Text style={[styles.title]}>
                บันทึกสัญญาบริการสาธารณะ
            </Text>

            <View style={styles.contentHeading}>
                <Text style={styles.textHeading}>&nbsp;</Text>
            </View>

            {housingEstate.map((data) => (
                <>
                    <View key={data.he_id}>
                        <Text style={[styles.textContent, styles.textWithIndent]}>
                            เพื่อให้การพัฒนาที่ดินแห่งนี้เป็นที่อยู่อาศัยสมบูรณ์แบบ&nbsp;เพื่อประโยชน์สุขของผู้อยู่อาศัยเอง&nbsp;ผู้จะขายจะได้จัดให้มีบริการ&nbsp;
                            สาธารณะในบริเวณที่พัฒนาแห่งนี้&nbsp;เช่น&nbsp;ยามรักษาความปลอดภัย&nbsp;2&nbsp;ชั่งโมง&nbsp;การรักษาความสะอาดบริเวณโดยรอบพื้นที่สาธารณประโยชน์&nbsp;
                            ติดตั้งไฟถนนกับบำรุงรักษาถนนเมนและถนนซอยรักษาความสะอาดท่อระบายน้ำและดูแลรักษาสวนสาธารณะ&nbsp;โดยค่าใช้จ่าย&nbsp;
                            ในเรื่องบริการสาธารณะเหล่านี้&nbsp;จะเก็บจากผู้จะซื้อทุกรายเมื่อผู้จะซื้อได้รับโอนกรรมสิทธิ์ในที่ดินแปลงนี้&nbsp;หรือเมื่อผู้จะซื้อได้รับมอบสิทธิ&nbsp;
                            ในการเข้าใช้ประโยชน์โดยคิดตาม&nbsp;อัตราค่าบริการใหม่ต่อ&nbsp;3&nbsp;ปี&nbsp;(อัตราดังกล่าวอาจปรับเพิ่มขึ้นตามรายจ่ายที่เพิ่มขึ้น)&nbsp;และในอนาคตผู้จะ&nbsp;
                            ขายจะได้จัดตั้งชมรม&nbsp;หรือสมาคมของผู้อยู่อาศัยเพื่อดำเนินการต่อไป&nbsp;ซึ่งผู้จะซื้อสัญญาว่าจะสมัครเข้าเป็นสมาชิกของชมรมหรือ&nbsp;&nbsp;
                            สมาคมนับแต่วันลงนามใน&nbsp;ระเบียบข้อบังคับของชมรมหรือสมาคมที่จัดทำขึ้น&nbsp;&nbsp;&nbsp;&nbsp;
                        </Text>
                        <Text style={[styles.textContent, styles.textWithIndent]}>
                            กรณีผู้จะซื้อได้รับโอนกรรมสิทธิ์แล้วและมีความจำเป็นจะต้องจำหน่ายจ่ายโอนกรรมสิทธิ์&nbsp;ในที่ดินหรือสิ่งปลูกสร้างพร้อมที่ดินหรือ&nbsp;
                            ที่บุคคลใดเช่าแล้วผู้จะซื้อรับรองว่าจะให้ผู้รับโอนกรรมสิทธิ์หรือผู้เช่าสมัครเป็นสมาชิกของชมรมหรือสมาคมโดยรับภาระค่าใช้จ่ายและ&nbsp;
                            ปฏิบัติตามระเบียบข้อบังคับของชมรมหรือสมาคม
                        </Text>
                        <Text style={[styles.textContent, styles.textWithIndent]}>
                            สัญญานี้ทำขึ้นเป็นสองฉบับมีข้อความถูกต้องตรงกัน&nbsp;คู่สัญญาได้อ่านและเข้าใจข้อความในสัญญาโดยตลอดเห็นว่าตรงกับเจตนาของ
                            ทั้งสองฝ่าย&nbsp;จึงได้ลงลายมือชื่อไว้เป็นสำคัญต่อหน้าพยานพร้อมทั้งประทับตรา(ถ้ามี)และยึดถือไว้ฝ่ายละฉบับ&nbsp;&nbsp;&nbsp;
                        </Text>
                    </View>

                    {housingEstate.map((data, index) => (
                        <View key={index} style={styles.row}>
                            <View style={styles.signatureContainer}>
                                <View style={styles.container}>
                                    <Text style={styles.textSignature}>ลงชื่อ&nbsp;</Text>
                                    <View style={styles.lineSignature}>
                                        <Text>
                                        </Text>
                                        <Text style={styles.textSignature}>
                                            ..............................................................
                                        </Text>
                                    </View>
                                    <Text style={styles.textSignature}>ผู้จะขาย</Text>
                                </View>
                                <View style={styles.container}>
                                    <Text style={styles.text}>{data.company}&nbsp;&nbsp;</Text>
                                </View>
                                <View style={styles.container}>
                                    <Text style={styles.text}>{'('}</Text>
                                    <View style={styles.lineCustom}>
                                        <Text style={styles.text}>{data.md_name}</Text>
                                    </View>
                                    <Text style={styles.text}>{')'}</Text>
                                </View>
                                <View style={styles.container}>
                                    <Text style={styles.text}> กรรมการผู้จัดการ </Text>
                                </View>
                            </View>

                            <View style={styles.signatureContainer}>
                                <View style={styles.container}>
                                    <Text style={styles.textSignature}>ลงชื่อ&nbsp;</Text>
                                    <View style={styles.lineSignature}>
                                        <Text>
                                        </Text>
                                        <Text style={styles.textSignature}>
                                            ..............................................................
                                        </Text>
                                    </View>
                                    <Text style={styles.textSignature}>ผู้จะซื้อ</Text>
                                </View>
                                <View style={styles.container}>
                                </View>
                                <View style={styles.container}>
                                    <Text style={styles.text}>{'('}</Text>
                                    <View style={styles.lineCustom}>
                                        <Text style={styles.text}>{data.user_name} {data.user_lastname}</Text>
                                    </View>
                                    <Text style={styles.text}>{')'}</Text>
                                </View>
                            </View>

                            <View style={styles.signatureContainer}>
                                <View style={styles.container}>
                                    <Text style={styles.textSignature}>ลงชื่อ&nbsp;</Text>
                                    <View style={styles.lineSignature}>
                                        <Text>
                                        </Text>
                                        <Text style={styles.textSignature}>
                                            ..............................................................
                                        </Text>
                                    </View>
                                    <Text style={styles.textSignature}>พยาน</Text>
                                </View>
                                <View style={styles.container}>
                                    <Text style={styles.text}>{'('}</Text>
                                    <View style={styles.lineCustom}>
                                        <Text style={styles.text}>{contract.witnessone_name}</Text>
                                    </View>
                                    <Text style={styles.text}>{')'}</Text>
                                </View>
                            </View>

                            <View style={styles.signatureContainer}>
                                <View style={styles.container}>
                                    <Text style={styles.textSignature}>ลงชื่อ&nbsp;</Text>
                                    <View style={styles.lineSignature}>
                                        <Text>
                                        </Text>
                                        <Text style={styles.textSignature}>
                                            ..............................................................
                                        </Text>
                                    </View>
                                    <Text style={styles.textSignature}>พยาน</Text>
                                </View>
                                <View style={styles.container}>
                                    <Text style={styles.text}>{'('}</Text>
                                    <View style={styles.lineCustom}>
                                        <Text style={styles.text}>{contract.witnesstwo_name}</Text>
                                    </View>
                                    <Text style={styles.text}>{')'}</Text>
                                </View>
                            </View>
                        </View>
                    ))}
                </>
            ))}
        </Page>

    </Document >
);

export default DocContract;
