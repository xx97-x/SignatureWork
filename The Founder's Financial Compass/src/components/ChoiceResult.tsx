import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Choice, FundingBreakdown } from '../App';
import { Clock, TrendingUp, AlertTriangle, CheckCircle, DollarSign } from 'lucide-react';

interface ChoiceResultProps {
  choice: Choice;
  calculatedFunding?: number;
  fundingBreakdown?: FundingBreakdown[];
}

export function ChoiceResult({ choice, calculatedFunding, fundingBreakdown }: ChoiceResultProps) {
  const getImpactIcon = () => {
    switch (choice.impact) {
      case 'positive':
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'negative':
        return <AlertTriangle className="w-4 h-4 text-red-600" />;
      default:
        return <TrendingUp className="w-4 h-4 text-blue-600" />;
    }
  };

  const getImpactColor = () => {
    switch (choice.impact) {
      case 'positive':
        return 'border-green-200 bg-green-50';
      case 'negative':
        return 'border-red-200 bg-red-50';
      default:
        return 'border-blue-200 bg-blue-50';
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        {getImpactIcon()}
        <span>Decision Analysis</span>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <Card className={`${getImpactColor()} border-2`}>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm flex items-center gap-2">
              <Clock className="w-4 h-4" />
              Immediate Impact
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <p className="text-sm">{choice.immediateImplication}</p>
          </CardContent>
        </Card>

        <Card className={`${getImpactColor()} border-2`}>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm flex items-center gap-2">
              <TrendingUp className="w-4 h-4" />
              Long-term Impact
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <p className="text-sm">{choice.longTermImplication}</p>
          </CardContent>
        </Card>
      </div>

      {calculatedFunding && choice.id && (
        <Card className="bg-primary/5 border-primary/20">
          <CardContent className="p-4">
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-sm font-medium">
                <DollarSign className="w-4 h-4 text-primary" />
                Funding Impact Analysis
              </div>
              <div className="text-sm space-y-2">
                {choice.id === 'bootstrap' && (
                  <div className="space-y-1">
                    <p>• You'll need to fund ${calculatedFunding.toLocaleString()} from personal savings</p>
                    <p>• Consider reducing team size or extending timeline to lower costs</p>
                    <p>• Revenue must cover operating expenses within your timeline</p>
                  </div>
                )}
                {choice.id === 'friends-family' && (
                  <div className="space-y-1">
                    <p>• Target raise: ${Math.round(calculatedFunding * 0.5).toLocaleString()} - ${calculatedFunding.toLocaleString()}</p>
                    <p>• Typical individual investment: $5,000 - $25,000</p>
                    <p>• You'll need 3-8 family/friend investors</p>
                  </div>
                )}
                {choice.id === 'angel-investor' && (
                  <div className="space-y-1">
                    <p>• Angel can typically cover your full ${calculatedFunding.toLocaleString()} need</p>
                    <p>• Expect to give up 15-25% equity (~${Math.round(calculatedFunding * 0.2).toLocaleString()} valuation)</p>
                    <p>• Angels often provide follow-on funding for growth</p>
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <Card className="bg-muted/30">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <p className="text-xs text-muted-foreground">
              This decision will influence your options in future stages
            </p>
            <Badge variant="outline" className="text-xs">
              {choice.impact === 'positive' ? 'Strategic Advantage' : 
               choice.impact === 'negative' ? 'Potential Challenge' : 
               'Neutral Impact'}
            </Badge>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}