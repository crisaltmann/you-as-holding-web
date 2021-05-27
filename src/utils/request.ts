import ky from "ky";

export const request = ky.create({
  prefixUrl: "https://fundament-stock-api.herokuapp.com",
  headers: {
    accept: "application/json",
  },
});
