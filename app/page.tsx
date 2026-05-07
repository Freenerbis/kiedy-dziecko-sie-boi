import ScrollProgressBar from '@/components/ui/ScrollProgressBar';
import Navbar from '@/components/sections/Navbar';
import Hero from '@/components/sections/Hero';
import WaitingReality from '@/components/sections/WaitingReality';
import ChildMessages from '@/components/sections/ChildMessages';
import Problems from '@/components/sections/Problems';
import ForumSection from '@/components/sections/ForumSection';
import ParentDialog from '@/components/sections/ParentDialog';
import Benefits from '@/components/sections/Benefits';
import HowItWorks from '@/components/sections/HowItWorks';
import Author from '@/components/sections/Author';
import Testimonials from '@/components/sections/Testimonials';
import Pricing from '@/components/sections/Pricing';
import FAQ from '@/components/sections/FAQ';
import FinalCTA from '@/components/sections/FinalCTA';
import Footer from '@/components/sections/Footer';
import StickyBar from '@/components/ui/StickyBar';
import ExitIntentPopup from '@/components/ui/ExitIntentPopup';
import LiveNotificationToast from '@/components/ui/LiveNotificationToast';
import CookieBanner from '@/components/ui/CookieBanner';

export default function Home() {
  return (
    <main>
      <ScrollProgressBar />
      <Navbar />
      <Hero />
      <WaitingReality />
      <ChildMessages />
      <ParentDialog />
      <ForumSection />
      <Problems />
      <Benefits />
      <HowItWorks />
      <Author />
      <Testimonials />
      <Pricing />
      <FAQ />
      <FinalCTA />
      <Footer />
      <StickyBar />
      <ExitIntentPopup />
      <LiveNotificationToast />
      <CookieBanner />
    </main>
  );
}
