// LandingPage.jsx
import { useEffect } from "react";
import Navbar from "./Navbar.jsx";
import Hero from "./Hero.jsx";
import Stats from "./Stats.jsx";
import Seamless from "./Seamless.jsx";
import Features from "./Features.jsx";
import HowItWorks from "./HowItWorks.jsx";
import Community from "./Community.jsx";
import CTA from "./CTA.jsx";
import Footer from "./Footer.jsx";

export default function LandingPage() {
  useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("v");
            io.unobserve(e.target);
          }
        }),
      { threshold: 0.1 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <>
      <div className="grid-bg" />
      <Navbar />
      <Hero />
      <Stats />
      <Seamless />
      <Features />
      <HowItWorks />
      <Community />
      <CTA />
      <Footer />
    </>
  );
}
