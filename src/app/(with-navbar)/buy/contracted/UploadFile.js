import GetRequest from '@/app/ConfigAPI';
import { API_CONTRACT } from '../../../../../api';
import {
    Success,
    ConfirmUpload,
} from '@/app/componnent/SweetAlertComponent/ResponseMessage'

export default function UploadFile(id, contractFile, receiptFile) {

    console.log('contract: ', contractFile)
    console.log('receipt: ', receiptFile)
    ConfirmUpload().then((result) => {
        if (result.isConfirmed) {
            const UpdateFile = async () => {
                try {
                    const formdata = new FormData();
                    formdata.append("id", id);

                    if (contractFile !== null) {
                        formdata.append("contract", contractFile);
                    }

                    if (receiptFile !== null) {
                        formdata.append("conReceipt", receiptFile);
                    }

                    const response = await GetRequest(API_CONTRACT, 'PATCH', formdata);

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