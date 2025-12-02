'use client';
import { usePathname } from 'next/navigation';
import { SidebarTrigger } from '@/components/ui/sidebar';

export function Header() {
  const pathname = usePathname();

  const getTitle = () => {
    switch (pathname) {
      case '/dashboard':
        return 'Dashboard';
      case '/reports':
        return 'AI Reports';
      case '/upload':
        return 'Upload New Detection';
      case '/models':
        return 'Model Management';
      default:
        return 'Pothole Patrol';
    }
  };

  return (
    <header className="sticky top-0 z-10 flex h-14 items-center gap-4 border-b bg-background/80 px-4 backdrop-blur-sm sm:px-6">
      <div className="flex items-center gap-2 md:hidden">
        <SidebarTrigger />
      </div>
      <h1 className="font-headline text-xl font-semibold">{getTitle()}</h1>
    </header>
  );
}
