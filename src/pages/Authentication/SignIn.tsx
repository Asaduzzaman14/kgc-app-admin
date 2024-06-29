import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { useForm, SubmitHandler } from 'react-hook-form';
import { PuffLoader } from 'react-spinners';
import {
  getKgcAdminToken,
  setKgcAdminToken,
} from '../../hooks/handelAdminToken';

type Inputs = {
  email: string;
  password: string;
};

const SignIn: React.FC = () => {
  const [loding, setLoading] = useState(false);

  const token = getKgcAdminToken();

  const navigate = useNavigate();
  useEffect(() => {
    if (token) {
      navigate('/dashboard');
    }
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:5000/api/v1/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const responseData = await response.json();

      if (responseData.success) {
        setKgcAdminToken(responseData?.data?.accessToken);
        Swal.fire({
          title: 'success',
          text: 'Login successfull',
          icon: 'success',
        }).then(() => {
          navigate('/dashboard');
        });
      } else if (responseData.success == false) {
        Swal.fire({
          title: 'Error',
          text: `${responseData?.message}`,
          icon: 'error',
        });
      }
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex justify-center items-center place-items-center ">
      <div className="w-[80%] md:w-[60%] lg:w-[50%]">
        <div className=" rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <div className="flex items-center">
            <div className="w-full border-stroke dark:border-strokedark xl:border-l-2">
              <div className="w-full p-4 sm:p-12.5 xl:p-17.5">
                <h2 className="mb-9 text-lg font-bold text-black dark:text-white sm:text-title-md">
                  LOGIN IN KGC PLUS
                </h2>

                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="mb-4">
                    <label className="mb-2.5 block font-medium text-black dark:text-white">
                      Email
                    </label>
                    <div className="relative">
                      <input
                        {...register('email', { required: true })}
                        type="email"
                        placeholder="Enter your email"
                        className="w-full rounded-lg border border-stroke bg-transparent py-3 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                      />
                    </div>
                  </div>

                  <div className="mb-6">
                    <label className="mb-2.5 block font-medium text-black dark:text-white">
                      Password
                    </label>
                    <div className="relative">
                      <input
                        {...register('password', { required: true })}
                        type="password"
                        placeholder="Password"
                        className="w-full rounded-lg border border-stroke bg-transparent py-3 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                      />
                    </div>
                  </div>
                  <div className="mb-5">
                    {!loding ? (
                      <input
                        type="submit"
                        value="Sign In"
                        className="w-full cursor-pointer rounded-lg border border-primary bg-primary p-3 text-white transition hover:bg-opacity-90"
                      />
                    ) : (
                      <PuffLoader
                        className="mx-auto"
                        color="#36d7b7"
                        size={40}
                      />
                    )}
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
