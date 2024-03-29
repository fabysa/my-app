import logo from "./logo.svg";
import facebookLogo from "./assets/images/Facebook_Logo.png";
import zaloLogo from "./assets/images/zaloLogo.png";
import "./App.scss";
import { useEffect, useState } from "react";
import {
    getTTShop,
    getSanPham,
    getYourStatus,
    getArrSanPham,
} from "./ApiRequest";
import QRCode from "react-qr-code";
import logoInternet from "./assets/images/logoInternet.jpg";
function App() {
    const idShop = "6573ed198236b1e3500d1904";
    const [ttShop, setttShop] = useState();
    const [allSanPham, setallSanPham] = useState();
    const [arrSanPham, setarrSanPham] = useState();
    const [allshopLienKet, setallshopLienKet] = useState();
    const [tuVanVaThongTin, settuVanVaThongTin] = useState(0);
    const [dataQrCode, setdataQrCode] = useState("");
    const [spa, setspa] = useState();
    const [spb, setspb] = useState();
    const [arrNhomSanPham, setarrNhomSanPham] = useState([]);
    const [skip, setskip] = useState(0);
    useEffect(() => {
        const fetchPublicDictrict = async () => {
            const response = await getTTShop(idShop);
            if (response) {
                setttShop(response?.data.shop);
            }
            const response2 = await getSanPham(idShop, skip);
            if (response2) {
                setallSanPham(response2?.data.allSanpham);
            }
            const response3 = await getYourStatus(idShop);
            if (response2) {
                setallshopLienKet(response3?.data.yourStatus);
            }
        };
        idShop && fetchPublicDictrict();
    }, [skip]);
    useEffect(() => {
        const fetchArrSanPham = async () => {
            if (allshopLienKet) {
                const arrIdSanPham2 = allshopLienKet[0]?.sanPhamCtv.concat(
                    allshopLienKet[0]?.sanPhamSi
                );
                const arrIdSanPham3 = new Set(arrIdSanPham2);
                const arrIdSanPham = [...arrIdSanPham3];
                const response4 = await getArrSanPham(arrIdSanPham);
                setarrSanPham(response4?.data.arrSanpham);
            }
        };
        allshopLienKet && fetchArrSanPham();
    }, [allshopLienKet]);
    // const sanPhamLienKet = arraySanPham?.filter(
    //     (item) => item.tinhTrang === "Còn Hàng"
    // );
    const VND = new Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND",
    });
    const download = () => {
        const svg = document.getElementById("QRCode");
        const svgData = new XMLSerializer().serializeToString(svg);
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        const img = new Image();
        img.onload = () => {
            canvas.width = img.width;
            canvas.height = img.height;
            ctx.drawImage(img, 0, 0);
            const pngFile = canvas.toDataURL("image/png");
            const downloadLink = document.createElement("a");
            // name image
            downloadLink.download = `${dataQrCode}`;
            downloadLink.href = `${pngFile}`;
            downloadLink.click();
        };
        img.src = `data:image/svg+xml;base64,${btoa(svgData)}`;
    };
    // phan loai san pham
    const sanPhamDan = allSanPham?.filter(
        (item) => item.nhomSanPham === "Sản Phẩm Dẫn"
    );

    useEffect(() => {
        if (sanPhamDan && sanPhamDan?.length !== 0) {
            setspa(sanPhamDan[0]?._id);
            setspb(sanPhamDan[1]?._id);
        }
    }, [sanPhamDan]);
    const sanPhamShop = allSanPham?.filter(
        (item) =>
            item.nhomSanPham !== "Sản Phẩm Dẫn" && item.tinhTrang === "Còn Hàng"
    );
    const sanPhamLienKet = arrSanPham?.filter(
        (item) => item.tinhTrang === "Còn Hàng"
    );
    console.log("sanPhamShop", sanPhamShop);
    console.log("sanPhamLienKet", sanPhamLienKet);
    useEffect(() => {
        if (arrSanPham && arrSanPham.length !== 0) {
            const allSanPhamMoi = sanPhamShop?.concat(sanPhamLienKet);
            const arrNhomSanPham3 = allSanPhamMoi?.map((item) => {
                return item?.nhomSanPham;
            });
            const arrNhomSanPham2 = new Set(arrNhomSanPham3);

            setarrNhomSanPham([...arrNhomSanPham2]);
        } else {
            const arrNhomSanPham3 = sanPhamShop?.map((item) => {
                return item?.nhomSanPham;
            });
            const arrNhomSanPham2 = new Set(arrNhomSanPham3);

            setarrNhomSanPham([...arrNhomSanPham2]);
        }
    }, [allSanPham, arrSanPham, skip]);
    console.log("allSanPham", allSanPham);
    console.log("arrNhomSanPham", arrNhomSanPham);
    // phan loai san pham
    // Cach 2

    // Cach 2
    return (
        <div className="all">
            <div className="App">
                {/* <div className="title">Cộng Đồng Doanh Nghiệp Việt</div> */}
                <div className="ttShop">
                    <img src={ttShop?.Banner} className="banner-container" />

                    <a
                        href={`https://gianhangchatluongcao.online/shop/${idShop}`}
                    >
                        <div className="tenCuaHang">{ttShop?.TenShop}</div>

                        <div className="internet-website">
                            <img src={logoInternet} className="internet" />
                            <div className="website">
                                Https://
                                {ttShop?.website}
                            </div>
                            <img src={logoInternet} className="internet" />
                        </div>
                    </a>
                </div>
                <div className="tuVan-gioiThieu">
                    <button
                        className="tuVan"
                        onClick={() => settuVanVaThongTin(2)}
                    >
                        Fabysa
                    </button>
                    <button
                        className="gioiThieu"
                        onClick={() => settuVanVaThongTin(1)}
                    >
                        Liên Hệ
                    </button>
                </div>
                {tuVanVaThongTin === 1 && (
                    <div className="gioiThieuChiTiet">
                        <button
                            className="closeGioiThieu"
                            onClick={() => settuVanVaThongTin(0)}
                        >
                            Close
                        </button>
                        <div className="tenCuaHang2">{ttShop?.TenShop}</div>
                        <div className="slogan">{ttShop?.sloganShop}</div>

                        <div className="qrcode">
                            <div
                                onClick={download}
                                style={{
                                    height: "auto",
                                    margin: "0 auto",
                                    maxWidth: 150,
                                    width: "100%",
                                }}
                            >
                                <QRCode
                                    size={256}
                                    style={{
                                        height: "auto",
                                        maxWidth: "100%",
                                        width: "100%",
                                    }}
                                    value={`https://${ttShop?.website}`}
                                    viewBox={`0 0 256 256`}
                                    id="QRCode"
                                />
                            </div>
                        </div>

                        <div className="dc">
                            - Địa chỉ:&nbsp;
                            {ttShop?.dcShop} <br />- Số điện thoại:&nbsp;
                            {ttShop?.sdtShop} <br />- Quý khách cần hỗ trợ hoặc
                            tư vấn xin vui lòng liên hệ trực tiếp 24/7 qua Zalo,
                            Facebook!
                        </div>

                        <div className="mxh">
                            <div className="zalo">
                                <a
                                    href={`https://zalo.me/${ttShop?.linkZalo}`}
                                    target="_blank"
                                >
                                    <img src={zaloLogo} className="zalo" />
                                </a>
                            </div>
                            <div className="facebook">
                                <a href={ttShop?.linkFacebook} target="_blank">
                                    <img
                                        src={facebookLogo}
                                        className="facebook"
                                    />
                                </a>
                            </div>
                        </div>
                        <div className="camOn">Xin chân thành cảm ơn!</div>
                        <a
                            href={`https://gianhangchatluongcao.online/shop/dang-nhap/${idShop}`}
                        >
                            <button className="like">Thích</button>
                        </a>
                    </div>
                )}
                {tuVanVaThongTin === 2 && (
                    <div className="tuVanChiTiet">
                        <button
                            className="closeGioiThieu"
                            onClick={() => settuVanVaThongTin(0)}
                        >
                            Close
                        </button>

                        <div className="fabysa">Trung Tâm Thương Mại 24/7</div>
                        <div className="gioiThieuFabysa">
                            - Đây là nơi giới thiệu danh sách Shop Online Uy
                            Tín!
                            <br /> - Thuộc đa dạng ngành hàng, giá cả ưu đãi!
                        </div>
                        <a
                            href={`https://gianhangchatluongcao.online/fabysa/${spa}/${spb}`}
                        >
                            <button className="sanSale">Săn Sale Ngay</button>
                        </a>
                    </div>
                )}
                <div className="sanPham">
                    {/* ssp dan */}
                    {sanPhamDan && sanPhamDan.length !== 0 && (
                        <div className="nhomSanPham-sanPham">
                            <div className="nhomSanPham">
                               Khuyến Mại Đặc Biệt
                            </div>

                            <div className="sanPham-container">
                                {sanPhamDan &&
                                    sanPhamDan?.map((item) => {
                                        return (
                                            <div
                                                key={item._id}
                                                className="sanPham"
                                            >
                                                <a
                                                    href={`https://gianhangchatluongcao.online/shop/${idShop}`}
                                                >
                                                    <div>
                                                        <img
                                                            src={
                                                                item?.AnhSanPham
                                                            }
                                                            className="anhSanPham"
                                                            alt="timtim"
                                                        />

                                                        <div className="tenSanPham">
                                                            {item?.TenSanPham}
                                                        </div>
                                                        <div className="giaBan">
                                                            <div className="giaBanMoi">
                                                                {VND.format(
                                                                    item?.giaKhuyenMai
                                                                )}
                                                            </div>

                                                            <div className="giaGiam">
                                                                <div className="giabanCu">
                                                                    {VND.format(
                                                                        item?.giaNiemYet
                                                                    )}
                                                                </div>
                                                                <div className="phanTram">
                                                                    Giảm&nbsp;
                                                                    {Math.floor(
                                                                        (100 *
                                                                            (item?.giaNiemYet -
                                                                                item?.giaKhuyenMai)) /
                                                                            item?.giaNiemYet
                                                                    )}
                                                                    %
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </a>
                                            </div>
                                        );
                                    })}
                            </div>
                            {arrNhomSanPham &&
                                arrNhomSanPham?.map((item2, index) => {
                                    return (
                                        <div
                                            key={index}
                                            className="nhomSanPham-sanPham"
                                        >
                                            <div className="nhomSanPham">
                                                {item2 !== "Sản Phẩm Dẫn" &&
                                                    item2}
                                            </div>
                                            {/* SanPhamShop */}
                                            <div className="sanPham-container">
                                                {sanPhamShop &&
                                                    sanPhamShop?.map((item) => {
                                                        return (
                                                            item?.nhomSanPham ===
                                                                item2 && (
                                                                <div
                                                                    key={
                                                                        item._id
                                                                    }
                                                                    className="sanPham"
                                                                >
                                                                    <a
                                                                        href={`https://gianhangchatluongcao.online/shop/${idShop}`}
                                                                    >
                                                                        <div>
                                                                            <img
                                                                                src={
                                                                                    item?.AnhSanPham
                                                                                }
                                                                                className="anhSanPham"
                                                                                alt="timtim"
                                                                            />

                                                                            <div className="tenSanPham">
                                                                                {
                                                                                    item?.TenSanPham
                                                                                }
                                                                            </div>
                                                                            <div className="giaBan">
                                                                                <div className="giaBanMoi">
                                                                                    {VND.format(
                                                                                        item?.giaKhuyenMai
                                                                                    )}
                                                                                </div>

                                                                                <div className="giaGiam">
                                                                                    <div className="giabanCu">
                                                                                        {VND.format(
                                                                                            item?.giaNiemYet
                                                                                        )}
                                                                                    </div>
                                                                                    <div className="phanTram">
                                                                                        Giảm&nbsp;
                                                                                        {Math.floor(
                                                                                            (100 *
                                                                                                (item?.giaNiemYet -
                                                                                                    item?.giaKhuyenMai)) /
                                                                                                item?.giaNiemYet
                                                                                        )}

                                                                                        %
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </a>
                                                                </div>
                                                            )
                                                        );
                                                    })}
                                            </div>
                                            {/* SanPhamShop */}
                                            {/* SanPhamLienKet */}
                                            <div className="sanPham-container">
                                                {sanPhamLienKet &&
                                                    sanPhamLienKet?.map(
                                                        (item, index) => {
                                                            return (
                                                                item?.nhomSanPham ===
                                                                    item2 && (
                                                                    <div
                                                                        key={
                                                                            item._id
                                                                        }
                                                                        className="sanPham"
                                                                    >
                                                                        <a
                                                                            href={`https://gianhangchatluongcao.online/shop/${idShop}`}
                                                                        >
                                                                            <div>
                                                                                <img
                                                                                    src={
                                                                                        item?.AnhSanPham
                                                                                    }
                                                                                    className="anhSanPham"
                                                                                    alt="timtim"
                                                                                />

                                                                                <div className="tenSanPham">
                                                                                    {
                                                                                        item?.TenSanPham
                                                                                    }
                                                                                </div>
                                                                                <div className="giaBan">
                                                                                    <div className="giaBanMoi">
                                                                                        {VND.format(
                                                                                            item?.giaKhuyenMai
                                                                                        )}
                                                                                    </div>

                                                                                    <div className="giaGiam">
                                                                                        <div className="giabanCu">
                                                                                            {VND.format(
                                                                                                item?.giaNiemYet
                                                                                            )}
                                                                                        </div>
                                                                                        <div className="phanTram">
                                                                                            Giảm&nbsp;
                                                                                            {Math.floor(
                                                                                                (100 *
                                                                                                    (item?.giaNiemYet -
                                                                                                        item?.giaKhuyenMai)) /
                                                                                                    item?.giaNiemYet
                                                                                            )}

                                                                                            %
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </a>
                                                                    </div>
                                                                )
                                                            );
                                                        }
                                                    )}
                                            </div>
                                            {/* SanPhamLienKet */}
                                        </div>
                                    );
                                })}
                        </div>
                    )}
                    {(skip > 20 || skip === 20) && (
                        <button
                            onClick={() => setskip(+skip - 20)}
                            className="xemThem"
                        >
                            Quay Lại
                        </button>
                    )}
                    {allSanPham?.length === 20 && (
                        <a
                            href={`https://gianhangchatluongcao.online/shop/${idShop}`}
                        >
                            <button className="xemThem">Xem Thêm</button>
                        </a>
                    )}
                    {/* ssp dan */}
                </div>
            </div>
            <div className="App2">Ứng Dụng Được Tối Ưu Sử Dụng Trên Mobile</div>
        </div>
    );
}

export default App;
