import Swal from 'sweetalert2'

export function Success(title) {
    return Swal.fire({
        icon: "success",
        title: title,
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

export function ConfirmUpdate() {
    return Swal.fire({
        icon: "warning",
        title: "คุณต้องการแก้ไขข้อมูลใช่ไหม?",
        showCancelButton: true,
        confirmButtonText: "ตกลง",
        confirmButtonColor: "#f8bb86",
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

export function Error(title, text) {
    return Swal.fire({
        icon: "error",
        title: title,
        text: text,
        confirmButtonText: "ตกลง",
        confirmButtonColor: "#f27474",
    });
}

export function Warning(title, text) {
    return Swal.fire({
        icon: "warning",
        title: title,
        text: text,
        confirmButtonText: "ตกลง",
        confirmButtonColor: "#f8bb86",
    });
}