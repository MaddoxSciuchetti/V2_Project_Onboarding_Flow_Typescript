import { Dispatch, MouseEvent, SetStateAction } from 'react';

type PaginationProps = {
  postsPerPage: number;
  totalPosts: number;
  setCurrentPage: Dispatch<SetStateAction<number>>;
  currentPage: number;
};

const Pagination = ({
  postsPerPage,
  totalPosts,
  setCurrentPage,
  currentPage,
}: PaginationProps) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  const handlePageUpdate = (
    number: number,
    e: MouseEvent<HTMLAnchorElement>
  ) => {
    e.preventDefault();
    setCurrentPage(number);
  };

  return (
    <nav>
      <ul className="flex gap-2 ">
        {pageNumbers.map((number) => (
          <li
            key={number}
            className={`page-item ${currentPage === number ? 'text-(--muted-foreground) underline' : 'text-(--foreground)'}`}
          >
            <a
              onClick={(e) => handlePageUpdate(number, e)}
              href="!#"
              className="page-link"
            >
              {number}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Pagination;
