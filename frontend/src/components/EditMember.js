import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../styles/styles.css";

const EditMember = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    rollNumber: "",
    year: "",
    degree: "",
    role: "",
    project: "",
    hobby: "",
    certification: "",
    internship: "",
    aim: "",
  });

  const [imageFile, setImageFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");

  // Fetch member details
  useEffect(() => {
    fetch(`http://localhost:5000/api/members/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setFormData(data);
        if (data.profileImage) {
          setPreviewUrl(`http://localhost:5000/uploads/${data.profileImage}`);
        }
      })
      .catch((err) => {
        console.error("Failed to load member:", err);
        alert("Could not load member data.");
      });
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
    setPreviewUrl(file ? URL.createObjectURL(file) : "");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => data.append(key, value));
    if (imageFile) {
      data.append("profileImage", imageFile);
    }

    try {
      const res = await fetch(`http://localhost:5000/api/members/${id}`, {
        method: "PUT",
        body: data,
      });
      if (res.ok) {
        alert("Member updated!");
        navigate("/view");
      } else {
        alert("Failed to update member.");
      }
    } catch (err) {
      console.error(err);
      alert("Error updating member.");
    }
  };

  return (
    <div className="form-container">
      <h2 className="form-title">Edit Member ✏</h2>
      <form onSubmit={handleSubmit} className="form">
        <div className="form-grid">
          <input name="name" value={formData.name} placeholder="Full Name" onChange={handleChange} required />
          <input name="email" value={formData.email} placeholder="Email" onChange={handleChange} required />
          <input name="rollNumber" value={formData.rollNumber} placeholder="Roll Number" onChange={handleChange} required />
          <input name="year" value={formData.year} placeholder="Year" onChange={handleChange} />
          <input name="degree" value={formData.degree} placeholder="Degree" onChange={handleChange} />
          <input name="role" value={formData.role} placeholder="Team Role" onChange={handleChange} />
        </div>

        <textarea name="project" value={formData.project} placeholder="Project Description" onChange={handleChange} />
        <input name="hobby" value={formData.hobby} placeholder="Hobbies" onChange={handleChange} />
        <input name="certification" value={formData.certification} placeholder="Certifications" onChange={handleChange} />
        <input name="internship" value={formData.internship} placeholder="Internship" onChange={handleChange} />
        <textarea name="aim" value={formData.aim} placeholder="Aim in Life" onChange={handleChange} />

        <label className="upload-label">
          Upload New Profile Picture
          <input type="file" onChange={handleImageChange} accept="image/*" />
        </label>

        {previewUrl && (
          <div className="image-preview">
            <p>Preview:</p>
            <img src={previewUrl} alt="Preview" />
          </div>
        )}

        <button type="submit" className="submit-btn">✔ Update Member</button>
      </form>
    </div>
  );
};

export default EditMember;
