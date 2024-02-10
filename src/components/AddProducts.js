import React, { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useTheme } from "@mui/material/styles";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import ImageOutlinedIcon from '@mui/icons-material/ImageOutlined';

export default function AddProducts() {
  const theme = useTheme();
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState(null);
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [previewImage, setPreviewImage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("price", price);
      formData.append("category",category)
      formData.append("description",description)
      formData.append("image", image);
      
      const response = await fetch('https://fakestoreapi.com/products',{
        method:"POST",
        body:formData
      });
      
      if (!response.ok) {
        throw new Error("Failed to add product");
      }
      
      // Optionally, you can handle success here (e.g., show a success message)
      console.log("Product added successfully!");
      
      // Clear the form fields and preview image
      setTitle("");
      setPrice("");
      setDescription("");
      setCategory("")
      setImage(null);
      setPreviewImage(null);

      // Redirect to the "/products" page
      window.location.href = "/products";
    } catch (error) {
      console.error("Error adding product:", error.message);
      // Optionally, you can handle error here (e.g., show an error message)
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    // Preview the image
    const reader = new FileReader();
    reader.onload = () => {
      setPreviewImage(reader.result);
    };
    reader.readAsDataURL(file);
  };

  return (
    <Box
      sx={{
        mt: 10,
        ml: 30,
        textAlign: "center",
        [theme.breakpoints.down("md")]: {
          ml: 22,
        },
        [theme.breakpoints.down("sm")]: {
          ml: 18,
        },
      }}
    >
      <Typography variant="h4" gutterBottom>
        Add Product
      </Typography>
      <form onSubmit={handleSubmit}>
        <Box display="flex" justifyContent="center" alignItems="center" flexDirection="column" mb={2}>
          <Box mb={2}>
            {previewImage ? (
              <img src={previewImage} alt="Preview" style={{ width: 200, borderRadius: 5 }} />
            ) : (
              <ImageOutlinedIcon sx={{ fontSize: 80, color: theme.palette.text.disabled }} />
            )}
          </Box>
          <input
            type="file"
            accept="image/*"
            id="image"
            style={{ display: "none" }}
            onChange={handleImageChange}
          />
          <label htmlFor="image">
            <Button variant="contained" component="span" startIcon={<CloudUploadIcon />}>
              Upload Image
            </Button>
          </label>
        </Box>
        <TextField
          id="title"
          label="Title"
          variant="outlined"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          fullWidth
          sx={{ mb: 2 }}
        />
        <TextField
          id="description"
          label="Description"
          variant="outlined"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          fullWidth
          sx={{ mb: 2 }}
        />
        <TextField
          id="category"
          label="Category"
          variant="outlined"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          fullWidth
          sx={{ mb: 2 }}
        />
        <TextField
          id="price"
          label="Price"
          variant="outlined"
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          fullWidth
          sx={{ mb: 2 }}
        />
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Add Product
        </Button>
      </form>
    </Box>
  );
}
