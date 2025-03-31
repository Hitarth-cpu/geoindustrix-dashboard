
import React, { useState } from 'react';
import { Provider } from 'react-redux';
import { addDataToMap } from 'kepler.gl/actions';
import KeplerGl from 'kepler.gl';
import store from '@/store/store';
import { industrialLandData } from '@/services/industryData';
import { Card, CardContent } from '@/components/ui/card';
import 'kepler.gl/dist/mapbox-css';

const MapView = () => {
  const [mapboxToken, setMapboxToken] = useState('');
  const [showTokenInput, setShowTokenInput] = useState(true);

  const handleSubmitToken = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Convert industrial land data to GeoJSON format
    const features = industrialLandData.map((location, index) => ({
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [
          // These are placeholder coordinates. In a real app, you'd use actual coordinates
          78 + (Math.random() * 10 - 5), // longitude (roughly India)
          22 + (Math.random() * 8 - 4),  // latitude (roughly India)
        ]
      },
      properties: {
        id: index,
        name: location.talukaName,
        state: location.state,
        industry: location.industry,
        landPrice: location.landPrice,
        laborAvailability: location.laborAvailability,
        infrastructureIndex: location.infrastructureIndex,
      }
    }));

    const geojsonData = {
      type: 'FeatureCollection',
      features
    };

    // Dispatch action to add data to the map
    store.dispatch(
      addDataToMap({
        datasets: [{
          info: {
            label: 'Industrial Land Data',
            id: 'industrial_data'
          },
          data: geojsonData
        }],
        options: {
          centerMap: true,
        },
        config: {}
      })
    );
    
    setShowTokenInput(false);
  };

  return (
    <div className="h-[calc(100vh-5rem)] relative">
      {showTokenInput ? (
        <div className="absolute inset-0 flex items-center justify-center bg-background/80 backdrop-blur-sm z-10">
          <Card className="w-[400px]">
            <CardContent className="pt-6">
              <h3 className="text-lg font-medium mb-4">Enter Mapbox Token</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Please enter your Mapbox public token to view the map. You can find this in your Mapbox account dashboard.
              </p>
              <form onSubmit={handleSubmitToken} className="space-y-4">
                <input
                  type="text"
                  value={mapboxToken}
                  onChange={(e) => setMapboxToken(e.target.value)}
                  placeholder="pk.eyJ1Ijoi..."
                  className="w-full p-2 border rounded-md"
                  required
                />
                <button 
                  type="submit"
                  className="w-full py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
                >
                  Submit
                </button>
              </form>
            </CardContent>
          </Card>
        </div>
      ) : (
        <Provider store={store}>
          <KeplerGl
            id="map"
            mapboxApiAccessToken={mapboxToken}
            width="100%"
            height="100%"
          />
        </Provider>
      )}
    </div>
  );
};

export default MapView;
