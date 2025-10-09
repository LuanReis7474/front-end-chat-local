import { useState } from "react";
import { Gift, Sparkles, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { toast } from "sonner";

const rewards = [
  { id: 1, name: "Destaque sua mensagem", icon: "✨" },
  { id: 2, name: "Emoji exclusivo", icon: "🎭" },
  { id: 3, name: "Criar sala temporária", icon: "🏠" },
  { id: 4, name: "Badge especial", icon: "⭐" },
];

interface RewardWheelProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const RewardWheel = ({ open, onOpenChange }: RewardWheelProps) => {
  const [spinning, setSpinning] = useState(false);
  const [selectedReward, setSelectedReward] = useState<typeof rewards[0] | null>(null);

  const spinWheel = () => {
    setSpinning(true);
    setSelectedReward(null);
    
    setTimeout(() => {
      const randomReward = rewards[Math.floor(Math.random() * rewards.length)];
      setSelectedReward(randomReward);
      setSpinning(false);
      toast.success(`Você ganhou: ${randomReward.name}!`, {
        description: "Benefício ativado por 24 horas",
      });
    }, 2000);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl">Roleta de Benefícios</DialogTitle>
          <DialogDescription className="text-center">
            Gire a roleta e ganhe benefícios exclusivos por 24 horas!
          </DialogDescription>
        </DialogHeader>
        
        <div className="flex flex-col items-center gap-6 py-4">
          <div
            className={`w-48 h-48 rounded-full bg-gradient-primary flex items-center justify-center relative shadow-float ${
              spinning ? "animate-spin" : ""
            }`}
          >
            <div className="grid grid-cols-2 gap-2 p-8">
              {rewards.map((reward) => (
                <div
                  key={reward.id}
                  className="text-4xl transform hover:scale-110 transition-transform"
                >
                  {reward.icon}
                </div>
              ))}
            </div>
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <Sparkles className="h-12 w-12 text-primary-foreground opacity-50" />
            </div>
          </div>

          {selectedReward && !spinning && (
            <div className="text-center space-y-2 animate-in fade-in duration-500">
              <div className="text-5xl">{selectedReward.icon}</div>
              <p className="font-semibold text-lg">{selectedReward.name}</p>
            </div>
          )}

          <Button
            size="lg"
            className="w-full"
            onClick={spinWheel}
            disabled={spinning}
          >
            <Gift className="mr-2 h-5 w-5" />
            {spinning ? "Girando..." : "Girar Roleta"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export const FloatingRewardButton = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button
        size="lg"
        className="fixed bottom-6 right-6 h-16 w-16 rounded-full shadow-float animate-pulse hover:animate-none"
        onClick={() => setOpen(true)}
      >
        <Gift className="h-7 w-7" />
      </Button>
      <RewardWheel open={open} onOpenChange={setOpen} />
    </>
  );
};
