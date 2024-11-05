const checkLogin = () => {
  const access = localStorage.getItem('access_token');
  if (!access) {
    window.location.href = '../../../index.html';
  }
};
const capitalizeFirstLetter = (word) =>
  word.charAt(0).toUpperCase() + word.slice(1);

const refreshAccessToken = async () => {
  const refreshToken = localStorage.getItem('refresh_token');
  const response = await axios.post('http://127.0.0.1:8000/refresh/', {
    refresh: refreshToken,
  });
  const newAccessToken = response.data;
  localStorage.setItem('access_token', newAccessToken);
};

const logout = () => {
  localStorage.removeItem('access_token');
  localStorage.removeItem('refresh_token');
  alert('Thanks for using our services hope to see you again next time!');
  window.location.href = '../../../index.html';
};
