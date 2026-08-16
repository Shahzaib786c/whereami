// Reverse geocoding via OpenStreetMap's Nominatim API (free, no API key).
// Docs: https://nominatim.org/release-docs/latest/api/Reverse/

export async function reverseGeocode(lat, lng) {
  const url = `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json&addressdetails=1`;

  const response = await fetch(url, {
    headers: {
      Accept: "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Could not look up address details for this location.");
  }

  const data = await response.json();
  const address = data.address || {};

  return {
    displayName: data.display_name || null,
    city:
      address.city || address.town || address.village || address.county || null,
    province: address.state || address.province || null,
    country: address.country || null,
    postcode: address.postcode || null,
    road: address.road || null,
    suburb: address.suburb || address.neighbourhood || null,
  };
}
