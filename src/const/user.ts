export const bloodGroupOptions = [
  "A+",
  "A-",
  "B+",
  "B-",
  "AB+",
  "AB-",
  "O+",
  "O-",
].map((item) => ({ value: item, label: item }));

export const genderOptions = ["male", "female", "other"].map((item) => ({
  value: item,
  label: item.charAt(0).toUpperCase() + item.slice(1),
}));
