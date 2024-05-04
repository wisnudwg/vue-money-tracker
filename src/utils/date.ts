export const datestringToDate = (datestring: string) => {
  let output;
  try {
    output = new Date(datestring);
  } catch {
    output = new Date();
  };
  return output;
};
export const dateToDatestring = (date: Date) => {
  const day = date.toLocaleString('en', { day: '2-digit' });
  const month = date.toLocaleString('en', { month: '2-digit' });
  const year = date.getFullYear();
  return `${year}-${month}-${day}`;
};

export const formatDate = (millisecond: number) => {
  let output;
  try {
    const date = new Date(millisecond);
    const dayName = date.toLocaleString('en', { weekday: 'short' });
    const fullDate = date.toLocaleString('id', { day: '2-digit', month: 'short', year: 'numeric' }).replace("Mei", "May").replace("Agu", "Aug").replace("Okt", "Oct").replace("Des", "Dec");
    output = `${dayName} ${fullDate}`
  } catch (err) {
    output = `${millisecond}`;
  };
  return output;
};

export const formatDateRange = (milliseconds: number[]) => {
  const [dateStart, dateEnd] = [formatDate(milliseconds[0]), formatDate(milliseconds[1])];
  let output = `${dateStart} - ${dateEnd}`;
  if (dateStart === dateEnd) output = `${dateStart}`;
  return output;
};

export const formatTime = (millisecond: number) => {
  let output;
  try {
    const date = new Date(millisecond);
    const time = date.toTimeString().split(' ')[0];
    output = `${time}`;
  } catch (err) {
    output = `${millisecond}`;
  };
  return output;
};