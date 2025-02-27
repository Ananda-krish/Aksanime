import DefaultLayout from "../../components/DefaultLayout/DefaultLayout";
import LatestProducts from "../../components/LatestProducts/LatestProducts";
import ProductDetail from "../../components/ProductDetail/ProductDetail";

function ProductDetailDisplay(){
    return(
        <div>
           <DefaultLayout>
            <ProductDetail />

            <LatestProducts />
            </DefaultLayout> 
        </div>
    )
}

export default  ProductDetailDisplay;