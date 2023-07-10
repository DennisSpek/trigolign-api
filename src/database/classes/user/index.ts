import { User } from './../../entities/user.entity'

export const UserClass = (m: any) => {
  const bcrypt = require('bcrypt');

  return {
    async getUser(email: string, password: string){
      const user = await m.find(User, { where: {email} });

      bcrypt.compare(password, user.password, function(err: any, result: any) {
        return user
      });

      return null
    }
  }
}