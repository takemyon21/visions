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

//コンタクトフォームエラーチェック
jQuery(function () {
  if (jQuery("#contactForm").length) {
    jQuery.validator.addMethod('zenkaku', function(value, element) {
      return this.optional(element) || /^[^ -~｡-ﾟ]*$/.test(value);
      }, "全角で入力してください。"
     )
    
    jQuery("#contactForm").validate({
      rules: {
        name: {
          required: true,
          zenkaku: true,
        },
        email: {
          required: true,
          email: true
        },
        email2: {
          required: true,
          email: true,
          equalTo: '#email'
        },
        phone: {
          required: true,
          number: true
        },
        textarea: {
          required: true
        },
      },
      messages: {
        name: {
          required: '必須項目が入力されていません。'
        },
        email: {
          required: '必須項目が入力されていません。',
          email: '半角で入力してください。'
        },
        email2: {
          required: '必須項目が入力されていません。',
          email: '半角で入力してください。',
          equalTo: '返信用メールアドレスと異なる内容が入力されています。'
        },
        phone: {
          required: '必須項目が入力されていません。',
          number: '半角で入力してください。'
        },
        textarea: {
          required: '必須項目が入力されていません。'
        },
      },
      errorPlacement: function(error, element){
        error.insertAfter(element);
      }
    });
  }
});
