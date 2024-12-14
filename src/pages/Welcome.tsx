import { FC } from 'react';
import { useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import { MessageSquare, Search as SearchIcon } from 'lucide-react';

export const Welcome: FC = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-12rem)] animate-fade-in">
      <Card className="p-8 bg-gray-800/50 backdrop-blur-sm border-gray-700 w-full max-w-2xl mx-auto">
        <div className="space-y-6 text-center">
          <h1 className="text-6xl font-bold mb-8">
            <span className="bg-gradient-to-r from-red-800 to-cyan-600 bg-clip-text text-transparent">
              Fly with AI
            </span>
          </h1>

          <p className="text-lg text-gray-300">
            Experience the future of communication and search with our advanced AI platform.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-6 mt-8">
            <Button
              onClick={() => navigate('/chat')}
              className="bg-gradient-to-r from-red-800 to-red-700 hover:from-red-700 hover:to-red-600 group"
            >
              <MessageSquare className="h-5 w-5 mr-2 group-hover:scale-110 transition-transform" />
              Start Chatting
            </Button>
            <Button
              onClick={() => navigate('/search')}
              className="bg-gradient-to-r from-cyan-600 to-cyan-500 hover:from-cyan-500 hover:to-cyan-400 group"
            >
              <SearchIcon className="h-5 w-5 mr-2 group-hover:scale-110 transition-transform" />
              Web Search
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};
