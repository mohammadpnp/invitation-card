<!DOCTYPE html>
<html lang="fa" class="light-style customizer-hide" dir="rtl" data-theme="theme-default" data-assets-path="../../assets/" data-template="vertical-menu-template">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no, minimum-scale=1.0, maximum-scale=1.0">

    <title>های طب | فراموشی رمز عبور</title>

    <meta name="description" content="">

    {{-- css files --}}
    @include('admin/common/css-links')


    <!-- Vendors CSS -->
    <link rel="stylesheet" href="{{asset('assets/vendor/libs/perfect-scrollbar/perfect-scrollbar.css')}}">
    <link rel="stylesheet" href="{{asset('assets/vendor/libs/typeahead-js/typeahead.css')}}">
    <!-- Vendor -->
    <link rel="stylesheet" href="{{asset('/assets/vendor/libs/formvalidation/dist/css/formValidation.min.css')}}">

    <!-- Page CSS -->
    <!-- Page -->
    <link rel="stylesheet" href="{{asset('/assets/vendor/css/pages/page-auth.css')}}">
    <!-- Helpers -->
    <script src="{{asset('/assets/vendor/js/helpers.js')}}"></script>


  </head>

  <body>
    <!-- Content -->

    <div class="authentication-wrapper authentication-cover">
      <div class="authentication-inner row m-0">
        <!-- /Left Text -->
          <div class="d-none d-lg-flex col-lg-7 col-xl-8 align-items-center">
              <div class="flex-row text-center mx-auto">
                  <img src="{{asset('/assets/img/icons/brands/hiteb-icon.png')}}" alt="Auth Cover Bg color" class="w-50" >
                  <div class="mx-auto">
                      <h3>های طب شرکت ارايه انواع خدمات آزمایشگاهی</h3>
                      <p>
                          با های طب در منزل بمانید و به راحتی درخواست نمونه گیری خود را ثبت کنید.
                      </p>
                  </div>
              </div>
          </div>
        <!-- /Left Text -->

        <!-- Forgot Password -->
        <div class="d-flex col-12 col-lg-5 col-xl-4 align-items-center authentication-bg p-sm-5 p-4">
          <div class="w-px-400 mx-auto">
            <!-- Logo -->
              <div class="app-brand mb-4">
                  <a href="index.html" class="app-brand-link gap-2 mb-2">
                      <img src="{{asset('/assets/img/icons/brands/hiteb-tree-icon.png')}}" alt="icon" width="12%">
                      <span class="app-brand-text demo h3 mb-0 fw-bold">های طب</span>
                  </a>
              </div>
            <!-- /Logo -->
            <h5 class="mb-2">لطفا کد ارسال شده برایتان را وارد کنید</h5>
            <form id="formAuthentication" class="mb-3" action="auth-reset-password-cover.html" method="POST">
              <div class="mb-3">
                <label for="email" class="form-label">کد تایید</label>
                <input type="text" class="form-control text-start" dir="ltr" id="email" name="email" placeholder="کد تایید خود را وارد کنید" autofocus>
              </div>
              <button class="btn btn-primary d-grid w-100">ورود</button>
            </form>
            <div class="text-center">
              <a href="auth-login-cover.html" class="d-flex align-items-center justify-content-center">
                <i class="bx bx-chevron-left scaleX-n1-rtl"></i>
                بازگشت
              </a>
            </div>
          </div>
        </div>
        <!-- /Forgot Password -->
      </div>
    </div>

    <!-- / Content -->

    {{-- js files --}}
    @include('admin/common/js-links')

    <!-- Vendors JS -->
    <script src="{{asset('/assets/vendor/libs/formvalidation/dist/js/FormValidation.min.js')}}"></script>
    <script src="{{asset('/assets/vendor/libs/formvalidation/dist/js/plugins/Bootstrap5.min.js')}}"></script>
    <script src="{{asset('/assets/vendor/libs/formvalidation/dist/js/plugins/AutoFocus.min.js')}}"></script>



    <!-- Page JS -->
    <script src="{{asset('/assets/js/pages-auth.js')}}"></script>
  </body>
</html>
