export const calculateToe = ({FL, RL, FR, RR} : {FL: number, RL: number, FR: number, RR: number}) => {
  return {
    front_axle: FL - FR,
    back_axle: RL - RR
  }
}
