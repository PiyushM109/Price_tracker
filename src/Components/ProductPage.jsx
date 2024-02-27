import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const ProductPage = ()=>{
    const [productInfo,setProductInfo] = useState(null);
    const {prodId} = useParams();
    useEffect(()=>{
        axios.get("http://localhost:3000/product/"+prodId)
      .then((response) => {
        console.log(response.data);
        setProductInfo(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
    },[]);
    if(productInfo==null){
        return(<div>दम काढायला शिका थोड......</div>)
    }
    return(<div>
        <div className="flex flex-wrap">
            <div>
                <img src={productInfo?.image} alt="Product Image" />
            </div>
            <div>
                <h1>{productInfo.title}</h1>
                <a>Visit Product</a>
                <div></div>
            </div>
        </div>
    </div>)
}

export default ProductPage;