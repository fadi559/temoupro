import { type SchemaTypeDefinition } from 'sanity'
import { promotionCode } from './schemas/promotion-codes'
import { promotionCampaign } from './schemas/promotion-campaign'
import { productCategory } from './schemas/prodect-category'
import { product } from './schemas/prodect'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
     promotionCode,
    promotionCampaign,

    
    productCategory,
    product,
    
    // shippingAddress,
    // getOrderingMenuItem,
    // order,
  ],
}
