import Head from "next/head";
import Link from "next/link";
import { api } from "@/utils/api";
import { useState, useRef, useEffect } from "react";
import { 
  User, 
  BookOpen, 
  Stethoscope, 
  Dumbbell, 
  Mic2, 
  Brain, 
  History, 
  FlaskRound,
  Paperclip,
  ArrowUp,
  ChevronRight,
  Loader2
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";

export default function Home() {
  const hello = api.post.hello.useQuery({ text: "from tRPC" });
  const [selectedPersona, setSelectedPersona] = useState<string | null>(null);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "60px";
      
      const scrollHeight = Math.min(textarea.scrollHeight, 150);
      textarea.style.height = `${Math.max(60, scrollHeight)}px`;
      
      if (textarea.scrollHeight > 150) {
        textarea.style.overflowY = "auto";
      } else {
        textarea.style.overflowY = "hidden";
      }
    }
  }, [inputValue]);

  const handleSubmit = () => {
    if (!inputValue.trim()) {
      toast.error("Input required", {
        description: "Please enter a question or message.",
        action: {
          label: "Try again",
          onClick: () => textareaRef.current?.focus()
        }
      });
      return;
    }
    
    if (!selectedPersona) {
      toast.error("Persona required", {
        description: "Please select a persona to chat with.",
        action: {
          label: "Select one",
          onClick: () => document.getElementById("persona-container")?.scrollIntoView({ behavior: "smooth" })
        }
      });
      return;
    }
    
    setIsLoading(true);
    
    setTimeout(() => {
      
      toast.success("Message sent", {
        description: `Your message was sent to ${selectedPersona}.`
      });
      
      setInputValue("");
      setIsLoading(false);
    }, 2000);
  };

  const personas = [
    { name: "Professor", icon: <BookOpen className="w-5 h-5" /> },
    { name: "Doctor", icon: <Stethoscope className="w-5 h-5" /> },
    { name: "Coach", icon: <Dumbbell className="w-5 h-5" /> },
    { name: "Storyteller", icon: <Mic2 className="w-5 h-5" /> },
    { name: "Comedian", icon: <User className="w-5 h-5" /> },
    { name: "Philosopher", icon: <Brain className="w-5 h-5" /> },
    { name: "Historian", icon: <History className="w-5 h-5" /> },
    { name: "Scientist", icon: <FlaskRound className="w-5 h-5" /> }
  ];

  const communityAgents = [
    {
      title: "Language Tutor",
      description: "Practice conversations in different languages with a patient tutor.",
      image: "/images/language-tutor.jpg",
      forks: "2.6K"
    },
    {
      title: "Fitness Coach",
      description: "Get personalized workout guidance and motivation.",
      image: "/images/fitness-coach.jpg",
      forks: "1.6K"
    },
    {
      title: "Meditation Guide",
      description: "Relax with guided meditations and mindfulness exercises.",
      image: "/images/meditation-guide.jpg",
      forks: "1.6K"
    },
    {
      title: "Debate Partner",
      description: "Sharpen your critical thinking with balanced viewpoints.",
      image: "/images/debate-partner.jpg",
      forks: "1.6K"
    },
    {
      title: "Bedtime Storyteller",
      description: "Enjoy customized bedtime stories with soothing voices.",
      image: "/images/bedtime-storyteller.jpg",
      forks: "1.3K"
    },
    {
      title: "Interview Prep Coach",
      description: "Practice job interviews with feedback on your responses.",
      image: "/images/interview-coach.jpg",
      forks: "1.1K"
    },
    {
      title: "Travel Guide",
      description: "Get personalized travel recommendations and local insights.",
      image: "/images/travel-guide.jpg",
      forks: "1.2K"
    },
    {
      title: "Financial Advisor",
      description: "Receive guidance on personal finance and investment strategies.",
      image: "/images/financial-advisor.jpg",
      forks: "5.7K"
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      <Head>
        <title>AI Audio Chat | Talk with AI Personas</title>
        <meta name="description" content="Chat with AI personas through audio" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="container mx-auto px-4 py-20 max-w-5xl">
        <div className="text-center mb-20">
          <h1 className="text-5xl font-bold mb-4 text-white">
            What can we help you with?
          </h1>
          
          <div className="max-w-3xl mx-auto relative">
            <div className="flex items-start bg-zinc-900 border border-zinc-800/50 rounded-2xl overflow-hidden px-4 shadow-lg">
              <button 
                type="button"
                className={cn(
                  "p-2 mt-3 transition-colors",
                  isLoading 
                    ? "text-zinc-700 cursor-not-allowed" 
                    : "text-zinc-500 hover:text-zinc-300"
                )}
                disabled={isLoading}
              >
                <Paperclip className="w-5 h-5" />
              </button>
              <textarea 
                ref={textareaRef}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                className={cn(
                  "flex-1 bg-transparent border-0 px-4 py-[18px] min-h-[60px] max-h-[150px] text-white placeholder:text-zinc-500 focus:outline-none resize-none",
                  isLoading && "opacity-50 cursor-not-allowed"
                )}
                placeholder="Ask what the Agent should be able to do"
                rows={1}
                style={{ height: "60px", overflowY: "hidden" }}
                disabled={isLoading}
              />
              <div className="flex items-center mt-3">
                <button 
                  type="button"
                  onClick={handleSubmit}
                  className={cn(
                    "rounded-full p-2 transition-colors",
                    isLoading 
                      ? "bg-blue-600/50 text-blue-300 cursor-not-allowed" 
                      : "text-zinc-500 hover:text-zinc-300 hover:bg-zinc-800"
                  )}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <ArrowUp className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>
            
            <div id="persona-container" className="flex flex-wrap justify-center gap-3 mt-6">
              {personas.map((persona) => (
                <Button
                  key={persona.name}
                  variant="outline"
                  className={cn(
                    "rounded-full border-zinc-800 bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-white",
                    "transition-all duration-300 flex items-center gap-2 px-5 py-2.5",
                    selectedPersona === persona.name && "border-zinc-700 bg-zinc-800 text-white",
                    isLoading && "opacity-50 cursor-not-allowed"
                  )}
                  onClick={() => !isLoading && setSelectedPersona(persona.name)}
                  disabled={isLoading}
                >
                  <span className="flex items-center justify-center">{persona.icon}</span>
                  <span>{persona.name}</span>
                </Button>
              ))}
            </div>
          </div>
        </div>

        <Separator className="my-12 bg-zinc-800/50" />

        <div className="mb-24">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold">From the Community</h2>
            <Button variant="link" asChild className="text-zinc-400 hover:text-white">
              <Link href="/" className="flex items-center">
                View All <ChevronRight className="w-4 h-4 ml-1" />
              </Link>
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {communityAgents.map((agent) => (
              <div className="cursor-pointer" >
                <Card className="border-zinc-800/50 bg-zinc-900 hover:bg-zinc-800/80 transition-all duration-300 h-full overflow-hidden group">
                  <div className="relative overflow-hidden aspect-[4/3] bg-zinc-800">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20 group-hover:opacity-70 transition-opacity" />

                    <div className="w-full h-full flex items-center justify-center text-zinc-500">
                      <span className="text-4xl">{agent.title.charAt(0)}</span>
                    </div>
                  </div>

                  <CardContent className="p-4 grid grid-rows-[1fr_2fr_1fr] gap-2">
                    <h3 className="font-medium text-white mb-1">{agent.title}</h3>
                    <p className="text-zinc-400 text-xs font-mono" >
                      {agent.description}
                    </p>
                    <div className="flex items-center text-sm text-zinc-400">
                      <User className="w-3 h-3 mr-1" />
                      <span>{agent.forks} Views</span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>

      
      </main>
    </div>
  );
}