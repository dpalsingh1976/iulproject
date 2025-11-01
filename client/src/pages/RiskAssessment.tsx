import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  Users, 
  DollarSign, 
  TrendingUp, 
  FileText, 
  Shield,
  Plus,
  Trash2,
  ChevronLeft,
  ChevronRight,
  CheckCircle2
} from "lucide-react";
import { useState } from "react";
import { useLocation } from "wouter";

interface Asset {
  id: string;
  title: string;
  type: string;
  value: number;
  taxTreatment: "taxable" | "tax-deferred" | "tax-free";
}

interface Liability {
  id: string;
  type: string;
  balance: number;
  interestRate: number;
  monthlyPayment: number;
  term?: number;
}

interface AssessmentData {
  // Profile & Goals
  firstName: string;
  lastName: string;
  email: string;
  dateOfBirth: string;
  state: string;
  filingStatus: string;
  dependents: number;
  retirementAge: number;
  primaryGoal: string;
  
  // Income & Expenses
  annualIncome: number;
  monthlyExpenses: number;
  
  // Assets
  assets: Asset[];
  
  // Liabilities
  liabilities: Liability[];
  
  // Protection & Health
  termLifeInsurance: number;
  termYearsRemaining: number;
  permanentLifeInsurance: number;
  permanentCashValue: number;
  emergencyFundMonths: number;
  healthStatus: string;
}

const steps = [
  { id: 1, name: "Profile & Goals", icon: Users, description: "Client information and retirement goals" },
  { id: 2, name: "Income & Expenses", icon: DollarSign, description: "Annual income and monthly expenses" },
  { id: 3, name: "Assets", icon: TrendingUp, description: "All investments and holdings" },
  { id: 4, name: "Liabilities", icon: FileText, description: "Debts and obligations" },
  { id: 5, name: "Protection & Health", icon: Shield, description: "Current coverage and health status" },
];

export default function RiskAssessment() {
  const [, setLocation] = useLocation();
  const [currentStep, setCurrentStep] = useState(1);
  const [data, setData] = useState<AssessmentData>({
    firstName: "",
    lastName: "",
    email: "",
    dateOfBirth: "",
    state: "",
    filingStatus: "single",
    dependents: 0,
    retirementAge: 65,
    primaryGoal: "retirement",
    annualIncome: 0,
    monthlyExpenses: 0,
    assets: [],
    liabilities: [],
    termLifeInsurance: 0,
    termYearsRemaining: 0,
    permanentLifeInsurance: 0,
    permanentCashValue: 0,
    emergencyFundMonths: 0,
    healthStatus: "good",
  });

  const updateData = (field: keyof AssessmentData, value: any) => {
    setData({ ...data, [field]: value });
  };

  const addAsset = () => {
    const newAsset: Asset = {
      id: Date.now().toString(),
      title: "",
      type: "checking",
      value: 0,
      taxTreatment: "tax-free",
    };
    updateData("assets", [...data.assets, newAsset]);
  };

  const updateAsset = (id: string, field: keyof Asset, value: any) => {
    const updated = data.assets.map(asset =>
      asset.id === id ? { ...asset, [field]: value } : asset
    );
    updateData("assets", updated);
  };

  const removeAsset = (id: string) => {
    updateData("assets", data.assets.filter(a => a.id !== id));
  };

  const addLiability = () => {
    const newLiability: Liability = {
      id: Date.now().toString(),
      type: "credit-card",
      balance: 0,
      interestRate: 0,
      monthlyPayment: 0,
    };
    updateData("liabilities", [...data.liabilities, newLiability]);
  };

  const updateLiability = (id: string, field: keyof Liability, value: any) => {
    const updated = data.liabilities.map(liability =>
      liability.id === id ? { ...liability, [field]: value } : liability
    );
    updateData("liabilities", updated);
  };

  const removeLiability = (id: string) => {
    updateData("liabilities", data.liabilities.filter(l => l.id !== id));
  };

  const handleNext = () => {
    if (currentStep < 5) {
      setCurrentStep(currentStep + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      // Save and navigate to results
      localStorage.setItem("riskAssessmentData", JSON.stringify(data));
      setLocation("/assessment-results");
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return data.firstName && data.lastName && data.email && data.dateOfBirth && data.state;
      case 2:
        return data.annualIncome > 0;
      case 3:
      case 4:
      case 5:
        return true;
      default:
        return false;
    }
  };

  const totalAssets = data.assets.reduce((sum, asset) => sum + asset.value, 0);
  const taxFreeAssets = data.assets.filter(a => a.taxTreatment === "tax-free").reduce((sum, a) => sum + a.value, 0);
  const taxDeferredAssets = data.assets.filter(a => a.taxTreatment === "tax-deferred").reduce((sum, a) => sum + a.value, 0);
  const taxableAssets = data.assets.filter(a => a.taxTreatment === "taxable").reduce((sum, a) => sum + a.value, 0);

  const totalLiabilities = data.liabilities.reduce((sum, l) => sum + l.balance, 0);
  const mortgageDebt = data.liabilities.filter(l => l.type === "mortgage").reduce((sum, l) => sum + l.balance, 0);
  const creditCardDebt = data.liabilities.filter(l => l.type === "credit-card").reduce((sum, l) => sum + l.balance, 0);
  const studentLoanDebt = data.liabilities.filter(l => l.type === "student-loan").reduce((sum, l) => sum + l.balance, 0);
  const autoLoanDebt = data.liabilities.filter(l => l.type === "auto-loan").reduce((sum, l) => sum + l.balance, 0);

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-accent/5">
      {/* Header */}
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="font-bold text-xl text-primary">Guardian Shield</div>
          <div className="text-sm text-muted-foreground">
            Step {currentStep} of 5
          </div>
        </div>
      </header>

      {/* Progress Steps */}
      <div className="border-b bg-background/50">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between max-w-4xl mx-auto">
            {steps.map((step, index) => {
              const StepIcon = step.icon;
              const isActive = currentStep === step.id;
              const isCompleted = currentStep > step.id;
              
              return (
                <div key={step.id} className="flex items-center flex-1">
                  <div className="flex flex-col items-center flex-1">
                    <div
                      className={`w-12 h-12 rounded-full flex items-center justify-center border-2 transition-colors ${
                        isCompleted
                          ? "bg-primary border-primary text-primary-foreground"
                          : isActive
                          ? "border-primary text-primary bg-primary/10"
                          : "border-muted text-muted-foreground bg-background"
                      }`}
                    >
                      {isCompleted ? (
                        <CheckCircle2 className="h-6 w-6" />
                      ) : (
                        <StepIcon className="h-6 w-6" />
                      )}
                    </div>
                    <div className="mt-2 text-center hidden md:block">
                      <div className={`text-sm font-medium ${isActive ? "text-primary" : "text-muted-foreground"}`}>
                        {step.name}
                      </div>
                    </div>
                  </div>
                  {index < steps.length - 1 && (
                    <div
                      className={`h-0.5 flex-1 mx-2 ${
                        isCompleted ? "bg-primary" : "bg-muted"
                      }`}
                    />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Step 1: Profile & Goals */}
        {currentStep === 1 && (
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Users className="h-6 w-6 text-primary" />
                <CardTitle className="text-2xl">Profile & Goals</CardTitle>
              </div>
              <CardDescription>
                Client information and retirement goals
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="firstName">First Name *</Label>
                  <Input
                    id="firstName"
                    placeholder="Enter first name"
                    value={data.firstName}
                    onChange={(e) => updateData("firstName", e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="lastName">Last Name *</Label>
                  <Input
                    id="lastName"
                    placeholder="Enter last name"
                    value={data.lastName}
                    onChange={(e) => updateData("lastName", e.target.value)}
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="email">Email Address *</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="your.email@example.com"
                    value={data.email}
                    onChange={(e) => updateData("email", e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="dob">Date of Birth *</Label>
                  <Input
                    id="dob"
                    type="date"
                    value={data.dateOfBirth}
                    onChange={(e) => updateData("dateOfBirth", e.target.value)}
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="state">State of Residence *</Label>
                  <Select value={data.state} onValueChange={(value) => updateData("state", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select state" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="AL">Alabama</SelectItem>
                      <SelectItem value="CA">California</SelectItem>
                      <SelectItem value="FL">Florida</SelectItem>
                      <SelectItem value="NY">New York</SelectItem>
                      <SelectItem value="TX">Texas</SelectItem>
                      {/* Add more states as needed */}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="filingStatus">Filing Status</Label>
                  <Select value={data.filingStatus} onValueChange={(value) => updateData("filingStatus", value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="single">Single</SelectItem>
                      <SelectItem value="married">Married Filing Jointly</SelectItem>
                      <SelectItem value="married-separate">Married Filing Separately</SelectItem>
                      <SelectItem value="head">Head of Household</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="dependents">Number of Dependents</Label>
                  <Input
                    id="dependents"
                    type="number"
                    min="0"
                    value={data.dependents}
                    onChange={(e) => updateData("dependents", parseInt(e.target.value) || 0)}
                  />
                </div>
                <div>
                  <Label htmlFor="retirementAge">Planned Retirement Age</Label>
                  <Input
                    id="retirementAge"
                    type="number"
                    min="50"
                    max="80"
                    value={data.retirementAge}
                    onChange={(e) => updateData("retirementAge", parseInt(e.target.value) || 65)}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="primaryGoal">Primary Financial Goal</Label>
                <Select value={data.primaryGoal} onValueChange={(value) => updateData("primaryGoal", value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="retirement">Tax-free retirement income</SelectItem>
                    <SelectItem value="wealth">Wealth accumulation</SelectItem>
                    <SelectItem value="protection">Family protection</SelectItem>
                    <SelectItem value="legacy">Legacy/estate planning</SelectItem>
                    <SelectItem value="business">Business continuity</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 2: Income & Expenses */}
        {currentStep === 2 && (
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <DollarSign className="h-6 w-6 text-primary" />
                <CardTitle className="text-2xl">Income & Expenses</CardTitle>
              </div>
              <CardDescription>
                Annual income and monthly expenses
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label htmlFor="annualIncome">Annual Household Income *</Label>
                <Input
                  id="annualIncome"
                  type="number"
                  min="0"
                  placeholder="$0"
                  value={data.annualIncome || ""}
                  onChange={(e) => updateData("annualIncome", parseInt(e.target.value) || 0)}
                />
                <p className="text-sm text-muted-foreground mt-1">
                  Combined gross income before taxes
                </p>
              </div>

              <div>
                <Label htmlFor="monthlyExpenses">Monthly Living Expenses</Label>
                <Input
                  id="monthlyExpenses"
                  type="number"
                  min="0"
                  placeholder="$0"
                  value={data.monthlyExpenses || ""}
                  onChange={(e) => updateData("monthlyExpenses", parseInt(e.target.value) || 0)}
                />
                <p className="text-sm text-muted-foreground mt-1">
                  Average monthly expenses including housing, utilities, food, etc.
                </p>
              </div>

              {data.annualIncome > 0 && data.monthlyExpenses > 0 && (
                <div className="p-4 bg-accent/50 rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium">Annual Expenses</span>
                    <span className="font-bold">${(data.monthlyExpenses * 12).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Savings Rate</span>
                    <span className="font-bold text-green-600">
                      {((1 - (data.monthlyExpenses * 12) / data.annualIncome) * 100).toFixed(1)}%
                    </span>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {/* Step 3: Assets */}
        {currentStep === 3 && (
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <TrendingUp className="h-6 w-6 text-primary" />
                <CardTitle className="text-2xl">Assets</CardTitle>
              </div>
              <CardDescription>
                All investments and holdings
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex justify-between items-center">
                <div>
                  <div className="font-semibold text-lg">Asset Portfolio</div>
                  <div className="text-sm text-muted-foreground">
                    Total Value: ${totalAssets.toLocaleString()} • {data.assets.length} assets
                  </div>
                </div>
                <Button onClick={addAsset} size="sm">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Asset
                </Button>
              </div>

              {data.assets.length > 0 && (
                <div className="grid md:grid-cols-3 gap-4 mb-6">
                  <div className="p-4 bg-green-50 dark:bg-green-950 rounded-lg border border-green-200 dark:border-green-800">
                    <div className="text-2xl font-bold text-green-600">${taxFreeAssets.toLocaleString()}</div>
                    <div className="text-sm text-green-700 dark:text-green-400">Tax-Free Assets</div>
                    <div className="text-xs text-muted-foreground">
                      {totalAssets > 0 ? ((taxFreeAssets / totalAssets) * 100).toFixed(1) : 0}% of portfolio
                    </div>
                  </div>
                  <div className="p-4 bg-yellow-50 dark:bg-yellow-950 rounded-lg border border-yellow-200 dark:border-yellow-800">
                    <div className="text-2xl font-bold text-yellow-600">${taxDeferredAssets.toLocaleString()}</div>
                    <div className="text-sm text-yellow-700 dark:text-yellow-400">Tax-Deferred Assets</div>
                    <div className="text-xs text-muted-foreground">
                      {totalAssets > 0 ? ((taxDeferredAssets / totalAssets) * 100).toFixed(1) : 0}% of portfolio
                    </div>
                  </div>
                  <div className="p-4 bg-red-50 dark:bg-red-950 rounded-lg border border-red-200 dark:border-red-800">
                    <div className="text-2xl font-bold text-red-600">${taxableAssets.toLocaleString()}</div>
                    <div className="text-sm text-red-700 dark:text-red-400">Taxable Assets</div>
                    <div className="text-xs text-muted-foreground">
                      {totalAssets > 0 ? ((taxableAssets / totalAssets) * 100).toFixed(1) : 0}% of portfolio
                    </div>
                  </div>
                </div>
              )}

              <div className="space-y-4">
                {data.assets.map((asset, index) => (
                  <div key={asset.id} className="border rounded-lg p-4">
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex items-center gap-2">
                        <div className="font-semibold">Asset #{index + 1}</div>
                        <Badge variant={asset.taxTreatment === "tax-free" ? "default" : asset.taxTreatment === "tax-deferred" ? "secondary" : "destructive"}>
                          {asset.taxTreatment === "tax-free" ? "Tax-Free" : asset.taxTreatment === "tax-deferred" ? "Tax-Deferred" : "Taxable"}
                        </Badge>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeAsset(asset.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label>Asset Title</Label>
                        <Input
                          placeholder="e.g., Fidelity 401(k)"
                          value={asset.title}
                          onChange={(e) => updateAsset(asset.id, "title", e.target.value)}
                        />
                      </div>
                      <div>
                        <Label>Asset Type</Label>
                        <Select value={asset.type} onValueChange={(value) => updateAsset(asset.id, "type", value)}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="checking">Checking Account</SelectItem>
                            <SelectItem value="savings">Savings Account</SelectItem>
                            <SelectItem value="cd">Certificate of Deposit</SelectItem>
                            <SelectItem value="money-market">Money Market</SelectItem>
                            <SelectItem value="stocks">Individual Stocks</SelectItem>
                            <SelectItem value="etfs">ETFs</SelectItem>
                            <SelectItem value="mutual-funds">Mutual Funds</SelectItem>
                            <SelectItem value="bonds">Bonds</SelectItem>
                            <SelectItem value="401k">401(k)</SelectItem>
                            <SelectItem value="ira">IRA</SelectItem>
                            <SelectItem value="roth-ira">Roth IRA</SelectItem>
                            <SelectItem value="iul">IUL Policy</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label>Current Value</Label>
                        <Input
                          type="number"
                          min="0"
                          placeholder="$0"
                          value={asset.value || ""}
                          onChange={(e) => updateAsset(asset.id, "value", parseInt(e.target.value) || 0)}
                        />
                      </div>
                      <div>
                        <Label>Tax Treatment</Label>
                        <Select value={asset.taxTreatment} onValueChange={(value: any) => updateAsset(asset.id, "taxTreatment", value)}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="taxable">Taxable (Pay Now)</SelectItem>
                            <SelectItem value="tax-deferred">Tax-Deferred (Pay Later)</SelectItem>
                            <SelectItem value="tax-free">Tax-Free (Never Pay)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {data.assets.length === 0 && (
                <div className="text-center py-12 border-2 border-dashed rounded-lg">
                  <TrendingUp className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground mb-4">No assets added yet</p>
                  <Button onClick={addAsset} variant="outline">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Your First Asset
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {/* Step 4: Liabilities */}
        {currentStep === 4 && (
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <FileText className="h-6 w-6 text-primary" />
                <CardTitle className="text-2xl">Liabilities</CardTitle>
              </div>
              <CardDescription>
                Debts and obligations
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex justify-between items-center">
                <div>
                  <div className="font-semibold text-lg">Liabilities & Debts</div>
                  <div className="text-sm text-muted-foreground">
                    Total Debt: ${totalLiabilities.toLocaleString()}
                  </div>
                </div>
                <Button onClick={addLiability} size="sm">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Liability
                </Button>
              </div>

              {data.liabilities.length > 0 && (
                <div className="grid md:grid-cols-4 gap-4 mb-6">
                  <div className="p-4 bg-accent/50 rounded-lg text-center">
                    <div className="text-2xl font-bold">${mortgageDebt.toLocaleString()}</div>
                    <div className="text-sm text-muted-foreground">Real Estate Debt</div>
                  </div>
                  <div className="p-4 bg-accent/50 rounded-lg text-center">
                    <div className="text-2xl font-bold">${creditCardDebt.toLocaleString()}</div>
                    <div className="text-sm text-muted-foreground">Credit Cards</div>
                  </div>
                  <div className="p-4 bg-accent/50 rounded-lg text-center">
                    <div className="text-2xl font-bold">${studentLoanDebt.toLocaleString()}</div>
                    <div className="text-sm text-muted-foreground">Student Loans</div>
                  </div>
                  <div className="p-4 bg-accent/50 rounded-lg text-center">
                    <div className="text-2xl font-bold">${autoLoanDebt.toLocaleString()}</div>
                    <div className="text-sm text-muted-foreground">Auto Loans</div>
                  </div>
                </div>
              )}

              <div className="space-y-4">
                {data.liabilities.map((liability, index) => (
                  <div key={liability.id} className="border rounded-lg p-4">
                    <div className="flex justify-between items-start mb-4">
                      <div className="font-semibold">
                        {liability.type === "credit-card" ? "Credit Card" :
                         liability.type === "mortgage" ? "Mortgage" :
                         liability.type === "student-loan" ? "Student Loan" :
                         liability.type === "auto-loan" ? "Auto Loan" : "Liability"} #{index + 1}
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeLiability(liability.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label>Liability Type</Label>
                        <Select value={liability.type} onValueChange={(value) => updateLiability(liability.id, "type", value)}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="credit-card">Credit Card (Consumer)</SelectItem>
                            <SelectItem value="mortgage">Mortgage</SelectItem>
                            <SelectItem value="student-loan">Student Loan</SelectItem>
                            <SelectItem value="auto-loan">Auto Loan</SelectItem>
                            <SelectItem value="personal-loan">Personal Loan</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label>Current Balance</Label>
                        <Input
                          type="number"
                          min="0"
                          placeholder="$0"
                          value={liability.balance || ""}
                          onChange={(e) => updateLiability(liability.id, "balance", parseInt(e.target.value) || 0)}
                        />
                      </div>
                      <div>
                        <Label>Interest Rate (%)</Label>
                        <Input
                          type="number"
                          min="0"
                          step="0.1"
                          placeholder="0"
                          value={liability.interestRate || ""}
                          onChange={(e) => updateLiability(liability.id, "interestRate", parseFloat(e.target.value) || 0)}
                        />
                      </div>
                      <div>
                        <Label>Monthly Payment</Label>
                        <Input
                          type="number"
                          min="0"
                          placeholder="$0"
                          value={liability.monthlyPayment || ""}
                          onChange={(e) => updateLiability(liability.id, "monthlyPayment", parseInt(e.target.value) || 0)}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {data.liabilities.length === 0 && (
                <div className="text-center py-12 border-2 border-dashed rounded-lg">
                  <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground mb-4">No liabilities added yet</p>
                  <Button onClick={addLiability} variant="outline">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Your First Liability
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {/* Step 5: Protection & Health */}
        {currentStep === 5 && (
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Shield className="h-6 w-6 text-primary" />
                <CardTitle className="text-2xl">Protection & Health</CardTitle>
              </div>
              <CardDescription>
                Current coverage and health status
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="font-semibold text-lg">Life Insurance Coverage</h3>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="termLife">Term Life Insurance Death Benefit</Label>
                    <Input
                      id="termLife"
                      type="number"
                      min="0"
                      placeholder="$0"
                      value={data.termLifeInsurance || ""}
                      onChange={(e) => updateData("termLifeInsurance", parseInt(e.target.value) || 0)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="termYears">Years Remaining</Label>
                    <Select 
                      value={data.termYearsRemaining.toString()} 
                      onValueChange={(value) => updateData("termYearsRemaining", parseInt(value))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select years" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="0">No Coverage</SelectItem>
                        <SelectItem value="5">5 years</SelectItem>
                        <SelectItem value="10">10 years</SelectItem>
                        <SelectItem value="15">15 years</SelectItem>
                        <SelectItem value="20">20 years</SelectItem>
                        <SelectItem value="25">25 years</SelectItem>
                        <SelectItem value="30">30 years</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="permanentLife">Permanent Life Insurance Death Benefit</Label>
                    <Input
                      id="permanentLife"
                      type="number"
                      min="0"
                      placeholder="$0"
                      value={data.permanentLifeInsurance || ""}
                      onChange={(e) => updateData("permanentLifeInsurance", parseInt(e.target.value) || 0)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="cashValue">Cash Value</Label>
                    <Input
                      id="cashValue"
                      type="number"
                      min="0"
                      placeholder="$0"
                      value={data.permanentCashValue || ""}
                      onChange={(e) => updateData("permanentCashValue", parseInt(e.target.value) || 0)}
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-semibold text-lg">Emergency Fund</h3>
                <div>
                  <Label htmlFor="emergencyFund">Current Emergency Fund (Months of Expenses)</Label>
                  <Input
                    id="emergencyFund"
                    type="number"
                    min="0"
                    max="24"
                    placeholder="0"
                    value={data.emergencyFundMonths || ""}
                    onChange={(e) => updateData("emergencyFundMonths", parseInt(e.target.value) || 0)}
                  />
                  <p className="text-sm text-muted-foreground mt-1">
                    Recommended: 3-6 months of expenses
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-semibold text-lg">Health Status</h3>
                <div>
                  <Label htmlFor="health">How would you describe your current health?</Label>
                  <Select value={data.healthStatus} onValueChange={(value) => updateData("healthStatus", value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="excellent">Excellent - No health issues</SelectItem>
                      <SelectItem value="good">Good - Minor manageable conditions</SelectItem>
                      <SelectItem value="fair">Fair - Some health concerns</SelectItem>
                      <SelectItem value="poor">Poor - Significant health issues</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-8">
          <Button
            variant="outline"
            onClick={handlePrevious}
            disabled={currentStep === 1}
          >
            <ChevronLeft className="mr-2 h-4 w-4" />
            Previous
          </Button>
          
          <Button
            onClick={handleNext}
            disabled={!canProceed()}
          >
            {currentStep === 5 ? (
              <>
                Complete Assessment
                <CheckCircle2 className="ml-2 h-4 w-4" />
              </>
            ) : (
              <>
                Next Step
                <ChevronRight className="ml-2 h-4 w-4" />
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}

