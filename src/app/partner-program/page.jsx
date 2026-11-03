import { getProducts } from '@/data/products';
import PartnerProgramClient from './PartnerProgramClient';

export const metadata = {
  title: 'Partner Program | 100 Peptides Research',
  description: 'Explore the 100 Peptides Research partner program concept, estimate potential referral earnings, and learn about proposed tiers and program guidelines.',
};

export default function PartnerProgramPage() {
  const products = getProducts().filter((product) => product.active !== false);
  return <PartnerProgramClient products={products} />;
}
