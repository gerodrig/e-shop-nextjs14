
//revalidate every 60 seconds
export const revalidate = 60;

// import { initialData } from '@/seed/seed';
import { redirect } from "next/navigation";

import { Title, ProductGrid, Pagination } from "@/components";
import { Gender } from "@/interfaces";
import { getPaginatedProductsWithImages } from '@/actions/product/product-pagination';

interface Props {
  params: {
    gender: string;
  },
  searchParams: {
    page?: string;
  }
}

// const Seedproducts = initialData.products;


export default async function CategoryPage({ params, searchParams }: Props) {

  const { gender } = params;
  // const products = Seedproducts.filter(({gender}) => gender === id);
  const page = searchParams.page ? parseInt(searchParams.page) : 1;
  const {products, currentPage, totalPages } = await getPaginatedProductsWithImages({page, gender: gender as Gender}); 

  if(products.length === 0) {
    redirect(`/gender/${gender}`);
  }

  const labels: Record<string, string> = {
    'men': 'for Men',
    'women': 'for Women',
    'kid': 'for Kids',
    'unisex': 'for Everyone',
  }

  // if(!labels[id]) {
  //   notFound();
  // }

  return (
    <>
    <Title
      title={`Products ${labels[gender]}`}
      subtitle={`${gender[0].toUpperCase()}${gender.slice(1)}`}
      className="mb-2"
    />
      <ProductGrid products={products} />

      <Pagination totalPages={totalPages} />
    </>
  );
}