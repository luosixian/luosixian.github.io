window.addEventListener('load', function () {
    // 1. 获取 鼠标经过显示隐藏
    let prev = document.querySelector('.prev');
    let next = document.querySelector('.next');
    let tbpromo = document.querySelector('.tb-promo');
    const tbpromoWidht = tbpromo.offsetWidth;
    tbpromo.addEventListener('mouseenter', function () {
        prev.style.display = 'block';
        next.style.display = 'block';
        clearInterval(timer);
        timer = null;     // 清除定时器比较好
    })
    tbpromo.addEventListener('mouseleave', function () {
        prev.style.display = 'none';
        next.style.display = 'none';
        timer = setInterval(function () {
            // 6. 自动播放
            next.click();
        }, 1500);
    })
    // 2. 动态生成小圆圈(自定义属性) 2.1排他思想 - 小圆圈 2.2小圆圈带动图片
    let ul = tbpromo.querySelector('ul');
    let ol = tbpromo.querySelector('.promo-nav');
    for (let i = 0; i < ul.children.length; i++) {
        let li = this.document.createElement('li');
        li.setAttribute('index', i);  //为了切换图片
        ol.appendChild(li);
        li.addEventListener('click', function () {
            for (let i = 0; i < ol.children.length; i++) {
                ol.children[i].className = '';
            }
            this.className = 'selected';
            //得知道为什么是负值
            let index = this.getAttribute('index');
            num = circle = index;
            animate(ul, -index * tbpromoWidht);
        })
    }
    ol.children[0].className = 'selected';
    // 3. 右按钮带图片右滚 - 高阶技巧：无缝滚动
    // 4. 按钮带动小圆点变化
    let circle = 0;  // 负责管小圆点
    let first = ul.children[0].cloneNode(true);
    ul.appendChild(first);
    let num = 0; // 负责管图片
    next.addEventListener('click', function () {
        if (num == ul.children.length - 1) {
            ul.style.left = 0;
            num = 0;
        }
        num++;
        animate(ul, -num * tbpromoWidht);
        circle++;
        circle = circle == ul.children.length - 1 ? 0 : circle;
        circleChange()
    });
    // 5. 左按钮带图片左滚 依然是无缝滚动
    prev.addEventListener('click', function () {
        if (num == 0) {
            num = ul.children.length - 1;
            ul.style.left = -num * tbpromoWidht + 'px';  // px依然容易忘
        }
        num--;
        animate(ul, -num * tbpromoWidht);
        circle--;
        circle = circle == -1 ? ol.children.length - 1 : circle;
        circleChange();
    });
    function circleChange() {
        for (let i = 0; i < ol.children.length; i++) {
            ol.children[i].className = '';
        }
        ol.children[circle].className = 'selected';
    }
    let timer = setInterval(function () {
        // 6. 自动播放
        next.click();
    }, 1500);
})