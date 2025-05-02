import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../styles/styles.css';

const EditMember = () => {
  const { id } = useParams();
  const [member, setMember] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:5000/api/members/${id}`)
      .then(res => res.json())
      .then(data => setMember(data))
      .catch(err => console.error(err));
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMember({ ...member, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`http://localhost:5000/api/members/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(member)
      });

      if (res.ok) {
        alert('Member updated!');
        navigate('/view');
      } else {
        alert('Update failed');
      }
    } catch (err) {
      console.error(err);
    }
  };

  if (!member) return <p className="loading-text">Loading...</p>;

  return (
    <div className="form-container">
      <h2 className="form-title">✏ Edit Member</h2>
      <form className="form" onSubmit={handleSubmit}>
        <div className="form-grid">
          <input name="name" value={member.name} onChange={handleChange} placeholder="Full Name" />
          <input name="email" value={member.email} onChange={handleChange} placeholder="Email" />
          <input name="rollNumber" value={member.rollNumber} onChange={handleChange} placeholder="Roll Number" />
          <input name="year" value={member.year} onChange={handleChange} placeholder="Year" />
          <input name="degree" value={member.degree} onChange={handleChange} placeholder="Degree" />
          <input name="role" value={member.role} onChange={handleChange} placeholder="Role" />
          <input name="project" value={member.project} onChange={handleChange} placeholder="Project" />
          <input name="hobby" value={member.hobby} onChange={handleChange} placeholder="Hobby" />
          <input name="certification" value={member.certification} onChange={handleChange} placeholder="Certifications" />
          <input name="internship" value={member.internship} onChange={handleChange} placeholder="Internship" />
          <input name="aim" value={member.aim} onChange={handleChange} placeholder="Aim" />
        </div>
        <button className="submit-btn" type="submit">✅ Save Changes</button>
      </form>
    </div>
  );
};

export default EditMember;
