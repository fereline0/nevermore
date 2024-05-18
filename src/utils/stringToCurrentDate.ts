export function stringToCurrentDate(time: string): Date {
  const currentDate = new Date();

  const timeRegex = /([-+]?)\s*(\d+)\s*(\w+)/;
  const matches = time.match(timeRegex);

  if (!matches) {
    throw new Error("Invalid time format");
  }

  const sign = matches[1] === "-" ? -1 : 1;
  const value = parseInt(matches[2], 10);
  const unit = matches[3].toLowerCase();

  const timeInMilliseconds: { [key: string]: number } = {
    minute: 60000,
    minutes: 60000,
    hour: 3600000,
    hours: 3600000,
    day: 86400000,
    days: 86400000,
    month: 2592000000,
    months: 2592000000,
    year: 31536000000,
    years: 31536000000,
  };

  if (!(unit in timeInMilliseconds)) {
    throw new Error("Invalid time unit");
  }

  const futureTime =
    currentDate.getTime() + sign * value * timeInMilliseconds[unit];

  return new Date(futureTime);
}
