import { Link, useNavigate } from 'react-router-dom';

import { LuMenu } from 'react-icons/lu';
import DropdownUser from './DropdownUser';
import { IoCloseSharp } from 'react-icons/io5';
import { removeKgcAdminToken } from '../../hooks/handelAdminToken';

const Header = (props: {
  sidebarOpen: string | boolean | undefined;
  setSidebarOpen: (arg0: boolean) => void;
}) => {
  const navigate = useNavigate();
  const logout = () => {
    removeKgcAdminToken();
    navigate('/');
  };

  return (
    <header className="sticky top-0 z-999 flex w-full bg-white drop-shadow-1">
      <div className="flex flex-grow items-center justify-between px-4 py-4 shadow-2 md:px-6 2xl:px-11">
        <div className="flex items-center gap-2 sm:gap-4 lg:hidden">
          {/* <!-- Hamburger Toggle BTN --> */}
          <button
            aria-controls="sidebar"
            onClick={(e) => {
              e.stopPropagation();
              props.setSidebarOpen(!props.sidebarOpen);
            }}
            className="z-99999 block rounded-sm border border-stroke bg-white p-1.5 shadow-sm dark:border-strokedark dark:bg-boxdark lg:hidden"
          >
            <span className="relative block  cursor-pointer">
              {props.sidebarOpen && <IoCloseSharp className="text-xl" />}

              {!props.sidebarOpen && <LuMenu className="text-xl" />}
            </span>
          </button>
          {/* <!-- Hamburger Toggle BTN --> */}

          <Link className="block flex-shrink-0 lg:hidden" to="/">
            {/* <img className="w-8" src={LogoIcon} alt="Logo" /> */}
          </Link>
        </div>

        <div className="flex lg:ms-auto items-center gap-3 2xsm:gap-5">
          <ul className="flex items-center gap-2 2xsm:gap-4">
            {/* <!-- Dark Mode Toggler --> */}
            {/* <DarkModeSwitcher /> */}
            {/* <!-- Dark Mode Toggler --> */}
          </ul>

          {/* <!-- User Area --> */}
          <DropdownUser />
          {/* <!-- User Area --> */}

          <button
            onClick={logout}
            className="inline-flex items-center justify-center rounded-md bg-meta-7  py-2 px-4 text-center font-medium text-white hover:bg-opacity-90"
          >
            Logout
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
