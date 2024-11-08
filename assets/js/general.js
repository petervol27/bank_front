const refreshAccessToken = async () => {
  const refreshToken = localStorage.getItem('refresh_token');
  try {
    const response = await axios.post('http://127.0.0.1:8000/refresh/', {
      refresh: refreshToken,
    });
    const newAccessToken = response.data.access;
    localStorage.setItem('access_token', newAccessToken);
    return;
  } catch (error) {
    alert('To keep your information safe please log in again');
    throw error;
  }
};

const validateToken = async (token) => {
  try {
    const response = await axios.get('http://127.0.0.1:8000/users/validate/', {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (response.data.valid) {
      return;
    }
  } catch (error) {
    await refreshAccessToken();
    window.location.reload();
  }
};

const checkLogin = async () => {
  const access = localStorage.getItem('access_token');
  try {
    if (!access) {
      throw new Error('no access token');
    }
    await validateToken(access);
    return;
  } catch (error) {
    window.location.href = '../../../index.html';
  }
};

const logoutBtn = document.getElementById('logoutBtn');
const logout = () => {
  localStorage.removeItem('access_token');
  localStorage.removeItem('refresh_token');
  alert('Thanks for using our services hope to see you again next time!');
  window.location.href = '../../../index.html';
};

const capitalize = (word) => word.charAt(0).toUpperCase() + word.slice(1);

window.onload = async () => {
  logoutBtn.addEventListener('click', logout);
  await checkLogin();
};
