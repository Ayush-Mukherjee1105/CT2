import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../styles/styles.css';

const MemberDetails = ({ isDarkMode, toggleDarkMode }) => {
  const { id } = useParams();
  const [member, setMember] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:5000/api/members/${id}`)
      .then(res => res.json())
      .then(data => setMember(data))
      .catch(err => console.error(err));
  }, [id]);

  const handleDelete = async () => {
    const confirm = window.confirm('Are you sure you want to delete this member?');
    if (!confirm) return;

    try {
      const res = await fetch(`http://localhost:5000/api/members/${id}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        alert('Member deleted.');
        navigate('/view');
      } else {
        alert('Failed to delete.');
      }
    } catch (err) {
      console.error(err);
    }
  };

  if (!member) return <p className="loading-text">Loading member details...</p>;

  return (
    <div className={`form-page ${isDarkMode ? 'dark' : ''}`}>
      <Navbar isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />

      <div className="form-card">
        <h2>👤 Member Profile</h2>
        <div className="preview-container">
          <img
            src={`http://localhost:5000/uploads/${member.profileImage}`}
            alt={member.name}
            className="preview-image"
          />
        </div>

        <div className="member-detail">
          <p><strong>Name:</strong> {member.name}</p>
          <p><strong>Email:</strong> {member.email}</p>
          <p><strong>Roll Number:</strong> {member.rollNumber}</p>
          <p><strong>Year:</strong> {member.year}</p>
          <p><strong>Degree:</strong> {member.degree}</p>
          <p><strong>Role:</strong> {member.role}</p>
          <p><strong>Project:</strong> {member.project}</p>
          <p><strong>Hobby:</strong> {member.hobby}</p>
          <p><strong>Certification:</strong> {member.certification}</p>
          <p><strong>Internship:</strong> {member.internship}</p>
          <p><strong>Aim:</strong> {member.aim}</p>
        </div>

        <div className="form-actions">
          <button onClick={() => navigate(`/members/edit/${id}`)} className="submit-btn">✏ Edit</button>
          <button onClick={handleDelete} className="delete-btn">🗑 Delete</button>
        </div>
      </div>
    </div>
  );
};

export default MemberDetails;
