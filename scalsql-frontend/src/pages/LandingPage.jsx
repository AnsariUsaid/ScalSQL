import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Home, Layers, Server, CreditCard } from 'lucide-react';
import ShaderBackground from '../components/ui/shader-background';
import DisplayCards from '../components/ui/display-cards';
import AnimatedArchitecture from '../components/ui/cyber-architecture';
import { NavBar } from '../components/ui/tubelight-navbar';
import LaserFlow from '../components/ui/laser-flow';
import { PricingSection } from '../components/ui/pricing';

const LandingPage = () => {
  useEffect(() => {
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                if(entry.target.classList.contains('line-trigger')) {
                     const line = entry.target.querySelector('.animated-line');
                     if(line) line.classList.add('playing');
                }
            }
        });
    }, observerOptions);

    document.querySelectorAll('.reveal-on-scroll').forEach(el => {
        observer.observe(el);
    });

    const line = document.getElementById('connect-line');
    let observerLine;
    if (line) {
        observerLine = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.transform = 'scaleX(1)';
                }
            });
        });
        observerLine.observe(line);
    }

    return () => {
        observer.disconnect();
        if(observerLine) observerLine.disconnect();
    };
  }, []);

  const navItems = [
    { name: 'Home', url: '#', icon: Home },
    { name: 'Features', url: '#features', icon: Layers },
    { name: 'Architecture', url: '#architecture', icon: Server },
    { name: 'Pricing', url: '#pricing', icon: CreditCard },
  ];

  return (
    <div className="bg-background-base text-gray-100 transition-colors duration-300 overflow-x-hidden min-h-screen">
      {/* Single unified floating navbar */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 z-50 pt-4">
        <div className="flex items-center gap-4 bg-[#050507]/60 border border-white/10 backdrop-blur-xl py-2 px-3 rounded-full shadow-lg">
          {/* Logo */}
          <div className="flex items-center gap-1.5 pl-2 pr-3 border-r border-white/10">
            <span className="material-icons text-primary text-xl">storage</span>
            <span className="font-bold text-sm tracking-tight text-white hidden sm:inline">SQL<span className="text-primary">Architect</span></span>
          </div>

          {/* Nav Items */}
          <NavBar items={navItems} />

          {/* Auth Buttons */}
          <div className="flex items-center gap-3 pl-3 border-l border-white/10">
            <Link className="text-gray-300 hover:text-primary transition-colors text-sm font-medium hidden sm:block" to="/login">Login</Link>
            <Link className="relative group overflow-hidden bg-primary hover:bg-primary-dark text-white px-5 py-2 rounded-full text-sm font-semibold transition-all shadow-[0_0_15px_rgba(168,85,247,0.4)] hover:shadow-[0_0_25px_rgba(168,85,247,0.8)] whitespace-nowrap" to="/register">
              <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-shimmer"></span>
              Get Started
            </Link>
          </div>
        </div>
      </div>

      <section className="relative pt-36 pb-24 lg:pt-48 lg:pb-40 overflow-hidden hero-bg">
        {/* WebGL Shader Background */}
        <ShaderBackground />
        {/* Overlay so shader doesn't overpower text */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#050507]/60 via-[#2e1065]/20 to-background-base pointer-events-none" style={{zIndex: 1}}></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center" style={{zIndex: 2}}>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 text-white animate-[slideUp_0.8s_ease-out_0.2s_both]">
            Talk to Your Data, <br className="hidden md:block"/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-purple-400 to-blue-500 glow-text">Not Your Database</span>
          </h1>
          <div className="mt-10 flex justify-center gap-4 animate-[slideUp_0.8s_ease-out_0.8s_both]">
            <Link className="bg-gradient-to-r from-primary to-indigo-600 text-white px-8 py-4 rounded-lg text-lg font-semibold shadow-[0_0_20px_rgba(168,85,247,0.5)] hover:shadow-[0_0_30px_rgba(168,85,247,0.7)] transition-all flex items-center gap-2 group hover:-translate-y-1" to="/register">
              Start Generating for Free
              <span className="material-icons group-hover:translate-x-1 transition-transform">arrow_forward</span>
            </Link>
            <a className="px-8 py-4 rounded-lg text-lg font-semibold text-white border border-primary/30 hover:bg-primary/10 transition-all flex items-center gap-2 backdrop-blur-sm hover:border-primary/60" href="#features">
              <span className="material-icons text-primary">play_circle_outline</span>
              View Demo
            </a>
          </div>

          <div className="mt-32 mx-auto max-w-4xl animate-float">
            <div className="shader-gradient-border p-[1px]">
              <div className="bg-surface-dark rounded-xl overflow-hidden shadow-2xl transform hover:scale-[1.02] transition-transform duration-500 relative">
                <div className="absolute inset-0 bg-primary/5 pointer-events-none animate-pulse"></div>
                <div className="bg-black/60 px-4 py-3 border-b border-white/10 flex items-center gap-2 relative z-10">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  </div>
                  <div className="text-xs text-gray-400 ml-4 font-mono">query_generator.ai</div>
                </div>
                <div className="p-6 md:p-8 grid md:grid-cols-2 gap-8 text-left relative z-10 bg-black/40 backdrop-blur-sm">
                  <div className="space-y-4">
                    <label className="block text-sm font-medium text-primary">Human Input</label>
                    <div className="relative group">
                      <div className="absolute -inset-0.5 bg-gradient-to-r from-primary to-blue-600 rounded-lg blur opacity-20 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>
                      <textarea className="relative w-full bg-black/50 border border-white/10 rounded-lg p-4 text-gray-200 focus:ring-2 focus:ring-primary focus:border-transparent outline-none resize-none h-32" disabled defaultValue={"Show me the top 5 customers by revenue from last quarter who are located in California."}></textarea>
                      <div className="absolute bottom-4 right-4 text-primary">
                        <span className="material-icons animate-spin text-sm">autorenew</span>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <label className="block text-sm font-medium text-green-400">SQL Output</label>
                    <div className="w-full bg-[#0d1117] border border-white/10 rounded-lg p-4 h-32 overflow-hidden relative group shadow-[inset_0_0_20px_rgba(0,0,0,0.5)]">
                      <pre className="code-block text-sm text-green-400"><code>SELECT c.name, SUM(o.total) as revenue 
{'\n'}FROM customers c 
{'\n'}JOIN orders o ON c.id = o.customer_id 
{'\n'}WHERE c.state = 'CA' 
{'\n'}  AND o.date &gt;= DATE_SUB(NOW(), INTERVAL 3 MONTH)
{'\n'}GROUP BY c.id 
{'\n'}ORDER BY revenue DESC 
{'\n'}LIMIT 5;</code></pre>
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0d1117]/90 to-transparent pointer-events-none"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-32 bg-background-base relative border-t border-white/5" id="features">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            {/* Left: copy */}
            <div className="flex-1 reveal-on-scroll">
              <span className="text-primary font-semibold tracking-wider uppercase text-sm border border-primary/30 px-3 py-1 rounded-full bg-primary/5">The Problem</span>
              <h2 className="text-3xl md:text-4xl font-bold text-white mt-6 mb-4">Why Manual SQL is&nbsp;Obsolete</h2>
              <p className="text-gray-400 text-lg leading-relaxed mb-6">
                Stop wasting engineering hours on ad-hoc queries. Empower your business teams to get answers instantly — without waiting days for a data engineer.
              </p>
              <ul className="space-y-3 text-gray-400 text-sm">
                <li className="flex items-start gap-2"><span className="text-red-400 mt-0.5">✕</span> Business analysts blocked, waiting on engineers</li>
                <li className="flex items-start gap-2"><span className="text-yellow-400 mt-0.5">✕</span> Engineering time drained on repetitive data tasks</li>
                <li className="flex items-start gap-2"><span className="text-blue-400 mt-0.5">✕</span> Unoptimized SQL locks tables and inflates cloud costs</li>
              </ul>
            </div>

            {/* Right: stacked display cards */}
            <div className="flex-1 flex justify-center items-center py-16 reveal-on-scroll">
              <DisplayCards />
            </div>
          </div>
        </div>
      </section>


      <AnimatedArchitecture />

      <section className="py-20 bg-background-base">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="reveal-on-scroll">
              <h2 className="text-3xl font-bold text-white mb-6">Production-Grade Infrastructure</h2>
              <p className="text-gray-400 mb-8 text-lg">
                We don't just generate code; we ensure it runs efficiently on your cloud infrastructure. Fully compliant with SOC2 and HIPAA standards.
              </p>
              <div className="space-y-6">
                <div className="flex items-start group">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center w-10 h-10 rounded-md bg-indigo-500/10 text-indigo-500 group-hover:bg-indigo-500/20 group-hover:text-indigo-400 transition-all shadow-[0_0_10px_rgba(99,102,241,0.1)] border border-indigo-500/20">
                      <span className="material-icons">dns</span>
                    </div>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-white">AWS EC2 & Lambda</h3>
                    <p className="mt-1 text-gray-400">Serverless architecture ensures you only pay for compute when queries are running.</p>
                  </div>
                </div>
                <div className="flex items-start group">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center w-10 h-10 rounded-md bg-blue-500/10 text-blue-500 group-hover:bg-blue-500/20 group-hover:text-blue-400 transition-all shadow-[0_0_10px_rgba(59,130,246,0.1)] border border-blue-500/20">
                      <span className="material-icons">storage</span>
                    </div>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-white">RDS Integration</h3>
                    <p className="mt-1 text-gray-400">Seamless connectors for PostgreSQL, MySQL, and Aurora. Read-only access ensures safety.</p>
                  </div>
                </div>
                <div className="flex items-start group">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center w-10 h-10 rounded-md bg-green-500/10 text-green-500 group-hover:bg-green-500/20 group-hover:text-green-400 transition-all shadow-[0_0_10px_rgba(34,197,94,0.1)] border border-green-500/20">
                      <span className="material-icons">speed</span>
                    </div>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-white">Intelligent Auto-Scaling</h3>
                    <p className="mt-1 text-gray-400">Handles spikes in query volume automatically without degrading performance.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative reveal-on-scroll">
              <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full animate-pulse-slow"></div>
              <div className="shader-gradient-border p-[1px]">
                <div className="glass-card rounded-xl p-8 relative z-10 h-full border border-white/10 bg-[#0a0a0c]/80">
                  <div className="flex justify-between items-center mb-8 border-b border-white/10 pb-4">
                    <span className="font-mono text-sm text-gray-400">System Status</span>
                    <span className="flex items-center text-green-400 text-sm font-medium shadow-[0_0_10px_rgba(74,222,128,0.2)] px-2 py-0.5 rounded-full bg-green-500/10 border border-green-500/20">
                      <span className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-ping"></span>
                      Operational
                    </span>
                  </div>
                  <div className="space-y-6">
                    <div>
                      <div className="flex items-center justify-center relative mb-2">
                        <div className="absolute left-0 text-gray-300 text-sm font-medium">Query Latency</div>
                        <div className="absolute right-0 font-mono text-primary font-bold">45ms</div>
                      </div>
                      <div className="w-full bg-white/5 rounded-full h-2 overflow-hidden">
                        <div className="bg-gradient-to-r from-primary to-blue-500 h-2 rounded-full progress-bar-scan relative w-[15%]"></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center justify-center relative mb-2">
                        <div className="absolute left-0 text-gray-300 text-sm font-medium">Accuracy Score</div>
                        <div className="absolute right-0 font-mono text-green-400 font-bold">99.2%</div>
                      </div>
                      <div className="w-full bg-white/5 rounded-full h-2 overflow-hidden">
                        <div className="bg-gradient-to-r from-green-500 to-emerald-400 h-2 rounded-full progress-bar-scan relative w-[99%]"></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center justify-center relative mb-2">
                        <div className="absolute left-0 text-gray-300 text-sm font-medium">Uptime</div>
                        <div className="absolute right-0 font-mono text-blue-400 font-bold">99.99%</div>
                      </div>
                      <div className="w-full bg-white/5 rounded-full h-2 overflow-hidden">
                        <div className="bg-gradient-to-r from-blue-500 to-indigo-500 h-2 rounded-full progress-bar-scan relative w-[100%]"></div>
                      </div>
                    </div>
                  </div>
                  <div className="mt-8 pt-6 border-t border-white/10 flex gap-4 overflow-x-auto opacity-80">
                    <div className="flex items-center gap-2 font-bold text-sm text-gray-400"><span className="material-icons text-lg">cloud</span> AWS</div>
                    <div className="flex items-center gap-2 font-bold text-sm text-gray-400"><span className="material-icons text-lg">data_object</span> Postgres</div>
                    <div className="flex items-center gap-2 font-bold text-sm text-gray-400"><span className="material-icons text-lg">security</span> SOC2</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="py-24 bg-background-base border-t border-white/5" id="pricing">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <PricingSection
            heading="Plans that Scale with You"
            description="Whether you're just starting out or building enterprise data pipelines, our flexible pricing has you covered."
            plans={[
              {
                name: 'Starter',
                info: 'For individuals & small teams',
                price: { monthly: 0, yearly: 0 },
                features: [
                  { text: '50 queries/month' },
                  { text: '1 database connection' },
                  { text: 'Basic SQL generation', tooltip: 'Simple SELECT and JOIN queries' },
                  { text: 'Community support' },
                  { text: 'Query history (7 days)' },
                ],
                btn: { text: 'Get Started Free', href: '/register' },
              },
              {
                highlighted: true,
                name: 'Pro',
                info: 'For growing teams',
                price: { monthly: 49, yearly: Math.round(49 * 12 * 0.85) },
                features: [
                  { text: 'Unlimited queries' },
                  { text: '10 database connections' },
                  { text: 'Advanced SQL (CTEs, window)', tooltip: 'Complex queries with CTEs, subqueries, and window functions' },
                  { text: 'Priority support', tooltip: '24/7 chat and email support' },
                  { text: 'Query history (unlimited)' },
                  { text: 'Schema auto-detection' },
                  { text: 'CSV/JSON export' },
                ],
                btn: { text: 'Start Pro Trial', href: '/register' },
              },
              {
                name: 'Enterprise',
                info: 'For large organizations',
                price: { monthly: 199, yearly: Math.round(199 * 12 * 0.8) },
                features: [
                  { text: 'Everything in Pro' },
                  { text: 'Unlimited connections' },
                  { text: 'SSO & SAML', tooltip: 'Enterprise-grade single sign-on' },
                  { text: 'SOC2 & HIPAA compliant' },
                  { text: 'Dedicated account manager' },
                  { text: 'Custom SageMaker model' },
                  { text: 'SLA guarantee (99.99%)' },
                ],
                btn: { text: 'Contact Sales', href: '/register' },
              },
            ]}
          />
        </div>
      </section>

      <section className="relative py-24 overflow-hidden" style={{ backgroundColor: '#060010' }}>
        {/* LaserFlow as section background */}
        <LaserFlow
          color="#a855f7"
          horizontalBeamOffset={0.05}
          verticalBeamOffset={0.0}
          horizontalSizing={0.6}
          verticalSizing={2}
          wispDensity={1.2}
          wispSpeed={12}
          wispIntensity={4}
          flowSpeed={0.3}
          flowStrength={0.2}
          fogIntensity={0.35}
          fogScale={0.3}
          fogFallSpeed={0.5}
          decay={1.1}
          falloffStart={1.3}
        />

        {/* Card floating on top */}
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="rounded-3xl overflow-hidden p-12 md:p-20 text-center bg-[#0a0a0c]/95 border border-white/10 shadow-[0_20px_60px_rgba(0,0,0,0.6)] reveal-on-scroll">
            <span className="inline-block text-xs font-bold uppercase tracking-widest text-primary border border-primary/30 rounded-full px-4 py-1 mb-6 bg-primary/5">Limited Time Offer</span>
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-5 leading-tight">Ready to democratize <br className="hidden md:block" />your data?</h2>
            <p className="text-gray-400 text-lg mb-10 max-w-2xl mx-auto">Join 500+ companies using AI SQL Cloud Architect to speed up analytics by 10x.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link className="bg-white text-[#0a0a0c] px-8 py-3.5 rounded-full text-lg font-bold hover:bg-gray-100 transition-all shadow-[0_0_30px_rgba(255,255,255,0.15)] hover:shadow-[0_0_40px_rgba(255,255,255,0.3)]" to="/register">
                Get Started Free
              </Link>
              <Link className="bg-transparent border border-white/20 text-white px-8 py-3.5 rounded-full text-lg font-bold hover:bg-white/5 transition-all hover:border-white/40" to="/register">
                Contact Sales
              </Link>
            </div>
            <p className="mt-8 text-sm text-gray-500">No credit card required · 14-day free trial · Cancel anytime</p>
          </div>
        </div>
      </section>

      <footer className="bg-[#030304] border-t border-white/5 pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
            <div className="col-span-2 md:col-span-1">
              <div className="flex items-center gap-2 mb-4">
                <span className="material-icons text-primary">storage</span>
                <span className="font-bold text-xl text-white">SQL<span className="text-primary">Architect</span></span>
              </div>
              <p className="text-gray-500 text-sm">Empowering teams with instant data access through the power of AI and Cloud Computing.</p>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Product</h4>
              <ul className="space-y-2 text-sm text-gray-500">
                <li><a className="hover:text-primary transition-colors" href="#">Features</a></li>
                <li><a className="hover:text-primary transition-colors" href="#">Integrations</a></li>
                <li><a className="hover:text-primary transition-colors" href="#">Pricing</a></li>
                <li><a className="hover:text-primary transition-colors" href="#">Changelog</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Resources</h4>
              <ul className="space-y-2 text-sm text-gray-500">
                <li><a className="hover:text-primary transition-colors" href="#">Documentation</a></li>
                <li><a className="hover:text-primary transition-colors" href="#">API Reference</a></li>
                <li><a className="hover:text-primary transition-colors" href="#">Community</a></li>
                <li><a className="hover:text-primary transition-colors" href="#">Blog</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-gray-500">
                <li><a className="hover:text-primary transition-colors" href="#">About</a></li>
                <li><a className="hover:text-primary transition-colors" href="#">Careers</a></li>
                <li><a className="hover:text-primary transition-colors" href="#">Legal</a></li>
                <li><a className="hover:text-primary transition-colors" href="#">Contact</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-gray-500">© 2023 ScalSQL. All rights reserved.</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a className="text-gray-400 hover:text-white hover:text-primary transition-colors" href="#"><span className="sr-only">Twitter</span><svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"></path></svg></a>
              <a className="text-gray-400 hover:text-white hover:text-primary transition-colors" href="#"><span className="sr-only">GitHub</span><svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" fillRule="evenodd"></path></svg></a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
