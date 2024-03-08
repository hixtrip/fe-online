class EventBus {
  events: { [key: string]: any[] };

  constructor() {
      this.events = {};
  }

  emit(type: string, ...args: any[]) {
      const e = this.events[type];
      if (!e) return;
      if (Array.isArray(e)) {
          for (let i = 0; i < e.length; i += 1) {
              e[i].apply(this, args);
          }
      } else {
          const fn = e[0] as any;
          fn.apply(this, args);
      }
  }

  addListener(type: string, fn: any) {
      const e = this.events[type];
      if (!e) {
          this.events[type] = [fn];
      } else {
          e.push(fn);
      }
  }

  removeListener(type: string, fn?: any) {
      if (!fn) {
          delete this.events[type];
      } else if (this.events[type]) {
          this.events[type] = this.events[type].filter(item => item !== fn);
      }
  }
}
export default new EventBus();
