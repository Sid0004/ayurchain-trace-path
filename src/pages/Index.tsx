// AyurChain - Blockchain Traceability for Ayurvedic Supply Chain
import React, { useState, useEffect } from 'react';
import SupplyChainMap from '@/components/SupplyChainMap';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import heroBackground from '@/assets/hero-background.jpg';
import herbsCollection from '@/assets/herbs-collection.jpg';
import labTesting from '@/assets/lab-testing.jpg';

// Icons as SVG components
const LeafIcon = () => <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21l3-9 6-6-3-3-6 6-9 3z" />
  </svg>;
const ShieldIcon = () => <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>;
const AlertIcon = () => <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.996-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
  </svg>;
const ChainIcon = () => <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
  </svg>;
const TangledIcon = () => <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
  </svg>;
const QRIcon = () => <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
  </svg>;
const FactoryIcon = () => <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
  </svg>;
const BeakerIcon = () => <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
  </svg>;
const BlockchainIcon = () => <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14-7H5a2 2 0 00-2 2v12a2 2 0 002 2h14a2 2 0 002-2V6a2 2 0 00-2-2zM8 21v-5a2 2 0 012-2h4a2 2 0 012 2v5" />
  </svg>;
const CloudIcon = () => <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
  </svg>;
const DeviceIcon = () => <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
  </svg>;
const Index = () => {
  const [demoId, setDemoId] = useState('AYUR-ASH-082024-KER');
  const [showDemo, setShowDemo] = useState(false);
  const [counters, setCounters] = useState({
    transparency: 0,
    batches: 0,
    stakeholders: 0
  });

  // Scroll animation effect
  useEffect(() => {
    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate');
        }
      });
    };
    const observer = new IntersectionObserver(observerCallback, {
      threshold: 0.1
    });
    const elements = document.querySelectorAll('.fade-in-up');
    elements.forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  // Counter animation
  useEffect(() => {
    const timer = setTimeout(() => {
      setCounters({
        transparency: 99.9,
        batches: 0,
        stakeholders: 0
      });
    }, 1000);
    return () => clearTimeout(timer);
  }, []);
  const handleDemoTrace = () => {
    setShowDemo(true);
  };
  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({
      behavior: 'smooth'
    });
  };
  return <div className="min-h-screen bg-background font-inter" >
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center bg-no-repeat" style={{
        backgroundImage: `url(${heroBackground})`
      }} />
        <div className="absolute inset-0 hero-gradient" />
        
        <div className="relative z-10 max-w-6xl mx-auto px-6 text-center text-white">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 fade-in-up">
            Trust in Every Leaf
          </h1>
          <p className="text-xl md:text-2xl mb-12 max-w-3xl mx-auto leading-relaxed fade-in-up">
            AyurChain brings immutable transparency to the Ayurvedic supply chain using blockchain technology. From farm to pharmacy, verify the journey.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center fade-in-up">
            <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 text-lg px-8 py-4 font-semibold transition-all duration-300 hover:scale-105" onClick={() => scrollToSection('demo')}>
              Trace a Product (Demo)
            </Button>
            <Button size="lg" variant="outline" onClick={() => scrollToSection('solution')} className="border-white hover:bg-white text-lg px-8 py-4 font-semibold transition-all duration-300 hover:scale-105 text-slate-950">
              Learn How It Works
            </Button>
          </div>

          {/* Stats Counter */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 fade-in-up">
            <div className="text-center">
              <div className="text-4xl font-bold text-accent mb-2">
                {counters.transparency.toFixed(1)}%
              </div>
              <div className="text-lg">Traceability Accuracy</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-accent mb-2">
                {counters.batches}
              </div>
              <div className="text-lg">Batches Ready to Track</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-accent mb-2">
                {counters.stakeholders}
              </div>
              <div className="text-lg">Platform Ready for Stakeholders</div>
            </div>
          </div>
        </div>
      </section>

        {/* Supply Chain Map Section */}
        <section className="py-12 bg-background">
          <div className="max-w-4xl mx-auto px-6">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-8 text-foreground">Track the Supply Chain Journey</h2>
            <SupplyChainMap />
          </div>
        </section>

      {/* Problem Section */}
      <section className="py-20 bg-background">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16 fade-in-up">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              An Unclear Path to Purity
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="card-shadow scale-on-hover fade-in-up">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 mx-auto mb-6 text-destructive">
                  <AlertIcon />
                </div>
                <h3 className="text-xl font-semibold mb-4">Adulteration</h3>
                <p className="text-muted-foreground">
                  Lack of verifiable sources leads to low-quality and adulterated herbs affecting consumer safety.
                </p>
              </CardContent>
            </Card>

            <Card className="card-shadow scale-on-hover fade-in-up">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 mx-auto mb-6 text-destructive">
                  <ChainIcon />
                </div>
                <h3 className="text-xl font-semibold mb-4">No Transparency</h3>
                <p className="text-muted-foreground">
                  Consumers and manufacturers have no visibility into the herb's origin or journey.
                </p>
              </CardContent>
            </Card>

            <Card className="card-shadow scale-on-hover fade-in-up">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 mx-auto mb-6 text-destructive">
                  <TangledIcon />
                </div>
                <h3 className="text-xl font-semibold mb-4">Inefficient Supply Chain</h3>
                <p className="text-muted-foreground">
                  Manual, paper-based tracking is prone to errors and fraud.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section id="solution" className="py-20 bg-muted/30">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16 fade-in-up">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Our Four Steps to Absolute Transparency
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center fade-in-up">
              <div className="w-20 h-20 mx-auto mb-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center">
                <div className="flex items-center">
                  <LeafIcon />
                  <QRIcon />
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-4">Farm Genesis</h3>
              <p className="text-muted-foreground">
                Farmers register herb batches via mobile app, creating unique, geo-tagged digital identity and QR code.
              </p>
            </div>

            <div className="text-center fade-in-up">
              <div className="w-20 h-20 mx-auto mb-6 bg-secondary text-primary-foreground rounded-full flex items-center justify-center">
                <FactoryIcon />
              </div>
              <h3 className="text-xl font-semibold mb-4">Processor Verification</h3>
              <p className="text-muted-foreground">
                Each stakeholder scans QR codes to update batch status on the immutable ledger.
              </p>
            </div>

            <div className="text-center fade-in-up">
              <div className="w-20 h-20 mx-auto mb-6 bg-accent text-accent-foreground rounded-full flex items-center justify-center">
                <BeakerIcon />
              </div>
              <h3 className="text-xl font-semibold mb-4">Quality Assurance</h3>
              <p className="text-muted-foreground">
                Certified labs upload quality reports directly to blockchain, linking them permanently.
              </p>
            </div>

            <div className="text-center fade-in-up">
              <div className="w-20 h-20 mx-auto mb-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center">
                <ShieldIcon />
              </div>
              <h3 className="text-xl font-semibold mb-4">Consumer Confidence</h3>
              <p className="text-muted-foreground">
                Final products carry QR codes showing complete, unchangeable ingredient history.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Demo Section */}
      <section id="demo" className="py-20 bg-background">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-12 fade-in-up">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              See Transparency in Action
            </h2>
            <p className="text-xl text-muted-foreground">
              Enter the demo Batch ID below to see a simulated traceability report.
            </p>
          </div>

          <div className="bg-card rounded-lg p-8 card-shadow fade-in-up">
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <Input value={demoId} onChange={e => setDemoId(e.target.value)} placeholder="Enter Batch ID" className="flex-1 text-lg p-4" />
              <Button onClick={handleDemoTrace} size="lg" className="nature-gradient text-white hover:opacity-90 px-8 font-semibold">
                Trace Product
              </Button>
            </div>

            {showDemo && <div className="space-y-6 animate-fade-in">
                <h3 className="text-2xl font-semibold text-center mb-8">
                  Journey of Batch: {demoId}
                </h3>
                
                <div className="space-y-6">
                  <div className="flex items-start space-x-4 p-4 bg-muted/20 rounded-lg">
                    <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center flex-shrink-0">
                      <LeafIcon />
                    </div>
                    <div>
                      <h4 className="font-semibold">Harvested in Kerala</h4>
                      <p className="text-muted-foreground">August 15, 2024 - Organic Ashwagandha roots collected by certified farmer Ravi Kumar</p>
                      <p className="text-sm text-muted-foreground mt-1">GPS: 10.8505° N, 76.2711° E</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4 p-4 bg-muted/20 rounded-lg">
                    <div className="w-12 h-12 bg-secondary text-primary-foreground rounded-full flex items-center justify-center flex-shrink-0">
                      <FactoryIcon />
                    </div>
                    <div>
                      <h4 className="font-semibold">Processed in Bangalore</h4>
                      <p className="text-muted-foreground">August 18, 2024 - Cleaned, dried, and powdered at AyurTech Processing Unit</p>
                      <p className="text-sm text-muted-foreground mt-1">Quality Grade: A+ | Moisture: 8.2%</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4 p-4 bg-muted/20 rounded-lg">
                    <div className="w-12 h-12 bg-accent text-accent-foreground rounded-full flex items-center justify-center flex-shrink-0">
                      <BeakerIcon />
                    </div>
                    <div>
                      <h4 className="font-semibold">Lab Verified</h4>
                      <p className="text-muted-foreground">August 20, 2024 - Tested at NABL Certified Lab Mumbai</p>
                      <p className="text-sm text-muted-foreground mt-1">Purity: 99.8% | Withanolides: 5.2% | Heavy Metals: Within limits</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4 p-4 bg-muted/20 rounded-lg">
                    <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center flex-shrink-0">
                      <ShieldIcon />
                    </div>
                    <div>
                      <h4 className="font-semibold">Consumer Ready</h4>
                      <p className="text-muted-foreground">August 22, 2024 - Packaged and ready for distribution</p>
                      <p className="text-sm text-muted-foreground mt-1">Batch verified ✓ | Blockchain hash: 0x7a8b9c...</p>
                    </div>
                  </div>
                </div>
              </div>}
          </div>
        </div>
      </section>

      {/* Technology Stack Section */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16 fade-in-up">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Built on a Foundation of Trust
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="card-shadow scale-on-hover fade-in-up">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 mx-auto mb-6 text-primary">
                  <BlockchainIcon />
                </div>
                <h3 className="text-xl font-semibold mb-4">Hyperledger Fabric</h3>
                <p className="text-muted-foreground">
                  A permissioned blockchain for secure, scalable, and confidential transactions.
                </p>
              </CardContent>
            </Card>

            <Card className="card-shadow scale-on-hover fade-in-up">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 mx-auto mb-6 text-secondary">
                  <CloudIcon />
                </div>
                <h3 className="text-xl font-semibold mb-4">IPFS Storage</h3>
                <p className="text-muted-foreground">
                  Decentralized, tamper-proof storage for large files like lab reports and photos.
                </p>
              </CardContent>
            </Card>

            <Card className="card-shadow scale-on-hover fade-in-up">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 mx-auto mb-6 text-accent">
                  <DeviceIcon />
                </div>
                <h3 className="text-xl font-semibold mb-4">Mobile & Web Apps</h3>
                <p className="text-muted-foreground">
                  Intuitive interfaces for all stakeholders, from farmers to executives.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>


      {/* Footer */}
      <footer className="py-12 bg-foreground text-background">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <div className="mb-8">
            <h3 className="text-2xl font-bold mb-4">AyurChain</h3>
            <p className="text-lg opacity-80">Trust in Every Leaf</p>
          </div>
          
          <div className="border-t border-background/20 pt-8">
            <p className="opacity-60">
              AyurChain - A Smart India Hackathon 2024 Project
            </p>
            <div className="mt-4 space-x-6">
              <a href="#" className="hover:text-accent transition-colors">GitHub Repository</a>
              <a href="#" className="hover:text-accent transition-colors">Project Presentation</a>
              <a href="#" className="hover:text-accent transition-colors">Documentation</a>
            </div>
          </div>
        </div>
      </footer>
    </div>;
};
export default Index;