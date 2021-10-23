function animate(obj, target, callback) {
    clearInterval(obj.timer,);   // 修复BUG
    // 注意这里的改进，不同元素指定了不同的timer
    obj.timer = setInterval(function () {
        // 缓动情况，改步长
        let step = (target - obj.offsetLeft) / 10;
        // 考虑到后退情况
        step = step > 0 ? Math.ceil(step) : Math.floor(step);
        obj.style.left = obj.offsetLeft + step + 'px';
        if (obj.offsetLeft == target) {
            //停止定时器
            clearInterval(obj.timer);
            if (callback) callback();
        }
    }, 15)
}