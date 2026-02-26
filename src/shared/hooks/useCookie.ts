import Cookies from "js-cookie"

export const useCookie = () => {
    const setCookie = (key: string, value: string) => {
        Cookies.set(key, value, { expires: 7 })
    }

    const getCookie = (key: string) => {
        return Cookies.get(key)
    }

    const removeCookie = (key: string) => {
        Cookies.remove(key)
    }

    return { setCookie, getCookie, removeCookie }
}