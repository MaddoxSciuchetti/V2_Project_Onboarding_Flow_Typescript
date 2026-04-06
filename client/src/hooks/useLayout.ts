import { isSettingsLayoutPath } from '@/components/layout/utils/header.utils';
import { useSidebar } from '@/components/ui/sidebar/Sidebar';
import { useRouterState } from '@tanstack/react-router';
import { useEffect, useState } from 'react';
import { useBodyScrollLock } from './useBodyScrollLock';
import { useThemeProvider } from './useThemeProvider';

export function useLayout() {
  const [modal, setModal] = useState<boolean>(false);
  const { toggleSidebar } = useSidebar();
  const { theme } = useThemeProvider();
  const isOrgSettings = useRouterState({
    select: (s) => isSettingsLayoutPath(s.location.pathname),
  });
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  useBodyScrollLock();

  const handleOpenModal = () => {
    setModal((prev) => !prev);
    toggleSidebar();
  };

  return { modal, handleOpenModal, isOrgSettings };
}
