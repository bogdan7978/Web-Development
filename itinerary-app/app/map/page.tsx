"use client"; 
// Ensures that this component is executed only on the client side (browser), 
// and not during server-side rendering in Next.js.

import styles from "./page.module.css"; 
// Imports scoped CSS module styles specific to this component.

import { useEffect, useState, useRef } from "react"; 
// Imports React hooks: useEffect for side effects, useState for state management, 
// and useRef for creating references to DOM elements.

import {
    APIProvider,  // Provides the Google Maps API context to the components inside.
    Map,          // Renders the Google Map.
    AdvancedMarker, // Displays a customizable marker on the map.
    Pin,           // The visual representation of the marker.
    useMap,        // Hook to access the map instance.
    useMapsLibrary, // Hook to load additional Google Maps libraries.
} from "@vis.gl/react-google-maps"; // Importing components from the Google Maps React library.

export default function Mapp() {
    const position = { lat: 45.6, lng: 25.6 }; 
    // Defines the initial latitude and longitude coordinates for centering the map.

    return (
        <APIProvider
            apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ''} 
            // Fetches the Google Maps API key from environment variables. 
            // If the key is undefined, it defaults to an empty string.
            libraries={['places']} 
            // Ensures that the Google Places Library is loaded, 
            // which is required for the autocomplete feature.
        >
            <div className={styles.map}> 
            {/* Container div for the map, styled using the .map class from the CSS module. */}
                <Map
                    defaultZoom={5} 
                    // Sets the initial zoom level of the map.
                    defaultCenter={position} 
                    // Centers the map on the specified latitude and longitude.
                    mapId={process.env.NEXT_PUBLIC_MAP_ID} 
                    // Optionally uses a specific map ID for custom styling.
                    fullscreenControl={false} 
                    // Disables the fullscreen control on the map.
                >
                    {/* <AdvancedMarker position={position}>  */}
                    {/* Places a customizable marker at the specified coordinates. */}
                        {/* <Pin background={"grey"} borderColor={"green"} glyphColor={"purple"} />  */}
                        {/* Defines the visual appearance of the marker with custom colors. */}
                    {/* </AdvancedMarker> */}
                    <Directions /> 
                    {/* Renders the Directions component that handles route calculation 
                    and rendering on the map. */}
                </Map>
            </div>
        </APIProvider>
    );
}

function Directions() {
    const map = useMap(); 
    // Accesses the current map instance using the useMap hook.
    const routesLibrary = useMapsLibrary('routes'); 
    // Loads the Google Maps Routes Library, needed to calculate and render routes.

    // State variables for managing the DirectionsService and DirectionsRenderer instances.
    const [directionsService, setDirectionsService] = useState<google.maps.DirectionsService>();
    const [directionsRenderer, setDirectionsRenderer] = useState<google.maps.DirectionsRenderer>();

    // State variables for storing user input for origin and destination.
    const [origin, setOrigin] = useState<string>("");
    const [destination, setDestination] = useState<string>("");

    // Refs for the origin and destination input elements, used to attach autocomplete.
    const originRef = useRef<HTMLInputElement>(null);
    const destinationRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (!routesLibrary || !map) return; 
        // If the routesLibrary or map is not yet available, exit early.

        // Initialize the DirectionsService and DirectionsRenderer with the map.
        setDirectionsService(new routesLibrary.DirectionsService());
        setDirectionsRenderer(new routesLibrary.DirectionsRenderer({ map }));
    }, [routesLibrary, map]); 
    // Dependency array ensures this effect runs whenever routesLibrary or map changes.

    useEffect(() => {
        if (!directionsService || !directionsRenderer || !origin || !destination) return; 
        // Exit early if any required dependency is missing.

        // Use DirectionsService to calculate the route from origin to destination.
        directionsService.route({
            origin,
            destination,
            travelMode: google.maps.TravelMode.DRIVING, 
            // Specifies that the route should be calculated for driving mode.
        }).then(response => {
            directionsRenderer.setDirections(response); 
            // Sets the calculated route on the map using the DirectionsRenderer.
        }).catch(error => {
            console.error("Directions request failed due to " + error); 
            // Logs any errors that occur during the directions request.
        });
    }, [directionsService, directionsRenderer, origin, destination]); 
    // This effect runs whenever directionsService, directionsRenderer, origin, or destination changes.

    useEffect(() => {
        if (map && originRef.current && destinationRef.current && window.google) {
            // Ensures that the map, input refs, and google object are available.

            // Destructure the google object from the global window object.
            const { google } = window;

            // Attach autocomplete functionality to the origin and destination inputs.
            const originAutocomplete = new google.maps.places.Autocomplete(originRef.current!);
            const destinationAutocomplete = new google.maps.places.Autocomplete(destinationRef.current!);

            // Restrict the fields returned by the autocomplete to place_id, geometry, and name.
            originAutocomplete.setFields(['place_id', 'geometry', 'name']);
            destinationAutocomplete.setFields(['place_id', 'geometry', 'name']);

            // Add event listeners to update state when the user selects a place.
            originAutocomplete.addListener('place_changed', () => {
                const place = originAutocomplete.getPlace();
                if (place.geometry && place.geometry.location) {
                    setOrigin(place.name || place.formatted_address || ''); 
                    // Update the origin state with the selected place name or address.
                }
            });

            destinationAutocomplete.addListener('place_changed', () => {
                const place = destinationAutocomplete.getPlace();
                if (place.geometry && place.geometry.location) {
                    setDestination(place.name || place.formatted_address || ''); 
                    // Update the destination state with the selected place name or address.
                }
            });
        }
    }, [map]); 
    // Dependency array ensures this effect runs only when the map is initialized.

    return (
        <div className={styles.directions}> 
        {/* Container div for the origin and destination input fields, styled with .directions. */}
            <input
                ref={originRef} 
                // Links this input to the originRef, allowing it to be referenced in the code.
                type="text"
                placeholder="Enter origin" 
                // Placeholder text displayed when the input is empty.
                className={styles.inputOrigin} 
                // Styles the input using the .input class from the CSS module.
            />
            <input
                ref={destinationRef} 
                // Links this input to the destinationRef.
                type="text"
                placeholder="Enter destination" 
                // Placeholder text for the destination input.
                className={styles.inputDestination} 
                // Styles the input with the .input class.
            />
        </div>
    );
}