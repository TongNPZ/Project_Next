import React from 'react';
import { Document, Page, Text, View, StyleSheet, Font } from '@react-pdf/renderer';
// import THSarabunBold from './THSarabunBold.ttf';
// const fontUrl = process.env.PUBLIC_URL + '/font/THSarabunBold.ttf';
// import fontDev from '/font/THSarabunBold.ttf';

Font.register({
    family: 'Sarabun', src: '/font/THSarabunBold.ttf'
}); // ลงทะเบียนแบบอักษร

const styles = StyleSheet.create({
    page: {
        flexDirection: 'row',
        backgroundColor: '#E4E4E4',
        padding: 20,
        // fontFamily: 'Sarabun', // ระบุชื่อแบบอักษรที่ลงทะเบียนไว้

    },
    section: {
        margin: 10,
        padding: 10,
        flexGrow: 1,
    },
    text: {
        marginBottom: 10,
        textAlign: 'center',
        // fontFamily: 'Sarabun', // ระบุชื่อแบบอักษรที่ลงทะเบียนไว้
    }

});

const MyDocument = () => (
    <Document>
        <Page size="A4" style={styles.page}>
            <View style={styles.section}>
                <Text style={styles.text}>ใบรับเงินชั่วคราว</Text>
                <Text style={styles.text}>Date: {new Date().toLocaleDateString()}</Text>
                <Text style={styles.text}>Amount: $100</Text>
            </View>
        </Page>
    </Document>
);

export default MyDocument;