import api from "../api";

export const handleFollow = async (userId) => {
  try {
    const res = await api.put(`/follow/${userId}`);
    alert(res.data.message);
  } catch (err) {
    alert(err.response?.data?.message || "Failed to follow");
  }
};

export const handleUnfollow = async (userId) => {
  try {
    const res = await api.put(`/unfollow/${userId}`);
    alert(res.data.message);
  } catch (err) {
    alert(err.response?.data?.message || "Failed to unfollow");
  }
};
