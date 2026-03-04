// Seed a demo user for testing
export function seedDemoUser() {
  const usersJson = localStorage.getItem('newsrobo_users');
  const users = usersJson ? JSON.parse(usersJson) : [];
  
  // Check if demo user already exists
  const demoExists = users.some((u: any) => u.email === 'demo@newsrobo.com');
  
  if (!demoExists) {
    const demoUser = {
      id: 'demo-user-1',
      name: 'Demo User',
      email: 'demo@newsrobo.com',
      phone: '9876543210',
      password: 'demo123',
    };
    
    users.push(demoUser);
    localStorage.setItem('newsrobo_users', JSON.stringify(users));
    console.log('✅ Demo user created: demo@newsrobo.com / demo123');
  }
}
