import { resourceService, type DashboardResource } from '@/services/resourceService';
import { AlertCircle, ExternalLink, FolderOpen, Sparkles } from 'lucide-react';
import { useEffect, useState } from 'react';
import Skeleton from '@/components/Skeleton';

function ResourcesSkeleton() {
  return (
    <div className="animate-[fadeIn_0.3s_ease-out]">
      {/* Header bone */}
      <Skeleton.Bone width="35%" height="1.25rem" className="mb-6" />

      {/* Video cards grid */}
      <div className="grid gap-5 sm:grid-cols-2 mb-5">
        {[0, 1].map((i) => (
          <div key={i} className="rounded-[1.25rem] border border-white/[0.08] overflow-hidden">
            <Skeleton.Bone
              width="100%"
              height="0"
              borderRadius={0}
              className="!rounded-none aspect-video"
            />
            <div className="p-4 space-y-3">
              <Skeleton.Bone width="60%" height="1rem" />
              <Skeleton.Text lines={2} lastLineWidth="80%" />
            </div>
          </div>
        ))}
      </div>

      {/* Link cards */}
      <div className="flex flex-col gap-3">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="flex items-center gap-4 p-4 rounded-[1.25rem] border border-white/[0.08]"
          >
            <Skeleton.Bone width={48} height={48} borderRadius="0.75rem" className="shrink-0" />
            <div className="flex-1 space-y-2">
              <Skeleton.Bone width="45%" height="1rem" />
              <Skeleton.Bone width="70%" height="0.75rem" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function VideoPlayer({ resource }: { resource: DashboardResource }) {
  if (resource.type === 'video_direct') {
    return (
      <video
        src={resource.url}
        controls
        className="h-full w-full rounded-lg"
        poster={resource.thumbnail}
      />
    );
  }

  return (
    <iframe
      src={resource.url}
      allowFullScreen
      className="h-full w-full border-none outline-none rounded-lg"
      title={resource.title}
    />
  );
}

function VideoCard({ resource }: { resource: DashboardResource }) {
  return (
    <div className="lab-card overflow-hidden">
      <div className="aspect-video bg-black/30">
        <VideoPlayer resource={resource} />
      </div>
      <div className="p-4">
        <div className="flex items-center gap-2">
          <h3 className="font-bold text-white text-base">{resource.title}</h3>
          {resource.is_new && (
            <span className="flex items-center gap-1 rounded-full bg-emerald-500/20 px-2 py-0.5 text-[11px] font-bold text-emerald-300 border border-emerald-500/30">
              <Sparkles size={10} />
              جدید
            </span>
          )}
        </div>
        {resource.description && (
          <p className="mt-2 text-sm text-slate-400 leading-relaxed line-clamp-2">
            {resource.description}
          </p>
        )}
      </div>
    </div>
  );
}

function LinkCard({ resource }: { resource: DashboardResource }) {
  return (
    <a
      href={resource.url}
      target="_blank"
      rel="noopener noreferrer"
      className="lab-card flex items-center gap-4 p-4 group hover:border-cyan-500/40 transition-colors"
    >
      <div className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-cyan-500/10 text-cyan-400 group-hover:bg-cyan-500/20 transition-colors">
        <ExternalLink size={20} />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <h3 className="font-bold text-white text-base truncate">{resource.title}</h3>
          {resource.is_new && (
            <span className="flex items-center gap-1 rounded-full bg-emerald-500/20 px-2 py-0.5 text-[11px] font-bold text-emerald-300 border border-emerald-500/30 shrink-0">
              <Sparkles size={10} />
              جدید
            </span>
          )}
        </div>
        {resource.description && (
          <p className="mt-1 text-sm text-slate-400 leading-relaxed truncate">
            {resource.description}
          </p>
        )}
      </div>
      <ExternalLink
        size={16}
        className="shrink-0 text-slate-500 group-hover:text-cyan-400 transition-colors"
      />
    </a>
  );
}

function ResourceCard({ resource }: { resource: DashboardResource }) {
  if (resource.type === 'link') {
    return <LinkCard resource={resource} />;
  }
  return <VideoCard resource={resource} />;
}

function CategorySection({ title, resources }: { title: string; resources: DashboardResource[] }) {
  const hasVideos = resources.some((r) => r.type !== 'link');
  const hasLinks = resources.some((r) => r.type === 'link');

  const videos = resources.filter((r) => r.type !== 'link');
  const links = resources.filter((r) => r.type === 'link');

  return (
    <div>
      <h3 className="text-lg font-bold text-slate-300 mb-4 flex items-center gap-2">
        <div className="h-px flex-1 bg-white/10" />
        <span>{title}</span>
        <div className="h-px flex-1 bg-white/10" />
      </h3>

      {hasVideos && (
        <div className="grid gap-5 sm:grid-cols-2 mb-5">
          {videos.map((r) => (
            <ResourceCard key={r.id} resource={r} />
          ))}
        </div>
      )}

      {hasLinks && (
        <div className="flex flex-col gap-3">
          {links.map((r) => (
            <ResourceCard key={r.id} resource={r} />
          ))}
        </div>
      )}
    </div>
  );
}

export default function ResourcesTab() {
  const [resources, setResources] = useState<DashboardResource[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    resourceService
      .getResources()
      .then((data) => {
        if (isMounted) setResources(data);
      })
      .catch((err) => {
        console.error(err);
        if (isMounted) setError(err.message || 'خطا در دریافت منابع');
      })
      .finally(() => {
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  // Group by category
  const grouped = resources.reduce<Record<string, DashboardResource[]>>((acc, r) => {
    const cat = r.category || 'سایر';
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(r);
    return acc;
  }, {});

  const categories = Object.keys(grouped);
  const hasMultipleCategories = categories.length > 1;

  return (
    <div>
      <h2 className="text-2xl font-black text-white mb-6 border-b border-white/10 pb-4">منابع</h2>

      {loading && <ResourcesSkeleton />}

      {!loading && error && (
        <div className="flex flex-col items-center justify-center text-center py-12 px-4">
          <div className="grid h-16 w-16 place-items-center rounded-full bg-rose-500/10 mb-4">
            <AlertCircle size={28} className="text-rose-400" />
          </div>
          <h3 className="text-lg font-bold text-white mb-2">خطا در بارگذاری</h3>
          <p className="text-slate-400 max-w-sm leading-relaxed">{error}</p>
        </div>
      )}

      {!loading && !error && resources.length === 0 && (
        <div className="flex flex-col items-center justify-center text-center py-12 px-4">
          <div className="grid h-20 w-20 place-items-center rounded-full bg-cyan-500/10 mb-4">
            <FolderOpen size={32} className="text-cyan-400" />
          </div>
          <h3 className="text-xl font-bold text-white mb-2">هنوز منبعی منتشر نشده</h3>
          <p className="text-slate-400 max-w-sm leading-relaxed">
            ویدیوها، لینک‌ها و سایر منابع به زودی در این قسمت قرار خواهند گرفت.
          </p>
        </div>
      )}

      {!loading && !error && resources.length > 0 && (
        <div className="flex flex-col gap-8">
          {hasMultipleCategories ? (
            categories.map((cat) => (
              <CategorySection key={cat} title={cat} resources={grouped[cat]} />
            ))
          ) : (
            <>
              {resources.some((r) => r.type !== 'link') && (
                <div className="grid gap-5 sm:grid-cols-2">
                  {resources
                    .filter((r) => r.type !== 'link')
                    .map((r) => (
                      <ResourceCard key={r.id} resource={r} />
                    ))}
                </div>
              )}
              {resources.some((r) => r.type === 'link') && (
                <div className="flex flex-col gap-3">
                  {resources
                    .filter((r) => r.type === 'link')
                    .map((r) => (
                      <ResourceCard key={r.id} resource={r} />
                    ))}
                </div>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
}
