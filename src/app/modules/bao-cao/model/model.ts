export interface IDiaPhuong {
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

export interface ITongCong extends IDiaPhuong {
  tenDiaPhuong: string;
  diaPhuongId: number;
}

export interface IBaoCao {
  tenTuyenBaoCao: string;
  listBaoCaoDiaPhuong: IDiaPhuong[];
  tongCong: ITongCong;
}

export interface iConfigTable {
  totalElement: number;
  totalPages: number;
  numberOfElements: number;
}

export interface ITinh {
  id: number;
  tenTinh?: string;
}

export interface IHuyen {
  id: number;
  tenHuyen?: string;
}

export interface IXa {
  id: number;
  xaId?: number;
  tenXa?: string;
}

export interface ITuan {
  disabled?: boolean;
  group?: string | null;
  selected?: boolean;
  text: string;
  value: string | number;
}

export interface ISearchBaoCao {
  tinhIds?: ITinh[] | null;
  huyenIds?: IHuyen[] | null;
  xaIds?: IXa[] | null;
  tuan?: ITuan | null;
  nam?: number | null;
  tuNgay?: string | null;
  denNgay?: string | null;
  capDoRoot?: number | null;
}
