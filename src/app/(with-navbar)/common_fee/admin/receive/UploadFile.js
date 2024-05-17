import GetRequest from '@/app/ConfigAPI';
import { API_RECEIVE_COMMON_FEE } from '../../../../../../api';
import {
    Success,
    ConfirmUpload,
} from '../../../../componnent/SweetAlertComponent/ResponseMessage.js'

export default function UploadFile(id, file) {
    ConfirmUpload().then((result) => {
        if (result.isConfirmed) {
            const UpdateFile = async () => {
                try {
                    const formdata = new FormData();
                    formdata.append("id", id);
                    formdata.append("rcfReceipt", file);

                    const response = await GetRequest(API_RECEIVE_COMMON_FEE, 'PATCH', formdata);

                    if (response.message === 'Update Successfully!') {
                        Success("อัพโหลดไฟล์สำเร็จ!")
                    }
                } catch (error) {
                    console.log('error', error);
                }
            }

            UpdateFile();
        }
    });
}