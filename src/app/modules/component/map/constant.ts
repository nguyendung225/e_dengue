export const MA_DON_VI = {
    TINH: 2,
    HUYEN: 4,
    XA: 6,
    TRUNG_UONG: 0
}

export const DEFAULT_CENTER = [21.0285, 105.7823]
export const FIELD_NAME_GS_TINH = "Ten_Tinh",
    FIELD_NAME_GS_HUYEN = "Ten_Huyen"

export const FIELD_NAME_DV_TINH = "tenTinh",
    FIELD_NAME_DV_HUYEN = "tenHuyen"

export const CONFIG_MAP_BY_CAP = {
    QUOC_GIA: {
        ZOOM_DEFAULT: 7,
        FIELD_NAME_GS: null
    },
    TINH: {
        ZOOM_DEFAULT: 10,
        FIELD_NAME_GS: FIELD_NAME_GS_TINH
    },
    HUYEN: {
        ZOOM_DEFAULT: 12,
        FIELD_NAME_GS: FIELD_NAME_GS_HUYEN
    },
    XA: {
        ZOOM_DEFAULT: 12,
        FIELD_NAME_GS: FIELD_NAME_GS_HUYEN
    },
}

export const CONFIG_MAP_BY_DON_VI = {
    [MA_DON_VI.TRUNG_UONG]: {
        ...CONFIG_MAP_BY_CAP.QUOC_GIA,
        FIELD_NAME_TINH: null,
        FIELD_NAME_HUYEN: null,
    },

    [MA_DON_VI.TINH]: {
        ...CONFIG_MAP_BY_CAP.TINH,
        FIELD_NAME_TINH: FIELD_NAME_DV_TINH,
        FIELD_NAME_HUYEN: FIELD_NAME_DV_HUYEN,
    },

    [MA_DON_VI.HUYEN]: {
        ...CONFIG_MAP_BY_CAP.HUYEN,
        FIELD_NAME_TINH: FIELD_NAME_DV_TINH,
        FIELD_NAME_HUYEN: FIELD_NAME_DV_HUYEN,
    },

    [MA_DON_VI.XA]: {
        ...CONFIG_MAP_BY_CAP.XA,
        FIELD_NAME_TINH: FIELD_NAME_DV_HUYEN,
        FIELD_NAME_HUYEN: FIELD_NAME_DV_HUYEN,
    },
}

export const style = {
    fillColor: "orange",
    weight: 1,
    opacity: 1,
    color: "blue",
    fillOpacity: 0.2,
};
export const styleHightlight = {
    weight: 3,
    color: "#666",
    dashArray: "",
    fillOpacity: 0.2,
};

export const ZOOM_MAKER = 16