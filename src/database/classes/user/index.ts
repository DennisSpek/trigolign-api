import { User } from '@/database/entities/user.entity';

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

    async getById(id: string){
      const user = await m.findOne(User, { where: { id }, relations: ["branch"] });

      if (user) {
        return user;
      }

      return null;
    },

    async create(email: string, password: string){
      const user = await m.findOne(User, { where: { email }});

      if (!user) {
        const result = await bcrypt.hash(password, 12, async function(err: string, hash: string) {
          const password = hash;
          await m.save(User, {email, password});
        });

        if (result) {
          return user;
        }
      }

      return null;
    },
    async update(body: object, id: string){

      const user = await m.findOne(User, { where: { id }});
      
      await m.save(User, {...user, ...body});

      const upatedUser = await m.findOne(User, { where: { id }, relations: ["branch"]});

      if (upatedUser) {
        return upatedUser
      }

      return null;
    }

  }
}