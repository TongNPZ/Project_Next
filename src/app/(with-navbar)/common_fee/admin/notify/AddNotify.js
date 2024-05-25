import GetRequest from '@/app/ConfigAPI';
import { API_NOTIFY_COMMON_FEE } from '../../../../../../api';
import {
    Success,
    ConfirmSend,
} from '../../../../componnent/SweetAlertComponent/ResponseMessage.js'

export default function AddNotify(hId, router) {
    ConfirmSend().then((result) => {

        if (result.isConfirmed) {
            const addData = async () => {
                try {
                    const raw = {
                        "hId": hId
                    };

                    const response = await GetRequest(API_NOTIFY_COMMON_FEE, 'POST', raw);

                    if (response.message === 'Insert Successfully!') {
                        Success("ส่งข้อมูลสำเร็จ!").then(() => router.push('/common_fee/admin/receive'))
                    }
                } catch (error) {
                    console.log('error', error);
                }
            }

            addData();
        }
    });
}