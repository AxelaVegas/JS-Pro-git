class Burger{
    constructor(size, filling, add){
        this.size = new BurgerParameter(this._getFormElement(size));
        this.filling = new BurgerParameter(this._getFormElement(filling));

        //ни как не пойму, почему в _getAllForms('add') не получается отдать параметр add, чтобы заработало
        //пришлось отдавать строку 'add', в чем может быть проблема?????

        this.add = this._getAllForms('add'); //massiv form "space"
        this._RenderResult(size,filling,add);
    }

    _getFormElement(name){
        return document.querySelector(`input[name="${name}"]:checked`);
    }

    _getAllForms(name){
        let param = [];
        let forms = [...document.querySelectorAll(`input[name="${name}"]:checked`)];
        forms.forEach(element => {
            let paramEl = new BurgerParameter(element);
            param.push(paramEl);
        });
        return param;
    }

    _sumPrice(){
        let sum = 0;
        for(let price of this.add){
            sum += price.price;
        }
        sum += this.filling.price + this.size.price;
        return sum;
    }

    _sumCalory(){
        let sum = 0;
        for(let calory of this.add){
            sum += calory.calory;
        }
        sum += this.filling.calory + this.size.calory;
        return sum;
    }

    _RenderResult(){
        let divResultPrice = document.querySelector('.div-result-price');
        let divResultCalory = document.querySelector('.div-result-calory');
        divResultPrice.innerHTML = this._sumPrice();
        divResultCalory.innerHTML = this._sumCalory();
    }
}

class BurgerParameter{
    constructor(formElement){
        this.name = formElement.value;
        this.price = +formElement.dataset['price'];
        this.calory = +formElement.dataset['calory'];
    }
}