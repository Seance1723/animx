import HeroJourney from '../components/landing/HeroJourney';
import ProblemSection from '../components/landing/ProblemSection';
import PowerPreview from '../components/landing/PowerPreview';
import CapabilityJourney from '../components/landing/CapabilityJourney';
import WhyAnimX from '../components/landing/WhyAnimX';
import UseCases from '../components/landing/UseCases';
import FinalCTA from '../components/landing/FinalCTA';

export default function LandingPage() {
  return (
    <div className="landing-page">
      <HeroJourney />
      <ProblemSection />
      <PowerPreview />
      <CapabilityJourney />
      <WhyAnimX />
      <UseCases />
      <FinalCTA />
    </div>
  );
}