import { TrendingUp, AlertTriangle, Target, Sparkles } from 'lucide-react';

const PredictiveInsights = () => {
  // Hardcoded predictions simulating AI output
  const predictions = [
    { subject: 'IT 302', current: 1.75, predicted: 1.25, confidence: 92, trend: 'up' },
    { subject: 'CS 201', current: 2.25, predicted: 2.00, confidence: 85, trend: 'up' },
    { subject: 'Math 101', current: 3.00, predicted: 3.50, confidence: 78, trend: 'down' },
  ];

  return (
    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm animate-fade-in">
      <div className="flex justify-between items-center mb-6">
        <h3 className="font-bold text-primary flex items-center gap-2">
          <Target size={20} className="text-secondary" /> 
          AI Performance Forecast
        </h3>
        <span className="text-[10px] bg-blue-50 text-blue-600 px-2 py-1 rounded font-bold uppercase">
          Model v2.4 Active
        </span>
      </div>

      <div className="space-y-4">
        {predictions.map((p) => (
          <div key={p.subject} className="p-4 bg-gray-50 rounded-xl flex items-center justify-between">
            <div>
              <h4 className="font-bold text-gray-800">{p.subject}</h4>
              <p className="text-xs text-gray-500">Confidence Score: {p.confidence}%</p>
            </div>
            
            <div className="text-right flex items-center gap-4">
              <div>
                <p className="text-[10px] text-gray-400 uppercase">Current</p>
                <p className="font-bold text-gray-600">{p.current.toFixed(2)}</p>
              </div>
              
              <div className="text-center">
                <p className="text-[10px] text-gray-400 uppercase">Predicted</p>
                <p className={`font-black text-xl ${p.trend === 'up' ? 'text-green-600' : 'text-red-500'}`}>
                  {p.predicted.toFixed(2)}
                </p>
              </div>

              {p.trend === 'down' && (
                <div className="p-2 bg-red-100 text-red-600 rounded-full" title="Risk Detected: Grade is increasing (worsening)">
                  <AlertTriangle size={16} />
                </div>
              )}
              {p.trend === 'up' && (
                <div className="p-2 bg-green-100 text-green-600 rounded-full" title="Positive Trend: Grade is decreasing (improving)">
                  <TrendingUp size={16} />
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-4 p-3 bg-blue-50 text-blue-800 text-xs rounded-lg flex items-start gap-2">
        <Sparkles size={14} className="mt-0.5 shrink-0" />
        <p>
          <strong>Aiva Insight:</strong> You are on track for Dean's List! Focus on <b>Math 101</b> to secure your standing.
        </p>
      </div>
    </div>
  );
};

export default PredictiveInsights;