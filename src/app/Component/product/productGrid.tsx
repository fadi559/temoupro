
import React from 'react'
import type { Product } from '../../../../sanity.types'
import ProductItem22 from './productItem'

type ProductGridProps = {
    products: Product[]
}
const ProductGrid = ({ products }: ProductGridProps) => {
  return (
    <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4'>
        {products.map((product) => (
            <ProductItem22
                key={product._id}
                product={product}
            />
        ))}
    </div>
  )
}
export default ProductGrid;