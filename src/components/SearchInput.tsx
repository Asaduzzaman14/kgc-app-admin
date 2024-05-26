function SearchInput({ placeholder, setSearch }: any) {
  return (
    <div className="max-w-full w-100 mb-4">
      <input
        type="text"
        className="w-full max-w-full rounded-md border border-stroke bg-transparent px-5 py-2.5 outline-none focus:border-primary dark:border-strokedark dark:bg-meta-4 dark:focus:border-primary"
        placeholder={placeholder}
        onChange={(e) => setSearch(e.target.value)}
      />
    </div>
  );
}

export default SearchInput;
