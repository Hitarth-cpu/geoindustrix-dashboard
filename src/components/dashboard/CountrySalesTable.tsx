
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { countrySalesData } from '@/services/industryData';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';

const CountrySalesTable = () => {
  return (
    <Card className="col-span-1 md:col-span-2">
      <CardHeader>
        <CardTitle>Sales by Country & Industry Preferences</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Country</TableHead>
              <TableHead className="text-right">Sales</TableHead>
              <TableHead className="text-right">Value</TableHead>
              <TableHead className="text-right">Bounce</TableHead>
              <TableHead>Top Industries</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {countrySalesData.map((item, index) => (
              <TableRow key={index}>
                <TableCell className="font-medium">{item.country}</TableCell>
                <TableCell className="text-right">{item.sales.toLocaleString()}</TableCell>
                <TableCell className="text-right">${(item.value / 1000000).toFixed(2)}M</TableCell>
                <TableCell className="text-right">{item.bounce}</TableCell>
                <TableCell>
                  <div className="flex flex-wrap gap-1">
                    {item.topIndustries.slice(0, 3).map((industry, i) => (
                      <Badge key={i} variant="outline" className="bg-primary/10">
                        {industry}
                      </Badge>
                    ))}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default CountrySalesTable;
