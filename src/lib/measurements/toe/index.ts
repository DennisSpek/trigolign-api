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
  const {
    toe_values_relative,
    basis_toe_measurement,
    show_item_first,
    camber_unit,
    car_id,
    id,
    toe,
  }: Data = data;

  const W10: number = parseInt(data.wheelbase_left); //W10
  const Z10: number = parseInt(data.wheelbase_right); //Z10
  const AA13: number = parseInt(data.distance_x); //AA13
  const W13: number = parseInt(data.distance_x_y); //W13
  const V20: number = parseInt(toe.toe_front_left_front); //V20
  const V21: number = parseInt(toe.toe_front_left_back); //V21
  const AD20: number = parseInt(toe.toe_front_right_front); //AD20
  const AD21: number = parseInt(toe.toe_front_right_back); //AD21
  const V29: number = parseInt(toe.toe_back_left_front); //V29
  const V30: number = parseInt(toe.toe_back_left_back); //V30
  const AD29: number = parseInt(toe.toe_back_right_front); //AD29
  const AD30: number = parseInt(toe.toe_back_right_back); //AD30

  const AC10 = (W10 + Z10) / 2; //AC10

  // Left Front Wheel
  const Y20 = handleNaN(Math.atan((V20 - V21) / W13) * (180 / Math.PI));
  const Y22 = handleNaN(((V20 - V21) / W13) * AA13);
  const V22 = handleNaN(V20 - Y22);

  // Right Front Wheel Calculated
  const AG20 = handleNaN(-Math.atan((AD20 - AD21) / W13) * (180 / Math.PI));
  const AG22 = handleNaN(-((AD20 - AD21) / W13) * AA13);
  const AD22 = handleNaN(AD20 + AG22);

  // Total Front Wheel Calculated
  const AA23 = handleNaN(AD22 - (AD22 - V22) / 2);
  const AA24 = handleNaN(Y20 + AG20);

  // Left Back Wheel Calculated
  const Y29 = handleNaN(Math.atan((V29 - V30) / W13) * (180 / Math.PI));
  const Y31 = handleNaN(((V29 - V30) / W13) * (AA13 + AC10));
  const V31 = handleNaN(V29 - Y31);

  // Right Back Wheel Calculated
  const AG29 = handleNaN(
    Math.atan(-1 * ((AD29 - AD30) / W13)) * (180 / Math.PI)
  );
  const AG31 = handleNaN(((AD29 - AD30) / W13) * (AA13 + AC10));
  const AD31 = handleNaN(AD29 + AG31);

  // Total Back Wheel Calculated
  const AA32 = handleNaN(AD31 - (AD31 - V31) / 2);
  const AA33 = handleNaN(Y29 + AG29);
  const AA35 = handleNaN((Y29 - AG29) / 2);

  const AA18 = handleNaN((AD20 - V20) / 2 + V20);
  const AA19 = handleNaN((AD21 - V21) / 2 + V21);
  const AA20 = handleNaN(((AA19 - AA18) / W13) * AA13 + AA18);
  const AA27 = handleNaN((AD29 - V29) / 2 + V29);
  const AA28 = handleNaN((AD30 - V30) / 2 + V30);
  const AA29 = handleNaN(((AA28 - AA27) / W13) * (AA13 + AC10) + AA27);

  const V47 = AA20;
  const V48 = AA29;
  const Z46 = handleNaN((Math.atan((V47 - V48) / AC10) * 180) / Math.PI);

  return {
    front: {
      left: {
        front_left_toe: roundToThreeDecimals(Y20),
        y_FL: roundToThreeDecimals(Y22),
        front_left_toe_average: roundToThreeDecimals(V22),
      },
      right: {
        front_right_toe: roundToThreeDecimals(AG20),
        y_FR: roundToThreeDecimals(AG22),
        front_right_toe_average: roundToThreeDecimals(AD22),
      },
      average: {
        total_front_wheel: roundToThreeDecimals(AA23),
        total_front_toe: roundToThreeDecimals(AA24),
      },
    },
    back: {
      left: {
        back_left_toe: roundToThreeDecimals(Y29),
        y_BL: roundToThreeDecimals(Y31),
        back_left_toe_average: roundToThreeDecimals(V31),
      },
      right: {
        back_right_toe: roundToThreeDecimals(AG29),
        y_BR: roundToThreeDecimals(AG31),
        back_right_toe_average: roundToThreeDecimals(AD31),
      },
      average: {
        total_back_wheel: roundToThreeDecimals(AA32),
        total_back_toe: roundToThreeDecimals(AA33),
        thrustangle: roundToThreeDecimals(AA35),
      },
    },
  };
};
