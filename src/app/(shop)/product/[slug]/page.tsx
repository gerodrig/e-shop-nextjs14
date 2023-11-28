//?revalidate every 7 days
export const revalidate = 10080;

import { type Metadata, ResolvingMetadata } from 'next';
import { notFound } from 'next/navigation';
// import { initialData } from '@/seed/seed';
import { titleFont } from '@/config';

import { ProductSlideshow, ProductMobileSlideshow, StockLabel } from '@/components';
import { AddToCart } from './ui/AddToCart';

import { getProductBySlug } from '@/actions/product/get-product-by-slug';

interface Props {
  params: {
    slug: string;
  };
}

//Generate metadata
export async function generateMetadata({ params }: Props, parent: ResolvingMetadata):  Promise<Metadata> {
  const { slug } = params;
  const product = await getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  return {
    title: product?.title ?? 'Product not found',
    description: product?.description ?? '',
    openGraph: {
      title: product?.title ?? 'Product not found',
    description: product?.description ?? '',
      images: [`/products/${product?.images[1]}`],
    }
  };
}

export default async function ProductPage({ params }: Props) {
  //get params from url
  const { slug } = params;
  const product = await getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  return (
    <div className="mt-5 mb-20 grid grid-cols-1 md:grid-cols-3 gap-3">
      <div className="col-span-1 md:col-span-2">
        {/* Mobile Slideshow */}
        <ProductMobileSlideshow title={product.title} images={product.images} className='block md:hidden'/>
        
        {/* Slideshow */}
        <ProductSlideshow title={product.title} images={product.images} className='hidden md:block' />
      </div>

      {/* productDetails */}
      <div className="col-span-1 px-5">

        <StockLabel slug={product.slug} />

        <h1 className={`${titleFont.className} antialiased font-bold text-xl`}>
          {product.title}
        </h1>
        <p className="text-lg mb-5">${product.price}</p>

        <AddToCart product={product} />

        {/* Description */}
        <h3 className="font-bold text-sm">Description</h3>
        <p className="font-light">{product.description}</p>
      </div>

    </div>
  );
}
