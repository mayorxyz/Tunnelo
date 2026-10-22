import { Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import { ThemeProvider } from './components/ThemeProvider';
import Nav from './components/Nav';
import Hero from './components/Hero';
import TrustedBy from './components/TrustedBy';
import TestimonialBand from './components/TestimonialBand';
import FeatureBlock from './components/FeatureBlock';
import ExtraCards from './components/ExtraCards';
import HowItWorks from './components/HowItWorks';
import Frameworks from './components/Frameworks';
import Teams from './components/Teams';
import Pricing from './components/Pricing';
import Faq from './components/Faq';
import DevQuotes from './components/DevQuotes';
import FinalCta from './components/FinalCta';
import Footer from './components/Footer';
import DownloadPage from './pages/Download';
import ChangelogPage from './pages/Changelog';
import DocsPage from './pages/Docs';
import WebhookTesterPage from './pages/WebhookTester';
import AiAssistantsPage from './pages/AiAssistants';
import AlternativesPage from './pages/Alternatives';
import BlogPage from './pages/Blog';
import SecurityPage from './pages/Security';
import { DpaPage, TermsPage, PrivacyPage } from './pages/Legal';
import ContactPage from './pages/Contact';
import PricingPage from './pages/PricingPage';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function HomePage() {
  return (
    <>
      <Hero />
      <TrustedBy />
      <TestimonialBand />
      <FeatureBlock />
      <ExtraCards />
      <HowItWorks />
      <Frameworks />
      <Teams />
      <Pricing />
      <Faq />
      <DevQuotes />
      <FinalCta />
    </>
  );
}

function NotFound() {
  return (
    <div className="max-w-[1120px] mx-auto px-6 py-[120px] text-center">
      <p className="text-[120px] md:text-[200px] font-mono font-bold text-transparent" style={{ WebkitTextStroke: '2px var(--color-hairline)' }}>
        404
      </p>
      <p className="text-[16px] text-secondary mt-4 mb-8">Page not found</p>
      <a href="/" className="inline-block bg-lime text-lime-dark text-[13px] font-semibold px-6 py-2.5 rounded-md hover:opacity-90 transition-opacity">
        Back to home
      </a>
    </div>
  );
}

function AppContent() {
  const location = useLocation();

  return (
    <>
      <ScrollToTop />
      <Nav />
      <main>
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<HomePage />} />
            <Route path="/download" element={<DownloadPage />} />
            <Route path="/changelog" element={<ChangelogPage />} />
            <Route path="/docs" element={<DocsPage />} />
            <Route path="/docs/:section" element={<DocsPage />} />
            <Route path="/tools/webhook-tester" element={<WebhookTesterPage />} />
            <Route path="/ai-code-assistants" element={<AiAssistantsPage />} />
            <Route path="/alternatives/:name" element={<AlternativesPage />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/blog/:slug" element={<BlogPage />} />
            <Route path="/security" element={<SecurityPage />} />
            <Route path="/dpa" element={<DpaPage />} />
            <Route path="/terms" element={<TermsPage />} />
            <Route path="/privacy" element={<PrivacyPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/pricing" element={<PricingPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AnimatePresence>
      </main>
      <Footer />
    </>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}
