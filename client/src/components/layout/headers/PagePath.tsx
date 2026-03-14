import { useLocation } from '@tanstack/react-router';

const toTitleCase = (value: string) =>
  value
    .split('-')
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

const getCurrentPageLabel = (pathname: string, workerName: string) => {
  if (pathname.startsWith('/user/') && workerName) return workerName;

  const lastSegment = pathname.split('/').filter(Boolean).at(-1) ?? 'home';
  return toTitleCase(lastSegment);
};

const PagePath = () => {
  const { pathname, search } = useLocation();
  const params = new URLSearchParams(search);

  const previousPage = params.get('prevPage') ?? '';
  const workerName = params.get('workerName') ?? '';
  const currentPage = getCurrentPageLabel(pathname, workerName);

  return (
    <div className="flex items-center gap-1 text-sm font-medium">
      {previousPage && (
        <>
          <span className="text-muted-foreground">{previousPage}</span>
          <span className="text-muted-foreground">/</span>
        </>
      )}
      <span className="text-foreground">{currentPage}</span>
    </div>
  );
};

export default PagePath;
