'use client';

import { cartActions } from '@/store/actions/cart.action';
import { useAppDispatch } from '@/store/hooks';
import { XMarkIcon, TrashIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';
import LoadingDots from 'components/loading-dots';
import type { CartItem } from 'lib/shopify/types';
import { useFormStatus } from 'react-dom';
import { trackEvent } from 'utils/mixpanel';

function SubmitButton({ removeIcon, product }: { removeIcon?: boolean; product?: any }) {
  const { pending } = useFormStatus();
  const dispatch = useAppDispatch();
  return (
    <button
      type="submit"
      onClick={(e: React.FormEvent<HTMLButtonElement>) => {
        trackEvent('Removed From Cart', {
          Product_Name: product.title,
          Product_Url: '',
          Product_Price: product?.priceRange?.maxVariantPrice?.amount,
          Price_Currency: product?.priceRange?.maxVariantPrice?.currencyCode,
          Source: '',
          Category: '',
          Tags: product.tags,
          Variant_SKU: ''
        });
        if (pending) e.preventDefault();
        dispatch(cartActions.removeCart({ lineId: item?.id }));
      }}
      aria-label="Remove cart item"
      aria-disabled={pending}
      className={clsx(
        'ease flex h-[17px] w-[17px] items-center justify-center rounded-full bg-neutral-500 transition-all duration-200',
        {
          'cursor-not-allowed px-0': pending
        }
      )}
    >
      {pending ? (
        <LoadingDots className="bg-white" />
      ) : removeIcon ? (
        <TrashIcon className="cursor-pointer bg-white text-lg text-black hover:text-red-600" />
      ) : (
        <XMarkIcon className="hover:text-accent-3 mx-[1px] h-4 w-4 text-white " />
      )}
    </button>
  );
}

export function DeleteItemButton({ item, removeIcon }: { item: CartItem; removeIcon?: boolean }) {
  // const [message, formAction] = useFormState(removeItem, null);
  // const itemId = item.id;
  // const actionWithVariant = formAction.bind(null, itemId);

  return (
    <>
      <SubmitButton removeIcon={removeIcon} item={item} />
      <p aria-live="polite" className="sr-only" role="status">
        {/* {message} */}
      </p>
    </>
  );
}
