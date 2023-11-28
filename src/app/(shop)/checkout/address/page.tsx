import { Title } from '@/components';
import Link from 'next/link';

export default function AddressPage() {
  return (
    <div className="flex flex-col sm:justify-center sm:items-center mb-72 px-10 sm:px-0">
      <div className="w-full  xl:w-[1000px] flex flex-col justify-center text-left">
        <Title title="Address" subtitle="Delivery address" />
        <div className="grid grids-cols-1 gap-2 sm:gap-5 sm:grid-cols-2">
          <div className="flex flex-col mb-2">
            <span>Name</span>
            <input type="text" className="p2 border rounded-md bg-gray-200" />
          </div>
          <div className="flex flex-col mb-2">
            <span>Lastname</span>
            <input type="text" className="p2 border rounded-md bg-gray-200" />
          </div>
          <div className="flex flex-col mb-2">
            <span>Address</span>
            <input type="text" className="p2 border rounded-md bg-gray-200" />
          </div>
          <div className="flex flex-col mb-2">
            <span>Address 2 (optional)</span>
            <input type="text" className="p2 border rounded-md bg-gray-200" />
          </div>
          <div className="flex flex-col mb-2">
            <span>Postal Code</span>
            <input type="text" className="p2 border rounded-md bg-gray-200" />
          </div>
          <div className="flex flex-col mb-2">
            <span>City</span>
            <input type="text" className="p2 border rounded-md bg-gray-200" />
          </div>
          <div className="flex flex-col mb-2">
            <span>Country</span>
            <select name="" id="" className="p-2 border rounded-md bg-gray-200">
              <option value="">[Select]</option>
              <option value="CAN">Canada</option>
            </select>
          </div>
          <div className="flex flex-col mb-2">
            <span>Telephone</span>
            <input type="text" className="p2 border rounded-md bg-gray-200" />
          </div>

          <div className="flex flex-col mb-2 sm:mt-10">
            <Link
              href="/checkout"
              className="flex btn-primary w0full sm:w-1/2 justify-center"
            >
              Next
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
