import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';
import { 
  CheckCircle2, 
  Circle, 
  ArrowRight, 
  RotateCcw, 
  Heart, 
  ListOrdered, 
  Check,
  Waves,
  Volume2,
  Search,
  Compass,
  ShoppingBasket,
  Smile,
  Frown,
  Sparkles,
  Puzzle,
  Grid3X3
} from 'lucide-react';

import puzzleImg from '../../images/puzzle.png';

// --- Types ---

interface StoryEvent {
  id: number;
  text: string;
}

// --- Sub-components ---

/**
 * Progress Bar Component
 */
const ProgressBar: React.FC<{ current: number; total: number; language: 'en' | 'mi' }> = ({ current, total, language }) => {
  const progress = (current / total) * 100;
  return (
    <div className="w-full mb-8">
      <div className="flex justify-between items-end mb-2">
        <span className="text-sm font-bold text-slate-500 uppercase tracking-wider">
          {language === 'en' ? 'Activities Progress' : 'Te Kokenga o ngā Mahi'}
        </span>
        <span className="text-sm font-bold text-emerald-600">
          {current} / {total} {language === 'en' ? 'completed' : 'kua oti'}
        </span>
      </div>
      <div className="h-4 w-full bg-slate-200 rounded-full overflow-hidden shadow-inner">
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          className="h-full bg-gradient-to-r from-emerald-400 to-emerald-600"
        />
      </div>
    </div>
  );
};

/**
 * 1) Story Sequencing Section
 */
const SequencingSection: React.FC<{ language: 'en' | 'mi'; onComplete: () => void }> = ({ language, onComplete }) => {
  const [userOrder, setUserOrder] = useState<number[]>([]);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [selectionFeedback, setSelectionFeedback] = useState<'correct' | 'wrong' | null>(null);

  const events: StoryEvent[] = language === 'en' ? [
    { id: 0, text: "Te Tahi lives in Ōtara." },
    { id: 1, text: "Kuia feed the guardian." },
    { id: 2, text: "Te Tahi is left alone." },
    { id: 3, text: "He calls the sea." },
    { id: 4, text: "He becomes a guardian." }
  ] : [
    { id: 0, text: "E noho ana a Te Tahi i Ōtara." },
    { id: 1, text: "E whāngai ana ngā kuia i te kaitiaki." },
    { id: 2, text: "Ka mahue mokemoke a Te Tahi." },
    { id: 3, text: "Ka karanga ia ki te moana." },
    { id: 4, text: "Ka dā tētahi kaitiaki ia." }
  ];

  const handleEventClick = (id: number) => {
    if (isSubmitted) return;
    if (userOrder.includes(id)) {
      setUserOrder(userOrder.filter(item => item !== id));
      setSelectionFeedback(null);
    } else if (userOrder.length < events.length) {
      const expectedId = events[userOrder.length].id;
      if (id !== expectedId) {
        setSelectionFeedback('wrong');
        return;
      }
      const newOrder = [...userOrder, id];
      setUserOrder(newOrder);
      setSelectionFeedback('correct');
    }
  };

  const handleSubmit = () => {
    const correct = userOrder.every((id, index) => id === events[index].id);
    setIsSubmitted(true);
    setIsCorrect(correct);
    if (correct) {
      onComplete();
    }
  };

  const handleRetry = () => {
    setUserOrder([]);
    setIsSubmitted(false);
    setIsCorrect(null);
    setSelectionFeedback(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 text-blue-600 font-bold mb-2">
        <ListOrdered size={24} />
        <span className="text-xl">{language === 'en' ? 'Story Sequencing' : 'Raupapa Pūrākau'}</span>
      </div>
      <p className="text-lg text-slate-600 font-medium">
        {language === 'en' 
          ? "Put the story in the correct order:" 
          : "Whakatakotoria te pūrākau ki te raupapa tika:"}
      </p>

      <div className="space-y-3">
        {events.map((event) => {
          const orderIndex = userOrder.indexOf(event.id);
          const isSelected = orderIndex !== -1;
          
          return (
            <button
              key={event.id}
              onClick={() => handleEventClick(event.id)}
              className={`w-full text-left p-5 rounded-2xl border-2 transition-all flex items-center gap-4 ${
                isSelected 
                  ? "border-blue-500 bg-blue-50 shadow-inner" 
                  : "border-slate-100 hover:border-blue-200 bg-white"
              }`}
            >
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg shrink-0 ${
                isSelected ? "bg-blue-500 text-white" : "bg-slate-100 text-slate-400"
              }`}>
                {isSelected ? orderIndex + 1 : ""}
              </div>
              <span className="text-slate-700 font-bold text-lg">{event.text}</span>
            </button>
          );
        })}
      </div>

      {selectionFeedback && !isSubmitted && (
        <div className={`p-4 rounded-2xl border text-center font-bold ${
          selectionFeedback === 'correct'
            ? 'bg-emerald-50 border-emerald-200 text-emerald-700'
            : 'bg-rose-50 border-rose-200 text-rose-700'
        }`}>
          {selectionFeedback === 'correct'
            ? (language === 'en' ? 'Nice! Keep going. 😊' : 'Ka pai! Haere tonu. 😊')
            : (language === 'en' ? 'Not this one. 😢' : 'Ehara tēnei. 😢')}
        </div>
      )}

      {!isSubmitted ? (
        <button
          disabled={userOrder.length < events.length}
          onClick={handleSubmit}
          className={`w-full py-5 rounded-2xl font-bold text-xl transition-all shadow-lg ${
            userOrder.length === events.length 
              ? "bg-blue-600 text-white hover:bg-blue-700" 
              : "bg-slate-200 text-slate-400 cursor-not-allowed shadow-none"
          }`}
        >
          {language === 'en' ? 'Check Order' : 'Tirohia te Raupapa'}
        </button>
      ) : isCorrect ? (
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="p-8 bg-emerald-50 border-2 border-emerald-200 rounded-[2rem] text-center"
        >
          <div className="text-5xl mb-4">✨</div>
          <h4 className="text-2xl font-bold text-emerald-800 mb-2">
            {language === 'en' ? 'Brilliant!' : 'Mīharo!'}
          </h4>
          <p className="text-lg text-emerald-700 font-medium whitespace-pre-line">
            {language === 'en' 
              ? "You successfully retold the story!\nValley → Feeding → Abandonment → Rescue → Guardian" 
              : "I whakahāngai tika koe i te pūrākau!\nRaorao → Whāngai → Mahue → Whakaora → Kaitiaki"}
          </p>
        </motion.div>
      ) : (
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="p-8 bg-rose-50 border-2 border-rose-200 rounded-[2rem] text-center"
        >
          <div className="text-5xl mb-4">😢</div>
          <h4 className="text-2xl font-bold text-rose-800 mb-2">
            {language === 'en' ? 'Not quite right' : 'Kāore anō kia tika'}
          </h4>
          <p className="text-lg text-rose-700 font-medium">
            {language === 'en' 
              ? "Try again. The correct order is 1 → 2 → 3 → 4 → 5." 
              : "Whakamātau anō. Ko te raupapa tika ko 1 → 2 → 3 → 4 → 5."}
          </p>
          <button
            onClick={handleRetry}
            className="mt-6 px-6 py-3 rounded-xl bg-rose-600 text-white font-bold hover:bg-rose-700 transition-all"
          >
            {language === 'en' ? 'Try Again' : 'Ngana anō'}
          </button>
        </motion.div>
      )}
    </div>
  );
};

/**
 * 2) Choose the Right Path Section
 */
const PathSection: React.FC<{ language: 'en' | 'mi'; onComplete: () => void }> = ({ language, onComplete }) => {
  const [choice, setChoice] = useState<string | null>(null);

  const handleChoice = (c: string) => {
    setChoice(c);
    onComplete();
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 text-rose-500 font-bold mb-2">
        <Compass size={24} />
        <span className="text-xl">{language === 'en' ? 'Choose the Right Path' : 'Kōwhiria te Ara Tika'}</span>
      </div>

      <h3 className="text-2xl font-bold text-slate-800 leading-tight">
        {language === 'en' 
          ? "You are with the iwi. What should you do?" 
          : "Kei te taha koe o te iwi. Me aha koe?"}
      </h3>

      {!choice ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <button
            onClick={() => handleChoice('stay')}
            className="p-8 rounded-[2rem] border-4 border-slate-100 hover:border-emerald-500 hover:bg-emerald-50 transition-all text-center group"
          >
            <div className="text-5xl mb-4 group-hover:scale-110 transition-transform">🌿</div>
            <span className="font-bold text-xl text-slate-700 block">
              {language === 'en' ? 'Stay with Te Tahi' : 'Noho tahi me Te Tahi'}
              <div className="text-emerald-500 text-sm mt-1">{language === 'en' ? 'Kind choice' : 'Kōwhiringa atawhai'}</div>
            </span>
          </button>
          <button
            onClick={() => handleChoice('leave')}
            className="p-8 rounded-[2rem] border-4 border-slate-100 hover:border-rose-500 hover:bg-rose-50 transition-all text-center group"
          >
            <div className="text-5xl mb-4 group-hover:scale-110 transition-transform">🚶‍♂️</div>
            <span className="font-bold text-xl text-slate-700 block">
              {language === 'en' ? 'Leave him behind' : 'Waiho ia ki muri'}
              <div className="text-rose-500 text-sm mt-1">{language === 'en' ? 'Sad choice' : 'Kōwhiringa pouri'}</div>
            </span>
          </button>
        </div>
      ) : (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className={`p-10 rounded-[2.5rem] shadow-2xl text-center ${choice === 'stay' ? 'bg-emerald-600' : 'bg-rose-600'} text-white`}
        >
          {choice === 'stay' ? <Smile size={64} className="mx-auto mb-4" /> : <Frown size={64} className="mx-auto mb-4" />}
          <h4 className="text-3xl font-bold mb-4">
            {choice === 'stay' 
              ? (language === 'en' ? 'Kind and Respectful!' : 'Atawhai me te Whakaute!') 
              : (language === 'en' ? 'Oh No...' : 'Aué...')}
          </h4>
          <p className="text-xl font-medium opacity-90">
            {choice === 'stay'
              ? (language === 'en' ? "By staying, you show deep mana and care for Te Tahi." : "Mā te noho tahi, e whakaatu ana koe i te mana nui me te tiaki i a Te Tahi.")
              : (language === 'en' ? "This choice caused sadness. Te Tahi felt alone, but his journey still led to strength." : "Nā tēnei kōwhiringa i tau mai te pouri. I noho mokemoke a Te Tahi, engari i ara ake tōna kaha.")}
          </p>
          <div className="mt-8 flex items-center justify-center gap-3 font-bold text-white/80">
            <CheckCircle2 size={24} />
            <span>{language === 'en' ? 'Decision Explored' : 'Kua kitea te hua'}</span>
          </div>
        </motion.div>
      )}
    </div>
  );
};

/**
 * 3) Sound the Story Section (WebAudio implementation)
 */
const SoundSection: React.FC<{ language: 'en' | 'mi'; onComplete: () => void }> = ({ language, onComplete }) => {
  const [activeSound, setActiveSound] = useState<string | null>(null);

  // WebAudio refs
  const audioCtxRef = useRef<AudioContext | null>(null);
  const sourcesRef = useRef<
    Record<
      string,
      {
        sources: AudioScheduledSourceNode[];
        nodes: AudioNode[];
      }
    >
  >({});

  useEffect(() => {
    return () => {
      // stop and cleanup
      Object.values(sourcesRef.current).forEach((s) => {
        s.sources.forEach((src) => {
          try { src.stop(); } catch (e) {}
          try { src.disconnect(); } catch (e) {}
        });
        s.nodes.forEach((n) => {
          try { n.disconnect(); } catch (e) {}
        });
      });
      sourcesRef.current = {};
      if (audioCtxRef.current) {
        try { audioCtxRef.current.close(); } catch (e) {}
        audioCtxRef.current = null;
      }
    };
  }, []);

  const getAudioContext = () => {
    if (!audioCtxRef.current) {
      const C = (window as any).AudioContext || (window as any).webkitAudioContext;
      audioCtxRef.current = new C();
    }
    // resume if suspended
    if (audioCtxRef.current && audioCtxRef.current.state === 'suspended') {
      audioCtxRef.current.resume().catch(() => {});
    }
    return audioCtxRef.current!;
  };

  const stopAll = () => {
    Object.values(sourcesRef.current).forEach((s) => {
      s.sources.forEach((src) => {
        try { src.stop(); } catch (e) {}
        try { src.disconnect(); } catch (e) {}
      });
      s.nodes.forEach((n) => {
        try { n.disconnect(); } catch (e) {}
      });
    });
    sourcesRef.current = {};
  };

  const playWaves = () => {
    const ctx = getAudioContext();
    // create pink-ish noise buffer and loop it to simulate waves
    const duration = 4; // seconds
    const sampleCount = Math.floor(ctx.sampleRate * duration);
    const buffer = ctx.createBuffer(1, sampleCount, ctx.sampleRate);
    const data = buffer.getChannelData(0);

    let b0 = 0;
    let b1 = 0;
    let b2 = 0;
    let b3 = 0;
    let b4 = 0;
    let b5 = 0;
    let b6 = 0;

    for (let i = 0; i < sampleCount; i++) {
      const white = Math.random() * 2 - 1;
      // pink noise approximation
      b0 = 0.99886 * b0 + white * 0.0555179;
      b1 = 0.99332 * b1 + white * 0.0750759;
      b2 = 0.96900 * b2 + white * 0.1538520;
      b3 = 0.86650 * b3 + white * 0.3104856;
      b4 = 0.55000 * b4 + white * 0.5329522;
      b5 = -0.7616 * b5 - white * 0.0168980;
      const pink = b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362;
      b6 = white * 0.115926;

      const t = i / sampleCount;
      const swell = 0.5 + 0.5 * Math.sin(2 * Math.PI * t);
      data[i] = (pink * 0.12) * (0.6 + 0.4 * swell);
    }

    const src = ctx.createBufferSource();
    src.buffer = buffer;
    src.loop = true;

    const hp = ctx.createBiquadFilter();
    hp.type = 'highpass';
    hp.frequency.value = 120;

    const lp = ctx.createBiquadFilter();
    lp.type = 'lowpass';
    lp.frequency.value = 2200;

    const gain = ctx.createGain();
    gain.gain.value = 0.18;

    const swellGain = ctx.createGain();
    swellGain.gain.value = 0.8;
    const swellOsc = ctx.createOscillator();
    swellOsc.type = 'sine';
    swellOsc.frequency.value = 0.08;
    swellOsc.connect(swellGain);
    swellGain.connect(gain.gain);

    src.connect(hp);
    hp.connect(lp);
    lp.connect(gain);
    gain.connect(ctx.destination);

    swellOsc.start();
    src.start();

    sourcesRef.current['waves'] = {
      sources: [src, swellOsc],
      nodes: [hp, lp, gain, swellGain]
    };
  };

  const playWhale = () => {
    const ctx = getAudioContext();

    const osc1 = ctx.createOscillator();
    const osc2 = ctx.createOscillator();
    osc1.type = 'sine';
    osc2.type = 'sine';

    const gain = ctx.createGain();
    gain.gain.value = 0;

    const lp = ctx.createBiquadFilter();
    lp.type = 'lowpass';
    lp.frequency.value = 900;

    // slow pitch drift
    const lfo = ctx.createOscillator();
    lfo.type = 'sine';
    lfo.frequency.value = 0.12;
    const lfoGain = ctx.createGain();
    lfoGain.gain.value = 25; // Hz depth
    lfo.connect(lfoGain);
    lfoGain.connect(osc1.frequency);
    lfoGain.connect(osc2.frequency);

    osc1.connect(gain);
    osc2.connect(gain);
    gain.connect(lp);
    lp.connect(ctx.destination);

    const now = ctx.currentTime;
    osc1.frequency.setValueAtTime(90, now);
    osc2.frequency.setValueAtTime(120, now);
    osc1.frequency.exponentialRampToValueAtTime(140, now + 4.5);
    osc2.frequency.exponentialRampToValueAtTime(170, now + 4.5);

    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.exponentialRampToValueAtTime(0.45, now + 1.2);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 7.5);

    osc1.start();
    osc2.start();
    lfo.start();

    const stopAt = now + 8;
    osc1.stop(stopAt);
    osc2.stop(stopAt);
    lfo.stop(stopAt);

    sourcesRef.current['whale'] = {
      sources: [osc1, osc2, lfo],
      nodes: [gain, lp, lfoGain]
    };
  };

  const handleSoundClick = (id: string) => {
    stopAll();
    if (id === 'waves') playWaves();
    if (id === 'whale') playWhale();
    setActiveSound(id);
    onComplete();
  };

  const sounds = [
    { 
      id: 'waves', 
      label: language === 'en' ? 'Wave Sound' : 'Te Tangi o te Moana', 
      icon: Waves, 
      color: 'bg-cyan-100 text-cyan-600',
      scene: language === 'en' ? "Hear this when Te Tahi is left on Whakaari and calls to the sea." : "Ka rongo i tēnei i te wā i mahue ai a Te Tahi ki Whakaari, ā, ka karanga ia ki te moana."
    },
    { 
      id: 'whale', 
      label: language === 'en' ? 'Whale Sound' : 'Te Tangi o te Tohorā', 
      icon: Volume2, 
      color: 'bg-indigo-100 text-indigo-600',
      scene: language === 'en' ? "Hear this when Tūtarakauika arrives to rescue Te Tahi." : "Ka rongo i tēnei i te wā i te taenga mai o Tūtarakauika ki te whakaora i a Te Tahi."
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 text-indigo-600 font-bold mb-2">
        <Volume2 size={24} />
        <span className="text-xl">{language === 'en' ? 'Sound the Story' : 'Whakarongo ki te Pūrākau'}</span>
      </div>

      <p className="text-lg text-slate-600 font-medium">
        {language === 'en' 
          ? "Click a sound and imagine the scene:" 
          : "Pāwhiritia tētahi tangi, ā, pohewatia te whakaaturanga:"}
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {sounds.map((s) => (
          <button
            key={s.id}
            onClick={() => handleSoundClick(s.id)}
            className={`p-10 rounded-[2rem] border-4 transition-all flex flex-col items-center gap-4 ${
              activeSound === s.id 
                ? 'border-indigo-500 bg-indigo-50 scale-105 shadow-xl' 
                : 'border-slate-100 bg-white hover:border-indigo-200'
            }`}
          >
            <div className={`w-20 h-20 rounded-full flex items-center justify-center ${s.color} mb-2`}>
              <s.icon size={40} />
            </div>
            <span className="font-bold text-xl text-slate-800">{s.label}</span>
          </button>
        ))}
      </div>

      <AnimatePresence>
        {activeSound && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="bg-indigo-900 text-white p-8 rounded-[2rem] relative overflow-hidden mt-4"
          >
            <div className="absolute top-0 right-0 p-6 opacity-10">
              <Sparkles size={100} />
            </div>
            <h4 className="text-2xl font-bold mb-3 flex items-center gap-2 text-indigo-300">
              <Search size={24} /> {language === 'en' ? 'When do you hear this?' : 'Āhea koe rongo ai i tēnei?'}
            </h4>
            <p className="text-xl leading-relaxed italic z-10 relative">
              "{sounds.find(s => s.id === activeSound)?.scene}"
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

/**
 * 4) Find the Hidden Symbol Section
 */
const SymbolSection: React.FC<{ language: 'en' | 'mi'; onComplete: () => void }> = ({ language, onComplete }) => {
  const [found, setFound] = useState<string[]>([]);

  const symbols = [
    { id: 'koru', label: 'Koru', icon: Sparkles, color: 'text-emerald-500' },
    { id: 'wave', label: language === 'en' ? 'Wave' : 'Moana', icon: Waves, color: 'text-blue-500' },
    { id: 'basket', label: language === 'en' ? 'Basket' : 'Kete', icon: ShoppingBasket, color: 'text-amber-500' }
  ];

  const toggleFound = (id: string) => {
    if (found.includes(id)) return;
    const newFound = [...found, id];
    setFound(newFound);
    if (newFound.length === symbols.length) {
      onComplete();
    }
  };

  const isAllFound = found.length === symbols.length;

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 text-amber-500 font-bold mb-2">
        <Search size={24} />
        <span className="text-xl">{language === 'en' ? 'Find the Hidden Symbol' : 'Kimihia te Tohu Huna'}</span>
      </div>

      <div className="flex justify-between items-center bg-slate-50 p-4 rounded-2xl border border-slate-200">
        <p className="text-lg font-bold text-slate-700">
          {language === 'en' ? 'Find 3 symbols:' : 'Kimihia kia 3 ngā tohu:'}
        </p>
        <div className="flex gap-2">
          {symbols.map(s => (
            <div 
              key={s.id} 
              className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all ${
                found.includes(s.id) ? 'bg-emerald-500 border-emerald-500 text-white' : 'bg-white border-slate-200 text-slate-300'
              }`}
            >
              <s.icon size={18} />
            </div>
          ))}
        </div>
      </div>

      <div className="relative h-96 bg-slate-200 rounded-[2.5rem] overflow-hidden group shadow-inner">
        {!isAllFound ? (
          <>
            {/* The "Image" background */}
            <img 
              src="https://images.unsplash.com/photo-1505118380757-91f5f5632de0?auto=format&fit=crop&q=80&w=1200" 
              alt="Coastal adventure"
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-10000 group-hover:scale-110"
              referrerPolicy="no-referrer"
            />
            {/* Overlay for aesthetic */}
            <div className="absolute inset-0 bg-blue-900/10 mix-blend-multiply pointer-events-none" />

            {/* Hidden Symbol: Koru (hidden in the foliage/water) */}
            <button 
              onClick={() => toggleFound('koru')}
              className={`absolute top-[20%] left-[25%] transition-all duration-500 hover:scale-125 p-4 ${
                found.includes('koru') ? 'opacity-0 pointer-events-none' : 'opacity-40 hover:opacity-100'
              }`}
            >
              <Sparkles className="text-emerald-400 drop-shadow-lg" size={48} />
            </button>

            {/* Hidden Symbol: Wave (hidden in the ocean) */}
            <button 
              onClick={() => toggleFound('wave')}
              className={`absolute bottom-[30%] right-[30%] transition-all duration-500 hover:scale-125 p-4 ${
                found.includes('wave') ? 'opacity-0 pointer-events-none' : 'opacity-40 hover:opacity-100'
              }`}
            >
              <Waves className="text-blue-300 drop-shadow-lg" size={56} />
            </button>

            {/* Hidden Symbol: Basket (hidden on the shore) */}
            <button 
              onClick={() => toggleFound('basket')}
              className={`absolute bottom-[15%] left-[45%] transition-all duration-500 hover:scale-125 p-4 ${
                found.includes('basket') ? 'opacity-0 pointer-events-none' : 'opacity-40 hover:opacity-100'
              }`}
            >
              <ShoppingBasket className="text-amber-300/80 drop-shadow-lg" size={44} />
            </button>

            {/* Decorative hint */}
            <div className="absolute top-4 left-6 bg-white/20 backdrop-blur-md px-4 py-2 rounded-full border border-white/30 text-white text-xs font-bold uppercase tracking-widest shadow-lg">
              {language === 'en' ? 'Scan the horizon...' : 'Titiro ki te pae...'}
            </div>
          </>
        ) : (
          <motion.div 
            initial={{ scale: 0 }} 
            animate={{ scale: 1 }} 
            className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-emerald-600/90 backdrop-blur-sm"
          >
            <div className="bg-white p-6 rounded-full shadow-2xl">
              <CheckCircle2 size={80} className="text-emerald-500" />
            </div>
            <div className="text-center text-white p-6">
              <h4 className="text-3xl font-black mb-2 tracking-tight">
                {language === 'en' ? "AMAZING DISCOVERY!" : "KITEA KOATIA!"}
              </h4>
              <p className="text-xl font-medium opacity-90">
                {language === 'en' ? "You have the eyes of a true navigator." : "He kanohi hāparangi tōu."}
              </p>
            </div>
          </motion.div>
        )}
      </div>

      <p className="text-sm text-slate-400 font-medium italic text-center">
        {language === 'en' ? "Symbols represent connection to the land and the story." : "E whakaatu ana ngā tohu i te tūhono ki te whenua me te pūrākau."}
      </p>
    </div>
  );
};

/**
 * 5) Maori Totem Puzzle Section
 */
const PuzzleSection: React.FC<{ language: 'en' | 'mi'; onComplete: () => void }> = ({ language, onComplete }) => {
  const GRID_SIZE = 3;
  const TOTAL_PIECES = GRID_SIZE * GRID_SIZE;
  const [pieces, setPieces] = useState<number[]>([]);
  const [selected, setSelected] = useState<number | null>(null);
  const [isSolved, setIsSolved] = useState(false);

  // Initialize shuffled pieces
  React.useEffect(() => {
    const initial = Array.from({ length: TOTAL_PIECES }, (_, i) => i);
    // Shuffle logic (Fisher-Yates)
    for (let i = initial.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [initial[i], initial[j]] = [initial[j], initial[i]];
    }
    setPieces(initial);
  }, []);

  const handlePieceClick = (index: number) => {
    if (isSolved) return;

    if (selected === null) {
      setSelected(index);
    } else {
      const newPieces = [...pieces];
      [newPieces[selected], newPieces[index]] = [newPieces[index], newPieces[selected]];
      setPieces(newPieces);
      setSelected(null);

      // Check if solved
      if (newPieces.every((val, i) => val === i)) {
        setIsSolved(true);
        onComplete();
      }
    }
  };

  // Using a traditional Maori carving image
  const imageUrl = puzzleImg;

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 text-rose-600 font-bold mb-2">
        <Grid3X3 size={24} />
        <span className="text-xl">{language === 'en' ? 'Maori Totem Puzzle' : 'Te Tātai Toi'}</span>
      </div>

      <p className="text-lg text-slate-600 font-medium">
        {language === 'en' 
          ? "Swap the tiles to fix the traditional carving:" 
          : "Whakawhitihia ngā tohu hei whakaoti i te whakairo:"}
      </p>

      <div 
        className="grid grid-cols-3 gap-2 bg-slate-100 p-2 rounded-[2rem] shadow-inner max-w-sm mx-auto aspect-square border-4 border-slate-200"
      >
        {pieces.map((piece, index) => {
          const row = Math.floor(piece / GRID_SIZE);
          const col = piece % GRID_SIZE;
          const isSelected = selected === index;

          return (
            <button
              key={index}
              onClick={() => handlePieceClick(index)}
              className={`relative overflow-hidden rounded-xl transition-all duration-300 aspect-square border-2 ${
                isSelected ? 'border-rose-500 scale-95 z-10 shadow-lg' : 'border-transparent'
              } ${isSolved ? 'border-emerald-500' : ''}`}
            >
              <div 
                style={{
                  backgroundImage: `url(${imageUrl})`,
                  backgroundSize: '300% 300%',
                  backgroundPosition: `${(col / (GRID_SIZE - 1)) * 100}% ${(row / (GRID_SIZE - 1)) * 100}%`,
                  width: '100%',
                  height: '100%',
                }}
              />
              {isSelected && <div className="absolute inset-0 bg-rose-500/20" />}
            </button>
          );
        })}
      </div>

      {isSolved && (
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="p-8 bg-emerald-50 border-2 border-emerald-200 rounded-[2rem] text-center"
        >
          <div className="text-5xl mb-4">🗿</div>
          <h4 className="text-2xl font-bold text-emerald-800 mb-2">
            {language === 'en' ? 'Whakairo Restored!' : 'Kua Oti te Whakairo!'}
          </h4>
          <p className="text-lg text-emerald-700 font-medium">
            {language === 'en' ? "Amazing! The ancestor's image is complete." : "Mīharo! Kua tūhonotia te āhua o te tipuna."}
          </p>
        </motion.div>
      )}
    </div>
  );
};

// --- Main Component ---

const Activities: React.FC = () => {
  const [language, setLanguage] = useState<'en' | 'mi'>('en');
  const [activeTab, setActiveTab] = useState<'sequencing' | 'path' | 'sound' | 'symbols' | 'puzzle'>('sequencing');
  const [completedSteps, setCompletedSteps] = useState<Set<string>>(new Set());

  const handleComplete = (step: string) => {
    setCompletedSteps(prev => {
      const newSet = new Set(prev).add(step);
      
      // Trigger confetti if all 5 are done
      if (newSet.size === 5) {
        confetti({
          particleCount: 200,
          spread: 80,
          origin: { y: 0.6 },
          colors: ['#10b981', '#3b82f6', '#f43f5e', '#fbbf24']
        });
      }
      return newSet;
    });

    // Auto-navigate logic
    const tabsOrder: ('sequencing' | 'path' | 'sound' | 'symbols' | 'puzzle')[] = ['sequencing', 'path', 'sound', 'symbols', 'puzzle'];
    const currentIndex = tabsOrder.indexOf(step as any);
    if (currentIndex !== -1 && currentIndex < tabsOrder.length - 1) {
      setTimeout(() => {
        setActiveTab(tabsOrder[currentIndex + 1]);
      }, 2500); 
    }
  };

  const tabs = [
    { id: 'sequencing', label: language === 'en' ? 'Sequencing' : 'Raupapa', icon: ListOrdered },
    { id: 'path', label: language === 'en' ? 'The Path' : 'Te Ara', icon: Compass },
    { id: 'sound', label: language === 'en' ? 'Sounds' : 'Ngā Tangi', icon: Volume2 },
    { id: 'symbols', label: language === 'en' ? 'Symbols' : 'Ngā Tohu', icon: Search },
    { id: 'puzzle', label: language === 'en' ? 'Puzzle' : 'Panga', icon: Puzzle },
  ];

  return (
    <div className="py-12 px-4 bg-slate-50 min-h-[calc(100vh-64px)]">
      <div className="max-w-4xl mx-auto">
        
        {/* Header & Language Toggle */}
        <div className="flex flex-col md:flex-row items-center justify-between mb-10 gap-6">
          <div className="text-center md:text-left">
            <h1 className="text-5xl font-extrabold text-slate-900 mb-2 tracking-tight">
              {language === 'en' ? 'Activities' : 'Ngā Mahi'}
            </h1>
            <p className="text-xl text-slate-500 font-medium">
              {language === 'en' ? 'Play and learn with Te Tahi-o-Te-Rā' : 'Pākiki me te ako me Te Tahi-o-Te-Rā'}
            </p>
          </div>

          <div className="flex items-center gap-3 bg-white p-2 rounded-2xl shadow-sm border border-slate-200">
            <div className="flex gap-1">
              {(['en', 'mi'] as const).map((code) => (
                <button
                  key={code}
                  onClick={() => setLanguage(code)}
                  className={`px-5 py-2.5 rounded-xl text-sm font-bold transition-all ${
                    language === code
                      ? 'bg-emerald-600 text-white shadow-md'
                      : 'text-slate-500 hover:bg-slate-100'
                  }`}
                >
                  {code === 'en' ? 'English' : 'Māori'}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Progress Tracker */}
        <ProgressBar 
          current={completedSteps.size} 
          total={5} 
          language={language} 
        />

        {/* Tab Navigation */}
        <div className="flex overflow-x-auto no-scrollbar justify-start md:justify-center gap-3 mb-12 pb-4 px-2 snap-x">
          {tabs.map((tab) => {
            const isCompleted = completedSteps.has(tab.id);
            const isActive = activeTab === tab.id;
            
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-5 py-4 rounded-[1.2rem] font-bold transition-all relative group shrink-0 snap-center ${
                  isActive
                    ? 'bg-slate-900 text-white shadow-2xl scale-105 z-10'
                    : 'bg-white text-slate-500 hover:bg-slate-50 border border-slate-200 shadow-sm'
                }`}
              >
                <div className={`transition-transform group-hover:rotate-12 ${isActive ? 'text-emerald-400' : ''}`}>
                  <tab.icon size={20} />
                </div>
                <span className="text-base whitespace-nowrap">{tab.label}</span>
                {isCompleted && (
                  <div className="absolute top-1 right-1 bg-emerald-500 text-white rounded-full p-1 shadow-lg border-2 border-white">
                    <Check size={10} strokeWidth={4} />
                  </div>
                )}
              </button>
            );
          })}
        </div>

        {/* Content Card */}
        <div className="bg-white rounded-[3rem] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)] p-10 md:p-16 border border-slate-100 min-h-[500px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            >
              {activeTab === 'sequencing' && <SequencingSection language={language} onComplete={() => handleComplete('sequencing')} />}
              {activeTab === 'path' && <PathSection language={language} onComplete={() => handleComplete('path')} />}
              {activeTab === 'sound' && <SoundSection language={language} onComplete={() => handleComplete('sound')} />}
              {activeTab === 'symbols' && <SymbolSection language={language} onComplete={() => handleComplete('symbols')} />}
              {activeTab === 'puzzle' && <PuzzleSection language={language} onComplete={() => handleComplete('puzzle')} />}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Footer Decorative Note */}
        <div className="mt-16 text-center space-y-4">
          <p className="text-slate-400 text-sm font-black uppercase tracking-[0.2em]">
            {language === 'en' ? 'Legendary Explorer' : 'Kaiwhakatere Rongonui'}
          </p>
          <div className="flex justify-center items-center gap-6">
            <div className="h-px w-12 bg-slate-200" />
            <Heart className="text-rose-200" size={20} fill="currentColor" />
            <div className="h-px w-12 bg-slate-200" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Activities;
