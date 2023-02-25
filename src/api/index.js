import axios from "axios";

export const firstRoute = async (origin) => {
  const { data } = await axios.get(
    `https://nominatim.openstreetmap.org/search?q=${origin}&limit=1&format=json`
  );
  return data;
};
export const secondRoute = async (destination) => {
  const { data } = await axios.get(
    `https://nominatim.openstreetmap.org/search?q=${destination}&limit=1&format=json`
  );
  return data;
};
