import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/styles.css";

const ViewMembers = () => {
  const [members, setMembers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:5000/api/members")
      .then((res) => res.json())
      .then((data) => setMembers(data))
      .catch((err) => console.error("Error fetching members:", err));
  }, []);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this member?");
    if (!confirmDelete) return;

    try {
      const res = await fetch(`http://localhost:5000/api/members/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setMembers((prev) => prev.filter((m) => m._id !== id));
      } else {
        alert("Failed to delete.");
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="view-container">
      <h2 className="section-title">👥 Team Members</h2>
      <div className="member-grid">
        {members.map((member) => (
          <div className="member-card" key={member._id}>
            <img
              src={`http://localhost:5000/uploads/${member.profileImage}`}
              alt={member.name}
              className="member-img"
            />
            <h3>{member.name}</h3>
            <p className="role">{member.role}</p>
            <p className="meta">{member.degree}, {member.year}</p>
            <div className="card-buttons">
              <button onClick={() => navigate(`/edit/${member._id}`)} className="edit-btn">✏ Edit</button>
              <button onClick={() => handleDelete(member._id)} className="delete-btn">🗑 Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ViewMembers;
