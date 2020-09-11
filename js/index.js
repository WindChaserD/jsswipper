window.addEventListener('load',function(){
    //1.鼠标经过轮播图，左右按钮显示或消失
    var arrow_l = document.querySelector('.arrow-l');
    var arrow_r = document.querySelector('.arrow-r');
    var focus = document.querySelector('.focus');
    var focusWidth = focus.offsetWidth;
    
    focus.addEventListener('mouseenter',function(){
        arrow_l.style.display = 'block';
        arrow_r.style.display = 'block';

        //鼠标滑入停止定时器
        clearInterval(timer);
        timer = null;//清除定时器
    })
    focus.addEventListener('mouseleave',function(){
        arrow_l.style.display = 'none';
        arrow_r.style.display = 'none';

        //鼠标移出触发定时器
        timer = setInterval(() => {
            // 手动调用点击事件
           arrow_r.click(); 
        }, 2000);
    })

    //2.动态生成ol中的li数量，保持图片数目和圆圈数目的一致
    var ul = focus.querySelector('ul');
    var ol = document.querySelector('.circle');

    for(var i = 0;i < ul.children.length; i++){
        var li = document.createElement('li');
        li.setAttribute('index',i);
        ol.appendChild(li);
        li.addEventListener('click',function(){
            for(var i = 0;i < ol.children.length;i++){
                ol.children[i].className = '';
            }
            this.className = 'current';
            //3.点击小圆圈移动ul，展示相应的li
            // ul的移动距离，等于小圆圈的索引号*图片的宽度，注意是负值
            var index = this.getAttribute('index');
            // 当点击了li，就需要把当前li的索引号赋值给num
            num = circle = index;
            animate(ul, -index * focusWidth);
        })
    }
    //设置第一个ol的li赋给current类
    ol.children[0].className = 'current';

    //4.克隆第一张图片，放到ul的最后面
    var first = ul.children[0].cloneNode(true);
    ul.appendChild(first);
    //5.点击右侧按钮，图片滚动一张
    var num = 0;
    //控制小圆圈的状态变化
    var circle = 0;
    //节流阀flag
    var flag = true;
    //左键点击图片右移
    arrow_l.addEventListener('click',function(){
        if(flag){
            flag = false;
            // 如果走到了第一张图片，此时，ul要快速复原left改为最后一张图的值
            if(num == 0){
                num = ul.children.length - 1;
                ul.style.left = -num * focusWidth + 'px';//必须加上px
            }
            num--;
            animate(ul, -num * focusWidth,function(){    
                flag = true;
            })
            //6.点击右侧按钮，小圆圈状态跟随一起变化，可以在声明一个变量控制小圆圈的播放
            circle--;
            if(circle < 0)
                circle = ol.children.length - 1;
            circleChange();
        }
    })
    //右键点击图片左移
    arrow_r.addEventListener('click',function(){
        if(flag){
            flag = false;
            // 如果走到了最后一张图片，此时，ul要快速复原left改为0值
            if(num == ul.children.length - 1){
                ul.style.left = 0;
                num = 0;
            }
            num++;
            animate(ul, -num * focusWidth,function(){
                flag = true;
            })
            //6.点击右侧按钮，小圆圈状态跟随一起变化，可以在声明一个变量控制小圆圈的播放
            circle++;
            if(circle == ol.children.length)
                circle = 0;
            circleChange();
        }
    })
    function circleChange(){
        for(var i = 0; i < ol.children.length; i++){
            ol.children[i].classList = '';
        }
        ol.children[circle].className = 'current';
    }
    //7.自动播放轮播图
    var timer = setInterval(() => {
        // 手动调用点击事件
       arrow_r.click(); 
    }, 2000);
})