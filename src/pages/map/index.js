import * as React from 'react';
import ReactMapGL, { TRANSITION_EVENTS, LinearInterpolator } from 'react-map-gl';

const IndexPage = () => {
  const [viewport, setViewport] = React.useState({
    longitude: 139.767,
    latitude: 35.6814,
    zoom: 15.5,
    bearing: 0,
    pitch: 60,
    scrollZoom: !0,
    dragPan: !0,
    dragRotate: !0,
    doubleClickZoom: !0,
  });

  const handleViewportChange = (viewState) => setViewport({ ...viewport, ...viewState });

  return (
    <ReactMapGL
      {...viewport}
      preventStyleDiffing={!1}
      mapStyle="mapbox://styles/huang6349/ck2bc8x950n0a1cop1vd03xxl?optimize=true"
      width="100%"
      height="100%"
      minZoom={12}
      maxZoom={22}
      transitionInterruption={TRANSITION_EVENTS.IGNORE}
      transitionInterpolator={new LinearInterpolator()}
      onViewportChange={handleViewportChange}
    ></ReactMapGL>
  );
};

export default IndexPage;
