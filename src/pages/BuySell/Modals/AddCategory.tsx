import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import { PuffLoader } from 'react-spinners';
import axiosInstance from '../../../utils/axiosConfig';
import InputField from '../../../components/InputField';

export type ICatagory = {
  img?: any;
  description?: string;
  name: string;
  serialNo: number;
};
interface IUpdatePackage {
  fetchData: () => void;
  closeModal: () => void;
}

export const AddCategory = ({ fetchData, closeModal }: IUpdatePackage) => {
  const [lodaing, setLoading] = useState(false);
  const { register, handleSubmit } = useForm<ICatagory>();

  const onSubmit: SubmitHandler<ICatagory> = async (event: ICatagory) => {
    setLoading(true);
    event.serialNo = 999;
    const obj = { ...event };

    const img = obj['img'];

    delete obj['img'];

    const wrappedObj = { data: obj };

    const data = JSON.stringify(wrappedObj);

    const formData = new FormData();

    formData.append('img', img[0] as Blob);
    formData.append('data', data);

    for (let pair of formData.entries()) {
      console.log(`${pair[0]}:`, pair[1]);
    }

    try {
      const response = await axiosInstance.post(
        `/product-categorys`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        },
      );

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
                Add Catagory
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

              <InputField
                type="file"
                label="Image/icon"
                name="img"
                register={register}
                required
              />

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
