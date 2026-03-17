import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import {
    Heart, ShieldCheck, UserPlus, LogIn, Activity,
    MessageCircle, Users, BookOpen, ArrowRight,
    Sparkles, Star, ChevronDown, Globe, Lock, Zap
} from 'lucide-react';

/* ─── Intersection Observer Hook ─── */
const useInView = (options = {}) => {
    const ref = useRef(null);
    const [isInView, setIsInView] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                setIsInView(true);
                observer.unobserve(entry.target);
            }
        }, { threshold: 0.15, ...options });

        if (ref.current) observer.observe(ref.current);
        return () => observer.disconnect();
    }, []);

    return [ref, isInView];
};

/* ─── Animated Counter ─── */
const AnimatedCounter = ({ end, suffix = '', duration = 2000 }) => {
    const [count, setCount] = useState(0);
    const [ref, isInView] = useInView();

    useEffect(() => {
        if (!isInView) return;
        let startTime;
        const animate = (timestamp) => {
            if (!startTime) startTime = timestamp;
            const progress = Math.min((timestamp - startTime) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.floor(eased * end));
            if (progress < 1) requestAnimationFrame(animate);
        };
        requestAnimationFrame(animate);
    }, [isInView, end, duration]);

    return <span ref={ref}>{count.toLocaleString()}{suffix}</span>;
};

/* ─── Floating Particle ─── */
const FloatingParticle = ({ size, left, top, delay, color }) => (
    <div
        className="absolute rounded-full animate-float pointer-events-none"
        style={{
            width: size,
            height: size,
            left,
            top,
            animationDelay: delay,
            background: color || 'rgba(13, 148, 136, 0.15)',
            filter: 'blur(1px)',
        }}
    />
);

const LandingPage = () => {
    const [scrollY, setScrollY] = useState(0);
    const [navScrolled, setNavScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrollY(window.scrollY);
            setNavScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const [featuresRef, featuresInView] = useInView();
    const [aboutRef, aboutInView] = useInView();
    const [statsRef, statsInView] = useInView();
    const [ctaRef, ctaInView] = useInView();

    return (
        <div className="flex flex-col min-h-screen bg-slate-950 text-white overflow-hidden">

            {/* ════════════════════════════════════════════
                NAVIGATION
            ════════════════════════════════════════════ */}
            <nav
                className={`fixed top-0 w-full z-50 transition-all duration-500 ${navScrolled
                    ? 'py-3'
                    : 'py-5'
                    }`}
                style={{
                    background: navScrolled
                        ? 'rgba(2, 6, 23, 0.8)'
                        : 'transparent',
                    backdropFilter: navScrolled ? 'blur(20px)' : 'none',
                    borderBottom: navScrolled ? '1px solid rgba(255,255,255,0.06)' : 'none',
                }}
            >
                <div className="max-w-7xl mx-auto px-6 lg:px-8 flex items-center justify-between">
                    <Link to="/" className="flex items-center gap-3 group">
                        <div className="w-10 h-10 bg-gradient-to-br from-brand-400 to-brand-600 rounded-xl flex items-center justify-center text-white
                                        shadow-lg shadow-brand-500/30 group-hover:shadow-brand-500/50 transition-shadow duration-300">
                            <Heart size={22} fill="currentColor" />
                        </div>
                        <span className="text-2xl font-display font-bold bg-gradient-to-r from-white to-brand-200 bg-clip-text text-transparent">
                            PendoCare
                        </span>
                    </Link>

                    <div className="hidden md:flex items-center gap-8">
                        <a href="#features" className="text-sm font-medium text-slate-400 hover:text-white transition-colors duration-300">Features</a>
                        <a href="#about" className="text-sm font-medium text-slate-400 hover:text-white transition-colors duration-300">About Us</a>
                        <a href="#stats" className="text-sm font-medium text-slate-400 hover:text-white transition-colors duration-300">Impact</a>
                        <Link to="/request-access" className="text-sm font-medium text-brand-300 hover:text-brand-200 transition-colors duration-300">
                            For Schools
                        </Link>
                    </div>

                    <Link to="/login" className="btn-glass text-sm !px-6 !py-2.5 !rounded-xl">
                        <LogIn size={16} />
                        Login
                    </Link>
                </div>
            </nav>

            {/* ════════════════════════════════════════════
                HERO SECTION
            ════════════════════════════════════════════ */}
            <section className="relative min-h-screen flex items-center justify-center">
                {/* Background Image with Parallax */}
                <div
                    className="absolute inset-0 z-0"
                    style={{ transform: `translateY(${scrollY * 0.3}px)` }}
                >
                    <img
                        src="/hero_background.png"
                        alt="Peaceful nature scene"
                        className="w-full h-[120%] object-cover object-center"
                    />
                </div>

                {/* Dark Gradient Overlay */}
                <div className="absolute inset-0 z-[1]"
                    style={{
                        background: `linear-gradient(
                            to bottom,
                            rgba(2, 6, 23, 0.55) 0%,
                            rgba(2, 6, 23, 0.65) 30%,
                            rgba(2, 6, 23, 0.80) 70%,
                            rgba(2, 6, 23, 1) 100%
                        )`
                    }}
                />

                {/* Teal Accent Glow */}
                <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] z-[2]
                                bg-brand-500/10 rounded-full blur-[120px] animate-pulse-soft pointer-events-none" />

                {/* Floating Particles */}
                <FloatingParticle size="6px" left="15%" top="30%" delay="0s" color="rgba(94, 234, 212, 0.25)" />
                <FloatingParticle size="4px" left="80%" top="25%" delay="1s" color="rgba(56, 189, 248, 0.2)" />
                <FloatingParticle size="8px" left="70%" top="60%" delay="2s" color="rgba(94, 234, 212, 0.15)" />
                <FloatingParticle size="5px" left="25%" top="70%" delay="3s" color="rgba(56, 189, 248, 0.2)" />
                <FloatingParticle size="3px" left="45%" top="20%" delay="1.5s" color="rgba(255, 255, 255, 0.15)" />
                <FloatingParticle size="7px" left="90%" top="45%" delay="4s" color="rgba(94, 234, 212, 0.12)" />

                {/* Hero Content */}
                <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
                    {/* Badge */}
                    <div className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full mb-10
                                    animate-fade-in"
                        style={{
                            background: 'rgba(13, 148, 136, 0.15)',
                            border: '1px solid rgba(94, 234, 212, 0.25)',
                            backdropFilter: 'blur(10px)',
                        }}
                    >
                        <Sparkles size={15} className="text-brand-300" />
                        <span className="text-sm font-medium text-brand-200 tracking-wide">
                            Safe, Anonymous, & Secure
                        </span>
                    </div>

                    {/* Heading */}
                    <h1 className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold
                                   leading-[1.05] tracking-tight mb-8 animate-slide-up">
                        <span className="block text-white">Mental Health</span>
                        <span className="block mt-2 bg-gradient-to-r from-brand-300 via-brand-400 to-sky-400
                                         bg-clip-text text-transparent">
                            Support for Students
                        </span>
                    </h1>

                    {/* Subtitle */}
                    <p className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto mb-12 leading-relaxed
                                  animate-slide-up font-light"
                        style={{ animationDelay: '0.15s' }}
                    >
                        A safe space for Kenyan high school students to share, learn, and get
                        professional support. Anonymous, confidential, and always here for you.
                    </p>

                    {/* CTA Buttons */}
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-5
                                    animate-slide-up" style={{ animationDelay: '0.3s' }}>
                        <Link to="/login" className="btn-glass w-full sm:w-auto group">
                            <LogIn size={20} />
                            Student Login
                            <ArrowRight size={16} className="opacity-0 -ml-2 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300" />
                        </Link>
                        <Link to="/request-access" className="btn-glass-secondary w-full sm:w-auto group">
                            <UserPlus size={20} />
                            School Access Request
                        </Link>
                    </div>

                    {/* Trust indicators */}
                    <div className="flex items-center justify-center gap-8 mt-14 animate-fade-in"
                        style={{ animationDelay: '0.5s' }}>
                        <div className="flex items-center gap-2 text-slate-400 text-sm">
                            <Lock size={14} className="text-brand-400" />
                            <span>End-to-End Encrypted</span>
                        </div>
                        <div className="w-1 h-1 rounded-full bg-slate-600" />
                        <div className="flex items-center gap-2 text-slate-400 text-sm">
                            <ShieldCheck size={14} className="text-brand-400" />
                            <span>MoH Aligned</span>
                        </div>
                        <div className="w-1 h-1 rounded-full bg-slate-600 hidden sm:block" />
                        <div className="hidden sm:flex items-center gap-2 text-slate-400 text-sm">
                            <Globe size={14} className="text-brand-400" />
                            <span>Accessible Anywhere</span>
                        </div>
                    </div>
                </div>

                {/* Scroll indicator */}
                <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 animate-float">
                    <ChevronDown size={24} className="text-slate-500" />
                </div>
            </section>

            {/* ════════════════════════════════════════════
                FEATURES SECTION
            ════════════════════════════════════════════ */}
            <section id="features" ref={featuresRef}
                className="relative py-32 bg-slate-950">

                {/* Background Accents */}
                <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-brand-500/5 rounded-full blur-[150px] pointer-events-none" />
                <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-sky-500/5 rounded-full blur-[120px] pointer-events-none" />

                <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
                    {/* Section Header */}
                    <div className={`text-center mb-20 transition-all duration-700 ${featuresInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6"
                            style={{
                                background: 'rgba(13, 148, 136, 0.1)',
                                border: '1px solid rgba(94, 234, 212, 0.15)',
                            }}>
                            <Zap size={14} className="text-brand-400" />
                            <span className="text-sm font-medium text-brand-300">What We Offer</span>
                        </div>
                        <h2 className="font-display text-4xl md:text-5xl font-bold mb-6">
                            <span className="text-white">Comprehensive </span>
                            <span className="bg-gradient-to-r from-brand-300 to-sky-400 bg-clip-text text-transparent">
                                Care System
                            </span>
                        </h2>
                        <p className="text-slate-400 text-lg max-w-2xl mx-auto">
                            Every tool a student needs to navigate their mental health journey,
                            from screening to professional support.
                        </p>
                    </div>

                    {/* Feature Cards Grid */}
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[
                            {
                                icon: <ShieldCheck size={26} />,
                                title: 'Anonymous & Private',
                                desc: 'Log in with an access code. No phone numbers or emails required for students. Complete anonymity.',
                                color: 'from-emerald-400 to-brand-400',
                                iconBg: 'rgba(16, 185, 129, 0.12)',
                                delay: '0s',
                            },
                            {
                                icon: <Activity size={26} />,
                                title: 'Clinical Triage',
                                desc: 'Smart assessment tools aligned with Ministry of Health guidelines to match you with the right level of care.',
                                color: 'from-brand-400 to-sky-400',
                                iconBg: 'rgba(13, 148, 136, 0.12)',
                                delay: '0.1s',
                            },
                            {
                                icon: <MessageCircle size={26} />,
                                title: 'AI-Powered Chat',
                                desc: 'Talk to our empathetic AI chatbot anytime. Get immediate guidance and coping strategies, 24/7.',
                                color: 'from-sky-400 to-blue-400',
                                iconBg: 'rgba(56, 189, 248, 0.12)',
                                delay: '0.2s',
                            },
                            {
                                icon: <Heart size={26} />,
                                title: 'Professional Support',
                                desc: 'Access to licensed counsellors via chat or video for when you need expert guidance and care.',
                                color: 'from-pink-400 to-rose-400',
                                iconBg: 'rgba(244, 114, 182, 0.12)',
                                delay: '0.3s',
                            },
                            {
                                icon: <Users size={26} />,
                                title: 'Peer Stories',
                                desc: 'Read anonymous stories from other students. You are not alone — find comfort in shared experiences.',
                                color: 'from-amber-400 to-orange-400',
                                iconBg: 'rgba(251, 191, 36, 0.12)',
                                delay: '0.4s',
                            },
                            {
                                icon: <BookOpen size={26} />,
                                title: 'Resource Library',
                                desc: 'Curated self-help resources, articles, and exercises tailored for students navigating daily challenges.',
                                color: 'from-violet-400 to-purple-400',
                                iconBg: 'rgba(167, 139, 250, 0.12)',
                                delay: '0.5s',
                            },
                        ].map((feature, i) => (
                            <div
                                key={i}
                                className={`glass-card group cursor-default
                                    transition-all duration-700
                                    ${featuresInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
                                style={{ transitionDelay: feature.delay }}
                            >
                                {/* Icon */}
                                <div
                                    className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6
                                                bg-gradient-to-br ${feature.color} text-white
                                                shadow-lg group-hover:scale-110 transition-transform duration-300`}
                                    style={{ boxShadow: `0 8px 24px ${feature.iconBg}` }}
                                >
                                    {feature.icon}
                                </div>

                                <h3 className="text-xl font-display font-bold text-white mb-3">
                                    {feature.title}
                                </h3>
                                <p className="text-slate-400 leading-relaxed">
                                    {feature.desc}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ════════════════════════════════════════════
                ABOUT US — ASYMMETRIC FLOATING CARDS
            ════════════════════════════════════════════ */}
            <section id="about" ref={aboutRef}
                className="relative py-32 overflow-hidden">

                {/* Background gradient */}
                <div className="absolute inset-0"
                    style={{
                        background: 'linear-gradient(135deg, rgba(13,148,136,0.08) 0%, rgba(2,6,23,1) 50%, rgba(14,165,233,0.06) 100%)',
                    }}
                />

                {/* Decorative orbs */}
                <div className="absolute top-20 right-[10%] w-72 h-72 bg-brand-500/8 rounded-full blur-[100px] animate-pulse-soft pointer-events-none" />
                <div className="absolute bottom-20 left-[5%] w-60 h-60 bg-sky-500/6 rounded-full blur-[80px] animate-pulse-soft pointer-events-none"
                    style={{ animationDelay: '2s' }} />

                <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
                    {/* Section Header */}
                    <div className={`text-center mb-20 transition-all duration-700 ${aboutInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6"
                            style={{
                                background: 'rgba(13, 148, 136, 0.1)',
                                border: '1px solid rgba(94, 234, 212, 0.15)',
                            }}>
                            <Star size={14} className="text-brand-400" />
                            <span className="text-sm font-medium text-brand-300">About Us</span>
                        </div>
                        <h2 className="font-display text-4xl md:text-5xl font-bold mb-6">
                            <span className="text-white">Built With </span>
                            <span className="bg-gradient-to-r from-brand-300 to-sky-400 bg-clip-text text-transparent">
                                Empathy & Purpose
                            </span>
                        </h2>
                        <p className="text-slate-400 text-lg max-w-2xl mx-auto">
                            PendoCare is designed by people who believe every student deserves
                            access to mental health support — no matter where they are.
                        </p>
                    </div>

                    {/* ── Asymmetric Card Layout ── */}
                    <div className="grid grid-cols-12 gap-6 auto-rows-auto">

                        {/* Card 1: Large — Mission (spans 7 cols) */}
                        <div
                            className={`col-span-12 lg:col-span-7 glass-card-light relative overflow-hidden
                                        transition-all duration-700
                                        ${aboutInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
                            style={{
                                transitionDelay: '0.1s',
                                background: 'linear-gradient(135deg, rgba(13,148,136,0.15) 0%, rgba(255,255,255,0.06) 100%)',
                                border: '1px solid rgba(94,234,212,0.15)',
                            }}
                        >
                            <div className="absolute top-0 right-0 w-40 h-40 bg-brand-400/10 rounded-full blur-[60px]" />
                            <div className="relative z-10">
                                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-brand-400 to-brand-600 flex items-center justify-center mb-6
                                                shadow-lg shadow-brand-500/20">
                                    <Heart size={24} className="text-white" fill="currentColor" />
                                </div>
                                <h3 className="font-display text-2xl md:text-3xl font-bold text-white mb-4">
                                    Our Mission
                                </h3>
                                <p className="text-slate-300 leading-relaxed text-lg max-w-xl">
                                    We are on a mission to bridge the gap in mental health support for
                                    students in Kenyan schools. Through technology, empathy, and clinical
                                    expertise, we create safe spaces where every young person can access
                                    the care they deserve.
                                </p>
                            </div>
                        </div>

                        {/* Card 2: Small — Image card (spans 5 cols) */}
                        <div
                            className={`col-span-12 lg:col-span-5 rounded-3xl overflow-hidden relative group
                                        transition-all duration-700
                                        ${aboutInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
                            style={{ transitionDelay: '0.2s', minHeight: '320px' }}
                        >
                            <img
                                src="/about_counselor.png"
                                alt="Professional counselor"
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                            <div className="absolute bottom-6 left-6 right-6">
                                <p className="font-display font-bold text-white text-lg">Licensed Counsellors</p>
                                <p className="text-slate-300 text-sm">Certified professionals you can trust</p>
                            </div>
                        </div>

                        {/* Card 3: Medium — Values (spans 5 cols) */}
                        <div
                            className={`col-span-12 lg:col-span-5 glass-card-light relative overflow-hidden
                                        transition-all duration-700
                                        ${aboutInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
                            style={{
                                transitionDelay: '0.3s',
                                background: 'linear-gradient(135deg, rgba(56,189,248,0.1) 0%, rgba(255,255,255,0.06) 100%)',
                                border: '1px solid rgba(56,189,248,0.12)',
                            }}
                        >
                            <div className="absolute bottom-0 left-0 w-32 h-32 bg-sky-400/10 rounded-full blur-[50px]" />
                            <div className="relative z-10">
                                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-sky-400 to-blue-500 flex items-center justify-center mb-6
                                                shadow-lg shadow-sky-500/20">
                                    <ShieldCheck size={24} className="text-white" />
                                </div>
                                <h3 className="font-display text-2xl font-bold text-white mb-4">
                                    Our Values
                                </h3>
                                <ul className="space-y-3">
                                    {['Anonymity & Privacy First', 'Clinical Excellence', 'Cultural Sensitivity', 'Student-Centered Design'].map((val, i) => (
                                        <li key={i} className="flex items-center gap-3 text-slate-300">
                                            <div className="w-2 h-2 rounded-full bg-gradient-to-r from-brand-400 to-sky-400 flex-shrink-0" />
                                            {val}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        {/* Card 4: Wide — Students Image + How It Works (spans 7 cols) */}
                        <div
                            className={`col-span-12 lg:col-span-7 rounded-3xl overflow-hidden relative group
                                        transition-all duration-700
                                        ${aboutInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
                            style={{ transitionDelay: '0.4s', minHeight: '300px' }}
                        >
                            <img
                                src="/about_students.png"
                                alt="Students supporting each other"
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                            <div className="absolute inset-0" style={{
                                background: 'linear-gradient(to right, rgba(2,6,23,0.85) 0%, rgba(2,6,23,0.4) 60%, transparent 100%)',
                            }} />
                            <div className="absolute top-8 left-8 right-8 max-w-md">
                                <h3 className="font-display text-2xl font-bold text-white mb-3">How It Works</h3>
                                <div className="space-y-3">
                                    {[
                                        { step: '01', text: 'School registers on PendoCare' },
                                        { step: '02', text: 'Students receive anonymous access codes' },
                                        { step: '03', text: 'Take a quick mental health triage' },
                                        { step: '04', text: 'Get matched with the right care level' },
                                    ].map((item, i) => (
                                        <div key={i} className="flex items-center gap-3">
                                            <span className="text-brand-400 font-mono text-sm font-bold">
                                                {item.step}
                                            </span>
                                            <span className="text-slate-200 text-sm">{item.text}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </section>

            {/* ════════════════════════════════════════════
                STATISTICS  / IMPACT SECTION
            ════════════════════════════════════════════ */}
            <section id="stats" ref={statsRef}
                className="relative py-28 overflow-hidden">

                <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-brand-950/30 to-slate-950" />

                <div className="max-w-6xl mx-auto px-6 lg:px-8 relative z-10">
                    <div className={`text-center mb-16 transition-all duration-700 ${statsInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                        <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
                            <span className="text-white">Our </span>
                            <span className="bg-gradient-to-r from-brand-300 to-sky-400 bg-clip-text text-transparent">
                                Impact
                            </span>
                        </h2>
                        <p className="text-slate-400 text-lg">Numbers that reflect our commitment to student wellbeing.</p>
                    </div>

                    <div className={`grid grid-cols-2 lg:grid-cols-4 gap-6 transition-all duration-700
                                     ${statsInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                        style={{ transitionDelay: '0.15s' }}>
                        {[
                            { value: 5000, suffix: '+', label: 'Students Reached', icon: <Users size={22} /> },
                            { value: 120, suffix: '+', label: 'Schools Onboarded', icon: <Globe size={22} /> },
                            { value: 15000, suffix: '+', label: 'Sessions Completed', icon: <MessageCircle size={22} /> },
                            { value: 98, suffix: '%', label: 'Satisfaction Rate', icon: <Star size={22} /> },
                        ].map((stat, i) => (
                            <div
                                key={i}
                                className="glass-card text-center group"
                                style={{ transitionDelay: `${i * 0.1}s` }}
                            >
                                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-brand-400/20 to-sky-400/20
                                                flex items-center justify-center mx-auto mb-4 text-brand-300
                                                group-hover:from-brand-400/30 group-hover:to-sky-400/30 transition-all duration-300">
                                    {stat.icon}
                                </div>
                                <p className="font-display text-4xl md:text-5xl font-extrabold bg-gradient-to-br from-white to-brand-200 bg-clip-text text-transparent mb-2">
                                    <AnimatedCounter end={stat.value} suffix={stat.suffix} />
                                </p>
                                <p className="text-slate-400 text-sm font-medium">{stat.label}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ════════════════════════════════════════════
                FINAL CTA SECTION
            ════════════════════════════════════════════ */}
            <section ref={ctaRef}
                className="relative py-32 overflow-hidden">

                <div className="absolute inset-0">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
                                    w-[700px] h-[700px] bg-brand-500/8 rounded-full blur-[150px] animate-pulse-soft" />
                </div>

                <div className={`max-w-4xl mx-auto px-6 text-center relative z-10
                                  transition-all duration-700
                                  ${ctaInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                    <h2 className="font-display text-4xl md:text-6xl font-bold mb-6">
                        <span className="text-white">Ready to Take the </span>
                        <span className="bg-gradient-to-r from-brand-300 via-brand-400 to-sky-400 bg-clip-text text-transparent">
                            First Step?
                        </span>
                    </h2>
                    <p className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
                        Your mental health matters. Join thousands of students who have found
                        support, guidance, and hope through PendoCare.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-5">
                        <Link to="/login" className="btn-glass w-full sm:w-auto group text-lg !px-10 !py-5">
                            <LogIn size={22} />
                            Get Started Now
                            <ArrowRight size={18} className="opacity-0 -ml-2 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300" />
                        </Link>
                        <Link to="/request-access" className="btn-glass-secondary w-full sm:w-auto text-lg !px-10 !py-5">
                            <UserPlus size={22} />
                            Register Your School
                        </Link>
                    </div>
                </div>
            </section>

            {/* ════════════════════════════════════════════
                FOOTER
            ════════════════════════════════════════════ */}
            <footer className="relative border-t border-white/5 py-16">
                <div className="max-w-7xl mx-auto px-6 lg:px-8">
                    <div className="grid md:grid-cols-3 gap-12 mb-12">
                        {/* Brand */}
                        <div>
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-9 h-9 bg-gradient-to-br from-brand-400 to-brand-600 rounded-lg flex items-center justify-center text-white">
                                    <Heart size={18} fill="currentColor" />
                                </div>
                                <span className="text-xl font-display font-bold text-white">PendoCare</span>
                            </div>
                            <p className="text-slate-500 text-sm leading-relaxed max-w-xs">
                                Bridging the mental health gap for students in
                                Kenyan schools through technology and empathy.
                            </p>
                        </div>

                        {/* Links */}
                        <div>
                            <h4 className="text-sm font-semibold text-white mb-4 uppercase tracking-wider">Platform</h4>
                            <div className="space-y-3">
                                <Link to="/login" className="block text-slate-500 hover:text-brand-400 text-sm transition-colors">Student Login</Link>
                                <Link to="/request-access" className="block text-slate-500 hover:text-brand-400 text-sm transition-colors">School Access</Link>
                                <a href="#features" className="block text-slate-500 hover:text-brand-400 text-sm transition-colors">Features</a>
                                <a href="#about" className="block text-slate-500 hover:text-brand-400 text-sm transition-colors">About Us</a>
                            </div>
                        </div>

                        {/* Contact */}
                        <div>
                            <h4 className="text-sm font-semibold text-white mb-4 uppercase tracking-wider">Get in Touch</h4>
                            <div className="space-y-3">
                                <p className="text-slate-500 text-sm">support@pendocare.co.ke</p>
                                <p className="text-slate-500 text-sm">Nairobi, Kenya</p>
                            </div>
                        </div>
                    </div>

                    <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
                        <p className="text-slate-600 text-sm">
                            &copy; {new Date().getFullYear()} PendoCare. Built for Kenyan Students.
                        </p>
                        <div className="flex items-center gap-6">
                            <a href="#" className="text-slate-600 hover:text-slate-400 text-sm transition-colors">Privacy Policy</a>
                            <a href="#" className="text-slate-600 hover:text-slate-400 text-sm transition-colors">Terms of Service</a>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default LandingPage;
