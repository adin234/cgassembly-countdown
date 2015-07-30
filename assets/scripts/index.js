function addClass (el, className) {
    if (el.classList) {
        el.classList.add(className);
    } else {
        el.className += ' ' + className;
    }
}

function toggleClass (el, className) {
    if (el.classList) {
        el.classList.toggle(className);
    } else {
        var classes = el.className.split(' '),
            existingIndex = classes.indexOf(className);

        if (existingIndex >= 0) {
            classes.splice(existingIndex, 1);
        }
        else {
            classes.push(className);
        }

        el.className = classes.join(' ');
    }
}

function showCount (count) {
    var el = document.getElementsByClassName('character_'+count);

    Array.prototype.forEach.call(el, function (item) {
        toggleClass(item, 'hide'); 
    });
}

function startCountDown() {
    var count = 10,
        counter = setInterval(timer, 1000);

    function timer() {
        if (!count) {
            clearInterval(counter);
            return;
        }

        goAnimate(count--);
    }
}

function goAnimate (count) {
    var abbv = document.getElementById('character_'+count+'_data');

    abbv.style.opacity = 1;
    
    setTimeout(function () {
        abbv.style.top = '-100';
        abbv.style.opacity = 0;
        showCount(count);
    }, 1000);
}

var temp = moment().add('seconds', 16);

function generateEndTime () {
    return moment(temp.valueOf());
    
    /*return moment().set({
        hours: 18,
        minutes: 00,
        seconds: 00
    });*/

}

function countDownTimer () {
    var diff = Math.ceil(generateEndTime()
            .diff(moment())/1000);
    if (diff < 11 && diff > 0) {
        goAnimate(diff);
        if (diff == 10) {
            startSlideShow();
        }
    }

    if (diff == 0) {
        endAnimation();
    }

    if (diff < 0) {
        clearInterval(countDownInterval);
        return;
    }
    
    document.getElementById('timer').innerHTML = generateEndTime()
        .subtract(moment())
        .format('HH:mm:ss');
}

function endAnimation () {
    var el = document.getElementById('header'),
        body = document.getElementsByTagName('body')[0];

    el.style['margin-top'] = (body.offsetHeight - el.offsetHeight)/2;

    addClass(el, 'large');
}

function startSlideShow () {
    var images = [],
        body = document.getElementsByTagName('body')[0],
        i;

    for (i=7; i>0; i--) {
        (function (i) {
            setTimeout(function() {
                var elem = document.createElement('img'),
                    degrees = (Math.floor(Math.random() * 180) + 1 );
             
                degrees *= Math.floor(Math.random()*2) == 1 ? 1 : -1; 

                toggleClass(elem, 'slideshow');
                
                elem.src='/assets/images/'+i+'.jpg';
                elem.style.position = 'absolute';
                elem.style.top = '-1000px';
                elem.style.left = '-1000px';
                elem.style.webkitTransition = 'all 1s';
                elem.style.webkitTransform = 'rotate('+ degrees +'deg)';
                body.appendChild(elem);
                
                (function (elem) {
                    setTimeout(function() {
                        elem.style.left = (Math.floor((Math.random() * (body.offsetWidth - elem.offsetWidth)))+1)+'px';
                        elem.style.top = (Math.floor((Math.random() * (body.offsetHeight - elem.offsetHeight)))+1)+'px';
                    }, 500);
                }(elem));    
            }, (1200*(7-i)));
        }(i));
    }
}


var countDownInterval = setInterval(countDownTimer, 1000);

Array.prototype.forEach.call(document.getElementsByClassName('abbv'), function (item) {
    var body = document.getElementsByTagName('body')[0],
        width, height;
    item.style.display = 'block';
    item.style.left = '-1000px';
    item.style.top = '-1000px';

    width = item.offsetWidth;
    height = item.offsetHeight;

    item.style.display = '';
    item.style.left = (body.offsetWidth - width)/2;
    item.style.top = (body.offsetHeight - height)/2;

    console.log(width, height);
    
});
