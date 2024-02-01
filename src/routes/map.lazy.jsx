import { createLazyFileRoute } from '@tanstack/react-router'
import { useEffect, useState } from 'react'
import * as L from 'leaflet'

export const Route = createLazyFileRoute('/map')({
    component: Map,
})

function Map() {
    const [data, setData] = useState()

    useEffect(() => {
        getData()
    }, [])

    async function getData() {
        let resp = await fetch('https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&starttime=2014-01-01&endtime=2014-01-02&orderby=magnitude&%22')
        const d = await resp.json()
        setData(d)
    } 

    function loadEarthquakes() {
        var map = L.map('map').setView([48.505, -110.09], 3)
        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
            attribution:
                '&copy; <a href="http://www.openstreetmak.org/copyright">OpenStreetMap</a>',
        }).addTo(map)

        L.geoJSON(data.features, {
            onEachFeature: function (feature, layer) {
                layer.bindPopup(
                    "<ul><li>location: " + feature.properties.place + "</li><li>magnitude: " + feature.properties.mag + "</li></ul>"
                )
            }
        }).addTo(map);
    }

    return (
        <div className="p-2">
            <button onClick={loadEarthquakes}>Load Map</button>
            <div id="map" style={{height: '80vh'}}></div>
        </div>
    )
}
