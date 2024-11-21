import { ChangeEvent, useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import { PuffLoader } from 'react-spinners';
import axiosInstance from '../../../utils/axiosConfig';
import { IProduct } from './AddProduct';
import InputField from '../../../components/InputField';
import SelectOptions from '../../../Ui/SelectOptions';

interface IUpdatePackage {
  fetchData: () => void;
  closeModal: () => void;
  updateItem: IProduct;
}

export const UpdateProductModal = ({
  fetchData,
  closeModal,
  updateItem,
}: IUpdatePackage) => {
  console.log(updateItem);

  const [loading, setLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [selectedSubCategory, setSelectedSubCategory] = useState<string>('');
  const [categories, setCategories] = useState<any[]>([]);
  const [changedFields, setChangedFields] = useState<Partial<IProduct>>({});

  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm<IProduct>({
    defaultValues: {
      name: updateItem?.name || '',
      desc: updateItem?.desc || '',
      price: updateItem?.price || '0',
      brand: updateItem?.brand || 'Default Brand',
      phone: updateItem?.phone || '1234567890',

      isUsed: 1,
      categoryId: updateItem?.categoryId._id || '',
      subCategoryId: updateItem?.subCategoryId._id || '',
    },
  });

  // Populate categories from API
  const fetchCategories = async () => {
    try {
      const response = await axiosInstance.get('/product-categorys');
      setCategories(response?.data?.data?.data || []);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  useEffect(() => {
    fetchCategories();
    // Set default values when modal opens
    for (const key in updateItem) {
      setValue(key as keyof IProduct, updateItem[key as keyof IProduct]);
    }
  }, [updateItem]);

  // Track field changes
  // const handleFieldChange = (field: keyof IProduct, value: any) => {
  //   setChangedFields((prev) => ({ ...prev, [field]: value }));
  // };
  const handleFieldChange = (field: keyof IProduct, value: any) => {
    setChangedFields((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const onSubmit: SubmitHandler<IProduct> = async () => {
    // if (!Object.keys(changedFields).length) {
    //   Swal.fire('Warning', 'No changes detected', 'info');
    //   return;
    // }

    setLoading(true);

    const formData = new FormData();

    Object.entries(changedFields).forEach(([key, value]) => {
      if (key === 'img' || key === 'img2' || key === 'img3') {
        if (value) {
          formData.append(key, value as File);
        }
      } else {
        formData.append(key, value as string);
      }
    });

    try {
      const res = await axiosInstance.patch(
        `/products/${updateItem._id}`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        },
      );
      console.log(res);

      fetchData();
      closeModal();
      Swal.fire('Success', 'product updated', 'success');
    } catch (error) {
      Swal.fire('Error', 'Failed to update product', 'error');
    } finally {
      setLoading(false);
    }
  };

  const options = [
    { value: 'N/A', label: 'N/A' },
    { value: 'Used', label: 'Used' },
    { value: 'New', label: 'New' },
  ];

  return (
    <div className="fixed left-0 top-0 z-999 flex h-full min-h-screen w-full items-center justify-center bg-black/90 py-5">
      <div className="overflow-auto max-h-[80%] w-full max-w-fit rounded-lg bg-white dark:bg-boxdark">
        <div className="modal rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark overflow-auto">
          <div className="min-w-full w-[370px] lg:w-[600px] border-b border-stroke py-4 px-1 dark:border-strokedark">
            <div className="w-full flex justify-between px-3 place-items-center py-3">
              <h2 className="text-xl font-bold text-black dark:text-white">
                Update Product
              </h2>
              <strong
                className="text-4xl align-center cursor-pointer hover:text-black dark:hover:text-white"
                onClick={closeModal}
              >
                &times;
              </strong>
            </div>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col w-full gap-5.5 p-6.5"
            >
              <InputField
                type="text"
                label="Name"
                name="name"
                register={register}
                required
                onChange={(e: { target: { value: any } }) =>
                  handleFieldChange('name', e.target.value)
                }
              />
              <InputField
                type="text"
                label="Description"
                name="desc"
                register={register}
                required
                onChange={(e: { target: { value: any } }) =>
                  handleFieldChange('desc', e.target.value)
                }
              />
              <InputField
                type="text"
                label="Price"
                name="price"
                register={register}
                required
                onChange={(e: { target: { value: any } }) =>
                  handleFieldChange('price', e.target.value)
                }
              />
              <InputField
                type="text"
                label="Brand"
                name="brand"
                register={register}
                required
                onChange={(e: { target: { value: any } }) =>
                  handleFieldChange('brand', e.target.value)
                }
              />
              <InputField
                type="text"
                label="Phone"
                name="phone"
                register={register}
                required
                onChange={(e: { target: { value: any } }) =>
                  handleFieldChange('phone', e.target.value)
                }
              />
              {/* 
              <SelectOptions
                control={control}
                options={options}
                label="Product Type"
                name="isUsed"
                defaultValue={0}
                placeholder="Select..."
                onChange={(value: any) =>
                  handleFieldChange('isUsed', value.value)
                }
              /> */}
              <div>
                <p>Status</p>
                <select
                  className="w-full rounded border border-stroke bg-gray py-3 pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                  {...register('isUsed')}
                  // defaultValue={options[2]?.value} // Set default value to the value of index 2
                  onChange={(e) => handleFieldChange('isUsed', e.target.value)}
                >
                  {options.map((option, index) => (
                    <option key={index} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              <InputField
                type="file"
                label="Image 1"
                name="img"
                register={register}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  handleFieldChange('img', e.target.files?.[0])
                }
              />

              <InputField
                type="file"
                label="Image 2"
                name="img2"
                register={register}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  handleFieldChange('img2', e.target.files?.[0])
                }
              />

              <InputField
                type="file"
                label="Image 3"
                name="img3"
                register={register}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  handleFieldChange('img3', e.target.files?.[0])
                }
              />
              <select
                {...register('categoryId', {
                  onChange: (e) => {
                    handleFieldChange('categoryId', e.target.value);
                    setSelectedCategory(e.target.value);
                  },
                })}
                className="py-3 ps-3 w-full text-black bg-transparent rounded-md border-2 border-boxdark-2 dark:border-boxdark-2dark dark:bg-meta-4 dark:focus:border-primary"
              >
                <option value={updateItem?.categoryId?._id}>
                  {updateItem?.categoryId?.name}
                </option>
                {categories?.map((method: any) => (
                  <option
                    className="text-black"
                    key={method._id}
                    value={method._id}
                  >
                    {method.name}
                  </option>
                ))}
              </select>
              {(selectedCategory || updateItem?.categoryId?._id) && (
                <select
                  {...register('subCategoryId', {
                    onChange: (e) => {
                      handleFieldChange('subCategoryId', e.target.value);
                      setSelectedSubCategory(e.target.value);
                    },
                  })}
                  className="py-3 ps-3 w-full text-black bg-transparent rounded-md border-2 border-boxdark-2 dark:border-boxdark-2dark dark:bg-meta-4 dark:focus:border-primary"
                >
                  <option value={updateItem?.subCategoryId?._id}>
                    {updateItem?.subCategoryId?.name || 'Select Subcategory'}
                  </option>
                  {categories
                    ?.find(
                      (cat: any) =>
                        cat._id ===
                        (selectedCategory || updateItem?.categoryId?._id),
                    )
                    ?.subcategories?.map((sub: any) => (
                      <option key={sub._id} value={sub._id}>
                        {sub.name}
                      </option>
                    ))}
                </select>
              )}
              <SelectOptions
                control={control}
                options={[
                  { value: 'Approved', label: 'Approved' },
                  { value: 'Pending', label: 'Pending' },
                  { value: 'Rejected', label: 'Rejected' },
                ]}
                label="Status"
                name="status"
                defaultValue={updateItem.status}
                placeholder="Select..."
                onChange={(value: any) =>
                  handleFieldChange('status', value.value)
                }
              />
              <div className="flex  mt-7 justify-center gap-4">
                {loading ? (
                  <PuffLoader className="mx-auto" color="#36d7b7" size={40} />
                ) : (
                  <button
                    type="submit"
                    className="btn bg-primary text-gray rounded py-2 px-6"
                  >
                    Submit
                  </button>
                )}
                <button
                  type="button"
                  onClick={closeModal}
                  className="btn bg-danger text-gray rounded py-2 px-6"
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
