import React from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Rocket, TrendingUp, Target } from 'lucide-react';

interface WelcomeStageProps {
  onStart: () => void;
}

export function WelcomeStage({ onStart }: WelcomeStageProps) {
  return (
    <div className="space-y-8">
      <Card className="bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
        <CardHeader className="text-center">
          <CardTitle className="text-center">Welcome, Founder!</CardTitle>
          <p className="text-muted-foreground text-center max-w-2xl mx-auto">
            You're about to embark on a journey through the most critical financial decisions 
            every startup founder faces. Each choice you make will shape your company's future, 
            from seed funding to scaling success.
          </p>
        </CardHeader>
        <CardContent className="text-center">
          <Button onClick={onStart} size="lg" className="px-8">
            Begin Your Journey
          </Button>
        </CardContent>
      </Card>

      <div className="grid md:grid-cols-3 gap-6">
        <Card className="text-center">
          <CardHeader>
            <div className="mx-auto w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
              <Rocket className="w-6 h-6 text-primary" />
            </div>
            <CardTitle className="text-lg">Seed Stage</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Make foundational decisions about bootstrapping vs. external capital, 
              setting the stage for your venture's financial future.
            </p>
            <Badge variant="secondary">Foundation Building</Badge>
          </CardContent>
        </Card>

        <Card className="text-center">
          <CardHeader>
            <div className="mx-auto w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
              <TrendingUp className="w-6 h-6 text-primary" />
            </div>
            <CardTitle className="text-lg">Early Fundraising</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Navigate investor relationships and funding structures while 
              maintaining control and vision for your growing company.
            </p>
            <Badge variant="secondary">Strategic Growth</Badge>
          </CardContent>
        </Card>

        <Card className="text-center">
          <CardHeader>
            <div className="mx-auto w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
              <Target className="w-6 h-6 text-primary" />
            </div>
            <CardTitle className="text-lg">Growth & Scaling</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Optimize your business model and cash flow management to achieve 
              sustainable, profitable growth at scale.
            </p>
            <Badge variant="secondary">Scale & Optimize</Badge>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-muted/50">
        <CardContent className="pt-6">
          <div className="text-center">
            <h3 className="mb-2">What You'll Learn</h3>
            <p className="text-sm text-muted-foreground mb-4">
              This interactive experience is based on real-world scenarios from successful 
              and failed startups. You'll understand the immediate and long-term implications 
              of each financial decision.
            </p>
            <div className="flex flex-wrap justify-center gap-2">
              <Badge variant="outline">Funding Strategies</Badge>
              <Badge variant="outline">Investor Relations</Badge>
              <Badge variant="outline">Cash Flow Management</Badge>
              <Badge variant="outline">Business Model Design</Badge>
              <Badge variant="outline">Risk Assessment</Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}