import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ProductTable() {
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
  const [addingProduct, setAddingProduct] = useState(false);
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

  const handleAddProduct = () => {
    setAddingProduct(true);
  };

  const handleInputChangeNewProduct = e => {
    const { name, value } = e.target;
    setNewProduct(prevProduct => ({ ...prevProduct, [name]: value }));
  };

  const handleSaveNewProduct = () => {
    const apiUrl = 'http://localhost:4000/Add_New_Product';
    const formData = new FormData();
    formData.append('productName', newProduct.productName);
    formData.append('category', newProduct.category);
    formData.append('description', newProduct.description);
    formData.append('price', newProduct.price);
    formData.append('image', newProduct.image);

    axios
      .post(apiUrl, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then(response => {
        if (response.status === 201) {
          fetchProducts(); // Refetch products after addition
          setAddingProduct(false);
          setNewProduct({
            productName: '',
            category: '',
            description: '',
            price: 0,
            image: '',
          });
        }
      })
      .catch(error => console.error('Error adding new product:', error));
  };

  const handleCancelAddProduct = () => {
    setAddingProduct(false);
    setNewProduct({
      productName: '',
      category: '',
      description: '',
      price: 0,
      image: '',
    });
  };

  const filteredProducts = products.filter(product =>
    product.productName.toLowerCase().includes(searchProductName.toLowerCase())
  );

  return (
    <>
      <div className="flex flex-col my-20">
        <div className="flex flex-row">
          <div className="w-3/4 p-4">
            <div>
              <h2 className="mb-4 text-xl font-bold">Products</h2>
              <div className="mb-4">
                <input
                  type="text"
                  placeholder="Search by Product Name"
                  value={searchProductName}
                  onChange={e => setSearchProductName(e.target.value)}
                  className="w-full p-2 border rounded"
                />
              </div>
              <div className="mb-4">
                <button
                  onClick={handleAddProduct}
                  className="px-4 py-2 mr-2 text-white bg-green-500 rounded hover:bg-green-600"
                >
                  Add Product
                </button>
              </div>
              <table className="min-w-full overflow-hidden border rounded-lg">
                <thead className="text-white bg-gray-800">
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
                  {filteredProducts.map(product => (
                    <tr key={product.productId}>
                      <td className="px-4 py-2 text-center">{product.productId}</td>
                      <td className="px-4 py-2 text-center">{product.productName}</td>
                      <td className="px-4 py-2 text-center">{product.category}</td>
                      <td className="px-4 py-2 text-center">{product.description}</td>
                      <td className="px-4 py-2 text-center">
                        ${Number(product.price).toFixed(2)}
                      </td>
                      <td className="flex items-center px-4 py-2 space-x-2">
                        <button
                          onClick={() => handleEditProduct(product)}
                          className="w-full p-3 text-white bg-blue-500 rounded-full hover:bg-blue-600"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => deleteProduct(product.productId)}
                          className="w-full p-3 text-white bg-red-500 rounded-full hover:bg-red-600"
                        >
                          Delete
                        </button>
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
                <label className="block mb-2 text-sm font-bold text-gray-700">Category:</label>
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
                <label className="block mb-2 text-sm font-bold text-gray-700">Price:</label>
                <input
                  type="number"
                  name="price"
                  value={editedProduct.price}
                  onChange={handleInputChange}
                  className="w-full p-3 border rounded"
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2 text-sm font-bold text-gray-700">Image:</label>
                <input
                  type="file"
                  accept="image/*"
                  name="image"
                  onChange={(e) => setEditedProduct({ ...editedProduct, image: e.target.files[0] })}
                  className="w-full p-3 border rounded"
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={handleSaveEdit}
                  className="px-4 py-2 mr-2 text-white bg-blue-500 rounded hover:bg-blue-600"
                >
                  Save
                </button>
                <button
                  type="button"
                  onClick={handleCancelEdit}
                  className="px-4 py-2 text-white bg-gray-500 rounded hover:bg-gray-600"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {addingProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-500 bg-opacity-75">
          <div className="p-6 bg-white rounded shadow-lg">
            <h2 className="mb-4 text-lg font-bold">Add Product</h2>
            <form>
              <div className="mb-4">
                <label className="block mb-2 text-sm font-bold text-gray-700">
                  Product Name:
                </label>
                <input
                  type="text"
                  name="productName"
                  value={newProduct.productName}
                  onChange={handleInputChangeNewProduct}
                  className="w-full p-3 border rounded"
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2 text-sm font-bold text-gray-700">Category:</label>
                <select
                  name="category"
                  value={newProduct.category}
                  onChange={handleInputChangeNewProduct}
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
                  value={newProduct.description}
                  onChange={handleInputChangeNewProduct}
                  className="w-full p-3 border rounded"
                ></textarea>
              </div>
              <div className="mb-4">
                <label className="block mb-2 text-sm font-bold text-gray-700">Price:</label>
                <input
                  type="number"
                  name="price"
                  value={newProduct.price}
                  onChange={handleInputChangeNewProduct}
                  className="w-full p-3 border rounded"
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2 text-sm font-bold text-gray-700">Image:</label>
                <input
                  type="file"
                  accept="image/*"
                  name="image"
                  onChange={(e) => setNewProduct({ ...newProduct, image: e.target.files[0] })}
                  className="w-full p-3 border rounded"
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={handleSaveNewProduct}
                  className="px-4 py-2 mr-2 text-white bg-green-500 rounded hover:bg-green-600"
                >
                  Save
                </button>
                <button
                  type="button"
                  onClick={handleCancelAddProduct}
                  className="px-4 py-2 text-white bg-gray-500 rounded hover:bg-gray-600"
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
