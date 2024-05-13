import GetRequest from '@/app/ConfigAPI';
import { API_TRANSFER_CANCEL } from '../../../../../api';
import {
    Success,
    ConfirmChanged
} from '@/app/componnent/SweetAlertComponent/ResponseMessage'


export default function CancelStatus(id) {
    ConfirmChanged().then((result) => {
        if (result.isConfirmed) {
            const cancelStatus = async () => {
                try {
                    const response = await GetRequest(`${API_TRANSFER_CANCEL}/${id}`, 'PATCH', null);

                    if (response.message === 'Update Successfully!') {
                        Success("เปลี่ยนสถานะสำเร็จ!")
                    }
                } catch (error) {
                    console.log('error', error);
                }
            }

            cancelStatus()
        }
    })
}