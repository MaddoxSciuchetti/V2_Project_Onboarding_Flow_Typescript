import { OFFBOARDING, ONBOARDING } from '@/constants/form.consts';
import { useQuery } from '@tanstack/react-query';
import { useMemo, useState } from 'react';
import { templateQueries } from '../query-options/queries/template.queries';

function useFetchTask() {
  const { data = [], isPending } = useQuery(templateQueries.getTask());
  const [search, setSearch] = useState('');
  const normalizedSearch = search.trim().toLowerCase();
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(10);

  const indexOffLastPost = currentPage * postsPerPage;
  const indexOffFirstPost = indexOffLastPost - postsPerPage;

  const tasksByTemplateType = useMemo(
    () => ({
      ONBOARDING: data.filter((value) => value.template_type === ONBOARDING),
      OFFBOARDING: data.filter((value) => value.template_type === OFFBOARDING),
    }),
    [data]
  );

  const filteredByType = useMemo(
    () => ({
      ONBOARDING: tasksByTemplateType.ONBOARDING.filter((item) =>
        item.description?.toLowerCase().includes(normalizedSearch)
      ),
      OFFBOARDING: tasksByTemplateType.OFFBOARDING.filter((item) =>
        item.description?.toLowerCase().includes(normalizedSearch)
      ),
    }),
    [tasksByTemplateType, normalizedSearch]
  );

  const paginatedType = useMemo(
    () => ({
      ONBOARDING: filteredByType.ONBOARDING.slice(
        indexOffFirstPost,
        indexOffLastPost
      ),
      OFFBOARDING: filteredByType.OFFBOARDING.slice(
        indexOffFirstPost,
        indexOffLastPost
      ),
    }),
    [indexOffFirstPost, indexOffLastPost, filteredByType]
  );

  const taskLengthByTemplateType = useMemo(
    () => ({
      ONBOARDING: filteredByType.ONBOARDING.length,
      OFFBOARDING: filteredByType.OFFBOARDING.length,
    }),
    [filteredByType]
  );

  return {
    isLoading: isPending,
    tasksByTemplateType,
    filteredByType,
    taskLengthByTemplateType,
    search,
    setSearch,
    currentPage,
    setCurrentPage,
    paginatedType,

    postsPerPage,
  };
}

export default useFetchTask;
