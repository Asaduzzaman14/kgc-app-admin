import { ChangeEvent, useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import { PuffLoader } from 'react-spinners';
import axiosInstance from '../../../utils/axiosConfig';
import { ICatagory } from './AddCategory';
import InputField from '../../../components/InputField';

interface IUpdatePackage {
  fetchData: () => void;
  closeModal: () => void;
  updateItem: any | any;
}

export const UpdateBSCatagoryModal = ({
  fetchData,
  closeModal,
  updateItem,
}: IUpdatePackage) => {
  const [lodaing, setLoading] = useState(false);
  const [formState, setFormState] = useState<any>({});
  const { register, handleSubmit, control } = useForm<any>();
  const [selectedMethod, setSelectedMethod] = useState<any>('');
  const [selectedMethodId, setSelectedMethodId] = useState<any>('');

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormState({ ...formState, [name]: value });
  };

  const onSubmit: SubmitHandler<ICatagory> = async (event: ICatagory) => {
    setLoading(true);

    event.serialNo = Number(event.serialNo);
    const obj = { ...event };

    console.log(obj);

    const img = obj['icon'];

    delete obj['icon'];

    const wrappedObj = { data: obj };

    const data = JSON.stringify(wrappedObj);

    const formData = new FormData();

    formData.append('icon', img[0] as Blob);
    formData.append('data', data);

    try {
      const response = await axiosInstance.patch(
        `/product-categorys/${updateItem._id}`,
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
          text: 'Successfully data updated',
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

  const upSelect = (e: any) => {
    const selectedCategory = catagory?.data?.find((cat: any) => cat._id === e);
    if (selectedCategory) {
      setSelectedMethod(selectedCategory.name);
      setSelectedMethodId(e);
    }
  };

  useEffect(() => {
    setSelectedMethod(updateItem?.category?.name);
    setSelectedMethodId(updateItem?.category?._id);
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
                Update Catagory
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
                <p>Catagory name</p>
                <input
                  className="w-full rounded border border-stroke bg-gray py-3 pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                  {...register('name', { required: true })}
                  defaultValue={updateItem.name}
                  onChange={handleChange}
                />
              </div>
              <div>
                <p>Description</p>
                <input
                  className="w-full rounded border border-stroke bg-gray py-3 pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                  {...register('description', { required: true })}
                  defaultValue={updateItem.description}
                  onChange={handleChange}
                />
              </div>
              <InputField
                type="file"
                label="Image/icon"
                name="icon"
                register={register}
              />
              <div>
                <p>Serial No</p>
                <input
                  className="w-full rounded border border-stroke bg-gray py-3 pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                  {...register('serialNo', { required: true })}
                  type="number"
                  value={formState.serialNo}
                  onChange={handleChange}
                />
              </div>

              {/* <div className="w-full">
                <label
                  className="mb-2 block text-sm font-medium text-black dark:text-white"
                  htmlFor="type"
                >
                  Select Catagory: {updateItem?.category?.name}
                </label>

                <select
                  onChange={(e: any) => upSelect(e?.target?.value)}
                  value={'default'}
                  className="py-3 ps-3 min-w-full text-black bg-transparent rounded-md border-2 border-boxdark-2 dark:border-boxdark-2dark dark:bg-meta-4 dark:focus:border-primary"
                >
                  <option value="default" disabled>
                    {selectedMethod}
                  </option>
                  {catagory?.data?.map((method: any, i: any) => (
                    <option
                      className="text-black"
                      key={method._id}
                      value={method?._id}
                    >
                      {method.name}
                    </option>
                  ))}
                </select>
              </div> */}

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
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
