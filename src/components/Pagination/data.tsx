import PaginationButtons from './PaginationButtons';
import useDataFetcher from './useDataFetcher';

const Data = () => {
  const { loading, pages, totalPages, currentPage, setCurrentPage } =
    useDataFetcher();
  return (
    <div className="font-Poppins section">
      {loading ? (
        <div className="text-center text-5xl">Loading...</div>
      ) : (
        <>
          <PaginationButtons
            totalPages={totalPages}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        </>
      )}
    </div>
  );
};
export default Data;
