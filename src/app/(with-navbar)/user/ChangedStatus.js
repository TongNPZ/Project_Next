import GetRequest from '@/app/ConfigAPI';
import { GET_API_DATA_USER } from './../../../../api';
import {
    Success,
    ConfirmChanged
} from '@/app/componnent/SweetAlertComponent/ResponseMessage'


export default function ChangedStatus(id) {
    ConfirmChanged().then((result) => {
        if (result.isConfirmed) {
            const changedStatus = async () => {
                try {
                    const response = await GetRequest(`${GET_API_DATA_USER}/${id}`, 'PATCH', null);

                    if (response.message === 'Update Successfully!') {
                        Success("เปลี่ยนสถานะสำเร็จ!")
                    }
                } catch (error) {
                    console.log('error', error);
                }
            }

            changedStatus()
        }
    })
}