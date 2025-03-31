
import React from 'react';
import Navbar from '@/components/layout/Navbar';
import FilterComponent from '@/components/filter/FilterPage';

const FilterPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="container py-6">
        <div className="flex flex-col gap-2 mb-6">
          <h1 className="text-3xl font-bold tracking-tight">Advanced Filters</h1>
          <p className="text-muted-foreground">
            Find the optimal industrial locations for your business
          </p>
        </div>
        
        <FilterComponent />
      </main>
    </div>
  );
};

export default FilterPage;
