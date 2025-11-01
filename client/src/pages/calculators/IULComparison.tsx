import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Link } from "wouter";
import { ArrowLeft, TrendingUp, Shield, AlertTriangle } from "lucide-react";

export default function IULComparison() {
  const [age, setAge] = useState(40);
  const [monthlyContribution, setMonthlyContribution] = useState(1000);
  const [yearsContributing, setYearsContributing] = useState(20);
  const [marketReturn, setMarketReturn] = useState(8);
  const [marketVolatility, setMarketVolatility] = useState(15);

  // IUL parameters
  const iulFloor = 0; // 0% floor
  const iulCap = 12; // 12% cap
  const iulParticipationRate = 100;

  // Simulate returns with market volatility
  const simulate401k = () => {
    let balance = 0;
    const monthlyRate = marketReturn / 100 / 12;
    for (let i = 0; i < yearsContributing * 12; i++) {
      balance = balance * (1 + monthlyRate) + monthlyContribution;
    }
    return balance;
  };

  const simulateIUL = () => {
    let balance = 0;
    // IUL with floor and cap protection
    const avgReturn = Math.min(marketReturn, iulCap);
    const monthlyRate = avgReturn / 100 / 12;
    for (let i = 0; i < yearsContributing * 12; i++) {
      balance = balance * (1 + monthlyRate) + monthlyContribution * 0.95; // 5% for insurance cost
    }
    return balance;
  };

  const value401k = simulate401k();
  const valueIUL = simulateIUL();

  // Calculate worst-case scenario (market crash)
  const worstCase401k = value401k * 0.6; // 40% market crash
  const worstCaseIUL = valueIUL; // Protected by floor

  const retirementAge = age + yearsContributing;

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-accent/5">
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="font-bold text-xl text-primary">Guardian Shield</Link>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/" className="text-sm font-medium hover:text-primary transition-colors">Home</Link>
            <Link href="/calculators" className="text-sm font-medium text-primary transition-colors">Calculators</Link>
            <Link href="/assessment" className="text-sm font-medium hover:text-primary transition-colors">Risk Assessment</Link>
          </nav>
          <Link href="/assessment"><Button>Start Assessment</Button></Link>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <Link href="/calculators">
          <Button variant="ghost" className="mb-6">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Calculators
          </Button>
        </Link>

        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-orange-100 dark:bg-orange-950 mb-4">
            <TrendingUp className="h-8 w-8 text-orange-600" />
          </div>
          <h1 className="text-4xl font-bold mb-4">IUL vs 401k/IRA Comparison</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Stress test IUL against traditional retirement accounts with market volatility
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Your Scenario</CardTitle>
                <CardDescription>Configure your comparison</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label>Current Age: {age}</Label>
                  <Slider
                    value={[age]}
                    onValueChange={([value]) => setAge(value)}
                    min={25}
                    max={60}
                    step={1}
                    className="mt-2"
                  />
                </div>
                <div>
                  <Label htmlFor="monthly">Monthly Contribution</Label>
                  <Input
                    id="monthly"
                    type="number"
                    value={monthlyContribution}
                    onChange={(e) => setMonthlyContribution(Number(e.target.value))}
                    className="mt-2"
                  />
                </div>
                <div>
                  <Label>Years Contributing: {yearsContributing}</Label>
                  <Slider
                    value={[yearsContributing]}
                    onValueChange={([value]) => setYearsContributing(value)}
                    min={10}
                    max={40}
                    step={1}
                    className="mt-2"
                  />
                  <p className="text-sm text-muted-foreground mt-1">
                    Retire at age {retirementAge}
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Market Assumptions</CardTitle>
                <CardDescription>Expected market performance</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label>Average Market Return: {marketReturn}%</Label>
                  <Slider
                    value={[marketReturn]}
                    onValueChange={([value]) => setMarketReturn(value)}
                    min={4}
                    max={12}
                    step={0.5}
                    className="mt-2"
                  />
                </div>
                <div>
                  <Label>Market Volatility: {marketVolatility}%</Label>
                  <Slider
                    value={[marketVolatility]}
                    onValueChange={([value]) => setMarketVolatility(value)}
                    min={5}
                    max={30}
                    step={1}
                    className="mt-2"
                  />
                  <p className="text-sm text-muted-foreground mt-1">
                    Higher volatility = more risk
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>IUL Protection Features</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-3">
                  <Shield className="h-5 w-5 text-green-600" />
                  <div>
                    <div className="font-semibold">{iulFloor}% Floor</div>
                    <div className="text-sm text-muted-foreground">Never lose money in down years</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <TrendingUp className="h-5 w-5 text-blue-600" />
                  <div>
                    <div className="font-semibold">{iulCap}% Cap</div>
                    <div className="text-sm text-muted-foreground">Maximum annual credit</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Shield className="h-5 w-5 text-primary" />
                  <div>
                    <div className="font-semibold">Tax-Free Access</div>
                    <div className="text-sm text-muted-foreground">Policy loans are tax-free</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card className="border-2 border-primary">
              <CardHeader>
                <CardTitle className="text-2xl">Comparison Results</CardTitle>
                <CardDescription>At age {retirementAge}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
                    <div className="text-sm font-semibold mb-1">401k/IRA</div>
                    <div className="text-2xl font-bold text-blue-600">
                      ${value401k.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                    </div>
                    <div className="text-xs text-muted-foreground mt-1">Normal scenario</div>
                  </div>
                  <div className="p-4 bg-green-50 dark:bg-green-950/20 rounded-lg border-2 border-green-500">
                    <div className="text-sm font-semibold mb-1">IUL</div>
                    <div className="text-2xl font-bold text-green-600">
                      ${valueIUL.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                    </div>
                    <div className="text-xs text-green-600 font-semibold mt-1">+ Protection</div>
                  </div>
                </div>

                <div className="p-4 bg-red-50 dark:bg-red-950/20 rounded-lg border border-red-200">
                  <div className="flex items-center gap-2 mb-3">
                    <AlertTriangle className="h-5 w-5 text-red-600" />
                    <div className="font-semibold">Market Crash Scenario (-40%)</div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="text-sm text-muted-foreground">401k/IRA</div>
                      <div className="text-xl font-bold text-red-600">
                        ${worstCase401k.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                      </div>
                      <div className="text-xs text-red-600 mt-1">
                        Loss: ${(value401k - worstCase401k).toLocaleString(undefined, { maximumFractionDigits: 0 })}
                      </div>
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">IUL</div>
                      <div className="text-xl font-bold text-green-600">
                        ${worstCaseIUL.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                      </div>
                      <div className="text-xs text-green-600 font-semibold mt-1">
                        ✓ Protected by {iulFloor}% floor
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="font-semibold">Key Differences</div>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between p-2 bg-accent rounded">
                      <span>Market Risk</span>
                      <div className="flex gap-4">
                        <span className="text-red-600">401k: High</span>
                        <span className="text-green-600">IUL: Protected</span>
                      </div>
                    </div>
                    <div className="flex justify-between p-2 bg-accent rounded">
                      <span>Tax Treatment</span>
                      <div className="flex gap-4">
                        <span className="text-orange-600">401k: Deferred</span>
                        <span className="text-green-600">IUL: Tax-Free</span>
                      </div>
                    </div>
                    <div className="flex justify-between p-2 bg-accent rounded">
                      <span>RMDs Required</span>
                      <div className="flex gap-4">
                        <span className="text-orange-600">401k: Yes</span>
                        <span className="text-green-600">IUL: No</span>
                      </div>
                    </div>
                    <div className="flex justify-between p-2 bg-accent rounded">
                      <span>Death Benefit</span>
                      <div className="flex gap-4">
                        <span>401k: Account Value</span>
                        <span className="text-green-600">IUL: Enhanced</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex gap-3">
                  <Link href="/iul-banking" className="flex-1">
                    <Button className="w-full">Learn More About IUL</Button>
                  </Link>
                  <Link href="/assessment" className="flex-1">
                    <Button variant="outline" className="w-full">Get Quote</Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

