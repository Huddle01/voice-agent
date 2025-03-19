import React from 'react'
import { Button } from '../ui/button'
import Link from 'next/link'
import { ChevronRight, User } from 'lucide-react'
import { Card, CardContent } from '../ui/card'

const Community = () => {

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
    <div className="mb-24">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold">From the Community</h2>
            <Button variant="link" asChild className="text-zinc-400 hover:text-white">
              <Link href="/" className="flex items-center">
                View All <ChevronRight className="w-4 h-4 ml-1" />
              </Link>
            </Button>
          </div>
          
          <div className="relative mb-6">
            <div className="absolute inset-0 z-10 flex items-center justify-center">
              <div className="absolute inset-0 bg-black/20 backdrop-blur-sm rounded-xl" />
              
              <div className="relative z-20 text-center px-8 py-12">
                <div className="inline-block border border-zinc-700 bg-zinc-900/80 backdrop-blur-md rounded-xl px-8 py-6 shadow-xl">
                  <h3 className="text-3xl font-bold text-white mb-2">Coming Soon</h3>
                  <p className="text-zinc-400 max-w-md">
                    We're working on bringing you the best community-created agents. 
                    Check back soon for exciting new additions.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 opacity-50">
              {communityAgents.map((agent) => (
                <div className="cursor-pointer" key={agent.title}>
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
        </div>
  )
}

export default Community