import { useState, useEffect, useCallback } from 'react';
import { FileText, CheckCircle2, ChevronRight, ChevronLeft, Search } from 'lucide-react';
import { apiClient } from '@/services/api';

type QuestionTab = 'Announcement' | 'q3' | 'q4' | 'q5';

const questionTabs: { id: QuestionTab; label: string }[] = [
  { id: 'Announcement', label: 'اطلاعیه' },
  { id: 'q3', label: 'سوال سوم' },
  { id: 'q4', label: 'سوال چهارم' },
  { id: 'q5', label: 'سوال پنجم' },
];

const questionIdMap: Record<Exclude<QuestionTab, 'Announcement'>, number> = {
  q3: 1,
  q4: 2,
  q5: 3,
};

interface Submission {
  id: number;
  user: number;
  question: number;
  question_name: string;
  exam_id: number;
  file: string;
  grade: number | null;
  max_grade: number | null;
}

interface PaginatedResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}

export default function CorrectionTab() {
  const [activeQuestion, setActiveQuestion] = useState<QuestionTab>('Announcement');
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [scoreInputs, setScoreInputs] = useState<Record<number, string>>({});
  const [savingIds, setSavingIds] = useState<Set<number>>(new Set());

  const [currentPage, setCurrentPage] = useState(1);
  const [hasNext, setHasNext] = useState(false);
  const [hasPrevious, setHasPrevious] = useState(false);

  const [searchInput, setSearchInput] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');

  const [validSearchInput, setValidSearchInput] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchInput);
      setCurrentPage(1);
    }, 500);

    return () => clearTimeout(timer);
  }, [searchInput]);

  const fetchSubmissions = useCallback(
    async (tab: Exclude<QuestionTab, 'Announcement'>, page: number, searchQuery: string) => {
      setIsLoading(true);
      setError(null);
      try {
        const questionId = questionIdMap[tab];

        let url = `/exams/submissions/?question=${questionId}&page=${page}`;
        if (searchQuery.trim() !== '') {
          url = `/exams/submissions/?id=${Number(searchQuery)}`;
        }

        const data = await apiClient.get<PaginatedResponse<Submission>>(url);
        setSubmissions(data.results || []);
        setHasNext(!!data.next);
        setHasPrevious(!!data.previous);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'خطا در دریافت اطلاعات.');
        setSubmissions([]);
        setHasNext(false);
        setHasPrevious(false);
      } finally {
        setIsLoading(false);
      }
    },
    [],
  );

  useEffect(() => {
    if (activeQuestion === 'Announcement') return;
    let isMounted = true;

    const loadData = async () => {
      if (isMounted) {
        await fetchSubmissions(activeQuestion, currentPage, debouncedSearch);
      }
    };

    void loadData();

    return () => {
      isMounted = false;
    };
  }, [activeQuestion, fetchSubmissions, currentPage, debouncedSearch]);

  const getScoreInput = (submission: Submission) =>
    scoreInputs[submission.id] ?? (submission.grade !== null ? String(submission.grade) : '');

  const handleScoreChange = (id: number, value: string) => {
    setScoreInputs((prev) => ({ ...prev, [id]: value }));
  };

  const handleSaveScore = async (submission: Submission) => {
    const rawValue = getScoreInput(submission);
    const parsedScore = Number(rawValue);
    if (rawValue.trim() === '' || Number.isNaN(parsedScore)) return;

    setSavingIds((prev) => new Set(prev).add(submission.id));

    try {
      const updated = await apiClient.post<Submission>(`/exams/submissions/${submission.id}/`, {
        grade: parsedScore,
      });

      setSubmissions((prev) => prev.map((item) => (item.id === submission.id ? updated : item)));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'خطا در ثبت نمره.');
    } finally {
      setSavingIds((prev) => {
        const next = new Set(prev);
        next.delete(submission.id);
        return next;
      });
    }
  };

  const handleTabChange = (tabId: QuestionTab) => {
    setActiveQuestion(tabId);
    setCurrentPage(1);
    setSearchInput('');
    setDebouncedSearch('');
  };

  const handleSearchInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearchInput(value);

    setValidSearchInput(true);

    if (!/^\d+$/.test(value) && value.length !== 0) {
      setValidSearchInput(false);
    }
  };

  const handleCardClick = (fileUrl: string) => {
    window.open(fileUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <div dir="rtl">
      <h2 className="text-2xl font-black text-white mb-6">تصحیح</h2>

      {/* Sub-tabs */}
      <div className="flex flex-wrap gap-2 mb-6 border-b border-white/10 pb-4">
        {questionTabs.map((tab) => {
          const isActive = activeQuestion === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => handleTabChange(tab.id)}
              className={`px-4 py-2 rounded-xl text-sm font-bold transition-colors ${
                isActive
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
                  : 'text-slate-300 hover:bg-white/5 hover:text-white border border-transparent'
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Content */}
      <div>
        {activeQuestion === 'Announcement' && (
          <p className="text-slate-400">
            این بخش برای اطلاعیه‌های مربوط به تصحیح در نظر گرفته شده است.
          </p>
        )}

        {activeQuestion !== 'Announcement' && (
          <div className="flex flex-col gap-3">
            {/* ۵. باکس سرچ در بالای سابمیشن‌ها */}
            <div className="relative w-full mb-2">
              <Search
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
                size={18}
              />
              <input
                type="text"
                value={searchInput}
                onChange={handleSearchInput}
                placeholder="جستجوی شناسه ..."
                className="w-full rounded-xl bg-white/5 border border-white/10 pr-10 pl-4 py-3 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-cyan-500/50 transition-colors"
              />
            </div>

            {!validSearchInput && (
              <p className="text-slate-400">داخل باکس جستجو فقط باید عدد باشد!</p>
            )}

            {isLoading && validSearchInput && <p className="text-slate-400">در حال بارگذاری...</p>}

            {error && !isLoading && validSearchInput && (
              <p className="text-rose-400 bg-rose-500/10 border border-rose-500/30 rounded-xl p-3">
                {error}
              </p>
            )}

            {!isLoading && !error && validSearchInput && submissions.length === 0 && (
              <p className="text-slate-400">هیچ پاسخی برای این سوال ارسال نشده است.</p>
            )}

            {!isLoading &&
              !error &&
              validSearchInput &&
              submissions.map((submission) => {
                const isSaving = savingIds.has(submission.id);
                return (
                  <div
                    key={submission.id}
                    onClick={() => handleCardClick(submission.file)}
                    className="flex flex-wrap items-center justify-between gap-4 w-full p-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-cyan-500/30 transition-colors cursor-pointer"
                    title="مشاهده فایل"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <FileText size={18} className="shrink-0 text-slate-400" />
                      <span className="font-bold text-white truncate">شناسه: {submission.id}</span>
                    </div>

                    <div
                      className="flex items-center gap-2 shrink-0"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <input
                        type="number"
                        value={getScoreInput(submission)}
                        onChange={(e) => handleScoreChange(submission.id, e.target.value)}
                        placeholder="نمره"
                        disabled={isSaving}
                        className="w-24 rounded-lg bg-white/5 border border-white/10 px-3 py-1.5 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-cyan-500/50 disabled:opacity-50 no-spinner"
                        style={{ height: '52px', width: '92px', marginLeft: '20px' }}
                      />

                      <button
                        onClick={() => handleSaveScore(submission)}
                        disabled={isSaving}
                        className="lab-button-primary px-2 py-1.5 text-sm disabled:opacity-50"
                      >
                        {isSaving ? 'در حال ثبت...' : 'ثبت نمره'}
                      </button>

                      {submission.grade !== null && (
                        <span className="flex items-center gap-1.5 text-sm font-bold text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-lg">
                          <CheckCircle2 size={14} />
                          نمره: {submission.grade}
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}

            {!isLoading && !error && validSearchInput && submissions.length > 0 && (
              <div className="flex items-center justify-center gap-4 mt-6 pt-4 border-t border-white/10">
                <button
                  onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                  disabled={!hasPrevious}
                  className="flex items-center gap-1 px-3 py-1.5 rounded-lg border border-white/10 text-sm font-medium text-slate-300 hover:bg-white/5 disabled:opacity-30 disabled:hover:bg-transparent transition-colors"
                >
                  <ChevronRight size={16} />
                  صفحه قبل
                </button>

                <span className="text-sm font-bold text-slate-400">صفحه {currentPage}</span>

                <button
                  onClick={() => setCurrentPage((prev) => prev + 1)}
                  disabled={!hasNext}
                  className="flex items-center gap-1 px-3 py-1.5 rounded-lg border border-white/10 text-sm font-medium text-slate-300 hover:bg-white/5 disabled:opacity-30 disabled:hover:bg-transparent transition-colors"
                >
                  صفحه بعد
                  <ChevronLeft size={16} />
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
