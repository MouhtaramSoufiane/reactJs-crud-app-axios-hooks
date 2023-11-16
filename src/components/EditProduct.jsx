import React, { useEffect, useState } from 'react'
import { getProductGyId, saveProduct, updateProduct } from '../services/ProductRepository'
import { useParams } from 'react-router'

function EditProduct() {
    const { id } = useParams();
    const [name, setName] = useState("")
    const [price, setPrice] = useState(0);

    useEffect(()=>{
        handleGetProductById(id);
    },[])

    const [checked, setChecked] = useState(false)

   const handleGetProductById=(id)=>{
    getProductGyId(id).then(
        response=>{
            let product=response.data;
            setName(product.name)
            setPrice(product.price)
            setChecked(product.che)

        }
    )
    

   }
    const handleUpdateProduct = (event) => {
        let product = { id,name, price, checked }
        event.preventDefault()
        updateProduct(product).then(
            response => {
                alert(JSON.stringify(response.data))
            }
        )
    }
    return (
        <div className="m-3">
        <div className="row">

            <div className="col-md-6 ">
                <div className="card ms-3 ps-2">

                    <h1>Edit Product</h1>
                  
                    <div className="card-body">
                        <form onSubmit={handleUpdateProduct}>
                            <div className="mb-3">
                                <label className="form-label">Name :</label>
                                {name}
                                <input onChange={(e) => setName(e.target.value)}
                                    value={name}
                                    className='form-control'></input>
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Price :</label>
                                {price}
                                <input
                                    onChange={(e) => setPrice(e.target.value)}
                                    value={price}
                                    className='form-control'></input>
                            </div>
                            <div className="form-check">

                                <input className="form-check-input"
                                    onChange={(e) => setChecked(e.target.value)}
                                    checked={checked}
                                    type="checkbox" id="flexCheckChecked"></input>
                                <label className="form-check-label" htmlFor="flexCheckChecked">
                                    Checked
                                </label>
                            </div>
                            <div className="mt-3">
                                <button type="submit" className="btn btn-outline-success">Submit</button>
                            </div>


                        </form>
                    </div>
                </div>

            </div>


        </div>
     </div>

    )
}

export default EditProduct