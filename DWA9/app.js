// Define a custom element for the book preview
class BookPreview extends HTMLElement {
  constructor() {
    super();
    // Create a shadow DOM for the element
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    // Render the component when it's connected to the document
    this.render();
  }

  static get observedAttributes() {
    // Specify the attributes to observe for changes
    return ["data-book"];
  }

  attributeChangedCallback() {
    // Re-render the component when the observed attribute changes
    this.render();
  }

  render() {
    // Parse the book data from the "data-book" attribute
    const book = JSON.parse(this.getAttribute("data-book"));
    const { author, image, title } = book;

    // Set the content of the shadow DOM
    this.shadowRoot.innerHTML = `
    <style>
    :host {
      border-width: 0;
      width: 100%;
      font-family: Roboto, sans-serif;
      padding: 0.5rem 1rem;
      display: flex;
      align-items: center;
      cursor: pointer;
      text-align: left;
      border-radius: 8px;
      border: 1px solid rgba(var(--color-dark), 0.15);
      background: rgba(var(--color-light), 1);
    }

    .preview__image {
      width: 48px;
      height: 70px;
      object-fit: cover;
      background: grey;
      border-radius: 2px;
      box-shadow: 0px 2px 1px -1px rgba(0, 0, 0, 0.2),
      0px 1px 1px 0px rgba(0, 0, 0, 0.1), 0px 1px 3px 0px rgba(0, 0, 0, 0.1);
    }

    .preview__info {
      padding: 1rem;
    }

    .preview__title {
      margin: 0 0 0.5rem;
      font-weight: bold;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;  
      overflow: hidden;
      color: rgba(var(--color-dark), 0.8);
    }

    .preview__author {
      color: rgba(var(--color-dark), 0.4);
    }
      </style>
      <img class="preview__image" src="${image}" alt="Book Cover">
      <div class="preview__info">
        <h3 class="preview__title">${title}</h3>
        <p class="preview__author">${author}</p>
      </div>
    `;
  }
}

// Define the custom element "book-preview" and associate it with the BookPreview class
customElements.define("book-preview", BookPreview);