class A{
    constructor(el){
        this.el = el;
        this._currentAnimation = Promise.resolve();
    }

    animate(prop, val, duration, easing, done){
        this._currentAnimation = this._currentAnimation.then(() => {
            const oldTransition = this.el.style.transition;
            this.el.style[prop] = window.getComputedStyle(this.el).getPropertyValue(prop);

            return new Promise((res,rej) => {
                this.el.addEventListener("transitionend", (event) => {
                    this.el.style.transition = oldTransition;
                    done(this.el);
                    res(this);
                }, {once:true});
                this.el.style.transition = `${prop} ${duration} ${easing}`;
                setTimeout(() => this.el.style[prop] = val,0);
            });
        });
        return this;
    };
}

// just to make syntax nicer
export function Animate(el){ return new A(el); }
