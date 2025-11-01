import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  CheckCircle2,
  AlertCircle,
  TrendingUp,
  Shield,
  DollarSign,
  Calendar,
  ArrowRight,
  Download,
  PieChart,
  FileText,
  Home as HomeIcon,
  GraduationCap,
  CreditCard
} from "lucide-react";
import { useEffect, useState } from "react";
import { useLocation } from "wouter";

interface AssessmentData {
  firstName: string;
  lastName: string;
  email: string;
  dateOfBirth: string;
  state: string;
  filingStatus: string;
  dependents: number;
  retirementAge: number;
  primaryGoal: string;
  annualIncome: number;
  monthlyExpenses: number;
  assets: any[];
  liabilities: any[];
  termLifeInsurance: number;
  termYearsRemaining: number;
  permanentLifeInsurance: number;
  permanentCashValue: number;
  emergencyFundMonths: number;
  healthStatus: string;
}

interface DIMEAnalysis {
  debt: number;
  incomeReplacement: number;
  mortgage: number;
  education: number;
  total: number;
  currentCoverage: number;
  gap: number;
}

export default function AssessmentResults() {
  const [, setLocation] = useLocation();
  const [data, setData] = useState<AssessmentData | null>(null);
  const [dime, setDime] = useState<DIMEAnalysis | null>(null);

  useEffect(() => {
    const savedData = localStorage.getItem('riskAssessmentData');
    if (!savedData) {
      setLocation('/assessment');
      return;
    }

    const parsedData: AssessmentData = JSON.parse(savedData);
    setData(parsedData);

    // Calculate DIME
    const totalLiabilities = parsedData.liabilities.reduce((sum: number, l: any) => sum + l.balance, 0);
    const mortgageDebt = parsedData.liabilities
      .filter((l: any) => l.type === "mortgage")
      .reduce((sum: number, l: any) => sum + l.balance, 0);
    const nonMortgageDebt = totalLiabilities - mortgageDebt;

    // Final expenses (typically $15,000-$25,000)
    const finalExpenses = 20000;

    // Debt component: non-mortgage debt + final expenses
    const debt = nonMortgageDebt + finalExpenses;

    // Income replacement: 10x annual income (standard rule of thumb)
    const incomeReplacement = parsedData.annualIncome * 10;

    // Mortgage component
    const mortgage = mortgageDebt;

    // Education & final expenses: $100,000 per dependent (college + expenses)
    const education = parsedData.dependents * 100000;

    // Total DIME need
    const total = debt + incomeReplacement + mortgage + education;

    // Current coverage
    const currentCoverage = parsedData.termLifeInsurance + parsedData.permanentLifeInsurance;

    // Coverage gap
    const gap = Math.max(0, total - currentCoverage);

    setDime({
      debt,
      incomeReplacement,
      mortgage,
      education,
      total,
      currentCoverage,
      gap
    });
  }, [setLocation]);

  if (!data || !dime) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  // Calculate tax buckets
  const totalAssets = data.assets.reduce((sum: number, a: any) => sum + a.value, 0);
  const taxFreeAssets = data.assets.filter((a: any) => a.taxTreatment === "tax-free").reduce((sum: number, a: any) => sum + a.value, 0);
  const taxDeferredAssets = data.assets.filter((a: any) => a.taxTreatment === "tax-deferred").reduce((sum: number, a: any) => sum + a.value, 0);
  const taxableAssets = data.assets.filter((a: any) => a.taxTreatment === "taxable").reduce((sum: number, a: any) => sum + a.value, 0);

  const taxFreePercent = totalAssets > 0 ? (taxFreeAssets / totalAssets) * 100 : 0;
  const taxDeferredPercent = totalAssets > 0 ? (taxDeferredAssets / totalAssets) * 100 : 0;
  const taxablePercent = totalAssets > 0 ? (taxableAssets / totalAssets) * 100 : 0;

  // Calculate age from DOB
  const age = new Date().getFullYear() - new Date(data.dateOfBirth).getFullYear();
  const yearsToRetirement = data.retirementAge - age;

  // IUL Fit Score (simplified)
  let iulFitScore = 0;
  if (age >= 30 && age <= 55) iulFitScore += 25;
  if (data.annualIncome >= 100000) iulFitScore += 20;
  if (yearsToRetirement >= 10) iulFitScore += 20;
  if (data.healthStatus === "excellent" || data.healthStatus === "good") iulFitScore += 20;
  if (taxFreePercent < 30) iulFitScore += 15;
  iulFitScore = Math.min(100, iulFitScore);

  const recommendIUL = iulFitScore >= 60 && yearsToRetirement >= 10;

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-accent/5">
      {/* Header */}
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="font-bold text-xl text-primary">Guardian Shield</div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Download className="mr-2 h-4 w-4" />
              Export PDF
            </Button>
            <Button variant="outline" size="sm" onClick={() => setLocation('/')}>
              Back to Home
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-12 max-w-6xl">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <Badge className="mb-4" variant="secondary">
            Assessment Complete
          </Badge>
          <h1 className="text-4xl font-bold mb-4">Financial Risk Assessment Report</h1>
          <p className="text-lg text-muted-foreground">
            {data.firstName} {data.lastName} • Generated {new Date().toLocaleDateString()}
          </p>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="summary" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="summary">Summary</TabsTrigger>
            <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
            <TabsTrigger value="tax-buckets">Tax Buckets</TabsTrigger>
            <TabsTrigger value="coverage">Coverage & Income</TabsTrigger>
            <TabsTrigger value="appendix">Appendix</TabsTrigger>
          </TabsList>

          {/* Summary Tab */}
          <TabsContent value="summary" className="space-y-6">
            {/* DIME Analysis */}
            <Card className="border-2 border-primary">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Shield className="h-6 w-6 text-primary" />
                  <CardTitle className="text-2xl">DIME Life Insurance Needs Analysis</CardTitle>
                </div>
                <CardDescription>
                  Your comprehensive protection needs based on the DIME method
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6 mb-8">
                  {/* Debt */}
                  <div className="p-6 bg-blue-50 dark:bg-blue-950 rounded-lg border-2 border-blue-200 dark:border-blue-800">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
                        <CreditCard className="h-6 w-6 text-blue-600" />
                      </div>
                      <div>
                        <div className="text-sm font-medium text-blue-900 dark:text-blue-100">Debt (Non-Mortgage)</div>
                        <div className="text-xs text-blue-700 dark:text-blue-300">Credit cards, auto loans, etc. + final expenses</div>
                      </div>
                    </div>
                    <div className="text-3xl font-bold text-blue-600">${dime.debt.toLocaleString()}</div>
                  </div>

                  {/* Income Replacement */}
                  <div className="p-6 bg-green-50 dark:bg-green-950 rounded-lg border-2 border-green-200 dark:border-green-800">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="p-2 bg-green-100 dark:bg-green-900 rounded-lg">
                        <TrendingUp className="h-6 w-6 text-green-600" />
                      </div>
                      <div>
                        <div className="text-sm font-medium text-green-900 dark:text-green-100">Income Replacement</div>
                        <div className="text-xs text-green-700 dark:text-green-300">10 × Annual Income (100% replacement)</div>
                      </div>
                    </div>
                    <div className="text-3xl font-bold text-green-600">${dime.incomeReplacement.toLocaleString()}</div>
                  </div>

                  {/* Mortgage */}
                  <div className="p-6 bg-purple-50 dark:bg-purple-950 rounded-lg border-2 border-purple-200 dark:border-purple-800">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="p-2 bg-purple-100 dark:bg-purple-900 rounded-lg">
                        <HomeIcon className="h-6 w-6 text-purple-600" />
                      </div>
                      <div>
                        <div className="text-sm font-medium text-purple-900 dark:text-purple-100">Mortgage Balance</div>
                        <div className="text-xs text-purple-700 dark:text-purple-300">Primary & rental property mortgages</div>
                      </div>
                    </div>
                    <div className="text-3xl font-bold text-purple-600">${dime.mortgage.toLocaleString()}</div>
                  </div>

                  {/* Education */}
                  <div className="p-6 bg-orange-50 dark:bg-orange-950 rounded-lg border-2 border-orange-200 dark:border-orange-800">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="p-2 bg-orange-100 dark:bg-orange-900 rounded-lg">
                        <GraduationCap className="h-6 w-6 text-orange-600" />
                      </div>
                      <div>
                        <div className="text-sm font-medium text-orange-900 dark:text-orange-100">Education & Final Expenses</div>
                        <div className="text-xs text-orange-700 dark:text-orange-300">{data.dependents} dependents + final costs</div>
                      </div>
                    </div>
                    <div className="text-3xl font-bold text-orange-600">${dime.education.toLocaleString()}</div>
                  </div>
                </div>

                {/* Total Need */}
                <div className="p-6 bg-primary/10 border-2 border-primary rounded-lg mb-6">
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="text-sm font-medium text-muted-foreground mb-1">Total Life Insurance Need</div>
                      <div className="text-4xl font-bold text-primary">${dime.total.toLocaleString()}</div>
                    </div>
                    <Shield className="h-16 w-16 text-primary opacity-20" />
                  </div>
                </div>

                {/* Coverage Gap */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="p-4 bg-accent/50 rounded-lg">
                    <div className="text-sm text-muted-foreground mb-1">Current Coverage</div>
                    <div className="text-2xl font-bold">${dime.currentCoverage.toLocaleString()}</div>
                  </div>
                  <div className={`p-4 rounded-lg ${dime.gap > 0 ? 'bg-red-50 dark:bg-red-950 border border-red-200 dark:border-red-800' : 'bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800'}`}>
                    <div className="text-sm text-muted-foreground mb-1">Coverage Gap</div>
                    <div className={`text-2xl font-bold ${dime.gap > 0 ? 'text-red-600' : 'text-green-600'}`}>
                      {dime.gap > 0 ? `-$${dime.gap.toLocaleString()}` : 'Fully Covered'}
                    </div>
                  </div>
                </div>

                {dime.gap > 0 && (
                  <div className="mt-6 p-4 bg-yellow-50 dark:bg-yellow-950 border border-yellow-200 dark:border-yellow-800 rounded-lg flex gap-3">
                    <AlertCircle className="h-5 w-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium text-yellow-900 dark:text-yellow-100">Protection Gap Identified</p>
                      <p className="text-sm text-yellow-800 dark:text-yellow-200 mt-1">
                        You have a ${dime.gap.toLocaleString()} gap in life insurance coverage. Consider increasing your protection to ensure your family's financial security.
                      </p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* IUL Fit Score */}
            {recommendIUL && (
              <Card className="border-2 border-primary">
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <TrendingUp className="h-6 w-6 text-primary" />
                    <CardTitle className="text-2xl">IUL Suitability Score</CardTitle>
                  </div>
                  <CardDescription>
                    Based on your profile, goals, and financial situation
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center mb-6">
                    <div className="text-6xl font-bold text-primary mb-2">{iulFitScore}</div>
                    <div className="text-lg text-muted-foreground">
                      {iulFitScore >= 80 ? "Excellent" : iulFitScore >= 60 ? "Good" : "Fair"} Fit for IUL
                    </div>
                  </div>
                  <Progress value={iulFitScore} className="h-3 mb-6" />
                  
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="text-center p-4 bg-accent/50 rounded-lg">
                      <CheckCircle2 className="h-8 w-8 text-green-600 mx-auto mb-2" />
                      <p className="font-medium">Tax-Free Growth</p>
                      <p className="text-sm text-muted-foreground">Build wealth without annual taxes</p>
                    </div>
                    <div className="text-center p-4 bg-accent/50 rounded-lg">
                      <CheckCircle2 className="h-8 w-8 text-green-600 mx-auto mb-2" />
                      <p className="font-medium">Downside Protection</p>
                      <p className="text-sm text-muted-foreground">0% floor protects from losses</p>
                    </div>
                    <div className="text-center p-4 bg-accent/50 rounded-lg">
                      <CheckCircle2 className="h-8 w-8 text-green-600 mx-auto mb-2" />
                      <p className="font-medium">Lifetime Income</p>
                      <p className="text-sm text-muted-foreground">Tax-free retirement income</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* Recommendations Tab */}
          <TabsContent value="recommendations" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Ready to Implement These Recommendations?</CardTitle>
                <CardDescription>
                  Take action today to secure your financial future
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Get Term Quote Now */}
                  <div className="p-6 bg-green-50 dark:bg-green-950 rounded-lg border-2 border-green-500">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-3 bg-green-500 rounded-lg">
                        <Shield className="h-8 w-8 text-white" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-green-900 dark:text-green-100">Get Term Quote Now</h3>
                        <p className="text-sm text-green-700 dark:text-green-300">Compare rates • Instant approval</p>
                      </div>
                    </div>
                    <p className="text-sm text-green-800 dark:text-green-200 mb-4">
                      Close your ${dime.gap.toLocaleString()} coverage gap with affordable term life insurance. Get instant quotes and apply online in minutes.
                    </p>
                    <Button className="w-full bg-green-600 hover:bg-green-700" size="lg">
                      Get Term Quote Now
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </div>

                  {/* Book Strategy Session */}
                  <div className="p-6 bg-blue-50 dark:bg-blue-950 rounded-lg border-2 border-blue-500">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-3 bg-blue-500 rounded-lg">
                        <Calendar className="h-8 w-8 text-white" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-blue-900 dark:text-blue-100">Book Strategy Session</h3>
                        <p className="text-sm text-blue-700 dark:text-blue-300">Free consultation • Expert advice</p>
                      </div>
                    </div>
                    <p className="text-sm text-blue-800 dark:text-blue-200 mb-4">
                      Schedule a complimentary consultation with a licensed advisor to create your personalized financial strategy and implementation plan.
                    </p>
                    <Button className="w-full bg-blue-600 hover:bg-blue-700" size="lg" variant="default">
                      Book Strategy Session
                      <Calendar className="ml-2 h-5 w-5" />
                    </Button>
                  </div>
                </div>

                <div className="mt-6 text-center text-sm text-muted-foreground">
                  <div className="flex items-center justify-center gap-6">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-green-600" />
                      <span>No obligation</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-green-600" />
                      <span>Licensed advisors</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-green-600" />
                      <span>Personalized solutions</span>
                    </div>
                  </div>
                </div>

                {recommendIUL && (
                  <div className="mt-8 p-6 bg-primary/10 border border-primary rounded-lg">
                    <h4 className="font-semibold text-lg mb-3">Explore Infinite Banking with IUL</h4>
                    <p className="text-sm text-muted-foreground mb-4">
                      Based on your assessment, you're a strong candidate for Indexed Universal Life insurance. Learn how IUL can provide tax-free retirement income, downside protection, and lifetime wealth building.
                    </p>
                    <Button
                      variant="outline"
                      onClick={() => {
                        localStorage.setItem('assessmentCompleted', 'true');
                        setLocation('/iul-banking');
                      }}
                    >
                      Learn About IUL Banking
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Tax Buckets Tab */}
          <TabsContent value="tax-buckets" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <PieChart className="h-6 w-6 text-primary" />
                  <CardTitle className="text-2xl">Your Tax Bucket Allocation</CardTitle>
                </div>
                <CardDescription>
                  Understanding where your retirement assets are positioned for tax purposes
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {/* Tax-Free Bucket */}
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="font-medium">Tax-Free Accounts</span>
                      <span className="font-bold text-green-600">{taxFreePercent.toFixed(1)}%</span>
                    </div>
                    <Progress value={taxFreePercent} className="h-3 bg-green-100" />
                    <div className="flex justify-between mt-1 text-sm text-muted-foreground">
                      <span>Roth IRA, IUL, HSA - never taxed if used correctly</span>
                      <span>${taxFreeAssets.toLocaleString()}</span>
                    </div>
                  </div>

                  {/* Tax-Deferred Bucket */}
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="font-medium">Tax-Deferred Accounts</span>
                      <span className="font-bold text-yellow-600">{taxDeferredPercent.toFixed(1)}%</span>
                    </div>
                    <Progress value={taxDeferredPercent} className="h-3 bg-yellow-100" />
                    <div className="flex justify-between mt-1 text-sm text-muted-foreground">
                      <span>401(k), Traditional IRA - taxed at withdrawal</span>
                      <span>${taxDeferredAssets.toLocaleString()}</span>
                    </div>
                  </div>

                  {/* Taxable Bucket */}
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="font-medium">Taxable Accounts</span>
                      <span className="font-bold text-red-600">{taxablePercent.toFixed(1)}%</span>
                    </div>
                    <Progress value={taxablePercent} className="h-3 bg-red-100" />
                    <div className="flex justify-between mt-1 text-sm text-muted-foreground">
                      <span>Savings accounts, brokerage accounts, CDs - taxed annually</span>
                      <span>${taxableAssets.toLocaleString()}</span>
                    </div>
                  </div>
                </div>

                {taxFreePercent < 30 && (
                  <div className="mt-6 p-4 bg-yellow-50 dark:bg-yellow-950 border border-yellow-200 dark:border-yellow-800 rounded-lg flex gap-3">
                    <AlertCircle className="h-5 w-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium text-yellow-900 dark:text-yellow-100">Tax Diversification Opportunity</p>
                      <p className="text-sm text-yellow-800 dark:text-yellow-200 mt-1">
                        Your tax-free bucket is only {taxFreePercent.toFixed(1)}%. Increasing this allocation to 30-40% could save you thousands in retirement taxes.
                      </p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Coverage & Income Tab */}
          <TabsContent value="coverage" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Current Coverage Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="p-4 bg-accent/50 rounded-lg">
                      <div className="text-sm text-muted-foreground mb-1">Term Life Insurance</div>
                      <div className="text-2xl font-bold">${data.termLifeInsurance.toLocaleString()}</div>
                      <div className="text-sm text-muted-foreground">{data.termYearsRemaining} years remaining</div>
                    </div>
                    <div className="p-4 bg-accent/50 rounded-lg">
                      <div className="text-sm text-muted-foreground mb-1">Permanent Life Insurance</div>
                      <div className="text-2xl font-bold">${data.permanentLifeInsurance.toLocaleString()}</div>
                      <div className="text-sm text-muted-foreground">Cash Value: ${data.permanentCashValue.toLocaleString()}</div>
                    </div>
                  </div>

                  <div className="p-4 bg-accent/50 rounded-lg">
                    <div className="text-sm text-muted-foreground mb-1">Emergency Fund</div>
                    <div className="text-2xl font-bold">{data.emergencyFundMonths} months</div>
                    <div className="text-sm text-muted-foreground">
                      Recommended: 3-6 months • Current: ${(data.emergencyFundMonths * data.monthlyExpenses).toLocaleString()}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Appendix Tab */}
          <TabsContent value="appendix" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Client Profile Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <div className="text-sm text-muted-foreground">Name</div>
                    <div className="font-medium">{data.firstName} {data.lastName}</div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Age</div>
                    <div className="font-medium">{age} years old</div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">State</div>
                    <div className="font-medium">{data.state}</div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Filing Status</div>
                    <div className="font-medium capitalize">{data.filingStatus.replace('-', ' ')}</div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Dependents</div>
                    <div className="font-medium">{data.dependents}</div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Retirement Age</div>
                    <div className="font-medium">{data.retirementAge} ({yearsToRetirement} years away)</div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Annual Income</div>
                    <div className="font-medium">${data.annualIncome.toLocaleString()}</div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Health Status</div>
                    <div className="font-medium capitalize">{data.healthStatus}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

