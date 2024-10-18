import { roundToThreeDecimals } from '@/lib/helpers/roundToThreeDecimals';
import { handleNaN } from '@/lib/helpers/handleNaN';
interface Data {
  toe_values_relative: string;
  basis_toe_measurement: string;
  show_item_first: string;
  camber_unit: string;
  car_id: string;
  id: string; 
  toe: any;
}

export const calculateToe = async (data: any) => {
  const { toe_values_relative, basis_toe_measurement, show_item_first, camber_unit, car_id, id, toe }: Data = data;
  const wheelbase_left: number = parseInt(data.wheelbase_left);
  const wheelbase_right: number = parseInt(data.wheelbase_right);
  const distance_x: number = parseInt(data.distance_x);
  const distance_x_y: number = parseInt(data.distance_x_y);
  const front_left_toe_front: number = parseInt(toe.toe_front_left_front);
  const front_left_toe_back: number = parseInt(toe.toe_front_left_back);
  const front_right_toe_front: number = parseInt(toe.toe_front_right_front);
  const front_right_toe_back: number = parseInt(toe.toe_front_right_back);
  const back_left_toe_front: number = parseInt(toe.toe_back_left_front);
  const back_left_toe_back: number = parseInt(toe.toe_back_left_back);
  const back_right_toe_front: number = parseInt(toe.toe_back_right_front);
  const back_right_toe_back: number = parseInt(toe.toe_back_right_back);

  const wheelbase_average = (wheelbase_left + wheelbase_right) / 2;
  const distance_between_rulers = distance_x_y;
  const distance_front_ruler_front_axle = distance_x;

  // Left Front Wheel Calculated
  const front_left_toe = handleNaN((Math.atan((front_left_toe_front - front_left_toe_back) / distance_between_rulers)) * (180 / Math.PI));
  const y_FL = handleNaN((((front_left_toe_front - front_left_toe_back) / distance_between_rulers)) * (distance_front_ruler_front_axle));
  const front_left_toe_average = handleNaN(front_left_toe_front - y_FL);

  // Right Front Wheel Calculated
  const front_right_toe = handleNaN(-(Math.atan((front_right_toe_front - front_right_toe_back) / distance_between_rulers)) * (180 / Math.PI));
  const y_FR = handleNaN(-(((front_right_toe_front - front_right_toe_back) / distance_between_rulers)) * (distance_front_ruler_front_axle));
  const front_right_toe_average = handleNaN(front_right_toe_front + y_FR);

  // Total Front Wheel Calculated
  const total_front_wheel = handleNaN(front_right_toe_average - ((front_right_toe_average - front_left_toe_average) / 2));
  const total_front_toe = handleNaN(front_left_toe + front_right_toe);

  // Left Back Wheel Calculated
  const back_left_toe = handleNaN((Math.atan((back_left_toe_front - back_left_toe_back) / distance_between_rulers)) * (180 / Math.PI));
  const y_BL = handleNaN((((back_left_toe_front - back_left_toe_back) / distance_between_rulers) * ((distance_front_ruler_front_axle) + wheelbase_average)));
  const back_left_toe_average = handleNaN(back_left_toe_front - y_BL);

  // Right Back Wheel Calculated
  const back_right_toe = handleNaN((Math.atan(-1 * ((back_right_toe_front - back_right_toe_back) / distance_between_rulers))) * (180 / Math.PI));
  const y_BR = handleNaN((((front_right_toe_front - front_right_toe_back) / distance_between_rulers) * ((distance_front_ruler_front_axle) + wheelbase_average)));
  const back_right_toe_average = handleNaN(back_right_toe_front - y_BR);

  // Total Back Wheel Calculated
  const total_back_wheel = handleNaN(back_right_toe_average - ((back_right_toe_average - back_left_toe_average) / 2));
  const total_back_toe = handleNaN(back_left_toe + back_right_toe);
  const thrustangle = handleNaN((back_left_toe - back_right_toe) / 2);

  return {
    front: {
      left: {
        front_left_toe: roundToThreeDecimals(front_left_toe),
        y_FL: roundToThreeDecimals(y_FL),
        front_left_toe_average: roundToThreeDecimals(front_left_toe_average)
      },
      right: {
        front_right_toe: roundToThreeDecimals(front_right_toe),
        y_FR: roundToThreeDecimals(y_FR),
        front_right_toe_average: roundToThreeDecimals(front_right_toe_average)
      },
      average: {
        total_front_wheel: roundToThreeDecimals(total_front_wheel),
        total_front_toe: roundToThreeDecimals(total_front_toe)
      }
    },
    back: {
      left: {
        back_left_toe: roundToThreeDecimals(back_left_toe),
        y_BL: roundToThreeDecimals(y_BL),
        back_left_toe_average: roundToThreeDecimals(back_left_toe_average)
      },
      right: {
        back_right_toe: roundToThreeDecimals(back_right_toe),
        y_BR: roundToThreeDecimals(y_BR),
        back_right_toe_average: roundToThreeDecimals(back_right_toe_average)
      },
      average: {
        total_back_wheel: roundToThreeDecimals(total_back_wheel),
        total_back_toe: roundToThreeDecimals(total_back_toe),
        thrustangle: roundToThreeDecimals(thrustangle)
      }
    }
  };
}