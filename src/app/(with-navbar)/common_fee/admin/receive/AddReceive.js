import GetRequest from '@/app/ConfigAPI';
import { API_RECEIVE_COMMON_FEE } from '../../../../../../api';
import {
    Success,
    ConfirmUpload,
} from '../../../../componnent/SweetAlertComponent/ResponseMessage.js'

export default function AddReceive(ncfId, file) {
    ConfirmUpload().then((result) => {
        if (result.isConfirmed) {
            const UpdateFile = async () => {
                try {
                    const formdata = new FormData();
                    formdata.append("rcfReceipt", file);
                    formdata.append("ncfId", ncfId);

                    const response = await GetRequest(API_RECEIVE_COMMON_FEE, 'POST', formdata);

                    if (response.message === 'Insert Successfully!') {
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