// スムーススクロールの記載

jQuery('a[href^="#"]').on("click", function (e) {
  // e.preventDefault();
  const speed = 500;
  const id = jQuery(this).attr("href");
  const target = jQuery("#" == id ? "html" : id);
  const position = jQuery(target).offset().top;
  jQuery("html, body").animate(
    { scrollTop: position },
    speed,
    "swing" // linear, swing
  );
});

// スクロールロック用のファンクション定義
function noscroll(e) {
  e.preventDefault();
}

// ドロワーメニューの開閉とスクロールロック
jQuery("#js-drawer-open").on("click", function (e) {
  const bodyScrollLock = window["body-scroll-lock"];
  e.preventDefault();
  jQuery(this).toggleClass("is-open");
  jQuery("#js-drawer").toggleClass("is-open");

  if (jQuery(this).hasClass("is-open")) {
    document.addEventListener("touchmove", noscroll, { passive: false });
    document.addEventListener("wheel", noscroll, { passive: false });
    // jQuery(".js-to-top").fadeOut(500);
  } else {
    document.removeEventListener("touchmove", noscroll);
    document.removeEventListener("wheel", noscroll);
    // jQuery(".js-to-top").fadeIn(500);
  }
});

// ドロワーメニューのリンククリック時の処理。スクロールロックも解除する
jQuery('#js-drawer a[href^="#"]').on("click", function (e) {
  // e.preventDefault();
  jQuery("#js-drawer").removeClass("is-active");
  jQuery("#js-open-drawer").removeClass("is-active");
  document.removeEventListener("touchmove", noscroll);
  document.removeEventListener("wheel", noscroll);
});
