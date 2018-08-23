import axios from 'axios';

export const getStarWarsCharacter = async index => {
  try {
    const response = await axios.get(`https://swapi.co/api/people/${index}`);
    return response.data;
  } catch (error) {
    return error;
  }
};

export const getHomePlanet = async url => {
  try {
    const response = await axios.get(`${url}`);
    return response.data;
  } catch (error) {
    return error;
  }
};

export const getFilm = async index => {
  try {
    const response = await axios.get(`https://swapi.co/api/films/${index}`);
    return response.data;
  } catch (error) {
    return error;
  }
};
