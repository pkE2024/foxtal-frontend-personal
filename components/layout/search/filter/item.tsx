'use client';

import clsx from 'clsx';
import type { SortFilterItem } from 'lib/constants';
import { createUrl } from 'lib/utils';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import type { ListItem, PathFilterItem } from '.';
import Image from 'next/image';
import { useDispatch } from 'react-redux';
import { setIsUserClicked, setSelectedCollection } from '@/store/slices/product-slice';
import { useAppSelector } from '@/store/hooks';

function PathFilterItem({ item }: { item: PathFilterItem }) {
  const dispatch = useDispatch();
  const selectedCollection = useAppSelector((state) => state.products.selectedCollection);

  const handleClick = () => {
    dispatch(setSelectedCollection(item.handle?.toLowerCase()));
    dispatch(setIsUserClicked(true)); // Reset after action
  };
  const active = selectedCollection === item?.handle?.toLowerCase();

  return (
    <li className="mt-2 flex h-full w-full items-center justify-center gap-2 text-black">
      <div
        className={`relative flex flex-col items-center justify-center gap-1 md:gap-2
      `}
      >
        <Image
          src={item?.image?.url || '/Images/defualt.png'}
          className=" flex min-h-[80px]  min-w-[80px] items-center justify-center  rounded-full md:min-h-[100px] md:min-w-[100px]"
          alt={(item?.title && item?.title + Math.random()) || 'Image'}
          width={100}
          loading="lazy"
          objectFit="cover"
          quality={75}
          sizes="(max-width: 640px) 80px, 80px"
          height={100}
        />
        <button
          className={`line-clamp-1 text-ellipsis text-wrap text-center text-xs md:text-sm `}
          onClick={handleClick}
        >
          {item.title}
        </button>
        {active && <div className="h-[2px] rounded-full bg-black md:h-[2px]  md:w-[138px]"></div>}
      </div>
    </li>
  );
}

function SortFilterItem({ item }: { item: SortFilterItem }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const active = searchParams.get('sort') === item.slug;
  const q = searchParams.get('q');
  const href = createUrl(
    pathname,
    new URLSearchParams({
      ...(q && { q }),
      ...(item.slug && item.slug.length && { sort: item.slug })
    })
  );
  const DynamicTag = active ? 'p' : Link;

  return (
    <li className="mt-2 flex text-sm text-black " key={item.title}>
      <DynamicTag
        prefetch={!active ? false : undefined}
        href={href}
        className={clsx('w-full hover:underline hover:underline-offset-4', {
          'underline underline-offset-4': active
        })}
      >
        {item.title}
      </DynamicTag>
    </li>
  );
}

export function FilterItem({ item }: { item: ListItem }) {
  return 'path' in item ? <PathFilterItem item={item} /> : <SortFilterItem item={item} />;
}
