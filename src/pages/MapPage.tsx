
import React from 'react';
import Navbar from '@/components/layout/Navbar';
import MapView from '@/components/map/MapView';

const MapPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="container py-6">
        <div className="flex flex-col gap-2 mb-6">
          <h1 className="text-3xl font-bold tracking-tight">Industrial Location Map</h1>
          <p className="text-muted-foreground">
            Explore industrial zones across India with detailed location data and filtering options
          </p>
        </div>
        
        <MapView />
      </main>
    </div>
  );
};

export default MapPage;
