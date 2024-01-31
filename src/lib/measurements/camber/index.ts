export const calculateCamber = ({FL, RL, FR, RR} : {FL: number, RL: number, FR: number, RR: number}) => {
  const result = {
    front_axle: FL - FR,
    rear_axle: RL - RR
  }

  return result
}
