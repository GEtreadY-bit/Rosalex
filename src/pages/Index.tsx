
import Layout from "@/components/layout/Layout";
import HeroSection from "@/components/home/HeroSection";
import MissionSection from "@/components/home/MissionSection";
import CoursesPreview from "@/components/home/CoursesPreview";
import NewsPreview from "@/components/home/NewsPreview";
import ContactCTA from "@/components/home/ContactCTA";

const Index = () => {
  return (
    <Layout>
      <HeroSection />
      <MissionSection />
      <CoursesPreview />
      <NewsPreview />
      <ContactCTA />
    </Layout>
  );
};

export default Index;
