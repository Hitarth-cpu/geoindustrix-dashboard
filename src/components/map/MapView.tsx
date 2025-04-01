
import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { industrialLandData } from '@/services/industryData';
import { useLocation } from 'react-router-dom';
import { useToast } from '@/components/ui/use-toast';
import { MapPin, Navigation, Layers, SlidersHorizontal } from 'lucide-react';
import { MapContainer, TileLayer, Marker, Popup, CircleMarker, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default marker icons in react-leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});

// Component to set the map view to the selected location
const SetViewOnSelect = ({ center, zoom }: { center: [number, number], zoom: number }) => {
  const map = useMap();
  map.setView(center, zoom);
  return null;
};

const MapView = () => {
  const [mapboxToken, setMapboxToken] = useState('');
  const [showTokenInput, setShowTokenInput] = useState(false); // Changed to false since we're using Leaflet
  const [selectedLocation, setSelectedLocation] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [mapLayer, setMapLayer] = useState('standard'); // 'standard', 'satellite', 'terrain'
  const [showHeatmap, setShowHeatmap] = useState(false);
  const location = useLocation();
  const { toast } = useToast();
  const mapRef = useRef<L.Map | null>(null);

  const getMarkerColor = (infraIndex: number) => {
    if (infraIndex >= 8) return '#22c55e'; // green for good infrastructure
    if (infraIndex >= 6) return '#eab308'; // yellow for medium
    return '#ef4444'; // red for lower infrastructure
  };

  useEffect(() => {
    // Parse location data from URL query params
    const queryParams = new URLSearchParams(location.search);
    const locationParam = queryParams.get('location');
    
    if (locationParam) {
      try {
        const parsedLocation = JSON.parse(decodeURIComponent(locationParam));
        setSelectedLocation(parsedLocation);
        console.log("Selected location:", parsedLocation);
      } catch (error) {
        console.error("Error parsing location data:", error);
        toast({
          title: "Error",
          description: "Could not load location data",
          variant: "destructive",
        });
      }
    }
  }, [location.search, toast]);

  const getPlaceDetails = async (placeId: string) => {
    if (!placeId) return;
    
    setIsLoading(true);
    
    const data = JSON.stringify({
      place_id: placeId,
      fields: ['formatted_address', 'geometry', 'name', 'types', 'photos']
    });

    try {
      const response = await fetch('https://google-map-places-new-v2.p.rapidapi.com/v1/places:details', {
        method: 'POST',
        headers: {
          'x-rapidapi-key': 'e1f3594254msh88c163771928641p128bf0jsn1cd581689d65',
          'x-rapidapi-host': 'google-map-places-new-v2.p.rapidapi.com',
          'Content-Type': 'application/json',
          'X-Goog-FieldMask': '*'
        },
        body: data
      });
      
      const result = await response.json();
      console.log('Place details:', result);
      return result;
      
    } catch (error) {
      console.error('Error fetching place details:', error);
      toast({
        title: "API Error",
        description: "Could not fetch place details",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (selectedLocation?.placeId) {
      getPlaceDetails(selectedLocation.placeId);
    }
  }, [selectedLocation]);

  // Determine center based on selected location or default to India
  const mapCenter: [number, number] = selectedLocation?.googleLocation 
    ? [selectedLocation.googleLocation.latitude, selectedLocation.googleLocation.longitude]
    : [22.5726, 72.9424]; // Center of India

  const getTileLayer = () => {
    switch(mapLayer) {
      case 'satellite':
        return {
          url: 'https://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}',
          attribution: '&copy; Google',
          subdomains: ['mt0', 'mt1', 'mt2', 'mt3']
        };
      case 'terrain':
        return {
          url: 'https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png',
          attribution: '&copy; OpenTopoMap contributors',
          subdomains: ['a', 'b', 'c']
        };
      default:
        return {
          url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
          attribution: '&copy; OpenStreetMap contributors',
          subdomains: ['a', 'b', 'c']
        };
    }
  };

  const tileLayerProps = getTileLayer();

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
              <form 
                onSubmit={(e) => {
                  e.preventDefault();
                  setShowTokenInput(false);
                }}
                className="space-y-4"
              >
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
      ) : null}

      <div className="h-full w-full bg-slate-200 relative overflow-hidden rounded-lg">
        <div className="absolute inset-0">
          <MapContainer 
            center={mapCenter} 
            zoom={7} 
            ref={mapRef}
            style={{ height: '100%', width: '100%' }}
            zoomControl={false}
          >
            {selectedLocation && (
              <SetViewOnSelect center={selectedLocation.googleLocation ? 
                [selectedLocation.googleLocation.latitude, selectedLocation.googleLocation.longitude] : 
                [22.5726, 72.9424]} 
                zoom={10} 
              />
            )}
            
            <TileLayer
              url={tileLayerProps.url}
              attribution={tileLayerProps.attribution}
              subdomains={tileLayerProps.subdomains}
            />
            
            {/* Plot all industrial locations */}
            {industrialLandData.map((location, index) => {
              const isSelected = selectedLocation && 
                location.talukaName === selectedLocation.talukaName && 
                location.state === selectedLocation.state;
                
              // Use Google location coordinates if available for selected location
              const markerPosition: [number, number] = 
                isSelected && selectedLocation.googleLocation ? 
                [selectedLocation.googleLocation.latitude, selectedLocation.googleLocation.longitude] : 
                [20.5937 + (index * 0.3), 78.9629 + (index * 0.2)]; // Arbitrary positions if no coordinates
              
              return (
                <React.Fragment key={index}>
                  <Marker 
                    position={markerPosition} 
                    icon={new L.Icon({
                      iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
                      iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
                      shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
                      iconSize: [25, 41],
                      iconAnchor: [12, 41],
                      popupAnchor: [1, -34],
                      shadowSize: [41, 41]
                    })}
                  >
                    <Popup>
                      <div className="p-2">
                        <h3 className="font-semibold">{location.talukaName}</h3>
                        <p className="text-sm text-gray-600">{location.district}, {location.state}</p>
                        <div className="mt-2">
                          <p className="text-sm">Infrastructure Index: {location.infraIndex}/10</p>
                          <p className="text-sm">Land Price: ₹{location.landPrice}/sqm</p>
                        </div>
                      </div>
                    </Popup>
                  </Marker>
                  
                  {showHeatmap && (
                    <CircleMarker 
                      center={markerPosition}
                      radius={20}
                      fillColor={getMarkerColor(location.infraIndex)}
                      color={getMarkerColor(location.infraIndex)}
                      weight={1}
                      opacity={0.5}
                      fillOpacity={0.2}
                    />
                  )}
                </React.Fragment>
              );
            })}
          </MapContainer>
        </div>
        
        {/* Controls overlay */}
        <div className="absolute top-4 right-4 z-[1000] bg-white p-2 rounded-md shadow-md">
          <div className="flex flex-col space-y-2">
            <div className="relative">
              <button className="px-3 py-1 bg-purple-100 text-purple-800 rounded-md flex items-center w-full">
                <Layers className="h-4 w-4 mr-1" />
                Map Type
              </button>
              <select 
                className="absolute inset-0 w-full opacity-0 cursor-pointer"
                value={mapLayer}
                onChange={(e) => setMapLayer(e.target.value)}
              >
                <option value="standard">Standard</option>
                <option value="satellite">Satellite</option>
                <option value="terrain">Terrain</option>
              </select>
            </div>
            <button 
              className={`px-3 py-1 ${showHeatmap ? 'bg-purple-600 text-white' : 'bg-gray-100 text-gray-800'} rounded-md flex items-center`}
              onClick={() => setShowHeatmap(!showHeatmap)}
            >
              <SlidersHorizontal className="h-4 w-4 mr-1" />
              Heatmap
            </button>
          </div>
        </div>
        
        {/* Selected location info panel */}
        {selectedLocation && (
          <div className="absolute top-4 left-4 z-[1000] bg-white p-4 rounded-md shadow-md max-w-xs">
            <h3 className="font-medium text-lg border-b pb-2 mb-3 flex items-center">
              <MapPin className="h-4 w-4 text-purple-600 mr-2" />
              {selectedLocation.formattedAddress || `${selectedLocation.talukaName}, ${selectedLocation.district}`}
            </h3>
            <div className="space-y-2 text-sm">
              <p><span className="font-medium">State:</span> {selectedLocation.state}</p>
              <p><span className="font-medium">Land Price:</span> ₹{selectedLocation.landPrice}/sqm</p>
              <p><span className="font-medium">Labor Availability:</span> {selectedLocation.laborAvail}</p>
              <p><span className="font-medium">Infrastructure:</span> {selectedLocation.infraIndex}/10</p>
              <p><span className="font-medium">Incentives:</span> {selectedLocation.govtIncentives}</p>
              {selectedLocation.placeId && (
                <p><span className="font-medium">Google Place ID:</span> {selectedLocation.placeId.substring(0, 10)}...</p>
              )}
              {selectedLocation.googleLocation && (
                <p className="flex items-center">
                  <Navigation className="h-3 w-3 mr-1 text-purple-600" />
                  <span className="font-medium">Coordinates:</span> 
                  {selectedLocation.googleLocation.latitude.toFixed(4)}, 
                  {selectedLocation.googleLocation.longitude.toFixed(4)}
                </p>
              )}
            </div>
          </div>
        )}
        
        <div className="absolute bottom-4 left-4 right-4 z-[1000] bg-white p-3 rounded-md shadow-md">
          <p className="text-sm font-medium mb-1">Map Legend</p>
          <div className="flex items-center space-x-4 text-xs">
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-geo-blue mr-1"></div>
              <span>Industrial Zones</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-purple-600 mr-1"></div>
              <span>Selected Location</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-green-500 mr-1"></div>
              <span>High Infrastructure</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-yellow-500 mr-1"></div>
              <span>Medium Infrastructure</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-red-500 mr-1"></div>
              <span>Low Infrastructure</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MapView;
