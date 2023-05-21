import { Box, useMediaQuery } from '@mui/material';

import Product from '../components/product';
import PageHeader from '../components/PageHeader';
import { useGetProductsQuery } from '../state/apis/products';

const Products = () => {
  const { data, isLoading } = useGetProductsQuery();
  const isNonMobile = useMediaQuery('(min-width: 1000px)');

  console.log('client products: ', data);
  return (
    <Box m='1.5rem 2.5rem'>
      <PageHeader title='PRODUCTS' subTitle='View Products List' />
      {data && !isLoading ? (
        <Box
          mt='20px'
          display='grid'
          rowGap='20px'
          columnGap='1.33%'
          justifyContent='space-between'
          gridTemplateColumns='repeat(4, minmax(0, 1fr))'
          sx={{ '& > div': { gridColumn: isNonMobile ? undefined : 'span 4' } }}
        >
          {data.map((product) => {
            return <Product key={product._id} product={product} />;
          })}
        </Box>
      ) : (
        <>Loading...</>
      )}
    </Box>
  );
};

export default Products;
