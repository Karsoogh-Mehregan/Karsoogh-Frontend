import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router';
import { FileText, CheckCircle2, ChevronRight, ChevronLeft, Search } from 'lucide-react';
import {
  submissionService,
  type Submission,
  type FilterType,
  type Question,
} from '@/services/examsService';

export default function CorrectionTab() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [activeQuestion, setActiveQuestion] = useState<number | null>(null);
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [hasNext, setHasNext] = useState(false);
  const [hasPrevious, setHasPrevious] = useState(false);

  const [searchInput, setSearchInput] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [validSearchInput, setValidSearchInput] = useState(true);

  const navigate = useNavigate();

  const [filterStatus, setFilterStatus] = useState<FilterType>('all');

  useEffect(() => {
    let isMounted = true;
    const fetchQuestions = async () => {
      try {
        const data = await submissionService.listQuestions();
        if (isMounted) {
          setQuestions(data.results || []);
          if (data.results && data.results.length > 0) {
            setActiveQuestion(data.results[0].id);
          }
        }
      } catch (err) {
        console.error('Failed to fetch questions:', err);
      }
    };
    void fetchQuestions();
    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchInput);
      setCurrentPage(1);
    }, 500);

    return () => clearTimeout(timer);
  }, [searchInput]);

  const fetchSubmissions = useCallback(
    async (questionId: number, page: number, searchQuery: string, filter: FilterType) => {
      setIsLoading(true);
      setError(null);
      try {
        const searchId = searchQuery.trim() !== '' ? Number(searchQuery) : undefined;

        const data = await submissionService.listSubmissions({
          questionId,
          page,
          filter,
          searchId,
        });
        setSubmissions(data.results || []);
        setTotalCount(data.count || 0);
        setHasNext(!!data.next);
        setHasPrevious(!!data.previous);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'خطا در دریافت اطلاعات.');
        setSubmissions([]);
        setTotalCount(0);
        setHasNext(false);
        setHasPrevious(false);
      } finally {
        setIsLoading(false);
      }
    },
    [],
  );

  useEffect(() => {
    if (activeQuestion === null) return;
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

  const handleTabChange = (questionId: number) => {
    setActiveQuestion(questionId);
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
        {questions.map((q) => {
          const isActive = activeQuestion === q.id;
          return (
            <button
              key={q.id}
              onClick={() => handleTabChange(q.id)}
              className={`px-4 py-2 rounded-xl text-sm font-bold transition-colors ${
                isActive
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
                  : 'text-slate-300 hover:bg-white/5 hover:text-white border border-transparent'
              }`}
            >
              {q.sign_name}
            </button>
          );
        })}
      </div>

      {/* Content */}
      <div>
        {activeQuestion !== null && (
          <div className="flex flex-col gap-3">
            <div className="flex justify-start gap-3">
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

              <div className="relative">
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

              {!isLoading && !error && validSearchInput && submissions.length > 0 && (
                <div className="flex items-center gap-2 text-sm text-slate-400">
                  <span className="bg-white/5 border border-white/10 px-2.5 py-1 rounded-lg font-bold text-slate-300">
                    {totalCount}
                  </span>
                  <span>پاسخ</span>
                </div>
              )}
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
                          نمره:{' '}
                          <span dir="ltr">
                            {submission.grade}
                            {submission.max_grade !== null && ` / ${submission.max_grade}`}
                          </span>
                        </span>
                      )}
                      {submission.grade === null && submission.max_grade !== null && (
                        <span className="text-sm font-bold text-slate-400 bg-white/5 px-3 py-1 rounded-lg">
                          حداکثر: <span dir="ltr">{submission.max_grade}</span>
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
