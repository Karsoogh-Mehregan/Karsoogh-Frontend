import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { submissionService, type Submission } from '@/services/examsService';
import { CheckCircle2, FileText, ArrowRight, RotateCw, RotateCcw } from 'lucide-react';

export default function SelectedSubmissionId() {
  const { submissionId: paramId } = useParams<{ submissionId: string }>();
  const navigate = useNavigate();
  const submissionId = Number(paramId);
  const onBack = () => navigate('/dashboard?tab=correction');
  const [submission, setSubmission] = useState<Submission | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [scoreInput, setScoreInput] = useState('');
  const [descriptionInput, setDescriptionInput] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [rotation, setRotation] = useState(0);

  useEffect(() => {
    const fetchDetailedSubmission = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const data = await submissionService.getSubmission(submissionId);
        setSubmission(data);
        if (data.grade !== null) {
          setScoreInput(String(data.grade));
        }
        if (data.description) {
          setDescriptionInput(data.description);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'خطا در دریافت اطلاعات سابمیشن.');
      } finally {
        setIsLoading(false);
      }
    };

    void fetchDetailedSubmission();
  }, [submissionId]);

  const handleSaveScore = async () => {
    const parsedScore = Number(scoreInput);
    if (scoreInput.trim() === '' || Number.isNaN(parsedScore)) return;

    setIsSaving(true);
    try {
      const updated = await submissionService.gradeSubmission(
        submissionId,
        parsedScore,
        descriptionInput,
      );
      setSubmission(updated);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'خطا در ثبت نمره.');
    } finally {
      setIsSaving(false);
    }
  };

  const rotateClockwise = () => setRotation((prev) => (prev + 90) % 360);
  const rotateCounterClockwise = () => setRotation((prev) => (prev - 90 + 360) % 360);

  const getFileExtension = (url: string) => {
    try {
      const cleanUrl = url.split('?')[0];
      return cleanUrl.split('.').pop()?.toLowerCase() || '';
    } catch {
      return '';
    }
  };

  if (isLoading)
    return (
      <p className="text-slate-400 p-6" dir="rtl">
        در حال بارگذاری جزئیات سابمیشن...
      </p>
    );
  if (error && !submission)
    return (
      <div className="p-6" dir="rtl">
        <p className="text-rose-400 bg-rose-500/10 border border-rose-500/30 rounded-xl p-3 mb-4">
          {error}
        </p>
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-white hover:text-cyan-400 transition-colors"
        >
          <ArrowRight size={16} />
        </button>
      </div>
    );

  const fileUrl = submission?.file || '';
  const fileExt = getFileExtension(fileUrl);

  return (
    <div className="lab-shell min-h-screen pt-4 lg:pt-8" dir="rtl" lang="fa">
      <main>
        <div className="p-4 md:p-8">
          <section className="mx-auto max-w-5xl">
            <div className="lab-card p-6 md:p-8">
              <div className="flex flex-col h-[calc(100vh-10rem)] gap-4">
                <div className="flex flex-col gap-4 border-b border-white/10 pb-4 shrink-0">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-4">
                      <button
                        onClick={onBack}
                        className="flex items-center justify-center p-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white transition-colors"
                        title="بازگشت"
                      >
                        <ArrowRight size={20} />
                      </button>
                      <div>
                        <h3 className="text-xl font-black text-white">
                          بررسی پاسخ شناسه {submission?.id}
                        </h3>
                        <p className="text-sm text-slate-400 mt-1">{submission?.question_name}</p>
                      </div>
                    </div>

                    {/* باکس ثبت نمره */}
                    <div className="flex items-start gap-3">
                      <div className="flex flex-col gap-2">
                        <div className="flex items-stretch bg-white/5 border border-white/10 rounded-xl overflow-hidden focus-within:border-cyan-500/50 transition-colors">
                          <div
                            className="flex items-center justify-center px-3 bg-white/10 text-sm font-bold text-slate-400 border-r border-white/10"
                            dir="ltr"
                          >
                            / {submission?.max_grade !== null ? submission?.max_grade : '-'}
                          </div>
                          <input
                            type="number"
                            value={scoreInput}
                            onChange={(e) => setScoreInput(e.target.value)}
                            placeholder="نمره"
                            disabled={isSaving}
                            className="w-24 bg-transparent px-3 py-2 text-sm text-white placeholder:text-slate-500 focus:outline-none disabled:opacity-50 no-spinner text-center"
                          />
                        </div>
                        {submission?.grade !== null && (
                          <span className="flex items-center justify-center gap-1 text-xs font-bold text-emerald-400">
                            <CheckCircle2 size={12} />
                            نمره ثبت شده: <span dir="ltr">{submission!.grade}</span>
                          </span>
                        )}
                      </div>

                      <button
                        onClick={handleSaveScore}
                        disabled={isSaving}
                        className="lab-button-primary px-4 py-2 h-[38px] rounded-xl text-sm font-bold disabled:opacity-50"
                      >
                        {isSaving ? 'در حال ثبت...' : 'ثبت'}
                      </button>
                    </div>
                  </div>

                  {/* توضیحات */}
                  <div className="w-full">
                    <textarea
                      value={descriptionInput}
                      onChange={(e) => setDescriptionInput(e.target.value)}
                      placeholder="توضیحات مصحح (اختیاری)..."
                      disabled={isSaving}
                      rows={2}
                      className="w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-cyan-500/50 disabled:opacity-50 resize-none transition-colors"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between shrink-0 w-full">
                  <a
                    href={submission?.file}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-bold text-cyan-400 hover:text-cyan-300 hover:underline flex items-center gap-1"
                  >
                    مشاهده فایل در پنجره جدید
                  </a>

                  {submission?.file && ['png', 'jpg', 'jpeg', 'gif', 'webp'].includes(fileExt) && (
                    <div className="flex items-center gap-1 bg-white/5 border border-white/10 p-1.5 rounded-xl">
                      <button
                        onClick={rotateCounterClockwise}
                        className="p-2 text-slate-300 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
                        title="چرخش پادساعتگرد"
                      >
                        <RotateCcw size={16} />
                      </button>
                      <button
                        onClick={rotateClockwise}
                        className="p-2 text-slate-300 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
                        title="چرخش ساعتگرد"
                      >
                        <RotateCw size={16} />
                      </button>
                    </div>
                  )}
                </div>

                {error && (
                  <p className="text-rose-400 bg-rose-500/10 border border-rose-500/30 rounded-xl p-3 shrink-0">
                    {error}
                  </p>
                )}

                <div className="flex-1 w-full bg-white/5 border border-white/10 rounded-2xl overflow-hidden min-h-0">
                  {submission?.file ? (
                    <div className="flex flex-col h-full p-4 gap-3">
                      {['png', 'jpg', 'jpeg', 'gif', 'webp'].includes(fileExt) ? (
                        <div className="flex-1 w-full overflow-auto flex items-center justify-center bg-slate-900 rounded-xl p-4">
                          <img
                            src={submission.file}
                            alt="پاسخ کاربر"
                            style={{ transform: `rotate(${rotation}deg)` }}
                            className="max-w-full max-h-full object-contain rounded-lg transition-transform duration-300"
                          />
                        </div>
                      ) : (
                        <div className="flex-1 w-full flex flex-col items-center justify-center gap-4 bg-slate-900 rounded-xl p-4 text-center">
                          <FileText size={48} className="text-slate-500" />
                          <p className="text-white font-bold text-sm">
                            این فرمت قابل پیش‌نمایش نdیست.
                          </p>
                          <a
                            href={submission.file}
                            download
                            className="text-xs bg-cyan-500 hover:bg-cyan-600 text-slate-900 font-bold px-4 py-2 rounded-lg transition-colors"
                          >
                            دانلود مستقیم فایل ({fileExt.toUpperCase()})
                          </a>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center h-full text-slate-400 gap-2">
                      <FileText size={48} className="text-slate-600" />
                      <p>فایلی برای این پاسخ وجود ندارد یا قابل نمایش نیست.</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
