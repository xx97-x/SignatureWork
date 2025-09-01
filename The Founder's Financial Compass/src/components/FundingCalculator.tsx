import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Label } from './ui/label';
import { Slider } from './ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Badge } from './ui/badge';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Calculator, Users, Calendar, Zap, Target, DollarSign } from 'lucide-react';

interface FundingBreakdown {
  category: string;
  amount: number;
  color: string;
}

interface FundingCalculatorProps {
  onFundingCalculated: (amount: number, breakdown: FundingBreakdown[]) => void;
}

export function FundingCalculator({ onFundingCalculated }: FundingCalculatorProps) {
  const [teamSize, setTeamSize] = useState([3]);
  const [timeline, setTimeline] = useState([12]);
  const [avgSalary, setAvgSalary] = useState([85000]);
  const [marketStrategy, setMarketStrategy] = useState('local');
  const [productComplexity, setProductComplexity] = useState('medium');
  const [customerAcquisition, setCustomerAcquisition] = useState('organic');

  const calculateFunding = () => {
    // Base calculations
    const teamCost = teamSize[0] * avgSalary[0] * (timeline[0] / 12);
    
    // Product development costs
    const complexityMultiplier = {
      'simple': 0.5,
      'medium': 1,
      'complex': 2
    };
    const devCost = 50000 * complexityMultiplier[productComplexity as keyof typeof complexityMultiplier];
    
    // Marketing costs based on strategy
    const marketingCosts = {
      'local': 15000,
      'national': 50000,
      'global': 150000
    };
    const marketingCost = marketingCosts[marketStrategy as keyof typeof marketingCosts] * (timeline[0] / 12);
    
    // Customer acquisition costs
    const acquisitionCosts = {
      'organic': 10000,
      'paid': 35000,
      'aggressive': 75000
    };
    const acquisitionCost = acquisitionCosts[customerAcquisition as keyof typeof acquisitionCosts] * (timeline[0] / 12);
    
    // Operations and overhead (15% of total)
    const operations = (teamCost + devCost + marketingCost + acquisitionCost) * 0.15;
    
    // Buffer (20% of total for unexpected costs)
    const buffer = (teamCost + devCost + marketingCost + acquisitionCost + operations) * 0.2;
    
    const total = teamCost + devCost + marketingCost + acquisitionCost + operations + buffer;
    
    const breakdown: FundingBreakdown[] = [
      { category: 'Team Salaries', amount: teamCost, color: '#8884d8' },
      { category: 'Product Development', amount: devCost, color: '#82ca9d' },
      { category: 'Marketing', amount: marketingCost, color: '#ffc658' },
      { category: 'Customer Acquisition', amount: acquisitionCost, color: '#ff7300' },
      { category: 'Operations', amount: operations, color: '#00c49f' },
      { category: 'Buffer (20%)', amount: buffer, color: '#ff8042' }
    ];
    
    return { total: Math.round(total), breakdown };
  };

  const { total, breakdown } = calculateFunding();

  useEffect(() => {
    onFundingCalculated(total, breakdown);
  }, [total, breakdown, onFundingCalculated]);

  const chartData = breakdown.map(item => ({
    name: item.category,
    value: item.amount,
    percentage: ((item.amount / total) * 100).toFixed(1)
  }));

  return (
    <Card className="bg-gradient-to-br from-primary/5 to-secondary/5 border-primary/20">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calculator className="w-5 h-5" />
          Interactive Funding Calculator
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Adjust your business parameters to see how much funding you'll need
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Input Controls */}
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label className="flex items-center gap-2">
                <Users className="w-4 h-4" />
                Team Size: {teamSize[0]} people
              </Label>
              <Slider
                value={teamSize}
                onValueChange={setTeamSize}
                max={15}
                min={1}
                step={1}
                className="w-full"
              />
              <p className="text-xs text-muted-foreground">
                Including founders, developers, and key hires
              </p>
            </div>

            <div className="space-y-2">
              <Label className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                Timeline: {timeline[0]} months
              </Label>
              <Slider
                value={timeline}
                onValueChange={setTimeline}
                max={24}
                min={6}
                step={3}
                className="w-full"
              />
              <p className="text-xs text-muted-foreground">
                How long until you expect to be profitable or raise next round
              </p>
            </div>

            <div className="space-y-2">
              <Label className="flex items-center gap-2">
                <DollarSign className="w-4 h-4" />
                Average Salary: ${avgSalary[0].toLocaleString()}/year
              </Label>
              <Slider
                value={avgSalary}
                onValueChange={setAvgSalary}
                max={150000}
                min={40000}
                step={5000}
                className="w-full"
              />
              <p className="text-xs text-muted-foreground">
                Average annual salary including benefits and equity
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label className="flex items-center gap-2">
                <Zap className="w-4 h-4" />
                Product Complexity
              </Label>
              <Select value={productComplexity} onValueChange={setProductComplexity}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="simple">Simple (MVP with core features)</SelectItem>
                  <SelectItem value="medium">Medium (Full-featured product)</SelectItem>
                  <SelectItem value="complex">Complex (Enterprise/AI/Hardware)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label className="flex items-center gap-2">
                <Target className="w-4 h-4" />
                Market Strategy
              </Label>
              <Select value={marketStrategy} onValueChange={setMarketStrategy}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="local">Local/Regional Launch</SelectItem>
                  <SelectItem value="national">National Market</SelectItem>
                  <SelectItem value="global">Global Expansion</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Customer Acquisition</Label>
              <Select value={customerAcquisition} onValueChange={setCustomerAcquisition}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="organic">Organic Growth</SelectItem>
                  <SelectItem value="paid">Paid Marketing</SelectItem>
                  <SelectItem value="aggressive">Aggressive Acquisition</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Results */}
        <Card className="bg-background">
          <CardContent className="p-4">
            <div className="text-center mb-4">
              <div className="text-2xl font-bold text-primary mb-2">
                ${total.toLocaleString()}
              </div>
              <Badge variant="secondary">Total Funding Required</Badge>
            </div>

            {/* Pie Chart */}
            <div className="h-64 mb-4">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={chartData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {chartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={breakdown[index].color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    formatter={(value: number) => [`$${value.toLocaleString()}`, 'Amount']}
                    labelFormatter={(label) => `${label}`}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>

            {/* Breakdown */}
            <div className="space-y-2">
              {breakdown.map((item, index) => (
                <div key={item.category} className="flex justify-between items-center text-sm">
                  <div className="flex items-center gap-2">
                    <div 
                      className="w-3 h-3 rounded-full" 
                      style={{ backgroundColor: item.color }}
                    />
                    <span>{item.category}</span>
                  </div>
                  <span className="font-medium">
                    ${item.amount.toLocaleString()} ({((item.amount / total) * 100).toFixed(1)}%)
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="text-xs text-muted-foreground bg-muted/50 p-3 rounded">
          <p className="font-medium mb-1">Calculation Notes:</p>
          <ul className="space-y-1">
            <li>• Average salary is customizable (default $85,000/year)</li>
            <li>• Includes 15% operations overhead and 20% buffer for unexpected costs</li>
            <li>• Marketing and acquisition costs scale with timeline and strategy</li>
            <li>• Based on estimated averages for educational purposes (values may vary significantly by industry and location)</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}