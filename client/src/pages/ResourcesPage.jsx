import { useState } from 'react';
import { useNavigate, useSearchParams, Link } from "react-router-dom";
import { ArrowLeft, BookOpen, Heart, Play, FileText, CheckCircle, Zap, ArrowRight, Sparkles, Star, Smile, Search } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const ResourcesPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const category = searchParams.get('category') || 'basics';
  const [selectedResource, setSelectedResource] = useState(null);

  // mascot assets
  const mascotRobot = "/mascot_robot.png";
  const mascotSun = "/mascot_sun.png";

  const resourceCategories = {
    basics: {
      title: "Mental Health Basics",
      icon: BookOpen,
      mascot: mascotRobot,
      mascotMessage: "Hey! Let's learn how we work! 🤖",
      gradient: "from-cyan-400 to-brand-600",
      resources: [
        {
          id: 1, title: "Understanding Stress", type: "article", duration: "5 min read", level: "Lvl 1",
          description: "Learn about what stress is, how it affects your body and mind, and why it's a normal part of life.",
          content: `<h2>What is Stress?</h2><p>Stress is your body's natural response to challenges or demands. It's completely normal and everyone experiences it.</p><h3>Types of Stress:</h3><ul><li><strong>Acute Stress:</strong> Short-term stress from daily hassles (exams, deadlines)</li><li><strong>Chronic Stress:</strong> Long-term stress from ongoing situations</li><li><strong>Eustress:</strong> Positive stress that motivates you (exciting challenges)</li></ul><h3>Physical Signs of Stress:</h3><ul><li>Headaches or muscle tension</li><li>Rapid heartbeat</li><li>Difficulty sleeping</li><li>Fatigue or low energy</li><li>Stomach issues</li></ul><h3>Emotional Signs:</h3><ul><li>Feeling overwhelmed</li><li>Irritability or mood swings</li><li>Difficulty concentrating</li><li>Anxiety or worry</li></ul><h3>Healthy Ways to Manage Stress:</h3><ol><li><strong>Exercise regularly:</strong> Even 20 minutes of walking helps</li><li><strong>Get enough sleep:</strong> Aim for 7-9 hours per night</li><li><strong>Talk to someone:</strong> Friends, family, or a counselor</li><li><strong>Practice time management:</strong> Break big tasks into smaller steps</li><li><strong>Take breaks:</strong> Step away from stressful situations</li></ol><div class="tip-box"><strong>Remember:</strong> Some stress is normal and can even be helpful. It's when stress becomes overwhelming that you need support.</div>`
        },
        {
          id: 2, title: "Recognizing Anxiety", type: "article", duration: "6 min read", level: "Lvl 2",
          description: "Understand the difference between normal worry and anxiety disorders, and when to seek help.",
          content: `<h2>What is Anxiety?</h2><p>Anxiety is intense, persistent worry or fear about everyday situations. While everyone feels anxious sometimes, anxiety disorders involve excessive worry that interferes with daily life.</p><h3>Normal Anxiety vs. Anxiety Disorder:</h3><table><tr><th>Normal Anxiety</th><th>Anxiety Disorder</th></tr><tr><td>Worry about real problems</td><td>Excessive worry about many things</td></tr><tr><td>Goes away when situation resolves</td><td>Persists even without clear trigger</td></tr><tr><td>Doesn't interfere with daily life</td><td>Affects school, work, relationships</td></tr></table><h3>Common Symptoms:</h3><ul><li>Excessive worrying</li><li>Restlessness or feeling on edge</li><li>Difficulty concentrating</li><li>Muscle tension</li><li>Sleep problems</li><li>Panic attacks (rapid heartbeat, sweating, trembling)</li></ul><h3>Quick Relief Techniques:</h3><ol><li><strong>4-7-8 Breathing:</strong> Breathe in for 4, hold for 7, out for 8</li><li><strong>5-4-3-2-1 Grounding:</strong> Name 5 things you see, 4 you feel, 3 you hear, 2 you smell, 1 you taste</li><li><strong>Progressive Muscle Relaxation:</strong> Tense and release muscle groups</li></ol><h3>When to Seek Help:</h3><ul><li>Anxiety interferes with school or relationships</li><li>You avoid situations due to anxiety</li><li>Physical symptoms are frequent</li><li>You feel anxious most days</li></ul>`
        },
        {
          id: 3, title: "Depression: What You Need to Know", type: "article", duration: "7 min read", level: "Lvl 3",
          description: "Learn about depression symptoms, causes, and the importance of reaching out for support.",
          content: `<h2>Understanding Depression</h2><p>Depression is more than just feeling sad. It's a medical condition that affects how you feel, think, and handle daily activities.</p><h3>Common Signs of Depression:</h3><ul><li>Persistent sad, anxious, or empty mood</li><li>Loss of interest in activities you used to enjoy</li><li>Changes in appetite or weight</li><li>Sleep problems (too much or too little)</li><li>Fatigue or lack of energy</li><li>Feelings of worthlessness or guilt</li><li>Difficulty concentrating or making decisions</li><li>Thoughts of death or suicide</li></ul><h3>What Causes Depression?</h3><p>Depression can result from a combination of:</p><ul><li>Biological factors (brain chemistry, genetics)</li><li>Life events (loss, trauma, stress)</li><li>Medical conditions</li><li>Substance use</li></ul><h3>Small Steps That Help:</h3><ol><li><strong>Stick to a routine:</strong> Regular sleep and meal times</li><li><strong>Move your body:</strong> Even a short walk can help</li><li><strong>Connect with others:</strong> Don't isolate yourself</li><li><strong>Set small goals:</strong> Break tasks into tiny steps</li><li><strong>Be kind to yourself:</strong> Recovery takes time</li></ol><div class="warning-box"><strong>⚠️ If you have thoughts of suicide:</strong><p>Call Kenya Mental Health Hotline: 0800 720 648</p><p>Emergency: 999 or 112</p><p>You are not alone. Help is available.</p></div><h3>Treatment Works:</h3><p>Depression is highly treatable through:</p><ul><li>Counseling/therapy</li><li>Medication (when needed)</li><li>Lifestyle changes</li><li>Support groups</li></ul>`
        }
      ]
    },
    selfcare: {
      title: "Self-Care Library",
      icon: Heart,
      mascot: mascotSun,
      mascotMessage: "You shine so bright! Let's keep it that way! ☀️",
      gradient: "from-pink-400 to-rose-400",
      resources: [
        {
          id: 4, title: "5-Minute Breathing Exercises", type: "exercise", duration: "5 min", level: "Daily",
          description: "Simple breathing techniques to calm your mind and reduce stress instantly.",
          content: `<h2>Breathing Exercises for Instant Calm</h2><p>Your breath is a powerful tool for managing stress and anxiety. These exercises can be done anywhere, anytime.</p><h3>1. Box Breathing (4-4-4-4)</h3><div class="exercise-box"><ol><li>Breathe IN through your nose for 4 counts</li><li>HOLD your breath for 4 counts</li><li>Breathe OUT through your mouth for 4 counts</li><li>HOLD empty for 4 counts</li><li>Repeat 4-5 times</li></ol><p><strong>Best for:</strong> Anxiety, panic, stress</p></div><h3>2. 4-7-8 Relaxation Breath</h3><div class="exercise-box"><ol><li>Empty your lungs completely</li><li>Breathe IN through nose for 4 counts</li><li>HOLD for 7 counts</li><li>Breathe OUT through mouth for 8 counts (make a "whoosh" sound)</li><li>Repeat 3-4 times</li></ol><p><strong>Best for:</strong> Sleep, calming down, reducing anger</p></div><h3>3. Belly Breathing</h3><div class="exercise-box"><ol><li>Place one hand on your chest, one on your belly</li><li>Breathe IN slowly through nose, letting belly rise (not chest)</li><li>Breathe OUT slowly through mouth</li><li>Continue for 5 minutes</li></ol><p><strong>Best for:</strong> Relaxation, before sleep, general wellness</p></div><h3>Quick Tips:</h3><ul><li>Practice when calm so it's easier during stress</li><li>Close your eyes if comfortable</li><li>Focus only on your breath</li><li>Don't force it - let it flow naturally</li></ul><div class="tip-box"><strong>💡 Try this now:</strong> Do one round of Box Breathing right now. Notice how you feel afterward.</div>`
        },
        {
          id: 5, title: "Progressive Muscle Relaxation", type: "exercise", duration: "10 min", level: "Advanced",
          description: "Release physical tension by systematically tensing and relaxing muscle groups.",
          content: `<h2>Progressive Muscle Relaxation (PMR)</h2><p>PMR helps you identify and release physical tension you might not even know you're holding.</p><h3>How It Works:</h3><p>You'll tense each muscle group for 5 seconds, then release and relax for 10 seconds. Notice the difference between tension and relaxation.</p><h3>The Routine:</h3><ol><li><strong>Hands & Arms:</strong> Make tight fists → Release</li><li><strong>Arms & Shoulders:</strong> Bring shoulders to ears → Drop</li><li><strong>Face:</strong> Scrunch entire face → Release</li><li><strong>Jaw:</strong> Clench teeth → Let jaw hang loose</li><li><strong>Neck:</strong> Press head back into chair → Release</li><li><strong>Chest:</strong> Take deep breath, hold → Exhale slowly</li><li><strong>Stomach:</strong> Tighten abs → Release</li><li><strong>Legs:</strong> Lift legs, point toes → Lower and relax</li><li><strong>Feet:</strong> Curl toes tightly → Release</li></ol><h3>When to Use PMR:</h3><ul><li>Before bed to improve sleep</li><li>During study breaks</li><li>When feeling physically tense</li><li>After stressful situations</li></ul><div class="tip-box"><strong>Pro Tip:</strong> Record yourself reading the instructions slowly, then follow along with the recording.</div>`
        },
        {
          id: 6, title: "Mindfulness & Meditation Basics", type: "guide", duration: "8 min read", level: "Intro",
          description: "Introduction to mindfulness practices for students, with simple exercises to get started.",
          content: `<h2>Mindfulness for Beginners</h2><p>Mindfulness means paying attention to the present moment without judgment. It's proven to reduce stress, improve focus, and boost emotional well-being.</p><h3>Common Myths:</h3><ul><li>❌ "My mind must be empty" → ✅ Thoughts are normal; just notice them</li><li>❌ "I need to sit for hours" → ✅ Even 2 minutes helps</li><li>❌ "I'm doing it wrong" → ✅ There's no wrong way</li></ul><h3>Simple Mindfulness Exercises:</h3><div class="exercise-box"><h4>1-Minute Mindfulness</h4><ol><li>Set timer for 1 minute</li><li>Close eyes or lower gaze</li><li>Focus on your breath</li><li>When mind wanders, gently bring it back</li></ol></div><div class="exercise-box"><h4>Mindful Eating</h4><ol><li>Take one small piece of food</li><li>Look at it closely</li><li>Smell it</li><li>Put it in your mouth but don't chew yet</li><li>Slowly chew, noticing texture and taste</li></ol></div><div class="exercise-box"><h4>Body Scan (5 minutes)</h4><ol><li>Lie down or sit comfortably</li><li>Notice sensations in your feet</li><li>Slowly move attention up through legs, torso, arms, to head</li><li>Just notice, don't judge</li></ol></div><h3>Making It a Habit:</h3><ul><li>Start with just 2 minutes daily</li><li>Pick the same time each day</li><li>Use an app if helpful (Headspace, Calm)</li><li>Be patient with yourself</li></ul>`
        }
      ]
    }
  };

  const currentCategory = resourceCategories[category] || resourceCategories.basics;
  const CategoryIcon = currentCategory.icon;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  return (
    <div className="min-h-screen bg-slate-950 py-10 px-4 relative overflow-hidden flex flex-col">
      {/* Background orbs */}
      <div className="absolute top-[-150px] left-[-100px] w-[400px] h-[400px] bg-brand-500/5 rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute bottom-[-100px] right-[-80px] w-[300px] h-[300px] bg-sky-500/4 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-6xl mx-auto w-full relative z-10">
        <Link to="/dashboard/low" className="flex items-center gap-2 text-slate-500 hover:text-brand-400 transition-colors text-sm font-bold group mb-8">
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
          Back to Hub
        </Link>

        {!selectedResource ? (
          <>
            {/* ── Category Header with Mascot ── */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="rounded-[3rem] p-8 md:p-12 mb-12 relative overflow-hidden"
              style={{
                background: `linear-gradient(135deg, rgba(13,148,136,0.12) 0%, rgba(255,255,255,0.04) 100%)`,
                border: '1px solid rgba(94,234,212,0.15)',
              }}>
              <div className="absolute top-0 right-0 w-48 h-48 bg-brand-400/10 rounded-full blur-[80px] pointer-events-none" />

              <div className="flex flex-col md:flex-row items-center gap-10 relative z-10">
                <div className="relative group">
                  <div className={`w-28 h-28 bg-gradient-to-br ${currentCategory.gradient} rounded-[2.5rem] flex items-center justify-center text-white shadow-2xl group-hover:rotate-6 transition-transform duration-500`}>
                    <CategoryIcon size={50} />
                  </div>
                  <motion.div
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 4, repeat: Infinity }}
                    className="absolute -top-12 -left-12 hidden md:block"
                  >
                    <img src={currentCategory.mascot} alt="Mascot" className="w-24 h-24 object-contain drop-shadow-xl" />
                  </motion.div>
                  <div className="absolute -bottom-4 -right-4 bg-brand-500 text-white rounded-xl px-3 py-1 font-black text-[10px] uppercase shadow-lg">Guide</div>
                </div>

                <div className="text-center md:text-left flex-1">
                  <div className="inline-block px-4 py-1.5 rounded-xl bg-white/5 border border-white/10 text-brand-300 font-bold mb-4">
                    {currentCategory.mascotMessage}
                  </div>
                  <h1 className="font-display text-4xl md:text-6xl font-black text-white mb-2 tracking-tighter">
                    {currentCategory.title}
                  </h1>
                  <div className="flex flex-wrap items-center justify-center md:justify-start gap-4">
                    <p className="text-slate-400 text-lg font-medium">Explore {currentCategory.resources.length} active quests</p>
                    <div className="w-1.5 h-1.5 rounded-full bg-slate-700" />
                    <p className="text-brand-400/60 font-black uppercase text-xs tracking-widest">Mental Fitness Level: Pro</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* ── Search Bar UI (Visual only) ── */}
            <div className="mb-10 max-w-md mx-auto relative group">
              <div className="absolute inset-y-0 left-5 flex items-center text-slate-500 group-focus-within:text-brand-400 transition-colors">
                <Search size={18} />
              </div>
              <input
                type="text"
                placeholder="Search for a wellness topic..."
                className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-14 pr-6 text-white placeholder:text-slate-600 outline-none focus:border-brand-500/30 focus:ring-4 focus:ring-brand-500/5 transition-all"
              />
            </div>

            {/* ── Resource Cards ── */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {currentCategory.resources.map((resource, i) => (
                <motion.div
                  key={resource.id}
                  variants={itemVariants}
                  whileHover={{ y: -8, scale: 1.02 }}
                  onClick={() => setSelectedResource(resource)}
                  className="glass-card !p-8 group cursor-pointer h-full flex flex-col"
                >
                  <div className="flex items-start justify-between mb-8">
                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center bg-gradient-to-br ${currentCategory.gradient} text-white shadow-xl group-hover:scale-110 transition-transform`}>
                      {resource.type === 'article' && <FileText size={26} />}
                      {resource.type === 'exercise' && <Play size={26} />}
                      {resource.type === 'guide' && <BookOpen size={26} />}
                    </div>
                    <div className="flex flex-col items-end gap-1">
                      <span className="text-[10px] font-black text-white px-3 py-1 rounded-lg bg-brand-500/20 border border-brand-500/30 uppercase tracking-widest">
                        {resource.level}
                      </span>
                      <span className="text-[10px] font-bold text-slate-600 uppercase tracking-widest">
                        {resource.duration}
                      </span>
                    </div>
                  </div>

                  <h3 className="text-xl font-display font-black text-white mb-3 group-hover:text-brand-300 transition-colors">
                    {resource.title}
                  </h3>
                  <p className="text-slate-400 mb-8 text-base leading-relaxed line-clamp-3 font-medium">
                    {resource.description}
                  </p>

                  <div className="mt-auto flex items-center justify-between pt-6 border-t border-white/5">
                    <div className="flex items-center gap-2 text-brand-400 text-sm font-black uppercase tracking-widest">
                      Start Lesson <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                    </div>
                    <div className="flex gap-1">
                      <Star size={12} className="text-amber-500 fill-amber-500" />
                      <Star size={12} className="text-amber-500 fill-amber-500" />
                      <Star size={12} className="text-slate-800" />
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </>
        ) : (
          /* ─── Selected Resource Detail with Character Guides ─── */
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="max-w-4xl mx-auto pb-20"
          >
            <button
              onClick={() => setSelectedResource(null)}
              className="flex items-center gap-2 text-slate-500 hover:text-brand-400 transition-colors text-sm font-bold mb-10 group"
            >
              <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
              Return to Quests
            </button>

            <div className="rounded-[3rem] overflow-hidden"
              style={{
                background: 'rgba(255, 255, 255, 0.04)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                backdropFilter: 'blur(20px)',
              }}>
              {/* Header Section */}
              <div className="p-8 md:p-14 relative overflow-hidden" style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.06)' }}>
                <div className="absolute -top-20 -right-20 w-64 h-64 bg-brand-400/5 rounded-full blur-[80px]" />

                <div className="flex flex-col md:flex-row items-center gap-8 mb-10 text-center md:text-left">
                  <div className={`w-20 h-20 rounded-3xl flex items-center justify-center bg-gradient-to-br ${currentCategory.gradient} text-white shadow-2xl shrink-0`}>
                    {selectedResource.type === 'article' && <FileText size={36} />}
                    {selectedResource.type === 'exercise' && <Play size={36} />}
                    {selectedResource.type === 'guide' && <BookOpen size={36} />}
                  </div>
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 mb-4">
                      <span className="text-[10px] font-black bg-brand-500 text-white px-3 py-1 rounded-lg uppercase tracking-widest">{selectedResource.type}</span>
                      <span className="text-[10px] font-black border border-white/10 text-slate-500 px-3 py-1 rounded-lg uppercase tracking-widest">★ {selectedResource.level} Quest</span>
                      <span className="text-[10px] font-black border border-white/10 text-slate-500 px-3 py-1 rounded-lg uppercase tracking-widest">{selectedResource.duration}</span>
                    </div>
                    <h1 className="font-display text-4xl md:text-5xl font-black text-white mb-4 tracking-tighter leading-tight">
                      {selectedResource.title}
                    </h1>
                    <p className="text-xl text-slate-400 leading-relaxed font-medium">{selectedResource.description}</p>
                  </div>

                  {/* Small Mascot in side */}
                  <motion.div
                    animate={{ y: [0, -5, 0] }}
                    transition={{ duration: 3, repeat: Infinity }}
                    className="shrink-0 hidden lg:block"
                  >
                    <img src={currentCategory.mascot} alt="Mascot Helper" className="w-24 h-24 object-contain" />
                  </motion.div>
                </div>

                {/* Reading Progress Bar UI (Visual) */}
                <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: "45%" }}
                    className="h-full bg-brand-500"
                  />
                </div>
              </div>

              {/* Content Section with Interactive CSS */}
              <div className="p-8 md:p-14">
                <div
                  className="prose-playful max-w-none"
                  dangerouslySetInnerHTML={{ __html: selectedResource.content }}
                />

                <style>{`
                                    .prose-playful h2 { color: #fff; font-family: 'Outfit', sans-serif; font-size: 2.25rem; font-weight: 900; margin-top: 3.5rem; margin-bottom: 1.5rem; letter-spacing: -0.02em; }
                                    .prose-playful h3 { color: #2dd4bf; font-family: 'Outfit', sans-serif; font-size: 1.75rem; font-weight: 800; margin-top: 2.5rem; margin-bottom: 1rem; letter-spacing: -0.01em; }
                                    .prose-playful h4 { color: #f1f5f9; font-family: 'Outfit', sans-serif; font-size: 1.4rem; font-weight: 700; margin-top: 1.5rem; margin-bottom: 0.75rem; }
                                    .prose-playful p { margin-bottom: 1.5rem; color: #94a3b8; font-size: 1.15rem; line-height: 1.8; font-weight: 500; }
                                    .prose-playful ul, .prose-playful ol { margin-left: 1.5rem; margin-bottom: 1.5rem; color: #94a3b8; list-style-type: none; }
                                    .prose-playful li { margin-bottom: 0.75rem; font-size: 1.15rem; line-height: 1.7; position: relative; }
                                    .prose-playful li::before { content: "✦"; position: absolute; left: -1.5rem; color: #14b8a6; font-weight: 900; }
                                    .prose-playful strong { color: #fff; font-weight: 800; }
                                    
                                    .prose-playful .exercise-box { 
                                        background: rgba(13,148,136,0.1); 
                                        border: 2px dashed rgba(94,234,212,0.2); 
                                        padding: 2.5rem; 
                                        margin: 2.5rem 0; 
                                        border-radius: 2rem;
                                        position: relative;
                                    }
                                    .prose-playful .exercise-box::before { content: "QUEST ACTION"; position: absolute; top: -12px; left: 20px; background: #14b8a6; color: white; padding: 2px 12px; border-radius: 8px; font-size: 10px; font-weight: 900; letter-spacing: 0.1em; }
                                    
                                    .prose-playful .tip-box { 
                                        background: rgba(251,191,36,0.1); 
                                        border: 2px solid rgba(251,191,36,0.15); 
                                        padding: 2rem; 
                                        margin: 2.5rem 0; 
                                        border-radius: 2rem; 
                                        color: #fbbf24;
                                        font-weight: 800;
                                        transform: rotate(-0.5deg);
                                    }
                                    .prose-playful .warning-box { 
                                        background: rgba(239,68,68,0.1); 
                                        border: 2px solid rgba(239,68,68,0.15); 
                                        padding: 2rem; 
                                        margin: 2.5rem 0; 
                                        border-radius: 2rem; 
                                        color: #fca5a5;
                                        font-weight: 700;
                                    }
                                    .prose-playful table { width: 100%; border-collapse: separate; border-spacing: 0; margin: 2.5rem 0; border: 1px solid rgba(255,255,255,0.08); border-radius: 1.5rem; overflow: hidden; background: rgba(255,255,255,0.02); }
                                    .prose-playful th, .prose-playful td { padding: 1.25rem 1.5rem; text-align: left; border-bottom: 1px solid rgba(255,255,255,0.06); }
                                    .prose-playful th { background: rgba(255,255,255,0.04); font-weight: 900; color: #fff; text-transform: uppercase; font-size: 0.75rem; letter-spacing: 0.1em; }
                                    .prose-playful td { color: #cbd5e1; font-weight: 600; }
                                `}</style>

                {/* Bottom Interactive Feedback */}
                <div className="mt-16 pt-10 flex flex-col sm:flex-row items-center gap-6" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                  <h4 className="font-display font-black text-white text-xl flex-1 text-center md:text-left">Did this quest help you?</h4>
                  <div className="flex gap-4">
                    <button className="flex items-center justify-center gap-2 px-8 py-4 rounded-2xl bg-white/5 border border-white/10 text-slate-400 font-bold hover:bg-white/10 hover:text-white transition-all">
                      Not really
                    </button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="btn-glass px-10 !rounded-2xl"
                    >
                      <Smile size={20} />
                      It was Great!
                    </motion.button>
                  </div>
                </div>
              </div>
            </div>

            {/* Next Resource Quick Suggestion */}
            <div className="mt-10 grid md:grid-cols-2 gap-6">
              <div className="rounded-3xl p-6 bg-white/5 border border-white/10 flex items-center justify-between group cursor-pointer" onClick={() => setSelectedResource(null)}>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-slate-800 flex items-center justify-center text-slate-400 group-hover:bg-brand-500 group-hover:text-white transition-all">
                    <ArrowLeft size={18} />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-slate-600 uppercase tracking-widest">Back to Hub</p>
                    <h4 className="font-display font-bold text-white group-hover:text-brand-300">Choose New Quest</h4>
                  </div>
                </div>
              </div>
              <div className="rounded-3xl p-6 bg-brand-500/10 border border-brand-500/20 flex items-center justify-between group cursor-pointer">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-brand-500 flex items-center justify-center text-white shadow-lg">
                    <Play size={18} />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-brand-400 uppercase tracking-widest">Next Recommended</p>
                    <h4 className="font-display font-bold text-white group-hover:text-brand-300">Breathing Exercise</h4>
                  </div>
                </div>
                <ArrowRight size={18} className="text-brand-500 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default ResourcesPage;