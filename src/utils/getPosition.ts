import { Geolocation } from "@capacitor/geolocation";
import { Capacitor } from "@capacitor/core";
import { Position } from "@capacitor/geolocation";
// import { useSelector, useDispatch } from '@reduxjs/toolkit'

const platform = Capacitor.getPlatform();

export const getPosition = async () => {
  let coordinates;
  const permission = await Geolocation.checkPermissions();
  if (permission.location === "granted") {
    coordinates = await Geolocation.getCurrentPosition();
  } else {
    if (platform === "web") {
    }
    await Geolocation.requestPermissions();
    coordinates = await Geolocation.getCurrentPosition();
  }
  return coordinates as Position;
};
