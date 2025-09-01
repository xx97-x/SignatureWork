import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './ui/card';
import { ScenarioCard } from './ScenarioCard';
import { FundingCalculator } from './FundingCalculator';
import { Stage, FundingBreakdown } from '../App';

interface StageContainerProps {
  stage: Stage;
  completedChoices: Record<string, string>;
  showResults: Record<string, boolean>;
  onChoice: (scenarioId: string, choiceId: string) => void;
  calculatedFunding: number;
  fundingBreakdown: FundingBreakdown[];
  onFundingCalculated: (amount: number, breakdown: FundingBreakdown[]) => void;
}

export function StageContainer({ 
  stage, 
  completedChoices, 
  showResults, 
  onChoice,
  calculatedFunding,
  fundingBreakdown,
  onFundingCalculated
}: StageContainerProps) {
  return (
    <div className="space-y-6">
      <Card className="bg-gradient-to-r from-primary/5 to-secondary/5 border-primary/20">
        <CardHeader>
          <CardTitle>{stage.title}</CardTitle>
          <CardDescription>{stage.description}</CardDescription>
        </CardHeader>
      </Card>

      <div className="space-y-6">
        {stage.scenarios.map((scenario) => (
          <div key={scenario.id} className="space-y-4">
            {scenario.includeFundingCalculator && (
              <FundingCalculator onFundingCalculated={onFundingCalculated} />
            )}
            <ScenarioCard
              scenario={scenario}
              selectedChoiceId={completedChoices[scenario.id]}
              showResult={showResults[scenario.id]}
              onChoice={(choiceId) => onChoice(scenario.id, choiceId)}
              calculatedFunding={calculatedFunding}
              fundingBreakdown={fundingBreakdown}
            />
          </div>
        ))}
      </div>
    </div>
  );
}