const aboutButton = document.querySelector('.about__button');
const aboutText = document.querySelector('.about p');
const accordionHeaders = document.querySelectorAll('.accordion__header');
const footer = document.querySelector('.page-footer');

const isAccordionHeader = (evt) => evt.target.classList.contains('accordion__header');
const isAccordionClosed = (evt) => evt.target.classList.contains('accordion__header--closed');
const isAccordionOpened = (evt) => evt.target.classList.contains('accordion__header--opened');

const showAbout = () => {
  aboutText.classList.remove('closed');
  aboutText.classList.add('opened');
  aboutButton.textContent = 'Свернуть';
};

const hideAbout = () => {
  aboutText.classList.remove('opened');
  aboutText.classList.add('closed');
  aboutButton.textContent = 'Подробнее';
};

aboutButton.addEventListener('click', () => {
  if (aboutText.classList.contains('opened')) {
    hideAbout();
    return;
  }
  showAbout();
});

const closeAccordion = (target) => {
  target.classList.add('accordion__header--closed');
  target.classList.remove('accordion__header--opened');
};

const openAccordion = (target) => {
  target.classList.remove('accordion__header--closed');
  target.classList.add('accordion__header--opened');
  accordionHeaders.forEach((header) => {
    if (header !== target) {
      closeAccordion(header);
    }
  });
};

footer.addEventListener('click', (evt) => {
  if (isAccordionHeader(evt)) {
    switch (true) {
      case isAccordionClosed(evt):
        openAccordion(evt.target);
        break;
      case isAccordionOpened(evt):
        closeAccordion(evt.target);
    }
  }
});

aboutText.classList.add('closed');
aboutText.classList.remove('opened');

accordionHeaders.forEach((header) => {
  closeAccordion(header);
});
