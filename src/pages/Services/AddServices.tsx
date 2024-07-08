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
  name: string;
  description: string;
  phone: string;
  email: string;
  location: string;
  addressDegree: string;
  servicesCatagory: string;
  serviceProviderName: string;
};
const AddServices = () => {
  const [settings, setSettings] = useState<Inputs[] | null>([]);
  const { register, handleSubmit } = useForm<Inputs>();
  const token = getKgcAdminToken();

  const [catagory, setCatagory] = useState<any>();
  const [location, setLocation] = useState<any>();
  console.log(location);

  const [selectedMethod, setSelectedMethod] = useState<any>();

  const getServices = async () => {
    const token = getKgcAdminToken();

    try {
      const response = await axios.get(
        'https://kgc-app-sigma.vercel.app/api/v1/services-catagory',
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
    getServices();
  }, []);

  const onSubmit = async (formData: any) => {
    formData.status = true;
    console.log(formData);

    const token = getKgcAdminToken();
    try {
      const response = await fetch(
        'https://kgc-app-sigma.vercel.app/api/v1/services',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `${token}`,
          },
          body: JSON.stringify(formData),
        },
      );
      console.log(response);

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const responseData = await response.json();

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

  const locations = [
    {
      id: 1,
      locatin: 'খাগড়াছড়ি সদর',
    },
    {
      id: 2,
      locatin: 'পানছড়ি',
    },
    {
      id: 3,
      locatin: 'মাটিরাঙ্গা',
    },
    {
      id: 4,
      locatin: 'দীঘিনালা ',
    },
    {
      id: 5,
      locatin: 'মানিকছড়ি',
    },
    {
      id: 6,
      locatin: 'মহালছড়ি',
    },
    {
      id: 7,
      locatin: 'রামগড়',
    },
    {
      id: 8,
      locatin: 'গুইমারা ',
    },
    {
      id: 9,
      locatin: 'লক্ষ্মীছড়ি  ',
    },
  ];

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Add Services" />
      <div className="">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="w-full xl:w-1/2">
            <label
              className="mb-2 block text-sm font-medium text-black dark:text-white"
              htmlFor="type"
            >
              Select Catagory
            </label>

            <select
              id="servicesCatagory"
              {...register('servicesCatagory', { required: true })}
              onClick={(e: any) => setSelectedMethod(e?.target?.value)}
              className="py-3 ps-3 w-full text-black bg-transparent rounded-md border-2 border-boxdark-2 dark:border-boxdark-2dark dark:bg-meta-4 dark:focus:border-primary"
            >
              {/* Map through paymentMethods and render options */}
              {catagory?.data?.map((method: any) => (
                <option
                  className="text-black "
                  key={method._id}
                  value={method._id}
                >
                  {method.name}
                </option>
              ))}
            </select>
          </div>
          <div className="w-full xl:w-1/2">
            <label className="mt-2.5 mb-0.5 block text-black dark:text-white">
              serviceProviderName
            </label>
            <input
              type="string"
              {...register('serviceProviderName', { required: true })}
              placeholder="serviceProviderName"
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
              addressDegree
            </label>
            <input
              type="string"
              {...register('addressDegree', { required: true })}
              placeholder="addressDegree"
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
              Name
            </label>
            <input
              type="name"
              {...register('name', { required: true })}
              placeholder="Name"
              className="w-full rounded border-[1.5px] border-boxdark-2 bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
            />
          </div>
          <div className="w-full xl:w-1/2">
            <label
              className="mt-2 block text-sm font-medium text-black dark:text-white"
              htmlFor="type"
            >
              Select Location
            </label>

            <select
              id="paymentMethod"
              {...register('location', { required: true })}
              onClick={(e: any) => setLocation(e?.target?.value)}
              className="py-3 ps-3 w-full bg-transparent rounded-md border-2 border-boxdark-2 dark:border-boxdark-2dark dark:bg-meta-4 dark:focus:border-primary"
            >
              {locations?.map((locatin: any) => (
                <option className=" " key={locatin.id} value={locatin.locatin}>
                  {locatin.locatin}
                </option>
              ))}
            </select>
          </div>

          {/* <div className="w-full xl:w-1/2">
            <label className="mt-2.5 mb-0.5 block text-black dark:text-white">
              Service Name
            </label>
            <input
              type="string"
              {...register('name', { required: true })}
              placeholder="Name"
              className="w-full rounded border-[1.5px] border-boxdark-2 bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
            />
          </div> */}

          {/* <div className="w-full xl:w-1/2">
            <label className="mt-2.5 mb-0.5 block text-black dark:text-white">
              Location
            </label>
            <input
              type="string"
              {...register('location', { required: true })}
              placeholder="location"
              className="w-full rounded border-[1.5px] border-boxdark-2 bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
            />
          </div> */}

          <Button cs="px-10 my-5 bg-primary" btnName="Submit"></Button>
        </form>
      </div>
    </DefaultLayout>
  );
};

export default AddServices;

// 1 category
// 2 service provider name
// 3 desc
// 4 address/degree

// 5 phone
// 6 email
// 7 location
