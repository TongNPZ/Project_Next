import {
    Error,
    Warning
} from '@/app/componnent/SweetAlertComponent/ResponseMessage'

export default async function GetRequest(host, method, body) {
    try {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Authorization", "Bearer " + localStorage.getItem('token'));

        var requestOptions = {
            method: method,
            headers: myHeaders,
            body: body,
            redirect: 'follow'
        };

        if (body !== null) {
            if (body instanceof FormData) {
                myHeaders.delete("Content-Type");
                requestOptions.body = body;
            } else {
                requestOptions.body = JSON.stringify(body);
            }
        }

        const response = await fetch(host, requestOptions);

        let data

        if (response.status === 204) {
            Warning(
                "ข้อมูลไม่มีการเปลี่ยนแปลง!",
                null
            )
        } else if (response.status === 500) {
            Error(
                "เกิดข้อผิดพลาดเกี่ยวกับเซิร์ฟเวอร์!",
                "กรุณาลองใหม่อีกครั้ง"
            )
        } else {
            data = await response.json();
        }

        if (!response.ok) {
            if (data.message === 'Bad Request!') {
                Error(
                    "คำขอที่ส่งมาไม่ถูกต้อง!",
                    "กรุณากรอกข้อมูลใหม่อีกครั้ง (หมายเหตุ ช่องกรอกตัวเลขห้ามกรอกเลข 0)"
                )
            } else if (data.message === 'Failed To Insert Data!') {
                Error(
                    "เกิดข้อผิดพลาดในการเพิ่มข้อมูล!",
                    "กรุณาตรวจสอบและกรอกข้อมูลใหม่อีกครั้ง"
                )
            } else if (data.message === 'Failed To Update Data!') {
                Error(
                    "เกิดข้อผิดพลาดในการแก้ไขข้อมูล!",
                    "กรุณาตรวจสอบและกรอกข้อมูลใหม่อีกครั้ง"
                )
            } else if (data.message === 'Not Found Data!') {
                Error(
                    "ไม่พบข้อมูล!",
                    "กรุณากรอกหรือเลือกข้อมูลใหม่อีกครั้ง"
                )
            } else if (data.message === 'Data already exists!') {
                Warning(
                    "ข้อมูลนี้มีอยู่ในระบบแล้ว!",
                    "กรุณาตรวจสอบและกรอกข้อมูลใหม่อีกครั้ง"
                )
            } else {
                throw new Error(response.message);
            }
        }

        return data

    } catch (error) {
        console.error('Error Calling API: ', error);
        throw error;
    }
}