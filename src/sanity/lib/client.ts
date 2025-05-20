import { createClient } from 'next-sanity'
import { apiVersion, dataset, projectId } from '../env'
import type { Product, ProductCategory } from '../../../sanity.types'

// Log configuration in development
if (process.env.NODE_ENV === 'development') {
  console.log('Sanity Config:', { projectId, dataset, apiVersion });
}

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false, // Disable CDN for more reliable data fetching
  token: process.env.SANITY_API_READ_TOKEN, // Add token for authenticated requests
  perspective: 'published', // Ensure we get published content
})

export const getAllProducts = async () => {
  const query = `*[_type == "product"]`
  const products = await client.fetch(query)
  return products as Product[];
}

export const getAllCategories = async () => {
  const query = `*[_type == "productCategory"]`;
  try {
    console.log('Fetching categories with config:', { projectId, dataset });
    const categories = await client.fetch(query, {}, { 
      cache: 'no-store',
      next: { revalidate: 0 } // Disable caching
    });
    console.log('Fetched categories:', categories);
    return categories as ProductCategory[];
  } catch (error) {
    console.error('Error fetching categories:', error);
    console.error('Error details:', {
      projectId,
      dataset,
      apiVersion,
      hasToken: !!process.env.SANITY_API_READ_TOKEN
    });
    return [];
  }
}

export const getCategoryBySlug = async (slug: string) => {
  const query = `*[_type == "productCategory" && slug.current == $slug][0]`
  const category = await client.fetch(query, { slug });
  return category as ProductCategory;
}

export const getProductsByCategorySlug = async (slug: string) => {
  const query = `*[_type == "product" && references(*[_type == "productCategory" && slug.current == $slug][0]._id)]`
  const products = await client.fetch(query, { slug });
  return products as Product[];
}

export const getProductById = async (id: string) => {
  const query = `*[_type == "product" && _id == $id][0]`;
  const product = await client.fetch(query, { id });
  return product as Product;
}

export const searchProducts = async (searchQuery: string) => {
  const query = `*[_type == "product" && (
    title match "*" + $searchQuery + "*" ||
    description match "*" + $searchQuery + "*" ||
    category->title match "*" + $searchQuery + "*" ||
    category->slug.current match "*" + $searchQuery + "*"
  )]`;

  const products = await client.fetch(query, { searchQuery });
  return products as Product[];
}
