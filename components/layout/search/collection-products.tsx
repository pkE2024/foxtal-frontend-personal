'use client';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setIsUserClicked, setSelectedCollection } from '@/store/slices/product-slice';
import { useAppSelector } from '@/store/hooks';
import Grid from '@/components/grid';
import ProductGridItems from '../product-grid-items';

const CollectionProductsContainer = ({
  collections,
  products,
  index
}: {
  collections: any;
  products: any;
  index: number;
  key?: number;
}) => {
  const dispatch = useDispatch();
  const selectedCollection = useAppSelector((state) => state.products.selectedCollection);
  const isUserClicked = useAppSelector((state) => state.products.isUserClicked);

  const sectionRef = useRef<HTMLDivElement>(null);
  const [topBarHeight, setTopBarHeight] = useState(0);

  useEffect(() => {
    const topBar = document.querySelector('.sticky.top-0');
    if (topBar) {
      setTopBarHeight(topBar.clientHeight + 20);
    }
  }, []);

  useEffect(() => {
    if (selectedCollection === collections[index].handle.toLowerCase() && isUserClicked) {
      const section = sectionRef.current;
      if (section) {
        const y = section.getBoundingClientRect().top + window.pageYOffset - topBarHeight;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
      dispatch(setIsUserClicked(false));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCollection, isUserClicked, collections, index, topBarHeight]);

  useEffect(() => {
    const handleScroll = () => {
      if (!isUserClicked) {
        // Only dispatch if scroll was not triggered by a click
        const rect = sectionRef.current?.getBoundingClientRect();
        if (rect && rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2) {
          dispatch(setSelectedCollection(collections[index].handle.toLowerCase()));
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [dispatch, collections, index, isUserClicked]);

  return (
    <section
      ref={sectionRef}
      id={collections[index]?.handle.toLowerCase()}
      className="rounded-md bg-white px-1.5 py-2 md:order-none md:px-4 md:py-6"
      key={index}
    >
      <div>
        <div className="space-y-1 px-1 pb-2 md:px-5 md:pb-4">
          <h1 className="text-base md:text-xl">{`Products in ${collections[index]?.handle}`}</h1>
          <p className="text-xs text-[#6E6E6E] md:text-sm">{`Showing ${products?.length} results`}</p>
        </div>
        <Grid className="grid-cols-2 place-items-center gap-2 sm:grid-cols-2 lg:grid-cols-4">
          <ProductGridItems products={products} />
        </Grid>
      </div>
    </section>
  );
};

export default CollectionProductsContainer;
