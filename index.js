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
function Animate(el){ return new A(el); }


//USAGE
let el = document.getElementById("test");
let elAnimation = Animate(el);
elAnimation
    .animate("left", "500px", "ease", "5s", () => console.log("DONE1"))
    .animate("top", "500px", "linear", "5s", () => console.log("DONE2"))
    .animate("top", "0px", "ease-in", "5s", () => console.log("DONE3"))
    .animate("transform", "rotate(360deg)", "linear", "3s", () => console.log("DONE4"))
    .animate("left", "0px", "ease-out", "15s", (el) => el.parentNode.removeChild(el) );
