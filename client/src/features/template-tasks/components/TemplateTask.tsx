import LoadingAlert from '@/components/alerts/LoadingAlert';
import SearchHeaderResuable from '@/components/layout/headers/SearchHeaderResuable';
import ModalOverlay from '@/components/modal/ModalOverlay';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import usePagination from '../hooks/usePagination';
import { templateV2Queries } from '../query-options/queries/templateV2.queries';
import CreateTemplateModalV2 from './CreateTemplateModalV2';
import Pagination from './Pagination';
import TemplateV2List from './TemplateV2List';

function TemplateTasks() {
  const { data = [], isPending } = useQuery(templateV2Queries.list());

  const [createOpen, setCreateOpen] = useState(false);
  const {
    currentPage,
    setCurrentPage,
    search,
    setSearch,
    paginatedTemplates,
    postsPerPage,
    templatesMatchingSearch,
  } = usePagination(data);

  if (isPending) {
    return <LoadingAlert />;
  }

  return (
    <div
      role="region"
      aria-label="Vorlagen Verwaltung"
      className="mx-auto flex h-full w-5xl flex-col overflow-auto rounded-2xl bg-card p-6 md:max-w-8xl"
    >
      <SearchHeaderResuable
        search={search}
        setSearch={setSearch}
        description="Vorlage anlegen"
        openModal={() => setCreateOpen(true)}
      />
      <TemplateV2List issueTemplates={paginatedTemplates} />
      <div className="mt-2 flex items-center justify-between">
        <Pagination
          postsPerPage={postsPerPage}
          totalPosts={templatesMatchingSearch.length}
          setCurrentPage={setCurrentPage}
          currentPage={currentPage}
        />
        <p className="font-light text-xs text-[var(--muted-foreground)]">
          {templatesMatchingSearch.length} Vorlage
          {templatesMatchingSearch.length === 1 ? '' : 'n'}
        </p>
      </div>
      {createOpen && (
        <ModalOverlay handleToggle={() => setCreateOpen(false)}>
          <CreateTemplateModalV2 onClose={() => setCreateOpen(false)} />
        </ModalOverlay>
      )}
    </div>
  );
}

export default TemplateTasks;
