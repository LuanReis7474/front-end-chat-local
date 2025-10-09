interface ChatMessageProps {
  author: string;
  message: string;
  time: string;
  isOwn?: boolean;
}

export const ChatMessage = ({ author, message, time, isOwn = false }: ChatMessageProps) => {
  return (
    <div className={`flex flex-col gap-1 ${isOwn ? "items-end" : "items-start"}`}>
      <div className="flex items-center gap-2 text-sm">
        <span className="font-medium text-foreground">{author}</span>
        <span className="text-xs text-muted-foreground">{time}</span>
      </div>
      <div
        className={`max-w-[80%] rounded-2xl px-4 py-2 ${
          isOwn
            ? "bg-primary text-primary-foreground rounded-br-sm"
            : "bg-muted text-foreground rounded-bl-sm"
        }`}
      >
        <p className="text-sm">{message}</p>
      </div>
    </div>
  );
};
