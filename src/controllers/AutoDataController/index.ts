import { Request, Response } from 'express';
import axios from 'axios';

// Constants
const API_URL = 'https://api.autodata-group.com/docs/v1/vehicles';
const API_KEY = process.env.API_KEY;
const ACCEPT_LANGUAGE = 'en-gb;q=0.8,en;q=0.7,fr-fr;q=0.4';
const COUNTRY_CODE = 'gb';
const PAGE_LIMIT = 20;

export class AutoDataController {
  // Get vehicle details by plate
  getDetailsByPlate = async (req: Request, res: Response) => {
    const { id } = req.params;
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
      res.send(data);
    } catch (error) {
      console.error(error);
      res.status(500).send('An error occurred');
    }
  };

  // Get wheel data id by MID
  getWheelDataIdByMID = async (req: Request, res: Response) => {
    const { mid } = req.params;
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
      res.send(data);
    } catch (error) {
      console.error(error);
      res.status(500).send('An error occurred');
    }
  };

  // Get wheel data
  getWheelData = async (req: Request, res: Response) => {
    const { mid, variant_id } = req.params;
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
      res.send(data.data);
    } catch (error) {
      console.error(error);
      res.status(500).send('An error occurred');
    }
  };
}