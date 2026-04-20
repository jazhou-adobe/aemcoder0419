const INITIAL_VISIBLE = 3;

function parseDateText(text) {
  const trimmed = text.trim();
  // Range: "Mon 13 Apr - Fri 17 Apr"
  const rangeMatch = trimmed.match(/^(\w+)\s+(\d+)\s+(\w+)\s*-\s*(\w+)\s+(\d+)\s+(\w+)$/);
  if (rangeMatch) {
    return {
      range: true,
      startDay: rangeMatch[1],
      startDate: rangeMatch[2],
      startMonth: rangeMatch[3].toUpperCase(),
      endDay: rangeMatch[4],
      endDate: rangeMatch[5],
      endMonth: rangeMatch[6].toUpperCase(),
    };
  }
  // Single: "Mon 20 Apr"
  const singleMatch = trimmed.match(/^(\w+)\s+(\d+)\s+(\w+)$/);
  if (singleMatch) {
    return {
      range: false,
      day: singleMatch[1],
      date: singleMatch[2],
      month: singleMatch[3].toUpperCase(),
    };
  }
  return null;
}

function buildDateBlock(dateDiv) {
  const text = dateDiv.textContent.trim();
  const parsed = parseDateText(text);
  if (!parsed) return;

  dateDiv.textContent = '';

  if (parsed.range) {
    dateDiv.classList.add('cards-events-date-range');
    dateDiv.innerHTML = `
      <div class="cards-events-date-days"><span>${parsed.startDay}</span><span>${parsed.endDay}</span></div>
      <div class="cards-events-date-nums">${parsed.startDate}-${parsed.endDate}</div>
      <div class="cards-events-date-months"><span>${parsed.startMonth}</span><span>${parsed.endMonth}</span></div>
    `;
  } else {
    dateDiv.innerHTML = `
      <div class="cards-events-date-days"><span>${parsed.day}</span></div>
      <div class="cards-events-date-nums">${parsed.date}</div>
      <div class="cards-events-date-months"><span>${parsed.month}</span></div>
    `;
  }
}

export default function decorate(block) {
  const ul = document.createElement('ul');
  const rows = [...block.children];
  block.textContent = '';

  rows.forEach((row, index) => {
    const li = document.createElement('li');
    while (row.firstElementChild) li.append(row.firstElementChild);
    const children = [...li.children];
    if (children.length >= 2) {
      children[0].className = 'cards-events-card-date';
      children[1].className = 'cards-events-card-body';
      buildDateBlock(children[0]);
    } else if (children.length === 1) {
      children[0].className = 'cards-events-card-body';
    }

    // Hide items beyond the initial visible count
    if (index >= INITIAL_VISIBLE) {
      li.classList.add('cards-events-hidden');
    }

    ul.append(li);
  });

  block.append(ul);

  // Add "Show more" button if there are hidden items
  if (rows.length > INITIAL_VISIBLE) {
    const showMore = document.createElement('button');
    showMore.type = 'button';
    showMore.className = 'cards-events-show-more';
    showMore.innerHTML = '<span>Show more</span>';
    showMore.addEventListener('click', () => {
      ul.querySelectorAll('.cards-events-hidden').forEach((li) => {
        li.classList.remove('cards-events-hidden');
      });
      showMore.remove();
    });
    block.append(showMore);
  }
}
