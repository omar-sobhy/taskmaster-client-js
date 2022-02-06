interface User {
  _id: string
  username: string
  email: string
}

interface UserWithPassword extends User {
  password: string
}

export default User;

export { User, UserWithPassword };
