import { Outlet } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import { XOCanvas } from '@/components/XOCanvas';

export default function PublicLayout() {
  return (
    <div className="lab-shell min-h-screen" dir="rtl" lang="fa">
      <XOCanvas />
      <Navbar />
      <Outlet />
    </div>
  );
}
