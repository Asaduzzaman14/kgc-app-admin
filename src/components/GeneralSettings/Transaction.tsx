import { SubmitHandler, useForm } from 'react-hook-form';
import SelectOptions from '../../Ui/SelectOptions';
import Button from '../../Ui/Button';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

type IStatus = {
  status: {
    value: string;
    lavle: string;
  };
};

interface IInput {
  transfer_charge: string;
  min_transfer: string;
  max_transfer: string;
  status: string | IStatus | any;
}

const Transaction = () => {
  const [lodaing, setLoading] = useState(false);
  const [transaction, setTransaction] = useState<any>([]);
  const { register, handleSubmit, reset, control } = useForm<IInput>();
  const options = [
    { value: '0', label: 'Disable' },
    { value: '1', label: 'Enable' },
  ];

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        'https://biztoken.fecotrade.com/api/transfer-setting',
        {
          headers: {
            Authorization: ``,
            'Content-Type': 'application/json',
          },
        },
      );
      setLoading(false);
      setTransaction(response?.data[0]);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const onSubmit: SubmitHandler<IInput> = async (data: IInput) => {
    for (const key in data) {
      if (data[key as keyof IInput] === '') {
        data[key as keyof IInput] = transaction[0][key];
      }
    }

    const newData = {
      ...data,
      status: data?.status?.value,
      id: transaction[0]?.id,
    };

    try {
      const response = await fetch(
        'https://biztoken.fecotrade.com/api/transfer-setting/update',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: ``,
          },
          body: JSON.stringify(newData),
        },
      );

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const responseData = await response.json();

      if (responseData.success) {
        Swal.fire({
          title: 'success',
          text: 'Successfully Update',
          icon: 'success',
        });
      }
    } catch (error) {
      Swal.fire({
        title: 'Faield',
        text: 'Failed to update',
        icon: 'error',
      });
    }
  };

  return (
    <div className="mt-10">
      <h2 className="text-title-md2 font-semibold text-black dark:text-white">
        {'Transaction to USDT'}
      </h2>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5.5">
        <div className="w-full xl:w-1/2">
          <label className="mt-2.5 mb-0.5 block text-black dark:text-white">
            Transfer Charge
          </label>
          <input
            type="text"
            placeholder="transfer_charge"
            {...register('transfer_charge')}
            defaultValue={transaction[0]?.transfer_charge}
            className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
          />
        </div>

        <div className="w-full xl:w-1/2">
          <label className="mt-2.5 mb-0.5 block text-black dark:text-white">
            Min. transfare
          </label>
          <input
            type="text"
            placeholder="Min transfare"
            {...register('min_transfer')}
            defaultValue={transaction[0]?.min_transfer}
            className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
          />
        </div>
        <div className="w-full xl:w-1/2">
          <label className="mt-2.5 mb-0.5 block text-black dark:text-white">
            Max. transfare
          </label>
          <input
            type="text"
            placeholder="Max transfare"
            {...register('max_transfer')}
            defaultValue={transaction[0]?.max_transfer}
            className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
          />
        </div>
        {transaction[0]?.status && (
          <div className="w-full xl:w-1/2">
            <SelectOptions
              control={control}
              options={options}
              label="Status"
              name="status"
              defaultValue={Number(transaction[0]?.status)}
              // defaultValue={'active'}
              placeholder={'Select...'}
            />
          </div>
        )}

        <Button cs="px-10 w-fit my-5 bg-primary" btnName="Update"></Button>
      </form>
    </div>
  );
};

export default Transaction;
