import ReactPaginate from 'react-paginate';
import { BsChevronLeft, BsChevronRight } from 'react-icons/bs';

const PaginationButtons = ({
  setCurrentPage,
  currentPage,
  totalPages,
}: any) => {
  const handlePageClick = ({ selected }: any) => {
    setCurrentPage(selected);
  };
  const showNextButton = currentPage !== totalPages - 1;
  const showPrevButton = currentPage !== 0;

  return (
    <div>
      <ReactPaginate
        breakLabel={<span className="mr-0.5 lg:mr-4">...</span>}
        nextLabel={
          showNextButton ? (
            <span className="paginationButton flex items-center justify-center bg-success text-white rounded-md">
              <BsChevronRight />
            </span>
          ) : null
        }
        onPageChange={handlePageClick}
        pageRangeDisplayed={2}
        pageCount={totalPages}
        previousLabel={
          showPrevButton ? (
            <span className="paginationButton flex items-center justify-center bg-success text-black rounded-md mr-1 lg:mr-4">
              <BsChevronLeft />
            </span>
          ) : null
        }
        containerClassName="flex items-center justify-center mt-8 mb-4"
        pageClassName="block border text-xs md:text-md pageButton  border-solid border-bodydark1 flex items-center justify-center rounded-md mr-1 lg:mr-4"
        activeClassName="bg-primary border-primary text-white"
        renderOnZeroPageCount={null}
      />
    </div>
  );
};
export default PaginationButtons;
