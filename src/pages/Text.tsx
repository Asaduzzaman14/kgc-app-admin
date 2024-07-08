import React, { useEffect, useState } from 'react';
import { getKgcAdminToken } from '../hooks/handelAdminToken';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import Button from '../Ui/Button';
import Swal from 'sweetalert2';

type IText = {
  text: string;
  status: boolean;
};

const ScrollText = () => {
  const token = getKgcAdminToken();
  const [notice, setNotice] = useState<any[]>();
  const [loading, setLoading] = useState<boolean>(false);
  const {
    register,
    formState: { errors },
    handleSubmit,
    control,
  } = useForm<IText>();
  const [isChecked, setIsChecked] = useState<any>();

  const handleCheckboxChange = (event: any) => {
    setIsChecked(event.target.checked);
    console.log(event.target.checked);
  };
  useEffect(() => {
    if (notice?.length) {
      setIsChecked(notice[0].status == 'active' ? true : false);
    }
  }, [notice]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          ' https://kgc-app-sigma.vercel.app/api/v1/scroll-text/all',
          {
            headers: {
              Authorization: `${token}`,
              'Content-Type': 'application/json',
            },
          },
        );

        const data = response?.data?.data;
        console.log(data);

        if (data) {
          setNotice(data);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, [token]);

  const onSubmit = async (data: any) => {
    if (data.notice == ' ') {
      data.notice = notice![0]?.notice;
    }
    if (!notice || !notice[0]._id) {
      return;
    }
    data.status = isChecked == true ? 'active' : 'inactive';

    try {
      const response = await fetch(
        `https://kgc-app-sigma.vercel.app/api/v1/scroll-text/${notice[0]._id}`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `${token}`,
          },
          body: JSON.stringify(data),
        },
      );

      const responseData = await response.json();

      if (responseData.success) {
        Swal.fire({
          title: 'Success',
          text: 'Scroll text successfully updated ',
          icon: 'success',
        });
      } else {
        Swal.fire({
          title: 'Error',
          text: 'Failed to update',
          icon: 'error',
        });
      }
    } catch (error) {
      console.error('Error updating data:', error);
      Swal.fire({
        title: 'Error',
        text: 'Something went wrong',
        icon: 'error',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="w-full xl:w-1/2">
          <div className="flex gap-4 place-items-center">
            <label className="mt-2.5 block text-black dark:text-white">
              Scroll text
            </label>
            <div>
              <label className="switch">
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={handleCheckboxChange}
                />
                <span className="slider round"></span>
              </label>
            </div>
          </div>
          <textarea
            {...register('text', { required: true })}
            placeholder="text"
            className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
            defaultValue={notice && notice[0]?.text}
          />
          {errors.text && <p className="text-red-500">Text is required</p>}
        </div>

        {loading ? (
          <p>Loading...</p>
        ) : (
          <Button cs="px-10 my-5 bg-primary" btnName="Submit" />
        )}
      </form>
    </div>
  );
};

export default ScrollText;
