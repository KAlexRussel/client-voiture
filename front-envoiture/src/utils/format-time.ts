import { format, getTime, formatDistanceToNow } from 'date-fns';

// ----------------------------------------------------------------------

type InputValue = Date | string | number | null | undefined;

export function fDate(date: InputValue, newFormat?: string) {
  const fm = newFormat || 'dd MMM yyyy';

  return date ? format(new Date(date), fm) : '';
}

export function fDateTime(date: InputValue, newFormat?: string) {
  const fm = newFormat || 'dd MMM yyyy p';

  return date ? format(new Date(date), fm) : '';
}

export function convertTimeFormat(inputTime: string): string {
  // Split the input time into hours and minutes
  const [hours, minutes] = inputTime.split(':');

  // Create the desired format
  const outputTime = `${hours}h${minutes}`;

  return outputTime;
}

export function calculateArrivingTime(startTime: any, tripTime: any): string {
  // Split the input time into hours and minutes
  const [initialHour, initialMinute] = format(new Date(startTime), 'HH:MM').split(':').map(Number);
  const tripTimeStr = tripTime.toString();
  const [tripHours, tripMinutes] = tripTimeStr.split('.').map(Number);

  // Calculate arriving time
  let arrivingHour = initialHour + tripHours;
  let arrivingMinute = initialMinute + tripMinutes;

  // Adjust if minutes exceed 60
  if (arrivingMinute >= 60) {
    arrivingHour += Math.floor(arrivingMinute / 60);
    arrivingMinute %= 60;
  }

  // Create the desired format
  const outputTime = `${arrivingHour.toString().padStart(2, '0')}h${arrivingMinute
    .toString()
    .padStart(2, '0')}`;

  return outputTime;
}

export function convertDecimalToTimeFormat(inputDecimal: any): string {
  // Split the input time into hours and minutes
  // const hour = Math.floor(inputDecimal);
  // const minute = Math.round((inputDecimal - hour) * 60);
  const inputDecimalStr = inputDecimal.toString();
  const [tripHours, tripMinutes] = inputDecimalStr.split('.').map(Number);

  // Create the desired format
  const outputTime = `${tripHours}h${tripMinutes.toString().padStart(2, '0')}`;

  return outputTime;
}

export function addHoursToTime(timeString: string, hoursToAdd: number): string {
  const [hoursStr, minutesStr] = timeString.split('h');
  const hours = parseInt(hoursStr, 10);
  const minutes = parseInt(minutesStr, 10);

  const date = new Date();
  date.setHours(hours);
  date.setMinutes(minutes);

  date.setHours(date.getHours() + hoursToAdd);

  const formattedTime = `${date.getHours()}h${String(date.getMinutes()).padStart(2, '0')}`;

  return formattedTime;
}

export function fTime(date: InputValue, newFormat?: string) {
  const fm = newFormat || 'HH:MM';

  return date ? convertTimeFormat(format(new Date(date), fm)) : '';
}

export function fTimestamp(date: InputValue) {
  return date ? getTime(new Date(date)) : '';
}

export function fToNow(date: InputValue) {
  return date
    ? formatDistanceToNow(new Date(date), {
        addSuffix: true,
      })
    : '';
}
