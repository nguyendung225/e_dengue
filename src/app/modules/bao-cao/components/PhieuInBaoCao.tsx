import moment from "moment";
import { printStyles } from "../../utils/Constant";
import { BaoCao } from "../model/model";

type TProps = {
    thongTinBaoCao?: BaoCao;
};

const PhieuInBaoCao = ({ thongTinBaoCao }: TProps) => {
    const {
        text_center,
        padding,
        fontWeight,
        color,
        fontSize,
        border,
        width,
        text_start,
        d_flex_j_between,
        font_italic,
        margin_x_auto,
        marginTop,
        marginBottom
    } = printStyles;

    return (
        <div className="spaces px-75" style={{ ...margin_x_auto }}>
            <div style={{ ...color.primary, ...marginBottom._10px }}>Báo cáo theo Thông tư 54/2015/TT-BYT</div>
            <div style={{ ...text_center, ...fontWeight.bold }}>
                <div>BỘ Y TẾ</div>
                <div>CHƯƠNG TRÌNH MỤC TIÊU QUỐC GIA VỀ Y TẾ</div>
                <div>DỰ ÁN PHÒNG CHỐNG SXH KHU VỰC PHÍA NAM</div>
                <div style={{ ...border.top_gray, ...marginBottom._10px, ...marginTop._10px }} />
            </div>
            <div style={{ ...fontWeight.bold, ...marginTop._20px }}>
                <div>Tỉnh/Thành phố:{thongTinBaoCao?.tenTuyenBaoCao}</div>
                <div> Số :....................</div>
            </div>
            <div style={{ ...text_center, ...fontWeight.bold }}>
                <div style={{ ...color.dark_red, ...fontSize._18px, ...marginTop._20px }}>BÁO CÁO BỆNH SỐT XUẤT HUYẾT DENGUE </div>
                <p style={{ ...fontWeight.normal }}>Tuần 19 từ ngày 05/06/2024 đến 12/05/2024 </p>
            </div>
            <div>
                <table style={{ ...border.black, ...text_center, ...margin_x_auto, ...border.collapse }}>
                    <thead style={{ ...color.primary }}>
                        <tr>
                            <th style={{ ...border.black }} rowSpan={3}>STT</th>
                            <th style={{ ...border.black }} rowSpan={3}>Địa phương</th>
                            <th style={{ ...border.black }} colSpan={8}>Số mắc</th>
                            <th style={{ ...border.black }} colSpan={2}>Số chết</th>
                        </tr>
                        <tr>
                            <th style={{ ...border.black }} colSpan={3}>SXHD và SXHD có dấu hiệu cảnh báo</th>
                            <th style={{ ...border.black }} colSpan={3}>SXH Dengue nặng</th>
                            <th style={{ ...border.black }} rowSpan={2}>Tổng cộng mắc</th>
                            <th style={{ ...border.black }} rowSpan={2}>Cộng dồn mắc</th>
                            <th style={{ ...border.black }} rowSpan={2}>Tổng số chết</th>
                            <th style={{ ...border.black }} rowSpan={2}>≤15T</th>
                            <th style={{ ...border.black }} rowSpan={2}>Cộng dồn chết</th>
                        </tr>
                        <tr>
                            <td style={{ ...border.black }}>TS</td>
                            <td style={{ ...border.black }}>≤15T</td>
                            <td style={{ ...border.black }}>CD</td>
                            <td style={{ ...border.black }}>TS</td>
                            <td style={{ ...border.black }}>≤15T</td>
                            <td style={{ ...border.black }}>CD</td>
                        </tr>
                    </thead>
                    <tbody>
                        {thongTinBaoCao?.listBaoCaoDiaPhuong.map((item, index) => (
                            <tr key={index} style={{ ...border.black }}>
                                <td style={{ ...border.black }}>{index}</td>
                                <td style={{ ...border.black, ...width._100, ...text_start, ...padding._10 }}>{item?.tenDiaPhuong}</td>
                                <td style={{ ...border.black, ...width._45 }}>{item.tongSoDauHieu}</td>
                                <td style={{ ...border.black, ...width._45 }}>{item.tongSoDuoi15}</td>
                                <td style={{ ...border.black, ...width._45 }}>{item.congDonDauHieu}</td>
                                <td style={{ ...border.black, ...width._45 }}>{item.tongSoNang}</td>
                                <td style={{ ...border.black, ...width._45 }}>{item.tongSoNangDuoi15}</td>
                                <td style={{ ...border.black, ...width._45 }}>{item.congDonNang}</td>
                                <td style={{ ...border.black, ...width._45 }}>{item.tongSo}</td>
                                <td style={{ ...border.black, ...width._45 }}>{item.congDon}</td>
                                <td style={{ ...border.black, ...width._45 }}>{item.tongSoTuVong}</td>
                                <td style={{ ...border.black, ...width._45 }}>{item.tongSoTuVongDuoi15}</td>
                                <td style={{ ...border.black, ...width._45 }}>{item.congDonTuVong}</td>
                            </tr>

                        ))}
                        <tr>
                            <td style={{ ...border.black, ...width._100, ...fontWeight.bold }} colSpan={2}>Tổng cộng</td>
                            <td style={{ ...border.black, ...width._45 }}>{thongTinBaoCao?.tongCong.tongSoDauHieu}</td>
                            <td style={{ ...border.black, ...width._45 }}>{thongTinBaoCao?.tongCong.tongSoDuoi15}</td>
                            <td style={{ ...border.black, ...width._45 }}>{thongTinBaoCao?.tongCong.congDonDauHieu}</td>
                            <td style={{ ...border.black, ...width._45 }}>{thongTinBaoCao?.tongCong.tongSoNang}</td>
                            <td style={{ ...border.black, ...width._45 }}>{thongTinBaoCao?.tongCong.tongSoNangDuoi15}</td>
                            <td style={{ ...border.black, ...width._45 }}>{thongTinBaoCao?.tongCong.congDonNang}</td>
                            <td style={{ ...border.black, ...width._45 }}>{thongTinBaoCao?.tongCong.tongSo}</td>
                            <td style={{ ...border.black, ...width._45 }}>{thongTinBaoCao?.tongCong.congDon}</td>
                            <td style={{ ...border.black, ...width._45 }}>{thongTinBaoCao?.tongCong.tongSoTuVong}</td>
                            <td style={{ ...border.black, ...width._45 }}>{thongTinBaoCao?.tongCong.tongSoTuVongDuoi15}</td>
                            <td style={{ ...border.black, ...width._45 }}>{thongTinBaoCao?.tongCong.congDonTuVong}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div style={{ ...marginBottom._10px, ...marginTop._10px }}>
                Nhận xét :
            </div>
            <div>
                -Vui lòng nhập nhận xét báo cáo vào đây!
            </div>
            <div style={{ ...d_flex_j_between, ...marginTop._20px, ...marginBottom._80px, ...text_center }}>
                <div>
                    <div style={{ ...fontWeight.bold }}>
                        Người báo cáo
                    </div>
                    <div style={{ ...font_italic, ...color.primary }}>(Ký, ghi rõ họ tên)</div>
                </div>
                <div>
                    <div style={{ ...font_italic }}>
                        {thongTinBaoCao?.tenTuyenBaoCao}, {moment().format('[ngày] DD [tháng] MM [năm] YYYY')}
                    </div>
                    <div style={{ ...fontWeight.bold }}>
                        Lãnh đạo đơn vị
                    </div>
                    <div style={{ ...font_italic, ...color.primary }}>(Ký, ghi rõ họ tên, đóng dấu)</div>
                </div>
            </div>
            <div>
                Nơi nhận:
            </div>
            <div>
                -Vui lòng nhập nơi nhận BC vào đây
            </div>
        </div>
    );
};

export default PhieuInBaoCao;
