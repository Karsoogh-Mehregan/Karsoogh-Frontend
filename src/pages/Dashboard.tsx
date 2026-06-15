import { useState, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';

import DashboardSidebar from '@/components/dashboard/DashboardSidebar';
import ProfileTab from '@/components/dashboard/ProfileTab';
import ResourcesTab from '@/components/dashboard/ResourcesTab';
import ChallengesTab from '@/components/dashboard/ChallengesTab';

type Tab = 'profile' | 'resources' | 'challenges';

const validTabs: Tab[] = ['profile', 'resources', 'challenges'];

export default function Dashboard() {
  const [searchParams, setSearchParams] = useSearchParams();
  const tabParam = searchParams.get('tab') as Tab | null;
  const activeTab: Tab = tabParam && validTabs.includes(tabParam) ? tabParam : 'profile';
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const setActiveTab = useCallback(
    (tab: Tab) => {
      setSearchParams(tab === 'profile' ? {} : { tab }, { replace: true });
    },
    [setSearchParams],
  );

  return (
    <div className="lab-shell min-h-screen pt-4 lg:pt-8" dir="rtl" lang="fa">
      <DashboardSidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
      />

      <main className={`transition-all duration-300 ${isSidebarOpen ? 'md:mr-64' : 'md:mr-20'}`}>
        <div className="p-4 md:p-8">
          <section className="mx-auto max-w-5xl">
            <div className="lab-card p-6 md:p-8 min-h-[400px]">
              {activeTab === 'profile' && <ProfileTab />}
              {activeTab === 'resources' && <ResourcesTab />}
              {activeTab === 'challenges' && <ChallengesTab />}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
