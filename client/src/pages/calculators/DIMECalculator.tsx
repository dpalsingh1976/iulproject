import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Link } from "wouter";
import { ArrowLeft, Target, DollarSign, Home, GraduationCap, TrendingUp } from "lucide-react";

export default function DIMECalculator() {
  const [annualIncome, setAnnualIncome] = useState(75000);
  const [yearsOfIncome, setYearsOfIncome] = useState(10);
  const [mortgageBalance, setMortgageBalance] = useState(250000);
  const [creditCardDebt, setCreditCardDebt] = useState(15000);
  const [autoLoans, setAutoLoans] = useState(25000);
  const [studentLoans, setStudentLoans] = useState(30000);
  const [otherDebts, setOtherDebts] = useState(10000);
  const [numDependents, setNumDependents] = useState(2);
  const [collegePerChild, setCollegePerChild] = useState(100000);
  const [finalExpenses, setFinalExpenses] = useState(15000);

  // Calculate DIME components
  const debtComponent = creditCardDebt + autoLoans + studentLoans + otherDebts;
  const incomeComponent = annualIncome * yearsOfIncome;
  const mortgageComponent = mortgageBalance;
  const educationComponent = (numDependents * collegePerChild) + finalExpenses;
  
  const totalNeeded = debtComponent + incomeComponent + mortgageComponent + educationComponent;

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-accent/5">
      {/* Header */}
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
        {/* Back Button */}
        <Link href="/calculators">
          <Button variant="ghost" className="mb-6">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Calculators
          </Button>
        </Link>

        {/* Title */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 dark:bg-blue-950 mb-4">
            <Target className="h-8 w-8 text-blue-600" />
          </div>
          <h1 className="text-4xl font-bold mb-4">DIME Life Insurance Calculator</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Calculate your exact life insurance needs using the DIME method: <strong>D</strong>ebt + <strong>I</strong>ncome + <strong>M</strong>ortgage + <strong>E</strong>ducation & Final Expenses
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Input Section */}
          <div className="space-y-6">
            {/* Income Replacement */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <DollarSign className="h-5 w-5" />
                  Income Replacement
                </CardTitle>
                <CardDescription>How much income should your family replace?</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="annual-income">Annual Income</Label>
                  <Input
                    id="annual-income"
                    type="number"
                    value={annualIncome}
                    onChange={(e) => setAnnualIncome(Number(e.target.value))}
                    className="mt-2"
                  />
                </div>
                <div>
                  <Label>Years of Income to Replace: {yearsOfIncome}</Label>
                  <Slider
                    value={[yearsOfIncome]}
                    onValueChange={([value]) => setYearsOfIncome(value)}
                    min={5}
                    max={30}
                    step={1}
                    className="mt-2"
                  />
                  <p className="text-sm text-muted-foreground mt-1">
                    Typically 10x annual income (10 years)
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Debt */}
            <Card>
              <CardHeader>
                <CardTitle>Debt (Non-Mortgage)</CardTitle>
                <CardDescription>All debts except your mortgage</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="credit-card">Credit Card Debt</Label>
                  <Input
                    id="credit-card"
                    type="number"
                    value={creditCardDebt}
                    onChange={(e) => setCreditCardDebt(Number(e.target.value))}
                    className="mt-2"
                  />
                </div>
                <div>
                  <Label htmlFor="auto-loans">Auto Loans</Label>
                  <Input
                    id="auto-loans"
                    type="number"
                    value={autoLoans}
                    onChange={(e) => setAutoLoans(Number(e.target.value))}
                    className="mt-2"
                  />
                </div>
                <div>
                  <Label htmlFor="student-loans">Student Loans</Label>
                  <Input
                    id="student-loans"
                    type="number"
                    value={studentLoans}
                    onChange={(e) => setStudentLoans(Number(e.target.value))}
                    className="mt-2"
                  />
                </div>
                <div>
                  <Label htmlFor="other-debts">Other Debts</Label>
                  <Input
                    id="other-debts"
                    type="number"
                    value={otherDebts}
                    onChange={(e) => setOtherDebts(Number(e.target.value))}
                    className="mt-2"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Mortgage */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Home className="h-5 w-5" />
                  Mortgage Balance
                </CardTitle>
                <CardDescription>Outstanding mortgage balance</CardDescription>
              </CardHeader>
              <CardContent>
                <Input
                  type="number"
                  value={mortgageBalance}
                  onChange={(e) => setMortgageBalance(Number(e.target.value))}
                />
              </CardContent>
            </Card>

            {/* Education & Final Expenses */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <GraduationCap className="h-5 w-5" />
                  Education & Final Expenses
                </CardTitle>
                <CardDescription>College costs and final expenses</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="dependents">Number of Dependents</Label>
                  <Input
                    id="dependents"
                    type="number"
                    value={numDependents}
                    onChange={(e) => setNumDependents(Number(e.target.value))}
                    className="mt-2"
                  />
                </div>
                <div>
                  <Label htmlFor="college">College Cost Per Child</Label>
                  <Input
                    id="college"
                    type="number"
                    value={collegePerChild}
                    onChange={(e) => setCollegePerChild(Number(e.target.value))}
                    className="mt-2"
                  />
                </div>
                <div>
                  <Label htmlFor="final">Final Expenses (Funeral, etc.)</Label>
                  <Input
                    id="final"
                    type="number"
                    value={finalExpenses}
                    onChange={(e) => setFinalExpenses(Number(e.target.value))}
                    className="mt-2"
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Results Section */}
          <div className="space-y-6">
            <Card className="border-2 border-primary">
              <CardHeader>
                <CardTitle className="text-2xl">Your Life Insurance Need</CardTitle>
                <CardDescription>Based on the DIME method</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center mb-6">
                  <div className="text-5xl font-bold text-primary mb-2">
                    ${totalNeeded.toLocaleString()}
                  </div>
                  <p className="text-muted-foreground">Recommended Coverage Amount</p>
                </div>

                <div className="space-y-4">
                  <div className="flex justify-between items-center p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
                    <div>
                      <div className="font-semibold">Debt (Non-Mortgage)</div>
                      <div className="text-sm text-muted-foreground">Credit cards, auto loans, etc.</div>
                    </div>
                    <div className="text-xl font-bold text-blue-600">
                      ${debtComponent.toLocaleString()}
                    </div>
                  </div>

                  <div className="flex justify-between items-center p-4 bg-green-50 dark:bg-green-950/20 rounded-lg">
                    <div>
                      <div className="font-semibold">Income Replacement</div>
                      <div className="text-sm text-muted-foreground">{yearsOfIncome} years × ${annualIncome.toLocaleString()}</div>
                    </div>
                    <div className="text-xl font-bold text-green-600">
                      ${incomeComponent.toLocaleString()}
                    </div>
                  </div>

                  <div className="flex justify-between items-center p-4 bg-purple-50 dark:bg-purple-950/20 rounded-lg">
                    <div>
                      <div className="font-semibold">Mortgage Balance</div>
                      <div className="text-sm text-muted-foreground">Pay off home</div>
                    </div>
                    <div className="text-xl font-bold text-purple-600">
                      ${mortgageComponent.toLocaleString()}
                    </div>
                  </div>

                  <div className="flex justify-between items-center p-4 bg-orange-50 dark:bg-orange-950/20 rounded-lg">
                    <div>
                      <div className="font-semibold">Education & Final</div>
                      <div className="text-sm text-muted-foreground">{numDependents} children + final expenses</div>
                    </div>
                    <div className="text-xl font-bold text-orange-600">
                      ${educationComponent.toLocaleString()}
                    </div>
                  </div>
                </div>

                <div className="mt-6 p-4 bg-accent rounded-lg">
                  <h3 className="font-semibold mb-2">Next Steps</h3>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <TrendingUp className="h-4 w-4 mt-0.5 text-primary flex-shrink-0" />
                      <span>Review your current life insurance coverage</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <TrendingUp className="h-4 w-4 mt-0.5 text-primary flex-shrink-0" />
                      <span>Consider term life insurance for affordable coverage</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <TrendingUp className="h-4 w-4 mt-0.5 text-primary flex-shrink-0" />
                      <span>Explore IUL for tax-free wealth building</span>
                    </li>
                  </ul>
                </div>

                <div className="mt-6 flex gap-3">
                  <Link href="/assessment" className="flex-1">
                    <Button className="w-full" size="lg">Get Personalized Quote</Button>
                  </Link>
                  <Link href="/iul-banking" className="flex-1">
                    <Button variant="outline" className="w-full" size="lg">Learn About IUL</Button>
                  </Link>
                </div>
              </CardContent>
            </Card>

            {/* Disclaimer */}
            <Card>
              <CardContent className="pt-6">
                <p className="text-sm text-muted-foreground">
                  <strong>Disclaimer:</strong> This calculator provides estimates for educational purposes only. Actual life insurance needs vary based on individual circumstances. Consult with a licensed financial professional for personalized advice.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

