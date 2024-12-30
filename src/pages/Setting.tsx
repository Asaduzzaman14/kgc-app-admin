import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import Button from '../Ui/Button';
import DefaultLayout from '../layout/DefaultLayout';
import { getKgcAdminToken } from '../hooks/handelAdminToken';
import Text from './Text';
import ProductText from './ProductText';

type INotice = {
  notice?: string;
};

const Setting = () => {
  const token = getKgcAdminToken();
  const [notice, setNotice] = useState<any[]>();
  const [loading, setLoading] = useState<boolean>(false);
  const {
    register,
    formState: { errors },
    handleSubmit,
    control,
  } = useForm<INotice>();
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
          ' http://localhost:5000/api/v1/notice/allnotice',
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
        ` http://localhost:5000/api/v1/notice/${notice[0]._id}`,
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
          text: 'Notice successfully updated ',
          icon: 'success',
        });
      } else {
        Swal.fire({
          title: 'Error',
          text: responseData?.message || 'Failed to update reward Level',
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
    <DefaultLayout>
      <div className="mt-8">
        <h2 className="text-2xl font-semibold text-black dark:text-white">
          Setting
        </h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="w-full xl:w-1/2">
            <div className="flex gap-4 place-items-center">
              <label className="mt-2.5 block text-black dark:text-white">
                Notice
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
              {...register('notice', { required: true })}
              placeholder="Notice"
              className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              defaultValue={notice && notice[0]?.notice}
              cols={30}
            />
          </div>

          {loading ? (
            <p>Loading...</p>
          ) : (
            <Button cs="px-10 my-5 bg-primary" btnName="Submit" />
          )}
        </form>
      </div>
      <Text />
      <ProductText />
    </DefaultLayout>
  );
};

export default Setting;
