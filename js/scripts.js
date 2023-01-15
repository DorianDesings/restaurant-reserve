const calendarElement = document.getElementById('calendar');
const formElement = document.getElementById('form');
const dinnersElement = document.getElementById('dinners');
const shiftElement = document.getElementById('shift');
const hoursElement = document.getElementById('hours');
const reserveElement = document.getElementById('reserve');
const reserveStatusElement = document.getElementById('reserve-status');
const rootStyles = document.documentElement.style;
const days = [
  'monday',
  'tusday',
  'wednesday',
  'thursday',
  'friday',
  'saturday',
  'sunday'
];
const months = [
  'january',
  'february',
  'march',
  'april',
  'may',
  'june',
  'july',
  'august',
  'september',
  'october',
  'november',
  'december'
];

const date = new Date();
const today = date.getDay();
const currentDate = date.getDate();
const currentMonth = date.getMonth();
const currentYear = date.getFullYear();

let allDays;
let dayOfTheWeek;
let dinners;
let reserveDay;
let reserveHours;

const isLeap = year =>
  year % 400 === 0 ? true : year % 100 === 0 ? false : year % 4 === 0;

const daysOfMonth = {
  january: 31,
  february: isLeap(currentYear) ? 29 : 28,
  march: 31,
  april: 30,
  may: 31,
  june: 30,
  july: 31,
  august: 31,
  september: 30,
  october: 31,
  november: 30,
  december: 31
};

for (const day of days) {
  const dayHeader = document.createElement('span');
  dayHeader.classList.add('day-header');
  dayHeader.textContent = day;
  calendarElement.append(dayHeader);
}

const getDayOfWeek = day => new Date(currentYear, currentMonth, day).getDay();

const printDaysOfMonth = () => {
  const firstDay = getDayOfWeek(1);
  rootStyles.setProperty('--first-day-column', firstDay === 0 ? 7 : firstDay);
  const newDay = document.createElement('span');
  newDay.classList.add('day', 'first-day');
  if (currentDate > 1) newDay.classList.add('disabled');
  newDay.textContent = 1;
  calendarElement.append(newDay);
  for (let i = 2; i <= daysOfMonth[months[currentMonth]]; i++) {
    const newDay = document.createElement('span');
    newDay.classList.add('day');
    newDay.textContent = i;
    if (i === currentDate) newDay.classList.add('today');
    if (i < currentDate) newDay.classList.add('disabled');
    calendarElement.append(newDay);
  }

  allDays = [...document.querySelectorAll('.day')];
};

printDaysOfMonth();

const generateDinnersOptions = loops => {
  const fragment = document.createDocumentFragment();
  for (let i = 0; i <= loops; i++) {
    const newOption = document.createElement('option');
    newOption.value = i;
    if (i === 0) newOption.textContent = `Number of dinners`;
    else if (i === 1) newOption.textContent = `${i} dinner`;
    else newOption.textContent = `${i} dinners`;
    fragment.append(newOption);
  }
  return fragment;
};

const setDinnersSelect = day => {
  dinnersElement.innerHTML = '';
  dayOfTheWeek = getDayOfWeek(day);
  if (dayOfTheWeek !== 0 && dayOfTheWeek <= 4) {
    dinnersElement.append(generateDinnersOptions(8));
  } else {
    dinnersElement.append(generateDinnersOptions(15));
  }
  dinnersElement.removeAttribute('disabled');
};

const generateShiftOptions = day => {
  const shifts = ['morning', 'afternoon'];
  const fragment = document.createDocumentFragment();
  let newOption = document.createElement('option');
  newOption.value = 0;
  newOption.textContent = 'Select shift';
  fragment.append(newOption);
  if (day === 0) {
    newOption = document.createElement('option');
    newOption.value = shifts[0];
    newOption.textContent = shifts[0];
    fragment.append(newOption);
  } else {
    for (let i = 0; i < 2; i++) {
      newOption = document.createElement('option');
      newOption.value = shifts[i];
      newOption.textContent = shifts[i];
      fragment.append(newOption);
    }
  }
  shiftElement.removeAttribute('disabled');
  return fragment;
};

const setShiftSelect = day => {
  shiftElement.innerHTML = '';
  if (day === 0) {
    shiftElement.append(generateShiftOptions(day));
  } else {
    shiftElement.append(generateShiftOptions(day));
  }
  shiftElement.removeAttribute('disabled');
};

const generateHoursOptions = shift => {
  const hours = {
    morning: {
      startTime: 6,
      endTime: 14
    },
    afternoon: {
      startTime: 15,
      endTime: 22
    }
  };

  const fragment = document.createDocumentFragment();
  let newOption = document.createElement('option');
  newOption.value = 0;
  newOption.textContent = 'Select hour';
  fragment.append(newOption);
  for (let i = hours[shift].startTime; i <= hours[shift].endTime; i++) {
    newOption = document.createElement('option');
    newOption.value = `${i}:00`;
    newOption.textContent = `${i}:00`;
    fragment.append(newOption);
    if (i !== hours[shift].endTime) {
      newOption = document.createElement('option');
      newOption.value = `${i}:30`;
      newOption.textContent = `${i}:30`;
      fragment.append(newOption);
    }
  }

  hoursElement.removeAttribute('disabled');

  return fragment;
};

const setHoursSelect = shift => {
  if (Number(shift) === 0) return;
  hoursElement.innerHTML = '';
  hoursElement.append(generateHoursOptions(shift));
};

const selectDay = day => {
  allDays.forEach(item => {
    item.classList.remove('selected');
  });
  day.classList.add('selected');

  setDinnersSelect(day.textContent);
  reserveDay = day.textContent;
};

calendarElement.addEventListener('click', e => {
  if (
    e.target.classList.contains('calendar') ||
    e.target.classList.contains('disabled')
  )
    return;
  selectDay(e.target);
  shiftElement.setAttribute('disabled', '');
  hoursElement.setAttribute('disabled', '');
  reserveElement.setAttribute('disabled', '');
  reserveStatusElement.textContent = 'Reserva en proceso';
});

formElement.addEventListener('change', e => {
  if (e.target === dinnersElement) {
    dinners = dinnersElement[dinnersElement.selectedIndex].value;
    if (Number(e.target.value) === 0) {
      shiftElement.setAttribute('disabled', '');
      hoursElement.setAttribute('disabled', '');
      reserveElement.setAttribute('disabled', '');
    } else setShiftSelect(dayOfTheWeek);
  } else if (e.target === shiftElement) {
    if (Number(e.target.value) === 0) {
      hoursElement.setAttribute('disabled', '');
      reserveElement.setAttribute('disabled', '');
    } else setHoursSelect(e.target.value);
  } else {
    reserveHours = hoursElement[hoursElement.selectedIndex].value;
    reserveElement.removeAttribute('disabled');
  }

  if (reserveDay && dinners && reserveHours) {
    reserveStatusElement.textContent = `Has seleccionado una reserva para ${dinners} persona(s) el día ${reserveDay} a las ${reserveHours}`;
  }
});

formElement.addEventListener('submit', e => {
  e.preventDefault();
});
