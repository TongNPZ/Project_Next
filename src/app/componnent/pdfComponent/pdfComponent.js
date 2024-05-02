import React from 'react';
import { Document, Page, Text, View, StyleSheet, Font, Image } from '@react-pdf/renderer';

Font.register({
    family: 'Sarabun',
    src: 'https://fonts.gstatic.com/s/sarabun/v1/DtVhJxerLmt6ZKu6aZBf.ttf'
});

const styles = StyleSheet.create({
    body: {
        paddingTop: 35,
        paddingBottom: 65,
        paddingHorizontal: 35,
    },
    title: {
        fontSize: 18,
        textAlign: 'center',
        textDecoration: 'underline',
    },
    text: {
        margin: 5,
        fontSize: 12,
        textAlign: 'justify',
    },
    projecttext: {
        paddingTop: 30,
        margin: 15,
        fontSize: 12,
        textAlign: 'justify',
        marginLeft: 70,
    },
    datetext: {
        paddingTop: 10,
        margin: 5,
        fontSize: 12,
        textAlign: 'right',
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
        border: '2pt solid black',
    },
    checkboxText: {
        fontSize: 12,
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
        paddingHorizontal: 10, // ร
    },
    note: {
        marginTop: 20,
        textAlign: 'center',
        fontSize: 8,

    },
});

const MyDocument = () => (
    <Document>
        <Page size="A4" style={styles.body}>
            <Image
                style={styles.logo}
                src="/images/Logo.png"
            />
            <Text style={styles.title}>Temporary receipt</Text>
            <Text style={styles.projecttext}>Project....................................................................</Text>
            <Text style={styles.datetext}>Date...........................................</Text>
            <Text style={styles.text}>Received money from........................................................................................................................
            </Text>
            <Text style={styles.text}>Address.............................................................................................................................................
            </Text>
            <Text style={styles.text}>Tel.................................According to contract number........................................Plot........................
            </Text>

            <View style={styles.checkboxContainer}>
                <View style={styles.checkbox} />
                <Text style={styles.checkboxText}>Reserve money</Text>
                <View style={styles.checkbox} />
                <Text style={styles.checkboxText}>Contract money</Text>
                <View style={styles.checkbox} />
                <Text style={styles.checkboxText}>Down payment..........................</Text>
                <View style={styles.checkbox} />
                <Text style={styles.checkboxText}>Addition</Text>
            </View>
           
            <View style={styles.checkboxContainer}>
                <View style={styles.checkbox} />
                <Text style={styles.checkboxText}>Cash money     </Text>
                <View style={styles.checkbox} />
                <Text style={styles.checkboxText}>Bank check....................Branch...................Number...............Date............</Text>
            </View>
            <View style={styles.checkboxContainer}>
                <View style={styles.checkbox} />
                <Text style={styles.checkboxText}>Remaining money</Text>
            </View>

            <View style={styles.checkboxContainer}>
            <Text style={styles.checkboxText}>Amount of money..........................................Baht
            </Text>
            <View style={styles.rectangle} />
            </View>
 
         
            <View style={styles.row}>
            <View style={styles.signatureContainer}>
                <Text style={styles.text}>sign................................................manager</Text>
                <Text style={styles.text}>( ...................................... )</Text>
            </View>
            <View style={styles.signatureContainer}>
                <Text style={styles.text}>sign................................................Payee</Text>
                <Text style={styles.text}>( ...................................... )</Text>
            </View>
            </View>

            <Text style={styles.note}>Note:This receipt will be considered complete when it is signed by the manager and the recipient, and when the company has successfully collected the payment as per the check.
            </Text>
            <Text style={styles.pageNumber} render={({ pageNumber, totalPages }) => (
                `${pageNumber} / ${totalPages}`
            )} fixed />
        </Page>
    </Document>
);

export default MyDocument;
