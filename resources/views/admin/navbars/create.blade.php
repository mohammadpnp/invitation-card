<!DOCTYPE html>
<html lang="fa" class="light-style layout-navbar-fixed layout-menu-fixed" dir="rtl" data-theme="theme-default" data-assets-path="../../assets/" data-template="vertical-menu-template">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no, minimum-scale=1.0, maximum-scale=1.0">

    <title>های طب | ساخت کاربر</title>

    <meta name="description" content="">

    @include('common.css-links')

    <!-- Vendors CSS -->
    <link rel="stylesheet" href="{{asset('/assets/vendor/libs/datatables-bs5/datatables.bootstrap5.css')}}">
    <link rel="stylesheet" href="{{asset('/assets/vendor/libs/datatables-responsive-bs5/responsive.bootstrap5.css')}}">
    <link rel="stylesheet" href="{{asset('/assets/vendor/libs/datatables-buttons-bs5/buttons.bootstrap5.css')}}">
    <link rel="stylesheet" href="{{asset('/assets/vendor/libs/select2/select2.css')}}">
    <link rel="stylesheet" href="{{asset('/assets/vendor/libs/formvalidation/dist/css/formValidation.min.css')}}">

    <!-- Page CSS -->
      {{--persian calender--}}
      <link rel="stylesheet" href="{{asset('/assets/vendor/libs/flatpickr/flatpickr.css')}}">
      <link rel="stylesheet" href="{{asset('/assets/vendor/libs/bootstrap-datepicker/bootstrap-datepicker.css')}}">
      <link rel="stylesheet" href="{{asset('/assets/vendor/libs/bootstrap-daterangepicker/bootstrap-daterangepicker.css')}}">
      <link rel="stylesheet" href="{{asset('/assets/vendor/libs/jquery-timepicker/jquery-timepicker.css')}}">

    <!-- Helpers -->
    <script src="{{asset('/assets/vendor/js/helpers.js')}}"></script>

  </head>

  <body>
    <!-- Layout wrapper -->
    <div class="layout-wrapper layout-content-navbar">
      <div class="layout-container">

        {{-- sidebar --}}
        @include('common.sidebar')

        <!-- Layout container -->
        <div class="layout-page">

        {{-- header --}}
        @include('common.header')


          <!-- Content wrapper -->
          <div class="content-wrapper">
            <!-- Content -->

            <div class="container-fluid  flex-grow-1 container-p-y">

              <!-- Users List Table -->
                <div class="card p-3">
              <!-- Edit User -->

                              <div class=" mb-4">
                                  <h3 class="text-center secondary-font">ساخت شعر</h3>
                              </div>
                    @if ($errors->any())
                        <div class="alert alert-danger m-3">
                            <ul class="m-0">
                                @foreach ($errors->all() as $error)
                                    <li>{{ $error }}</li>
                                @endforeach
                            </ul>
                        </div>
                    @endif
                    @if(session()->has('message'))
                        <div class="alert alert-success m-3">
                            {{ session()->get('message') }}
                        </div>
                    @endif

                    <form action="{{route('navbars.store')}}" method="post" enctype="multipart/form-data" class="row g-3" >
                        @csrf
                        @method('POST')
                                          <div class="button-wrapper">
                                              <div class="d-flex">
                                                  <label for="upload" class="btn btn-primary me-2 mb-4" >
                                                      <span class="d-none d-sm-block">ارسال تصویر جدید</span>
                                                      <i class="bx bx-upload d-block d-sm-none"></i>
                                                          <input name="icon" type="file" id="upload" class="account-file-input" hidden accept="">
                                                  </label>
                                            
                                              </div>
                                              <p class="mb-0">فایل‌های png و jpg مجاز هستند. حداکثر اندازه فایل 1024KB.</p>
                                          </div>
                                          <div class="col-12 col-md-6">
                                            <label class="form-label" for="modalEditUserFirstName">عنوان</label>
                                            <input type="text" value="{{old('title')}}"  name="title" class="form-control">
                                          </div>
                                          <div class="col-12 col-md-6">
                                            <label class="form-label" for="modalEditUserFirstName">لینک</label>
                                            <input type="text" value="{{old('link')}}"  name="link" class="form-control">
                                          </div>
                                  <div class="col-12 text-center mt-4">
                                      <button type="submit" class="btn btn-primary me-sm-3 me-1">ثبت</button>
                                      <a href="{{route('navbars.index')}}" class="btn btn-label-secondary">
                                          انصراف
                                      </a>
                                  </div>
                              </form>
              <!--/ Edit User -->
                </div>
            </div>

            {{--Edit password--}}
                <!-- Content wrapper -->


              <!-- / Layout page -->

            {{-- footer --}}
            @include('common.footer')

            <div class="content-backdrop fade"></div>

      </div>

      <!-- Overlay -->
      <div class="layout-overlay layout-menu-toggle"></div>

      <!-- Drag Target Area To SlideIn Menu On Small Screens -->
      <div class="drag-target"></div>
    </div>
    <!-- / Layout wrapper -->


    @include('common.js-links')

    <!-- Vendors JS -->
    <script src="{{asset('/assets/vendor/libs/moment/moment.js')}}"></script>
    <script src="{{asset('/assets/vendor/libs/datatables/jquery.dataTables.js')}}"></script>
    <script src="{{asset('/assets/vendor/libs/datatables/i18n/fa.js')}}"></script>
    <script src="{{asset('/assets/vendor/libs/datatables-bs5/datatables-bootstrap5.js')}}"></script>
    <script src="{{asset('/assets/vendor/libs/datatables-responsive/datatables.responsive.js')}}"></script>
    <script src="{{asset('/assets/vendor/libs/datatables-responsive-bs5/responsive.bootstrap5.js')}}"></script>
    <script src="{{asset('/assets/vendor/libs/datatables-buttons/datatables-buttons.js')}}"></script>
    <script src="{{asset('/assets/vendor/libs/datatables-buttons-bs5/buttons.bootstrap5.js')}}"></script>
    <script src="{{asset('/assets/vendor/libs/datatables-buttons/buttons.html5.js')}}"></script>
    <script src="{{asset('/assets/vendor/libs/datatables-buttons/buttons.print.js')}}"></script>
    <script src="{{asset('/assets/vendor/libs/select2/select2.js')}}"></script>
    <script src="{{asset('/assets/vendor/libs/select2/i18n/fa.js')}}"></script>
    <script src="{{asset('/assets/vendor/libs/formvalidation/dist/js/FormValidation.min.js')}}"></script>
    <script src="{{asset('/assets/vendor/libs/formvalidation/dist/js/plugins/Bootstrap5.min.js')}}"></script>
    <script src="{{asset('/assets/vendor/libs/formvalidation/dist/js/plugins/AutoFocus.min.js')}}"></script>
    <script src="{{asset('/assets/vendor/libs/cleavejs/cleave.js')}}"></script>
    <script src="{{asset('/assets/vendor/libs/cleavejs/cleave-phone.js')}}"></script>

            {{--persian calender--}}
            <script src={{asset('/assets/vendor/libs/moment/moment.js')}}"></script>
            <script src="{{asset('/assets/vendor/libs/jdate/jdate.js')}}"></script>
            <script src="{{asset('/assets/vendor/libs/flatpickr/flatpickr-jdate.js')}}"></script>
            <script src="{{asset('/assets/vendor/libs/flatpickr/l10n/fa-jdate.js')}}"></script>
            <script src="{{asset('/assets/vendor/libs/bootstrap-datepicker/bootstrap-datepicker.js')}}"></script>
            <script src="{{asset('/assets/js/forms-pickers.js')}}"></script>

    <!-- Page JS -->
{{--    <script src="{{asset('/assets/js/tables-datatables-extensions.js')}}"></script>--}}
    <script src="{{asset('/assets/js/modal-edit-user.js')}}"></script>



  </body>
</html>
