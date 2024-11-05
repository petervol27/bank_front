const refreshAccessToken = async () => {
  const refreshToken = localStorage.getItem('refresh_token');
  try {
    const response = await axios.post('http://127.0.0.1:8000/refresh/', {
      refresh: refreshToken,
    });
    const newAccessToken = response.data.access;
    localStorage.setItem('access_token', newAccessToken);
  } catch (error) {
    alert('To keep your information safe please log in again');
    window.location.href = '../../../index.html';
  }
};

const checkLogin = async () => {
  const access = localStorage.getItem('access_token');
  if (access) {
    try {
      // await refreshAccessToken();
      window.location.reload();
    } catch (error) {
      window.location.href = '../../../index.html';
    }
  }
};

const logout = () => {
  localStorage.removeItem('access_token');
  localStorage.removeItem('refresh_token');
  alert('Thanks for using our services hope to see you again next time!');
  window.location.href = '../../../index.html';
};

const capitalize = (word) => word.charAt(0).toUpperCase() + word.slice(1);

const logoutBtn = document.getElementById('logoutBtn');
window.onload = async () => {
  logoutBtn.addEventListener('click', logout);
  // await checkLogin();
};
