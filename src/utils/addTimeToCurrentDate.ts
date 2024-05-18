export function addTimeToCurrentDate(time: string): Date {
  const currentDate = new Date();

  const timeRegex = /(\d+)\s*(\w+)/;
  const matches = time.match(timeRegex);

  if (!matches) {
    throw new Error("Invalid time format");
  }

  const value = parseInt(matches[1], 10);
  const unit = matches[2].toLowerCase();

  const timeInMilliseconds: { [key: string]: number } = {
    minute: value * 60000,
    minutes: value * 60000,
    hour: value * 3600000,
    hours: value * 3600000,
    day: value * 86400000,
    days: value * 86400000,
    month: value * 2592000000,
    months: value * 2592000000,
    year: value * 31536000000,
    years: value * 31536000000,
  };

  if (!(unit in timeInMilliseconds)) {
    throw new Error("Invalid time unit");
  }

  const futureTime = currentDate.getTime() + timeInMilliseconds[unit];

  return new Date(futureTime);
}
