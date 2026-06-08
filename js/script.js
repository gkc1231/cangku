// JavaScript 交互逻辑

// 导航栏滚动效果
window.addEventListener('scroll', function() {
    const nav = document.querySelector('nav');
    if (window.scrollY > 50) {
        nav.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
    }
});

// 移动端菜单 toggle
const menuButton = document.querySelector('.md\\:hidden');
const mobileMenu = document.createElement('div');
mobileMenu.className = 'mobile-menu absolute top-full left-0 w-full bg-white shadow-md';

// 添加菜单内容
mobileMenu.innerHTML = `
    <div class="container mx-auto px-4 py-3 flex flex-col space-y-4">
        <a href="#about" class="text-dark hover:text-primary transition-colors py-2">关于我</a>
        <a href="#courses" class="text-dark hover:text-primary transition-colors py-2">课程</a>
        <a href="#pandas" class="text-dark hover:text-primary transition-colors py-2">Pandas学习</a>
    </div>
`;

// 将菜单添加到导航栏
const nav = document.querySelector('nav');
nav.appendChild(mobileMenu);

// 菜单 toggle 功能
menuButton.addEventListener('click', function() {
    mobileMenu.classList.toggle('active');
});

// 点击菜单项后关闭菜单
const mobileMenuLinks = mobileMenu.querySelectorAll('a');
mobileMenuLinks.forEach(link => {
    link.addEventListener('click', function() {
        mobileMenu.classList.remove('active');
    });
});

// 课程卡片悬停效果
const courseCards = document.querySelectorAll('.course-card');
courseCards.forEach(card => {
    card.style.position = 'relative';
    card.classList.add('transition-all', 'duration-300');
    card.addEventListener('mouseenter', function() {
        this.classList.add('transform');
        this.style.transform = 'translateY(-8px)';
    });
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
});

// 平滑滚动
const links = document.querySelectorAll('a[href^="#"]');
links.forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// 页面加载动画
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
    
    // 添加数字计数动画
    animateNumbers();
});

// 添加数字计数动画
function animateNumbers() {
    const statNumbers = document.querySelectorAll('.stat-number, [class*="text-4xl"]');
    statNumbers.forEach(element => {
        const text = element.textContent;
        if (text.match(/^\d+/)) {
            const number = parseInt(text);
            if (number > 0 && number < 1000) {
                animateValue(element, 0, number, 2000);
            }
        }
    });
}

// 数字动画函数
function animateValue(obj, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        obj.innerHTML = Math.floor(progress * (end - start) + start);
        if (progress < 1) {
            window.requestAnimationFrame(step);
        } else {
            obj.innerHTML = end;
        }
    };
    window.requestAnimationFrame(step);
}

// 课程卡片点击事件
const courseLinks = document.querySelectorAll('.course-card a');
courseLinks.forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        // 这里可以添加课程详情页面的跳转逻辑
        // 目前只是显示一个提示
        alert('课程详情页面正在建设中，敬请期待！');
    });
});

// 滚动动画 - 当元素进入视口时添加动画效果
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// 观察需要动画的元素
document.querySelectorAll('.course-card, section > div').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// 添加动画完成样式
const style = document.createElement('style');
style.textContent = `
    .animate-in {
        opacity: 1 !important;
        transform: translateY(0) !important;
    }
`;
document.head.appendChild(style);

// 鼠标跟随效果（可选，如果性能允许的话）
let mouseX = 0;
let mouseY = 0;
let isNearCard = false;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

// 增强课程卡片的交互效果
courseCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.zIndex = '10';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.zIndex = '1';
    });
});

// 键盘导航支持
document.addEventListener('keydown', (e) => {
    // 按下 Escape 键关闭移动菜单
    if (e.key === 'Escape' && mobileMenu.classList.contains('active')) {
        mobileMenu.classList.remove('active');
    }
});

// 添加键盘导航的焦点样式
const focusStyle = document.createElement('style');
focusStyle.textContent = `
    a:focus, button:focus {
        outline: 2px solid #3b82f6;
        outline-offset: 2px;
    }
`;
document.head.appendChild(focusStyle);