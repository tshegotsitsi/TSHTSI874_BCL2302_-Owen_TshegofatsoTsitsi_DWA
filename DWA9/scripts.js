import { BOOKS_PER_PAGE, authors, books, genres } from "./data.js";



let page = 1;
let matches = books;

const starting = document.createDocumentFragment();

function createBookPreview(book) {
  const element = document.createElement("book-preview");
  element.setAttribute("data-book", JSON.stringify(book));
  return element;
}

for (const book of matches.slice(0, BOOKS_PER_PAGE)) {
  const element = createBookPreview(book);
  starting.appendChild(element);
}

document.querySelector("[data-list-items]").appendChild(starting);

function createOptionElements(container, defaultValue, options) {
  const fragment = document.createDocumentFragment();
  const firstElement = document.createElement("option");
  firstElement.value = defaultValue;
  firstElement.innerText = `All ${container}`;
  fragment.appendChild(firstElement);

  for (const [id, name] of Object.entries(options)) {
    const element = document.createElement("option");
    element.value = id;
    element.innerText = name;
    fragment.appendChild(element);
  }

  document.querySelector(`[data-search-${container}]`).appendChild(fragment);
}

createOptionElements("genres", "any", genres);
createOptionElements("authors", "any", authors);

const app = {
  init() {
    document
      .querySelectorAll("[data-search-cancel]")
      .forEach((cancelButton) => {
        cancelButton.addEventListener("click", () => {
          document.querySelector("[data-search-overlay]").open = false;
        });
      });

    document
      .querySelectorAll("[data-settings-cancel]")
      .forEach((cancelButton) => {
        cancelButton.addEventListener("click", () => {
          document.querySelector("[data-settings-overlay]").open = false;
        });
      });

    document
      .querySelector("[data-header-search]")
      .addEventListener("click", () => {
        document.querySelector("[data-search-overlay]").open = true;
        document.querySelector("[data-search-title]").focus();
      });

    document
      .querySelector("[data-header-settings]")
      .addEventListener("click", () => {
        document.querySelector("[data-settings-overlay]").open = true;
      });

    document
      .querySelector("[data-list-close]")
      .addEventListener("click", () => {
        document.querySelector("[data-list-active]").open = false;
      });
  },
};

app.init();

document
  .querySelector("[data-settings-form]")
  .addEventListener("submit", (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const { theme } = Object.fromEntries(formData);

    const themes = {
      day: {
        dark: "10, 10, 20",
        light: "255, 255, 255",
      },
      night: {
        dark: "255, 255, 255",
        light: "10, 10, 20",
      },
    };

    if (theme === "night") {
      document.documentElement.style.setProperty(
        "--color-dark",
        themes.night.dark
      );
      document.documentElement.style.setProperty(
        "--color-light",
        themes.night.light
      );
    } else {
      document.documentElement.style.setProperty(
        "--color-dark",
        themes.day.dark
      );
      document.documentElement.style.setProperty(
        "--color-light",
        themes.day.light
      );
    }

    document.querySelector("[data-settings-overlay]").open = false;
  });

document.querySelector("[data-search-form]").addEventListener("submit", (event) => {
  event.preventDefault();
  const formData = new FormData(event.target);
  const filters = Object.fromEntries(formData);
  const result = [];

  for (const book of books) {
    let genreMatch = filters.genre === "any";

    for (const singleGenre of book.genres) {
      if (genreMatch) break;
      if (singleGenre === filters.genre) {
        genreMatch = true;
      }
    }

    if (
      (filters.title.trim() === "" ||
        book.title.toLowerCase().includes(filters.title.toLowerCase())) &&
      (filters.author === "any" || book.author === filters.author) &&
      genreMatch
    ) {
      result.push(book);
    }
  }

  page = 1;
  matches = result;

  if (result.length < 1) {
    document.querySelector("[data-list-message]").classList.add("list__message_show");
  } else {
    document.querySelector("[data-list-message]").classList.remove("list__message_show");
  }

  document.querySelector("[data-list-items]").innerHTML = "";
  const newItems = document.createDocumentFragment();

  for (const { author, id, image, title } of result.slice(0, BOOKS_PER_PAGE)) {
    const element = createBookPreview({ author, id, image, title });
    newItems.appendChild(element);
  }

  document.querySelector("[data-list-items]").appendChild(newItems);

  document.querySelector("[data-list-button]").disabled =
    matches.length - page * BOOKS_PER_PAGE < 1;

  document.querySelector("[data-list-button]").innerHTML = `
    <span>Show more</span>
    <span class="list__remaining">
      (${matches.length - page * BOOKS_PER_PAGE > 0
        ? matches.length - page * BOOKS_PER_PAGE
        : 0})
    </span>
  `;

  window.scrollTo({ top: 0, behavior: "smooth" });

  document.querySelector("[data-search-overlay]").open = false;
});

document.querySelector("[data-list-button]").addEventListener("click", () => {
  const fragment = document.createDocumentFragment();

  for (const { author, id, image, title } of matches.slice(
    page * BOOKS_PER_PAGE,
    (page + 1) * BOOKS_PER_PAGE
  )) {
    const element = createBookPreview({ author, id, image, title });
    fragment.appendChild(element);
  }

  document.querySelector("[data-list-items]").appendChild(fragment);

  page += 1;

  document.querySelector("[data-list-button]").disabled =
    matches.length - page * BOOKS_PER_PAGE < 1;

  document.querySelector("[data-list-button]").innerHTML = `
    <span>Show more</span>
    <span class="list__remaining">
      (${matches.length - page * BOOKS_PER_PAGE > 0
        ? matches.length - page * BOOKS_PER_PAGE
        : 0})
    </span>
  `;
});

document.querySelector("[data-list-items]").addEventListener("click", (event) => {
  const pathArray = Array.from(event.path || event.composedPath());
  let active = null;

  for (const node of pathArray) {
    if (active) break;

    if (node?.dataset?.book) {
      const bookData = JSON.parse(node.dataset.book);
      active = bookData;
    }
  }

  if (active) {
    document.querySelector("[data-list-active]").open = true;
    document.querySelector("[data-list-blur]").src = active.image;
    document.querySelector("[data-list-image]").src = active.image;
    document.querySelector("[data-list-title]").innerText = active.title;
    document.querySelector("[data-list-subtitle]").innerText = active.author;
    document.querySelector("[data-list-description]").innerText = active.description;
  }
});