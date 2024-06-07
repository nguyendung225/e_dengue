export interface IResponseData {
    code?: number;
    data?: any;
    message?: string;
    timestamp?: string;
    total?: number ;
}

export type configTable = {
    totalPages: number,
    totalElements: number,
    numberOfElements: number
}

export type tablePagination = {
    pageIndex: number,
    pageSize: number
}