interface DiaPhuong {
    tenDiaPhuong: string;
    diaPhuongId: number;
    tongSo: number;
    tongSoDauHieu: number;
    tongSoDuoi15: number;
    tongSoNang: number;
    tongSoNangDuoi15: number;
    tongSoTuVong: number;
    tongSoTuVongDuoi15: number;
    congDon: number;
    congDonDauHieu: number;
    congDonNang: number;
    congDonTuVong: number;
}

interface TongCong extends DiaPhuong {
    tenDiaPhuong: string;
    diaPhuongId: number;
}

export interface BaoCao {
    tenTuyenBaoCao: string;
    listBaoCaoDiaPhuong: DiaPhuong[];
    tongCong: TongCong;
}

export interface ISearchBaoCao {
    TinhIds?: number[];
    HuyenIds?: number[];
    XaIds?: number[] | null;
    Tuan?: number;
    Nam?: number;
    TuNgay?: string;
    DenNgay?: string;
    CapDoRoot?: number;
}