import { ChangeEvent, useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import { PuffLoader } from 'react-spinners';
import { getKgcAdminToken } from '../../hooks/handelAdminToken';
import axios from 'axios';

interface IUpdatePackage {
  fetchData: () => void;
  closeModal: () => void;
  updateItem: any;
}
type IService = {
  id: number;
  name: string; //
  description: string; //
  phone: string; //
  email: string; //
  location: string; //
  serviceProviderName: string;
  servicesCatagory: string; //
};

export const UpdateServiceModal = ({
  fetchData,
  closeModal,
  updateItem,
}: IUpdatePackage) => {
  const [lodaing, setLoading] = useState(false);
  const [formState, setFormState] = useState({ ...updateItem });
  const [selectedMethod, setSelectedMethod] = useState<any>();
  const [catagory, setCatagory] = useState<any>();

  const token = getKgcAdminToken();

  const getCatagory = async () => {
    const token = getKgcAdminToken();

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
      setCatagory(response?.data?.data);
    } catch (error) {
      // console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    getCatagory();
  }, []);

  const { register, handleSubmit, control } = useForm<IService>();

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormState({ ...formState, [name]: value });
  };

  const onSubmit: SubmitHandler<IService> = async (data: IService) => {
    setLoading(true);

    const newData = {
      ...data,
      servicesCatagory: selectedMethod,
    };

    try {
      const response = await fetch(
        `https://kgc-app.vercel.app/api/v1/services/${updateItem?._id}`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `${token}`,
          },
          body: JSON.stringify(newData),
        },
      );
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const responseData = await response.json();
      if (responseData.success) {
        setLoading(false);
        fetchData();
        Swal.fire({
          title: 'success',
          text: 'Successfully updated',
          icon: 'success',
        }).then(() => {
          closeModal();
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
    <div className="fixed left-0 top-0 z-999 flex h-full min-h-screen w-full items-center justify-center bg-black/90 py-5">
      <div
        className="overflow-auto  max-h-[80%] w-full max-w-fit rounded-lg bg-white   dark:bg-boxdark "
        onClick={(e) => {
          const target = e.target as HTMLDivElement;
          if (target.className === 'modal-container') closeModal();
        }}
      >
        <div className="modal rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark overflow-auto">
          <div className="min-w-full w-[370px] lg:w-[600px] border-b border-stroke  dark:border-strokedark">
            <div className="w-full bg-slate-200 flex justify-between  place-items-center p-2 py-3">
              <h2 className="text-xl font-bold text-black dark:text-white">
                Update Service
              </h2>

              <strong
                className="text-xl px-2 align-center cursor-pointer  hover:text-black dark:hover:text-white"
                onClick={closeModal}
              >
                X
              </strong>
            </div>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex  flex-col w-full gap-5.5 p-6.5"
            >
              <div>
                <p> name</p>
                <input
                  className="w-full rounded border border-stroke bg-gray py-3 pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                  {...register('name', { required: true })}
                  value={formState.name}
                  onChange={handleChange}
                />
              </div>

              <div>
                <p>description</p>
                <input
                  className="w-full rounded border border-stroke bg-gray py-3 pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                  {...register('description', { required: true })}
                  value={formState.description}
                  onChange={handleChange}
                />
              </div>

              <div>
                <p>phone</p>
                <input
                  className="w-full rounded border border-stroke bg-gray py-3 pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                  {...register('phone', { required: true })}
                  value={formState.phone}
                  onChange={handleChange}
                />
              </div>

              <div>
                <p>email</p>
                <input
                  className="w-full rounded border border-stroke bg-gray py-3 pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                  {...register('email', { required: true })}
                  value={formState.email}
                  onChange={handleChange}
                />
              </div>

              <div>
                <p>location </p>
                <input
                  className="w-full rounded border border-stroke bg-gray py-3 pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                  {...register('location', { required: true })}
                  value={formState.location}
                  onChange={handleChange}
                />
              </div>

              <div>
                <p>serviceProviderName </p>
                <input
                  className="w-full rounded border border-stroke bg-gray py-3 pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                  {...register('serviceProviderName', { required: true })}
                  value={formState.serviceProviderName}
                  onChange={handleChange}
                />
              </div>

              <div className="hidden">
                <p>servicesCatagory </p>
                <input
                  className="w-full rounded border border-stroke bg-gray py-3 pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                  {...register('servicesCatagory', { required: true })}
                  value={formState.servicesCatagory._id}
                  onChange={handleChange}
                />
              </div>

              <div className="w-full xl:w-1/2">
                <label
                  className="mb-2 block text-sm font-medium text-black dark:text-white"
                  htmlFor="type"
                >
                  Select Catagory: {formState?.servicesCatagory?.name}
                </label>

                <select
                  onClick={(e: any) => setSelectedMethod(e?.target?.value)}
                  defaultValue={formState?.servicesCatagory}
                  className="py-3 ps-3 w-full text-black bg-transparent rounded-md border-2 border-boxdark-2 dark:border-boxdark-2dark dark:bg-meta-4 dark:focus:border-primary"
                >
                  {catagory?.data?.map((method: any) => (
                    <option
                      className="text-black"
                      key={method._id}
                      value={method._id}
                    >
                      {method.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex justify-center gap-4">
                <div>
                  {lodaing ? (
                    <PuffLoader className="mx-auto" color="#36d7b7" size={40} />
                  ) : (
                    <button
                      className="btn flex justify-center rounded bg-primary py-2 px-6 font-medium text-gray hover:shadow-1"
                      type="submit"
                    >
                      Submit
                    </button>
                  )}
                </div>
                <button
                  type="button"
                  onClick={() => closeModal()}
                  className="btn flex justify-center rounded bg-danger py-2 px-6 font-medium text-gray hover:shadow-1"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
