import GetRequest from '@/app/ConfigAPI';
import { API_REPORT_PROBLEM } from '../../../../../api';
import {
    Success,
    ConfirmDelete
} from '@/app/componnent/SweetAlertComponent/ResponseMessage'


export default function RemoveData(id) {
    ConfirmDelete().then((result) => {
        if (result.isConfirmed) {
            const removeData = async () => {
                try {
                    const response = await GetRequest(`${API_REPORT_PROBLEM}/${id}`, 'DELETE', null);

                    if (response.message === 'Delete Successfully!') {
                        Success("ลบข้อมูลสำเร็จ!")
                    }
                } catch (error) {
                    console.log('error', error);
                }
            }

            removeData()
        }
    })
}