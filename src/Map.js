import React, { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
// import { MapboxDirections } from '@mapbox/mapbox-gl-directions';
import { NEW_YORK_CITY } from './constants';
import './map.css';

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_TOKEN;

export const Map = () => {
  const mapContainer = useRef(null);

  const setupMap = center => {
    const map = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center,
      zoom: 15
    });

    const nav = new mapboxgl.NavigationControl();
    map.addControl(nav);

    // const directions = new MapboxDirections({
    //   accessToken: process.env.REACT_APP_MAPBOX_TOKEN
    // });

    // map.addControl(directions, 'top-left');
  }

  useEffect(() => {
    const successLocation = position => {
      const { longitude, latitude } = position.coords;
      setupMap([longitude, latitude]);
    };

    const errorLocation = () => setupMap(NEW_YORK_CITY);

    navigator.geolocation.getCurrentPosition(
      successLocation,
      errorLocation,
      { enableHighAccuracy: true }
    );
  }, []);


  return <div ref={mapContainer} className="mapStyle"></div>;
}
