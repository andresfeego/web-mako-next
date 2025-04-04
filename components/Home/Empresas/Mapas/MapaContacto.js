import React from "react";
import GoogleMapReact from 'google-map-react';
import Image from "next/image";
import FmdGoodIcon from '@mui/icons-material/FmdGood';
import styles from './MapaContacto.module.scss'
const AnyReactComponent = ({ nombreEmpresa, urlLogo }) => (
    <div className={`${styles.location}`}>
        <div className={`${styles.markerLocation}`}>
            <Image alt={`Logo mapa de contacto para ${nombreEmpresa}`} className={`${styles.imageLocation}`} src={urlLogo} width={30} height={30} />
            <FmdGoodIcon className={`${styles.iconLocation}`} sx={{ fontSize: 40 }} />
        </div>
    </div>
);

export default function SimpleMap({ nombreEmpresa, lat, lng, urlLogo }) {
    const defaultProps = {
        center: {
            lat: parseFloat(lat),
            lng: parseFloat(lng)
        },
        zoom: 18
    };

    return (
        // Important! Always set the container height explicitly
        <div style={{ height: '100%', width: '100%' }}>
            <GoogleMapReact
                bootstrapURLKeys={{ key: "AIzaSyBVZYlG9TvXD9OFcX7VdVb5x2DIJ8bkQqM" }}
                defaultCenter={defaultProps.center}
                defaultZoom={defaultProps.zoom}
            >
                <AnyReactComponent
                    lat={parseFloat(lat)}
                    lng={parseFloat(lng)}
                    nombreEmpresa={nombreEmpresa}
                    urlLogo={urlLogo}
                />
            </GoogleMapReact>
        </div>
    );
}