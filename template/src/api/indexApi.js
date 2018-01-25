import axios from 'axios'
import ConfigUrl from '@/util/configUrl'
const apiUrl = ConfigUrl.getApiUrl();
export default {
	getCateInfo(){
		return axios.get(`${apiUrl.CMS_SERVICE_URL}${apiUrl.CLASSIFY_URL}`)
	}
}
