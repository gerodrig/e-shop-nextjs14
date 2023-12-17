'use client';

import { useSession } from 'next-auth/react';
import {
  IoCloseOutline,
  IoLogInOutline,
  IoLogOutOutline,
  IoPeopleOutline,
  IoPersonOutline,
  IoSearchOutline,
  IoShirtOutline,
  IoTicketOutline,
} from 'react-icons/io5';

import clsx from 'clsx';
import { SidebarItem } from './SidebarItem';
import { AuthButton } from './AuthButton';
import { useUIStore } from '@/store';
// import { Loader } from '../animations/Loader';

export const Sidebar = () => {
  const isSideMenuOpen = useUIStore((state) => state.isSideMenuOpen);
  const closeMenu = useUIStore((state) => state.closeSideMenu);

  const { data: session } = useSession();
  const isAuthenticated = !!session?.user;

  const { user } = session ?? { user: null };
  const isAdmin = user?.role === 'admin';


  return (
    <div>
      {/* black blackground */}
      {isSideMenuOpen && (
        <div className="fixed top-0 left-0 w-screen h-screen z-10 bg-black opacity-30" />
      )}

      {/* blur */}
      {isSideMenuOpen && (
        <div
          onClick={closeMenu}
          className="fade-in fixed top-0 left-0 w-screen h-screen z-10 backdrop-filter backdrop-blur-sm"
        />
      )}

      {/* // Sidemenu */}
      <nav
        className={clsx(
          'fixed p-5 right-0 top-0 w-[500px] h-screen bg-white z-20 shadow-2xl transform transition-all duration-300',
          {
            'translate-x-full': !isSideMenuOpen,
          }
        )}
      >
        <div>
          {isAuthenticated && user && (
            <p className="font-bold">Hello, {user?.name}</p>
          )}
          <IoCloseOutline
            size={50}
            className="absolute top-5 right-5 cursor-pointer"
            onClick={closeMenu}
          />
        </div>

        {/* Input */}
        <div className="relative mt-14">
          <IoSearchOutline size={20} className="absolute top-2 left-2" />
          <input
            type="text"
            placeholder="Search"
            className="w-full bg-gray-50 rounded pl-10 py-1 pr-10 border-b-2 text-xl border-gray-200 focus:outline-none focus:border-blue-500 transition-all"
          />
        </div>

        {/* Menu */}
        {isAuthenticated && (
          <>
            <SidebarItem
              Icon={IoPersonOutline}
              name="Profile"
              href="/profile"
              onClick={closeMenu}
            />
            <SidebarItem
              Icon={IoTicketOutline}
              name="Orders"
              href="/orders"
              onClick={closeMenu}
            />
          </>
        )}

        {!isAuthenticated && (
          <SidebarItem
            Icon={IoLogInOutline}
            name="Sign In"
            href="/auth/login"
            onClick={closeMenu}
          />
        )}

        {isAuthenticated && (
          <AuthButton
            Icon={IoLogOutOutline}
            action="logout"
            onClick={closeMenu}
            redirectTo="/"
          />
        )}

        {isAuthenticated && isAdmin && (
          <>
            {/* Line Separator */}
            <div className="w-full h-px bg-gray-200 my-10" />
            <SidebarItem onClick={closeMenu} Icon={IoShirtOutline} name="Products" href="/admin/products" />
            <SidebarItem onClick={closeMenu} Icon={IoTicketOutline} name="Orders" href="/admin/orders" />
            <SidebarItem onClick={closeMenu} Icon={IoPeopleOutline} name="Users" href="/admin/users" />
          </>
        )}
      </nav>
    </div>
  );
};
