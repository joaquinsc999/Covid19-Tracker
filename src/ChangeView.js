//import React from 'react'
import { useMap } from "react-leaflet"

function ChangeView({ center, zoom } ) {
    const map = useMap();
    //console.log("VIEWWWWWWWW", center)
    map.setView(center, zoom);
    return (
        null
    )
}

export default ChangeView
