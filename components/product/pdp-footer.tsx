'use client';
import React, { Suspense } from 'react';
import ProductDetailsItem from './product-details-item';
import { AddToCartButton } from 'components/cart/add-to-cart-button';
import { GokwikButton } from './go-kwik-button';
import { CartProvider } from '@shopify/hydrogen-react';
// import { GokwikButton } from 'components/elements/gokwik-button';

const ProductDescFooter = ({ product }: { product: any }) => {
  return (
    <div className="fixed bottom-0 left-0 z-50 w-screen ">
      <div className="flex w-full justify-center border-t bg-white px-4 py-3 md:justify-between  md:px-[140px] md:py-4">
        <div className="hidden md:block">
          <Suspense fallback={null}>
            <ProductDetailsItem product={product} />
          </Suspense>
        </div>

        <div className="flex flex-row  items-center gap-5">
          <Suspense fallback={null}>
            <AddToCartButton
              variants={product?.variants}
              availableForSale={product.availableForSale}
              buttonClasses={
                'relative flex  flex-1 text-sm hover:text-purple-400  items-center justify-center text-base bg-white border border-black text-black py-2 px-6 md:py-2 md:px-8 uppercase tracking-wide font-normal md:font-semibold'
              }
            />
          </Suspense>
          <Suspense fallback={null}>
            <CartProvider>
              <GokwikButton buyNowButton={true} variantId={product?.variants[0]?.id} quantity={1} />
            </CartProvider>
          </Suspense>
        </div>
      </div>
    </div>
  );
};

export default ProductDescFooter;