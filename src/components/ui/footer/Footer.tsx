import { titleFont } from '@/config'
import Link from 'next/link'

export const Footer = () => {
  return (
    <div className='flex w-full justify-center text-xs mb-10'>
        <Link href='/'>
            <span className={`${ titleFont.className} antialiased font-bold`}>My E-shop</span>
        </Link>
            <span className='ml-2'>&copy; {new Date().getFullYear()}</span>

        <Link href='/'>
            <span className='ml-2'>Privacy Policy</span>
        </Link>

        <Link href='/'>
            <span className='ml-2'>Refund Policy</span>
        </Link>

        <Link href='/'>
            <span className='ml-2'>Terms of Service</span>
        </Link>
    </div>
  )
}
