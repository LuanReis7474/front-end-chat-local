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

  const handleOnboardingComplete = (userNickname: string) => {
    localStorage.setItem("redondeza_nickname", userNickname);
    setNickname(userNickname);
  };

  if (!nickname) {
    return <Onboarding onComplete={handleOnboardingComplete} />;
  }

  return <Home nickname={nickname} />;
};

export default Index;
