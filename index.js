export default class EventEmitter {
    constructor() {
        this._callbacks = {};
    }

    on(name, cb, ctx) {
        if (!name || !cb) return this;
        if (!this._callbacks) this._callbacks = {};
        if (!this._callbacks[name]) this._callbacks[name] = [];
        if (ctx) cb = cb.bind(ctx);
        this._callbacks[name].push(cb);
        return this;
    }
    once(name, cb, ctx) {
        cb.__once = true;
        return this.on(name, cb, ctx);
    }

    emit(name, ...args) {
        if (!name || !this._callbacks || !this._callbacks[name]) return this;
        this._callbacks[name].forEach(cb => {
            if (cb.__once) this.off(name, cb);
            cb.apply(null, args);
        });
        return this;
    }
    fire(...args) { // alias for emit
        return this.emit(...args);
    }

    off(name, cb) {
        if (!name) return this;
        if (cb) {
            let index = this._callbacks[name].indexOf(cb);
            if (~index) this._callbacks[name].splice(index, 1);
        } else {
            this._callbacks[name].length = 0;
        }
        return this;
    }

    static mixin(target) {
        Object.getOwnPropertyNames(EventEmitter.prototype).forEach((k) => {
            if (k === 'constructor') return;
            target.prototype[k] = EventEmitter.prototype[k];
        });
    }
}