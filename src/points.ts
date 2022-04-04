class Points {
  points: number = 0;
  el: HTMLElement = document.querySelector('[data-component="points"]');

  show() {
    this.el.classList.remove("hidden");
  }

  add(num: number) {
    this.show();
    this.points += num;
    this.render();
  }

  clear() {
    // this.el.classList.add("hidden");
    this.points = 0;
    this.render();
  }

  render() {
    this.el.innerHTML = `${this.points}`;
  }
}

export default new Points();
