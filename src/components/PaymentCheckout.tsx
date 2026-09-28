import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Check, ShieldCheck, Lock, CreditCard, ArrowRight } from 'lucide-react';

// Card formatting helpers
const formatCardNumber = (val: string) => {
  const v = val.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
  const matches = v.match(/\d{1,4}/g);
  const match = matches ? matches.join(' ') : '';
  return match.slice(0, 19);
};

const formatExpiry = (val: string) => {
  let v = val.replace(/\D/g, '');
  if (v.length > 4) v = v.slice(0, 4);
  if (v.length > 2) {
    v = v.slice(0, 2) + '/' + v.slice(2);
  }
  return v;
};

const formatCvv = (val: string) => val.replace(/\D/g, '').slice(0, 4);

export function PaymentCheckout() {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');
  const [isCvvFocused, setIsCvvFocused] = useState(false);
  
  const [status, setStatus] = useState<'form' | 'processing' | 'success'>('form');

  const isNumberValid = number.length === 19;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (status !== 'form') return;
    setStatus('processing');
    setTimeout(() => {
      setStatus('success');
    }, 2500);
  };

  const cardVariants = {
    form: (isCvvFocused: boolean) => ({
      rotateY: isCvvFocused ? 180 : 0,
      y: 0,
      boxShadow: "0 20px 25px -5px rgba(0,0,0,0.3), 0 8px 10px -6px rgba(0,0,0,0.3)",
      transition: { duration: 0.6, ease: "easeInOut" }
    }),
    processing: {
      rotateY: 0,
      boxShadow: [
        "0 0 0px 2px rgba(248,113,113,0.6), 0 0 20px rgba(248,113,113,0.4)",
        "0 0 0px 4px rgba(248,113,113,1), 0 0 45px rgba(248,113,113,0.7)",
        "0 0 0px 2px rgba(248,113,113,0.6), 0 0 20px rgba(248,113,113,0.4)"
      ],
      transition: {
        rotateY: { duration: 0.6, ease: "easeInOut" },
        boxShadow: { repeat: Infinity, duration: 1.5, ease: "easeInOut" }
      }
    },
    success: {
      rotateY: 0,
      boxShadow: "0 0 0px 4px rgba(52,211,153,1), 0 0 45px rgba(52,211,153,0.6)",
      transition: {
        rotateY: { duration: 0.6 },
        boxShadow: { duration: 0.5 }
      }
    }
  };

  return (
    <div className="w-full py-16 px-4 flex items-center justify-center font-sans text-slate-200">
      <div className="max-w-[1000px] w-full bg-[#13151a]/70 backdrop-blur-2xl rounded-[2rem] shadow-[0_30px_60px_rgba(0,0,0,0.6)] border border-white/10 overflow-hidden">
        
        {/* Header */}
        <div className="px-6 sm:px-10 py-6 border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="font-bold text-white tracking-wide text-sm sm:text-base">Visor Checkout</span>
          </div>
          <div className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-500">
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                <Check size={12} strokeWidth={3} />
              </div>
              <span>Main page</span>
            </div>
            <div className="w-8 h-px bg-white/10" />
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                <Check size={12} strokeWidth={3} />
              </div>
              <span>Shipping details</span>
            </div>
            <div className="w-8 h-px bg-white/10" />
            <div className="flex items-center gap-2 text-cyan-400 relative">
              <div className="w-5 h-5 rounded-full bg-cyan-400 text-black flex items-center justify-center text-xs">
                3
              </div>
              <span>Payment method</span>
              <motion.div layoutId="headerUnderline" className="absolute -bottom-[26px] left-0 right-0 h-[3px] bg-cyan-400 rounded-t-full" />
            </div>
          </div>
        </div>

        {/* Body */}
        <div className="p-6 sm:p-10 lg:p-12 min-h-[500px] relative flex flex-col justify-center">
          
          <motion.div 
            layout
            className={`w-full flex ${status === 'form' ? 'flex-col lg:flex-row gap-10 lg:gap-14' : 'flex-col items-center justify-center'}`}
          >
            {/* Left Column: Card Preview */}
            <motion.div 
              layout
              className={`relative flex flex-col items-center justify-center shrink-0 ${status === 'form' ? 'lg:w-[45%] lg:border-r border-white/10 lg:pr-14' : 'w-full max-w-[380px]'}`}
            >
              {/* Decorative stacked cards (only in form state) */}
              <div className="relative w-full max-w-[380px] aspect-[1.586/1] z-10" style={{ perspective: '1000px' }}>
                <AnimatePresence>
                  {status === 'form' && (
                    <>
                      <motion.div 
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        className="absolute inset-0 rounded-2xl bg-[#1c1f26] transform rotate-[-6deg] translate-y-3 -z-20 border border-white/5 shadow-sm"
                      />
                      <motion.div 
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        className="absolute inset-0 rounded-2xl bg-[#232730] transform rotate-[-3deg] translate-y-1.5 -z-10 border border-white/5 shadow-sm"
                      />
                    </>
                  )}
                </AnimatePresence>

                {/* The Interactive Card */}
                <motion.div
                  custom={isCvvFocused}
                  variants={cardVariants}
                  initial="form"
                  animate={status}
                  className="w-full h-full relative rounded-2xl bg-slate-900"
                  style={{ transformStyle: 'preserve-3d' }}
                >
                  {/* Front Face */}
                  <div 
                    className="absolute inset-0 rounded-2xl bg-gradient-to-br from-slate-800 via-[#132244] to-blue-900 overflow-hidden p-5 sm:p-6 flex flex-col justify-between text-white"
                    style={{ backfaceVisibility: 'hidden' }}
                  >
                    {/* Background noise/texture overlay could go here */}
                    <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }} />
                    
                    <div className="flex items-start justify-between relative z-10">
                      <div className="flex flex-col gap-2">
                        <div className="w-10 h-7 sm:w-11 sm:h-8 bg-gradient-to-br from-yellow-200 via-yellow-400 to-yellow-600 rounded-[4px] sm:rounded-md flex items-center justify-center overflow-hidden relative shadow-sm">
                          <div className="absolute inset-0 bg-black/10 mix-blend-overlay" style={{ backgroundImage: 'repeating-linear-gradient(90deg, transparent, transparent 2px, rgba(0,0,0,0.1) 2px, rgba(0,0,0,0.1) 3px)' }} />
                          <div className="w-full h-[1px] bg-black/20 absolute top-1/2" />
                          <div className="w-[1px] h-full bg-black/20 absolute left-[30%]" />
                          <div className="w-[1px] h-full bg-black/20 absolute right-[30%]" />
                        </div>
                        <svg className="w-4 h-4 sm:w-5 sm:h-5 text-white/70 mt-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5.5 12a10.5 10.5 0 0 1 13 0M8.5 14.5a6.5 6.5 0 0 1 7 0M11 17a2.5 2.5 0 0 1 2 0"/></svg>
                      </div>
                      <span className="text-[10px] sm:text-xs font-bold tracking-[0.2em] text-white/90">PLATINUM</span>
                    </div>

                    <div className="mt-2 text-xl sm:text-[1.7rem] font-mono tracking-[0.1em] sm:tracking-[0.15em] text-white/90 drop-shadow-md min-h-[32px] flex items-center relative z-10">
                      {number || '•••• •••• •••• ••••'}
                    </div>

                    <div className="flex items-end justify-between mt-2 relative z-10">
                      <div className="flex gap-6 sm:gap-8">
                        <div className="flex flex-col">
                          <span className="text-[8px] sm:text-[9px] uppercase tracking-wider text-white/50 mb-0.5 sm:mb-1">Cardholder</span>
                          <span className="font-medium text-xs sm:text-sm tracking-widest uppercase truncate max-w-[100px] sm:max-w-[140px]">{name || 'YOUR NAME'}</span>
                        </div>
                        <div className="flex flex-col">
                          <span className="text-[8px] sm:text-[9px] uppercase tracking-wider text-white/50 mb-0.5 sm:mb-1">Expires</span>
                          <span className="font-mono text-xs sm:text-sm tracking-widest">{expiry || 'MM/YY'}</span>
                        </div>
                      </div>
                      <div className="text-xl sm:text-2xl font-bold italic tracking-tighter drop-shadow-md pr-1">VISA</div>
                    </div>
                  </div>

                  {/* Back Face */}
                  <div 
                    className="absolute inset-0 rounded-2xl bg-slate-800 shadow-xl overflow-hidden flex flex-col"
                    style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
                  >
                    <div className="w-full h-10 sm:h-12 bg-black/90 mt-5 sm:mt-6" />
                    <div className="px-5 sm:px-6 mt-3 sm:mt-4 flex flex-col items-end">
                      <span className="text-[8px] sm:text-[9px] font-semibold tracking-wider text-white/70 mb-1">SECURITY CODE (CVV)</span>
                      <div className="w-full h-8 sm:h-10 bg-white rounded flex items-center justify-end px-2">
                        <div className="flex-1 h-full opacity-10 flex items-center overflow-hidden pointer-events-none">
                          {Array(10).fill(0).map((_,i) => <div key={i} className="text-[8px] sm:text-xs italic mx-1 whitespace-nowrap">AUTHORIZED SIGNATURE</div>)}
                        </div>
                        <div className="bg-slate-100 px-2 py-1 ml-2 rounded text-slate-800 font-mono font-bold tracking-widest min-w-[36px] sm:min-w-[44px] text-right text-sm">
                          {cvv || '•••'}
                        </div>
                      </div>
                      <p className="text-[7px] sm:text-[8px] text-white/30 mt-3 sm:mt-4 text-center leading-tight">
                        This card is issued by Codexr Bank pursuant to a license by Visa U.S.A. Inc. Use of this card is governed by the Cardholder Agreement.
                      </p>
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Security Badges */}
              <AnimatePresence>
                {status === 'form' && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
                    className="flex justify-center gap-3 sm:gap-4 mt-8 sm:mt-10 w-full"
                  >
                    <div className="flex items-center gap-1.5 sm:gap-2 bg-white/5 border border-white/10 text-slate-300 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-[10px] sm:text-xs font-medium shadow-sm">
                      <ShieldCheck size={14} className="text-cyan-400" />
                      <span>256-bit Encryption</span>
                    </div>
                    <div className="flex items-center gap-1.5 sm:gap-2 bg-white/5 border border-white/10 text-slate-300 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-[10px] sm:text-xs font-medium shadow-sm">
                      <Lock size={14} className="text-cyan-400" />
                      <span>Secure Checkout</span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            {/* Right Column: Payment Form */}
            <AnimatePresence>
              {status === 'form' && (
                <motion.div 
                  initial={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20, transition: { duration: 0.3 } }}
                  className="lg:w-[55%] flex flex-col w-full"
                >
                  <div className="mb-6 sm:mb-8 text-center lg:text-left">
                    <h2 className="text-xl sm:text-2xl font-bold text-white mb-1.5">Payment details</h2>
                    <p className="text-xs sm:text-sm text-slate-400">Enter your card information to complete the transaction</p>
                  </div>

                  <form onSubmit={handleSubmit} className="flex flex-col gap-4 sm:gap-5">
                    {/* Name */}
                    <div className="flex flex-col gap-1.5 sm:gap-2">
                      <label className="text-[10px] sm:text-xs font-bold tracking-wide text-slate-500">CARDHOLDER NAME</label>
                      <input 
                        type="text" 
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value.toUpperCase())}
                        onFocus={() => setIsCvvFocused(false)}
                        className="w-full px-3.5 sm:px-4 py-2.5 sm:py-3 bg-[#1c1f26]/60 border border-white/10 rounded-xl text-white text-sm placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-cyan-400 focus:border-cyan-400 transition-all shadow-inner"
                        placeholder="e.g. JOHN DOE"
                      />
                    </div>

                    {/* Number */}
                    <div className="flex flex-col gap-1.5 sm:gap-2">
                      <label className="text-[10px] sm:text-xs font-bold tracking-wide text-slate-500">CARD NUMBER</label>
                      <div className="relative">
                        <div className="absolute left-3.5 sm:left-4 top-1/2 -translate-y-1/2 text-slate-500">
                          <CreditCard size={18} />
                        </div>
                        <input 
                          type="text" 
                          required
                          maxLength={19}
                          value={number}
                          onChange={(e) => setNumber(formatCardNumber(e.target.value))}
                          onFocus={() => setIsCvvFocused(false)}
                          className={`w-full pl-10 sm:pl-11 pr-14 py-2.5 sm:py-3 bg-[#1c1f26]/60 border rounded-xl text-white text-sm placeholder-slate-500 focus:outline-none transition-all shadow-inner ${isNumberValid ? 'border-emerald-400/50 focus:ring-1 focus:ring-emerald-400/50 bg-emerald-500/5' : 'border-white/10 focus:ring-1 focus:ring-cyan-400 focus:border-cyan-400'}`}
                          placeholder="0000 0000 0000 0000"
                        />
                        <div className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2">
                          <div className="w-8 sm:w-9 h-5 sm:h-6 bg-white/5 rounded flex items-center justify-center text-[8px] sm:text-[9px] font-bold text-slate-400 italic border border-white/10">
                            VISA
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Expiry & CVV */}
                    <div className="grid grid-cols-2 gap-4 sm:gap-5">
                      <div className="flex flex-col gap-1.5 sm:gap-2">
                        <label className="text-[10px] sm:text-xs font-bold tracking-wide text-slate-500">EXPIRY DATE</label>
                        <input 
                          type="text" 
                          required
                          value={expiry}
                          onChange={(e) => setExpiry(formatExpiry(e.target.value))}
                          onFocus={() => setIsCvvFocused(false)}
                          placeholder="MM/YY"
                          className="w-full px-3.5 sm:px-4 py-2.5 sm:py-3 bg-[#1c1f26]/60 border border-white/10 rounded-xl text-white text-sm placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-cyan-400 focus:border-cyan-400 transition-all shadow-inner"
                        />
                      </div>
                      <div className="flex flex-col gap-1.5 sm:gap-2">
                        <label className="text-[10px] sm:text-xs font-bold tracking-wide text-slate-500">CVV / CVC</label>
                        <input 
                          type="text" 
                          required
                          value={cvv}
                          onChange={(e) => setCvv(formatCvv(e.target.value))}
                          onFocus={() => setIsCvvFocused(true)}
                          onBlur={() => setIsCvvFocused(false)}
                          placeholder="123"
                          maxLength={4}
                          className="w-full px-3.5 sm:px-4 py-2.5 sm:py-3 bg-[#1c1f26]/60 border border-white/10 rounded-xl text-white text-sm placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-cyan-400 focus:border-cyan-400 transition-all shadow-inner"
                        />
                      </div>
                    </div>

                    {/* Amount panel */}
                    <div className="bg-white/5 border border-white/10 rounded-xl p-3.5 sm:p-4 flex items-center justify-between mt-2 sm:mt-3 shadow-sm">
                      <span className="text-xs sm:text-sm text-slate-400 font-semibold">Payment amount:</span>
                      <span className="text-lg sm:text-xl font-bold text-cyan-400">1,234$</span>
                    </div>

                    {/* Submit button */}
                    <button 
                      type="submit"
                      disabled={status !== 'form'}
                      className="w-full mt-2 bg-cyan-400 hover:bg-cyan-500 text-black font-semibold rounded-xl py-3.5 sm:py-4 flex items-center justify-center gap-2 transition-all shadow-[0_0_15px_rgba(34,211,238,0.2)] hover:shadow-[0_0_20px_rgba(34,211,238,0.4)] active:scale-[0.98]"
                    >
                      PAY 1,234$ NOW
                      <ArrowRight size={18} />
                    </button>
                  </form>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Success / Processing Messages */}
          <AnimatePresence>
            {status !== 'form' && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.4 }}
                className="absolute left-0 right-0 bottom-12 sm:bottom-16 text-center flex flex-col items-center justify-center pointer-events-none"
              >
                <AnimatePresence mode="wait">
                  {status === 'processing' && (
                    <motion.div
                      key="processing"
                      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                      className="text-slate-400 font-medium tracking-wide"
                    >
                      Processing Secure Transaction...
                    </motion.div>
                  )}
                  {status === 'success' && (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, ease: "easeOut" }}
                      className="flex flex-col items-center"
                    >
                      <div className="w-12 h-12 sm:w-16 sm:h-16 bg-emerald-500/20 rounded-full flex items-center justify-center mb-3 sm:mb-4 text-emerald-400 shadow-sm relative">
                        <svg className="w-6 h-6 sm:w-8 sm:h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                          <motion.path 
                            d="M20 6L9 17l-5-5"
                            initial={{ pathLength: 0 }}
                            animate={{ pathLength: 1 }}
                            transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
                          />
                        </svg>
                      </div>
                      <h3 className="text-xl sm:text-2xl font-bold text-white mb-1.5 sm:mb-2">Payment Successful!</h3>
                      <p className="text-xs sm:text-sm text-slate-400 px-4">Your transaction of $1,234.00 has been processed successfully.</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )}
          </AnimatePresence>

        </div>
      </div>
    </div>
  );
}
