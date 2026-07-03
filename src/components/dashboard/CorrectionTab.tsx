import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { FileText, CheckCircle2, ChevronRight, ChevronLeft, Search } from 'lucide-react';
import { submissionService, type Submission, type FilterType } from '@/services/submissionService';

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

export default function CorrectionTab() {
  const [activeQuestion, setActiveQuestion] = useState<QuestionTab>('Announcement');
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [currentPage, setCurrentPage] = useState(1);
  const [hasNext, setHasNext] = useState(false);
  const [hasPrevious, setHasPrevious] = useState(false);

  const [searchInput, setSearchInput] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [validSearchInput, setValidSearchInput] = useState(true);

  const navigate = useNavigate();

  const [filterStatus, setFilterStatus] = useState<FilterType>('all');

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchInput);
      setCurrentPage(1);
    }, 500);

    return () => clearTimeout(timer);
  }, [searchInput]);

  const fetchSubmissions = useCallback(
    async (
      tab: Exclude<QuestionTab, 'Announcement'>,
      page: number,
      searchQuery: string,
      filter: FilterType,
    ) => {
      setIsLoading(true);
      setError(null);
      try {
        const questionId = questionIdMap[tab];
        const searchId = searchQuery.trim() !== '' ? Number(searchQuery) : undefined;

        const data = await submissionService.listSubmissions({
          questionId,
          page,
          filter,
          searchId,
        });
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
        await fetchSubmissions(activeQuestion, currentPage, debouncedSearch, filterStatus);
      }
    };

    void loadData();

    return () => {
      isMounted = false;
    };
  }, [activeQuestion, fetchSubmissions, currentPage, debouncedSearch, filterStatus]);

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

  const handleCardClick = (id: number) => {
    navigate(`/dashboard/submission/${id}`);
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
            <div className="flex justify-start">
              <div className="flex items-center gap-1.5 bg-white/5 border border-white/10 p-1 rounded-xl w-fit ">
                <button
                  onClick={() => {
                    setFilterStatus('all');
                    setCurrentPage(1);
                  }}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    filterStatus === 'all'
                      ? 'bg-white/10 text-white border border-white/10'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  همه پاسخ‌ها
                </button>
                <button
                  onClick={() => {
                    setFilterStatus('graded');
                    setCurrentPage(1);
                  }}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    filterStatus === 'graded'
                      ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                      : 'text-slate-400 hover:text-emerald-400'
                  }`}
                >
                  تصحیح شده
                </button>
                <button
                  onClick={() => {
                    setFilterStatus('ungraded');
                    setCurrentPage(1);
                  }}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    filterStatus === 'ungraded'
                      ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                      : 'text-slate-400 hover:text-amber-400'
                  }`}
                >
                  منتظر تصحیح
                </button>
              </div>

              <div className="relative mr-2">
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
                return (
                  <div
                    key={submission.id}
                    onClick={() => handleCardClick(submission.id)}
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
