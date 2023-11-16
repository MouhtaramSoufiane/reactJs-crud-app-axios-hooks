import React, { useContext } from 'react'
import { AppContext } from '../services/ProductRepository'

function State() {
    const [state, setState] = useContext(AppContext);
    return (

        
            <button type="button" class="btn btn-primary position-relative">
                Caddy
                <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                {state.products.length}
                    
                </span>
            </button>
        
    )
}

export default State