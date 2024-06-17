import L, { Icon, LeafletMouseEvent } from "leaflet";
import "leaflet/dist/leaflet.css";
import { useEffect, useRef, useState } from "react";
import { Feature } from "geojson";
import { GeoJSON, MapContainer, Marker, Popup, TileLayer, useMap, useMapEvents } from "react-leaflet";
import { KEY_LOCALSTORAGE } from "../../auth/core/_consts";
import { cmpNormalizeString } from "../../utils/FunctionUtils";
import huyenGeoJson from "./geojson/diaphanhuyen.json";
import tinhGeojson from "./geojson/diaphantinh.json";
import { localStorageItem } from "./../../utils/LocalStorage";
import {
	CONFIG_MAP_BY_CAP,
	CONFIG_MAP_BY_DON_VI,
	DEFAULT_CENTER,
	FIELD_NAME_GS_HUYEN,
	FIELD_NAME_GS_TINH,
	MA_DON_VI,
	style,
	styleHightlight,
    ZOOM_MAKER,
} from "./constant";

type Iprops = {
	getPositionMaker?: (position: any) => void;
	defaultMakerPostion?: L.LatLngExpression;
	height?: string;
};

const CustomMap = (props: Iprops) => {
	const { getPositionMaker, defaultMakerPostion } = props;
	const mapRef = useRef<any>(null);
	const geoJsonRef = useRef<L.GeoJSON>(null);
	const [positionMaker, setPositionMaker] = useState<any>(defaultMakerPostion);
	const [center, setCenter] = useState<any>(DEFAULT_CENTER);
	const [mapConfig, setMapConfig] = useState(CONFIG_MAP_BY_DON_VI[MA_DON_VI.HUYEN]);
	const userData = localStorageItem.get(KEY_LOCALSTORAGE.USER_INFOMATION);

	const IconMaker = new Icon({
		iconUrl: "./media/images/makerMap.png",
		iconSize: [41, 41],
		iconAnchor: [20, 20],
	});

	const handleGetGeoJsonDataTinh = (nameTinh?: string) => {
		if (!nameTinh) return tinhGeojson;
		const data = (huyenGeoJson as any).features.filter((item: any) =>
			cmpNormalizeString(item.properties[FIELD_NAME_GS_TINH], nameTinh)
		);
		return data;
	};

	const handleGetGeoJsonDataHuyen = (nameHuyen?: string, nameTinh?: string) => {
		const data = (huyenGeoJson as any).features.filter(
			(item: any) =>
				cmpNormalizeString(item.properties[FIELD_NAME_GS_TINH], nameTinh) &&
				cmpNormalizeString(item.properties[FIELD_NAME_GS_HUYEN], nameHuyen)
		);
		return data;
	};

	const handleGetData = (nameTinh?: string, nameHuyen?: string) => {
        const data = nameHuyen && nameTinh
            ? handleGetGeoJsonDataHuyen(nameHuyen, nameTinh)
            : handleGetGeoJsonDataTinh(nameTinh);
		const coordinates = !nameTinh
			? data.features?.[0]?.geometry?.coordinates?.[0]?.[0]?.[0]
			: data[0]?.geometry?.coordinates?.[0]?.[0];
		const currentZoom = mapRef?.current?.getZoom();
		if (!coordinates) return;
		const [lng, lat] = coordinates;
		let zoomLevel = currentZoom;
		if (currentZoom < CONFIG_MAP_BY_CAP.HUYEN.ZOOM_DEFAULT && nameHuyen) {
			zoomLevel = CONFIG_MAP_BY_CAP.HUYEN.ZOOM_DEFAULT;
			mapRef?.current?.setView([lat, lng], zoomLevel);
		} else if (currentZoom < CONFIG_MAP_BY_CAP.TINH.ZOOM_DEFAULT && nameTinh) {
			zoomLevel = CONFIG_MAP_BY_CAP.TINH.ZOOM_DEFAULT;
			mapRef?.current?.setView([lat, lng], zoomLevel);
		}
		nameTinh && setCenter([lat, lng]);
		geoJsonRef?.current?.clearLayers();
		geoJsonRef?.current?.addData(data);
	};

    const highlightFeature = (e: LeafletMouseEvent) => {
        const layer = e.target;
        const properties = layer.feature.properties;
        const fieldName = properties[FIELD_NAME_GS_HUYEN] || properties[FIELD_NAME_GS_TINH];
        const tooltipContent = `<b>${fieldName}</b>`;
    
        layer.setStyle(styleHightlight);
        
        if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
            layer.bringToFront();
        }
    
        layer.bindTooltip(tooltipContent, { permanent: false, direction: "top" }).openTooltip();
    
        setTimeout(() => {
            layer.closeTooltip();
        }, 3000);
    };

	const resetHighlight = (e: LeafletMouseEvent) => {
		geoJsonRef?.current?.resetStyle(e.target);
	};

	const handleClickFeature = (e: LeafletMouseEvent) => {
		if (!defaultMakerPostion) {
			const position = [e.latlng.lat, e.latlng.lng];
			setPositionMaker(position);
			getPositionMaker?.(position);
		}

		const { properties } = e.target.feature;
		const tinh = properties[FIELD_NAME_GS_TINH];
		const huyen = properties[FIELD_NAME_GS_HUYEN];

		if (tinh) {
			handleGetData(tinh, huyen);
		}
	};

	const onEachFeature = (_: Feature, layer: L.Layer) => {
		layer.on({
			click: handleClickFeature,
			mouseover: highlightFeature,
			mouseout: resetHighlight,
		});
	};

	const hanldeZoomend = (map: L.Map) => {
		const tenTinh = (geoJsonRef.current?.toGeoJSON() as any)?.features?.[0].properties?.[FIELD_NAME_GS_TINH];
		if (map.getZoom() <= CONFIG_MAP_BY_CAP.QUOC_GIA.ZOOM_DEFAULT) {
			handleGetData();
			return;
		}

		if (
			map.getZoom() > CONFIG_MAP_BY_CAP.TINH.ZOOM_DEFAULT &&
			map.getZoom() < CONFIG_MAP_BY_CAP.HUYEN.ZOOM_DEFAULT &&
			tenTinh
		) {
			handleGetData(tenTinh);
			return;
		}
	};

	const HandleMapEvents = () => {
		const map = useMapEvents({
			zoomend: () => hanldeZoomend(map),
		});

		return null;
	};

	const handlegetMapByUserData = () => {
		if (mapConfig.FIELD_NAME_TINH && mapConfig.FIELD_NAME_HUYEN)
			handleGetData(userData[mapConfig.FIELD_NAME_TINH], userData[mapConfig.FIELD_NAME_HUYEN]);
	};

	const CenterControl = ({ position, center }: any) => {
		const map = useMap();
		useEffect(() => {
			const control = (L as any).control({ position });

			control.onAdd = () => {
				const div = L.DomUtil.create("div", "leaflet-bar leaflet-control leaflet-control-custom");
				div.innerHTML = "Về giữa";
				div.style.backgroundColor = "white";
				div.style.padding = "5px";
				div.style.cursor = "pointer";
				div.onclick = () => {
					map.setView(center, 12);
				};

				return div;
			};
			control.addTo(map);
            
			return () => {
				control.remove();
			};
		}, [map, position, center]);

		return null;
	};

	const handleMakerClick = (e: LeafletMouseEvent) => {
		const position = [e.latlng.lat, e.latlng.lng];
        mapRef?.current?.setView(position, ZOOM_MAKER);
	};

	useEffect(() => {
		setPositionMaker(defaultMakerPostion);
	}, [defaultMakerPostion]);

	useEffect(() => {
		if (!userData) return;

		setMapConfig(CONFIG_MAP_BY_DON_VI[userData.phanLoaiCoSo]);
        
		if (mapRef.current && geoJsonRef.current) {
			handlegetMapByUserData();
		} else {
			const timeout = setTimeout(() => {
				if (mapRef.current && geoJsonRef.current) {
					handlegetMapByUserData();
				}
			}, 100);

			return () => clearTimeout(timeout);
		}
	}, []);

	return (
		<MapContainer
			doubleClickZoom={false}
			center={center}
			zoom={7}
			style={{ height: "calc(100vh - 250px)", width: "100%" }}
			ref={mapRef}
		>
			<TileLayer
				url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
				attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
			/>
			<HandleMapEvents />
			<GeoJSON data={tinhGeojson as any} style={style} ref={geoJsonRef} onEachFeature={onEachFeature} />
			<CenterControl position="topright" center={center} />
			{positionMaker && (
				<Marker
					position={positionMaker}
					icon={IconMaker}
					eventHandlers={{
						click: handleMakerClick,
					}}
				>
					<Popup>
						Kinh độ : {positionMaker[1]}
						<br />
						Vĩ độ : {positionMaker[0]}
					</Popup>
				</Marker>
			)}
		</MapContainer>
	);
};

export default CustomMap;
