import { FC, useState } from 'react';
import {
  Card,
  Button,
  Rating,
  Collapse,
  useTheme,
  Typography,
  CardActions,
  CardContent,
} from '@mui/material';

import ProductEntity from '../../models/entity/Product';

interface ProductProps {
  product: ProductEntity;
}

const Product: FC<ProductProps> = ({ product }) => {
  const { _id, name, description, category, price, rating, supply, stat } =
    product;

  const theme = useTheme();
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  return (
    <Card
      sx={{
        borderRadius: '0.55rem',
        backgroundImage: 'none',
        backgroundColor: theme.palette.background.paper,
      }}
    >
      <CardContent>
        <Typography
          sx={{ fontSize: 14 }}
          color={(theme.palette.secondary as any)[700]}
          gutterBottom
        >
          {category}
        </Typography>
        <Typography variant='h5' component='div'>
          {name}
        </Typography>
        <Typography
          sx={{ mb: '1.5rem' }}
          color={(theme.palette.secondary as any)[400]}
        >
          {price.toFixed(2)}
        </Typography>
        <Rating value={rating} readOnly></Rating>
        <Typography variant='body2'>{description}</Typography>
      </CardContent>
      <CardActions>
        <Button
          variant='contained'
          size='small'
          onClick={() => setIsExpanded(!isExpanded)}
        >
          See More
        </Button>
      </CardActions>
      <Collapse
        in={isExpanded}
        timeout='auto'
        unmountOnExit
        sx={{ color: (theme.palette as any).neutral[300] }}
      >
        <CardContent>
          <Typography>Id: {_id}</Typography>
          <Typography>Supply Left: {supply}</Typography>
          <Typography>
            Yearly Sales This Year: {stat?.yearlySalesTotal}
          </Typography>
          <Typography>
            Yearly Units Sold This Year: {stat?.yearlyTotalSoldUnits}
          </Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
};

export default Product;
