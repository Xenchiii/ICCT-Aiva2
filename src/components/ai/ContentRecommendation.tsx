import { BookOpen, Video, ArrowRight, BrainCircuit } from 'lucide-react';

const ContentRecommendation = () => {
  // Hardcoded recommendations based on a "mock" low score in React
  const recommendations = [
    { type: 'video', title: 'React Hooks Deep Dive', duration: '15 min', reason: 'You missed 2 questions on useEffect' },
    { type: 'article', title: 'State Management Patterns', duration: '5 min read', reason: 'Highly relevant to your next quiz' },
  ];

  return (
    <div className="bg-gradient-to-br from-primary to-blue-900 text-white p-6 rounded-2xl shadow-lg relative overflow-hidden">
      <BrainCircuit className="absolute -right-4 -bottom-4 text-white/10" size={120} />
      
      <div className="relative z-10">
        <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
          <Sparkles size={18} className="text-secondary" /> Personalized for You
        </h3>
        
        <div className="space-y-3">
          {recommendations.map((rec, idx) => (
            <div key={idx} className="bg-white/10 backdrop-blur-sm p-3 rounded-xl border border-white/10 hover:bg-white/20 transition cursor-pointer group">
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-secondary/20 rounded-lg text-secondary">
                    {rec.type === 'video' ? <Video size={16} /> : <BookOpen size={16} />}
                  </div>
                  <div>
                    <h4 className="font-bold text-sm group-hover:text-secondary transition">{rec.title}</h4>
                    <p className="text-[10px] opacity-70">{rec.duration} • {rec.reason}</p>
                  </div>
                </div>
                <ArrowRight size={16} className="opacity-0 group-hover:opacity-100 transition -translate-x-2 group-hover:translate-x-0" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ContentRecommendation;