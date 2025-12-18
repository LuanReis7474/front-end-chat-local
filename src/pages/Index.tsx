import { useState, useEffect } from "react";
import { Onboarding } from "@/components/Onboarding";
import { Home } from "./Home";

const Index = () => {
  const [nickname, setNickname] = useState<string | null>(null);

  useEffect(() => {
    // Check if user has already completed onboarding
    const savedNickname = localStorage.getItem("redondeza_nickname");
    if (savedNickname) {
      setNickname(savedNickname);
    }
  }, []);

  const handleOnboardingComplete = (userNickname: string, pos: { lati: number; long: number }) => {
    localStorage.setItem("redondeza_nickname", userNickname);
    localStorage.setItem("latitude", pos.lati.toString());
    localStorage.setItem("longitude", pos.long.toString());
    setNickname(userNickname);
  };

  if (!nickname) {
    return <Onboarding onComplete={handleOnboardingComplete} />;
  }

  return <Home nickname={nickname} />;
};

export default Index;
