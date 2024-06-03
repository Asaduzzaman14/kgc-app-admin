import React, { useEffect, useState } from 'react';
import CardDataStats from '../../components/CardDataStats';
import DefaultLayout from '../../layout/DefaultLayout';
import UserIcon from '../../assets/icon/UserIcon';
import { Link } from 'react-router-dom';
import { FaUserCheck } from 'react-icons/fa6';
import { PiPackage } from 'react-icons/pi';
import axios from 'axios';
import { getKgcAdminToken } from '../../hooks/handelAdminToken';

const BizTokenDashboard: React.FC = () => {
  const [datas, setDatas] = useState<any>([]);
  const [users, setUsers] = useState<any>([]);
  const [services, setServices] = useState<any>([]);
  const [loding, setLoading] = useState<boolean>(false);

  const token = getKgcAdminToken();

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        'https://kgc-app.vercel.app/api/v1/services-catagory',
        {
          headers: {
            Authorization: `${token}`,
            'Content-Type': 'application/json',
          },
        },
      );
      setLoading(false);

      if (response?.data?.success) {
        setDatas(response?.data?.data);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchServiceData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        'https://kgc-app.vercel.app/api/v1/services',
        {
          headers: {
            Authorization: `${token}`,
            'Content-Type': 'application/json',
          },
        },
      );

      setLoading(false);

      if (response?.data?.success) {
        setServices(response?.data?.data);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchServiceData();
  }, []);

  const getusers = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        'https://kgc-app.vercel.app/api/v1/users/all-donnor?isDonor=true',
      );

      setLoading(false);

      if (response?.data?.success) {
        setUsers(response?.data?.data);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    getusers();
  }, []);

  return (
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
  );
};

export default BizTokenDashboard;
