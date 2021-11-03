class Tab {
    constructor(id) {
        //获取
        this.main = document.querySelector(id);  //拿到最大盒子
        this.add = this.main.querySelector('.tabadd');
        this.ul = this.main.querySelector('.firstnav ul');
        this.fsection = this.main.querySelector('.tabscon');
        this.init();// 想要页面一刷新，就完成绑定模块
    }
    init() {
        this.updateNode();//获取当前有几个li和section
        for (let i = 0; i < this.lis.length; i++) {
            this.lis[i].index = i;
            this.lis[i].onclick = this.toggleTab.bind(this.lis[i], this);
            this.remove[i].onclick = this.removeTab.bind(this.remove[i], this);
            this.spans[i].ondblclick = this.editTab;
            this.sections[i].ondblclick = this.editTab;
        }
        this.add.onclick = this.addTab.bind(this.add, this);;
    }
    //用于更新li和section
    updateNode() {
        this.lis = this.main.querySelectorAll('li');
        this.sections = this.main.querySelectorAll('section');
        this.remove = this.main.querySelectorAll('.icon-x');
        this.spans = this.main.querySelectorAll('.firstnav li span:first-child');
    }
    // 1. 切换功能
    toggleTab(that) {
        that.clearClass();
        this.className = 'liactive';
        that.sections[this.index].className = 'conactive';
    }
    // 排他操作，清除所有li的所有类名
    clearClass() {
        for (let i = 0; i < this.lis.length; i++) {
            this.lis[i].className = '';
            this.sections[i].className = '';
        }
    }
    // 2. 添加功能
    addTab(that) {
        that.clearClass();
        // 创建新元素
        let li = '<li class="liactive"><span>双击修改</span><span class="iconfont icon-x">x</span></li>';
        let section = '<section class="conactive">双击输入</section>';
        // 追加进父元素
        that.ul.insertAdjacentHTML('beforeend', li);
        that.fsection.insertAdjacentHTML('beforeend', section);
        that.init();
    }
    // 3. 删除
    removeTab(that, e) {
        //阻止冒泡，因为点了x，会冒泡给父亲li也会相当于被点击，会触发toggle
        e.stopPropagation();
        let index = this.parentNode.index;
        //console.log(index);
        that.lis[index].remove();
        that.sections[index].remove();
        that.init();
        // 如果删掉的不是选定状态的，那就直接返回，不改选定状态了
        if (document.querySelector('.liactive')) return;
        if (that.lis[index]) that.lis[index].click();//选中前一个
        else that.lis[--index] && that.lis[index].click();
    }
    // 4. 编辑
    editTab() {
        // 禁止双击选中
        let str = this.innerHTML;
        window.getSelection ? window.getSelection().removeAllRanges() : document.selection.empty();
        this.innerHTML = '<input type="text">';
        let input = this.children[0];//取到文本框
        input.value = str;
        input.select(); //文字直接处于选中状态
        input.onblur = function () {
            this.parentNode.innerHTML = this.value;
        }
        input.onkeyup = function (e) {
            if (e.keyCode == 13) { // 回车
                this.blur(); //手动调用失去焦点
            }
        }
    }
}
new Tab('#tab');