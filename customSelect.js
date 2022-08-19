export class CustomSelect {
  #id
  #divHTML
  #currentSelectedOption

  constructor(id, options) {
    this.#id = id;
    this.#divHTML = document.createElement('div');
    this.#createSelectDropdown(options);
  }

  get selectedValue() {
    return this.#currentSelectedOption;
  }

  #createSelectDropdown(options) {
    this.#divHTML.classList.add('select-dropdown');
    this.#divHTML.classList.add(`select-dropdown--${this.#id}`);

    // create button
    const buttonHTML = document.createElement('button');
    buttonHTML.classList.add('select-dropdown__button');
    buttonHTML.classList.add(`select-dropdown__button--${this.#id}`);
    const spanHTML = document.createElement('span'); {
      spanHTML.classList.add('select-dropdown__text');
      spanHTML.classList.add(`select-dropdown__text--${this.#id}`);
      spanHTML.textContent = 'Выберите элемент';
      buttonHTML.append(spanHTML);
    }

    // create list
    const ulHTML = document.createElement('ul');
    ulHTML.classList.add('select-dropdown__list');
    ulHTML.classList.add(`select-dropdown__list--${this.#id}`); {
      options.forEach(({ value, text }) => {
        const liHTML = document.createElement('li');
        liHTML.className = 'select-dropdown__list-item';
        liHTML.dataset.value = value;
        liHTML.textContent = text;
        ulHTML.append(liHTML);
      })
    }

    // add elements to div
    this.#divHTML.append(buttonHTML);
    this.#divHTML.append(ulHTML);

    // add event handlers
    buttonHTML.addEventListener('click', (event) => {
      ulHTML.classList.toggle('active');
    });
    ulHTML.addEventListener('click', (event) => {
      const target = event.target;

      if (target.tagName !== 'LI')
        return;

      this.#currentSelectedOption = options.find(option =>
        option.value == target.dataset.value);

      if (!this.#currentSelectedOption)
        return;

      spanHTML.textContent = this.#currentSelectedOption.text;
      ulHTML.querySelectorAll('.select-dropdown__list-item').forEach(liElem =>
        liElem.classList.remove('selected'));
      target.classList.add('selected');
      ulHTML.classList.toggle('active');
    });
  }

  render(container) {
    container.append(this.#divHTML);
  }
}