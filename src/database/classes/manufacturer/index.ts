export const Manufacturer = (m: any) => {
  return {
    async getManufacturer(name: string) {
      const manufacturer = await m.findOne('Manufacturer', { where: { name } });

      if (!manufacturer) return null;
      return { ...manufacturer };
    },

    async createManufacturer(name: string) {

      let manufacturer = await m.findOne('Manufacturer', { where: { name } });

      if (!manufacturer){
        manufacturer = await m.save("Manufacturer", {
          name,
        })
      };
      return { ...manufacturer };
    },
  }
}