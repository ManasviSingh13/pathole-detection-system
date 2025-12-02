'use client';

import { usePathname } from 'next/navigation';
import {
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarContent,
} from '@/components/ui/sidebar';
import { PotholePatrolLogo } from '@/components/icons';
import {
  LayoutDashboard,
  BarChart3,
  UploadCloud,
  Box,
  Github,
} from 'lucide-react';
import Link from 'next/link';
import { Button } from '../ui/button';

const links = [
  {
    href: '/dashboard',
    label: 'Dashboard',
    icon: LayoutDashboard,
  },
  {
    href: '/reports',
    label: 'AI Reports',
    icon: BarChart3,
  },
  {
    href: '/upload',
    label: 'Upload',
    icon: UploadCloud,
  },
  {
    href: '/models',
    label: 'Models',
    icon: Box,
  },
];

export function SideNav() {
  const pathname = usePathname();

  return (
    <>
      <SidebarHeader className="border-b border-sidebar-border">
        <div className="flex items-center gap-2.5 p-2">
          <PotholePatrolLogo className="h-8 w-8 text-accent" />
          <span className="font-headline text-lg font-semibold text-sidebar-foreground">
            Pothole Patrol
          </span>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {links.map((link) => (
            <SidebarMenuItem key={link.href}>
              <Link href={link.href} legacyBehavior passHref>
                <SidebarMenuButton
                  asChild
                  isActive={pathname === link.href}
                  tooltip={{
                    children: link.label,
                    className: 'bg-sidebar-background text-sidebar-foreground',
                  }}
                >
                  <a>
                    <link.icon />
                    <span>{link.label}</span>
                  </a>
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
    </>
  );
}
