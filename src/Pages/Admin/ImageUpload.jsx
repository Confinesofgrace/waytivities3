import React, { useRef, useState } from "react";

const ImageUpload = ({ onUpload }) => {
  const fileInputRef = useRef(null);
  const [preview, setPreview] = useState(null);
  const [uploading, setUploading] = useState(false);

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setPreview(URL.createObjectURL(file)); // Preview image before upload
    setUploading(true);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "Book covers"); // Get this from Cloudinary

    try {
      const response = await fetch(
        "https://api.cloudinary.com/v1_1/dfbqs0zcm/image/upload",
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();
      setUploading(false);
      onUpload(data.secure_url); // Send image URL to parent
    } catch (error) {
      console.error("Error uploading image:", error);
      setUploading(false);
    }
  };

  return (
    <div>
      <p className="addbook-header">Add Book Cover</p>
      <div
        className="image-upload-container"
        onClick={() => fileInputRef.current?.click()}
        style={{
          width: "150px",
          height: "200px",
          border: "2px dashed purple",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          position: "relative",
          backgroundSize: "cover",
          backgroundPosition: "center",
          borderRadius: "10px",
          backgroundImage: preview ? `url(${preview})` : "none",
        }}
      >
        {uploading ? "Uploading..." : !preview ? "Click to Upload" : ""}
      </div>
      <input
        type="file"
        ref={fileInputRef}
        accept="image/*"
        style={{ display: "none" }}
        onChange={handleFileChange}
      />
    </div>
  );
};

export default ImageUpload;
