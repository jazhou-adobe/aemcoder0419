export default function decorate(block) {
  const buttons = document.createElement('div');
  buttons.className = 'button-row-inner';

  const variants = ['primary', 'light', 'dark'];
  let index = 0;

  [...block.children].forEach((row) => {
    const link = row.querySelector('a');
    if (link) {
      link.className = `button-row-btn button-row-${variants[index % variants.length]}`;
      buttons.append(link);
      index += 1;
    }
  });

  block.textContent = '';
  block.append(buttons);
}
