<!DOCTYPE html>
<html lang="fa" class="light-style customizer-hide" dir="rtl" data-theme="theme-default" data-assets-path="../../assets/" data-template="vertical-menu-template">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no, minimum-scale=1.0, maximum-scale=1.0">

    <title>اکسپو مدیا | ورود</title>

    <meta name="description" content="">

    {{-- css files --}}
    @include('common/css-links')

    <!-- Vendors CSS -->
    <link rel="stylesheet" href="{{asset('/assets/vendor/libs/perfect-scrollbar/perfect-scrollbar.css')}}">
    <link rel="stylesheet" href="{{asset('/assets/vendor/libs/typeahead-js/typeahead.css')}}">
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

        <!-- Login -->
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
            <h4 class="mb-2">به پنل ادمین های طب خوش آمدید!</h4>
            <p class="mb-4">لطفا وارد حساب خود شده و ماجراجویی را شروع کنید</p>

            <form class="mb-3" action="{{ route('login.store') }}" method="POST">
                @csrf
              <div class="mb-3">
                <label for="email" class="form-label">موبایل</label>
                <input type="text" class="form-control text-start" dir="ltr" name="mobile" placeholder="موبایل خود را وارد کنید" autofocus>
              </div>
              <div class="mb-3 form-password-toggle">
                <div class="d-flex justify-content-between">
                  <label class="form-label" for="password">رمز عبور</label>
                </div>
                <div class="input-group input-group-merge">
                  <input type="password" id="password" class="form-control text-start" dir="ltr" name="password" placeholder="············" aria-describedby="password">
                  <span class="input-group-text cursor-pointer"><i class="bx bx-hide"></i></span>
                </div>
              </div>
                @if ($errors->any())
                    <div class="alert alert-danger my-3">
                        <ul class="m-0">
                            @foreach ($errors->all() as $error)
                                <li>{{ $error }}</li>
                            @endforeach
                        </ul>
                    </div>
                @endif
              <button class="btn btn-primary d-grid w-100 mt-4">ورود</button>
            </form>
            </div>
          </div>
        </div>
        <!-- /Login -->
      </div>
    </div>

    <!-- / Content -->


    {{-- js files --}}
    @include('common/js-links')

    <!-- Vendors JS -->
    <script src="{{asset('/assets/vendor/libs/formvalidation/dist/js/FormValidation.min.js')}}"></script>
    <script src="{{asset('/assets/vendor/libs/formvalidation/dist/js/plugins/Bootstrap5.min.js')}}"></script>
    <script src="{{asset('/assets/vendor/libs/formvalidation/dist/js/plugins/AutoFocus.min.js')}}"></script>



    <!-- Page JS -->
    <script src="{{asset('/assets/js/pages-auth.js')}}"></script>
  </body>
</html>
