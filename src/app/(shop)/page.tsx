//revalidate every 60 seconds
export const revalidate = 60;

import { redirect } from 'next/navigation';

import { Pagination, Title } from '@/components';
import { ProductGrid } from '@/components';
import { getPaginatedProductsWithImages } from '../../actions/product/product-pagination';

//get Search Params
interface Props {
  searchParams: {
    page?: string;
  };
}

export default async function Home({searchParams}: Props) {

  const page = searchParams.page ? parseInt(searchParams.page) : 1;
  const {products, currentPage, totalPages} = await getPaginatedProductsWithImages({page});

  if(products.length === 0) {
    redirect('/');
  }

  return (
    <>
      <Title title="Store" subtitle="All Products" className="mb-2" />
      <ProductGrid products={products} />

      <Pagination totalPages={ totalPages} />
    </>
  );
  
}
