import { GetServerSidePropsContext, PreviewData } from 'next';
import Link from 'next/link';
import { ParsedUrlQuery } from 'querystring';
import { ProductData } from '..';
import { motion } from 'framer-motion';

export default function Product(props: { product: ProductData }) {
	return (
		<div className='fullscreen'>
			<div className='product'>
				<div className='img'>
					<motion.img
						initial={{ x: 200, opacity: 0 }}
						animate={{ x: 0, opacity: 1 }}
						transition={{ delay: 0.2 }}
						key={props.product.image}
						src={props.product.image}
					/>
				</div>
				<div className='product-details'>
					<div className='inner'>
						<Link href='/'>
							<div>
								<p className='go-back'>Back to products</p>
							</div>
						</Link>
						<div>
							<span className='category'>Protein</span>
						</div>
						<h1>{props.product.name}</h1>
						<p>{props.product.details}</p>
						<div className='additonals'>
							<span>Soy Free</span>
							<span>Gluten Free</span>
						</div>
						<div className='qty-price'>
							<div className='qty'>
								<div className='minus'>-</div>
								<div className='amount'>1</div>
								<div className='add'>+</div>
							</div>
							<span className='price'>{props.product.price}</span>
						</div>
						<div className='btn-row'>
							<button className='add-to-cart'> Add to cart</button>
							<button className='subscribe'> Subscribe</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

Product.getInitialProps = async (context: GetServerSidePropsContext<ParsedUrlQuery, PreviewData>) => {
	const { id } = context.query;
	const res = await fetch(`http://my-json-server.typicode.com/dmcleish91/demo/products/${id}`);
	const product = await res.json();
	return { product: product };
};
