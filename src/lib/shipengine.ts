import { ShipEngine } from "shipengine";

if (!process.env.SHIPENGINE_API_KEY) {
  throw new Error("SHIPENGINE_API_KEY is not set in the environment variables");
}

export const shipengine = new ShipEngine({
  apiKey: process.env.SHIPENGINE_API_KEY,
});
