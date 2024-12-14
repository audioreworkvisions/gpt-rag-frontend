import { FC, useState } from 'react';
import { MessageSquare, Send } from 'lucide-react';
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import { Input } from "../components/ui/input";

interface Message {
  id: string;
  type: 'user' | 'ai';
  content: string;
  contentType: 'text' | 'image';  // Type of content being displayed
  imageUrl?: string;              // URL for generated images
  context?: string;
  timestamp: Date;
}

export const Chat: FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSendMessage = async () => {
    if (!newMessage.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: newMessage.trim(),
      contentType: 'text',  // Default to text for user messages
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setNewMessage('');
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('http://localhost:8000/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: userMessage.content }),
      });

      if (!response.ok) {
        throw new Error('Failed to get response');
      }

      const data = await response.json();
      setMessages(prev => [...prev, {
        id: Date.now().toString(),
        type: 'ai',
        content: data.response,
        contentType: 'text',  // Default to text for AI responses
        context: data.context,
        timestamp: new Date(),
      }]);
    } catch (error) {
      console.error('Failed to send message:', error);
      setError('Failed to send message. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col h-[calc(100vh-16rem)] max-w-4xl mx-auto">
        <div className="flex-1 overflow-y-auto space-y-4 mb-4">
          {messages.map((message) => (
            <Card
              key={message.id}
              className={`p-4 max-w-[80%] ${
                message.type === 'user'
                  ? 'ml-auto bg-gradient-to-r from-red-800 to-red-700 text-white'
                  : 'bg-gradient-to-r from-cyan-600 to-cyan-500 text-white'
              }`}
            >
              <div className="flex items-start gap-3">
                <MessageSquare className="h-5 w-5 mt-1" />
                <div className="flex-1">
                  <p className="text-sm">{message.content}</p>
                  {message.context && (
                    <div className="mt-2 text-xs border-t border-white/20 pt-2">
                      <p className="font-semibold">Context:</p>
                      <p className="opacity-90">{message.context}</p>
                    </div>
                  )}
                  <span className="text-xs opacity-70 mt-1 block">
                    {message.timestamp.toLocaleTimeString()}
                  </span>
                </div>
              </div>
            </Card>
          ))}
          {error && (
            <Card className="p-4 bg-red-500/10 text-red-500 border-red-500/20 mx-auto">
              {error}
            </Card>
          )}
        </div>

        <div className="flex gap-4">
          <Input
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && handleSendMessage()}
            placeholder="Type your message..."
            className="flex-1"
            disabled={isLoading}
          />
          <Button
            onClick={handleSendMessage}
            disabled={isLoading}
            className="bg-gradient-to-r from-red-800 to-cyan-600 hover:opacity-90"
          >
            {isLoading ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <Send className="h-5 w-5" />
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};
