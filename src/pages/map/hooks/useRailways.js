import * as React from 'react';
import { MapboxLayer } from '@deck.gl/mapbox';
import { GeoJsonLayer } from '@deck.gl/layers';
import chroma from 'chroma-js';
import { uuid } from '@/utils';

const { features = [] } = require('@/assets/data/features.json');

const useRailways = function(map) {
  React.useLayoutEffect(() => {
    if (!map) return;

    const layerId1 = `railways-ug-${uuid()}`;
    const myGeoJsonLayer1 = new MapboxLayer({
      id: layerId1,
      type: GeoJsonLayer,
      data: features.filter(({ properties: { altitude, type, zoom } = {} }) => {
        return altitude < 0 && type === 0 && zoom === 16;
      }),
      filled: false,
      stroked: true,
      getLineColor: ({ properties: { color } = {} }) => chroma(color).rgb(),
      getLineWidth: ({ properties: { width } = {} }) => width,
      lineWidthUnits: 'meters',
      lineWidthScale: 1,
      lineJointRounded: true,
      opacity: 0.0625,
    });

    const layerId2 = `railways-og-${uuid()}`;
    const myGeoJsonLayer2 = new MapboxLayer({
      id: layerId2,
      type: GeoJsonLayer,
      data: features.filter(({ properties: { altitude, type, zoom } = {} }) => {
        return altitude === 0 && type === 0 && zoom === 16;
      }),
      filled: false,
      stroked: true,
      getLineColor: ({ properties: { color } = {} }) => chroma(color).rgb(),
      getLineWidth: ({ properties: { width } = {} }) => width,
      lineWidthUnits: 'meters',
      lineWidthScale: 1,
      lineJointRounded: true,
      opacity: 0.7,
    });

    map.addLayer(myGeoJsonLayer1);
    map.addLayer(myGeoJsonLayer2);
    map.setLayerZoomRange(layerId1, 14);
    map.setLayerZoomRange(layerId2, 14);
    return () => {
      map.getLayer(layerId1) && map.removeLayer(layerId1);
      map.getLayer(layerId2) && map.removeLayer(layerId2);
    };
  }, [map]);
};

export default useRailways;
