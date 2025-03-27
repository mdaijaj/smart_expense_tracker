import React, { useState, useEffect } from 'react';
import { profileDetails, updateProfile } from '../api'; 

const Profile = () => {
  const [profile, setProfile] = useState({
    name: '',
    currency: 'INR',
    monthly_budget: 5000,
  });
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true); 


  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('token'); 
        const response = await profileDetails(token);
        console.log("response", response.data);
        setProfile(response.data.user); 
      } catch (error) {
        console.error('Failed to fetch profile:', error);
        alert('Error fetching profile data. Please try again later.');
      } finally {
        setLoading(false); 
      }
    };
    fetchProfile();
  }, []);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prevProfile) => ({
      ...prevProfile,
      [name]: value,
    }));
  };


  const handleSave = async () => {
    try {
      const token = localStorage.getItem('token'); 
      const response = await updateProfile(token, profile); 
      setProfile(response.data); 
      setIsEditing(false);
      alert('Profile updated successfully!');
    } catch (error) {
      console.error('Failed to update profile:', error);
      alert('Error updating profile. Please try again later.');
    }
  };

  if (loading) {
    return <div>Loading...</div>; 
  }

  return (
    <div className="container mt-4">
      <h2>Profile</h2>
      {console.log("profile", profile)}
      <div className="card p-4">
        {!isEditing ? (
          <>
            <p><strong>Name:</strong> {profile?.name}</p>
            <p><strong>Name:</strong> {profile?.email}</p>
            <p><strong>Currency:</strong> {profile?.currency}</p>
            <p><strong>Monthly Budget:</strong> {profile?.monthly_budget}</p>
            <button
              className="btn btn-primary"
              onClick={() => setIsEditing(true)}
            >
              Edit Profile
            </button>
          </>
        ) : (
          <>
            <div className="mb-3">
              <label className="form-label">Name</label>
              <input
                type="text"
                className="form-control"
                name="name"
                value={profile?.name}
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Email</label>
              <input
                type="text"
                className="form-control"
                name="email"
                value={profile?.email}
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Currency</label>
              <input
                type="text"
                className="form-control"
                name="currency"
                value={profile.currency}
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Monthly Budget</label>
              <input
                type="number"
                className="form-control"
                name="monthly_budget"
                value={profile.monthly_budget}
                onChange={handleChange}
              />
            </div>
            <button className="btn btn-success me-2" onClick={handleSave}>
              Save
            </button>
            <button
              className="btn btn-secondary"
              onClick={() => setIsEditing(false)}
            >
              Cancel
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Profile;