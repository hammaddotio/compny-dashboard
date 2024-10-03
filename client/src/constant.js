// export const URL = 'http://127.0.0.1:3000'
export const URL = 'https://sexual-maressa-mady-1d683dc3.koyeb.app'
export const REGISTER_URL = '/api/register'
export const LOGIN_URL = '/api/login'

export const STRIPE_PUBLISH_KEY = 'pk_test_51MMfFyHq3fTUJ2f2bRlEUMPv3Dcv2RWw9pgopbok9qG45MMq3avTFsZGYr7a0dvRKl5li7jJhEza4BAhF4uR3Tu400vi6kGY3U'
export const PAYMENT_URL = '/api/payment/stripe'
export const PAYMENT_PAYPAL = '/api/payment/paypal'

export const SERVICE_PURCHASE_API = '/api/service-purchases'
export const ALL_PLANS_API = '/api/services';
export const CREATE_SERVICE_API = '/api/create-service';


export const checkUserRole = localStorage.getItem('role')
export const checkToken = localStorage.getItem('token')

export const authHeaders = {
    headers: {
        Authorization: checkToken
    }
}


// do you want to multiple entries 