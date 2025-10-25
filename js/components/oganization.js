export function initOrganizations() {
  const columns = document.querySelectorAll('.clients-column');
  const ITEMS_PER_LOAD = 5;
  const DEFAULT_VISIBLE = 8;

  columns.forEach((column) => {
    const seeMoreBtn = column.querySelector('.see-more');
    const seeLessBtn = column.querySelector('.see-less');
    const allCards = Array.from(column.querySelectorAll('.client-card'));
    let visibleCount = Math.min(DEFAULT_VISIBLE, allCards.length);

    allCards.forEach((card, i) => {
      if (i >= visibleCount) card.classList.add('hidden');
    });

    if (visibleCount < allCards.length) seeMoreBtn.style.display = 'inline-flex';

    seeMoreBtn.addEventListener('click', () => {
      const hiddenCards = allCards.filter(card => card.classList.contains('hidden'));
      if (hiddenCards.length === 0) return;

      const nextBatch = hiddenCards.slice(0, ITEMS_PER_LOAD);
      nextBatch.forEach((card, i) => {
        card.classList.remove('hidden');
        card.classList.add('show-animation');
        setTimeout(() => card.classList.add('visible'), i * 50);
      });

      visibleCount += nextBatch.length;

      if (visibleCount >= allCards.length) seeMoreBtn.style.display = 'none';
      seeLessBtn.style.display = 'inline-flex';
    });

    seeLessBtn.addEventListener('click', () => {
      const extraCards = allCards.slice(DEFAULT_VISIBLE);
      extraCards.forEach((card, i) => {
        card.classList.remove('visible');
        setTimeout(() => {
          card.classList.add('hidden');
          card.classList.remove('show-animation');
        }, 300 + i*30);
      });

      visibleCount = Math.min(DEFAULT_VISIBLE, allCards.length);
      seeLessBtn.style.display = 'none';
      if (visibleCount < allCards.length) seeMoreBtn.style.display = 'inline-flex';
    });
  });
}
