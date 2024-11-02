"use client";
import styles from "./page.module.css";
import { useEffect, useState, useRef } from "react";
import {
    APIProvider,
    Map,
    useMap,
    useMapsLibrary,
    AdvancedMarker,
    Pin,
} from "@vis.gl/react-google-maps";

export default function Mapp() {
    const position = { lat: 45.6, lng: 25.6 };

    return (
        <APIProvider
            apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ''}
            libraries={['places']}
        >
            <div className={styles.container}>
                <h1 className={styles.h1}>Plan your journey here</h1>
                <div className={styles.body}>
                    <Directions />
                    <div className={styles.map}>
                        <Map
                            defaultZoom={5}
                            defaultCenter={position}
                            mapId={process.env.NEXT_PUBLIC_MAP_ID}
                            // fullscreenControl={false}
                        >
                            {/* This is where the map is rendered */}
                        </Map>
                    </div>
                </div>
            </div>
        </APIProvider>
    );
}

function WaypointInput({ index, value, updateWaypoint }: { index: number, value: string, updateWaypoint: (index: number, value: string) => void }) {
    const waypointRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (waypointRef.current && window.google) {
            const { google } = window;

            const waypointAutocomplete = new google.maps.places.Autocomplete(waypointRef.current!);
            waypointAutocomplete.setFields(['place_id', 'geometry', 'name']);

            waypointAutocomplete.addListener('place_changed', () => {
                const place = waypointAutocomplete.getPlace();
                if (place.geometry && place.geometry.location) {
                    updateWaypoint(index, place.name || place.formatted_address || '');
                }
            });
        }
    }, [index, updateWaypoint]);

    return (
        <div>
            <input type="datetime-local" />
            <input
                ref={waypointRef}
                type="text"
                // placeholder={`Enter waypoint ${index + 1}`}
                placeholder="Add a stop"
                defaultValue={value}
                // Removing the onChange handler here to avoid updating the state on every keystroke
                className={styles.inputWaypoint}
            />
        </div>
    );
}

function Directions() {
    const map = useMap();
    const routesLibrary = useMapsLibrary('routes');

    const [directionsService, setDirectionsService] = useState<google.maps.DirectionsService>();
    const [directionsRenderer, setDirectionsRenderer] = useState<google.maps.DirectionsRenderer>();

    const [origin, setOrigin] = useState<string>("");
    const [destination, setDestination] = useState<string>("");
    const [waypoints, setWaypoints] = useState<Array<string>>([]);

    const originRef = useRef<HTMLInputElement>(null);
    const destinationRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (!routesLibrary || !map) return;
        setDirectionsService(new routesLibrary.DirectionsService());
        setDirectionsRenderer(new routesLibrary.DirectionsRenderer({ map }));
    }, [routesLibrary, map]);

    useEffect(() => {
        // Only make the directions request when all inputs are finalized
        if (!directionsService || !directionsRenderer || !origin || !destination) return;
        if (waypoints.some(waypoint => !waypoint)) return;

        directionsService.route({
            origin,
            destination,
            waypoints: waypoints.map(waypoint => ({ location: waypoint })),
            travelMode: google.maps.TravelMode.DRIVING,
        }).then(response => {
            directionsRenderer.setDirections(response);
        }).catch(error => {
            console.error("Directions request failed due to " + error.message);
        });
    }, [directionsService, directionsRenderer, origin, destination, waypoints]);

    useEffect(() => {
        if (map && originRef.current && destinationRef.current && window.google) {
            const { google } = window;
            const originAutocomplete = new google.maps.places.Autocomplete(originRef.current!);
            const destinationAutocomplete = new google.maps.places.Autocomplete(destinationRef.current!);

            originAutocomplete.setFields(['place_id', 'geometry', 'name']);
            destinationAutocomplete.setFields(['place_id', 'geometry', 'name']);

            originAutocomplete.addListener('place_changed', () => {
                const place = originAutocomplete.getPlace();
                if (place.geometry && place.geometry.location) {
                    setOrigin(place.name || place.formatted_address || '');
                }
            });

            destinationAutocomplete.addListener('place_changed', () => {
                const place = destinationAutocomplete.getPlace();
                if (place.geometry && place.geometry.location) {
                    setDestination(place.name || place.formatted_address || '');
                }
            });
        }
    }, [map]);

    const addWaypoint = () => {
        setWaypoints([...waypoints, ""]);
    };

    const updateWaypoint = (index: number, value: string) => {
        const newWaypoints = [...waypoints];
        newWaypoints[index] = value;
        setWaypoints(newWaypoints);
    };

    return (
        <div className={styles.directions}>
            <div className={styles.origin}>
                <input type="datetime-local" />
                <input 
                    ref={originRef}
                    type="text"
                    placeholder="Select the start of your journey"
                />
            </div>
            <div className={styles.waypoint}>
                {waypoints.map((waypoint, index) => (
                    <WaypointInput
                        key={index}
                        index={index}
                        value={waypoint}
                        updateWaypoint={updateWaypoint}
                    />
                ))}
                <button onClick={addWaypoint} className={styles.addButton}>+</button>
            </div>
            <div className={styles.destination}>
                <input type="datetime-local" />
                <input
                    ref={destinationRef}
                    type="text"
                    placeholder="Select your destination"
                />
            </div>
        </div>
    )
}
