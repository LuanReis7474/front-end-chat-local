import { useState } from "react";
import { MapPin, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface OnboardingProps {
  onComplete: (nickname: string) => void;
}

export const Onboarding = ({ onComplete }: OnboardingProps) => {
  const [step, setStep] = useState<"welcome" | "nickname" | "location">("welcome");
  const [nickname, setNickname] = useState("");

  const handleNicknameSubmit = () => {
    if (nickname.trim()) {
      setStep("location");
    }
  };

  const handleLocationPermission = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        () => {
          onComplete(nickname);
        },
        () => {
          // For prototype, continue even if permission denied
          onComplete(nickname);
        }
      );
    } else {
      onComplete(nickname);
    }
  };

  if (step === "welcome") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-primary p-6">
        <div className="max-w-md w-full text-center space-y-6 animate-in fade-in duration-500">
          <div className="space-y-3">
            <h1 className="text-5xl font-bold text-primary-foreground">Redondeza</h1>
            <p className="text-xl text-primary-foreground/90">
              Conecte-se com o que está acontecendo ao seu redor
            </p>
          </div>
          <Button
            size="lg"
            variant="secondary"
            className="w-full"
            onClick={() => setStep("nickname")}
          >
            Começar <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>
    );
  }

  if (step === "nickname") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background p-6">
        <div className="max-w-md w-full space-y-6 animate-in fade-in duration-500">
          <div className="space-y-3 text-center">
            <h2 className="text-3xl font-bold text-foreground">Como quer ser chamado?</h2>
            <p className="text-muted-foreground">
              Escolha um apelido para usar no Redondeza
            </p>
          </div>
          <div className="space-y-4">
            <Input
              placeholder="Seu apelido"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleNicknameSubmit()}
              className="text-center text-lg h-14"
              maxLength={20}
            />
            <Button
              size="lg"
              className="w-full"
              onClick={handleNicknameSubmit}
              disabled={!nickname.trim()}
            >
              Continuar <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-6">
      <div className="max-w-md w-full space-y-6 text-center animate-in fade-in duration-500">
        <div className="flex justify-center">
          <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center">
            <MapPin className="h-10 w-10 text-primary" />
          </div>
        </div>
        <div className="space-y-3">
          <h2 className="text-3xl font-bold text-foreground">Ative sua localização</h2>
          <p className="text-muted-foreground">
            Para mostrar eventos e conversas próximas de você, precisamos saber onde você está.
            Seus dados são privados e seguros.
          </p>
        </div>
        <Button
          size="lg"
          className="w-full"
          onClick={handleLocationPermission}
        >
          Permitir localização <ArrowRight className="ml-2 h-5 w-5" />
        </Button>
      </div>
    </div>
  );
};
