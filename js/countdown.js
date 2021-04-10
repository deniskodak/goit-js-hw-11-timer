class CountdownTimer {
    constructor({ selector, targetDate }) {
        this.elementRef = document.querySelector(`${selector}`);
        this.time = targetDate.getTime() - Date.now();
        
        this.daysRef = this.elementRef.querySelector('[data-value="days"]');
        this.hoursRef = this.elementRef.querySelector('[data-value="hours"]');
        this.minsRef = this.elementRef.querySelector('[data-value="mins"]');
        this.secsRef = this.elementRef.querySelector('[data-value="secs"]');

        this.start();
    }
    // добавление нулей 
    addPadStart(result) {
        return result.toString().padStart(2, '0');
    }
    
    days() {
        const days = Math.floor(this.time / (1000 * 60 * 60 * 24));
        return this.addPadStart(days);
    }

    hours() {
        const hours = Math.floor((this.time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        return this.addPadStart(hours);
    }

    mins() {
        const mins = Math.floor((this.time % (1000 * 60 * 60)) / (1000 * 60));
        return this.addPadStart(mins);
    }

    secs() {
        const secs = Math.floor((this.time % (1000 * 60)) / 1000);
        return this.addPadStart(secs);
    }
    
    // метод замены содержания спана и перевод существительных из множественного числа в единственное число
    changeTextContent(nameElement, callback) {
        nameElement.innerHTML = callback;
   
        let siblingContentArray = nameElement.nextElementSibling.textContent.split('');

        if (+callback === 1) {
            if (siblingContentArray[siblingContentArray.length - 1] === 's') {
                siblingContentArray.pop();
                return nameElement.nextElementSibling.textContent = siblingContentArray.join('');
            }
        }
        else {

            if (siblingContentArray[siblingContentArray.length - 1] !== 's') { 
               siblingContentArray.push('s');
                return nameElement.nextElementSibling.textContent = siblingContentArray.join('');
            }
        }
    }
    // метод обращения к дому
    render() {
        this.changeTextContent(this.daysRef, this.days());
        this.changeTextContent(this.hoursRef, this.hours());
        this.changeTextContent(this.minsRef, this.mins());
        this.changeTextContent(this.secsRef, this.secs());
    }
    // метод запуска таймера
    start() {
        const interval = setInterval(() => {
            this.time -= 1000;

            if (this.time <= 0) {
                this.time = 0;
                clearInterval(interval);
            }

            this.render();

        }, 1000);
    }
    
}

new CountdownTimer({
  selector: '#timer-1',
  targetDate: new Date('Apr 12, 2021'),
});