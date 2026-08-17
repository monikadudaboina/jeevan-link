import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import { useState, useEffect } from "react";

function LocationMap() {
  const [userLocation, setUserLocation] = useState({ lat: 16.3067, lng: 81.4833 }); // Tadepalligudem center

  // Blood camp locations
  const bloodCamps = [
    { id: 1, name: "Jeevan Blood Bank", lat: 16.2833, lng: 81.3167, type: "camp" },
    { id: 2, name: "Red Cross Center", lat: 16.5333, lng: 81.5167, type: "camp" },
    { id: 3, name: "City Medical Camp", lat: 16.2667, lng: 81.0833, type: "camp" },
  ];

  // Blood request locations
  const bloodRequests = [
    { id: 1, name: "Jeevan Hospital", lat: 16.2833, lng: 81.3167, type: "request", distance: "18 km" },
    { id: 2, name: "City Care Clinic", lat: 16.5333, lng: 81.5167, type: "request", distance: "2.5 km" },
    { id: 3, name: "Sanjivani Hospital", lat: 16.2667, lng: 81.0833, type: "request", distance: "32 km" },
    { id: 4, name: "Narasapuram Medical", lat: 16.4167, lng: 81.2167, type: "request", distance: "15 km" },
  ];

  const mapContainerStyle = {
    width: "100%",
    height: "400px",
    borderRadius: "12px",
    overflow: "hidden",
  };

  const mapCenter = {
    lat: 16.3067,
    lng: 81.4833,
  };

  const mapOptions = {
    zoom: 10,
    streetViewControl: false,
    fullscreenControl: true,
    mapTypeControl: true,
  };

  return (
    <div className="map-container" style={{ marginTop: "24px" }}>
      <h2 style={{ marginBottom: "16px", fontSize: "18px", fontWeight: "600" }}>
        <i className="fa-solid fa-map" style={{ marginRight: "8px", color: "var(--primary-red)" }}></i>
        Blood Camps & Requests Map
      </h2>
      
      <LoadScript googleMapsApiKey="AIzaSyDemoKeyPlaceholder">
        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          center={mapCenter}
          zoom={10}
          options={mapOptions}
        >
          {/* Blood Camp Markers */}
          {bloodCamps.map((camp) => (
            <Marker
              key={`camp-${camp.id}`}
              position={{ lat: camp.lat, lng: camp.lng }}
              title={camp.name}
              icon={{
                path: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5 7.67 11 8.5 11zm3.5 6.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z",
                fillColor: "#E63946",
                fillOpacity: 1,
                strokeColor: "white",
                strokeWeight: 2,
                scale: 1.5,
              }}
            />
          ))}

          {/* Blood Request Markers */}
          {bloodRequests.map((request) => (
            <Marker
              key={`request-${request.id}`}
              position={{ lat: request.lat, lng: request.lng }}
              title={request.name}
              icon={{
                path: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z",
                fillColor: "#FF6B6B",
                fillOpacity: 1,
                strokeColor: "white",
                strokeWeight: 2,
                scale: 1.5,
              }}
            />
          ))}
        </GoogleMap>
      </LoadScript>

      {/* Legend */}
      <div
        style={{
          marginTop: "16px",
          padding: "16px",
          background: "#f5f5f5",
          borderRadius: "8px",
          display: "flex",
          gap: "24px",
          fontSize: "13px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <span
            style={{
              width: "16px",
              height: "16px",
              backgroundColor: "#E63946",
              borderRadius: "50%",
              border: "2px solid white",
            }}
          ></span>
          <span>Blood Camps</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <span
            style={{
              width: "16px",
              height: "16px",
              backgroundColor: "#FF6B6B",
              borderRadius: "50%",
              border: "2px solid white",
            }}
          ></span>
          <span>Blood Requests</span>
        </div>
      </div>

      <div
        style={{
          marginTop: "12px",
          padding: "12px",
          background: "#fff3cd",
          borderRadius: "8px",
          fontSize: "12px",
          color: "#856404",
          borderLeft: "4px solid #ffc107",
        }}
      >
        <strong>Note:</strong> To enable the map, add your Google Maps API key to the LocationMap component.
      </div>
    </div>
  );
}

export default LocationMap;
