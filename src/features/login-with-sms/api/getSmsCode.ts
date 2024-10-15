

const getSmsCode = () => {
    return fetch("/auth_api/v1/auth_user/login/phone")
}