import { titleFont } from '@/config';
import Image from 'next/image';
import Link from 'next/link';

export const PageNotFound = () => {
  return (
    <div className="flex flex-col-reverse md:flex-row h-[800px] w-full justify-center items-center align-middle">
      <div className="text-center px-5 mx-5">
        <h2 className={`${titleFont.className} antialiased text-9xl`}>404</h2>
        <p className="font-semibold text-xl">Uh oh! page not found</p>
        <p className="font-light">
          <span>You can return to </span>
          <Link href="/" className="font-normal hover:underline transition-all">
            Home
          </Link>
        </p>
      </div>
      <div className="px-5 mx-5">
        <Image
          src="/images/starchin.png"
          width={500}
          height={500}
          alt="404"
          className="p-5 sm:p-0"
        />
      </div>
    </div>
  );
};
