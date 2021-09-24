import { Component } from 'react';

interface State {
    id:number;
    name: string;
    code: string;
    price: number;
    productTypes: Array<SelectBoxItem>;
    description? : string,
    importDate? : string,
    unit?: string;
  
    
}
interface Props{
    addProduct?: any;
}
const initialState ={
    id:0,
    name: '',
    code:'',
    price:0,
    productTypes: [
        {id:"productType1",value:1,text:"Đồ gia dụng",checked:false},
        {id:"productType2",value:2,text:"Đồ điện tử",checked:false},
        {id:"productType3",value:3,text:"Quần áo",checked:false},
        {id:"productType4",value:4,text:"Sách",checked:false}
    ]
    
}
interface SelectBoxItem{
    value:number,
    text:string,
    id:string,
    checked:boolean
}

class NewProduct extends Component<Props, State> {
    constructor(props: any) {
        super(props)
       this.state= initialState;
    }

    saveProduct = () => {
        this.props.addProduct({
            name: this.state.name,
            id:this.state.id,
            code: this.state.code,
            price:this.state.price,
            type : this.state.productTypes
        });
        
    }
   
    onChange = (event: { target: { name: any; value: any; }; }) => {
        this.setState({ [event.target.name]:  event.target.value } as Pick<State, keyof State>);
    };
    onCheck = (event:{target: {checked:any;value:any;};}) =>{
        let productlistTypes = this.state.productTypes;
        for(let productType of productlistTypes )
        {
            if(productType.value.toString() === event.target.value)
            {
                productType.checked = event.target.checked;
                break;
            }
        }
        this.setState({productTypes: productlistTypes});
    }
    
    render() {
        return (
            <fieldset className="border p-2">
                <legend className="scheduler-border">Thông tin sản phẩm</legend>
                <form>
                    <div className="mb-3 row">
                        <div className="col-md-4">
                            <label>Tên sản phẩm:</label>
                        </div>
                        <div className="col-md-8">
                            <input type="text" className="form-control" name="name"  id="productName" value= {this.state.name}  onChange={this.onChange} placeholder="Nhập tên sản phẩm ..."/>
                            <input type="hidden" id="productId" />
                        </div>
                    </div>
                    <div className="mb-3 row">
                        <div className="col-md-4">
                            <label>Mã sản phẩm:</label>
                        </div>
                        <div className="col-md-8">
                            <input type="text" className="form-control" name="code" value={this.state.code} onChange={this.onChange} id="productCode" placeholder="Nhập mã sản phẩm ..." />
                        </div>
                    </div>
                    <div className="mb-3 row">
                        <div className="col-md-4">
                            <label>Loại sản phẩm:</label>
                        </div>
                        <div className="form-check col-md-8">
                        {
                                this.state.productTypes.map(productType => {
                                    return <>
                                        <input className="form-check-input" type="checkbox" value =  {productType.value} name="productType" 
                                        id= {productType.id} checked={productType.checked} key = {productType.id} onChange={this.onCheck} />
                                        <label className="form-check-label">{productType.text}</label><br/>
                                    </>
                                })
                            }
                        </div>
                    </div>
                    <div className="mb-3 row">
                        <div className="col-md-4">
                            <label>Loại sản phẩm:</label>
                        </div>
                        <div className="col-md-8">
                            <select className="form-control" id="productUnit">
                                <option value="">-- Chọn đơn vị tính --</option>
                                <option value="1">Cái</option>
                                <option value="2">Chiếc</option>
                                <option value="3">Bao</option>
                            </select>
                        </div>
                    </div>
                    <div className="mb-3 row">
                        <div className="col-md-4">
                            <label>Giá sản phẩm:</label>
                        </div>
                        <div className="col-md-8">
                            <input type="number" className="form-control" name = "price" value={this.state.price} onChange = {this.onChange} id="productPrice"  placeholder="Nhập giá sản phẩm ..."/>
                        </div>
                    </div>
                    <div className="mb-3 row">
                        <div className="col-md-4">
                            <label>Ngày nhập:</label>
                        </div>
                        <div className="col-md-8">
                            <input type="date" className="form-control" id="productImportDate" placeholder="Nhập giá sản phẩm ..." />
                        </div>
                    </div>
                    <div className="mb-3 row">
                        <div className="col-md-4">
                            <label>Mô tả:</label>
                        </div>
                        <div className="col-md-8">
                            <textarea className="form-control" id="productDescription" placeholder="Mô tả sản phẩm ..."></textarea>
                        </div>
                    </div>
                    <div className="mb-3 row">
                        <div className="offset-sm-4 col-sm-7 pull-right">
                            <button type="button" onClick = {this.saveProduct} className="btn btn-primary">Save</button>
                        </div>
                    </div>
                </form>
            </fieldset>
        )
    }
}
export default NewProduct;