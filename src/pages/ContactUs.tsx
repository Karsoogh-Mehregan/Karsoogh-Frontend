import React from 'react';
import { motion } from 'framer-motion';
import { FaInstagram, FaTelegramPlane } from 'react-icons/fa';
import { Phone, Copy, Check, ExternalLink } from 'lucide-react';
import toast from 'react-hot-toast';

import Navbar from '@/components/Navbar';
import { XOCanvas } from '@/components/XOCanvas';

import gilImage from '@/assets/landing/Images/gil.png';
import aparatIcon from '@/assets/social-icons/aparat.svg';
import eitaaIcon from '@/assets/social-icons/eitaa.svg';
import baleIcon from '@/assets/social-icons/bale.svg';
import rubikaIcon from '@/assets/social-icons/rubika.svg';
import siteIcon from '@/assets/social-icons/icon.jpg';
import siteIcon2 from '@/assets/social-icons/icon2.jpg';

export default function ContactUs() {
  const [copied, setCopied] = React.useState(false);

  const handleCopyPhone = () => {
    navigator.clipboard.writeText('+989981394102');
    setCopied(true);
    toast.success('شماره تماس کارسوق کپی شد!');
    setTimeout(() => setCopied(false), 2000);
  };

  const socialMediaList = [
    {
      name: 'اینستاگرام',
      icon: <FaInstagram size={26} className="text-[#C13584]" />,
      href: 'https://www.instagram.com/accounts/login/?next=https%3A%2F%2Fwww.instagram.com%2F%25D8%25AF%25D8%25B1%2520%25D8%25AE%25D8%25AF%25D9%2585%25D8%25AA%25D8%25AA%25D9%2588%25D9%2586%2520%25D9%2587%25D8%25B3%25D8%25AA%25DB%258C%25D9%2585%2520%25D8%25A8%25D8%25A7%2520%25D9%25BE%25D8%25A7%25D8%25B3%25D8%25AE%2520%25D9%2587%25D8%25B4%25D8%25AA%25D9%2585%25DB%258C%25D9%2586%2520%25DA%2586%25D8%25A7%25D9%2584%25D8%25B4%2520%25D9%2587%25D9%2581%25D8%25AA%25DA%25AF%25DB%258C%2520%25DA%25A9%25D8%25A7%25D8%25B1%25D8%25B3%25D9%2588%25D9%2582%25F0%259F%25A5%25B3%2520%25D9%2585%25D9%2586%25D8%25AA%25D8%25B8%25D8%25B1%2520%25D8%25A7%25D8%25B9%25D9%2584%25D8%25A7%25D9%2585%2520%25D8%25A8%25D8%25B1%25D9%2586%25D8%25AF%25D9%2587%2520%25D8%25A8%25D8%25A7%25D8%25B4%25DB%258C%25D9%2586%2520%25D8%25A8%25D8%25A8%25DB%258C%25D9%2586%25DB%258C%25D9%2585%2520%25D8%25A7%25DB%258C%25D9%2586%2520%25D9%2587%25D9%2581%25D8%25AA%25D9%2587%2520%25D8%25AE%25D9%2588%25D8%25B4%2520%25D8%25B4%25D8%25A7%25D9%2586%25D8%25B3%2520%25D9%2587%25D8%25A7%25DB%258C%2520%25DA%25A9%25D8%25A7%25D8%25B1%25D8%25B3%25D9%2588%25D9%2582%25DB%258C%25D9%2585%25D9%2588%25D9%2586%2520%25DA%25A9%25DB%258C%25D8%25A7%25D9%2586%25F0%259F%2598%2581%2520%2520%25F0%259F%2594%25B5%2520%25D8%25AA%25D9%2588%25D8%25AC%25D9%2587%2520%25D8%25AF%25D8%25A7%25D8%25B4%25D8%25AA%25D9%2587%2520%25D8%25A8%25D8%25A7%25DB%258C%25D8%25AF%2520%25DA%25A9%25D9%2587%2520%25D8%25A7%25DB%258C%25D9%2586%2520%25D9%2587%25D9%2581%25D8%25AA%25D9%2587%2520%25D8%25A8%25D8%25AE%25D8%25A7%25D8%25B7%25D8%25B1%2520%25D8%25AB%25D8%25A8%25D8%25A7%E2%2580%258C%25D9%2586%25D8%25A7%25D9%2585%2520%25DA%25A9%25D8%25A7%25D8%25B1%25D8%25B3%25D9%2588%25D9%2582%2520%25DA%2586%25D8%25A7%25D9%2584%25D8%25B4%2520%25D9%2587%25D9%2581%25D8%25AA%25DA%25AF%25DB%258C%2520%25D9%2586%25D8%25AF%25D8%25A7%25D8%25B1%25DB%258C%25D9%2585.%2520%2520%25F0%259F%2593%25B2%25D8%25A7%25DB%258C%25D9%2586%25D8%25B3%25D8%25AA%25D8%25A7%25DA%25AF%25D8%25B1%25D8%25A7%25D9%2585%257C%25D8%25AA%25D9%2584%25DA%25AF%25D8%25B1%25D8%25A7%25D9%2585%257C%25D8%25B3%25D8%25A7%25DB%258C%25D8%25AA%257C%25D8%25A7%25DB%258C%25D8%25AA%25D8%25A7%257C%25D8%25A8%25D9%2584%25D9%2587%2F&is_from_rle',
      borderColor: 'hover:border-pink-500/40 hover:bg-pink-500/5',
      glowColor: 'hover:shadow-[0_0_24px_rgba(236,72,153,0.15)]',
    },
    {
      name: 'تلگرام',
      icon: <FaTelegramPlane size={26} className="text-[#0088cc]" />,
      href: 'https://t.me/karsooghmehregan',
      borderColor: 'hover:border-sky-500/40 hover:bg-sky-500/5',
      glowColor: 'hover:shadow-[0_0_24px_rgba(56,189,248,0.15)]',
    },
    {
      name: 'آپارات',
      icon: <img src={aparatIcon} alt="Aparat" className="h-6 w-6" />,
      href: 'https://www.aparat.com/karsooghmehregan.ir',
      borderColor: 'hover:border-rose-500/40 hover:bg-rose-500/5',
      glowColor: 'hover:shadow-[0_0_24px_rgba(244,63,94,0.15)]',
    },
    {
      name: 'ایتا',
      icon: <img src={eitaaIcon} alt="Eitaa" className="h-6 w-6" />,
      href: 'https://eitaa.com/s/karsooghmehregan',
      borderColor: 'hover:border-orange-500/40 hover:bg-orange-500/5',
      glowColor: 'hover:shadow-[0_0_24px_rgba(249,115,22,0.15)]',
    },
    {
      name: 'روبیکا',
      icon: <img src={rubikaIcon} alt="Rubika" className="h-6 w-6" />,
      href: 'https://rubika.ir/karsooghmehregan',
      borderColor: 'hover:border-purple-500/40 hover:bg-purple-500/5',
      glowColor: 'hover:shadow-[0_0_24px_rgba(168,85,247,0.15)]',
    },
    {
      name: 'بله',
      icon: <img src={baleIcon} alt="Bale" className="h-6 w-6" />,
      href: 'https://ble.ir/karsooghmehregan',
      borderColor: 'hover:border-emerald-500/40 hover:bg-emerald-500/5',
      glowColor: 'hover:shadow-[0_0_24px_rgba(16,185,129,0.15)]',
    },
    {
      name: 'سایت سمپاد',
      icon: <img src={siteIcon} alt="siteIcon" className="h-6 w-6 rounded-md object-cover" />,
      href: 'https://mehregan.sampad.gov.ir/',
      borderColor: 'hover:border-amber-500/40 hover:bg-amber-500/5',
      glowColor: 'hover:shadow-[0_0_24px_rgba(245,158,11,0.15)]',
    },
    {
      name: 'سایت مستقل',
      icon: <img src={siteIcon2} alt="siteIcon2" className="h-6 w-6 rounded-md object-cover" />,
      href: 'https://karsooghmehregan.ir/',
      borderColor: 'hover:border-cyan-500/40 hover:bg-cyan-500/5',
      glowColor: 'hover:shadow-[0_0_24px_rgba(6,182,212,0.15)]',
    },
  ];

  return (
    <div className="lab-shell min-h-screen" dir="rtl" lang="fa">
      <Navbar />
      <XOCanvas />

      <main className="lab-container relative pt-32 pb-20 md:pt-40">
        <div className="absolute inset-x-0 top-0 mx-auto h-52 max-w-4xl bg-cyan-500/10 blur-[100px] pointer-events-none" />

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 items-start">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.55 }}
            className="hidden lg:flex lg:col-span-5 justify-center"
          >
            <div className="lab-card overflow-hidden p-3 w-full max-w-md lg:max-w-none transition-all duration-300 hover:border-cyan-500/30">
              <div className="relative rounded-[1rem] overflow-hidden bg-slate-950/40 border border-white/5 aspect-[4/5] flex items-center justify-center">
                <img
                  src={gilImage}
                  alt="کارسوق ریاضی مهرگان"
                  className="w-full object-cover transition-transform duration-700 hover:scale-105"
                />
              </div>
            </div>
          </motion.div>

          {/* Left Section: Info and Links grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.1 }}
            className="lg:col-span-7 space-y-6"
          >
            <div className="lab-card p-6 sm:p-8">
              <div className="mb-6">
                <span className="lab-kicker mb-3">ارتباط با ما</span>
                <h1 className="text-3xl font-black text-white leading-tight">
                  شبکه‌های اجتماعی کارسوق
                </h1>
                <p className="mt-3 text-slate-400 text-sm leading-7">
                  برای اطلاع از آخرین اخبار چالش‌ها، رویدادها و ارتباط با کادر برگزاری، ما را در
                  شبکه‌های اجتماعی زیر دنبال کنید.
                </p>
              </div>

              {/* Grid of Interactive Social Cards */}
              <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4">
                {socialMediaList.map((item, index) => (
                  <motion.a
                    key={index}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ y: -3 }}
                    whileTap={{ scale: 0.98 }}
                    className={`flex flex-col items-center justify-center p-4 rounded-2xl border border-white/10 bg-slate-950/20 text-center transition-all duration-300 group ${item.borderColor} ${item.glowColor}`}
                  >
                    <div className="mb-3 p-3 rounded-xl bg-slate-900 border border-white/5 group-hover:bg-slate-900/10 group-hover:scale-110 transition-all duration-300">
                      {item.icon}
                    </div>
                    <span className="text-xs font-bold text-slate-300 group-hover:text-white transition-colors duration-200">
                      {item.name}
                    </span>
                    <span className="mt-1 opacity-0 group-hover:opacity-100 text-[10px] text-cyan-400 flex items-center gap-0.5 transition-all duration-300">
                      مشاهده <ExternalLink size={10} />
                    </span>
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Support Call Card */}
            <motion.div
              whileHover={{ y: -2 }}
              className="lab-card p-6 flex flex-col sm:flex-row items-center justify-between gap-6 transition-all duration-300 hover:border-amber-500/30"
            >
              <div className="flex items-center gap-4 text-center sm:text-right">
                <div className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-400">
                  <Phone size={24} />
                </div>
                <div>
                  <h3 className="text-lg font-extrabold text-white">شماره تماس کارسوق</h3>
                  <p className="text-xs text-slate-400 mt-1">پاسخگوی سوالات و ابهامات شما هستیم</p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
                <button
                  onClick={handleCopyPhone}
                  className="flex items-center justify-center gap-2 bg-white/[0.06] hover:bg-white/[0.1] border border-white/10 text-white font-bold px-5 py-3 rounded-xl transition duration-200 w-full sm:w-auto text-sm active:scale-[0.98]"
                >
                  {copied ? <Check size={16} className="text-emerald-400" /> : <Copy size={16} />}
                  <span dir="ltr">+۹۸ ۹۹۸ ۱۳۹ ۴۱۰۲</span>
                </button>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </main>
    </div>
  );
}
