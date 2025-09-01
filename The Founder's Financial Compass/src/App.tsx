import React, { useState } from 'react';
import { WelcomeStage } from './components/WelcomeStage';
import { StageContainer } from './components/StageContainer';
import { ProgressIndicator } from './components/ProgressIndicator';
import { NavigationControls } from './components/NavigationControls';

export interface Choice {
  id: string;
  title: string;
  description: string;
  immediateImplication: string;
  longTermImplication: string;
  impact: 'positive' | 'negative' | 'neutral';
}

export interface FundingBreakdown {
  category: string;
  amount: number;
  color: string;
}

export interface Scenario {
  id: string;
  title: string;
  description: string;
  choices: Choice[];
  includeFundingCalculator?: boolean;
}

export interface Stage {
  id: string;
  title: string;
  description: string;
  scenarios: Scenario[];
}

const stages: Stage[] = [
  {
    id: 'seed',
    title: 'Seed Stage',
    description: 'You\'re at the beginning of your venture journey. Critical decisions about funding and resource allocation will shape your company\'s future.',
    scenarios: [
      {
        id: 'funding-source',
        title: 'Initial Funding Decision',
        description: 'Based on your business parameters below, you need funding to develop your MVP and validate your business model. Choose your funding approach:',
        includeFundingCalculator: true,
        choices: [
          {
            id: 'bootstrap',
            title: 'Bootstrap with Personal Savings',
            description: 'Use your own savings and revenue to fund growth organically.',
            immediateImplication: 'You maintain 100% equity and full control over business decisions. May need to reduce scope or extend timeline due to limited capital.',
            longTermImplication: 'Slower initial growth but stronger financial discipline. You retain full ownership for future fundraising rounds.',
            impact: 'neutral'
          },
          {
            id: 'friends-family',
            title: 'Friends & Family Round',
            description: 'Raise money from people who know and trust you personally.',
            immediateImplication: 'Quick access to capital with flexible terms. Can typically raise 25-50% of calculated need. Personal relationships become business relationships.',
            longTermImplication: 'Good launching pad for future institutional investors. Risk of straining personal relationships if business struggles.',
            impact: 'positive'
          },
          {
            id: 'angel-investor',
            title: 'Angel Investor',
            description: 'Seek investment from experienced entrepreneurs who can provide mentorship.',
            immediateImplication: 'Can typically cover your full calculated funding need plus valuable industry expertise and network access. Give up 15-25% equity.',
            longTermImplication: 'Strong foundation for scaling with experienced guidance. Angel may help attract future VC funding.',
            impact: 'positive'
          }
        ]
      }
    ]
  },
  {
    id: 'early-fundraising',
    title: 'Early-Stage Fundraising',
    description: 'Your MVP is gaining traction. It\'s time to scale, but you need to choose the right type of investor and funding structure.',
    scenarios: [
      {
        id: 'investor-type',
        title: 'Choosing Your Lead Investor',
        description: 'You\'re raising a $2M Series A. Multiple investor types are interested, each bringing different advantages and expectations.',
        choices: [
          {
            id: 'traditional-vc',
            title: 'Traditional Venture Capital',
            description: 'Partner with an established VC firm focused on rapid scaling.',
            immediateImplication: '$2M raised with strong brand recognition. High growth expectations and board seat requirements.',
            longTermImplication: 'Access to extensive networks and follow-on funding. Pressure for aggressive scaling and potential exit timeline constraints.',
            impact: 'neutral'
          },
          {
            id: 'strategic-investor',
            title: 'Strategic Corporate Investor',
            description: 'Accept investment from a large corporation in your industry.',
            immediateImplication: 'Capital plus potential partnership opportunities and market validation from established player.',
            longTermImplication: 'Access to corporate resources and distribution channels. Risk of strategic conflicts and limited exit options.',
            impact: 'neutral'
          },
          {
            id: 'micro-vc',
            title: 'Micro VC Fund',
            description: 'Work with a smaller, more hands-on venture capital fund.',
            immediateImplication: 'More personalized attention and flexible terms. Smaller check size may require multiple investors.',
            longTermImplication: 'Closer founder-investor relationship with less pressure. May need additional investors for future large rounds.',
            impact: 'positive'
          }
        ]
      }
    ]
  },
  {
    id: 'growth-scaling',
    title: 'Growth & Scaling',
    description: 'Your business is growing rapidly. Now you must navigate complex decisions about business model optimization and cash flow management.',
    scenarios: [
      {
        id: 'business-model',
        title: 'Revenue Model Optimization',
        description: 'You have multiple revenue streams showing promise. You need to decide where to focus your resources for maximum growth.',
        choices: [
          {
            id: 'subscription-focus',
            title: 'Double Down on Subscription Revenue',
            description: 'Focus entirely on building a strong recurring revenue base.',
            immediateImplication: 'Predictable cash flow and higher customer lifetime value. Slower initial revenue growth.',
            longTermImplication: 'Strong fundamentals for valuation and sustainable growth. Attractive to investors seeking predictable returns.',
            impact: 'positive'
          },
          {
            id: 'transaction-focus',
            title: 'Maximize Transaction Volume',
            description: 'Optimize for high-volume, transaction-based revenue.',
            immediateImplication: 'Rapid revenue growth with immediate market validation. Higher customer acquisition costs and churn risk.',
            longTermImplication: 'Requires constant growth in transaction volume. More volatile cash flows but potential for rapid scaling.',
            impact: 'neutral'
          },
          {
            id: 'hybrid-model',
            title: 'Balanced Hybrid Approach',
            description: 'Maintain multiple revenue streams while optimizing each.',
            immediateImplication: 'Diversified risk and multiple growth levers. Complex operations and resource allocation challenges.',
            longTermImplication: 'Resilient business model with multiple paths to profitability. May dilute focus and slow optimization.',
            impact: 'neutral'
          }
        ]
      }
    ]
  }
];

export default function App() {
  const [currentStageIndex, setCurrentStageIndex] = useState(-1); // -1 for welcome screen
  const [completedChoices, setCompletedChoices] = useState<Record<string, string>>({});
  const [showResults, setShowResults] = useState<Record<string, boolean>>({});
  const [calculatedFunding, setCalculatedFunding] = useState<number>(0);
  const [fundingBreakdown, setFundingBreakdown] = useState<FundingBreakdown[]>([]);

  const handleChoice = (scenarioId: string, choiceId: string) => {
    setCompletedChoices(prev => ({
      ...prev,
      [scenarioId]: choiceId
    }));
    setShowResults(prev => ({
      ...prev,
      [scenarioId]: true
    }));
  };

  const handleFundingCalculated = (amount: number, breakdown: FundingBreakdown[]) => {
    setCalculatedFunding(amount);
    setFundingBreakdown(breakdown);
  };

  const handleNextStage = () => {
    if (currentStageIndex < stages.length - 1) {
      setCurrentStageIndex(prev => prev + 1);
    }
  };

  const handlePrevStage = () => {
    if (currentStageIndex > -1) {
      setCurrentStageIndex(prev => prev - 1);
    }
  };

  const handleStartJourney = () => {
    setCurrentStageIndex(0);
  };

  const getCurrentStage = () => {
    if (currentStageIndex === -1) return null;
    return stages[currentStageIndex];
  };

  const isStageComplete = (stage: Stage) => {
    return stage.scenarios.every(scenario => completedChoices[scenario.id]);
  };

  const canProceed = () => {
    const currentStage = getCurrentStage();
    return currentStage ? isStageComplete(currentStage) : false;
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="text-center mb-8">
          <h1 className="mb-4">The Founder's Financial Compass</h1>
          <p className="text-muted-foreground">
            Navigate the critical financial decisions of your startup journey
          </p>
        </div>

        {currentStageIndex >= 0 && (
          <ProgressIndicator 
            stages={stages}
            currentStageIndex={currentStageIndex}
            completedChoices={completedChoices}
          />
        )}

        <div className="mb-8">
          {currentStageIndex === -1 ? (
            <WelcomeStage onStart={handleStartJourney} />
          ) : (
            <StageContainer
              stage={getCurrentStage()!}
              completedChoices={completedChoices}
              showResults={showResults}
              onChoice={handleChoice}
              calculatedFunding={calculatedFunding}
              fundingBreakdown={fundingBreakdown}
              onFundingCalculated={handleFundingCalculated}
            />
          )}
        </div>

        {currentStageIndex >= 0 && (
          <NavigationControls
            canGoBack={currentStageIndex > 0}
            canGoNext={canProceed()}
            isLastStage={currentStageIndex === stages.length - 1}
            onPrev={handlePrevStage}
            onNext={handleNextStage}
          />
        )}
      </div>
    </div>
  );
}