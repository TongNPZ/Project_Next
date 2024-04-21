import Swal from 'sweetalert2'

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
        const data = await response.json();

        if (!response.ok) {
            if (data.message === 'Failed To Insert Data!') {
                Swal.fire({
                    icon: "error",
                    title: "เกิดข้อผิดพลาดในการเพิ่มข้อมูล!",
                    text: "กรุณากรอกข้อมูลใหม่อีกครั้ง",
                    confirmButtonText: "ตกลง",
                    confirmButtonColor: "#f27474",
                });
            } else if (data.message === 'Data already exists!') {
                Swal.fire({
                    icon: "warning",
                    title: "ข้อมูลนี้มีอยู่ในระบบแล้ว!",
                    text: "กรุณาตรวจสอบและกรอกข้อมูลใหม่อีกครั้ง",
                    confirmButtonText: "ตกลง",
                    confirmButtonColor: "#f8bb86",
                });
            } else if (data.message === 'Bad Request!') {
                Swal.fire({
                    icon: "error",
                    title: "คำขอที่ส่งมาไม่ถูกต้อง!",
                    text: "กรุณากรอกข้อมูลใหม่อีกครั้ง (หมายเหตุ บางช่องห้ามมีค่าว่าง และช่องกรอกตัวเลขห้ามกรอกเลข 0)",
                    confirmButtonText: "ตกลง",
                    confirmButtonColor: "#f27474",
                });
            } else {
                throw new Error(response.message);
            }
        }

        if (response.status === 204) {
            Swal.fire({
                icon: "warning",
                title: "ข้อมูลไม่มีการเปลี่ยนแปลง!",
                confirmButtonText: "ตกลง",
                confirmButtonColor: "#f8bb86",
            });
        }

        return data

    } catch (error) {
        console.error('Error Calling API: ', error);
        throw error;
    }
}