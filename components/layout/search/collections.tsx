import clsx from 'clsx';
import { Suspense } from 'react';
// import { getCollections } from 'lib/shopify';
import FilterList from './filter';

async function CollectionList() {
  // const collections = await getCollections();

  const collections = [
    {
      handle: 'cleansers',
      title: 'Cleansers',
      description: 'Discover a range of gentle cleansers for your daily skincare routine.',
      seo: {
        description: 'Gentle cleansers for your daily skincare routine',
        title: 'Cleansers - Shop Gentle Cleansers Online'
      },
      updatedAt: '2024-05-06T12:10:15Z',
      // image: { url: '/images/cleansers.jpg' },
      image: { url: '/Images/img1.png' },
      path: '/products/cleansers'
    },
    {
      handle: 'Sunscreens',
      title: 'Sunscreens',
      description: 'Explore a variety of sunscreens to protect your skin from harmful UV rays.',
      seo: {
        description: 'Sunscreen protection for all skin types',
        title: 'Sunscreens - Shop Sun Protection Online'
      },
      updatedAt: '2024-05-06T12:10:15Z',
      // image: '/images/sunscreens.jpg',
      image: { url: '/Images/img2.png' },
      path: '/products/Sunscreens'
    },
    {
      handle: 'moisturizers',
      title: 'Moisturizers',
      description: 'Shop hydrating moisturizers for all skin types and concerns.',
      seo: {
        description: 'Hydrating moisturizers for smooth and supple skin',
        title: 'Moisturizers - Shop Hydrating Moisturizers Online'
      },
      updatedAt: '2024-05-06T12:10:15Z',
      // image: '/images/moisturizers.jpg',
      image: { url: '/Images/img3.png' },
      path: '/products/moisturizers'
    },
    {
      handle: 'serums',
      title: 'Serums',
      description: 'Find targeted serums to address various skincare needs and concerns.',
      seo: {
        description: 'Targeted serums for specific skincare needs',
        title: 'Serums - Shop Targeted Skincare Serums Online'
      },
      updatedAt: '2024-05-06T12:10:15Z',
      // image: '/images/serums.jpg',
      image: { url: '/Images/img4.png' },
      path: '/products/serums'
    }
  ];

  if (!collections) return null;

  return <FilterList list={collections as any} />;
}

const skeleton = 'mb-3 h-4 w-5/6 animate-pulse rounded';
const activeAndTitles = 'bg-neutral-800 ';
const items = 'bg-neutral-400 ';

export default function Collections() {
  return (
    <Suspense
      fallback={
        <div className="col-span-2 hidden h-[400px] w-full flex-none py-4 lg:block">
          <div className={clsx(skeleton, activeAndTitles)} />
          <div className={clsx(skeleton, activeAndTitles)} />
          <div className={clsx(skeleton, items)} />
          <div className={clsx(skeleton, items)} />
          <div className={clsx(skeleton, items)} />
          <div className={clsx(skeleton, items)} />
          <div className={clsx(skeleton, items)} />
          <div className={clsx(skeleton, items)} />
          <div className={clsx(skeleton, items)} />
          <div className={clsx(skeleton, items)} />
        </div>
      }
    >
      <CollectionList />
    </Suspense>
  );
}
