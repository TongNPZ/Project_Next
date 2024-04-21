import Swal from 'sweetalert2'

export function InsertSuccessfully() {
    return Swal.fire({
        icon: "success",
        title: "เพิ่มข้อมูลสำเร็จ!",
        confirmButtonText: "ตกลง",
        confirmButtonColor: "#a5dc86",
    });
}

export function ConfirmInsert() {
    return Swal.fire({
        icon: "question",
        title: "คุณต้องการเพิ่มข้อมูลใช่ไหม?",
        showCancelButton: true,
        confirmButtonText: "ตกลง",
        confirmButtonColor: "#87adbd",
        cancelButtonText: "ยกเลิก"
    });
}

export function ConfirmCancel() {
    return Swal.fire({
        icon: "question",
        title: "คุณต้องการยกเลิกใช่ไหม?",
        showCancelButton: true,
        confirmButtonText: "ตกลง",
        confirmButtonColor: "#87adbd",
        cancelButtonText: "ยกเลิก"
    });
}

export function ConfirmRestore() {
    return Swal.fire({
        icon: "question",
        title: "คุณต้องการคืนค่าใช่ไหม?",
        text: "ข้อมูลทั้งหมดจะคืนเป็นค่าเริ่มต้น",
        showCancelButton: true,
        confirmButtonText: "ตกลง",
        confirmButtonColor: "#87adbd",
        cancelButtonText: "ยกเลิก"
    });
}