import { createSchool, getAllSchoolsData } from "../database.js";
import { nanoid } from "nanoid";

export function haversine(lat1, lon1, lat2, lon2) {
  const R = 6371; // Radius of the Earth in kilometers
  const toRadians = (angle) => angle * (Math.PI / 180);

  // convert latitude and longitude into radians
  const lat1_rad = toRadians(lat1);
  const lat2_rad = toRadians(lat2);
  const diffLat_rad = toRadians(lat2 - lat1);
  const diffLon_rad = toRadians(lon2 - lon1);

  const a =
    Math.sin(diffLat_rad / 2) ** 2 +
    Math.cos(lat1_rad) * Math.cos(lat2_rad) * Math.sin(diffLon_rad / 2) ** 2;

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  // Distance in kilometers
  return R * c;
}

export async function addSchool(req, res) {
  const { name, address, latitude, longitude } = req.body;

  if (!name || !address || !latitude || !longitude) {
    res.status(400).json({ error: "Input fields cannot be empty!" });
  }
  // if all fields are present then generate a unique id and store it in DB

  // generate a unique id;
  const id = nanoid();
  // store it in DB
  const result = await createSchool(id, name, address, latitude, longitude);

  console.log("result ", result);

  res.status(200).json({ msg: "success" });
}

export async function listSchool(req, res) {
  const { userLat, userLong } = req.body;

  if (!userLat || !userLong) {
    return res.status(401).json({ error: "parameters cannot be empty!" });
  }
  // we will get an array of all objects in database
  const result = await getAllSchoolsData();

  // now we need to find the distance and filter on the basis of distance
  const schoolsWithDistance = result.map((school) => {
    const distance = haversine(
      userLat,
      userLong,
      school.latitude,
      school.longitude
    ).toFixed(3);
    return { ...school, distance };
  });

  // sort all schools based on distance from user's coordinates
  schoolsWithDistance.sort((a, b) => a.distance - b.distance);

  console.log("final output", schoolsWithDistance);

  return res.status(200).send({ msg: "pending" });
}
