import { Request, Response } from 'express';
import axios from 'axios';

// Constants
const API_URL = 'https://api.autodata-group.com/docs/v1/vehicles';
const API_KEY = process.env.API_KEY_AUTODATA;
const ACCEPT_LANGUAGE = 'en-gb;q=0.8,en;q=0.7,fr-fr;q=0.4';
const COUNTRY_CODE = 'gb';
const PAGE_LIMIT = 20;

export class AutoDataController {
  // Get vehicle details by plate
  getDetailsByPlate = async (id: string) => {
    try {
      const { data } = await axios.get(API_URL, {
        params: {
          id,
          method: 'nl_vrm',
          'country-code': COUNTRY_CODE,
          page: 1,
          limit: PAGE_LIMIT,
          api_key: API_KEY,
        },
        headers: {
          Accept: 'application/json',
          'Accept-Language': ACCEPT_LANGUAGE,
        },
      });
      return data
    } catch (error) {
      console.error(error);
      return null
    }
  };

  // Get wheel data id by MID
  getWheelDataIdByMID = async (mid: string) => {
    try {
      const { data } = await axios.get(`${API_URL}/${mid}/wheel-alignment-data`, {
        params: {
          'country-code': COUNTRY_CODE,
          api_key: API_KEY,
        },
        headers: {
          Accept: 'application/json',
          'Accept-Language': ACCEPT_LANGUAGE,
        },
      });
     return data
    } catch (error) {
      console.error(error);
     return null
    }
  };

  // Get wheel data
  getWheelData = async (mid: string, variant_id: string) => {
    try {
      const { data } = await axios.get(`${API_URL}/${mid}/wheel-alignment-data/${variant_id}`, {
        params: {
          'country-code': COUNTRY_CODE,
          api_key: API_KEY,
        },
        headers: {
          Accept: 'application/json',
          'Accept-Language': ACCEPT_LANGUAGE,
        },
      });
      return data
    } catch (error) {
      console.error(error);
      return null
    }
  };

  // getWheelDataByPlate = async (req: Request<{id: string}>, res: Response) => {
  //   const { id } = req.params;
  //   let mid: string;

  //   let car = {};
    
  //   const { data } = await this.getDetailsByPlate(id);

  //   if (data.data[0]) {
  //     mid = data.data[0].mid
  //     const res = await axios.get(`${API_URL}/${mid}/wheel-alignment-data`, {
  //       params: {
  //         'country-code': COUNTRY_CODE,
  //         api_key: API_KEY,
  //       },
  //       headers: {
  //         Accept: 'application/json',
  //         'Accept-Language': ACCEPT_LANGUAGE,
  //       },
  //     });

  //     car = {
  //       manufacturer: data.data[0].manufacturer,
  //       model: data.data[0].model,
  //       mid: mid,
  //     }
      
  //     if (res.data.data.length === 1) {
  //       const { data } = await axios.get(`${API_URL}/${mid}/wheel-alignment-data/${res.data.data[0].wheel_alignment_id}`, {
  //         params: {
  //           'country-code': COUNTRY_CODE,
  //           api_key: API_KEY,
  //         },
  //         headers: {
  //           Accept: 'application/json',
  //           'Accept-Language': ACCEPT_LANGUAGE,
  //         },
  //       });

  //       const wheelSettings = {
  //         "front": {
  //           "camber": data.data.wheel_alignment_groups[3].technical_data_items.find((i: any) => i.description === "Front camber" && i.units === "deg"),
  //           "toe": data.data.wheel_alignment_groups[3].technical_data_items.find((i: any) => i.description === "Front toe-in" && i.units === "deg"),
  //         },
  //         "rear": {
  //           "camber": data.data.wheel_alignment_groups[3].technical_data_items.find((i: any) => i.description === "Rear camber" && i.units === "deg"),
  //           "toe": data.data.wheel_alignment_groups[3].technical_data_items.find((i: any) => i.description === "Rear toe-in" && i.units === "deg"),
  //         }
  //       }

  //       car = {
  //        ...car,
  //         wheelData: wheelSettings,
  //       }
  //     }
  //   }

    

  //   res.send(car);
  // }

}