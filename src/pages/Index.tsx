
import React from 'react';
import Navbar from '@/components/layout/Navbar';
import IndustryTypesChart from '@/components/dashboard/IndustryTypesChart';
import StateIndustryTable from '@/components/dashboard/StateIndustryTable';
import CountrySalesTable from '@/components/dashboard/CountrySalesTable';
import IndustrialGrowthChart from '@/components/dashboard/IndustrialGrowthChart';
import IndustrySearch from '@/components/ai/IndustrySearch';
import { Layers, Globe, Map, Filter } from 'lucide-react';
import StatCard from '@/components/dashboard/StatCard';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="container py-6">
        <div className="flex flex-col gap-2 mb-6">
          <h1 className="text-3xl font-bold tracking-tight">Place Pro Dashboard</h1>
          <p className="text-muted-foreground">
            Industrial location intelligence and analytics platform
          </p>
        </div>
        
        {/* Make Industry Search the focal point */}
        <div className="grid grid-cols-1 mb-8">
          <IndustrySearch />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          <StatCard 
            title="Total Industry Zones" 
            value="1,458" 
            icon={<Layers className="h-5 w-5" />}
            change={{ value: "12.3%", positive: true }}
          />
          
          <StatCard 
            title="Registered Territories" 
            value="27" 
            icon={<Globe className="h-5 w-5" />}
            change={{ value: "5 new", positive: true }}
          />
          
          <StatCard 
            title="Land Area Coverage" 
            value="23,421 km²" 
            icon={<Map className="h-5 w-5" />}
            change={{ value: "3.5%", positive: true }}
          />
          
          <StatCard 
            title="Industry Categories" 
            value="42" 
            icon={<Filter className="h-5 w-5" />}
            change={{ value: "2 new", positive: true }}
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-6 mb-6">
          <IndustryTypesChart />
          <StateIndustryTable />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <CountrySalesTable />
        </div>
        
        <div className="grid grid-cols-1 gap-6">
          <IndustrialGrowthChart />
        </div>
      </main>
    </div>
  );
};

export default Index;
