import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useState, useEffect } from "react";
import { 
  TrendingUp, 
  DollarSign, 
  PiggyBank, 
  ArrowRight, 
  CheckCircle2, 
  AlertCircle,
  Users,
  Briefcase,
  Home as HomeIcon,
  Target,
  Shield,
  Eye,
  Handshake,
  BookOpen,
  TrendingDown,
  BarChart3
} from "lucide-react";

export default function Home() {
  const [activeSection, setActiveSection] = useState("home");
  
  // Load assessment data if available
  const loadAssessmentData = () => {
    const savedAnswers = localStorage.getItem('riskAssessmentAnswers');
    if (savedAnswers) {
      const answers = JSON.parse(savedAnswers);
      return {
        age: parseInt(answers.age) || 35,
        retirementAge: parseInt(answers.retirementAge) || 65,
        premium: answers.income === 'over500k' ? 50000 :
                 answers.income === '200k-500k' ? 35000 :
                 answers.income === '100k-200k' ? 25000 :
                 answers.income === '50k-100k' ? 15000 : 10000
      };
    }
    return { age: 35, retirementAge: 65, premium: 25000 };
  };
  
  const assessmentData = loadAssessmentData();
  const [age, setAge] = useState(assessmentData.age);
  const [premium, setPremium] = useState(assessmentData.premium);
  const [retirementAge, setRetirementAge] = useState(assessmentData.retirementAge);
  const [indexReturn, setIndexReturn] = useState(7.5);
  const [capRate, setCapRate] = useState(10);
  const [floorRate, setFloorRate] = useState(1);
  const [participationRate, setParticipationRate] = useState(100);

  // Calculate projections
  const years = retirementAge - age;
  const totalPremiums = premium * years;
  const estimatedCashValue = Math.round(totalPremiums * (1 + (indexReturn * participationRate / 100 / 100)) ** years);
  const availableLoan = Math.round(estimatedCashValue * 0.9);
  const netGain = estimatedCashValue - totalPremiums;

  // Smooth scroll handler
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
      setActiveSection(sectionId);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["home", "how-it-works", "calculator", "case-studies", "comparison", "faq", "about"];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen">
      {/* Fixed Navigation */}
      <nav className="fixed top-0 left-0 right-0 bg-background/95 backdrop-blur-sm border-b z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="font-bold text-xl text-primary">Guardian Shield</div>
            <div className="hidden md:flex items-center space-x-6">
              {[
                { id: "home", label: "Home" },
                { id: "how-it-works", label: "How It Works" },
                { id: "calculator", label: "Calculator" },
                { id: "case-studies", label: "Case Studies" },
                { id: "comparison", label: "Comparison" },
                { id: "faq", label: "FAQ" },
                { id: "about", label: "About" },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`text-sm font-medium transition-colors hover:text-primary ${
                    activeSection === item.id ? "text-primary" : "text-muted-foreground"
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm" onClick={() => scrollToSection("calculator")}>
                Calculate
              </Button>
              <Button size="sm" className="bg-secondary hover:bg-secondary/90">
                Book Call
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="pt-32 pb-20 bg-gradient-to-br from-accent/10 to-background">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-sm text-muted-foreground mb-2">Licensed Professional | Fiduciary Standard</p>
              <h1 className="text-5xl font-bold mb-4 leading-tight">
                Become Your Own Banker
                <span className="text-primary block mt-2">with Index-Linked Growth and Smart Liquidity</span>
              </h1>
              <p className="text-lg text-muted-foreground mb-8">
                Learn how an IUL can pair downside protection with index-linked growth while giving you policy-loan access—so your money keeps working.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button size="lg" onClick={() => scrollToSection("calculator")} className="bg-secondary hover:bg-secondary/90">
                  See Your Strategy in 3 Minutes
                </Button>
                <Button size="lg" variant="outline">
                  Book a 20-min Fit Call
                </Button>
              </div>
              <div className="mt-12 flex items-center gap-8">
                <div className="text-center">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-2">
                    <span className="font-bold text-primary">1</span>
                  </div>
                  <p className="text-sm font-medium">Fund</p>
                </div>
                <ArrowRight className="text-muted-foreground" />
                <div className="text-center">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-2">
                    <span className="font-bold text-primary">2</span>
                  </div>
                  <p className="text-sm font-medium">Grow (Index-linked)</p>
                </div>
                <ArrowRight className="text-muted-foreground" />
                <div className="text-center">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-2">
                    <span className="font-bold text-primary">3</span>
                  </div>
                  <p className="text-sm font-medium">Access (Policy Loans)</p>
                </div>
              </div>
            </div>
            <div>
              <Card className="shadow-xl">
                <CardHeader>
                  <CardTitle className="text-center">Cash Value Flywheel</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="relative w-64 h-64 mx-auto">
                    <svg viewBox="0 0 200 200" className="w-full h-full">
                      <circle cx="100" cy="100" r="80" fill="none" stroke="currentColor" strokeWidth="2" className="text-muted" />
                      <circle cx="100" cy="100" r="70" fill="none" stroke="currentColor" strokeWidth="20" className="text-primary/20" />
                      <circle cx="100" cy="20" r="8" fill="currentColor" className="text-primary" />
                      <text x="100" y="10" textAnchor="middle" className="text-xs fill-current">Contribute</text>
                      <circle cx="180" cy="100" r="8" fill="currentColor" className="text-primary" />
                      <text x="190" y="105" textAnchor="start" className="text-xs fill-current">Grow</text>
                      <circle cx="100" cy="180" r="8" fill="currentColor" className="text-primary" />
                      <text x="100" y="195" textAnchor="middle" className="text-xs fill-current">Access</text>
                      <circle cx="20" cy="100" r="8" fill="currentColor" className="text-primary" />
                      <text x="10" y="105" textAnchor="end" className="text-xs fill-current">Repay</text>
                      <circle cx="100" cy="100" r="30" fill="currentColor" className="text-primary" />
                      <DollarSign className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white" size={32} />
                    </svg>
                  </div>
                  <p className="text-xs text-center text-muted-foreground mt-4">
                    *Loans/withdrawals reduce cash value and death benefit; charges apply.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* What Infinite Banking Solves */}
      <section className="py-20">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">What Infinite Banking Solves</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Banks win because they keep your dollars working—while you borrow at a price. With Infinite Banking via IUL, 
              you can keep dollars compounding while you access policy loans for life events or opportunities.
            </p>
            <p className="text-lg font-semibold text-primary mt-4">It's not magic—it's mechanics.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <Card className="border-2 hover:border-primary transition-colors">
              <CardHeader>
                <TrendingDown className="w-12 h-12 text-primary mb-4" />
                <CardTitle>Cash Flow Control</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Traditional banking keeps your money working for them, not you. With Infinite Banking, you maintain control 
                  over your cash flow while still earning growth.
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-secondary transition-colors">
              <CardHeader>
                <DollarSign className="w-12 h-12 text-secondary mb-4" />
                <CardTitle>Opportunity Cost</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Every dollar sitting in low-yield savings is missing growth opportunities. IUL provides index-linked growth 
                  potential with downside protection.
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-accent transition-colors">
              <CardHeader>
                <PiggyBank className="w-12 h-12 text-accent-foreground mb-4" />
                <CardTitle>Tax Efficiency</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Traditional investments face tax drag on gains. IUL offers tax-advantaged growth and tax-free access to 
                  cash value through policy loans.
                </p>
              </CardContent>
            </Card>
          </div>

          <Card className="bg-muted/50">
            <CardContent className="pt-6">
              <p className="text-center text-sm">
                Banks win because they keep your dollars working—while you borrow at a price. With Infinite Banking via IUL, 
                you can keep dollars compounding (subject to caps/floors and charges) while you access policy loans for life 
                events or opportunities. It's not magic—it's mechanics.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Common Questions Answered */}
      <section className="py-20 bg-muted/30">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Common Questions Answered</h2>
            <p className="text-lg text-muted-foreground">
              We believe in transparency. Here are honest answers to the most common concerns about Infinite Banking with IUL.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-12">
            <Card className="bg-blue-50 dark:bg-blue-950/20 border-blue-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertCircle className="w-5 h-5" />
                  What about fees?
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm">
                  IUL policies have charges, but they're transparent and predictable. The key is proper policy design focused 
                  on cash accumulation, not maximum death benefit.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-green-50 dark:bg-green-950/20 border-green-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="w-5 h-5" />
                  Is there risk?
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm">
                  IUL provides downside protection with a guaranteed floor (typically 0-1%) while offering upside potential 
                  through index-linked crediting with caps.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-pink-50 dark:bg-pink-950/20 border-pink-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5" />
                  Is this a scam?
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm">
                  IUL is a legitimate life insurance product regulated by state insurance departments. It's been used by wealthy 
                  families and corporations for decades.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-amber-50 dark:bg-amber-950/20 border-amber-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="w-5 h-5" />
                  Isn't it whole life?
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm">
                  No, IUL is different from whole life. While both build cash value, IUL offers index-linked growth potential 
                  and more flexibility in premium payments.
                </p>
              </CardContent>
            </Card>
          </div>

          <Card className="bg-gradient-to-r from-primary/10 to-secondary/10">
            <CardContent className="py-8 text-center">
              <h3 className="text-2xl font-bold mb-4">Ready to See How This Works for Your Situation?</h3>
              <p className="text-muted-foreground mb-6">
                Get a personalized strategy session to explore if Infinite Banking with IUL is right for you.
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Button size="lg" onClick={() => scrollToSection("calculator")}>Calculate Your Access</Button>
                <Button size="lg" variant="outline">Book a Strategy Call</Button>
              </div>
              <p className="text-xs text-muted-foreground mt-6">
                IUL is life insurance with index-linked crediting, not a direct market investment. Values shown are hypothetical 
                and will vary based on the actual policy, charges, index performance, and approvals.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* How It Works: Meet Alex & Priya */}
      <section id="how-it-works" className="py-20">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">How It Works: Meet Alex & Priya</h2>
            <p className="text-lg text-muted-foreground">
              Follow the journey of two professionals who discovered how to become their own bankers using Infinite Banking with IUL.
            </p>
          </div>

          <Card className="mb-12">
            <CardContent className="pt-6">
              <div className="grid md:grid-cols-3 gap-8">
                <div className="text-center">
                  <Users className="w-16 h-16 mx-auto mb-4 text-primary" />
                  <h3 className="text-xl font-bold mb-2">Alex & Priya</h3>
                  <p className="text-sm text-muted-foreground">Professionals in their 30s and 40s</p>
                </div>
                <div>
                  <h4 className="font-semibold mb-3">Their Challenges:</h4>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <span className="text-destructive">•</span>
                      High tax burden on income
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-destructive">•</span>
                      Idle cash earning minimal returns
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-destructive">•</span>
                      Lack of financial control
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-destructive">•</span>
                      Opportunity costs mounting
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-3">Their Goals:</h4>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                      Tax-efficient wealth building
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                      Liquidity for opportunities
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                      Downside protection
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                      Financial independence
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="space-y-8">
            {[
              {
                chapter: 1,
                title: "Losing the Banking Game",
                problem: "Traditional banking keeps your money working for them, not you.",
                content: "Alex and Priya, both successful professionals in their 30s, were frustrated. Despite high incomes, they were losing money to taxes and earning minimal returns on their savings. Every financial move seemed to benefit someone else—banks, the government, Wall Street—but not them."
              },
              {
                chapter: 2,
                title: "Designing the IUL Policy",
                problem: "Max-funding for cash accumulation, not death benefit.",
                content: "They discovered that IUL policies could be designed for maximum cash accumulation, not maximum death benefit. By structuring the policy correctly, they could minimize insurance costs and maximize the cash value growth potential."
              },
              {
                chapter: 3,
                title: "Growth with Protection",
                problem: "Upside potential with downside protection.",
                content: "Unlike direct market investing, their IUL provided index-linked growth with a guaranteed floor. When markets went up, they participated (up to a cap). When markets went down, they were protected by the floor—typically 0-1%."
              },
              {
                chapter: 4,
                title: "Smart Access via Policy Loans",
                problem: "Your money works even while you're using it.",
                content: "When opportunities arose—real estate investments, business expansion, or family needs—they could access their cash value through policy loans. The remaining cash value continued to earn returns, creating a powerful wealth-building cycle."
              },
              {
                chapter: 5,
                title: "Safeguards and Suitability",
                problem: "Proper education and suitability are essential.",
                content: "They understood the costs, charges, and requirements. IUL isn't for everyone—it requires discipline, adequate income, and a long-term perspective. But for those who qualify, it can be a powerful financial tool."
              }
            ].map((chapter) => (
              <Card key={chapter.chapter} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold flex-shrink-0">
                      {chapter.chapter}
                    </div>
                    <div>
                      <CardTitle className="mb-2">{chapter.title}</CardTitle>
                      <CardDescription className="text-primary font-medium">{chapter.problem}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{chapter.content}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card className="mt-12 bg-muted/50">
            <CardHeader>
              <CardTitle>Key Terms Explained</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                {[
                  { term: "Cap", definition: "The maximum interest rate credited to your policy in a given year, even if the index performs better." },
                  { term: "Floor", definition: "The minimum interest rate guaranteed, protecting you from negative market performance." },
                  { term: "Participation Rate", definition: "The percentage of index gains that are credited to your policy." },
                  { term: "MEC Rules", definition: "Modified Endowment Contract rules that limit how much you can fund without losing tax benefits." },
                  { term: "7702", definition: "IRS code section that defines life insurance for tax purposes and governs policy design." }
                ].map((item) => (
                  <div key={item.term}>
                    <h4 className="font-semibold mb-1">{item.term}</h4>
                    <p className="text-sm text-muted-foreground">{item.definition}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <div className="text-center mt-12">
            <Button size="lg" onClick={() => scrollToSection("calculator")} className="bg-secondary hover:bg-secondary/90">
              Calculate Your Strategy
            </Button>
          </div>
        </div>
      </section>

      {/* Calculator Section */}
      <section id="calculator" className="py-20 bg-gradient-to-br from-primary/5 to-secondary/5">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">IUL Explorer Calculator</h2>
            <p className="text-lg text-muted-foreground">
              See how Infinite Banking with IUL could work for your specific situation. Adjust the inputs below to explore different scenarios.
            </p>
            {localStorage.getItem('riskAssessmentAnswers') && (
              <div className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/20 rounded-lg text-sm">
                <CheckCircle2 className="h-4 w-4 text-primary" />
                <span className="text-primary font-medium">Calculator pre-filled with your assessment data</span>
              </div>
            )}
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Your Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <Label htmlFor="age">Current Age</Label>
                    <Input
                      id="age"
                      type="number"
                      value={age}
                      onChange={(e) => setAge(Number(e.target.value))}
                      min={18}
                      max={75}
                    />
                  </div>
                  <div>
                    <Label htmlFor="premium">Annual Premium</Label>
                    <Input
                      id="premium"
                      type="number"
                      value={premium}
                      onChange={(e) => setPremium(Number(e.target.value))}
                      min={5000}
                      step={1000}
                    />
                    <p className="text-xs text-muted-foreground mt-1">Minimum $5,000 annually</p>
                  </div>
                  <div>
                    <Label htmlFor="retirement">Target Retirement Age</Label>
                    <Input
                      id="retirement"
                      type="number"
                      value={retirementAge}
                      onChange={(e) => setRetirementAge(Number(e.target.value))}
                      min={age + 5}
                      max={100}
                    />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Policy Parameters</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <Label>Expected Index Return (%): {indexReturn.toFixed(1)}</Label>
                    <Slider
                      value={[indexReturn]}
                      onValueChange={(v) => setIndexReturn(v[0])}
                      min={3}
                      max={12}
                      step={0.5}
                      className="mt-2"
                    />
                  </div>
                  <div>
                    <Label>Cap Rate (%): {capRate.toFixed(1)}</Label>
                    <Slider
                      value={[capRate]}
                      onValueChange={(v) => setCapRate(v[0])}
                      min={8}
                      max={15}
                      step={0.5}
                      className="mt-2"
                    />
                  </div>
                  <div>
                    <Label>Floor Rate (%): {floorRate.toFixed(1)}</Label>
                    <Slider
                      value={[floorRate]}
                      onValueChange={(v) => setFloorRate(v[0])}
                      min={0}
                      max={2}
                      step={0.1}
                      className="mt-2"
                    />
                  </div>
                  <div>
                    <Label>Participation Rate (%): {participationRate}</Label>
                    <Slider
                      value={[participationRate]}
                      onValueChange={(v) => setParticipationRate(v[0])}
                      min={50}
                      max={100}
                      step={5}
                      className="mt-2"
                    />
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-6">
              <Card className="bg-gradient-to-br from-primary to-primary/80 text-primary-foreground">
                <CardHeader>
                  <CardTitle className="text-white">Projected Results at Age {retirementAge}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <p className="text-sm opacity-90">Cash Value</p>
                      <p className="text-3xl font-bold">${estimatedCashValue.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-sm opacity-90">Available Loan</p>
                      <p className="text-3xl font-bold">${availableLoan.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-sm opacity-90">Total Premiums</p>
                      <p className="text-3xl font-bold">${totalPremiums.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-sm opacity-90">Net Gain</p>
                      <p className="text-3xl font-bold">${netGain.toLocaleString()}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Cash Value Growth Projection</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64 flex items-center justify-center">
                    <BarChart3 className="w-32 h-32 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground ml-4">Chart visualization would display here</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Get Your Personalized Report</CardTitle>
                  <CardDescription>
                    Download a detailed PDF report with your projections, explanations, and next steps.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full" size="lg">Download Free Report</Button>
                </CardContent>
              </Card>
            </div>
          </div>

          <Card className="mt-8 bg-amber-50 dark:bg-amber-950/20 border-amber-200">
            <CardContent className="pt-6">
              <p className="text-sm text-center">
                <strong>Important Disclaimers:</strong> These are hypothetical projections for educational purposes only. 
                Actual results will vary based on policy design, market performance, insurance costs, and other factors. 
                IUL is life insurance with index-linked crediting, not a direct market investment. Consult with qualified 
                professionals before making any financial decisions.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Case Studies Section */}
      <section id="case-studies" className="py-20">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Real-World Case Studies</h2>
            <p className="text-lg text-muted-foreground">
              See how professionals like you are using Infinite Banking with IUL to achieve their financial goals.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <Briefcase className="w-12 h-12" />,
                title: "Entrepreneur Liquidity Engine",
                subtitle: "Equipment & Marketing Financed via Policy Loans",
                name: "Sarah",
                role: "Marketing Consultant",
                scenario: "Sarah, a marketing consultant, used her IUL cash value to fund new equipment and marketing campaigns. Instead of traditional business loans with high interest rates, she borrowed against her policy at competitive rates.",
                benefits: [
                  "Lower borrowing costs than traditional business loans",
                  "No credit checks or lengthy approval processes",
                  "Cash value continues to grow even while borrowed against",
                  "Flexible repayment terms"
                ],
                result: "Sarah expanded her business 40% faster than planned while maintaining cash flow flexibility.",
                color: "blue"
              },
              {
                icon: <HomeIcon className="w-12 h-12" />,
                title: "Real-Estate Opportunity Fund",
                subtitle: "Down Payments While Cash Value Continues to Earn",
                name: "Mike and Jennifer",
                role: "Real Estate Investors",
                scenario: "Mike and Jennifer used policy loans for real estate down payments on investment properties. Their cash value kept earning returns while they built their real estate portfolio.",
                benefits: [
                  "Access to capital for time-sensitive opportunities",
                  "Cash value growth continues uninterrupted",
                  "No impact on debt-to-income ratios for mortgages",
                  "Tax-free access to funds"
                ],
                result: "They acquired 3 rental properties in 18 months, building $200K+ in equity while their IUL grew.",
                color: "green"
              },
              {
                icon: <Users className="w-12 h-12" />,
                title: "Family Bank",
                subtitle: "Education Costs + Succession/Legacy",
                name: "The Johnson Family",
                role: "Multi-Generational Wealth",
                scenario: "The Johnson family used their IUL as a family bank, funding children's education and creating a legacy wealth transfer strategy. Multiple generations benefit from the same policy.",
                benefits: [
                  "Tax-free education funding through policy loans",
                  "Wealth transfer to next generation",
                  "Family financial education opportunities",
                  "Multi-generational wealth building"
                ],
                result: "Funded 2 college educations debt-free while building a $500K+ legacy for grandchildren.",
                color: "purple"
              }
            ].map((study, index) => (
              <Card key={index} className="hover:shadow-xl transition-shadow">
                <CardHeader>
                  <div className={`text-${study.color}-600 mb-4`}>{study.icon}</div>
                  <CardTitle className="text-xl">{study.title}</CardTitle>
                  <CardDescription>{study.subtitle}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2">The Scenario</h4>
                    <p className="text-sm text-muted-foreground">{study.scenario}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Key Benefits</h4>
                    <ul className="space-y-1">
                      {study.benefits.map((benefit, i) => (
                        <li key={i} className="text-sm flex items-start gap-2">
                          <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                          <span>{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Results</h4>
                    <p className="text-sm text-muted-foreground">{study.result}</p>
                  </div>
                  <div className="pt-4 border-t">
                    <h4 className="font-semibold mb-2 text-sm">Decision Snapshot</h4>
                    <div className="space-y-1">
                      {[
                        "Adequate income for premium payments",
                        "Long-term commitment (10+ years)",
                        "Understanding of costs and charges",
                        "Suitable risk tolerance",
                        "Need for liquidity and growth"
                      ].map((item, i) => (
                        <div key={i} className="flex items-center gap-2">
                          <div className="w-4 h-4 rounded-full bg-secondary flex items-center justify-center">
                            <CheckCircle2 className="w-3 h-3 text-secondary-foreground" />
                          </div>
                          <span className="text-xs">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <Button className="w-full mt-4" variant="outline">Book Your Strategy Call</Button>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card className="mt-12 bg-amber-50 dark:bg-amber-950/20 border-amber-200">
            <CardContent className="pt-6">
              <p className="text-sm text-center">
                <strong>Important Disclaimer:</strong> These are hypothetical examples for educational purposes only. 
                Individual results will vary based on personal circumstances, policy design, market performance, and other factors. 
                IUL is life insurance with index-linked crediting, not a direct market investment. Loans/withdrawals reduce cash 
                value and death benefit; if unmanaged, policy may lapse.
              </p>
            </CardContent>
          </Card>

          <div className="text-center mt-12">
            <h3 className="text-2xl font-bold mb-4">Which Scenario Resonates with You?</h3>
            <p className="text-muted-foreground mb-6">
              Let's explore how Infinite Banking with IUL could work for your specific goals and situation.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button size="lg" onClick={() => scrollToSection("calculator")}>See Your Strategy</Button>
              <Button size="lg" variant="outline">Book a 20-min Fit Call</Button>
            </div>
          </div>
        </div>
      </section>

      {/* Comparison Section */}
      <section id="comparison" className="py-20 bg-muted/30">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">IUL vs. Alternatives</h2>
            <p className="text-lg text-muted-foreground">
              An objective comparison of Indexed Universal Life against other financial vehicles. Each has its place—the key is 
              understanding which fits your specific needs.
            </p>
          </div>

          <Card className="mb-8 bg-blue-50 dark:bg-blue-950/20 border-blue-200">
            <CardContent className="pt-6">
              <div className="flex items-start gap-3">
                <AlertCircle className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold mb-2">Important: IUL is NOT Direct Market Investment</h3>
                  <p className="text-sm">
                    IUL provides index-linked crediting, meaning your returns are based on index performance but you're not 
                    directly invested in the market. This structure provides caps (limiting upside) and floors (protecting downside), 
                    along with insurance charges and policy fees.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse bg-card rounded-lg overflow-hidden">
              <thead>
                <tr className="bg-muted">
                  <th className="p-4 text-left font-semibold">Feature</th>
                  <th className="p-4 text-center font-semibold bg-primary/10">IUL</th>
                  <th className="p-4 text-center font-semibold">Cash Savings</th>
                  <th className="p-4 text-center font-semibold">Brokerage</th>
                  <th className="p-4 text-center font-semibold">401(k)/IRA</th>
                  <th className="p-4 text-center font-semibold">Whole Life</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-t">
                  <td className="p-4 font-medium">Liquidity</td>
                  <td className="p-4 text-center bg-primary/5">Policy loans available</td>
                  <td className="p-4 text-center">Immediate access</td>
                  <td className="p-4 text-center">May trigger taxes</td>
                  <td className="p-4 text-center">Penalties before 59½</td>
                  <td className="p-4 text-center">Policy loans available</td>
                </tr>
                <tr className="border-t">
                  <td className="p-4 font-medium">Downside Protection</td>
                  <td className="p-4 text-center bg-primary/5">Guaranteed floor (0-1%)</td>
                  <td className="p-4 text-center">FDIC insured</td>
                  <td className="p-4 text-center">Market risk</td>
                  <td className="p-4 text-center">Market risk</td>
                  <td className="p-4 text-center">Guaranteed returns</td>
                </tr>
                <tr className="border-t">
                  <td className="p-4 font-medium">Tax Treatment</td>
                  <td className="p-4 text-center bg-primary/5">Tax-free loans</td>
                  <td className="p-4 text-center">Taxable interest</td>
                  <td className="p-4 text-center">Capital gains tax</td>
                  <td className="p-4 text-center">Tax-deferred</td>
                  <td className="p-4 text-center">Tax-free loans</td>
                </tr>
                <tr className="border-t">
                  <td className="p-4 font-medium">Cost Structure</td>
                  <td className="p-4 text-center bg-primary/5">Insurance charges</td>
                  <td className="p-4 text-center">Low/no fees</td>
                  <td className="p-4 text-center">Trading fees, taxes</td>
                  <td className="p-4 text-center">Management fees</td>
                  <td className="p-4 text-center">Higher insurance costs</td>
                </tr>
                <tr className="border-t">
                  <td className="p-4 font-medium">Flexibility</td>
                  <td className="p-4 text-center bg-primary/5">Adjustable premiums</td>
                  <td className="p-4 text-center">No restrictions</td>
                  <td className="p-4 text-center">Full control</td>
                  <td className="p-4 text-center">Contribution limits</td>
                  <td className="p-4 text-center">Fixed premiums</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mt-12">
            <Card className="border-2 border-primary/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle2 className="w-6 h-6 text-primary" />
                  IUL Advantages
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {[
                    "Index-linked growth potential with downside protection",
                    "Tax-free access through policy loans",
                    "No contribution limits like retirement accounts",
                    "Flexible premium payments",
                    "Death benefit protection for family"
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm">
                      <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card className="border-2 border-amber-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertCircle className="w-6 h-6 text-amber-600" />
                  IUL Considerations
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {[
                    "Insurance charges reduce cash accumulation",
                    "Caps limit upside participation",
                    "Requires long-term commitment",
                    "More complex than simple savings",
                    "Suitability depends on individual circumstances"
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm">
                      <AlertCircle className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>

          <Card className="mt-8 bg-muted/50">
            <CardContent className="pt-6">
              <p className="text-sm text-center">
                <strong>Balanced Perspective:</strong> This comparison uses neutral, objective criteria. No single financial vehicle 
                is perfect for everyone. The best choice depends on your specific goals, time horizon, risk tolerance, and financial 
                situation. IUL is not a direct investment in the market—it provides index-linked crediting with caps, floors, downside 
                protection, charges, and flexibility. Consider consulting with qualified financial and tax professionals to determine suitability.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-20">
        <div className="container max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Frequently Asked Questions</h2>
            <p className="text-lg text-muted-foreground">
              Get clear, honest answers to the most common questions about Infinite Banking with IUL.
            </p>
          </div>

          <Accordion type="single" collapsible className="space-y-4">
            {[
              {
                q: "Is IUL the same as investing in the stock market?",
                a: "No. IUL provides index-linked crediting, meaning returns are based on index performance but you're not directly invested in the market. This provides caps, floors, and insurance charges that differ from direct market investing."
              },
              {
                q: "What are caps, floors, and participation rates?",
                a: "Caps limit the maximum return you can earn in a year. Floors guarantee a minimum return (typically 0-1%) even when the index is negative. Participation rates determine what percentage of index gains are credited to your policy."
              },
              {
                q: "What costs/charges exist in an IUL?",
                a: "IUL policies have several charges including cost of insurance, administrative fees, premium loads, and surrender charges. These are transparent and predictable. Proper policy design focuses on minimizing costs while maximizing cash accumulation."
              },
              {
                q: "How do policy loans work, and what are the risks?",
                a: "Policy loans allow you to borrow against your cash value. The loan doesn't require credit checks or repayment schedules, but it accrues interest. If unmanaged, loans can cause the policy to lapse. Your remaining cash value continues to earn returns."
              },
              {
                q: "What if the index underperforms?",
                a: "The floor rate protects you from negative returns. Even if the index loses value, you're guaranteed the floor rate (typically 0-1%). This downside protection is a key feature of IUL."
              },
              {
                q: "How is cash value access treated for taxes?",
                a: "Policy loans are generally tax-free as long as the policy remains in force. This is one of the key tax advantages of IUL. However, surrendering the policy or letting it lapse with outstanding loans can trigger taxable events."
              },
              {
                q: "What is a MEC and why avoid it?",
                a: "A Modified Endowment Contract (MEC) is a policy that's been overfunded according to IRS rules. MECs lose the tax-free loan benefit and are subject to taxes and penalties on withdrawals. Proper policy design avoids MEC status."
              },
              {
                q: "How does 'infinite banking' differ with IUL vs whole life?",
                a: "Both can be used for infinite banking, but IUL offers index-linked growth potential and more premium flexibility, while whole life provides guaranteed returns and fixed premiums. IUL may have higher growth potential but also more complexity."
              },
              {
                q: "Can I lose money?",
                a: "The floor rate protects your cash value from market losses, but insurance charges and fees reduce your cash value. If you underfund the policy or take excessive loans without repayment, the policy could lapse. Proper management is essential."
              },
              {
                q: "What determines suitability?",
                a: "IUL is suitable for those with adequate income for premium payments, long-term commitment (10+ years), understanding of costs and complexity, appropriate risk tolerance, and need for both liquidity and growth. It's not right for everyone."
              },
              {
                q: "What happens if I stop funding?",
                a: "If you stop paying premiums, the policy may lapse unless there's sufficient cash value to cover insurance charges. Some policies have flexibility to skip payments, but this should be discussed with your advisor."
              },
              {
                q: "How do loans affect the death benefit?",
                a: "Outstanding policy loans reduce the death benefit dollar-for-dollar. If you have a $500K death benefit and a $100K loan, your beneficiaries would receive $400K (minus any interest)."
              },
              {
                q: "What crediting strategies are available?",
                a: "Most IUL policies offer multiple crediting strategies linked to different indices (S&P 500, Nasdaq, etc.) with varying caps, floors, and participation rates. You can typically allocate your cash value across multiple strategies."
              },
              {
                q: "What underwriting is required?",
                a: "IUL is life insurance, so it requires medical underwriting. This typically includes a health questionnaire, medical exam, and review of medical records. Your health, age, and lifestyle affect approval and pricing."
              },
              {
                q: "How do I compare carriers?",
                a: "Compare carriers based on financial strength ratings (A+ or better), crediting history, policy charges, flexibility, and customer service. Work with an advisor who represents multiple carriers to find the best fit."
              }
            ].map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="border rounded-lg px-6">
                <AccordionTrigger className="text-left font-semibold hover:no-underline">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          <Card className="mt-12">
            <CardHeader>
              <CardTitle>Have a Specific Question?</CardTitle>
              <CardDescription>
                Questions are routed to our team and we'll help you schedule a call if you'd prefer to discuss directly.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="question">Your Question</Label>
                <textarea
                  id="question"
                  className="w-full min-h-[100px] px-3 py-2 border rounded-md"
                  placeholder="Type your question here..."
                />
              </div>
              <div className="flex gap-4">
                <Button className="flex-1">Send Question</Button>
                <Button variant="outline" className="flex-1">Schedule a Call Instead</Button>
              </div>
            </CardContent>
          </Card>

          <Card className="mt-8 bg-blue-50 dark:bg-blue-950/20 border-blue-200">
            <CardContent className="pt-6">
              <p className="text-sm text-center">
                <strong>Educational Purpose:</strong> These FAQs are for educational purposes only and do not constitute financial 
                advice. Individual circumstances vary, and you should consult with qualified financial and tax professionals before 
                making any decisions. IUL is life insurance with index-linked crediting, not a direct market investment.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-muted/30">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">About Your Advisor</h2>
            <p className="text-lg text-muted-foreground">
              Your trusted guide to Infinite Banking with IUL, committed to education, transparency, and your financial success.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 mb-12">
            <div>
              <Card>
                <CardHeader>
                  <CardTitle>Professional Background</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground">
                    With years of experience in financial services, specializing in advanced life insurance strategies and wealth 
                    building techniques. With a focus on education and transparency, helping professionals and business owners 
                    understand how Infinite Banking with IUL can fit into their overall financial strategy.
                  </p>
                  <p className="text-muted-foreground">
                    Unlike traditional insurance sales approaches, taking an educator-first stance, ensuring clients fully understand 
                    the mechanics, costs, and suitability factors before making any decisions.
                  </p>
                </CardContent>
              </Card>

              <Card className="mt-6">
                <CardHeader>
                  <CardTitle>Licenses & Credentials</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center gap-2">
                      <Shield className="w-5 h-5 text-primary" />
                      <span className="text-sm">Licensed Professional</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-5 h-5 text-primary" />
                      <span className="text-sm">Certified Advisor</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Target className="w-5 h-5 text-primary" />
                      <span className="text-sm">NPN Registered</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Handshake className="w-5 h-5 text-primary" />
                      <span className="text-sm">Fiduciary Standard</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div>
              <Card>
                <CardHeader>
                  <CardTitle>Client Testimonials</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {[
                    {
                      quote: "The education-first approach helped me understand exactly how IUL would work for my business financing needs. No pressure, just clear explanations.",
                      name: "Sarah M.",
                      role: "Business Owner"
                    },
                    {
                      quote: "We've used our policy for three property down payments while our cash value kept growing. Exactly as explained.",
                      name: "Michael & Jennifer R.",
                      role: "Real Estate Investors"
                    },
                    {
                      quote: "Finally found an advisor who explains the risks and costs upfront. The transparency made all the difference in my decision.",
                      name: "David L.",
                      role: "Professional"
                    }
                  ].map((testimonial, index) => (
                    <div key={index} className="border-l-4 border-primary pl-4">
                      <div className="flex gap-1 mb-2">
                        {[...Array(5)].map((_, i) => (
                          <span key={i} className="text-secondary">★</span>
                        ))}
                      </div>
                      <p className="text-sm italic mb-2">"{testimonial.quote}"</p>
                      <p className="text-sm font-semibold">{testimonial.name}</p>
                      <p className="text-xs text-muted-foreground">{testimonial.role}</p>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </div>

          <div className="grid md:grid-cols-4 gap-6 mb-12">
            {[
              {
                icon: <BookOpen className="w-8 h-8" />,
                title: "Education First",
                description: "We believe in empowering clients through education, not high-pressure sales tactics."
              },
              {
                icon: <Eye className="w-8 h-8" />,
                title: "Transparency",
                description: "All costs, charges, and risks are clearly explained before any recommendations."
              },
              {
                icon: <Target className="w-8 h-8" />,
                title: "Suitability Focus",
                description: "We only recommend strategies that truly fit your specific situation and goals."
              },
              {
                icon: <Handshake className="w-8 h-8" />,
                title: "Long-term Partnership",
                description: "Our relationship doesn't end at policy issue—we provide ongoing support and guidance."
              }
            ].map((approach, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <div className="text-primary mb-4 flex justify-center">{approach.icon}</div>
                  <h3 className="font-semibold mb-2">{approach.title}</h3>
                  <p className="text-sm text-muted-foreground">{approach.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card className="bg-gradient-to-r from-primary/10 to-secondary/10">
            <CardContent className="py-8 text-center">
              <h3 className="text-2xl font-bold mb-4">Ready to Learn More?</h3>
              <p className="text-muted-foreground mb-6">
                Contact us for a no-pressure educational consultation.
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Button size="lg">Call: (555) 123-4567</Button>
                <Button size="lg" variant="outline">Email: advisor@iulbanking.com</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card border-t py-12">
        <div className="container">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="font-bold text-lg mb-4">IUL Banking</h3>
              <p className="text-sm text-muted-foreground mb-2">(555) 123-4567</p>
              <p className="text-sm text-muted-foreground mb-2">advisor@iulbanking.com</p>
              <p className="text-sm text-muted-foreground">Licensed Professional</p>
              <p className="text-sm text-muted-foreground">NPN: 12345678</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <div className="space-y-2">
                {["Home", "How It Works", "Calculator", "Case Studies", "Comparison", "FAQ", "About"].map((link) => (
                  <button
                    key={link}
                    onClick={() => scrollToSection(link.toLowerCase().replace(/ /g, "-"))}
                    className="block text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Legal & Compliance</h4>
              <div className="space-y-2">
                <a href="#" className="block text-sm text-muted-foreground hover:text-primary transition-colors">
                  Disclosures & Privacy
                </a>
                <a href="#" className="block text-sm text-muted-foreground hover:text-primary transition-colors">
                  Client Reviews
                </a>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Carrier Relationships</h4>
              <p className="text-sm text-muted-foreground">
                We maintain relationships with A+ rated insurance carriers. No endorsements are implied by these partnerships.
              </p>
            </div>
          </div>

          <div className="border-t pt-8">
            <div className="space-y-4 text-sm text-muted-foreground">
              <p>
                <strong>Important Disclosures:</strong> IUL is life insurance with index-linked crediting, not a direct market 
                investment. Values shown are hypothetical and will vary based on the actual policy, charges, index performance, 
                and approvals.
              </p>
              <p>
                Loans/withdrawals reduce cash value and death benefit; if unmanaged, policy may lapse.
              </p>
              <p>
                Tax treatment depends on policy design and current law (e.g., IRC §7702/72(e)). Consult your tax advisor.
              </p>
              <p>
                This website is for educational purposes only and does not constitute financial advice. Individual circumstances 
                vary, and you should consult with qualified financial and tax professionals.
              </p>
            </div>
          </div>

          <div className="border-t mt-8 pt-8 text-center text-sm text-muted-foreground">
            <p>© 2025 IUL Banking. All rights reserved. | Licensed Insurance Professional | Educational Resource</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

