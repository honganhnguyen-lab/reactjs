import React, {Component} from 'react';
import ProductList from "../Product/ProductList";
import NewProduct from "../Product/NewProduct";
import ProducState from "../Product/ProductState";
interface State {
    productList : Array<ProducState>;
    product?:ProducState;
}

class Container extends Component<any,State> {
    constructor(props: any){
        super(props)
        this.state = {
 
            productList : [
                {
                    id: 1,
                    name: "Áo thun nam",
                    price: 20000000,
                    index: 1,
                    unit: "Cái",
                    description: "Mô tả",
                    type :[1,2]
                },
                {
                    id: 2,
                    name: "Quần Jean",
                    price: 30000000,
                    index: 2,
                    unit: "Cái",
                    description: "Mô tả",
                    type :[2,3]
                }
            ],
            
        }
    }

    deleteProduct = (id : number) => {
        //1. tìm ra phần từ có id cần xoá trong mảng
        let arr = [...this.state.productList];
        var index = arr.findIndex(function(i){
            return i.id === id;
        });
        //2. xoá phẩN tử khỏi mảng
        if(index >-1)
            arr.splice(index, 1);
        //3.update lại danh sách các sản phẩm
        this.setState({
            productList : [...arr]
        });
    }
  
   editProduct =(id:number) =>{
       let product = this.state.productList.find(x=>x.id ===id);
       this.setState({
           product :product
       })
   }



    
    addProduct = (product:any)=>{
        let productList = [...this.state.productList];
        let max = 0;
        if(productList.length >0){
            var maxObject = productList.reduce(function(prev,current){
                    return (prev.id > current.id) ? prev:current
            });
            max = maxObject.id;
        }
        product.id= ++max;
        productList.push(product);
        this.setState({
          productList:productList
        })
    }
    render() {
        return (
            <>
                <div className="col-md-7">
                    <ProductList productList = {this.state.productList} 
                    deleteProduct = {this.deleteProduct}
                    editProduct = {this.editProduct}
                    />
                </div>
                <div className="col-md-5">
                    <NewProduct addProduct= {this.addProduct}/>
                </div>
            </>
        )
    }
}
export default Container;