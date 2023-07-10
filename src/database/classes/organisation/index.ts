import { Organisation } from "../../entities/organisation.entity";

export const org = (m: any) => {
  return{
    async getOrganisation(id: string){
      const org = await m.findOne(Organisation, { relations: ["branches"], where: {id} });

      if (!org) return null;

      return org;
    }
  }
}