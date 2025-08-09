import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MessageCircle, Send, X, Bot, User } from "lucide-react";

interface Message {
  id: string;
  text: string;
  isBot: boolean;
  timestamp: Date;
}

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Hello! I'm your AgriQCert assistant. How can I help you today?",
      isBot: true,
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState("");

  const predefinedResponses: { [key: string]: string } = {
    "hello": "Hello! How can I assist you with AgriQCert today?",
    "hi": "Hi there! What questions do you have about our certification platform?",
    "help": "I can help you with:\n• Batch submission process\n• Certificate verification\n• Account management\n• Technical support\n• API documentation\n\nWhat would you like to know more about?",
    "batch": "To submit a batch for certification:\n1. Click 'Submit New Batch' on your dashboard\n2. Fill in product details\n3. Upload required documents\n4. Submit for QA review\n\nThe process typically takes 5-7 business days.",
    "certificate": "To verify a certificate:\n1. Go to our Certificate Verification page\n2. Scan the QR code or enter the certificate ID\n3. View instant verification results\n\nAll our certificates are blockchain-secured for authenticity.",
    "demo": "Demo Account Credentials:\n• Exporter: demo.exporter@agriqcert.com / password123\n• QA Agency: demo.qa@agriqcert.com / password123\n• Importer: demo.importer@agriqcert.com / password123\n• Admin: demo.admin@agriqcert.com / password123",
    "contact": "You can reach our support team:\n• Email: support@agriqcert.com\n• Phone: +1 (555) 123-4567\n• Emergency: +1 (555) 911-CERT\n• Live chat: Available Mon-Fri, 9AM-6PM EST"
  };

  const getBotResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();
    
    for (const [key, response] of Object.entries(predefinedResponses)) {
      if (lowerMessage.includes(key)) {
        return response;
      }
    }
    
    return "I'm not sure about that specific question. Please contact our support team at support@agriqcert.com or call +1 (555) 123-4567 for detailed assistance.";
  };

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      isBot: false,
      timestamp: new Date()
    };

    const botResponse: Message = {
      id: (Date.now() + 1).toString(),
      text: getBotResponse(inputValue),
      isBot: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage, botResponse]);
    setInputValue("");
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Chat Toggle Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          onClick={() => setIsOpen(!isOpen)}
          variant="agri"
          size="lg"
          className="rounded-full h-14 w-14 shadow-glow"
        >
          {isOpen ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
        </Button>
      </div>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-40 w-80 h-96">
          <Card className="h-full glass border-primary/20 shadow-glow bg-card/95 backdrop-blur-md">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center space-x-2 text-lg">
                <Bot className="h-5 w-5 text-primary" />
                <span>AgriQCert Assistant</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col h-full p-0">
              {/* Messages */}
              <ScrollArea className="flex-1 px-4">
                <div className="space-y-3 pb-4">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.isBot ? "justify-start" : "justify-end"}`}
                    >
                      <div
                        className={`max-w-[80%] rounded-lg p-3 ${
                          message.isBot
                            ? "bg-muted text-foreground"
                            : "bg-primary text-primary-foreground"
                        }`}
                      >
                        <div className="flex items-start space-x-2">
                          {message.isBot && <Bot className="h-4 w-4 mt-0.5 flex-shrink-0" />}
                          {!message.isBot && <User className="h-4 w-4 mt-0.5 flex-shrink-0" />}
                          <div className="text-sm whitespace-pre-line">{message.text}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>

              {/* Input */}
              <div className="p-4 border-t border-border">
                <div className="flex space-x-2">
                  <Input
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Type your message..."
                    className="flex-1 text-sm"
                  />
                  <Button
                    onClick={handleSendMessage}
                    variant="agri"
                    size="sm"
                    className="px-3"
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
                <div className="text-xs text-muted-foreground mt-2 text-center">
                  Try asking: "help", "demo", "batch", "certificate"
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </>
  );
};

export default ChatBot;