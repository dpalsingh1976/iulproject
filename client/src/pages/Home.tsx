import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  CheckCircle2,
  TrendingUp,
  Shield,
  DollarSign,
  ArrowRight,
  ClipboardList,
  BarChart3,
  Target
} from "lucide-react";
import { useLocation } from "wouter";

export default function Home() {
  const [, setLocation] = useLocation();
  
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-background to-accent/5">
      {/* Header */}
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="font-bold text-xl text-primary">Guardian Shield</div>
          <nav className="hidden md:flex items-center gap-6">
            <a href="#how-it-works" className="text-sm font-medium hover:text-primary transition-colors">How It Works</a>
            <a href="#solutions" className="text-sm font-medium hover:text-primary transition-colors">Solutions</a>
            <a href="/calculators" className="text-sm font-medium hover:text-primary transition-colors">Calculators</a>
          </nav>
          <Button variant="outline" onClick={() => setLocation('/assessment')}>
            Start Assessment
          </Button>
        </div>
      </header>
      
      {/* Hero Section */}
      <section className="py-20 md:py-32">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-6 text-sm px-4 py-1">
              Professional Financial Risk Assessment
            </Badge>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Plan a Secure, <span className="text-primary">Tax-Free</span> Retirement Today
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Discover your financial risks, calculate your needs, and explore advanced retirement strategies with professional-grade tools and personalized guidance.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="text-lg px-8 py-6"
                onClick={() => setLocation('/assessment')}
              >
                <ClipboardList className="mr-2 h-5 w-5" />
                Start Risk Assessment Now
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="text-lg px-8 py-6"
                onClick={() => setLocation('/iul-banking')}
              >
                Learn About IUL Banking
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
            
            {/* Trust Indicators */}
            <div className="flex flex-wrap justify-center gap-8 mt-12 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-green-600" />
                <span>Professional Grade Tools</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-green-600" />
                <span>AI-Powered Insights</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-green-600" />
                <span>Detailed PDF Reports</span>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* How It Works */}
      <section id="how-it-works" className="py-20 bg-accent/20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">How It Works</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Our proven 3-step process helps you discover risks, understand solutions, and implement your personalized strategy
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <Card className="relative">
              <div className="absolute -top-4 left-6 w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-xl">
                1
              </div>
              <CardHeader className="pt-12">
                <ClipboardList className="h-12 w-12 text-primary mb-4" />
                <CardTitle>Complete Risk Assessment</CardTitle>
                <CardDescription>
                  Answer 15 questions about your financial situation, goals, and risk tolerance. Takes just 5-7 minutes.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>Financial goals & timeline</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>Tax situation analysis</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>Current coverage review</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
            
            <Card className="relative">
              <div className="absolute -top-4 left-6 w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-xl">
                2
              </div>
              <CardHeader className="pt-12">
                <BarChart3 className="h-12 w-12 text-primary mb-4" />
                <CardTitle>Review Your Results</CardTitle>
                <CardDescription>
                  Get instant analysis with personalized scores, tax bucket allocation, and product recommendations.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>IUL fit score & analysis</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>Tax bucket visualization</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>Personalized recommendations</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
            
            <Card className="relative">
              <div className="absolute -top-4 left-6 w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-xl">
                3
              </div>
              <CardHeader className="pt-12">
                <Target className="h-12 w-12 text-primary mb-4" />
                <CardTitle>Explore Your Solution</CardTitle>
                <CardDescription>
                  Learn about your recommended strategy with interactive calculators, case studies, and expert guidance.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>Detailed product education</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>Real-world case studies</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>Schedule consultation</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
          
          <div className="text-center mt-12">
            <Button size="lg" onClick={() => setLocation('/assessment')}>
              Begin Your Assessment
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </section>
      
      {/* Solutions Overview */}
      <section id="solutions" className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Comprehensive Financial Solutions</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              We offer a range of strategies tailored to your unique situation and goals
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <TrendingUp className="h-12 w-12 text-primary mb-4" />
                <CardTitle>Indexed Universal Life (IUL)</CardTitle>
                <CardDescription>
                  Tax-free growth, downside protection, and lifetime income through the Infinite Banking Concept
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm mb-6">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>0% floor protects from market losses</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>Tax-free policy loans</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>Death benefit protection</span>
                  </li>
                </ul>
                <Button variant="outline" className="w-full" onClick={() => setLocation('/iul-banking')}>
                  Learn More
                </Button>
              </CardContent>
            </Card>
            
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <Shield className="h-12 w-12 text-primary mb-4" />
                <CardTitle>Term Life Insurance</CardTitle>
                <CardDescription>
                  Cost-effective protection for your family during your working years and income-earning period
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm mb-6">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>Affordable premiums</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>High coverage amounts</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>Convertible options</span>
                  </li>
                </ul>
                <Button variant="outline" className="w-full" onClick={() => setLocation('/assessment')}>
                  Check Your Fit
                </Button>
              </CardContent>
            </Card>
            
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <DollarSign className="h-12 w-12 text-primary mb-4" />
                <CardTitle>Fixed Index Annuities</CardTitle>
                <CardDescription>
                  Guaranteed lifetime income with growth potential for secure retirement cash flow
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm mb-6">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>Guaranteed income for life</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>Principal protection</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>Tax-deferred growth</span>
                  </li>
                </ul>
                <Button variant="outline" className="w-full" onClick={() => setLocation('/assessment')}>
                  Check Your Fit
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Secure Your Financial Future?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
            Take the first step with our comprehensive risk assessment. Get personalized insights in just 5 minutes.
          </p>
          <Button
            size="lg"
            variant="secondary"
            className="text-lg px-8 py-6"
            onClick={() => setLocation('/assessment')}
          >
            Start Your Free Assessment
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="border-t py-12 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="font-bold text-xl text-primary mb-4">Guardian Shield</div>
              <p className="text-sm text-muted-foreground">
                Professional financial risk assessment and retirement planning solutions.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Solutions</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="/iul-banking" className="hover:text-primary">IUL Banking</a></li>
                <li><a href="/assessment" className="hover:text-primary">Risk Assessment</a></li>
                <li><a href="#" className="hover:text-primary">Term Insurance</a></li>
                <li><a href="#" className="hover:text-primary">Annuities</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Resources</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="/iul-banking#calculator" className="hover:text-primary">IUL Calculator</a></li>
                <li><a href="/iul-banking#case-studies" className="hover:text-primary">Case Studies</a></li>
                <li><a href="/iul-banking#faq" className="hover:text-primary">FAQ</a></li>
                <li><a href="/iul-banking#comparison" className="hover:text-primary">Comparisons</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Contact</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>Email: info@guardianshield.com</li>
                <li>Phone: (555) 123-4567</li>
                <li>Licensed Professional</li>
              </ul>
            </div>
          </div>
          
          <div className="border-t pt-8 text-center text-sm text-muted-foreground">
            <p className="mb-4">
              <strong>Important Disclaimers:</strong> This assessment is for educational purposes only and does not constitute financial advice. 
              Insurance products are subject to underwriting approval. Guarantees are based on the claims-paying ability of the issuing insurance company.
            </p>
            <p>&copy; 2024 Guardian Shield. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

