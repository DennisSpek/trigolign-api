import { roundToThreeDecimals } from '@/lib/helpers/roundToThreeDecimals';
import { handleNaN } from '@/lib/helpers/handleNaN';

export const calculateCamber = ({ FL, RL, FR, RR }: { FL: number, RL: number, FR: number, RR: number }) => {
  const result = {
    front: {
      front_left: roundToThreeDecimals(handleNaN(FL)),
      front_right: roundToThreeDecimals(handleNaN(FR)),
    },
    back: {
      rear_left: roundToThreeDecimals(handleNaN(RL)),
      rear_right: roundToThreeDecimals(handleNaN(RR)),
    },
    calculated: {
      front: roundToThreeDecimals(handleNaN(FL - FR)),
      rear: roundToThreeDecimals(handleNaN(RL - RR)),
    }
  };

  return result;
};
