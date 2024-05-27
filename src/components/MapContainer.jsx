import React from "react";
import ReactMapGL, { Marker } from "react-map-gl";

const MapContainer = () => {
  const [viewport, setViewport] = React.useState({
    width: "100%",
    height: 400,
    latitude: 44.504945, // Latitudine della posizione del ristorante
    longitude: 11.351908, // Longitudine della posizione del ristorante
    zoom: 14,
  });

  return (
    <div className="h-50">
      <ReactMapGL
        {...viewport}
        mapStyle="mapbox://styles/mapbox/streets-v11"
        mapboxApiAccessToken="pk.eyJ1IjoiZ2lvdmlmYWxjbyIsImEiOiJjbHdvcGx4bTcxdWE1Mm1yeTd4cjFkYm44In0.iDfcltlkxLfyc6ZtfiVPSQ"
        onViewportChange={(viewport) => setViewport(viewport)}
      >
        <Marker latitude={44.504945} longitude={11.351908}>
          <div>You are here</div>
        </Marker>
      </ReactMapGL>
    </div>
  );
};

export default MapContainer;
