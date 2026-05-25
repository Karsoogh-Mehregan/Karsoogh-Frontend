import { ClipboardPen, MessageSquareText } from 'lucide-react';
import { Link } from 'react-router-dom';

export function CommentSection() {
  return (
    <section id="Comment" className="scroll-mt-28 py-16 pb-24">
      <div className="lab-card grid gap-6 p-6 md:grid-cols-[1fr_auto] md:items-center md:p-8">
        <div>
          <span className="lab-kicker">
            <MessageSquareText size={15} aria-hidden="true" />
            انتقاد و پیشنهاد
          </span>
          <h2 className="mt-5 text-3xl font-black text-white">صدای شرکت‌کننده‌ها مهم است</h2>
          <p className="mt-4 max-w-3xl text-sm leading-8 text-slate-300 md:text-base">
            فرم نظر در سایت قدیمی به API همان نسخه متصل بود. در نسخه جدید، این بخش فعلاً به شکل CTA
            امن نمایش داده می‌شود و بعد از آماده شدن endpoint جدید به فرم واقعی تبدیل خواهد شد.
          </p>
        </div>
        <Link to="/login" className="lab-button-primary">
          ورود به پنل
          <ClipboardPen size={18} aria-hidden="true" />
        </Link>
      </div>
    </section>
  );
}
