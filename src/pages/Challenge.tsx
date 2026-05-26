import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import Navbar from '@/components/Navbar';
import { challengeService } from '@/services/challengeService';

export function Challenge() {
  const { slug } = useParams();
  const [currentSlug, setCurrentSlug] = useState<string | null>(slug || null);
  const [pageTitle, setPageTitle] = useState('');
  const [description, setDescription] = useState('');
  const [regex, setRegex] = useState('');
  const [loading, setLoading] = useState(false);
  const [fieldsData, setFieldsData] = useState({
    firstname: '',
    lastname: '',
    phone: '',
    city: '',
    school: '',
    grade: '7',
    message: '',
  });

  useEffect(() => {
    if (slug) {
      setCurrentSlug(slug);
    } else {
      challengeService
        .getLatestChallenge()
        .then((latestChallenge) => {
          setCurrentSlug(latestChallenge.slug);
          setPageTitle(latestChallenge.title);
          setDescription(latestChallenge.description);
          if (latestChallenge.regex) setRegex(latestChallenge.regex);
        })
        .catch((error) => {
          console.error('Error fetching latest challenge:', error);
          setPageTitle('');
          setCurrentSlug(null);
          toast.remove();
          toast.error(error.message || 'خطا در دریافت چالش فعال');
        });
    }
  }, [slug]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!currentSlug) {
      toast.remove();
      toast.error('چالشی اکنون فعال نیست!');
      return;
    }
    if (!fieldsData.city) {
      toast.remove();
      toast.error('شهر نمیتواند خالی باشد');
      return;
    }
    if (!fieldsData.school) {
      toast.remove();
      toast.error('مدرسه نمیتواند خالی باشد');
      return;
    }
    if (!fieldsData.firstname) {
      toast.remove();
      toast.error('نام نمیتواند خالی باشد');
      return;
    }
    if (!fieldsData.lastname) {
      toast.remove();
      toast.error('نام خانوادگی نمیتواند خالی باشد');
      return;
    }
    if (fieldsData.phone.length !== 11) {
      toast.remove();
      toast.error('شماره تلفن نامعتبر');
      return;
    }
    if (!fieldsData.message) {
      toast.remove();
      toast.error('پاسخ خود را بنویسید');
      return;
    }
    if (regex && !new RegExp(regex).test(fieldsData.message)) {
      toast.remove();
      toast.error('پاسخ نامعتبر');
      return;
    }

    try {
      setLoading(true);
      const params = new FormData();
      params.append('firstname', fieldsData.firstname);
      params.append('lastname', fieldsData.lastname);
      params.append('phone', fieldsData.phone);
      params.append('city', fieldsData.city);
      params.append('school', fieldsData.school);
      params.append('grade', fieldsData.grade);
      if (fieldsData.message) {
        params.append('answer_text', fieldsData.message);
      }

      await challengeService.submitChallenge(currentSlug, params);
      setFieldsData({
        firstname: '',
        lastname: '',
        phone: '',
        city: '',
        school: '',
        grade: '7',
        message: '',
      });
      toast.success('پاسخ شما ثبت شد');
    } catch (error) {
      const err = error as Error;
      console.error(err);
      toast.error(err.message || 'خطا در ارسال پاسخ');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFieldsData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div
      className="min-h-screen bg-slate-950 text-white font-sans selection:bg-cyan-500/30"
      dir="rtl"
    >
      <Navbar />
      <main className="mx-auto max-w-4xl px-4 py-24 sm:px-6">
        <h1 className="text-center text-3xl font-black md:text-5xl">
          {pageTitle ? `چالش ${pageTitle}` : 'چالشی فعال نیست!'}
        </h1>

        {description && (
          <div
            className="mt-8 rounded-2xl border border-cyan-500/20 bg-cyan-950/20 p-6 text-slate-300 shadow-xl"
            dangerouslySetInnerHTML={{ __html: description }}
          />
        )}

        <form onSubmit={handleSubmit} className="lab-card mt-12 overflow-hidden p-6 md:p-8">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <div>
              <label htmlFor="firstname" className="mb-2 block text-sm font-bold text-slate-300">
                نام
              </label>
              <input
                id="firstname"
                name="firstname"
                type="text"
                value={fieldsData.firstname}
                onChange={handleInputChange}
                className="w-full rounded-xl border border-white/10 bg-slate-900/50 p-3 text-white placeholder-slate-500 focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500"
                placeholder="نام خود را وارد کنید"
              />
            </div>
            <div>
              <label htmlFor="lastname" className="mb-2 block text-sm font-bold text-slate-300">
                نام خانوادگی
              </label>
              <input
                id="lastname"
                name="lastname"
                type="text"
                value={fieldsData.lastname}
                onChange={handleInputChange}
                className="w-full rounded-xl border border-white/10 bg-slate-900/50 p-3 text-white placeholder-slate-500 focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500"
                placeholder="نام خانوادگی خود را وارد کنید"
              />
            </div>
            <div>
              <label htmlFor="phone" className="mb-2 block text-sm font-bold text-slate-300">
                شماره تلفن
              </label>
              <input
                id="phone"
                name="phone"
                type="tel"
                value={fieldsData.phone}
                onChange={handleInputChange}
                className="w-full rounded-xl border border-white/10 bg-slate-900/50 p-3 text-white placeholder-slate-500 focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500"
                placeholder="۰۹۱۲۳۴۵۶۷۸۹"
                dir="ltr"
              />
            </div>
            <div>
              <label htmlFor="city" className="mb-2 block text-sm font-bold text-slate-300">
                شهر
              </label>
              <input
                id="city"
                name="city"
                type="text"
                value={fieldsData.city}
                onChange={handleInputChange}
                className="w-full rounded-xl border border-white/10 bg-slate-900/50 p-3 text-white placeholder-slate-500 focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500"
                placeholder="مثلاً اصفهان"
              />
            </div>
            <div>
              <label htmlFor="school" className="mb-2 block text-sm font-bold text-slate-300">
                مدرسه
              </label>
              <input
                id="school"
                name="school"
                type="text"
                value={fieldsData.school}
                onChange={handleInputChange}
                className="w-full rounded-xl border border-white/10 bg-slate-900/50 p-3 text-white placeholder-slate-500 focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500"
                placeholder="نام مدرسه"
              />
            </div>
            <div>
              <label htmlFor="grade" className="mb-2 block text-sm font-bold text-slate-300">
                پایه تحصیلی
              </label>
              <select
                id="grade"
                name="grade"
                value={fieldsData.grade}
                onChange={handleInputChange}
                className="w-full rounded-xl border border-white/10 bg-slate-900/50 p-3 text-white focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500"
              >
                <option value="7" className="bg-slate-900">
                  هفتم
                </option>
                <option value="8" className="bg-slate-900">
                  هشتم
                </option>
                <option value="9" className="bg-slate-900">
                  نهم
                </option>
              </select>
            </div>
            <div className="md:col-span-2 lg:col-span-3">
              <label htmlFor="message" className="mb-2 block text-sm font-bold text-slate-300">
                متن پاسخ
              </label>
              <textarea
                id="message"
                name="message"
                rows={5}
                value={fieldsData.message}
                onChange={handleInputChange}
                className="w-full resize-y rounded-xl border border-white/10 bg-slate-900/50 p-3 text-white placeholder-slate-500 focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500"
                placeholder="پاسخ خود را بنویسید ..."
              ></textarea>
            </div>
          </div>
          <div className="mt-8 flex justify-end">
            <button
              type="submit"
              disabled={loading}
              className="lab-button-primary w-full disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
            >
              {loading ? 'در حال ارسال ...' : 'ارسال پاسخ'}
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}
