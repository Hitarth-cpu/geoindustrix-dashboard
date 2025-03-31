
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { stateIndustryData } from '@/services/industryData';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';

const StateIndustryTable = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Active Industries by State</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>State</TableHead>
              <TableHead className="text-right">Total Industries</TableHead>
              <TableHead>Top Sector</TableHead>
              <TableHead className="text-right">Growth Rate</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {stateIndustryData.map((item, index) => (
              <TableRow key={index}>
                <TableCell className="font-medium">{item.state}</TableCell>
                <TableCell className="text-right">{item.totalIndustries.toLocaleString()}</TableCell>
                <TableCell>{item.topSector}</TableCell>
                <TableCell className="text-right text-green-500">+{item.growthRate}%</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default StateIndustryTable;
