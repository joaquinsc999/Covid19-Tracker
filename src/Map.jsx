import React from "react";
import { MapContainer , TileLayer } from 'react-leaflet'
import ChangeView from "./ChangeView.js";
import "./Map.css";
import { showDataOnMap } from "./util.js"


function Map({ center, zoom, countries, casesType }) {

    //console.log("MAPPPPPPP", center)
    return (
        <div className="map">
            <MapContainer center={[34.80746, -40.4796]} zoom={3}>
                <ChangeView center={center} zoom={zoom}/>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {showDataOnMap(countries, casesType)}
            </MapContainer>
        </div>
    )
}

export default Map
