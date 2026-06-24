// src/services/authService.js

const MOCK_USERS = [
  { username: 'staff', password: 'ASDasd123', role: 'staff', name: 'Iqbal Purnomo (Staff)' },
  { username: 'spv', password: 'ASDasd123', role: 'spv', name: 'Mandala Putra (Supervisor)' },
  { username: 'manager', password: 'ASDasd123', role: 'manager', name: 'Ade Mulya (Manager)' },
  { username: 'admin', password: 'ASDasd123', role: 'admin', name: 'Fadjri Manalu (HR/Admin)' },
];

export const loginUser = async (username, password) => {
  // Simulasi loading dari server selama 800ms
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const user = MOCK_USERS.find(
        (u) => u.username === username && u.password === password
      );

      if (user) {
        const { password, ...userData } = user; // Hapus password dari object response
        resolve(userData);
      } else {
        reject(new Error("Username atau password salah!"));
      }
    }, 800);
  });
};