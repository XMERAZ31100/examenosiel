async function authenticateUser(username, password) {
  try {
    const response = await trickleListObjects('user', 100, true);
    const users = response.items;
    
    const user = users.find(u => 
      u.objectData.Username === username && 
      u.objectData.Password === password
    );
    
    if (user) {
      return {
        id: user.objectId,
        username: user.objectData.Username,
        fullName: user.objectData.FullName,
        email: user.objectData.Email,
        role: user.objectData.Role,
        version: user.objectData.Version
      };
    }
    
    return null;
  } catch (error) {
    console.error('Authentication error:', error);
    throw error;
  }
}

function getCurrentUser() {
  const userStr = localStorage.getItem('currentUser');
  return userStr ? JSON.parse(userStr) : null;
}

function logout() {
  localStorage.removeItem('currentUser');
  window.location.href = 'index.html';
}