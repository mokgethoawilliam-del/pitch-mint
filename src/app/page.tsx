import {
  AppShell,
  FeaturesSection,
  FinalCta,
  HeroSection,
  HowItWorksSection,
  PricingSection,
  ValueSection
} from "@/components/pitchmint";

export default function Home() {
  return (
    <AppShell>
      <HeroSection />
      <ValueSection />
      <HowItWorksSection />
      <FeaturesSection />
      <PricingSection />
      <FinalCta />
    </AppShell>
  );
}
