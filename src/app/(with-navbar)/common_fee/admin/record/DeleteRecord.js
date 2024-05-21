import GetRequest from '@/app/ConfigAPI';
import { API_EXPENSES_COMMON_FEE } from '../../../../../../api';
import {
    Success,
    ConfirmDelete
} from '@/app/componnent/SweetAlertComponent/ResponseMessage'

export default function DeleteRecord(id) {
    ConfirmDelete().then((result) => {
        if (result.isConfirmed) {
            const deleteRecord = async () => {
                try {
                    const response = await GetRequest(`${API_EXPENSES_COMMON_FEE}/${id}`, 'DELETE', null);

                    if (response.message === 'Delete Successfully!') {
                        Success("ลบบันทึกสำเร็จ!!!")
                    }
                } catch (error) {
                    console.log('error', error);
                }
            }

            deleteRecord()
        }
    })
}