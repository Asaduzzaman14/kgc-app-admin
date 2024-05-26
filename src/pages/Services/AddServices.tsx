import React, { useEffect, useState } from 'react';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import DefaultLayout from '../../layout/DefaultLayout';
import Button from '../../Ui/Button';
import { getKgcAdminToken } from '../../hooks/handelAdminToken';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import Swal from 'sweetalert2';

type Inputs = {
  id: number;
  name: string; //
  description: string; //
  phone: string; //
  email: string; //
  location: string; //
  serviceProviderName: string;
  servicesCatagory: string; //
};
const AddServices = () => {
  const [settings, setSettings] = useState<Inputs[] | null>([]);
  const { register, handleSubmit } = useForm<Inputs>();
  const token = getKgcAdminToken();
  console.log(token);

  const [catagory, setCatagory] = useState<any>();
  const [selectedMethod, setSelectedMethod] = useState<any>();

  const getCtagory = async () => {
    try {
      const response = await axios.get(
        'http://localhost:5000/api/v1/services-catagory',
        {
          headers: {
            Authorization: `${token}`,
            'Content-Type': 'application/json',
          },
        },
      );
      setCatagory(response?.data?.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    getCtagory();
  }, []);

  const onSubmit = async (formData: any) => {
    console.log(formData);

    try {
      const response = await fetch('http://localhost:5000/api/v1/services', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `${token}`,
        },
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const responseData = await response.json();
      console.log(responseData);

      if (responseData.success) {
        Swal.fire({
          title: 'success',
          text: 'Successfully Add Service',
          icon: 'success',
        });
      }
    } catch (error) {
      Swal.fire({
        title: 'error',
        text: 'Something wrong',
        icon: 'error',
      });
    }
  };

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Add Services" />
      <div className="">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label
              className="mb-2 block text-sm font-medium text-black dark:text-white"
              htmlFor="type"
            >
              Select Catagory
            </label>

            <select
              id="paymentMethod"
              {...register('servicesCatagory', { required: true })}
              onClick={(e: any) => setSelectedMethod(e?.target?.value)}
              className="py-3 w-full rounded-md border-2 border-boxdark-2 dark:border-boxdark-2dark dark:bg-meta-4 dark:focus:border-primary"
            >
              {/* Map through paymentMethods and render options */}
              {catagory?.data?.map((method: any) => (
                <option className=" " key={method._id} value={method._id}>
                  {method.name}
                </option>
              ))}
            </select>
          </div>

          <div className="w-full xl:w-1/2">
            <label className="mt-2.5 mb-0.5 block text-black dark:text-white">
              Service Name
            </label>
            <input
              type="string"
              {...register('name', { required: true })}
              placeholder="Name"
              className="w-full rounded border-[1.5px] border-boxdark-2 bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
            />
          </div>

          <div className="w-full xl:w-1/2">
            <label className="mt-2.5 mb-0.5 block text-black dark:text-white">
              Service Description
            </label>

            <textarea
              className="w-full border-[1.5px] rounded  border-boxdark-2 bg-gray p-2    text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
              id="description"
              rows={6}
              {...register('description', { required: true })}
              placeholder="Write your Service description here"
            ></textarea>
          </div>

          <div className="w-full xl:w-1/2">
            <label className="mt-2.5 mb-0.5 block text-black dark:text-white">
              Service Provider Name
            </label>
            <input
              type="string"
              {...register('serviceProviderName', { required: true })}
              placeholder="Service provider name"
              className="w-full rounded border-[1.5px] border-boxdark-2 bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
            />
          </div>

          <div className="w-full xl:w-1/2">
            <label className="mt-2.5 mb-0.5 block text-black dark:text-white">
              Phone
            </label>
            <input
              type="string"
              {...register('phone', { required: true })}
              placeholder="Phone"
              className="w-full rounded border-[1.5px] border-boxdark-2 bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
            />
          </div>
          <div className="w-full xl:w-1/2">
            <label className="mt-2.5 mb-0.5 block text-black dark:text-white">
              Email
            </label>
            <input
              type="email"
              {...register('email', { required: true })}
              placeholder="Email"
              className="w-full rounded border-[1.5px] border-boxdark-2 bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
            />
          </div>
          <div className="w-full xl:w-1/2">
            <label className="mt-2.5 mb-0.5 block text-black dark:text-white">
              Location
            </label>
            <input
              type="string"
              {...register('location', { required: true })}
              placeholder="location"
              className="w-full rounded border-[1.5px] border-boxdark-2 bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
            />
          </div>

          <Button cs="px-10 my-5 bg-primary" btnName="Submit"></Button>
        </form>
      </div>
    </DefaultLayout>
  );
};

export default AddServices;
