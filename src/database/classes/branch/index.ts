import { Branch } from "../../entities/branch.entity";

export const branch = (m: any) => {
  return{
    async get(id: string){
      const branch = await m.findOne(Branch, { where: {id} });

      if (!branch) return null;

      return branch;
    },
    async create(name: string){
      const branch = await m.save(Branch, { name: name });

      if (!branch) return null;

      return branch;
    }
  }
}