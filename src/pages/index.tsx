import { motion, Variants } from 'framer-motion';
import Link from 'next/link';

export type ProductData = {
  id: string;
  image: string;
  name: string;
  price: number;
  details: string;
};

// animate: defines the animition that takes place
// initial: defines the initial state of the the element to be animated

export const easing = [0.6, -0.05, 0.01, 0.99];

export const fadeInUp: Variants = {
  hidden: {
    y: 60,
    opacity: 0,
  },
  show: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: easing,
    },
  },
};

export const containerAnimation: Variants = {
  hidden: {
    opacity: 0,
  },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

export default function Home(props: { products: ProductData[] }) {
  return (
    <div className='container center'>
      <motion.div
        animate={{ opacity: 1 }}
        initial={{ opacity: 0 }}
        className='title'>
        <h1>Select a protein</h1>
      </motion.div>
      <motion.div
        variants={containerAnimation}
        initial='hidden'
        animate='show'
        className='product-row'>
        {props.products.map((product, index) => (
          <Link
            key={product.id}
            href='/products/[id]'
            as={`/products/${product.id}`}>
            <motion.div
              variants={fadeInUp}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className='card'>
              <span className='category'>Protein</span>
              <motion.img
                initial={{ x: 60, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.2 + index * 0.2 }}
                key={product.image}
                src={product.image}
                width={250}
              />
              <div className='product-info'>
                <h4>{product.name}</h4>
                <span>{product.price}</span>
              </div>
            </motion.div>
          </Link>
        ))}
      </motion.div>
    </div>
  );
}

Home.getInitialProps = async () => {
  const res = await fetch('https://my-json-server.typicode.com/dmcleish91/demo/products');
  const data = await res.json();

  return { products: data };
};
