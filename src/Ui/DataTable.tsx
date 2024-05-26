import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css';

const DataTable = ({ children }: any) => {

  const allUsers: any[] = [
    {
      name: 'user name',
      email: "example@gmail.com",
      price: 0.0,
      invoiceDate: `0156666666`,
      refarence: '34522323',
      status: 'Inactive',
    },
    {
      name: 'user name',
      email: "example@gmail.com",
      price: 59.0,
      invoiceDate: `0156666666`,
      refarence: '34522323',
      status: 'Inactive',
    },
    {
      name: 'user name',
      email: "example@gmail.com",
      price: 99.0,
      invoiceDate: `0156666666`,
      refarence: '34522323',
      status: 'Inactive',
    },
    {
      name: 'user name',
      email: "example@gmail.com",
      price: 59.0,
      invoiceDate: `0156666666`,
      refarence: '34522323',
      status: 'Inactive',
    },
  ];

  return (
    <>
      <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
        <div className="max-w-full overflow-x-auto">

          {allUsers.length == 0 ?
            <div>
              <Skeleton height={45} count={8} />
            </div>
            : <table className="w-full table-auto">
              {children}
            </table>}
        </div>
      </div>
    </>
  );
};

export default DataTable;