import bigLogo from '@/assets/landing/Heading/Big_Logo.svg';
import galleryGil from '@/assets/landing/Images/gil.png';
import galleryGil2 from '@/assets/landing/Images/gil2.jpg';
import poster from '@/assets/landing/Images/poster.jpg';
import alaRafiei from '@/assets/landing/Images/آلا_رفیعی.jpg';
import kamyarDelvi from '@/assets/landing/Images/کامیار_دلوی.jpg';
import khorshidBahoush from '@/assets/landing/Images/خورشید_باهوش.jpg';
import mahsaGhasemi from '@/assets/landing/Images/مهسا_قاسمی.jpg';
import mohammadFarhadi from '@/assets/landing/Images/محمد_فرهادی.jpg';
import mohammadHabib from '@/assets/landing/Images/محمد_حبیب_جعفرزاده.jpg';
import maryamKolbasi from '@/assets/landing/Images/مریم_کلباسی.jpg';
import melikaMoshrefi from '@/assets/landing/Images/ملیکا_مشرفی.jpg';
import sajadFathian from '@/assets/landing/Images/سجاد_فتحیان.jpg';
import soroushSatari from '@/assets/landing/Images/سروش_ستاری.jpg';
import aliAlmasi from '@/assets/landing/Images/علی_الماسی.jpg';

export const landingAssets = {
  bigLogo,
  galleryGil2,
  poster,
};

export const introPoints = [
  'رویدادی علمی و تعاملی برای دیدن چهره‌ی واقعی‌تر ریاضی',
  'برگزارشده توسط دانش‌آموزان و دانشجویان نه‌چندان بزرگ‌تر از شرکت‌کنندگان',
  'برای دانش‌آموزان سمپادی دبیرستان دوره اول متوسطه؛ پایه‌های هفتم، هشتم و نهم',
];

export const timelineItems = [
  { title: 'ثبت‌نام', detail: 'تاریخ جدید ثبت‌نام اطلاع‌رسانی خواهد شد.' },
  { title: 'مرحله اول', detail: 'آغاز ماجراجویی ریاضی با مسئله‌هایی متفاوت از امتحان‌های مدرسه.' },
  { title: 'مرحله دوم', detail: 'مسیر عمیق‌تر برای راه‌یافتگان و علاقه‌مندان جدی‌تر.' },
  {
    title: 'مرحله نهایی حضوری',
    detail: 'تجربه‌ی حضوری کارسوق ریاضی در اصفهان برای راه‌یافتگان دوره تابستانه.',
  },
];

export const faqItems = [
  {
    question: 'کارسوق چیه؟',
    answer:
      'کارسوق یا همان Workshop جایی است که دور هم جمع می‌شویم تا چیزهای تازه یاد بگیریم و کارهای جذاب انجام بدهیم. در کارسوق ریاضی مهرگان قرار است در کنار هم در دنیای ریاضیات سفر کنیم و جور دیگری به آن نگاه کنیم.',
  },
  {
    question: 'دانش‌آموزای چه پایه‌هایی می‌تونن ثبت‌نام کنن؟',
    answer:
      'همه‌ی دانش‌آموزان سمپادی دبیرستان دوره اول متوسطه، یعنی پایه‌های هفتم، هشتم و نهم، می‌توانند در کارسوق ثبت‌نام کنند.',
  },
  {
    question: 'چجوری باید ثبت‌نام کنم؟',
    answer:
      'تاریخ و مسیر ثبت‌نام دوره جدید از همین سایت اطلاع‌رسانی می‌شود. در حال حاضر ثبت‌نام فعال نیست.',
  },
  {
    question: 'جایزه هم داره؟',
    answer:
      'بله. راه‌یافتگان به مرحله تابستانه یادبودی از طرف تیم کارسوق دریافت می‌کنند و به دانش‌آموزان برتر نیز جوایز ارزنده‌ای تعلق می‌گیرد.',
  },
  {
    question: 'چند مرحله آزمون باید بدیم؟',
    answer:
      'کارسوق به‌صورت چندمرحله‌ای برگزار می‌شود و راه‌یافتگان به دوره تابستانه، کارسوق ریاضی را به شکل حضوری تجربه می‌کنند.',
  },
];

export const galleryItems = [
  { title: 'پوستر دوره', image: poster, caption: 'نشانه‌های تصویری دوره ۲۶ کارسوق ریاضی مهرگان' },
  {
    title: 'حال‌وهوای رویداد',
    image: galleryGil2,
    caption: 'گوشه‌ای از فضای تعاملی و گروهی کارسوق',
  },
  { title: 'مسیر یادگیری', image: galleryGil, caption: 'ریاضی به شکل تجربه، گفت‌وگو و مسئله' },
];

export const teamMembers = [
  { fullName: 'کامیار دلوی', image: kamyarDelvi, role: 'بیگ باس (مسئول کل رویداد)' },
  { fullName: 'محمد حبیب جعفرزاده', image: mohammadHabib, role: 'دبیر' },
  { fullName: 'ملیکا مشرفی', image: melikaMoshrefi, role: 'دبیر' },
  { fullName: 'آلا رفیعی', image: alaRafiei, role: 'نایب دبیر' },
  { fullName: 'خورشید باهوش', image: khorshidBahoush, role: 'مسئول علمی' },
  { fullName: 'سجاد فتحیان', image: sajadFathian, role: 'مسئول علمی' },
  { fullName: 'علی الماسی', image: aliAlmasi, role: 'مسئول فنی' },
  { fullName: 'مهسا قاسمی', image: mahsaGhasemi, role: 'مسئول رسانه' },
  { fullName: 'مریم کلباسی', image: maryamKolbasi, role: 'مسئول روابط عمومی' },
  { fullName: 'سروش ستاری', image: soroushSatari, role: 'مسئول توسعه' },
  { fullName: 'محمد فرهادی', image: mohammadFarhadi, role: 'مسئول سناریو' },
];
