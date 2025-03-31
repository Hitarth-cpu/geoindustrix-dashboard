
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { industrialLandData } from '@/services/industryData';
import { useLocation } from 'react-router-dom';
import { useToast } from '@/components/ui/use-toast';
import { MapPin } from 'lucide-react';

const MapView = () => {
  const [mapboxToken, setMapboxToken] = useState('');
  const [showTokenInput, setShowTokenInput] = useState(true);
  const [selectedLocation, setSelectedLocation] = useState<any>(null);
  const location = useLocation();
  const { toast } = useToast();

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

  const handleSubmitToken = (e: React.FormEvent) => {
    e.preventDefault();
    setShowTokenInput(false);
    
    toast({
      title: "Mapbox token saved",
      description: "Map is now being initialized",
    });
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
      ) : null}

      <div className="h-full w-full bg-slate-200 relative overflow-hidden rounded-lg">
        {/* Mock map with India outline */}
        <div className="absolute inset-0 flex items-center justify-center">
          <svg
            width="600"
            height="500"
            viewBox="0 0 600 500"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-full"
          >
            <path
              d="M400,100 Q450,150 430,200 Q420,250 450,300 Q470,350 450,400 Q400,420 350,400 Q300,410 250,400 Q200,420 150,400 Q130,350 150,300 Q170,250 150,200 Q130,150 180,100 Q230,80 300,100 Q350,80 400,100 Z"
              fill="#e2e8f0"
              stroke="#64748b"
              strokeWidth="2"
            />
          </svg>
          
          {/* Plot industrial locations */}
          {industrialLandData.map((location, index) => {
            const isSelected = selectedLocation && 
              location.talukaName === selectedLocation.talukaName && 
              location.state === selectedLocation.state;
              
            return (
              <div
                key={index}
                className={`absolute w-4 h-4 rounded-full ${isSelected ? 'bg-purple-600 animate-pulse' : 'bg-geo-blue'} transform -translate-x-1/2 -translate-y-1/2`}
                style={{
                  left: `${200 + (index * 50) % 300}px`,
                  top: `${150 + (index * 40) % 250}px`,
                  zIndex: 10,
                  scale: isSelected ? '1.5' : '1',
                  boxShadow: isSelected ? '0 0 10px rgba(147, 51, 234, 0.7)' : 'none'
                }}
              >
                {isSelected && (
                  <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 bg-white p-2 rounded shadow text-sm whitespace-nowrap z-20 font-medium flex items-center">
                    <MapPin className="h-3 w-3 text-purple-600 mr-1" />
                    {location.talukaName}, {location.state}
                  </div>
                )}
                <div className={`absolute -bottom-10 left-1/2 transform -translate-x-1/2 bg-white px-2 py-1 rounded shadow text-xs whitespace-nowrap ${isSelected ? 'hidden' : ''}`}>
                  {location.talukaName}, {location.state}
                </div>
              </div>
            );
          })}
        </div>
        
        {/* Selected location info panel */}
        {selectedLocation && (
          <div className="absolute top-4 left-4 bg-white p-4 rounded-md shadow-md max-w-xs">
            <h3 className="font-medium text-lg border-b pb-2 mb-3 flex items-center">
              <MapPin className="h-4 w-4 text-purple-600 mr-2" />
              {selectedLocation.talukaName}, {selectedLocation.district}
            </h3>
            <div className="space-y-2 text-sm">
              <p><span className="font-medium">State:</span> {selectedLocation.state}</p>
              <p><span className="font-medium">Land Price:</span> ₹{selectedLocation.landPrice}/sqm</p>
              <p><span className="font-medium">Labor Availability:</span> {selectedLocation.laborAvail}</p>
              <p><span className="font-medium">Infrastructure:</span> {selectedLocation.infraIndex}/10</p>
              <p><span className="font-medium">Incentives:</span> {selectedLocation.govtIncentives}</p>
            </div>
          </div>
        )}
        
        {/* Controls overlay */}
        <div className="absolute top-4 right-4 bg-white p-2 rounded-md shadow-md">
          <div className="flex flex-col space-y-2">
            <button className="p-1 hover:bg-slate-100 rounded">+</button>
            <button className="p-1 hover:bg-slate-100 rounded">−</button>
          </div>
        </div>
        
        <div className="absolute bottom-4 left-4 right-4 bg-white p-3 rounded-md shadow-md">
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
              <div className="w-3 h-3 rounded-full bg-geo-teal mr-1"></div>
              <span>Urban Centers</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-geo-purple mr-1"></div>
              <span>SEZ</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MapView;
