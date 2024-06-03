export const ViewModal = ({ viewItem, closeViewModal }: any) => {
  console.log(viewItem);

  return (
    <div className="fixed left-0 top-0 z-999 flex h-full min-h-screen w-full items-center justify-center bg-black/90 py-5">
      <div
        className="overflow-auto  max-h-[80%] w-full max-w-fit rounded-lg bg-white   dark:bg-boxdark "
        onClick={(e) => {
          const target = e.target as HTMLDivElement;
          if (target.className === 'modal-container') closeViewModal();
        }}
      >
        <div className="modal rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark overflow-auto">
          <div className="min-w-full w-[370px] lg:w-[600px] border-b border-stroke  dark:border-strokedark">
            <div className="w-full bg-slate-200 flex justify-between  place-items-center p-2 py-3">
              <h2 className="text-xl font-bold text-black dark:text-white px-2">
                Details
              </h2>

              <strong
                className="text-xl align-center cursor-pointer  hover:text-black dark:hover:text-white"
                onClick={closeViewModal}
              >
                X
              </strong>
            </div>
            <div className="text-black font-medium p-3">
              <p>Service Provider: {viewItem.name}</p>
              <p>Phone: {viewItem.name}</p>
              <p>Email: {viewItem.name}</p>
              <p>location: {viewItem.name}</p>
              <p>Service Name: {viewItem.name}</p>
              <p>Service Description: {viewItem.name}</p>
              <p>Phone: {viewItem.name}</p>
              <p>Email: {viewItem.name}</p>
              <p>location: {viewItem.name}</p>
              <p>Cataogry Name: {viewItem.name}</p>
              <p>Cataogry description: {viewItem.name}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
