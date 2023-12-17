import { redirect } from 'next/navigation';
import { Title } from '@/components';
import { getProductBySlug } from '@/actions';
import { ProductForm } from './ui/ProductForm';
import { getCategories } from '@/actions/product/get-categories';
import { Category } from '@/interfaces';

interface Props {
    params: {
        slug: string;
    }
}

export default async function ProdcutPage({ params }: Props) {
    const { slug } = params;

    const [product, categories] = await Promise.all([
      getProductBySlug(slug),
      getCategories()
    ]);

    if(!product && slug !== 'new') {
        redirect('/admin/products');
    }


    const title = (slug === 'new') ? 'New Product' : 'Edit Product';
  return (
    <>
      <Title title={title} />

      <ProductForm product={product ?? {}} categories={categories as Category[]}/>
    </>
  );
}