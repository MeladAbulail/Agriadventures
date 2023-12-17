import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function ProductTable() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [searchProductName, setSearchProductName] = useState('');
  const [editingProduct, setEditingProduct] = useState(null);
  const [editedProduct, setEditedProduct] = useState({
    productId: '',
    productName: '',
    category: '',
    description: '',
    price: 0,
    image: '',
  });

  const [newProduct, setNewProduct] = useState({
    productName: '',
    category: '',
    description: '',
    price: 0,
    image: '',
  });

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = () => {
    const apiUrl = 'http://localhost:4000/Get_All_Products';
    axios
      .get(apiUrl)
      .then(response => setProducts(response.data.products))
      .catch(error => console.error('Error fetching products:', error));
  };

  const deleteProduct = productId => {
    const apiUrl = 'http://localhost:4000/Delete_Product_By_Id';
    axios
      .delete(`${apiUrl}/${productId}`)
      .then(response => {
        if (response.status === 200) {
          setProducts(products.filter(product => product.productId !== productId));
        }
      })
      .catch(error => console.error('Error deleting product:', error));
  };

  const handleEditProduct = product => {
    setEditingProduct(product);
    setEditedProduct({ ...product });
  };


  const handleAddProduct = product => {
    navigate('/AddProduct');
  };


  const handleInputChange = e => {
    const { name, value } = e.target;
    setEditedProduct(prevProduct => ({ ...prevProduct, [name]: value }));
  };
  const handleSaveEdit = () => {
    const apiUrl = 'http://localhost:4000/Update_Product_By_Id';
    const formData = new FormData();
    formData.append('productName', editedProduct.productName);
    formData.append('category', editedProduct.category);
    formData.append('description', editedProduct.description);
    formData.append('price', editedProduct.price);
    formData.append('image', editedProduct.image);
  
    axios
      .put(`${apiUrl}/${editedProduct.productId}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then(response => {
        if (response.status === 200) {
          fetchProducts(); // Refetch products after update
          setEditingProduct(null);
          setEditedProduct(null);
        }
      })
      .catch(error => console.error('Error updating product:', error));
  };

  const handleCancelEdit = () => {
    setEditingProduct(null);
    setEditedProduct(null);
  };

  

  const handleInputChangeNewProduct = e => {
    const { name, value } = e.target;
    setNewProduct(prevProduct => ({ ...prevProduct, [name]: value }));
  };

  

  

  const filteredProducts = products.filter(product =>
    product.productName.toLowerCase().includes(searchProductName.toLowerCase())
  );

  return (
    <>
      <div className="flex flex-col w-full my-20">
        <div className="flex flex-row">
          <div className="w-full p-4">
            <div>
              <h2 className="mb-4 text-3xl font-bold">Products</h2>
              <div className="flex mb-4">
                <form className="w-90">
                  <label
                    htmlFor="default-search"
                    className="mb-2 text-sm font-medium sr-only"
                  >
                    Search
                  </label>
                  <div className="relative flex w-full">
                    <div className="absolute inset-y-0 flex items-center pointer-events-none start-0 ps-3">
                      <svg
                        className="w-4 h-4 text-gray-500"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 20 20"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                        />
                      </svg>
                    </div>
                    <input
                      type="search"
                      id="default-search"
                      className="block p-2 text-sm text-black border border-gray-300 rounded-lg xl:w-[600px] ps-10 bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Search by Product Name"
                      value={searchProductName}
                      onChange={(e) => setSearchProductName(e.target.value)}
                    />
                  </div>
                </form>

                <button
                  type="button"
                  className="px-4 py-2 ml-2 text-sm font-medium text-white bg-green-700 rounded-lg w-28 w-30 hover:bg-green-800 focus:ring-4 focus:outline-none"
                  onClick={handleAddProduct}
                >
                  Add Product
                </button>
              </div>

              <table className="min-w-full overflow-hidden border rounded-lg">
                <thead className="text-white bg-gray-600">
                  <tr>
                    <th className="px-4 py-2">ID</th>
                    <th className="px-4 py-2">Product Name</th>
                    <th className="px-4 py-2">Category</th>
                    <th className="px-4 py-2">Description</th>
                    <th className="px-4 py-2">Price</th>
                    <th className="px-4 py-2">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredProducts.map((product) => (
                    <tr
                      key={product.productId}
                      className={
                        product.productId % 2 === 0
                          ? "bg-[#e5e7eb]"
                          : "bg-[#d1d5db]"
                      }
                    >
                      <td className="text-center sm:text-xs">
                        {product.productId}
                      </td>
                      <td className="text-center sm:text-xs">
                        {product.productName}
                      </td>
                      <td className="text-center sm:text-xs">
                        {product.category}
                      </td>
                      <td className="text-center sm:text-xs">
                        {product.description}
                      </td>
                      <td className="text-center sm:text-xs">
                        ${Number(product.price).toFixed(2)}
                      </td>
                      <td className="flex items-center px-4 py-2 space-x-2">
                        <a
                          onClick={() => handleEditProduct(product)}
                          className="w-full p-3 text-center text-green-500 rounded-full cursor-pointer sm:text-xs hover:text-green-600"
                        >
                          Edit
                        </a>
                        <a
                          onClick={() => deleteProduct(product.productId)}
                          className="w-full p-3 text-center text-red-500 rounded-full cursor-pointer sm:text-xs hover:text-red-600"
                        >
                          Delete
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {editingProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-500 bg-opacity-75">
          <div className="p-6 bg-white rounded shadow-lg">
            <h2 className="mb-4 text-lg font-bold">Edit Product</h2>
            <form>
              <div className="mb-4">
                <label className="block mb-2 text-sm font-bold text-gray-700">
                  Product Name:
                </label>
                <input
                  type="text"
                  name="productName"
                  value={editedProduct.productName}
                  onChange={handleInputChange}
                  className="w-full p-3 border rounded"
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2 text-sm font-bold text-gray-700">
                  Category:
                </label>
                <select
                  name="category"
                  value={editedProduct.category}
                  onChange={handleInputChange}
                  className="w-full p-3 border rounded"
                >
                  <option value="category1">Category 1</option>
                  <option value="category2">Category 2</option>
                </select>
              </div>
              <div className="mb-4">
                <label className="block mb-2 text-sm font-bold text-gray-700">
                  Description:
                </label>
                <textarea
                  name="description"
                  value={editedProduct.description}
                  onChange={handleInputChange}
                  className="w-full p-3 border rounded"
                ></textarea>
              </div>
              <div className="mb-4">
                <label className="block mb-2 text-sm font-bold text-gray-700">
                  Price:
                </label>
                <input
                  type="number"
                  name="price"
                  value={editedProduct.price}
                  onChange={handleInputChange}
                  className="w-full p-3 border rounded"
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2 text-sm font-bold text-gray-700">
                  Image:
                </label>
                <input
                  type="file"
                  accept="image/*"
                  name="image"
                  onChange={(e) =>
                    setEditedProduct({
                      ...editedProduct,
                      image: e.target.files[0],
                    })
                  }
                  className="w-full p-3 border rounded"
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={handleSaveEdit}
                  className="px-4 py-2 mr-2 text-white bg-green-500 rounded hover:bg-green-600"
                >
                  Save
                </button>
                <button
                  type="button"
                  onClick={handleCancelEdit}
                  className="px-4 py-2 text-white bg-red-500 rounded hover:bg-red-600"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default ProductTable;
