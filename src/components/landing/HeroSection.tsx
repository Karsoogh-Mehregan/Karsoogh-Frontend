import { motion } from 'framer-motion';
import { ArrowLeft, Atom } from 'lucide-react';
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
        <span className="lab-kicker">
          <Atom size={15} aria-hidden="true" />
          دبیرخانه امور پژوهشی سازمان استعدادهای درخشان استان اصفهان
        </span>

        <h1 className="mt-7 text-4xl font-black leading-[1.25] text-white sm:text-5xl lg:text-6xl">
          کارسوق ریاضی مهرگان، دوره ۲۶
        </h1>

        <p className="mt-6 max-w-2xl text-base leading-8 text-slate-300 sm:text-lg">
          با همکاری دانش‌آموختگان سمپاد استان برگزار می‌شود؛ رویدادی برای تجربه‌ی ریاضی بیرون از
          قالب‌های خشک امتحان، نمره و کلاس‌های معمول.
        </p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <a href="#About" className="lab-button-primary">
            کارسوق؟ کارسوق کیه؟
            <ArrowLeft size={18} aria-hidden="true" />
          </a>
          <button
            type="button"
            className="lab-button-secondary"
            disabled
            title="تاریخ جدید ثبت‌نام اطلاع‌رسانی خواهد شد"
          >
            تاریخ ثبت‌نام به‌زودی
          </button>
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
        className="relative transform-gpu"
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.14, ease: 'easeOut' }}
          className="pointer-events-none absolute -inset-8 z-0 rounded-[3rem] bg-cyan-300/10 blur-3xl"
        />
        <div className="lab-card relative z-10 overflow-hidden p-5 sm:p-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.55, delay: 0.22, ease: 'easeOut' }}
            className="relative grid min-h-80 place-items-center overflow-hidden rounded-3xl border border-white/10 bg-slate-950/45 p-8 sm:min-h-[28rem]"
          >
            <div className="pointer-events-none absolute -left-16 -top-16 h-44 w-44 rounded-full bg-cyan-300/10 blur-2xl" />
            <div className="pointer-events-none absolute -bottom-20 right-8 h-48 w-48 rounded-full bg-amber-300/10 blur-3xl" />
            <img
              src={landingAssets.bigLogo}
              alt="نشان کارسوق ریاضی مهرگان"
              className="relative mx-auto max-h-72 w-full object-contain drop-shadow-[0_22px_52px_rgba(57,211,255,0.18)] sm:max-h-80"
              loading="eager"
              decoding="async"
            />
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
