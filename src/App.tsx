import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import { DebateChat } from "./pages/DebateChat";
import { EventChat } from "./pages/EventChat";
import NotFound from "./pages/NotFound";
import CreateAccount from "./pages/CreateAccount";
import Login from "./pages/Login";
import { CreateRoom } from './pages/CreateRoom';

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/:id" element={<Index />} />
          <Route path="/debate/:id" element={<DebateChat />} />
          <Route path="/event/:id" element={<EventChat />} />
          <Route path="/create-account" element={<CreateAccount />} />
          <Route path="/login" element={<Login />} />
          <Route path="/create-room" element={<CreateRoom />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
