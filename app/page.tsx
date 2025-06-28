import CompanionCard from "@/components/CompanionCard";
import React from "react";
import CompanionsList from "@/components/CompanionsList";
import CTA from "@/components/CTA";

const Page = () => {
  return (
    <main>
      <h1>Popular Companions </h1>
      <section className="home-section">
        <CompanionCard
          id="123"
          name="Neura the Brainy Explorer"
          topic="Topic: Neural Network of the Brain"
          subject="science"
          duration={45}
          color="#E5D0FF"
        />
        <CompanionCard
          id="456"
          name="NCountsy the Number Wizard"
          topic="Topic: Derivatives & Integrals"
          subject="maths"
          duration={30}
          color="#FFDA6E"
        />
        <CompanionCard
          id="789"
          name="Verba the Vocabulary Builder"
          topic="Topic: Derivatives & Integrals"
          subject="Language"
          duration={30}
          color="#BDE7FF"
        />
      </section>

      <section className="home-section">
        <CompanionsList />
        <CTA />
      </section>
    </main>
  );
};
export default Page;
