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
    } catch (error: any) {
      console.error(error.response.data);
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
    } catch (error: any) {
      console.error(error.response.data);
      return null
    }
  };

  // Get wheel data
  getWheelAlignmentData = async (mid: string, variant_id: string) => {
    console.log('testing', `${API_URL}/${mid}/wheel-alignment-data/${variant_id}`);

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
    } catch (error: any) {
      console.error(error.response.data);
      return null
    }
  };
}