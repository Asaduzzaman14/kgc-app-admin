import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import { PuffLoader } from 'react-spinners';
import axiosInstance from '../../../utils/axiosConfig';
import InputField from '../../../components/InputField';
import SelectOptions from '../../../Ui/SelectOptions';

export type IProduct = {
  _id: string;
  name: string;
  desc: string;
  brand: string;
  price: string;
  discountPrice: string;
  category: string;

  phone: string;
  isUsed: string | any;

  categoryId: string | any;
  subCategoryId: string | any;

  serialNo?: number;
  img?: string;
  img2?: string;
  img3?: string;
  status: string;
};

interface IUpdatePackage {
  fetchData: () => void;
  closeModal: () => void;
}

export const AddProduct = ({ fetchData, closeModal }: IUpdatePackage) => {
  const [lodaing, setLoading] = useState(false);
  const { register, handleSubmit, control } = useForm<IProduct>();

  const onSubmit: SubmitHandler<IProduct> = async (event: IProduct) => {
    //  setLoading(true);
    console.log(event);

    const obj = { ...event };

    const img = obj['img'];
    const img2 = obj['img2'];
    const img3 = obj['img3'];

    const formData = new FormData();
    formData.append('name', obj.name);
    formData.append('desc', obj.desc);
    formData.append('brand', obj.brand);

    formData.append('price', obj.price);
    formData.append('phone', obj.phone);
    formData.append('isUsed', obj.isUsed.value);

    formData.append('discountPrice', obj.discountPrice || '0');

    formData.append('subCategoryId', obj.subCategoryId);
    formData.append('categoryId', obj.categoryId);

    formData.append('serialNo', '999');

    if (img) {
      formData.append('img', img[0]);
    }
    if (img2) {
      formData.append('img2', img2[0]);
    }
    if (img3) {
      formData.append('img3', img3[0]);
    }
    for (let pair of formData.entries()) {
      console.log(`${pair[0]}:`, pair[1]);
    }
    try {
      const response = await axiosInstance.post(`/products`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

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
  const [selectedMethod, setSelectedMethod] = useState<any>();
  const [selectedSubCatagory, setSelectedSubCatagory] = useState<any>();

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

  const subCatagorys = catagory?.data?.find(
    (ct: any) => ct._id == selectedMethod,
  );

  const options = [
    { value: 'N/A', label: 'N/A' },
    { value: 'Used', label: 'Used' },
    { value: 'New', label: 'New' },
  ];

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
                Add Product
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
                label="name"
                name="name"
                register={register}
                required
              />

              <InputField
                type="text"
                label="desc"
                name="desc"
                register={register}
                required
              />
              <InputField
                type="text"
                label="price"
                name="price"
                register={register}
                required
              />
              <InputField
                type="text"
                label="Brand"
                name="brand"
                register={register}
                required
              />

              <InputField
                type="text"
                label="Phone"
                name="phone"
                register={register}
                required
              />

              <SelectOptions
                control={control}
                options={options}
                label="Product type"
                name="isUsed"
                defaultValue={0}
                placeholder={'Select...'}
              />

              <InputField
                type="file"
                label="Image/icon"
                name="img"
                register={register}
                required
              />

              <InputField
                type="file"
                label="Image/icon"
                name="img2"
                register={register}
                required
              />

              <InputField
                type="file"
                label="Image/icon"
                name="img3"
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
                  {...register('categoryId', { required: true })}
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
                <label
                  className="mb-2 block text-sm font-medium text-black dark:text-white"
                  htmlFor="type"
                >
                  Select Sub Catagory
                </label>

                <select
                  id="subCategory"
                  {...register('subCategoryId', { required: true })}
                  onClick={(e: any) => setSelectedSubCatagory(e?.target?.value)}
                  className="py-3 ps-3 w-full text-black bg-transparent rounded-md border-2 border-boxdark-2 dark:border-boxdark-2dark dark:bg-meta-4 dark:focus:border-primary"
                >
                  {/* Map through paymentMethods and render options */}
                  {subCatagorys?.subcategories?.map((method: any) => (
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
