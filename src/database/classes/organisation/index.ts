import { Organisation } from "../../entities/organisation.entity";

export const organisation = (m: any) => {
  return {
    async get(id: string){
      const org = await m.findOne(Organisation, { relations: ["branches"], where: {id} });

      if (!org) return null;

      return org;
    },
    async create(name: string){
      const org = await m.save(Organisation, { name: name });

      if (!org) return null;

      return org;
    }
  }
}