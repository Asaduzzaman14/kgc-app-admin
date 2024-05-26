const AuthDetails = () => {
  return (
    <>
      <form className="flex flex-col gap-5 px-4 lg:w-[500px]">
        {/*  */}
        <div className="min-w-full">
          <label className="mb-2.5 block text-black dark:text-white">
            pasword
          </label>
          <input
            type="text"
            placeholder="pasword"
            className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
          />
        </div>

        <div className="min-w-full ">
          <label className="mb-2.5 block text-black dark:text-white">
            New pasword
          </label>
          <input
            type="text"
            placeholder="new pasword"
            className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
          />
        </div>

        <button className="flex px-7 mx-auto justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90">
          Submit
        </button>
      </form>
    </>
  );
};

export default AuthDetails;
