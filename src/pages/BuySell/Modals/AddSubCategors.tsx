import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import { PuffLoader } from 'react-spinners';
import axiosInstance from '../../../utils/axiosConfig';
import InputField from '../../../components/InputField';

export type ICatagory = {
  img?: any;
  description?: string;
  category?: string;
  name: string;
  serialNo: number;
};
interface IUpdatePackage {
  fetchData: () => void;
  closeModal: () => void;
}

export const AddSubCategors = ({ fetchData, closeModal }: IUpdatePackage) => {
  const [lodaing, setLoading] = useState(false);
  const { register, handleSubmit } = useForm<ICatagory>();

  const onSubmit: SubmitHandler<ICatagory> = async (event: ICatagory) => {
    setLoading(true);
    event.serialNo = 999;

    // for (let pair of formData.entries()) {
    //   console.log(`${pair[0]}:`, pair[1]);
    // }

    try {
      const response = await axiosInstance.post(`/sub-categorys`, event);

      setLoading(false);
      if (response?.data?.success) {
        fetchData();
        Swal.fire({
          title: 'success',
          text: 'Successfully data Added',
          icon: 'success',
        }).then(() => {
          closeModal();
        });
      }
    } catch (error) {
      setLoading(false);

      Swal.fire({
        title: 'error',
        text: 'Something wrong',
        icon: 'error',
      });
    }
  };

  const [catagory, setCatagory] = useState<any>();

  const getServices = async () => {
    try {
      const response = await axiosInstance.get('/product-categorys');
      setCatagory(response?.data?.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    getServices();
  }, []);

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
          <div className="min-w-full w-[370px] lg:w-[600px] border-b border-stroke py-4 px-1 dark:border-strokedark">
            <div className="w-full flex justify-between px-3 place-items-center py-3">
              <h2 className="text-xl font-bold text-black dark:text-white">
                Add Sub Catagory
              </h2>

              <strong
                className="text-4xl align-center cursor-pointer  hover:text-black dark:hover:text-white"
                onClick={closeModal}
              >
                &times;
              </strong>
            </div>
            <hr />
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex  flex-col w-full gap-5.5 p-6.5"
            >
              <InputField
                type="text"
                label="Name"
                name="name"
                register={register}
                required
              />

              <InputField
                type="text"
                label="description"
                name="description"
                register={register}
                required
              />
              <div className="w-full xl:w-1/2">
                <label
                  className="mb-2 block text-sm font-medium text-black dark:text-white"
                  htmlFor="type"
                >
                  Select Catagory
                </label>

                <select
                  id="category"
                  {...register('category', { required: true })}
                  // onClick={(e: any) => setSelectedMethod(e?.target?.value)}
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
