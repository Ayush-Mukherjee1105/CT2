import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../styles/styles.css';

const EditMember = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [member, setMember] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:5000/api/members/${id}`)
      .then(res => res.json())
      .then(data => setMember(data))
      .catch(err => console.error('Fetch error:', err));
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMember(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`http://localhost:5000/api/members/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(member),
      });

      if (res.ok) {
        alert('Member updated successfully!');
        navigate('/view');
      } else {
        const err = await res.json();
        alert('Update failed: ' + (err.message || 'unknown error'));
      }
    } catch (err) {
      console.error(err);
    }
  };

  if (!member) return <p style={{ textAlign: 'center' }}>Loading...</p>;

  return (
    <div className="form-container">
      <h2 className="form-title">✏ Edit Member</h2>
      <form className="form" onSubmit={handleSubmit}>
        <div className="form-grid">
          {[
            'name', 'email', 'rollNumber', 'year', 'degree', 'role',
            'project', 'hobby', 'certification', 'internship', 'aim'
          ].map((field) => (
            <input
              key={field}
              name={field}
              value={member[field] || ''}
              onChange={handleChange}
              placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
              required
            />
          ))}
        </div>
        <button className="submit-btn" type="submit">💾 Save</button>
      </form>
    </div>
  );
};

export default EditMember;
