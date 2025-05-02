import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../styles/styles.css"; // Adjust the path as necessary

const ViewMembers = () => {
  const [members, setMembers] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch("http://localhost:5000/api/members")
      .then((res) => res.json())
      .then((data) => setMembers(data))
      .catch((err) => console.error("Error fetching members:", err));
  }, []);

  const filteredMembers = members.filter((member) =>
    [member.name, member.email, member.rollNumber]
      .some((field) => field?.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="view-container">
      <h2 className="section-title">👥 Team Members</h2>

      <input
        className="search-input"
        type="text"
        placeholder="🔍 Search by name, email, or roll number"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="member-grid">
        {filteredMembers.length ? (
          filteredMembers.map((member) => (
            <div key={member._id} className="member-card">
              <img
                className="member-img"
                src={`http://localhost:5000/uploads/${member.profileImage}`}
                alt={member.name}
              />
              <h3>
                <Link to={`/member/${member._id}`} className="profile-link">
                  {member.name}
                </Link>
              </h3>
              <p className="role">{member.role}</p>
              <p className="meta">{member.email}</p>
              <div className="card-buttons">
                <Link to={`/edit/${member._id}`}>
                  <button className="edit-btn">✏ Edit</button>
                </Link>
                <Link to={`/member/${member._id}`}>
                  <button className="delete-btn">👁 View</button>
                </Link>
              </div>
            </div>
          ))
        ) : (
          <p>No matching members found.</p>
        )}
      </div>
    </div>
  );
};

export default ViewMembers;
