import { ChangeEvent, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { PuffLoader } from 'react-spinners';
import Swal from 'sweetalert2';
import { getKgcAdminToken } from '../../hooks/handelAdminToken';

type Ibanner = {
  img: string;
};

const BannerUpdate = ({ fetchData, closeModal, updateItem }: any) => {
  const [lodaing, setLoading] = useState(false);

  const [formState, setFormState] = useState({ ...updateItem });

  const { register, handleSubmit, control } = useForm<Ibanner>();

  const onSubmit: SubmitHandler<Ibanner> = async (data: Ibanner) => {
    try {
      const token = getKgcAdminToken();
      console.log(data, 'aasasa');
      const response = await fetch(
        `https://kgc-app.vercel.app/api/v1/banner/${updateItem._id}`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `${token}`,
          },
          body: JSON.stringify(data),
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
          text: 'Successfully updated Banner',
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
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormState({ ...formState, [name]: value });
  };

  return (
    <div>
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
                  Update Banner
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
                <div>
                  <p>Image url</p>
                  <input
                    className="w-full rounded border border-stroke bg-gray py-3 pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                    {...register('img', { required: true })}
                    value={formState.img}
                    onChange={handleChange}
                  />
                </div>

                <div className="flex justify-center gap-4">
                  <div>
                    {lodaing ? (
                      <PuffLoader
                        className="mx-auto"
                        color="#36d7b7"
                        size={40}
                      />
                    ) : (
                      <button
                        className="btn flex justify-center rounded bg-primary py-2 px-6 font-medium text-gray hover:shadow-1"
                        type="submit"
                      >
                        Submit
                      </button>
                    )}
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BannerUpdate;
