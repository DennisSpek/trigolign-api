export const calculateCamber = ({FL, RL, FR, RR} : {FL: number, RL: number, FR: number, RR: number}) => {  
  const result = {
    front: {
      front_left: FL,
      front_right: FR,
    },
    back: {
      rear_left: RL,
      rear_right: RR,      
    },
    calculated: {
      front: FL - FR,
      rear: RL - RR,
    }
  }

  return result
}
