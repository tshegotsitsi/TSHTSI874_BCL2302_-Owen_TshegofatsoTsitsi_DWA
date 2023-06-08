import { books, authors, genres, BOOKS_PER_PAGE } from './data.js';

const App = {
  page: 1,
  matches: books,

  init() {
    this.renderInitialItems();
    this.renderGenres();
    this.renderAuthors();
    this.setTheme();
    this.setListButton();
    this.setupEventListeners();
  },

  renderInitialItems() {
    const starting = document.createDocumentFragment();

    for (const { author, id, image, title } of this.matches.slice(0, BOOKS_PER_PAGE)) {
      const element = this.createPreviewElement({ author, id, image, title });
      starting.appendChild(element);
    }

    document.querySelector('[data-list-items]').appendChild(starting);
  },

  createPreviewElement({ author, id, image, title }) {
    const element = document.createElement('button');
    element.classList = 'preview';
    element.setAttribute('data-preview', id);

    element.innerHTML = `
      <img
        class="preview__image"
        src="${image}"
      />
      
      <div class="preview__info">
        <h3 class="preview__title">${title}</h3>
        <div class="preview__author">${authors[author]}</div>
      </div>
    `;

    return element;
  },

  renderGenres() {
    const genreHtml = document.createDocumentFragment();
    const firstGenreElement = this.createGenreElement('any', 'All Genres');
    genreHtml.appendChild(firstGenreElement);

    for (const [id, name] of Object.entries(genres)) {
      const element = this.createGenreElement(id, name);
      genreHtml.appendChild(element);
    }

    document.querySelector('[data-search-genres]').appendChild(genreHtml);
  },

  createGenreElement(id, name) {
    const element = document.createElement('option');
    element.value = id;
    element.innerText = name;
    return element;
  },

  renderAuthors() {
    const authorsHtml = document.createDocumentFragment();
    const firstAuthorElement = this.createAuthorElement('any', 'All Authors');
    authorsHtml.appendChild(firstAuthorElement);

    for (const [id, name] of Object.entries(authors)) {
      const element = this.createAuthorElement(id, name);
      authorsHtml.appendChild(element);
    }

    document.querySelector('[data-search-authors]').appendChild(authorsHtml);
  },

  createAuthorElement(id, name) {
    const element = document.createElement('option');
    element.value = id;
    element.innerText = name;
    return element;
  },

  setTheme() {
    const settingsThemeElement = document.querySelector('[data-settings-theme]');
    const prefersDarkTheme = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (prefersDarkTheme) {
      settingsThemeElement.value = 'night';
      this.updateColorVariables('255, 255, 255', '10, 10, 20');
    } else {
      settingsThemeElement.value = 'day';
      this.updateColorVariables('10, 10, 20', '255, 255, 255');
    }
  },

  updateColorVariables(darkValue, lightValue) {
    document.documentElement.style.setProperty('--color-dark', darkValue);
    document.documentElement.style.setProperty('--color-light', lightValue);
  },

  setListButton() {
    const listButtonElement = document.querySelector('[data-list-button]');
    const remainingCount = Math.max(this.matches.length - (this.page * BOOKS_PER_PAGE), 0);
    listButtonElement.innerText = `Show more (${remainingCount})`;
    listButtonElement.disabled = remainingCount <= 0;
  },

  setupEventListeners() {
    document.querySelector('[data-search-cancel]').addEventListener('click', () => {
      document.querySelector('[data-search-overlay]').open = false;
    });

    document.querySelector('[data-settings-cancel]').addEventListener('click', () => {
      document.querySelector('[data-settings-overlay]').open = false;
    });

    document.querySelector('[data-header-search]').addEventListener('click', () => {
      document.querySelector('[data-search-overlay]').open = true;
      document.querySelector('[data-search-title]').focus();
    });

    document.querySelector('[data-header-settings]').addEventListener('click', () => {
      document.querySelector('[data-settings-overlay]').open = true;
    });

    document.querySelector('[data-list-close]').addEventListener('click', () => {
      document.querySelector('[data-list-active]').open = false;
    });

    document.querySelector('[data-settings-form]').addEventListener('submit', (event) => {
      event.preventDefault();
      const formData = new FormData(event.target);
      const { theme } = Object.fromEntries(formData);

      if (theme === 'night') {
        this.updateColorVariables('255, 255, 255', '10, 10, 20');
      } else {
        this.updateColorVariables('10, 10, 20', '255, 255, 255');
      }

      document.querySelector('[data-settings-overlay]').open = false;
    });

    document.querySelector('[data-search-form]').addEventListener('submit', (event) => {
      event.preventDefault();
      this.performSearch();
    });

    document.querySelector('[data-list-button]').addEventListener('click', () => {
      this.loadMoreItems();
    });

    document.querySelector('[data-list-items]').addEventListener('click', (event) => {
      this.handleItemClick(event);
    });
  },

  performSearch() {
    const formData = new FormData(document.querySelector('[data-search-form]'));
    const filters = Object.fromEntries(formData);
    const result = [];

    for (const book of books) {
      let genreMatch = filters.genre === 'any';

      for (const singleGenre of book.genres) {
        if (genreMatch) break;
        if (singleGenre === filters.genre) {
          genreMatch = true;
        }
      }

      if (
        (filters.title.trim() === '' || book.title.toLowerCase().includes(filters.title.toLowerCase())) &&
        (filters.author === 'any' || book.author === filters.author) &&
        genreMatch
      ) {
        result.push(book);
      }
    }

    this.page = 1;
    this.matches = result;

    const listMessageElement = document.querySelector('[data-list-message]');
    if (result.length < 1) {
      listMessageElement.classList.add('list__message_show');
    } else {
      listMessageElement.classList.remove('list__message_show');
    }

    document.querySelector('[data-list-items]').innerHTML = '';
    const newItems = document.createDocumentFragment();

    for (const { author, id, image, title } of result.slice(0, BOOKS_PER_PAGE)) {
      const element = this.createPreviewElement({ author, id, image, title });
      newItems.appendChild(element);
    }

    document.querySelector('[data-list-items]').appendChild(newItems);
    this.setListButton();

    window.scrollTo({ top: 0, behavior: 'smooth' });
    document.querySelector('[data-search-overlay]').open = false;
  },

  loadMoreItems() {
    const fragment = document.createDocumentFragment();

    for (const { author, id, image, title } of this.matches.slice(
      this.page * BOOKS_PER_PAGE,
      (this.page + 1) * BOOKS_PER_PAGE
    )) {
      const element = this.createPreviewElement({ author, id, image, title });
      fragment.appendChild(element);
    }

    document.querySelector('[data-list-items]').appendChild(fragment);
    this.page += 1;
    this.setListButton();
  },

  handleItemClick(event) {
    const pathArray = Array.from(event.path || event.composedPath());
    let active = null;

    for (const node of pathArray) {
      if (active) break;

      if (node?.dataset?.preview) {
        let result = null;

        for (const singleBook of books) {
          if (result) break;
          if (singleBook.id === node?.dataset?.preview) result = singleBook;
        }

        active = result;
      }
    }

    if (active) {
      const listActiveElement = document.querySelector('[data-list-active]');
      listActiveElement.open = true;
      listActiveElement.querySelector('[data-list-blur]').src = active.image;
      listActiveElement.querySelector('[data-list-image]').src = active.image;
      listActiveElement.querySelector('[data-list-title]').innerText = active.title;
      listActiveElement.querySelector('[data-list-subtitle]').innerText = `${authors[active.author]} (${new Date(
        active.published
      ).getFullYear()})`;
      listActiveElement.querySelector('[data-list-description]').innerText = active.description;
    }
  },

  createPreviewElement({ author, id, image, title }) {
    const element = document.createElement('button');
    element.classList = 'preview';
    element.setAttribute('data-preview', id);

    element.innerHTML = `
        <img
            class="preview__image"
            src="${image}"
        />
        
        <div class="preview__info">
            <h3 class="preview__title">${title}</h3>
            <div class="preview__author">${authors[author]}</div>
        </div>
    `;

    return element;
  },

  updateColorVariables(darkColor, lightColor) {
    document.documentElement.style.setProperty('--color-dark', darkColor);
    document.documentElement.style.setProperty('--color-light', lightColor);
  },
};

BookConnectApp.init();
