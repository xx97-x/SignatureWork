import React from 'react';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Stage } from '../App';
import { CheckCircle, Circle, ArrowRight } from 'lucide-react';

interface ProgressIndicatorProps {
  stages: Stage[];
  currentStageIndex: number;
  completedChoices: Record<string, string>;
}

export function ProgressIndicator({ 
  stages, 
  currentStageIndex, 
  completedChoices 
}: ProgressIndicatorProps) {
  const isStageComplete = (stage: Stage) => {
    return stage.scenarios.every(scenario => completedChoices[scenario.id]);
  };

  const getStageStatus = (index: number) => {
    if (index < currentStageIndex) return 'completed';
    if (index === currentStageIndex) {
      return isStageComplete(stages[index]) ? 'completed' : 'current';
    }
    return 'upcoming';
  };

  return (
    <Card className="mb-8">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          {stages.map((stage, index) => {
            const status = getStageStatus(index);
            
            return (
              <React.Fragment key={stage.id}>
                <div className="flex flex-col items-center space-y-2">
                  <div className={`
                    flex items-center justify-center w-10 h-10 rounded-full border-2 transition-colors
                    ${status === 'completed' 
                      ? 'bg-primary border-primary text-primary-foreground' 
                      : status === 'current'
                      ? 'bg-primary/10 border-primary text-primary'
                      : 'bg-muted border-muted-foreground/20 text-muted-foreground'
                    }
                  `}>
                    {status === 'completed' ? (
                      <CheckCircle className="w-5 h-5" />
                    ) : (
                      <Circle className="w-5 h-5" />
                    )}
                  </div>
                  
                  <div className="text-center">
                    <p className={`text-xs font-medium ${
                      status === 'current' ? 'text-primary' : 'text-muted-foreground'
                    }`}>
                      {stage.title}
                    </p>
                    <Badge 
                      variant={status === 'completed' ? 'default' : 'secondary'}
                      className="text-xs mt-1"
                    >
                      {status === 'completed' ? 'Complete' : 
                       status === 'current' ? 'In Progress' : 
                       'Upcoming'}
                    </Badge>
                  </div>
                </div>
                
                {index < stages.length - 1 && (
                  <ArrowRight className={`w-4 h-4 ${
                    index < currentStageIndex ? 'text-primary' : 'text-muted-foreground/50'
                  }`} />
                )}
              </React.Fragment>
            );
          })}
        </div>
        
        <div className="mt-4 pt-4 border-t">
          <div className="flex justify-between items-center text-xs text-muted-foreground">
            <span>
              Stage {currentStageIndex + 1} of {stages.length}: {stages[currentStageIndex]?.title}
            </span>
            <span>
              {Object.keys(completedChoices).length} decisions made
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}