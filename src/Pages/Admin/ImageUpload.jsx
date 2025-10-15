import React, { useState, useEffect, useCallback } from "react";
import { useDropzone } from "react-dropzone";

const ImageUpload = ({ label, onUpload, existingImage }) => {
  const [preview, setPreview] = useState(existingImage || null);
  const [uploading, setUploading] = useState(false);

  // Update preview when editing an existing book
  useEffect(() => {
    if (existingImage) {
      setPreview(existingImage);
    }
  }, [existingImage]);

  const onDrop = useCallback(async (acceptedFiles) => {
    const file = acceptedFiles[0];
    if (!file) return;

    setPreview(URL.createObjectURL(file));
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
      setPreview(data.secure_url);
      onUpload(data.secure_url);
    } catch (error) {
      console.error("Upload failed:", error);
      setUploading(false);
    }
  }, [onUpload]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/jpeg": [], "image/png": [] },
    multiple: false,
  });

  return (
    <div className="for-input1">
      <label className="admin-label">{label}</label>

      <div {...getRootProps()} id="dropzone-area">
        <input {...getInputProps()} />

        {isDragActive ? (
          <p>Drop the image here...</p>
        ) : uploading ? (
          <p>Uploading...</p>
        ) : preview ? (
          <img
            src={preview}
            alt="Front Cover"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              borderRadius: "12px",
            }}
          />
        ) : (
          <p>Drag & drop image here, or click to select</p>
        )}
      </div>
    </div>
  );
};

export default ImageUpload;
