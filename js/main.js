// Круг

    var Emblem = {
        init: function (el, str) {
            var element = document.querySelector(el);
            var text = str ? str : element.innerHTML;
            element.innerHTML = "";
            for (var i = 0; i < text.length; i++) {
                var letter = text[i];
                var span = document.createElement("span");
                var node = document.createTextNode(letter);
                var r = (360 / text.length) * i;
                var x = (Math.PI / text.length).toFixed(0) * i;

                if (i === 2) {
                    x -= 6;
                }
                if (i === 7) {
                    x += 5;
                }
                if (i === 8) {
                    x += 9;
                }
                if (i === 20) {
                    x -= 6;
                }

                if (i === 25) {
                    x += 5;
                }
                if (i === 26) {
                    x += 9;
                }

                if (i === 9) {
                    x += 7;
                }

                if (i === 27) {
                    x += 7;
                }

                var y = (Math.PI / text.length).toFixed(0) * i;
                span.appendChild(node);
                span.style.webkitTransform = "rotateZ(" + r + "deg) translate3d(" + x + "px," + y + "px,0)";
                span.style.transform = "rotateZ(" + r + "deg) translate3d(" + x + "px," + y + "px,0)";
                element.appendChild(span);
            }
        },
    };

    Emblem.init(".emblem");

// Переключение вкладок

const tabs = document.querySelectorAll(".tab");
const contents = document.querySelectorAll(".content");

for (let i = 0; i < tabs.length; i++) {
    tabs[i].addEventListener("click", (event) => {
        let tabsChildren = event.target.parentElement.children;
        for (let t = 0; t < tabsChildren.length; t++) {
            tabsChildren[t].classList.remove("tab--active");
        }
        tabs[i].classList.add("tab--active");
        let tabContentChildren = event.target.parentElement.nextElementSibling.children;
        for (let c = 0; c < tabContentChildren.length; c++) {
            tabContentChildren[c].classList.remove("content--active");
        }
        contents[i].classList.add("content--active");
    });
}

// Плавный скролл

function scrollLink() {
    $(document).ready(function () {
        $("a[href^='#']").on("click", function (e) {
            var anchor = $(this);
            $("html, body")
                .stop()
                .animate(
                    {
                        scrollTop: $(anchor.attr("href")).offset().top,
                    },
                    777
                );
            e.preventDefault();
            return false;
        });
    });
}
scrollLink();

// Аккордеон

class ItcAccordion {
    constructor(target, config) {
        this._el = typeof target === "string" ? document.querySelector(target) : target;
        const defaultConfig = {
            alwaysOpen: true,
        };
        this._config = Object.assign(defaultConfig, config);
        this.addEventListener();
    }
    addEventListener() {
        this._el.addEventListener("click", (e) => {
            const elHeader = e.target.closest(".accordion__header");
            if (!elHeader) {
                return;
            }
            if (!this._config.alwaysOpen) {
                const elOpenItem = this._el.querySelector(".accordion__item_show");
                if (elOpenItem) {
                    elOpenItem !== elHeader.parentElement ? elOpenItem.classList.toggle("accordion__item_show") : null;
                }
            }
            elHeader.parentElement.classList.toggle("accordion__item_show");
        });
    }
}

new ItcAccordion("#accordion-1");
new ItcAccordion("#accordion-2");
new ItcAccordion("#accordion-3");
new ItcAccordion("#accordion-4");
new ItcAccordion("#accordion-5");

document.querySelector(".burger").addEventListener("click", function () {
    this.classList.toggle("active");
    document.querySelector(".popup").classList.toggle("open");
    document.documentElement.classList.toggle("no-scroll"); // Добавляем/удаляем класс к <html>
});

document.querySelectorAll(".header__nav-link").forEach((item) =>
    item.addEventListener("click", function (e) {
        e.target.classList.toggle("active");
        document.querySelector(".popup").classList.remove("open");
        document.documentElement.classList.remove("no-scroll");
    })
);

document.querySelectorAll(".header__nav-link").forEach((item) =>
    item.addEventListener("click", function (e) {
        e.target.classList.toggle("active");
        document.querySelector(".burger").classList.remove("active");
    })
);

// Popup
$(".open-popup").click(function (e) {
    e.preventDefault();
    $(".popup-bg").fadeIn(800);
    $("html").addClass("no-scroll");
});

$(".close-popup").click(function () {
    $(".popup-bg").fadeOut(800);
    $("html").removeClass("no-scroll");
});

function animation() {
    const textElements = document.querySelectorAll(".text");
    const iconElements = document.querySelectorAll(".icon");
    const path = document.querySelector("#wavePath");
    const pathLength = path.getTotalLength();

    textElements.forEach((text, indx) => {
        const textPath = text.querySelector("textPath");
        const pos = parseFloat(textPath.getAttribute("startOffset")) || 0;

        const newPosition = pos > -245 ? pos - 10 : pathLength;
        textPath.setAttribute("startOffset", newPosition);

        const currentText = textPath.textContent;
        const exclamationMarkIndex = currentText.indexOf("!");

        if (exclamationMarkIndex !== -1) {
            const point = path.getPointAtLength(newPosition + exclamationMarkIndex * 18);
            const icon = iconElements[indx];
            icon.setAttribute("x", point.x - 16);
            icon.setAttribute("y", point.y - 26);
        }
    });
}

setInterval(animation, 50);
