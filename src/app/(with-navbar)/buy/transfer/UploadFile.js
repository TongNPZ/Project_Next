import GetRequest from '@/app/ConfigAPI';
import { API_TRANSFER } from '../../../../../api';
import {
    Success,
    ConfirmUpload,
} from '@/app/componnent/SweetAlertComponent/ResponseMessage'

export default function UploadFile(id, file) {
    ConfirmUpload().then((result) => {
        if (result.isConfirmed) {
            const UpdateFile = async () => {
                try {
                    const formdata = new FormData();
                    formdata.append("id", id);
                    formdata.append("transReceipt", file);

                    const response = await GetRequest(API_TRANSFER, 'PATCH', formdata);

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