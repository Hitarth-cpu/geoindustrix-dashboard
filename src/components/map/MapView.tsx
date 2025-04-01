
import React, { useState, useEffect, useRef } from 'react';
import { Card } from '@/components/ui/card';
import { industrialLandData, getAllIndustryTypes } from '@/services/industryData';
import { useLocation, useNavigate } from 'react-router-dom';
import { useToast } from '@/components/ui/use-toast';
import { MapPin, Layers, SlidersHorizontal, Filter, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';

const MapView = () => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<maplibregl.Map | null>(null);
  const [selectedLocation, setSelectedLocation] = useState<any>(null);
  const [mapLayer, setMapLayer] = useState('standard'); // 'standard', 'satellite', 'terrain'
  const [showHeatmap, setShowHeatmap] = useState(false);
  const [initializedMap, setInitializedMap] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredLocations, setFilteredLocations] = useState<any[]>([]);
  const [selectedIndustry, setSelectedIndustry] = useState<string>('');
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const industryTypes = getAllIndustryTypes();

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

  useEffect(() => {
    // Initialize map if container is available
    if (!mapContainer.current || initializedMap) return;

    // Initialize the MapLibre map
    map.current = new maplibregl.Map({
      container: mapContainer.current,
      style: {
        version: 8,
        sources: {
          'osm': {
            type: 'raster',
            tiles: [
              'https://a.tile.openstreetmap.org/{z}/{x}/{y}.png',
              'https://b.tile.openstreetmap.org/{z}/{x}/{y}.png',
              'https://c.tile.openstreetmap.org/{z}/{x}/{y}.png'
            ],
            tileSize: 256,
            attribution: '© OpenStreetMap contributors'
          }
        },
        layers: [
          {
            id: 'osm-tiles',
            type: 'raster',
            source: 'osm',
            minzoom: 0,
            maxzoom: 19
          }
        ]
      },
      center: [78.9629, 20.5937], // Center on India
      zoom: 5
    });

    // Add navigation controls
    map.current.addControl(new maplibregl.NavigationControl(), 'top-right');

    // Map is ready
    map.current.on('load', () => {
      setInitializedMap(true);
      toast({
        title: "Map initialized",
        description: "Using OpenStreetMap with MapLibre GL",
      });
      
      // Add markers for industrial locations
      addLocationMarkers();
    });

    // Cleanup
    return () => {
      if (map.current) {
        map.current.remove();
        map.current = null;
      }
    };
  }, [mapContainer.current]);

  // Add effect to update map style when mapLayer changes
  useEffect(() => {
    if (!map.current || !initializedMap) return;
    
    // Change the map style based on the selected layer
    switch (mapLayer) {
      case 'satellite':
        map.current.setStyle({
          version: 8,
          sources: {
            'satellite': {
              type: 'raster',
              tiles: [
                'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}'
              ],
              tileSize: 256,
              attribution: 'Tiles © Esri — Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
            }
          },
          layers: [
            {
              id: 'satellite-tiles',
              type: 'raster',
              source: 'satellite',
              minzoom: 0,
              maxzoom: 19
            }
          ]
        });
        break;
      case 'terrain':
        map.current.setStyle({
          version: 8,
          sources: {
            'terrain': {
              type: 'raster',
              tiles: [
                'https://tile.opentopomap.org/{z}/{x}/{y}.png'
              ],
              tileSize: 256,
              attribution: 'Map data: © OpenStreetMap contributors, SRTM | Map style: © OpenTopoMap (CC-BY-SA)'
            }
          },
          layers: [
            {
              id: 'terrain-tiles',
              type: 'raster',
              source: 'terrain',
              minzoom: 0,
              maxzoom: 17
            }
          ]
        });
        break;
      default: // standard
        map.current.setStyle({
          version: 8,
          sources: {
            'osm': {
              type: 'raster',
              tiles: [
                'https://a.tile.openstreetmap.org/{z}/{x}/{y}.png',
                'https://b.tile.openstreetmap.org/{z}/{x}/{y}.png',
                'https://c.tile.openstreetmap.org/{z}/{x}/{y}.png'
              ],
              tileSize: 256,
              attribution: '© OpenStreetMap contributors'
            }
          },
          layers: [
            {
              id: 'osm-tiles',
              type: 'raster',
              source: 'osm',
              minzoom: 0,
              maxzoom: 19
            }
          ]
        });
    }
    
    // Re-add markers after style change
    map.current.once('style.load', () => {
      addLocationMarkers();
    });
  }, [mapLayer, initializedMap]);

  // Add effect to show/hide heatmap
  useEffect(() => {
    if (!map.current || !initializedMap) return;

    // Toggle heatmap layer
    if (showHeatmap) {
      // Create heatmap data
      const heatmapData = {
        type: 'FeatureCollection',
        features: industrialLandData.map(location => ({
          type: 'Feature',
          properties: {
            intensity: location.infraIndex / 10 // Normalize to 0-1
          },
          geometry: {
            type: 'Point',
            coordinates: [
              location.coordinates?.lng || 78 + Math.random() * 5, 
              location.coordinates?.lat || 20 + Math.random() * 5
            ]
          }
        }))
      };

      // Add heatmap source and layer
      if (!map.current.getSource('heatmap-data')) {
        map.current.addSource('heatmap-data', {
          type: 'geojson',
          data: heatmapData as any
        });
      } else {
        (map.current.getSource('heatmap-data') as maplibregl.GeoJSONSource).setData(heatmapData as any);
      }

      // Add heatmap layer if it doesn't exist
      if (!map.current.getLayer('heatmap-layer')) {
        map.current.addLayer({
          id: 'heatmap-layer',
          type: 'heatmap',
          source: 'heatmap-data',
          paint: {
            'heatmap-weight': ['get', 'intensity'],
            'heatmap-intensity': 0.5,
            'heatmap-color': [
              'interpolate',
              ['linear'],
              ['heatmap-density'],
              0, 'rgba(0, 0, 255, 0)',
              0.2, 'rgba(0, 0, 255, 0.5)',
              0.4, 'rgba(0, 255, 255, 0.5)',
              0.6, 'rgba(0, 255, 0, 0.5)',
              0.8, 'rgba(255, 255, 0, 0.5)',
              1, 'rgba(255, 0, 0, 0.5)'
            ],
            'heatmap-radius': 30,
            'heatmap-opacity': 0.8
          }
        });
      } else {
        map.current.setLayoutProperty('heatmap-layer', 'visibility', 'visible');
      }
    } else {
      // Hide heatmap if exists
      if (map.current.getLayer('heatmap-layer')) {
        map.current.setLayoutProperty('heatmap-layer', 'visibility', 'none');
      }
    }
  }, [showHeatmap, initializedMap]);

  // Focus on selected location
  useEffect(() => {
    if (!map.current || !initializedMap || !selectedLocation || !selectedLocation.coordinates) return;
    
    // Fly to selected location
    map.current.flyTo({
      center: [selectedLocation.coordinates.lng, selectedLocation.coordinates.lat],
      zoom: 10,
      essential: true,
      duration: 2000
    });
    
    // Add or update a special marker for the selected location
    const markerElement = document.createElement('div');
    markerElement.className = 'selected-marker';
    markerElement.style.width = '20px';
    markerElement.style.height = '20px';
    markerElement.style.borderRadius = '50%';
    markerElement.style.backgroundColor = '#9333ea'; // Purple
    markerElement.style.border = '2px solid white';
    markerElement.style.boxShadow = '0 0 10px rgba(147, 51, 234, 0.7)';
    
    // Remove existing selected marker if any
    document.querySelectorAll('.selected-marker-container').forEach(el => el.remove());
    
    const markerContainer = document.createElement('div');
    markerContainer.className = 'selected-marker-container';
    markerContainer.appendChild(markerElement);
    
    new maplibregl.Marker(markerContainer)
      .setLngLat([selectedLocation.coordinates.lng, selectedLocation.coordinates.lat])
      .addTo(map.current);
      
    // Add popup with info
    new maplibregl.Popup({
      offset: 25,
      closeButton: false,
      closeOnClick: false
    })
      .setLngLat([selectedLocation.coordinates.lng, selectedLocation.coordinates.lat])
      .setHTML(`
        <strong>${selectedLocation.talukaName}, ${selectedLocation.district || ''}</strong>
        <p>State: ${selectedLocation.state}</p>
        <p>Score: ${selectedLocation.infraIndex || 'N/A'}/10</p>
      `)
      .addTo(map.current);
      
  }, [selectedLocation, initializedMap]);

  // Filter locations based on search term and industry
  useEffect(() => {
    let results = [...industrialLandData];
    
    if (searchTerm) {
      const search = searchTerm.toLowerCase();
      results = results.filter(
        loc => 
          loc.talukaName.toLowerCase().includes(search) || 
          loc.district.toLowerCase().includes(search) || 
          loc.state.toLowerCase().includes(search)
      );
    }
    
    if (selectedIndustry) {
      results = results.filter(loc => 
        loc.industrySuitability.some(ind => 
          ind.toLowerCase() === selectedIndustry.toLowerCase()
        )
      );
    }
    
    setFilteredLocations(results);
  }, [searchTerm, selectedIndustry]);

  const addLocationMarkers = () => {
    if (!map.current) return;
    
    // Remove existing markers
    document.querySelectorAll('.location-marker-container').forEach(el => el.remove());
    
    // Add markers for all industrial locations
    industrialLandData.forEach(location => {
      // Skip if no coordinates
      if (!location.coordinates) return;
      
      // Create marker element
      const markerElement = document.createElement('div');
      markerElement.className = 'location-marker';
      markerElement.style.width = '10px';
      markerElement.style.height = '10px';
      markerElement.style.borderRadius = '50%';
      markerElement.style.backgroundColor = '#3b82f6'; // Blue
      markerElement.style.border = '2px solid white';
      
      // Create container
      const markerContainer = document.createElement('div');
      markerContainer.className = 'location-marker-container';
      markerContainer.appendChild(markerElement);
      
      // Add marker to map
      const markerObj = new maplibregl.Marker(markerContainer)
        .setLngLat([location.coordinates.lng, location.coordinates.lat])
        .addTo(map.current!);
        
      // Add popup on hover
      const popup = new maplibregl.Popup({
        offset: 15,
        closeButton: false,
        closeOnClick: false
      }).setHTML(`
        <strong>${location.talukaName}</strong>
        <p>${location.district}, ${location.state}</p>
      `);
      
      markerContainer.addEventListener('mouseenter', () => {
        markerObj.setPopup(popup);
        popup.addTo(map.current!);
      });
      
      markerContainer.addEventListener('mouseleave', () => {
        popup.remove();
      });
      
      // Click event to select location
      markerContainer.addEventListener('click', () => {
        setSelectedLocation(location);
      });
    });
  };

  const handleViewOnFilter = (location: any) => {
    // Save current view and navigate to filter page with location
    const encodedLocation = encodeURIComponent(JSON.stringify(location));
    navigate(`/filter?location=${encodedLocation}`);
  };

  return (
    <div className="h-[calc(100vh-5rem)] relative">
      <div className="h-full w-full bg-slate-200 relative overflow-hidden rounded-lg" ref={mapContainer}>
        {/* Search and Filters */}
        <div className="absolute top-4 left-4 z-10 bg-white p-3 rounded-md shadow-md w-72 max-w-xs">
          <div className="flex mb-3 items-center space-x-2">
            <div className="relative flex-1">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search locations..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Select
              value={selectedIndustry}
              onValueChange={setSelectedIndustry}
            >
              <SelectTrigger className="w-[130px]">
                <SelectValue placeholder="Industry" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All Industries</SelectItem>
                {industryTypes.map((type, idx) => (
                  <SelectItem key={idx} value={type}>{type}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          {filteredLocations.length > 0 && (
            <div className="max-h-48 overflow-y-auto">
              {filteredLocations.slice(0, 6).map((loc, idx) => (
                <div 
                  key={idx} 
                  className="p-2 hover:bg-gray-100 rounded cursor-pointer mb-1 border border-gray-100"
                  onClick={() => setSelectedLocation(loc)}
                >
                  <div className="font-medium">{loc.talukaName}</div>
                  <div className="text-sm text-muted-foreground">{loc.district}, {loc.state}</div>
                </div>
              ))}
              {filteredLocations.length > 6 && (
                <div className="text-xs text-center text-muted-foreground mt-1">
                  + {filteredLocations.length - 6} more results
                </div>
              )}
            </div>
          )}
        </div>

        {/* Map Controls */}
        <div className="absolute top-4 right-4 flex flex-col gap-2 z-10">
          <div className="bg-white p-2 rounded-md shadow-md">
            <select 
              className="w-full text-sm border-0 focus:ring-0"
              value={mapLayer}
              onChange={(e) => setMapLayer(e.target.value)}
            >
              <option value="standard">Standard Map</option>
              <option value="satellite">Satellite</option>
              <option value="terrain">Terrain</option>
            </select>
          </div>
          
          <Button 
            variant={showHeatmap ? "default" : "outline"}
            size="sm"
            onClick={() => setShowHeatmap(!showHeatmap)}
            className="bg-white text-black hover:bg-gray-100 border shadow-md"
          >
            <SlidersHorizontal className="h-4 w-4 mr-1" />
            Heatmap
          </Button>
        </div>
        
        {/* Selected location info panel */}
        {selectedLocation && (
          <div className="absolute top-4 left-80 bg-white p-4 rounded-md shadow-md max-w-xs z-10">
            <h3 className="font-medium text-lg border-b pb-2 mb-3 flex items-center">
              <MapPin className="h-4 w-4 text-purple-600 mr-2" />
              {selectedLocation.talukaName}, {selectedLocation.district || ''}
            </h3>
            <div className="space-y-2 text-sm">
              <p><span className="font-medium">State:</span> {selectedLocation.state}</p>
              <p><span className="font-medium">Population Density:</span> {selectedLocation.popDensity}/sqkm</p>
              <p><span className="font-medium">Land Price:</span> ₹{selectedLocation.landPrice}/sqm</p>
              <p><span className="font-medium">Labor Availability:</span> {selectedLocation.laborAvail}</p>
              <p><span className="font-medium">Labor Cost:</span> ₹{selectedLocation.laborCost}/day</p>
              <p><span className="font-medium">Infrastructure:</span> {selectedLocation.infraIndex}/10</p>
              <p><span className="font-medium">Industry Suitability:</span> {selectedLocation.industrySuitability.join(', ')}</p>
              <p><span className="font-medium">Govt. Incentives:</span> {selectedLocation.govtIncentives}</p>
              
              {selectedLocation.coordinates && (
                <p className="text-xs mt-2">
                  GPS: {selectedLocation.coordinates.lat.toFixed(4)}, {selectedLocation.coordinates.lng.toFixed(4)}
                </p>
              )}
              
              <div className="pt-3 mt-2 border-t">
                <Button 
                  size="sm" 
                  className="w-full"
                  onClick={() => handleViewOnFilter(selectedLocation)}
                >
                  <Filter className="h-4 w-4 mr-1" />
                  View in Filters
                </Button>
              </div>
            </div>
          </div>
        )}
        
        {/* Map Legend */}
        <div className="absolute bottom-4 left-4 right-4 bg-white p-3 rounded-md shadow-md z-10">
          <p className="text-sm font-medium mb-1">Map Legend</p>
          <div className="flex items-center space-x-4 text-xs">
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-blue-600 mr-1"></div>
              <span>Industrial Zones</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-purple-600 mr-1"></div>
              <span>Selected Location</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-green-500 mr-1"></div>
              <span>Urban Centers</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-amber-500 mr-1"></div>
              <span>Special Economic Zones</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MapView;
