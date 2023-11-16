import React, { useEffect, useState } from 'react'
import { saveProduct } from '../services/ProductRepository'

function NewProduct() {
    const [name, setName] = useState("");
    const [price, setPrice] = useState(0);

    const [checked, setChecked] = useState(false);



    const handleSaveProduct = (event) => {
        let product = { name, price, checked }
        event.preventDefault()
        saveProduct(product).then(
            response => {
                alert(JSON.stringify(response.data))
            }
        )
    }
    return (
    <div className='m-3'>
        <div className="row">
            <div className="col-md-6">
                <div className="card ms-3 ps-2">
                    <h1>New Product</h1>

                    <div className="card-body">
                        <form onSubmit={handleSaveProduct}>
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

export default NewProduct