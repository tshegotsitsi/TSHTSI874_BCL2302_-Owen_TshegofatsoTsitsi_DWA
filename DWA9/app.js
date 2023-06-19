class BookPreview extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.render();
  }

  static get observedAttributes() {
    return ["data-book"];
  }

  attributeChangedCallback(name) {
    this.render();
  }
  
render() {
    const book = JSON.parse(this.getAttribute("data-book"));
    const { author, image, title } = book;

    this.shadowRoot.innerHTML = `
      <style>
        .preview {
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
          font-size: 18px;
          font-weight: bold;
          margin: 0;
        }

        .preview__author {
          font-size: 14px;
          margin: 5px 0;
        }
      </style>

      <button class="preview">
        <img class="preview__image" src="${image}" />
        <div class="preview__info">
          <h3 class="preview__title">${title}</h3>
          <div class="preview__author">${author}</div>
        </div>
      </button>

      
    `;
  }
}

customElements.define("book-preview", BookPreview);