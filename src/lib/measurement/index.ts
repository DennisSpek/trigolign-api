export const calculateMeasurement = async (data: any) => {

  const toe_values_relative = 'Geometric centerline';
  const basis_toe_measurement = 'Simple';
  const show_item_first = 'Rear axle';
  const camber_caster_value = '0° 00`';
  const toe_value = '0° 00`';

  const wheelbase_left = 2500;
  const wheelbase_right = 2500;
  // const distance_x = 'P1 - Front Axle';
  const distance_x = 150;
  const distance_x_y = 6000;

  const front_left_toe_front = 5;
  const front_left_toe_back = 5; 

  const front_right_toe_front = 5;
  const front_right_toe_back = 5;

  const back_left_toe_front = 5;
  const back_left_toe_back = 5;

  const back_right_toe_front = 5;
  const back_right_toe_back = 5;

  const car_id = 'ef4b7e15-6631-40f6-abdc-fbcbc8d5c684';
  const id = '915d2336-9a7a-475d-a863-c08912bff8ce';


  const wheelbase_average = wheelbase_left + wheelbase_right / 2;
  const distance_between_rulers = distance_x_y;
  const distance_front_ruler_front_axle = distance_x;

  //Left Front Wheel Calculatated
  const front_left_toe = (Math.atan((front_left_toe_front - front_left_toe_back) / distance_between_rulers)) * (180 / Math.PI);
  const y_FL = (((front_left_toe_front - front_left_toe_back) / distance_between_rulers))*(distance_front_ruler_front_axle*10);

  const front_left_toe_average = front_left_toe_front - y_FL;

  //right Front Wheel Calculatated
  const front_right_toe = (Math.atan((front_right_toe_front - front_right_toe_back) / distance_between_rulers)) * (180 / Math.PI);
  const y_FR = (((front_right_toe_front - front_right_toe_back) / distance_between_rulers))*(distance_front_ruler_front_axle*10);

  const front_right_toe_average = front_right_toe_front - y_FL;

  // Total Front Wheel Calculated
  const total_front_wheel = front_right_toe_average-((front_right_toe_average-front_left_toe_average) /2);
  const total_front_toe = front_left_toe + front_right_toe;

  //Left Back Wheel Calculatated
  const back_left_toe = (Math.atan((back_left_toe_front - back_left_toe_back) / distance_between_rulers)) * (180 / Math.PI);
  const y_BL = (((back_left_toe_front - back_left_toe_back) / distance_between_rulers)*((distance_front_ruler_front_axle*10) + wheelbase_average));

  const back_left_toe_average = back_left_toe_front - y_BL;

  //right Back Wheel Calculatated
  const back_right_toe = (Math.atan((back_right_toe_front - back_right_toe_back) / distance_between_rulers)) * (180 / Math.PI);
  const y_BR = (((front_right_toe_front - front_right_toe_back) / distance_between_rulers)*((distance_front_ruler_front_axle*10) + wheelbase_average));

  const back_right_toe_average = back_right_toe_front - y_BR;

  // Total Back Wheel Calculated
  const total_back_wheel = back_right_toe_average-((back_right_toe_average-back_left_toe_average) /2);
  const total_back_toe = front_left_toe + front_right_toe;
  const thrustangle = (back_left_toe - back_right_toe)/2;

  return {
    front: {
      left: {
        front_left_toe, y_FL, front_left_toe_average
      },
      right: {
        front_right_toe, y_FR, front_right_toe_average
      },
      average: {
        total_front_wheel, total_front_toe
      }
    },
    back: {
      left: {
        back_left_toe, y_BL, back_left_toe_average
      },
      right: {
        back_right_toe, y_BR, back_right_toe_average
      },
      average: {
        total_back_wheel, total_back_toe, thrustangle
      }
    }
  }
}