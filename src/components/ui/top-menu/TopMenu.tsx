'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

import { IoSearchOutline, IoCartOutline } from 'react-icons/io5';

import { titleFont } from '@/config';
import { OpenMenuButton } from './OpenMenuButton';

import { useCartStore } from '@/store';

export const TopMenu = () => {
  const totalItemsInCart = useCartStore((state) => state.getTotalItems());
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);



  return (
    <nav className="flex px-5 justify-between items-center w-full">
      {/* Logo */}
      <div>
        <Link href="/">
          <span className={`${titleFont.className} antialiased font-bold`}>
            My E-shop
          </span>
        </Link>

        {/* Center Menu */}
      </div>
      <div className="hidden sm:block">
        <Link
          href="/gender/men"
          className="m-2 p-2 rounded-md transition-all hover:bg-gray-100"
        >
          Men
        </Link>
        <Link
          href="/gender/women"
          className="m-2 p-2 rounded-md transition-all hover:bg-gray-100"
        >
          Women
        </Link>
        <Link
          href="/gender/kid"
          className="m-2 p-2 rounded-md transition-all hover:bg-gray-100"
        >
          Kids
        </Link>
      </div>

      {/* Search Cart and Menu */}
      <div className="flex items-center">
        <Link href="/search" className="mx-2">
          <IoSearchOutline className="w-5 h-5 cursor-pointer" />
        </Link>

        <Link href={
          ((totalItemsInCart > 0) && loaded) 
          ? "/cart"
          : "/empty"
          } className="mx-2">
          <div className="relative">
            { loaded && totalItemsInCart > 0 && (
              <span className="absolute text-xs rounded-full px-1 font-bold -top-2 bg-red-700 text-white -right-2 fade-in">
                {totalItemsInCart}
              </span>
            )}
            <IoCartOutline className="w-5 h-5 cursor-pointer" />
          </div>
        </Link>
        <OpenMenuButton />
      </div>
    </nav>
  );
};
