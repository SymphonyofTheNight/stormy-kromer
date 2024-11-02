import { removeEdgesAndNodes } from '@bigcommerce/catalyst-client';
import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';

import { getSessionCustomerId } from '~/auth';
import { client } from '~/client';
import { graphql } from '~/client/graphql';
import { revalidate } from '~/client/revalidate-target';
import { ProductCardCarousel } from '~/components/product-card-carousel';
import { ProductCardCarouselFragment } from '~/components/product-card-carousel/fragment';
import { Slideshow } from '~/components/slideshow';
import { LocaleType } from '~/i18n/routing';

const HomePageQuery = graphql(
  `
    query HomePageQuery {
      site {
        newestProducts(first: 12) {
          edges {
            node {
              ...ProductCardCarouselFragment
            }
          }
        }
        featuredProducts(first: 12) {
          edges {
            node {
              ...ProductCardCarouselFragment
            }
          }
        }
      }
    }
  `,
  [ProductCardCarouselFragment],
);

interface Props {
  params: {
    locale: LocaleType;
  };
}

export default async function Home({ params: { locale } }: Props) {
  unstable_setRequestLocale(locale);

  const t = await getTranslations('Home');

  const customerId = await getSessionCustomerId();

  const { data } = await client.fetch({
    document: HomePageQuery,
    customerId,
    fetchOptions: customerId ? { cache: 'no-store' } : { next: { revalidate } },
  });

  const featuredProducts = removeEdgesAndNodes(data.site.featuredProducts);
  const newestProducts = removeEdgesAndNodes(data.site.newestProducts);

  return (
    <>
      <div>
        <div className='bg-hero-banner bg-cover bg-no-repeat bg-center w-full h-[400px] sm:h-[583px] flex items-center justify-center bg-opacity-30'>
          <div className='text-center'>
            <span className='font-[400] text-white text-center text-[14px]'>UNWAVERING CRAFTSMANSHIP</span>
            <h2 className='font-[600] text-white text-center text-[30px] sm:text-[45px] px-[5vw] my-[10px]'>LAKESIDE DAYS & BONFIRE NIGHTS</h2>
            <button className='group h-auto w-auto bg-white hover:bg-[#AD1A2E] text-center py-[.75rem] px-[2.5rem]'>
              <span className='text-[#AD1A2E] group-hover:text-white text-[14px] font-[600]'>SHOP NOW</span>
            </button>
          </div>
        </div>

        <div className='max-w-[1440px] w-[92%] h-[100vh] mx-auto'>
          <div className='flex flex-row items-center justify-between py-[15px]'>
            <div className='h-[30px] w-[0px] bg-[#AD1A2E] opacity-[.4]'></div>
            <span className='text-[#AD1A2E] text-[14px] font-[600] flex flex=row items-center justify-center'>
              <img className='w-auto h-[30px] object-contain mr-[10px]' src='https://cdn11.bigcommerce.com/s-t0676dlrio/images/stencil/original/image-manager/thread-icon-01-2x.png?t=1730337324' />
              PROUD & PASSIONATE MAKERS
            </span>
            <div className='h-[30px] w-[1px] bg-[#AD1A2E] opacity-[.4]'></div>
            <span className='text-[#AD1A2E] text-[14px] font-[600] flex flex=row items-center justify-center'>
              <img className='w-auto h-[30px] object-contain mr-[10px]' src='https://cdn11.bigcommerce.com/s-t0676dlrio/images/stencil/original/image-manager/strormycap-icon-02-2x.png?t=1730337325' />
              SINCE 1903
            </span>
            <div className='h-[30px] w-[1px] bg-[#AD1A2E] opacity-[.4]'></div>
            <span className='text-[#AD1A2E] text-[14px] font-[600] flex flex=row items-center justify-center'>
              <img className='w-auto h-[30px] object-contain mr-[10px]' src='https://cdn11.bigcommerce.com/s-t0676dlrio/images/stencil/original/image-manager/family-icon-03-2x.png?t=1730337326' />
              FAMILY OWNED & OPERATED
            </span>
            <div className='h-[30px] w-[0px] bg-[#AD1A2E] opacity-[.4]'></div>
          </div>
          <div className='w-[100%] h-auto flex flex-row'>
            <div className='group w-[50%] relative bg-red-700 overflow-hidden bg-opacity-30'>
              <img className='hover:scale-[1.1] transition-all duration-300' src='https://cdn11.bigcommerce.com/s-3vdgh6wtox/images/stencil/original/image-manager/hcapsf24.jpg' />
            </div>
            <div className='w-[50%] bg-green-700'>
              <div className='w-[100%] flex flex-wrap items-center justify-center'>
                <div className='group w-[50%] relative bg-red-700 overflow-hidden'>
                  <img className='hover:scale-[1.1] transition-all duration-300 brightness-50 hover:brightness-100' src='https://cdn11.bigcommerce.com/s-3vdgh6wtox/images/stencil/original/image-manager/fall-winter-collection.jpg?t=1715656670' />
                  <h3 className='text-white absolute top-[50%] left-[50%]'>TESTING LANG</h3>
                </div>
                <div className='group w-[50%] relative bg-red-700 overflow-hidden'>
                  <img className='hover:scale-[1.1] transition-all duration-300' src='https://cdn11.bigcommerce.com/s-3vdgh6wtox/images/stencil/original/image-manager/hshopwf24.jpg' />
                </div>
                <div className='group w-[50%] relative bg-red-700 overflow-hidden'>
                  <img className='hover:scale-[1.1] transition-all duration-300' src='https://cdn11.bigcommerce.com/s-3vdgh6wtox/images/stencil/original/image-manager/hshopmf24.jpg' />
                </div>
                <div className='group w-[50%] relative bg-red-700 overflow-hidden'>
                  <img className='hover:scale-[1.1] transition-all duration-300' src='https://cdn11.bigcommerce.com/s-3vdgh6wtox/images/stencil/original/image-manager/bwl.jpg' />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <Slideshow />

      <div className="my-10">
        <ProductCardCarousel
          products={featuredProducts}
          showCart={false}
          showCompare={false}
          title={t('Carousel.featuredProducts')}
        />
        <ProductCardCarousel
          products={newestProducts}
          showCart={false}
          showCompare={false}
          title={t('Carousel.newestProducts')}
        />
      </div> */}
    </>
  );
}

export const runtime = 'edge';
