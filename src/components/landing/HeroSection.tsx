import { motion } from 'framer-motion';
import { ArrowLeft, Atom } from 'lucide-react';
import { Link } from 'react-router-dom';
import { introPoints, landingAssets } from './landingData';

export function HeroSection() {
  return (
    <section
      id="Home"
      className="grid min-h-[calc(100vh-8rem)] scroll-mt-28 items-center gap-12 pb-20 lg:grid-cols-[1.02fr_0.98fr]"
    >
      <motion.div
        initial={{ opacity: 0, y: 26 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
        className="max-w-3xl"
      >
        <div className="mb-2 flex max-w-2xl items-start gap-3 text-sm font-medium text-cyan-100/90 sm:text-base">
          <div className="mt-0.5 shrink-0 rounded-lg bg-cyan-500/10 p-1.5 ring-1 ring-cyan-500/20">
            <Atom className="text-cyan-400" size={16} aria-hidden="true" />
          </div>
          <p className="leading-relaxed">
            دبیرخانه امور پژوهشی اداره استعداد های درخشان استان اصفهان با همکاری جمعی از دانش
            آموختگان سمپاد برگزار می‌نماید
          </p>
        </div>

        <h1 className="mt-7 flex flex-col gap-4 text-4xl font-black text-white sm:text-5xl lg:text-6xl">
          <span>کارسوق ریاضی مهرگان</span>
          <span>دوره ۲۶</span>
        </h1>

        <div className="mt-20 flex flex-col gap-3 sm:flex-row">
          <Link to="#About" className="lab-button-primary">
            کارسوق؟ کارسوق کیه؟
            <ArrowLeft size={18} aria-hidden="true" />
          </Link>
          <a
            href="https://form.sampad.gov.ir/sampad/formView/3097"
            target="_blank"
            rel="noopener noreferrer"
            className="lab-button-secondary"
            title="ورود به فرم ثبت‌نام"
          >
            فرم ثبت‌نام
          </a>
        </div>

        <ul className="mt-9 grid gap-3 text-sm text-slate-300 sm:grid-cols-3">
          {introPoints.map((item) => (
            <li
              key={item}
              className="rounded-2xl border border-white/10 bg-white/[0.045] p-4 leading-7"
            >
              {item}
            </li>
          ))}
        </ul>
      </motion.div>

      <motion.div
        initial={{ scale: 0.94, y: 18 }}
        animate={{ scale: 1, y: 0 }}
        transition={{ duration: 0.75, delay: 0.12, ease: 'easeOut' }}
        className="relative flex transform-gpu items-center justify-center p-8 text-center"
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.14, ease: 'easeOut' }}
          className="pointer-events-none absolute -inset-6 z-0 rounded-full bg-cyan-500/10 blur-3xl sm:-inset-16"
        />
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.22, ease: 'easeOut' }}
          className="relative z-10 w-full"
        >
          <div className="pointer-events-none absolute inset-x-0 -top-16 mx-auto h-44 w-1/2 rounded-full bg-cyan-300/10 blur-3xl" />
          <div className="pointer-events-none absolute inset-x-0 -bottom-16 mx-auto h-44 w-1/2 rounded-full bg-amber-400/5 blur-3xl" />
          <img
            src={landingAssets.bigLogo}
            alt="نشان کارسوق ریاضی مهرگان"
            className="relative mx-auto max-h-[22rem] w-full object-contain drop-shadow-[0_20px_60px_rgba(30,180,255,0.25)] sm:max-h-[30rem]"
            loading="eager"
            decoding="async"
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
