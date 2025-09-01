import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { ChoiceResult } from './ChoiceResult';
import { Scenario, FundingBreakdown } from '../App';
import { CheckCircle, DollarSign } from 'lucide-react';

interface ScenarioCardProps {
  scenario: Scenario;
  selectedChoiceId?: string;
  showResult: boolean;
  onChoice: (choiceId: string) => void;
  calculatedFunding?: number;
  fundingBreakdown?: FundingBreakdown[];
}

export function ScenarioCard({ 
  scenario, 
  selectedChoiceId, 
  showResult, 
  onChoice,
  calculatedFunding,
  fundingBreakdown
}: ScenarioCardProps) {
  const selectedChoice = selectedChoiceId 
    ? scenario.choices.find(choice => choice.id === selectedChoiceId)
    : null;

  return (
    <Card className="relative">
      {selectedChoiceId && (
        <div className="absolute -top-2 -right-2">
          <div className="bg-primary rounded-full p-1">
            <CheckCircle className="w-4 h-4 text-primary-foreground" />
          </div>
        </div>
      )}
      
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          {scenario.title}
          {selectedChoiceId && (
            <Badge variant="default" className="text-xs">
              Decision Made
            </Badge>
          )}
        </CardTitle>
        <CardDescription>{scenario.description}</CardDescription>
        {scenario.includeFundingCalculator && calculatedFunding && (
          <div className="mt-3 p-3 bg-primary/5 rounded-lg border border-primary/20">
            <div className="flex items-center gap-2 text-sm">
              <DollarSign className="w-4 h-4 text-primary" />
              <span className="font-medium">
                Calculated funding needed: ${calculatedFunding.toLocaleString()}
              </span>
            </div>
          </div>
        )}
      </CardHeader>

      <CardContent className="space-y-4">
        {!selectedChoiceId ? (
          <div className="space-y-3">
            <p className="text-sm text-muted-foreground">Choose your approach:</p>
            {scenario.choices.map((choice) => (
              <Card 
                key={choice.id} 
                className="cursor-pointer hover:bg-muted/50 transition-colors border-2 hover:border-primary/20"
                onClick={() => onChoice(choice.id)}
              >
                <CardContent className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="text-sm font-medium">{choice.title}</h4>
                    <Badge 
                      variant={
                        choice.impact === 'positive' ? 'default' : 
                        choice.impact === 'negative' ? 'destructive' : 
                        'secondary'
                      }
                      className="text-xs"
                    >
                      {choice.impact === 'positive' ? 'Recommended' : 
                       choice.impact === 'negative' ? 'High Risk' : 
                       'Balanced'}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{choice.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            <Card className="bg-primary/5 border-primary/20">
              <CardContent className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="text-sm font-medium">Your Choice: {selectedChoice?.title}</h4>
                  <Badge 
                    variant={
                      selectedChoice?.impact === 'positive' ? 'default' : 
                      selectedChoice?.impact === 'negative' ? 'destructive' : 
                      'secondary'
                    }
                    className="text-xs"
                  >
                    {selectedChoice?.impact === 'positive' ? 'Recommended' : 
                     selectedChoice?.impact === 'negative' ? 'High Risk' : 
                     'Balanced'}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">{selectedChoice?.description}</p>
              </CardContent>
            </Card>

            {showResult && selectedChoice && (
              <ChoiceResult 
                choice={selectedChoice} 
                calculatedFunding={calculatedFunding}
                fundingBreakdown={fundingBreakdown}
              />
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}