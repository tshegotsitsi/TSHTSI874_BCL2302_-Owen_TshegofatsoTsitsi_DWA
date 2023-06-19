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
          display: flex;
          align-items: center;
          padding: 10px;
          border: none;
          background-color: var(--color-light);
          border-bottom: 1px solid var(--color-dark);
        }

        .preview__image {
          width: 60px;
          height: 80px;
          object-fit: cover;
          margin-right: 10px;
        }

        .preview__info {
          flex: 1;
        }

        .preview__title {
          font-weight: bold;
          margin-bottom: 4px;
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