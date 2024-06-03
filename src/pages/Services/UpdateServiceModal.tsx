import { ChangeEvent, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import { PuffLoader } from 'react-spinners';

interface IUpdatePackage {
  fetchData: () => void;
  closeModal: () => void;
  updateItem: any;
}
type IService = {
  id: number;
  serviceProviderName: string;
  phone: string;
  email: string;
  description: string;
  location: string;

  name: string;

  createdAt?: string;
  updatedAt?: string;
};

export const UpdateServiceModal = ({
  fetchData,
  closeModal,
  updateItem,
}: IUpdatePackage) => {
  const [lodaing, setLoading] = useState(false);
  const [formState, setFormState] = useState({ ...updateItem });
  const { register, handleSubmit, control } = useForm<IService>();

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormState({ ...formState, [name]: value });
  };
  const onSubmit: SubmitHandler<IService> = async (data: IService) => {
    setLoading(true);

    const newData = {
      ...data,
    };
    console.log(updateItem);
    return;

    try {
      const token = localStorage.getItem(' ');
      const response = await fetch(' ', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newData),
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const responseData = await response.json();
      if (responseData.success) {
        setLoading(false);
        fetchData();
        Swal.fire({
          title: 'success',
          text: 'Successfully updated package',
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
                <p>Service name</p>
                <input
                  className="w-full rounded border border-stroke bg-gray py-3 pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                  {...register('name', { required: true })}
                  defaultChecked={formState.name}
                  onChange={handleChange}
                />
              </div>
              <div>
                <p>Service </p>
                <input
                  className="w-full rounded border border-stroke bg-gray py-3 pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                  {...register('description', { required: true })}
                  value={formState.description}
                  onChange={handleChange}
                />
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
