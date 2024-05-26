import React, { useEffect, useState } from 'react';
import CardDataStats from '../../components/CardDataStats';
import DefaultLayout from '../../layout/DefaultLayout';
import UserIcon from '../../assets/icon/UserIcon';
import { Link } from 'react-router-dom';
import { FaUserCheck } from 'react-icons/fa6';
import { PiPackage } from 'react-icons/pi';
import axios from 'axios';

interface ApiResponse {
  statusCode: number;
  success: boolean;
  message: string;
  data: UserProfile;
}

interface Wallet {
  id: string;
  depositWallet: number;
  icotWallet: number;
  nativeWallet: string;
  createdAt: string;
  updatedAt: string;
}

interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  password: string;
  referralCode: string;
  myReferralCode: string;
  role: string;
  profileImage: string | null;
  referralCount: number;
  nativeWallet: number;
  createdAt: string;
  updatedAt: string;
  wallet: Wallet;
}

const BizTokenDashboard: React.FC = () => {
  const [profile, setProfile] = useState<UserProfile | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('tizaraToken');

        const response = await axios.get<ApiResponse>(' ', {
          headers: {
            Authorization: `${token}`,
            'Content-Type': 'application/json',
          },
        });
        console.log(response);

        if (response?.data?.success) {
          setProfile(response.data.data);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    // fetchData();
  }, []);

  return (
    <DefaultLayout>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
        <Link to={'/'}>
          <CardDataStats
            title="All Catagory"
            total={`${'00'}  `}
            // rate="0.95%"
            // levelDown
          >
            <UserIcon />
          </CardDataStats>
        </Link>

        <Link to={'/'}>
          <CardDataStats
            title="All  Services"
            total={`${'00'}  `}
            // rate="0.95%"
            // levelDown
          >
            <UserIcon />
          </CardDataStats>
        </Link>

        <Link to={'/'}>
          <CardDataStats
            title="All Users"
            total={`00`}

            // rate="0.95%"
            // levelDown
          >
            <PiPackage className="text-2xl dark:text-white text-primary" />
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
