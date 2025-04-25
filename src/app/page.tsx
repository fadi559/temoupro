

import { getCurrentSession } from "@/actions/auth";
import { getAllProducts } from "@/sanity/lib/client";
import Image from "next/image";
import SalesCampaignBanner from "./Component/SalesCampaignBanner";
import ProductGrid from "./Component/products/productGrid";

const Home = async () => {
  const user = await getCurrentSession();
  const products = await getAllProducts();


  return (
    <div className="bg-white">

      <SalesCampaignBanner/>
      <section className=' container mx-auto py-8'>
      <ProductGrid products={products} />
       
 </section>
    </div>
  )
}
export default Home;
