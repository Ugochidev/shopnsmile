let day1 = "fridajy";
if (day1 == "saturday") {
  console.log(`${day1} is a weekend`);
} else if (
  day1 == "monday" ||
  day1 == "tuesday" ||
  day1 == "wednesday" ||
  day1 == "thursday" ||
  day1 == "friday"
) {
  console.log(`${day1} is a working day`);
} else {
  console.log(`${day1} is not a week day`);
}
