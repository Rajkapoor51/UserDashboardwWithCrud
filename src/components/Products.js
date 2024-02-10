import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import CircularProgress from "@mui/material/CircularProgress";
// import Sheet from '@mui/joy/Sheet';
import { Link } from "react-router-dom"; // Import Link component

export default function Products() {
  const theme = useTheme();
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [updatedTitle, setUpdatedTitle] = useState("");
  const [updatedPrice, setUpdatedPrice] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [sortingOption, setSortingOption] = useState("");

  useEffect(() => {
    setIsLoading(true);
    fetch("https://fakestoreapi.com/products")
      .then((response) => response.json())
      .then((data) => {
        setProducts(data);
        setIsLoading(false); // Set loading to false after data is fetched
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
        setIsLoading(false); // Set loading to false in case of error
      });
  }, []);

  const handleDelete = (id) => {
    setIsLoading(true);
    fetch(`https://fakestoreapi.com/products/${id}`, {
      method: "DELETE",
    })
      .then(() => {
        setProducts(products.filter((product) => product.id !== id));
        setIsLoading(false); // Set loading to false after deletion
      })
      .catch((error) => {
        console.error("Error deleting product:", error);
        setIsLoading(false); // Set loading to false in case of error
      });
  };

  const handleOpenModal = (product) => {
    setSelectedProduct(product);
    setUpdatedTitle(product.title);
    setUpdatedPrice(product.price);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleUpdate = () => {
    setIsLoading(true);
    fetch(`https://fakestoreapi.com/products/${selectedProduct.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...selectedProduct,
        title: updatedTitle,
        price: updatedPrice,
      }),

    })
      .then(() => {
        const updatedProducts = products.map((product) =>
          product.id === selectedProduct.id ? { ...product, title: updatedTitle, price: updatedPrice } : product
        );

        setProducts(updatedProducts);
        setOpenModal(false);
        setIsLoading(false); // Set loading to false after update
      })
      .catch((error) => {
        console.error("Error updating product:", error);
        setIsLoading(false); // Set loading to false in case of error
      })


  };

  useEffect(() => {
    fetchProducts();
  }, [sortingOption]); // Refetch products when sortingOption changes

  const fetchProducts = () => {
    setIsLoading(true);
    const url = sortingOption
      ? `https://fakestoreapi.com/products?sort=${sortingOption}`
      : "https://fakestoreapi.com/products";

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setProducts(data);
        setIsLoading(false); // Set loading to false after data is fetched
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
        setIsLoading(false); // Set loading to false in case of error
      });
  };

  // Other functions remain unchanged

  const handleSort = (option) => {
    setSortingOption(option);
  };

  return (
    <Box
      sx={{
        mt: 10,
        ml: 30,
        mr: 5,
        '@media (max-width: 960px)': {
          ml: 22,
        },
        '@media (max-width: 600px)': {
          ml: 18,
        },
      }}
    >
      <Box sx={{ paddingLeft: 50 }}>
        <Typography variant="h4" fontWeight="bold" color="primary">
          Products
        </Typography>
      </Box>

      {/* Add button for adding product  */}
      <Link to="/add-product" style={{ textDecoration: 'none' }}>
        <Button variant="contained" color="primary" sx={{ ml: 2 }}>
          Add Product
        </Button>
      </Link>
      
      {/* Sorting buttons */}
      <Box sx={{ display: 'flex', justifyContent: 'right', marginBottom: 2 }}>
        <Button onClick={() => handleSort("asc")} variant="contained" color="primary" sx={{ marginRight: 1 }}>
          Sort Ascending
        </Button>
        <Button onClick={() => handleSort("desc")} variant="contained" color="primary">
          Sort Descending
        </Button>
      </Box>


      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <Typography variant="h6" fontWeight="bold" color="primary">
                  ID
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="h6" fontWeight="bold" color="primary" sx={{ paddingLeft: 20 }}>
                  Title
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="h6" fontWeight="bold" color="primary">
                  Price
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="h6" fontWeight="bold" color="primary" sx={{ paddingLeft: 3 }}>
                  Actions
                </Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {isLoading ? (
              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
               <CircularProgress />
               <Typography variant="h5">Loading...</Typography>
              </div>            
            ) : products.length === 0 ? (
              <Box sx={{ paddingLeft: 70, paddingTop: 20 }}>
                <Typography variant="h5">No Data Available</Typography>
              </Box>
            ) : (
              products.map((product) => (
                <TableRow key={product.id}>
                  <TableCell>{product.id}</TableCell>
                  <TableCell>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <img src={product.image} alt={product.title} style={{ width: "50px", height: "50px", marginRight: "10px" }} />
                      <Typography>{product.title}</Typography>
                    </Box>
                  </TableCell>
                  <TableCell>${product.price}</TableCell>
                  <TableCell>
                    <Button variant="contained" color="secondary" onClick={() => handleDelete(product.id)}>
                      Delete
                    </Button>
                    <Button variant="contained" color="primary" onClick={() => handleOpenModal(product)}>
                      Update
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Update Product Modal */}
      <Modal open={openModal} onClose={handleCloseModal}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            minWidth: 400,
          }}
        >
          <Typography variant="h6" gutterBottom>
            Update Product
          </Typography>
          <TextField
            label="Title"
            value={updatedTitle}
            onChange={(e) => setUpdatedTitle(e.target.value)}
            fullWidth
            sx={{ mb: 2 }}
          />
          <TextField
            label="Price"
            value={updatedPrice}
            onChange={(e) => setUpdatedPrice(e.target.value)}
            fullWidth
            sx={{ mb: 2 }}
          />
          <Button variant="contained" color="primary" onClick={handleUpdate}>
            Update
          </Button>
          <Button variant="contained" onClick={handleCloseModal} sx={{ ml: 2 }}>
            Cancel
          </Button>
        </Box>
      </Modal>
    </Box>
  );

}
