class FrameWork {
    _elemen = null;
    constructor(elemn) {
        this._elemen = elemn ?? null;
    }
    /**
     * untuk menanangin event event
     */
    di = function(event, callback) {
        if (this._elemen != null) {
            this._elemen.addEventListener(event, callback);
        } else {
            console.warn(`Warn: elemen ${this.elem} tidak di temukan`);
        }
    }
    hilangkan = function() {
        this._elemen.style.display = "none";
    }
    tampilkan = function() {
        this._elemen.style.display = "block";
    }
}
/**
 * hanya baru suport 1 elemen
 */
let _ifsu = function(el) {
    const _el = document.querySelector(el);
    return new FrameWork(_el);
}