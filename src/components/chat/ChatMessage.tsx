import { MoreVertical, UserCog, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface ChatMessageProps {
  id: number;
  author: string;
  message: string;
  time: string;
  isOwn?: boolean;
  isModerator?: boolean;
  isModeratorMessage?: boolean;
  onDelete?: (id: number) => void;
}

export const ChatMessage = ({ 
  id,
  author, 
  message, 
  time, 
  isOwn = false,
  isModerator = false,
  isModeratorMessage = false,
  onDelete 
}: ChatMessageProps) => {
  return (
    <div className={`flex flex-col gap-1 ${isOwn ? "items-end" : "items-start"}`}>
      <div className="flex items-center gap-2 text-sm">
        <span className="font-medium text-foreground">{author}</span>
        {isModeratorMessage && (
          <Badge variant="secondary" className="gap-1 text-xs h-5">
            <UserCog className="w-3 h-3" />
            Moderador
          </Badge>
        )}
        <span className="text-xs text-muted-foreground">{time}</span>
      </div>
      <div className="flex items-start gap-2 max-w-[85%]">
        <div
          className={`flex-1 rounded-2xl px-4 py-2 ${
            isOwn
              ? "bg-primary text-primary-foreground rounded-br-sm"
              : "bg-muted text-foreground rounded-bl-sm"
          }`}
        >
          <p className="text-sm">{message}</p>
        </div>
        
        {isModerator && !isOwn && onDelete && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 shrink-0"
              >
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem
                className="text-destructive focus:text-destructive"
                onClick={() => onDelete(id)}
              >
                <Trash2 className="mr-2 h-4 w-4" />
                Deletar mensagem
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>
    </div>
  );
};
