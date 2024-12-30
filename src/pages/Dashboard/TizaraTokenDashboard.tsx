import React, { useEffect, useState } from 'react';
import CardDataStats from '../../components/CardDataStats';
import DefaultLayout from '../../layout/DefaultLayout';
import UserIcon from '../../assets/icon/UserIcon';
import { Link } from 'react-router-dom';
import { PiPackage } from 'react-icons/pi';
import axios from 'axios';
import { getKgcAdminToken, logout } from '../../hooks/handelAdminToken';

const BizTokenDashboard: React.FC = () => {
  const [datas, setDatas] = useState<any>([]);
  const [users, setUsers] = useState<any>([]);
  const [services, setServices] = useState<any>([]);
  const [loding, setLoading] = useState<boolean>(false);

  const token = getKgcAdminToken();

  const fetchData = async (url: any, setStateFunction: any) => {
    setLoading(true);
    try {
      const response = await axios.get(url, {
        headers: {
          Authorization: `${token}`,
          'Content-Type': 'application/json',
        },
      });
      setLoading(false);
      if (response?.data?.success) {
        setStateFunction(response?.data?.data);
      }
    } catch (error: any) {
      setLoading(false);
      if (
        error.response &&
        (error.response.status === 401 || error.response.status === 403)
      ) {
        logout();
      }
      console.error(`Error fetching data from ${url}:`, error);
    }
  };

  useEffect(() => {
    fetchData('http://localhost:5000/api/v1/services-catagory', setDatas);
    fetchData('http://localhost:5000/api/v1/services', setServices);
    fetchData(
      'http://localhost:5000/api/v1/users/all-donnor?isDonor=true',
      setUsers,
    );
  }, []);
  return (
    <>
      <DefaultLayout>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
          <Link to={'/'}>
            <CardDataStats
              title="All Catagory"
              total={`${datas?.data?.length ? datas?.data?.length : '0'}`}
            >
              <PiPackage className="text-2xl dark:text-white text-primary" />
            </CardDataStats>
          </Link>

          <Link to={'/'}>
            <CardDataStats
              title="All  Services"
              total={`${services ? services?.data?.length : '00'}  `}
            >
              <UserIcon />
            </CardDataStats>
          </Link>

          <Link to={'/'}>
            <CardDataStats
              title="All Users"
              total={`${users?.data?.length ? users?.data?.length : '00'}`}
            >
              <UserIcon />
            </CardDataStats>
          </Link>
        </div>

        <div className="mt-5">
          {/* <LastestDeposits /> */}
          <div className="mt-5">{/* <LatestPurchaseHistory /> */}</div>
        </div>
      </DefaultLayout>
    </>
  );
};

export default BizTokenDashboard;
