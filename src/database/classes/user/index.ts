import { User } from './../../entities/user.entity'

export const UserClass = (m: any) => {
  const bcrypt = require('bcrypt');

  return {
    async get(email: string, password: string){
      const user = await m.findOne(User, { where: { email }, relations: ["branch"] });

      if (user) {
        const result = await bcrypt.compare(password, user.password);

        if (result) {
          return user;
        }
      }

      return null;
    },
    async update(body: object, id: string){

      const user = await m.findOne(User, { where: { id }});
      console.log("user", user)
      const upatedUser = await m.save(User, { where: { id }, ...{...user, ...body} });

      if (upatedUser) {
        return upatedUser
      }

      return null;
    }

  }
}