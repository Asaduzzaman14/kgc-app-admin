import { PuffLoader } from 'react-spinners';
import DefaultLayout from '../layout/DefaultLayout';

const Lazyloding = () => {
  return (
    <DefaultLayout>
      <PuffLoader className="mx-auto" color="#36d7b7" size={40} />
    </DefaultLayout>
  );
};

export default Lazyloding;
