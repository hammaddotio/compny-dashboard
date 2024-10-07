export const URL = 'http://127.0.0.1:3000'
// export const URL = 'https://sexual-maressa-mady-1d683dc3.koyeb.app'
export const ADMIN_ID = '66fe9208d479d7c40fc55792'

export const REGISTER_URL = '/api/register'
export const LOGIN_URL = '/api/login'

export const STRIPE_PUBLISH_KEY = 'pk_test_51MMfFyHq3fTUJ2f2bRlEUMPv3Dcv2RWw9pgopbok9qG45MMq3avTFsZGYr7a0dvRKl5li7jJhEza4BAhF4uR3Tu400vi6kGY3U'
export const PAYMENT_URL = '/api/payment/stripe'
export const PAYMENT_PAYPAL = '/api/payment/paypal'

export const SERVICE_PURCHASE_API = '/api/service-purchases'
export const ALL_PLANS_API = '/api/services';
export const CREATE_SERVICE_API = '/api/create-service';
export const DELETE_SERVICE_API = '/api/delete-service';
export const UPDATE_SERVICE_API = '/api/update-service';

export const GET_USER_API = '/api/user';
export const GET_USER_PLANS_API = '/api/service-purchases';
export const GET_USER_INFO_API = '/api/get-user';
export const UPDATE_USER_INFO_API = '/api/update-user';
export const GET_USER_SERVICES_PURCHASES_API = '/api/service-purchases';

export const SUBMIT_TICKET_API = '/api/create-ticket'
export const GET_USER_TICKETS_API = '/api/get-user-tickets'
export const GET_ALL_TICKETS_API = '/api/all-tickets'
export const UPDATE_TICKET_PRIORITY = '/api/update-ticket-priority'
export const UPDATE_TICKET_API = '/api/update-ticket'

export const GET_MESSAGES_API = '/api/get-messages'
export const POST_MESSAGES_API = '/api/send-message'
export const GET_RECENT_CHATS_API = '/api/recent-chats/'

export const GET_ADMIN_GET_USERS_PLANS_API = '/api/admin/users/plans'


export const checkUserRole = localStorage.getItem('role')
export const checkToken = localStorage.getItem('token')
export const checkUserId = localStorage.getItem('userId')

export const authHeaders = {
    headers: {
        Authorization: checkToken
    }
}

export const redirectTo = location.state?.from?.pathname || '/';

// do you want to multiple entries 