import { faCheckCircle, faCircle, faEdit, faSearch, faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useContext, useEffect, useState } from 'react'
import { AppContext, checkProduct, deleteProduct, getProducts } from '../services/ProductRepository'
import { useNavigate } from 'react-router';
import State from './State';
import SearchForm from './SearchForm';

function Products() {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const [state,setState]=useContext(AppContext)

  useEffect(() => {
    handleGetProducts(state.keyword, state.currentPage, state.pageSize);
  }, [])

  //row function
  const handleDeleteProduct = (product) => {
    deleteProduct(product).then(
      response => {
        // handleGetProducts();
        const newProducts = state.products.filter((p) => p.id !== product.id)
        setState({ ...state, products: newProducts })
      }
    )
      .catch(error => {
        console.log(error)
      })
  };

  const handleGetProducts = (keyword, page, size) => {

    getProducts(keyword, page, size).then(
      response => {
        const totalElements = response.headers["x-total-count"];
        let totalPages = Math.floor(totalElements / size);
        if (totalElements % size != 0) ++totalPages;
        console.log(totalElements, totalPages)
        const products = response.data;
        setState({
          ...state,
          products: products,
          keyword: keyword,
          currentPage: page,
          pageSize: size,
          totalPages: totalPages
        })
      }
    )
      .catch(
        error => {
          console.log(error);
        }
      )
  }
  const handleSearch = (event) => {
    event.preventDefault();
    // setState({...state,keyword:query})
    handleGetProducts(query, 1, state.pageSize)

  }

  const handleGoToPage = (page) => {
    handleGetProducts(state.keyword, page, state.pageSize);

  }

  const handleCheckProduct = (product) => {
    checkProduct(product).then(response => {
      console.log(response.data)
      const newProduct = state.products.map((p) => {
        if (p.id === product.id) {
          p.checked = !p.checked;
        }
        return p;
      });
      setState({ ...state, products: newProduct })
    }).catch(
      error => {
        console.log(error)
      }
    )
  };

  return (
    <div className='m-3'>
      <div className="row">
        <div className="col-md-6">
          <div className="card">
          
            <div className="card-body">
              <SearchForm handleGetProducts={handleGetProducts} ></SearchForm>
            </div>
            <div className="card-body">
               
              <table className='table'>
                <thead>
                  <tr>
                    <th>ID</th><th>Name</th><th>Price</th><th>Checked</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    state.products.map((product) => {
                      return (
                        <tr key={product.id}>
                          <td>{product.id}</td>
                          <td>{product.name}</td>
                          <td>{product.price}</td>
                          <td>
                            <button onClick={() => handleCheckProduct(product)} className='btn btn-outline-success'>
                              <FontAwesomeIcon icon={product.checked ? faCheckCircle : faCircle}></FontAwesomeIcon>
                            </button>
                          </td>
                          <td>
                            <button onClick={() => handleDeleteProduct(product)} className='btn btn-outline-danger'>
                              <FontAwesomeIcon icon={faTrash}></FontAwesomeIcon>
                            </button>
                          </td>
                          <td>
                            <button onClick={() => navigate(`/editProduct/${product.id}`)} className='btn btn-outline-success'>
                              <FontAwesomeIcon icon={faEdit}></FontAwesomeIcon>
                            </button>
                          </td>
                        </tr>
                      )
                    })
                  }

                </tbody>
              </table>
              <ul className='nav nav-pills'>
                {
                  (new Array(state.totalPages)
                    .fill(0)).map((v, index) => (
                      <li key={index}><button onClick={() => handleGoToPage(index + 1)}
                        className={(index + 1 === state.currentPage ? 'btn btn-info ms-1' : 'btn btn-outline-info ms-1')}>{index + 1}</button></li>
                    ))
                }
              </ul>
            </div>
          </div>
        </div>
      </div>

    </div>
  )

}

export default Products