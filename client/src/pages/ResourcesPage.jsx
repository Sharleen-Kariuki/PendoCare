import { useState } from 'react';
import { useNavigate, useSearchParams, Link } from "react-router-dom";
import { ArrowLeft, BookOpen, Heart, Play, FileText, CheckCircle, Zap, ArrowRight, Sparkles } from "lucide-react";

const ResourcesPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const category = searchParams.get('category') || 'basics';
  const [selectedResource, setSelectedResource] = useState(null);

  const resourceCategories = {
    basics: {
      title: "Mental Health Basics",
      icon: BookOpen,
      gradient: "from-brand-400 to-brand-600",
      resources: [
        {
          id: 1, title: "Understanding Stress", type: "article", duration: "5 min read",
          description: "Learn about what stress is, how it affects your body and mind, and why it's a normal part of life.",
          content: `<h2>What is Stress?</h2><p>Stress is your body's natural response to challenges or demands. It's completely normal and everyone experiences it.</p><h3>Types of Stress:</h3><ul><li><strong>Acute Stress:</strong> Short-term stress from daily hassles (exams, deadlines)</li><li><strong>Chronic Stress:</strong> Long-term stress from ongoing situations</li><li><strong>Eustress:</strong> Positive stress that motivates you (exciting challenges)</li></ul><h3>Physical Signs of Stress:</h3><ul><li>Headaches or muscle tension</li><li>Rapid heartbeat</li><li>Difficulty sleeping</li><li>Fatigue or low energy</li><li>Stomach issues</li></ul><h3>Emotional Signs:</h3><ul><li>Feeling overwhelmed</li><li>Irritability or mood swings</li><li>Difficulty concentrating</li><li>Anxiety or worry</li></ul><h3>Healthy Ways to Manage Stress:</h3><ol><li><strong>Exercise regularly:</strong> Even 20 minutes of walking helps</li><li><strong>Get enough sleep:</strong> Aim for 7-9 hours per night</li><li><strong>Talk to someone:</strong> Friends, family, or a counselor</li><li><strong>Practice time management:</strong> Break big tasks into smaller steps</li><li><strong>Take breaks:</strong> Step away from stressful situations</li></ol><div class="tip-box"><strong>Remember:</strong> Some stress is normal and can even be helpful. It's when stress becomes overwhelming that you need support.</div>`
        },
        {
          id: 2, title: "Recognizing Anxiety", type: "article", duration: "6 min read",
          description: "Understand the difference between normal worry and anxiety disorders, and when to seek help.",
          content: `<h2>What is Anxiety?</h2><p>Anxiety is intense, persistent worry or fear about everyday situations. While everyone feels anxious sometimes, anxiety disorders involve excessive worry that interferes with daily life.</p><h3>Normal Anxiety vs. Anxiety Disorder:</h3><table><tr><th>Normal Anxiety</th><th>Anxiety Disorder</th></tr><tr><td>Worry about real problems</td><td>Excessive worry about many things</td></tr><tr><td>Goes away when situation resolves</td><td>Persists even without clear trigger</td></tr><tr><td>Doesn't interfere with daily life</td><td>Affects school, work, relationships</td></tr></table><h3>Common Symptoms:</h3><ul><li>Excessive worrying</li><li>Restlessness or feeling on edge</li><li>Difficulty concentrating</li><li>Muscle tension</li><li>Sleep problems</li><li>Panic attacks (rapid heartbeat, sweating, trembling)</li></ul><h3>Quick Relief Techniques:</h3><ol><li><strong>4-7-8 Breathing:</strong> Breathe in for 4, hold for 7, out for 8</li><li><strong>5-4-3-2-1 Grounding:</strong> Name 5 things you see, 4 you feel, 3 you hear, 2 you smell, 1 you taste</li><li><strong>Progressive Muscle Relaxation:</strong> Tense and release muscle groups</li></ol><h3>When to Seek Help:</h3><ul><li>Anxiety interferes with school or relationships</li><li>You avoid situations due to anxiety</li><li>Physical symptoms are frequent</li><li>You feel anxious most days</li></ul>`
        },
        {
          id: 3, title: "Depression: What You Need to Know", type: "article", duration: "7 min read",
          description: "Learn about depression symptoms, causes, and the importance of reaching out for support.",
          content: `<h2>Understanding Depression</h2><p>Depression is more than just feeling sad. It's a medical condition that affects how you feel, think, and handle daily activities.</p><h3>Common Signs of Depression:</h3><ul><li>Persistent sad, anxious, or empty mood</li><li>Loss of interest in activities you used to enjoy</li><li>Changes in appetite or weight</li><li>Sleep problems (too much or too little)</li><li>Fatigue or lack of energy</li><li>Feelings of worthlessness or guilt</li><li>Difficulty concentrating or making decisions</li><li>Thoughts of death or suicide</li></ul><h3>What Causes Depression?</h3><p>Depression can result from a combination of:</p><ul><li>Biological factors (brain chemistry, genetics)</li><li>Life events (loss, trauma, stress)</li><li>Medical conditions</li><li>Substance use</li></ul><h3>Small Steps That Help:</h3><ol><li><strong>Stick to a routine:</strong> Regular sleep and meal times</li><li><strong>Move your body:</strong> Even a short walk can help</li><li><strong>Connect with others:</strong> Don't isolate yourself</li><li><strong>Set small goals:</strong> Break tasks into tiny steps</li><li><strong>Be kind to yourself:</strong> Recovery takes time</li></ol><div class="warning-box"><strong>⚠️ If you have thoughts of suicide:</strong><p>Call Kenya Mental Health Hotline: 0800 720 648</p><p>Emergency: 999 or 112</p><p>You are not alone. Help is available.</p></div><h3>Treatment Works:</h3><p>Depression is highly treatable through:</p><ul><li>Counseling/therapy</li><li>Medication (when needed)</li><li>Lifestyle changes</li><li>Support groups</li></ul>`
        }
      ]
    },
    selfcare: {
      title: "Self-Care Library",
      icon: Heart,
      gradient: "from-pink-400 to-rose-400",
      resources: [
        {
          id: 4, title: "5-Minute Breathing Exercises", type: "exercise", duration: "5 min",
          description: "Simple breathing techniques to calm your mind and reduce stress instantly.",
          content: `<h2>Breathing Exercises for Instant Calm</h2><p>Your breath is a powerful tool for managing stress and anxiety. These exercises can be done anywhere, anytime.</p><h3>1. Box Breathing (4-4-4-4)</h3><div class="exercise-box"><ol><li>Breathe IN through your nose for 4 counts</li><li>HOLD your breath for 4 counts</li><li>Breathe OUT through your mouth for 4 counts</li><li>HOLD empty for 4 counts</li><li>Repeat 4-5 times</li></ol><p><strong>Best for:</strong> Anxiety, panic, stress</p></div><h3>2. 4-7-8 Relaxation Breath</h3><div class="exercise-box"><ol><li>Empty your lungs completely</li><li>Breathe IN through nose for 4 counts</li><li>HOLD for 7 counts</li><li>Breathe OUT through mouth for 8 counts (make a "whoosh" sound)</li><li>Repeat 3-4 times</li></ol><p><strong>Best for:</strong> Sleep, calming down, reducing anger</p></div><h3>3. Belly Breathing</h3><div class="exercise-box"><ol><li>Place one hand on your chest, one on your belly</li><li>Breathe IN slowly through nose, letting belly rise (not chest)</li><li>Breathe OUT slowly through mouth</li><li>Continue for 5 minutes</li></ol><p><strong>Best for:</strong> Relaxation, before sleep, general wellness</p></div><h3>Quick Tips:</h3><ul><li>Practice when calm so it's easier during stress</li><li>Close your eyes if comfortable</li><li>Focus only on your breath</li><li>Don't force it - let it flow naturally</li></ul><div class="tip-box"><strong>💡 Try this now:</strong> Do one round of Box Breathing right now. Notice how you feel afterward.</div>`
        },
        {
          id: 5, title: "Progressive Muscle Relaxation", type: "exercise", duration: "10 min",
          description: "Release physical tension by systematically tensing and relaxing muscle groups.",
          content: `<h2>Progressive Muscle Relaxation (PMR)</h2><p>PMR helps you identify and release physical tension you might not even know you're holding.</p><h3>How It Works:</h3><p>You'll tense each muscle group for 5 seconds, then release and relax for 10 seconds. Notice the difference between tension and relaxation.</p><h3>The Routine:</h3><ol><li><strong>Hands & Arms:</strong> Make tight fists → Release</li><li><strong>Arms & Shoulders:</strong> Bring shoulders to ears → Drop</li><li><strong>Face:</strong> Scrunch entire face → Release</li><li><strong>Jaw:</strong> Clench teeth → Let jaw hang loose</li><li><strong>Neck:</strong> Press head back into chair → Release</li><li><strong>Chest:</strong> Take deep breath, hold → Exhale slowly</li><li><strong>Stomach:</strong> Tighten abs → Release</li><li><strong>Legs:</strong> Lift legs, point toes → Lower and relax</li><li><strong>Feet:</strong> Curl toes tightly → Release</li></ol><h3>When to Use PMR:</h3><ul><li>Before bed to improve sleep</li><li>During study breaks</li><li>When feeling physically tense</li><li>After stressful situations</li></ul><div class="tip-box"><strong>Pro Tip:</strong> Record yourself reading the instructions slowly, then follow along with the recording.</div>`
        },
        {
          id: 6, title: "Mindfulness & Meditation Basics", type: "guide", duration: "8 min read",
          description: "Introduction to mindfulness practices for students, with simple exercises to get started.",
          content: `<h2>Mindfulness for Beginners</h2><p>Mindfulness means paying attention to the present moment without judgment. It's proven to reduce stress, improve focus, and boost emotional well-being.</p><h3>Common Myths:</h3><ul><li>❌ "My mind must be empty" → ✅ Thoughts are normal; just notice them</li><li>❌ "I need to sit for hours" → ✅ Even 2 minutes helps</li><li>❌ "I'm doing it wrong" → ✅ There's no wrong way</li></ul><h3>Simple Mindfulness Exercises:</h3><div class="exercise-box"><h4>1-Minute Mindfulness</h4><ol><li>Set timer for 1 minute</li><li>Close eyes or lower gaze</li><li>Focus on your breath</li><li>When mind wanders, gently bring it back</li></ol></div><div class="exercise-box"><h4>Mindful Eating</h4><ol><li>Take one small piece of food</li><li>Look at it closely</li><li>Smell it</li><li>Put it in your mouth but don't chew yet</li><li>Slowly chew, noticing texture and taste</li></ol></div><div class="exercise-box"><h4>Body Scan (5 minutes)</h4><ol><li>Lie down or sit comfortably</li><li>Notice sensations in your feet</li><li>Slowly move attention up through legs, torso, arms, to head</li><li>Just notice, don't judge</li></ol></div><h3>Making It a Habit:</h3><ul><li>Start with just 2 minutes daily</li><li>Pick the same time each day</li><li>Use an app if helpful (Headspace, Calm)</li><li>Be patient with yourself</li></ul>`
        }
      ]
    }
  };

  const currentCategory = resourceCategories[category] || resourceCategories.basics;
  const CategoryIcon = currentCategory.icon;

  return (
    <div className="min-h-screen bg-slate-950 py-10 px-4 relative overflow-hidden">
      {/* Background orbs */}
      <div className="absolute top-[-150px] left-[-100px] w-[400px] h-[400px] bg-brand-500/6 rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute bottom-[-100px] right-[-80px] w-[300px] h-[300px] bg-sky-500/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        <Link to="/dashboard/low" className="flex items-center gap-2 text-slate-500 hover:text-brand-400 transition-colors text-sm font-medium mb-8">
          <ArrowLeft size={16} />
          Back to Dashboard
        </Link>

        {!selectedResource ? (
          <>
            {/* Category Header */}
            <div className="rounded-3xl p-8 md:p-10 mb-12 relative overflow-hidden"
              style={{
                background: `linear-gradient(135deg, rgba(13,148,136,0.15) 0%, rgba(255,255,255,0.04) 100%)`,
                border: '1px solid rgba(94,234,212,0.12)',
              }}>
              <div className="absolute top-0 right-0 w-40 h-40 bg-brand-400/10 rounded-full blur-[60px] pointer-events-none" />
              <div className="flex flex-col md:flex-row items-center gap-6 relative z-10">
                <div className={`w-16 h-16 bg-gradient-to-br ${currentCategory.gradient} rounded-2xl flex items-center justify-center text-white shadow-lg`}>
                  <CategoryIcon size={32} />
                </div>
                <div className="text-center md:text-left">
                  <h1 className="font-display text-3xl md:text-4xl font-bold text-white mb-2 tracking-tight">{currentCategory.title}</h1>
                  <p className="text-slate-400 text-lg">{currentCategory.resources.length} resources to explore</p>
                </div>
              </div>
            </div>

            {/* Resource Cards */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {currentCategory.resources.map((resource, i) => (
                <div
                  key={resource.id}
                  onClick={() => setSelectedResource(resource)}
                  className="glass-card cursor-pointer group"
                >
                  <div className="flex items-start justify-between mb-6">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center bg-gradient-to-br ${currentCategory.gradient} text-white shadow-lg group-hover:scale-110 transition-transform`}>
                      {resource.type === 'article' && <FileText size={22} />}
                      {resource.type === 'exercise' && <Play size={22} />}
                      {resource.type === 'guide' && <BookOpen size={22} />}
                    </div>
                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest px-3 py-1 rounded-full"
                      style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.06)' }}>
                      {resource.duration}
                    </span>
                  </div>
                  <h3 className="text-lg font-display font-bold text-white mb-2 group-hover:text-brand-300 transition-colors">{resource.title}</h3>
                  <p className="text-slate-400 mb-6 text-sm leading-relaxed line-clamp-2">{resource.description}</p>
                  <div className="flex items-center gap-2 text-brand-400 text-sm font-semibold group-hover:gap-3 transition-all">
                    Read Resource <ArrowRight size={14} />
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : (
          /* ─── Selected Resource Detail ─── */
          <div className="max-w-4xl mx-auto">
            <button
              onClick={() => setSelectedResource(null)}
              className="flex items-center gap-2 text-slate-500 hover:text-brand-400 transition-colors text-sm font-medium mb-6"
            >
              <ArrowLeft size={16} />
              Back to {currentCategory.title}
            </button>

            <div className="rounded-3xl overflow-hidden"
              style={{
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.08)',
              }}>
              {/* Header */}
              <div className="p-8 md:p-12" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                <div className="flex items-center gap-2 mb-4 text-brand-400 font-bold text-xs uppercase tracking-widest">
                  {selectedResource.type === 'article' && <FileText size={14} />}
                  {selectedResource.type === 'exercise' && <Play size={14} />}
                  {selectedResource.type === 'guide' && <BookOpen size={14} />}
                  <span>{selectedResource.type} • {selectedResource.duration}</span>
                </div>
                <h1 className="font-display text-3xl md:text-4xl font-bold text-white mb-4 tracking-tight leading-tight">
                  {selectedResource.title}
                </h1>
                <p className="text-lg text-slate-400 leading-relaxed">{selectedResource.description}</p>
              </div>

              {/* Content */}
              <div className="p-8 md:p-12">
                <div
                  className="prose-dark max-w-none"
                  dangerouslySetInnerHTML={{ __html: selectedResource.content }}
                />

                <style>{`
                  .prose-dark h2 { color: #f1f5f9; font-family: 'Outfit', sans-serif; font-size: 1.75rem; font-weight: 700; margin-top: 2.5rem; margin-bottom: 1.25rem; }
                  .prose-dark h3 { color: #e2e8f0; font-family: 'Outfit', sans-serif; font-size: 1.35rem; font-weight: 600; margin-top: 2rem; margin-bottom: 0.75rem; }
                  .prose-dark h4 { color: #cbd5e1; font-family: 'Outfit', sans-serif; font-size: 1.15rem; font-weight: 600; margin-top: 1.25rem; margin-bottom: 0.5rem; }
                  .prose-dark p { margin-bottom: 1.25rem; color: #94a3b8; font-size: 1.05rem; line-height: 1.8; }
                  .prose-dark ul, .prose-dark ol { margin-left: 1.5rem; margin-bottom: 1.25rem; color: #94a3b8; }
                  .prose-dark li { margin-bottom: 0.5rem; font-size: 1.05rem; line-height: 1.7; }
                  .prose-dark strong { color: #e2e8f0; font-weight: 700; }
                  .prose-dark .exercise-box { background: rgba(13,148,136,0.08); border: 1px solid rgba(94,234,212,0.12); padding: 1.5rem; margin: 1.5rem 0; border-radius: 1rem; }
                  .prose-dark .tip-box { background: rgba(251,191,36,0.08); border: 1px solid rgba(251,191,36,0.15); padding: 1.5rem; margin: 1.5rem 0; border-radius: 1rem; color: #fbbf24; }
                  .prose-dark .warning-box { background: rgba(239,68,68,0.08); border: 1px solid rgba(239,68,68,0.15); padding: 1.5rem; margin: 1.5rem 0; border-radius: 1rem; color: #fca5a5; }
                  .prose-dark table { width: 100%; border-collapse: separate; border-spacing: 0; margin: 1.5rem 0; border: 1px solid rgba(255,255,255,0.08); border-radius: 0.75rem; overflow: hidden; }
                  .prose-dark th, .prose-dark td { padding: 0.75rem 1rem; text-align: left; border-bottom: 1px solid rgba(255,255,255,0.06); }
                  .prose-dark th { background: rgba(255,255,255,0.04); font-weight: 700; color: #e2e8f0; }
                  .prose-dark td { color: #94a3b8; }
                `}</style>

                {/* Bottom actions */}
                <div className="mt-10 pt-8 flex flex-col sm:flex-row gap-4" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                  <button
                    onClick={() => setSelectedResource(null)}
                    className="flex-1 py-3 rounded-xl font-semibold text-sm text-slate-400 transition-all hover:text-white"
                    style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)' }}
                  >
                    ← Back to List
                  </button>
                  <button
                    onClick={() => alert('Resource marked as helpful!')}
                    className="btn-glass flex-1 !py-3 !rounded-xl"
                  >
                    <CheckCircle size={18} />
                    Helpful Resource
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Bottom CTA */}
        {!selectedResource && (
          <div className="mt-14 rounded-3xl p-8 md:p-10 relative overflow-hidden"
            style={{
              background: 'linear-gradient(135deg, rgba(13,148,136,0.2) 0%, rgba(56,189,248,0.1) 100%)',
              border: '1px solid rgba(94,234,212,0.15)',
            }}>
            <div className="absolute top-0 right-0 w-40 h-40 bg-brand-400/10 rounded-full blur-[60px] pointer-events-none" />
            <div className="relative z-10">
              <h2 className="font-display text-2xl md:text-3xl font-bold text-white mb-3">Need More Support?</h2>
              <p className="text-slate-400 text-lg mb-8 max-w-2xl">
                These resources are here to help you understand your wellness, but speaking with a professional can provide personalized guidance.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button onClick={() => navigate('/triage')} className="btn-glass">
                  <Sparkles size={18} />
                  Retake Assessment
                </button>
                <button onClick={() => navigate('/dashboard/high')} className="btn-glass-secondary">
                  Talk to a Counselor
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResourcesPage;