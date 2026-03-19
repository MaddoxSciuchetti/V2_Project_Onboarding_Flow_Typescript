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

  const paginate = (pageNumber: number, e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    setCurrentPage(pageNumber);
  };

  return (
    <nav>
      <ul>
        {pageNumbers.map((number) => (
          <li
            key={number}
            className={`page-item ${currentPage === number ? 'text-sm bg-(--destructive)' : 'text-sm text-(--destructive)'}`}
          >
            <a
              onClick={(e) => paginate(number, e)}
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
