
import React from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const ProfileDetails = () => {
  const { id } = useParams();
  const [profile, setProfile] = React.useState(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get(`/api/profiles/${id}`); // Adjust the API endpoint
        setProfile(response.data);
      } catch (error) {
        console.error('Error fetching profile:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [id]);

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      {profile ? (
        <div>
          <h2>{profile.name}</h2>
          <img src={profile.photo} alt={profile.name} />
          <p>{profile.description}</p>
          <p>Location: {profile.location.address}</p>
        </div>
      ) : (
        <div>Profile not found.</div>
      )}
    </div>
  );
};

export default ProfileDetails;
