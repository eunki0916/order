$(function () {
  let link = $(".order");
  link.on("click", function (e) {
    //href 속성을 통해, section id 타겟을 잡음
    let target = $($(this).attr("href"));

    //target section의 좌표를 통해 꼭대기로 이동
    $("html").animate(
      {
        scrollTop: target.offset().top - 150,
      },
      700,
    );

    //active 클래스 부여
    $(this).addClass("active");

    //앵커를 통해 이동할때, URL에 #id가 붙지 않도록 함.
    e.preventDefault();
  });
  function findPosition() {
    $("section").each(function () {
      if ($(this).offset().top - $(window).scrollTop() - 150 < 20) {
        link.removeClass("active");
        $("#navbar")
          .find('[data-scroll="' + $(this).attr("id") + '"]')
          .addClass("active");
      }
    });
  }
  $(window).on("scroll", function () {
    findPosition();
  });
  findPosition();

  // gnb 왼쪽에서 튀어나옴
  $(".all_menu").click(function () {
    $(".gnb").animate({ left: 0 }, 300);
    $(".dark").css("display", "block");
  });

  // gnb 사라짐
  $(".dark").click(function () {
    $(".dark").css({ display: "none" });
    $(".gnb").animate({ left: -350 }, 300);
    $(".detail_popup").hide();
  });
  $(".detail").click(function () {
    $(".detail_popup").show();
    $(".dark").css("display", "block");
  });

  //
  $(".detail_close").click(function () {
    $(".detail_popup").hide();
    $(".gnb").animate({ left: -350 }, 700);
    $(".cart_page").hide();
    $(".orderList_page").hide();
    $(".dark").css({ display: "none" });
  });
});

$(".cart_button").click(function () {
  $(".cart_span").html(`장바구니<sup>+</sup>`);
  $(".cart").css("color", "black");
  setTimeout(() => {
    $(".cart_span").html(`장바구니`);
    $(".cart").css("color", "#8a8a8a");
  }, 5000);
});

// 장바구니 ~ 주문내역

let cart = document.querySelector(".cart");
let gnb_cart = document.querySelector(".gnb_cart");
let orderlist = document.querySelector(".orderlist");
let gnb_orderlist = document.querySelector(".gnb_orderlist");
let cart_page = document.querySelector(".cart_page");
let orderList_page = document.querySelector(".orderList_page");
let order_span = document.querySelector(".order_span");
let list_bot = document.querySelector(".list_bot");
let close = document.querySelector(".detail_close");

$(".cart").click(function () {
  $(".cart_page").css("display", "block");
  $(".orderList_page").css("display", "none");
  $(".promote_page").hide();
});
// cart.onclick = function () {
//   cart_page.style.display = "block";
//   orderList_page.style.display = "none";
//   // $(".promote_page").hide();
// };
$(".gnb_cart").click(function () {
  $(".cart_page").css("display", "block");
  $(".orderList_page").css("display", "none");
});
// gnb_cart.onclick = function () {
//   cart_page.style.display = "block";
//   orderList_page.style.display = "none";
// };

cart_page.onclick = () => {
  cart_page.style.display = "none";
};
orderList_page.onclick = () => {
  orderList_page.style.display = "none";
};
let orderClick = orderlist.addEventListener("click", function () {
  $(".promote_page").hide();

  orderList_page.style.display = "block";
  orderlist.style.color = "black";

  setTimeout(() => {
    orderlist.style.color = "#8a8a8a";
  }, 5000);
  setTimeout(() => {
    orderList_page.style.display = "none";
  }, 15000);
  let timer = setInterval(() => {
    remain_time();
  }, 1000);
  let setTime = 15;
  function remain_time() {
    list_bot.innerText = `${setTime}초 뒤에 창이 닫힙니다.`;
    setTime--;
    if (setTime == 0) {
      clearInterval(timer);
    }
  }
});
$(".gnb_orderlist").click(function () {
  $(".orderList_page").css("display", "block");
  setTimeout(() => {
    $(".orderList_page").css("display", "none");
  }, 15000);
  let timer = setInterval(() => {
    remain_time();
  }, 1000);
  let setTime = 15;
  function remain_time() {
    list_bot.innerHTML = `${setTime}초 뒤에 창이 닫힙니다.`;
    setTime--;
    if (setTime == 0) {
      clearInterval(timer);
    }
  }
});
// gnb_orderlist.onclick = () => {
//   orderList_page.style.display = "block";
//   let disappear = setTimeout(() => {
//     orderList_page.style.display = "none";
//   }, 15000);
//   disappear;
//   let timer = setInterval(() => {
//     remain_time();
//   }, 1000);
//   let setTime = 15;
//   function remain_time() {
//     list_bot.innerHTML = `${setTime}초 뒤에 창이 닫힙니다.`;
//     setTime--;
//     if (setTime == 0) {
//       clearInterval(timer);
//     }
//   }
// };
const xhr = new XMLHttpRequest();
xhr.open("get", "data.json", true);
xhr.send(null);
xhr.onload = function () {
  if (xhr.status == 200) {
    //서버 응답이 정상이라면 (Http status code)
    respObj = JSON.parse(xhr.responseText);
    let newContent = "";

    newContent += `<div class="item">`;
    newContent += `<p>
      <span>${respObj.items[0].item}</span><span>${respObj.items[0].price}원</span>
    </p>`;
    newContent += `<p>
      <span>${respObj.items[3].item}</span><span>${respObj.items[3].price}원</span>
    </p>`;
    newContent += `<p>
      <span>${respObj.items[4].item}</span><span>${respObj.items[4].price}원</span>
    </p>`;
    newContent += `<p>
      <span>${respObj.items[11].item}</span><span>${respObj.items[11].price}원</span>
    </p>`;
    newContent += `<p>
      <span>${respObj.items[11].item}</span><span>${respObj.items[11].price}원</span>
    </p>`;
    newContent += `</div>`;

    const arr = [
      respObj.items[0].price,
      respObj.items[3].price,
      respObj.items[4].price,
      respObj.items[11].price,
      respObj.items[11].price,
    ];
    let sum = 0;
    arr.forEach(function (el) {
      sum += el;
    });
    newContent += `<div class="price">`;
    newContent += `<p>
      합계 : <span>${sum}원</span>
    </p>`;
    newContent += `</div>`;

    document.querySelector(".cart_mid").innerHTML = newContent;

    $(".order_button").click(function () {
      document.querySelector(".list_mid").innerHTML = newContent;
    });
  }
};

// 이벤트 페이지
let $btn = $(".event ul li a");
$btn.click(function (e) {
  $btn.removeClass("active");
  $(this).addClass("active");
});

$(".event_page").click(function () {
  $(".all").hide();
  $(".ing").fadeIn(500);
  $(".finish").html("마감");
});
$(".btn_all").click(function () {
  $(".all").fadeIn(500);
  $(".finish").html("마감");
});
$(".btn_ing").click(function () {
  $(".all").hide();
  $(".ing").fadeIn(500);
});
$(".btn_close").click(function () {
  $(".all").hide();
  $(".close").fadeIn(500);
  $(".finish").html("마감");
});

// 직원호출 대리운전
let call_button = document.querySelector(".call_button");
let call_msg = document.querySelector(".call_msg");
let gnb_call = document.querySelector(".gnb_call");
let gnb_call_msg = document.querySelector(".gnb_call_msg");
let chauffeur = document.querySelector(".chauffeur");
let chauffeur_msg = document.querySelector(".chauffeur_msg");

$(".call_button").click(function () {
  $(".call_msg").css("display", "block");
  $(".call_button").css("color", "black");
  setTimeout(() => {
    $(".call_msg").css("display", "none");
    $(".call").css("color", "#8a8a8a");
  }, 5000);
  $(".promote_page").hide();
});
// call.onclick = function () {
//   call_msg.style.display = "block";
//   call.style.color = "black";
//   setTimeout(() => {
//     call_msg.style.display = "none";
//     call.style.color = "#8a8a8a";
//   }, 5000);
//   // $(".promote_page").hide();
// };
$(".gnb_call").click(function () {
  $(".gnb_call_msg").css("display", "block");
  setTimeout(() => {
    $(".gnb_call_msg").css("display", "none");
  }, 5000);
});
// gnb_call.onclick = function () {
//   gnb_call_msg.style.display = "block";
//   setTimeout(() => {
//     gnb_call_msg.style.display = "none";
//   }, 5000);
// };
chauffeur.onclick = function () {
  chauffeur_msg.style.display = "block";
  chauffeur.style.color = "black";
  setTimeout(() => {
    chauffeur_msg.style.display = "none";
    chauffeur.style.color = "#8a8a8a";
  }, 5000);
  // $(".promote_page").hide();
};
//
$(".cart").click(function () {
  $(".detail_popup").hide();
  $(".dark").hide();
  $(".cart_span").html(`장바구니<sup>+</sup>`);
  $(".cart").css("color", "black");
  setTimeout(() => {
    $(".cart_span").html(`장바구니`);
    $(".cart").css("color", "#8a8a8a");
  }, 5000);
});

// 마우스, 키보드 움직임 없으면 30초마다 새로고침
let time = new Date().getTime();
$(document.body).bind("mousemove keypress", function () {
  time = new Date().getTime();
});
function refresh() {
  if (new Date().getTime() - time >= 30000) window.location.reload(true);
  else setTimeout(refresh, 5000);
}
setTimeout(refresh, 5000);

// 슬릭
$(".promote_page").slick({
  dots: true,
  infinite: true,
  autoplay: true,
  autoplaySpeed: 2000,
  speed: 500,
  fade: true,
  cssEase: "linear",
});

// 클릭시 화면 사라짐
$(".promote_page").click(function () {
  $(".promote_page").hide();
});

const big_main = ["img/원본/1.jpg", "img/원본/2.jpg", "img/원본/3.jpg"];
const big_sub = [
  "img/원본/4.jpg",
  "img/원본/5.jpg",
  "img/원본/6.jpg",
  "img/원본/7.jpg",
  "img/원본/8.jpg",
];
const big_alcolhol = [
  "img/원본/9.png",
  "img/원본/10.jpg",
  "img/원본/11.png",
  "img/원본/12.png",
  "img/원본/13.png",
];
const big_drink = [
  "img/원본/14.jpg",
  "img/원본/15.png",
  "img/원본/16.jpg",
  "img/원본/17.jpg",
  "img/원본/18.png",
  "img/원본/19.jpg",
  "img/원본/20.jpg",
  "img/원본/21.jpg",
];
const big_etc = ["img/원본/22.jpg", "img/원본/23.jpg", "img/원본/24.jpg"];

// 썸네일
const $thumbBtn1 = $(".1");
const $thumbBtn2 = $(".2");
const $thumbBtn3 = $(".3");
const $thumbBtn4 = $(".4");
const $thumbBtn5 = $(".5");
$thumbBtn1.click(function (e) {
  e.preventDefault();
  let num = $(this).index();
  $(".detail_popup").find("img").attr("src", big_main[num]);
  let detail_p = $(this).find(".detail_p").html();
  let detail_span = $(this).find(".detail_span").html();
  $(".detail_popup p").html(detail_p);
  $(".detail_popup span").html(detail_span);
});
$thumbBtn2.click(function (e) {
  e.preventDefault();
  let num = $(this).index();
  $(".detail_popup").find("img").attr("src", big_sub[num]);
  let detail_p = $(this).find(".detail_p").html();
  let detail_span = $(this).find(".detail_span").html();
  $(".detail_popup p").html(detail_p);
  $(".detail_popup span").html(detail_span);
});
$thumbBtn3.click(function (e) {
  e.preventDefault();
  let num = $(this).index();
  $(".detail_popup").find("img").attr("src", big_alcolhol[num]);
  let detail_p = $(this).find(".detail_p").html();
  let detail_span = $(this).find(".detail_span").html();
  $(".detail_popup p").html(detail_p);
  $(".detail_popup span").html(detail_span);
});
$thumbBtn4.click(function (e) {
  e.preventDefault();
  let num = $(this).index();
  $(".detail_popup").find("img").attr("src", big_drink[num]);
  let detail_p = $(this).find(".detail_p").html();
  let detail_span = $(this).find(".detail_span").html();
  $(".detail_popup p").html(detail_p);
  $(".detail_popup span").html(detail_span);
});
$thumbBtn5.click(function (e) {
  e.preventDefault();
  let num = $(this).index();
  $(".detail_popup").find("img").attr("src", big_etc[num]);
  let detail_p = $(this).find(".detail_p").html();
  let detail_span = $(this).find(".detail_span").html();
  $(".detail_popup p").html(detail_p);
  $(".detail_popup span").html(detail_span);
});
