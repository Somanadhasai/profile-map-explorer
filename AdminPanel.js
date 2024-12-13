
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AdminPanel = () => {
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newProfile, setNewProfile] = useState({ name: '', photo: '', description: '', location: {} });

  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        const response = await axios.get('/api/profiles'); // Adjust the API endpoint
        setProfiles(response.data);
      } catch (error) {
        console.error('Error fetching profiles:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfiles();
  }, []);

  const handleAddProfile = async () => {
    try {
      const response = await axios.post('/api/profiles', newProfile); // Adjust the API endpoint
      setProfiles([...profiles, response.data]);
      setNewProfile({ name: '', photo: '', description: '', location: {} }); // Reset form
    } catch (error) {
      console.error('Error adding profile:', error);
    }
  };

  const handleDeleteProfile = async (id) => {
    try {
      await axios.delete(`/api/profiles/${id}`); // Adjust the API endpoint
      setProfiles(profiles.filter(profile => profile.id !== id));
    } catch (error) {
      console.error('Error deleting profile:', error);
    }
  };

  if (loading) return <div>Loading...</div return (
    <div>
      <h2>Admin Panel</h2>
      <h3>Add New Profile</h3>
      <input
        type="text"
        placeholder="Name"
        value={newProfile.name}
        onChange={(e) => setNewProfile({ ...newProfile, name: e.target.value })}
      />
      <input
        type="text"
        placeholder="Photo URL"
        value={newProfile.photo}
        onChange={(e) => setNewProfile({ ...newProfile, photo: e.target.value })}
      />
      <textarea
        placeholder="Description"
        value={newProfile.description}
        onChange={(e) => setNewProfile({ ...newProfile, description: e.target.value })}
      />
      <input
        type="text"
        placeholder="Location (lat,lng)"
        value={newProfile.location.address}
        onChange={(e) => setNewProfile({ ...newProfile, location: { ...newProfile.location, address: e.target.value } })}
      />
      <button onClick={handleAddProfile}>Add Profile</button>

      <h3>Existing Profiles</h3>
      <div className="profile-list">
        {profiles.map(profile => (
          <div key={profile.id} className="profile-card">
            <h4>{profile.name}</h4>
            <img src={profile.photo} alt={profile.name} />
            <p>{profile.description}</p>
            <button onClick={() => handleDeleteProfile(profile.id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminPanel;
