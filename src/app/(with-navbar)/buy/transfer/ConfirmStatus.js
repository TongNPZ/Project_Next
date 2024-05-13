import GetRequest from '@/app/ConfigAPI';
import { API_TRANSFER_CONFIRM } from '../../../../../api';
import {
    Success,
    ConfirmChanged
} from '@/app/componnent/SweetAlertComponent/ResponseMessage'


export default function ConfirmStatus(id) {
    ConfirmChanged().then((result) => {
        if (result.isConfirmed) {
            const confirmStatus = async () => {
                try {
                    const response = await GetRequest(`${API_TRANSFER_CONFIRM}/${id}`, 'PATCH', null);

                    if (response.message === 'Update Successfully!') {
                        Success("โอนกรรมสิทธิ์สำเร็จ!")
                    }
                } catch (error) {
                    console.log('error', error);
                }
            }

            confirmStatus()
        }
    })
}