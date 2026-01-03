import { useState } from 'react';
import { useNavigate, useSearchParams } from "react-router-dom";
import { ArrowLeft, BookOpen, Heart, Users, Play, FileText, Headphones, CheckCircle } from "lucide-react";

// Standard Button Replacement
const CustomButton = ({ children, onClick, variant = 'primary', className = '', size = 'md' }) => {
  const baseStyles = "inline-flex items-center justify-center rounded-xl font-semibold transition-all active:scale-95 disabled:opacity-50 disabled:pointer-events-none";
  const variants = {
    primary: "bg-brand-600 text-white hover:bg-brand-700 shadow-lg shadow-brand-200",
    secondary: "bg-white text-slate-900 border border-slate-200 hover:border-brand-200 hover:text-brand-600 shadow-sm",
    ghost: "text-slate-600 hover:text-brand-600 hover:bg-brand-50",
    outline: "border-2 border-brand-100 text-brand-600 hover:bg-brand-50"
  };
  const sizes = {
    sm: "px-3 py-1.5 text-xs",
    md: "px-5 py-2.5 text-sm",
    lg: "px-8 py-3 text-base"
  };

  return (
    <button
      onClick={onClick}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
    >
      {children}
    </button>
  );
};

// Card Component Replacements
const CustomCard = ({ children, className = '', onClick }) => (
  <div
    onClick={onClick}
    className={`bg-white rounded-2xl border border-slate-100 shadow-soft overflow-hidden ${className}`}
  >
    {children}
  </div>
);

const ResourcesPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const category = searchParams.get('category') || 'basics';
  const [selectedResource, setSelectedResource] = useState(null);

  const resourceCategories = {
    basics: {
      title: "Mental Health Basics",
      icon: BookOpen,
      color: "bg-brand-50 border-brand-100 text-brand-700",
      resources: [
        {
          id: 1,
          title: "Understanding Stress",
          type: "article",
          duration: "5 min read",
          description: "Learn about what stress is, how it affects your body and mind, and why it's a normal part of life.",
          content: `
            <h2>What is Stress?</h2>
            <p>Stress is your body's natural response to challenges or demands. It's completely normal and everyone experiences it.</p>
            
            <h3>Types of Stress:</h3>
            <ul>
              <li><strong>Acute Stress:</strong> Short-term stress from daily hassles (exams, deadlines)</li>
              <li><strong>Chronic Stress:</strong> Long-term stress from ongoing situations</li>
              <li><strong>Eustress:</strong> Positive stress that motivates you (exciting challenges)</li>
            </ul>
            
            <h3>Physical Signs of Stress:</h3>
            <ul>
              <li>Headaches or muscle tension</li>
              <li>Rapid heartbeat</li>
              <li>Difficulty sleeping</li>
              <li>Fatigue or low energy</li>
              <li>Stomach issues</li>
            </ul>
            
            <h3>Emotional Signs:</h3>
            <ul>
              <li>Feeling overwhelmed</li>
              <li>Irritability or mood swings</li>
              <li>Difficulty concentrating</li>
              <li>Anxiety or worry</li>
            </ul>
            
            <h3>Healthy Ways to Manage Stress:</h3>
            <ol>
              <li><strong>Exercise regularly:</strong> Even 20 minutes of walking helps</li>
              <li><strong>Get enough sleep:</strong> Aim for 7-9 hours per night</li>
              <li><strong>Talk to someone:</strong> Friends, family, or a counselor</li>
              <li><strong>Practice time management:</strong> Break big tasks into smaller steps</li>
              <li><strong>Take breaks:</strong> Step away from stressful situations</li>
            </ol>
            
            <div class="tip-box">
              <strong>Remember:</strong> Some stress is normal and can even be helpful. It's when stress becomes overwhelming that you need support.
            </div>
          `
        },
        {
          id: 2,
          title: "Recognizing Anxiety",
          type: "article",
          duration: "6 min read",
          description: "Understand the difference between normal worry and anxiety disorders, and when to seek help.",
          content: `
            <h2>What is Anxiety?</h2>
            <p>Anxiety is intense, persistent worry or fear about everyday situations. While everyone feels anxious sometimes, anxiety disorders involve excessive worry that interferes with daily life.</p>
            
            <h3>Normal Anxiety vs. Anxiety Disorder:</h3>
            <table>
              <tr>
                <th>Normal Anxiety</th>
                <th>Anxiety Disorder</th>
              </tr>
              <tr>
                <td>Worry about real problems</td>
                <td>Excessive worry about many things</td>
              </tr>
              <tr>
                <td>Goes away when situation resolves</td>
                <td>Persists even without clear trigger</td>
              </tr>
              <tr>
                <td>Doesn't interfere with daily life</td>
                <td>Affects school, work, relationships</td>
              </tr>
            </table>
            
            <h3>Common Symptoms:</h3>
            <ul>
              <li>Excessive worrying</li>
              <li>Restlessness or feeling on edge</li>
              <li>Difficulty concentrating</li>
              <li>Muscle tension</li>
              <li>Sleep problems</li>
              <li>Panic attacks (rapid heartbeat, sweating, trembling)</li>
            </ul>
            
            <h3>Quick Relief Techniques:</h3>
            <ol>
              <li><strong>4-7-8 Breathing:</strong> Breathe in for 4, hold for 7, out for 8</li>
              <li><strong>5-4-3-2-1 Grounding:</strong> Name 5 things you see, 4 you feel, 3 you hear, 2 you smell, 1 you taste</li>
              <li><strong>Progressive Muscle Relaxation:</strong> Tense and release muscle groups</li>
            </ol>
            
            <h3>When to Seek Help:</h3>
            <ul>
              <li>Anxiety interferes with school or relationships</li>
              <li>You avoid situations due to anxiety</li>
              <li>Physical symptoms are frequent</li>
              <li>You feel anxious most days</li>
            </ul>
          `
        },
        {
          id: 3,
          title: "Depression: What You Need to Know",
          type: "article",
          duration: "7 min read",
          description: "Learn about depression symptoms, causes, and the importance of reaching out for support.",
          content: `
            <h2>Understanding Depression</h2>
            <p>Depression is more than just feeling sad. It's a medical condition that affects how you feel, think, and handle daily activities.</p>
            
            <h3>Common Signs of Depression:</h3>
            <ul>
              <li>Persistent sad, anxious, or empty mood</li>
              <li>Loss of interest in activities you used to enjoy</li>
              <li>Changes in appetite or weight</li>
              <li>Sleep problems (too much or too little)</li>
              <li>Fatigue or lack of energy</li>
              <li>Feelings of worthlessness or guilt</li>
              <li>Difficulty concentrating or making decisions</li>
              <li>Thoughts of death or suicide</li>
            </ul>
            
            <h3>What Causes Depression?</h3>
            <p>Depression can result from a combination of:</p>
            <ul>
              <li>Biological factors (brain chemistry, genetics)</li>
              <li>Life events (loss, trauma, stress)</li>
              <li>Medical conditions</li>
              <li>Substance use</li>
            </ul>
            
            <h3>Small Steps That Help:</h3>
            <ol>
              <li><strong>Stick to a routine:</strong> Regular sleep and meal times</li>
              <li><strong>Move your body:</strong> Even a short walk can help</li>
              <li><strong>Connect with others:</strong> Don't isolate yourself</li>
              <li><strong>Set small goals:</strong> Break tasks into tiny steps</li>
              <li><strong>Be kind to yourself:</strong> Recovery takes time</li>
            </ol>
            
            <div class="warning-box">
              <strong>⚠️ If you have thoughts of suicide:</strong>
              <p>Call Kenya Mental Health Hotline: 0800 720 648</p>
              <p>Emergency: 999 or 112</p>
              <p>You are not alone. Help is available.</p>
            </div>
            
            <h3>Treatment Works:</h3>
            <p>Depression is highly treatable through:</p>
            <ul>
              <li>Counseling/therapy</li>
              <li>Medication (when needed)</li>
              <li>Lifestyle changes</li>
              <li>Support groups</li>
            </ul>
          `
        }
      ]
    },
    selfcare: {
      title: "Self-Care Library",
      icon: Heart,
      color: "bg-fuchsia-50 border-fuchsia-100 text-fuchsia-700",
      resources: [
        {
          id: 4,
          title: "5-Minute Breathing Exercises",
          type: "exercise",
          duration: "5 min",
          description: "Simple breathing techniques to calm your mind and reduce stress instantly.",
          content: `
            <h2>Breathing Exercises for Instant Calm</h2>
            <p>Your breath is a powerful tool for managing stress and anxiety. These exercises can be done anywhere, anytime.</p>
            
            <h3>1. Box Breathing (4-4-4-4)</h3>
            <div class="exercise-box">
              <ol>
                <li>Breathe IN through your nose for 4 counts</li>
                <li>HOLD your breath for 4 counts</li>
                <li>Breathe OUT through your mouth for 4 counts</li>
                <li>HOLD empty for 4 counts</li>
                <li>Repeat 4-5 times</li>
              </ol>
              <p><strong>Best for:</strong> Anxiety, panic, stress</p>
            </div>
            
            <h3>2. 4-7-8 Relaxation Breath</h3>
            <div class="exercise-box">
              <ol>
                <li>Empty your lungs completely</li>
                <li>Breathe IN through nose for 4 counts</li>
                <li>HOLD for 7 counts</li>
                <li>Breathe OUT through mouth for 8 counts (make a "whoosh" sound)</li>
                <li>Repeat 3-4 times</li>
              </ol>
              <p><strong>Best for:</strong> Sleep, calming down, reducing anger</p>
            </div>
            
            <h3>3. Belly Breathing</h3>
            <div class="exercise-box">
              <ol>
                <li>Place one hand on your chest, one on your belly</li>
                <li>Breathe IN slowly through nose, letting belly rise (not chest)</li>
                <li>Breathe OUT slowly through mouth</li>
                <li>Continue for 5 minutes</li>
              </ol>
              <p><strong>Best for:</strong> Relaxation, before sleep, general wellness</p>
            </div>
            
            <h3>Quick Tips:</h3>
            <ul>
              <li>Practice when calm so it's easier during stress</li>
              <li>Close your eyes if comfortable</li>
              <li>Focus only on your breath</li>
              <li>Don't force it - let it flow naturally</li>
            </ul>
            
            <div class="tip-box">
              <strong>💡 Try this now:</strong> Do one round of Box Breathing right now. Notice how you feel afterward.
            </div>
          `
        },
        {
          id: 5,
          title: "Progressive Muscle Relaxation",
          type: "exercise",
          duration: "10 min",
          description: "Release physical tension by systematically tensing and relaxing muscle groups.",
          content: `
            <h2>Progressive Muscle Relaxation (PMR)</h2>
            <p>PMR helps you identify and release physical tension you might not even know you're holding.</p>
            
            <h3>How It Works:</h3>
            <p>You'll tense each muscle group for 5 seconds, then release and relax for 10 seconds. Notice the difference between tension and relaxation.</p>
            
            <h3>The Routine:</h3>
            <ol>
              <li><strong>Hands & Arms:</strong> Make tight fists → Release</li>
              <li><strong>Arms & Shoulders:</strong> Bring shoulders to ears → Drop</li>
              <li><strong>Face:</strong> Scrunch entire face → Release</li>
              <li><strong>Jaw:</strong> Clench teeth → Let jaw hang loose</li>
              <li><strong>Neck:</strong> Press head back into chair → Release</li>
              <li><strong>Chest:</strong> Take deep breath, hold → Exhale slowly</li>
              <li><strong>Stomach:</strong> Tighten abs → Release</li>
              <li><strong>Legs:</strong> Lift legs, point toes → Lower and relax</li>
              <li><strong>Feet:</strong> Curl toes tightly → Release</li>
            </ol>
            
            <h3>When to Use PMR:</h3>
            <ul>
              <li>Before bed to improve sleep</li>
              <li>During study breaks</li>
              <li>When feeling physically tense</li>
              <li>After stressful situations</li>
            </ul>
            
            <div class="tip-box">
              <strong>Pro Tip:</strong> Record yourself reading the instructions slowly, then follow along with the recording.
            </div>
          `
        },
        {
          id: 6,
          title: "Mindfulness & Meditation Basics",
          type: "guide",
          duration: "8 min read",
          description: "Introduction to mindfulness practices for students, with simple exercises to get started.",
          content: `
            <h2>Mindfulness for Beginners</h2>
            <p>Mindfulness means paying attention to the present moment without judgment. It's proven to reduce stress, improve focus, and boost emotional well-being.</p>
            
            <h3>Common Myths:</h3>
            <ul>
              <li>❌ "My mind must be empty" → ✅ Thoughts are normal; just notice them</li>
              <li>❌ "I need to sit for hours" → ✅ Even 2 minutes helps</li>
              <li>❌ "I'm doing it wrong" → ✅ There's no wrong way</li>
            </ul>
            
            <h3>Simple Mindfulness Exercises:</h3>
            
            <div class="exercise-box">
              <h4>1-Minute Mindfulness</h4>
              <ol>
                <li>Set timer for 1 minute</li>
                <li>Close eyes or lower gaze</li>
                <li>Focus on your breath</li>
                <li>When mind wanders, gently bring it back</li>
              </ol>
            </div>
            
            <div class="exercise-box">
              <h4>Mindful Eating</h4>
              <ol>
                <li>Take one small piece of food</li>
                <li>Look at it closely</li>
                <li>Smell it</li>
                <li>Put it in your mouth but don't chew yet</li>
                <li>Slowly chew, noticing texture and taste</li>
              </ol>
            </div>
            
            <div class="exercise-box">
              <h4>Body Scan (5 minutes)</h4>
              <ol>
                <li>Lie down or sit comfortably</li>
                <li>Notice sensations in your feet</li>
                <li>Slowly move attention up through legs, torso, arms, to head</li>
                <li>Just notice, don't judge</li>
              </ol>
            </div>
            
            <h3>Making It a Habit:</h3>
            <ul>
              <li>Start with just 2 minutes daily</li>
              <li>Pick the same time each day</li>
              <li>Use an app if helpful (Headspace, Calm)</li>
              <li>Be patient with yourself</li>
            </ul>
          `
        }
      ]
    }
  };

  const currentCategory = resourceCategories[category] || resourceCategories.basics;
  const CategoryIcon = currentCategory.icon;

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <CustomButton
          variant="ghost"
          onClick={() => navigate('/dashboard/low')}
          className="mb-8"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Dashboard
        </CustomButton>

        {!selectedResource ? (
          <>
            <div className={`${currentCategory.color} p-8 rounded-3xl mb-12 border shadow-sm animate-fade-in`}>
              <div className="flex flex-col md:flex-row items-center gap-6">
                <div className="w-20 h-20 bg-white rounded-2xl flex items-center justify-center shadow-soft">
                  <CategoryIcon className="w-10 h-10" />
                </div>
                <div className="text-center md:text-left">
                  <h1 className="text-4xl font-bold mb-2 tracking-tight">{currentCategory.title}</h1>
                  <p className="text-lg opacity-80">{currentCategory.resources.length} resources to explore</p>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 animate-slide-up">
              {currentCategory.resources.map((resource) => (
                <CustomCard
                  key={resource.id}
                  className="hover:border-brand-200 transition-all cursor-pointer group"
                  onClick={() => setSelectedResource(resource)}
                >
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-6">
                      <div className="p-3 bg-brand-50 rounded-xl text-brand-600 group-hover:scale-110 transition-transform">
                        {resource.type === 'article' && <FileText className="w-6 h-6" />}
                        {resource.type === 'exercise' && <Play className="w-6 h-6" />}
                        {resource.type === 'guide' && <BookOpen className="w-6 h-6" />}
                      </div>
                      <span className="text-xs font-bold text-slate-400 bg-slate-100 px-3 py-1 rounded-full uppercase tracking-wider">{resource.duration}</span>
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-brand-600 transition-colors">{resource.title}</h3>
                    <p className="text-slate-600 mb-8 line-clamp-2">{resource.description}</p>
                    <CustomButton variant="secondary" className="w-full">
                      Read Resource
                    </CustomButton>
                  </div>
                </CustomCard>
              ))}
            </div>
          </>
        ) : (
          <div className="max-w-4xl mx-auto animate-fade-in">
            <CustomButton
              variant="ghost"
              onClick={() => setSelectedResource(null)}
              className="mb-6"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to {currentCategory.title}
            </CustomButton>

            <CustomCard className="shadow-xl">
              <div className="bg-slate-50 border-b border-slate-100 p-8 md:p-12">
                <div className="flex items-center gap-2 mb-4 text-brand-600 font-bold text-sm uppercase tracking-widest">
                  {selectedResource.type === 'article' && <FileText className="w-4 h-4" />}
                  {selectedResource.type === 'exercise' && <Play className="w-4 h-4" />}
                  {selectedResource.type === 'guide' && <BookOpen className="w-4 h-4" />}
                  <span>{selectedResource.type} • {selectedResource.duration}</span>
                </div>
                <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4 tracking-tight leading-tight">{selectedResource.title}</h1>
                <p className="text-xl text-slate-500 leading-relaxed font-medium">{selectedResource.description}</p>
              </div>
              <div className="p-8 md:p-12">
                <div
                  className="prose prose-slate max-w-none"
                  dangerouslySetInnerHTML={{ __html: selectedResource.content }}
                  style={{
                    lineHeight: '1.8'
                  }}
                />

                <style>{`
                  .prose h2 {
                    color: #0f172a;
                    font-size: 2rem;
                    font-weight: 800;
                    margin-top: 3rem;
                    margin-bottom: 1.5rem;
                    letter-spacing: -0.025em;
                  }
                  .prose h3 {
                    color: #1e293b;
                    font-size: 1.5rem;
                    font-weight: 700;
                    margin-top: 2rem;
                    margin-bottom: 1rem;
                  }
                  .prose h4 {
                    color: #475569;
                    font-size: 1.25rem;
                    font-weight: 600;
                    margin-top: 1.5rem;
                    margin-bottom: 0.75rem;
                  }
                  .prose p {
                    margin-bottom: 1.5rem;
                    color: #475569;
                    font-size: 1.125rem;
                  }
                  .prose ul, .prose ol {
                    margin-left: 1.5rem;
                    margin-bottom: 1.5rem;
                    color: #475569;
                  }
                  .prose li {
                    margin-bottom: 0.75rem;
                    font-size: 1.125rem;
                  }
                  .prose strong {
                    color: #0f172a;
                    font-weight: 700;
                  }
                  .exercise-box {
                    background: #f8fafc;
                    border: 2px solid #e2e8f0;
                    padding: 2rem;
                    margin: 2rem 0;
                    border-radius: 1.5rem;
                  }
                  .tip-box {
                    background: #fffbeb;
                    border: 2px solid #fef3c7;
                    padding: 2rem;
                    margin: 2rem 0;
                    border-radius: 1.5rem;
                    color: #92400e;
                  }
                  .warning-box {
                    background: #fef2f2;
                    border: 2px solid #fee2e2;
                    padding: 2rem;
                    margin: 2rem 0;
                    border-radius: 1.5rem;
                  }
                  .prose table {
                    width: 100%;
                    border-collapse: separate;
                    border-spacing: 0;
                    margin: 2rem 0;
                    border: 1px solid #e2e8f0;
                    border-radius: 1rem;
                    overflow: hidden;
                  }
                  .prose th, .prose td {
                    padding: 1rem;
                    text-align: left;
                    border-bottom: 1px solid #e2e8f0;
                  }
                  .prose th {
                    background: #f8fafc;
                    font-weight: 700;
                    color: #0f172a;
                  }
                `}</style>

                <div className="mt-12 pt-8 border-t border-slate-100 flex flex-col sm:flex-row gap-4">
                  <CustomButton
                    variant="secondary"
                    className="flex-1"
                    onClick={() => setSelectedResource(null)}
                  >
                    ← Back to List
                  </CustomButton>
                  <CustomButton
                    className="flex-1"
                    onClick={() => {
                      alert('Resource marked as helpful!');
                    }}
                  >
                    <CheckCircle className="w-5 h-5 mr-2" />
                    Helpful Resource
                  </CustomButton>
                </div>
              </div>
            </CustomCard>
          </div>
        )}

        {!selectedResource && (
          <div className="mt-16">
            <div className="bg-brand-600 rounded-3xl p-8 md:p-12 text-white shadow-xl shadow-brand-100 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32 blur-3xl"></div>
              <div className="relative z-10">
                <h2 className="text-3xl font-bold mb-4">Need More Support?</h2>
                <p className="text-brand-100 text-lg mb-8 max-w-2xl">
                  These resources are here to help you understand your wellness, but speaking with a professional can provide personalized guidance.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <CustomButton
                    variant="secondary"
                    size="lg"
                    onClick={() => navigate('/triage')}
                    className="bg-white text-brand-600 border-none hover:bg-brand-50"
                  >
                    Retake Assessment
                  </CustomButton>
                  <CustomButton
                    variant="outline"
                    size="lg"
                    onClick={() => navigate('/dashboard/high')}
                    className="border-white text-white hover:bg-white/10"
                  >
                    Talk to a Counselor
                  </CustomButton>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResourcesPage;