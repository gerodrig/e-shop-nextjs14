import { Address } from '@/interfaces/';

type Props = Address;

export const DeliveryAddress = ({...address}: Props) => {
  return (
    <div className="mb-10">
      <p className="text-xl">{`${address.firstName} ${address.lastName}`}</p>
      <p>{address.address}</p>
      <p>{`${address.city }`}</p>
      <p>{address.postalCode}</p>
      <p>{address.country}</p>
      <p>{address.phone}</p>
    </div>
  )
}
