import axiosDefault from "axios";

export const getTTShop = async (idShop) => {
    try {
        const response = await axiosDefault.get(
            `https://gianhangchatluongcao.online/v1/shop/thong-tin-shop/?id=${idShop}`
        );
        return response;
    } catch (err) {
        console.log(err);
    }
};
export const getSanPham = async (idShop, skip) => {
    try {
        const response = await axiosDefault.get(
            `https://gianhangchatluongcao.online/v1/shop/san-pham/?user=${idShop}&skip=${skip}`
        );
        return response;
    } catch (err) {
        console.log(err);
    }
};
export const getArrSanPham = async (arrIdSanPham) => {
    try {
        const response = await axiosDefault.post(
            `https://gianhangchatluongcao.online/v1/shop/arr-san-pham`,
            arrIdSanPham
        );
        return response;
    } catch (err) {
        console.log(err);
    }
};
export const getYourStatus = async (id) => {
    try {
        const response = await axiosDefault.get(
            `https://gianhangchatluongcao.online/v1/your-status/${id}`
        );
        return response;
    } catch (err) {
        console.log(err);
    }
};
