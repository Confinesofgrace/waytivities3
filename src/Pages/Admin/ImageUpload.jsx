import React, { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";

const ImageUpload = ({ label, onUpload }) => {
  const [preview, setPreview] = useState(null);
  const [uploading, setUploading] = useState(false);

  const onDrop = useCallback(async (acceptedFiles) => {
    const file = acceptedFiles[0];
    if (!file) return;

    setPreview(URL.createObjectURL(file)); // preview before upload
    setUploading(true);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "Book covers");

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
      onUpload(data.secure_url); // Send Cloudinary URL back to parent
    } catch (error) {
      console.error("Upload failed:", error);
      setUploading(false);
    }
  }, [onUpload]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/jpeg": [],
      "image/png": [],
    },
    multiple: false,
  });

  return (
    <div className="for-input1">
      <label className="admin-label">{label}</label>

      <div {...getRootProps()} id="dropzone-area">
        <input {...getInputProps()} />
        {isDragActive ? (
          <p>Drop the image here...</p>
        ) : preview ? (
          <img
            src={preview}
            alt="Preview"
            style={{ width: "100%", borderRadius: "8px" }}
          />
        ) : (
          <p>{uploading ? "Uploading..." : "Drag & drop image here, or click to select"}</p>
        )}
      </div>
    </div>
  );
};

export default ImageUpload;
