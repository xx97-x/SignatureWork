import React from 'react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { ArrowLeft, ArrowRight, Trophy } from 'lucide-react';

interface NavigationControlsProps {
  canGoBack: boolean;
  canGoNext: boolean;
  isLastStage: boolean;
  onPrev: () => void;
  onNext: () => void;
}

export function NavigationControls({ 
  canGoBack, 
  canGoNext, 
  isLastStage, 
  onPrev, 
  onNext 
}: NavigationControlsProps) {
  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex justify-between items-center">
          <Button 
            variant="outline" 
            onClick={onPrev} 
            disabled={!canGoBack}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Previous Stage
          </Button>

          <div className="text-center">
            {!canGoNext && (
              <p className="text-xs text-muted-foreground">
                Complete all scenarios to continue
              </p>
            )}
          </div>

          <Button 
            onClick={onNext} 
            disabled={!canGoNext}
            className="flex items-center gap-2"
            variant={isLastStage ? "default" : "default"}
          >
            {isLastStage ? (
              <>
                Complete Journey
                <Trophy className="w-4 h-4" />
              </>
            ) : (
              <>
                Next Stage
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </Button>
        </div>

        {canGoNext && !isLastStage && (
          <div className="mt-3 pt-3 border-t text-center">
            <p className="text-xs text-muted-foreground">
              Ready to move forward! Your decisions from this stage will influence future scenarios.
            </p>
          </div>
        )}

        {canGoNext && isLastStage && (
          <div className="mt-3 pt-3 border-t text-center">
            <p className="text-xs text-muted-foreground">
              Congratulations! You've navigated through all the critical financial decisions of your startup journey.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}