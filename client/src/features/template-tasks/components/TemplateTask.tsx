import LoadingAlert from '@/components/alerts/LoadingAlert';
import SearchHeaderResuable from '@/components/layout/headers/SearchHeaderResuable';
import ModalOverlay from '@/components/modal/ModalOverlay';
import Pagination from './Pagination';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useMemo, useState } from 'react';
import type { IssueTemplateListItem } from '../api/templateV2.api';
import { templateV2Queries } from '../query-options/queries/templateV2.queries';
import CreateTemplateModalV2 from './CreateTemplateModalV2';
import TemplateV2List from './TemplateV2List';

function TemplateTasks() {
  const { data = [], isPending } = useQuery(templateV2Queries.list());
  const [search, setSearch] = useState('');
  const [createOpen, setCreateOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(10);

  const normalizedSearch = search.trim().toLowerCase();

  useEffect(() => {
    setCurrentPage(1);
  }, [normalizedSearch]);

  const templatesMatchingSearch = useMemo(() => {
    const matchesSearchQuery = (issueTemplate: IssueTemplateListItem) => {
      if (!normalizedSearch) return true;
      const nameLower = issueTemplate.name.toLowerCase();
      const descriptionLower = (issueTemplate.description ?? '').toLowerCase();
      return (
        nameLower.includes(normalizedSearch) ||
        descriptionLower.includes(normalizedSearch)
      );
    };
    return data.filter(matchesSearchQuery);
  }, [data, normalizedSearch]);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;

  const paginatedTemplates = useMemo(
    () =>
      templatesMatchingSearch.slice(indexOfFirstPost, indexOfLastPost),
    [templatesMatchingSearch, indexOfFirstPost, indexOfLastPost]
  );

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
