import Grid from 'components/grid';
import { GridTileImage } from 'components/grid/tile';
import { Product } from 'lib/shopify/types';

export default function ProductGridItems({ products }: { products: Product[] }) {
  return (
    <>
      {products.map((product) => (
        <Grid.Item key={product.handle} className="animate-fadeIn">
          <div className="relative inline-block h-full w-full max-w-[200px] md:max-w-[270px] ">
            <GridTileImage
              product={product}
              alt={product.title}
              label={{
                title: product.title,
                description: product.description,
                amount: product.priceRange.maxVariantPrice.amount,
                currencyCode: product.priceRange.maxVariantPrice.currencyCode
              }}
              src={product.featuredImage?.url}
            />
          </div>
        </Grid.Item>
      ))}
    </>
  );
}
