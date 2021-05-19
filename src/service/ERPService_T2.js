import axios from 'axios'
import env from '../environment'

axios.defaults.baseURL = env.apiBaseUrl;
let token = JSON.parse(localStorage.getItem('jerp_logged_user')) ? JSON.parse(localStorage.getItem('jerp_logged_user')).accessToken : null
let token_type = JSON.parse(localStorage.getItem('jerp_logged_user')) ? JSON.parse(localStorage.getItem('jerp_logged_user')).token_type : null

export default class PostService_T2 {

    getToken() {
        token = JSON.parse(localStorage.getItem('jerp_logged_user')) ? JSON.parse(localStorage.getItem('jerp_logged_user')).accessToken : null
        token_type = JSON.parse(localStorage.getItem('jerp_logged_user')) ? JSON.parse(localStorage.getItem('jerp_logged_user')).token_type : null
    }

    async getSpecialOrdersRequestPendingApprovalList() {
        this.getToken()

        let web_url = '/api/web/get-special-orders-request-pending-approval-list'
        return await axios(web_url, {
            method: 'GET',
            headers: {
                'Authorization': token_type + ' ' + token
            }
        })
    }

    async getSpecialRequestOrderDetail() {
        this.getToken()

        let web_url = 'api/web/get-special-request-order-detail';
        return await axios(web_url, {
            method: 'GET',
            headers: {
                'Authorization': token_type + ' ' + token
            }
        })
    }

}