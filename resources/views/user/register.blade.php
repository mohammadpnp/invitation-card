<!DOCTYPE html>
<html lang="fa" class="light-style customizer-hide" dir="rtl" data-theme="theme-default" data-assets-path="../../assets/" data-template="vertical-menu-template">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no, minimum-scale=1.0, maximum-scale=1.0">

    <title>اکسپو مدیا | ثبت نام کاربر</title>

    <meta name="description" content="">

    <!-- Favicon -->
    <link rel="icon" type="image/x-icon" href="{{asset('/assets/img/favicon/favicon.ico')}}">

    <!-- Icons -->
    <link rel="stylesheet" href="{{asset('/assets/vendor/fonts/boxicons.css')}}">
    <link rel="stylesheet" href="{{asset('/assets/vendor/fonts/fontawesome.css')}}">
    <link rel="stylesheet" href="{{asset('/assets/vendor/fonts/flag-icons.css')}}">

    <!-- Core CSS -->
    <link rel="stylesheet" href="{{asset('/assets/vendor/css/rtl/core.css" class="template-customizer-core-css')}}">
    <link rel="stylesheet" href="{{asset('/assets/vendor/css/rtl/theme-default.css" class="template-customizer-theme-css')}}">
    <link rel="stylesheet" href="{{asset('/assets/css/demo.css')}}">
    <link rel="stylesheet" href="{{asset('/assets/vendor/css/rtl/rtl.css')}}">

    <!-- Vendors CSS -->
    <link rel="stylesheet" href="{{asset('/assets/vendor/libs/perfect-scrollbar/perfect-scrollbar.css')}}">
    <link rel="stylesheet" href="{{asset('/assets/vendor/libs/typeahead-js/typeahead.css')}}">
    <!-- Vendor -->
    <link rel="stylesheet" href="{{asset('/assets/vendor/libs/bs-stepper/bs-stepper.css')}}">
    <link rel="stylesheet" href="{{asset('/assets/vendor/libs/bootstrap-select/bootstrap-select.css')}}">
    <link rel="stylesheet" href="{{asset('/assets/vendor/libs/select2/select2.css')}}">
    <link rel="stylesheet" href="{{asset('/assets/vendor/libs/formvalidation/dist/css/formValidation.min.css')}}">

    <!-- Page CSS -->

    <!-- Page -->
    <link rel="stylesheet" href="{{asset('/assets/vendor/css/pages/page-auth.css')}}">
    <!-- Helpers -->
    <script src="{{asset('/assets/vendor/js/helpers.js')}}"></script>

    <!--! Template customizer & Theme config files MUST be included after core stylesheets and helpers.js in the <head> section -->
    <!--? Template customizer: To hide customizer set displayCustomizer value false in config.js.  -->
    <script src="{{asset('/assets/vendor/js/template-customizer.js')}}"></script>
    <!--? Config:  Mandatory theme config file contain global vars & default theme options, Set your preferred theme option in this file.  -->
    <script src="{{asset('/assets/js/config.js')}}"></script>

</head>

<body>
<!-- Content -->

<div class="container-xxl">
    <div class="authentication-wrapper authentication-basic container-p-y d-block d-flex align-items-center">
        <div  style="max-width: 100% !important;" class="w-100 m-0 authentication-inner py-4">
            <!-- Register Card -->
            <div class="card w-75 m-auto">
                <div class="card-body">
                    <!-- Logo -->
                    <div class="app-brand justify-content-center">
                        <a href="index.html" class="app-brand-link gap-2">
                  <span class="app-brand-logo demo">
                    <svg width="26px" height="26px" viewbox="0 0 26 26" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                      <title>آیکن</title>
                      <defs>
                        <lineargradient x1="50%" y1="0%" x2="50%" y2="100%" id="linearGradient-1">
                          <stop stop-color="#5A8DEE" offset="0%"></stop>
                          <stop stop-color="#699AF9" offset="100%"></stop>
                        </lineargradient>
                        <lineargradient x1="0%" y1="0%" x2="100%" y2="100%" id="linearGradient-2">
                          <stop stop-color="#FDAC41" offset="0%"></stop>
                          <stop stop-color="#E38100" offset="100%"></stop>
                        </lineargradient>
                      </defs>
                      <g id="Pages" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                        <g id="Login---V2" transform="translate(-667.000000, -290.000000)">
                          <g id="Login" transform="translate(519.000000, 244.000000)">
                            <g id="Logo" transform="translate(148.000000, 42.000000)">
                              <g id="icon" transform="translate(0.000000, 4.000000)">
                                <path d="M13.8863636,4.72727273 C18.9447899,4.72727273 23.0454545,8.82793741 23.0454545,13.8863636 C23.0454545,18.9447899 18.9447899,23.0454545 13.8863636,23.0454545 C8.82793741,23.0454545 4.72727273,18.9447899 4.72727273,13.8863636 C4.72727273,13.5423509 4.74623858,13.2027679 4.78318172,12.8686032 L8.54810407,12.8689442 C8.48567157,13.19852 8.45300462,13.5386269 8.45300462,13.8863636 C8.45300462,16.887125 10.8856023,19.3197227 13.8863636,19.3197227 C16.887125,19.3197227 19.3197227,16.887125 19.3197227,13.8863636 C19.3197227,10.8856023 16.887125,8.45300462 13.8863636,8.45300462 C13.5386269,8.45300462 13.19852,8.48567157 12.8689442,8.54810407 L12.8686032,4.78318172 C13.2027679,4.74623858 13.5423509,4.72727273 13.8863636,4.72727273 Z" id="Combined-Shape" fill="#4880EA"></path>
                                <path d="M13.5909091,1.77272727 C20.4442608,1.77272727 26,7.19618701 26,13.8863636 C26,20.5765403 20.4442608,26 13.5909091,26 C6.73755742,26 1.18181818,20.5765403 1.18181818,13.8863636 C1.18181818,13.540626 1.19665566,13.1982714 1.22574292,12.8598734 L6.30410592,12.859962 C6.25499466,13.1951893 6.22958398,13.5378796 6.22958398,13.8863636 C6.22958398,17.8551125 9.52536149,21.0724191 13.5909091,21.0724191 C17.6564567,21.0724191 20.9522342,17.8551125 20.9522342,13.8863636 C20.9522342,9.91761479 17.6564567,6.70030817 13.5909091,6.70030817 C13.2336969,6.70030817 12.8824272,6.72514561 12.5388136,6.77314791 L12.5392575,1.81561642 C12.8859498,1.78721495 13.2366963,1.77272727 13.5909091,1.77272727 Z" id="Combined-Shape2" fill="url(#linearGradient-1)"></path>
                                <rect id="Rectangle" fill="url(#linearGradient-2)" x="0" y="0" width="7.68181818" height="7.68181818"></rect>
                              </g>
                            </g>
                          </g>
                        </g>
                      </g>
                    </svg>
                  </span>
                            <span class="app-brand-text demo h3 mb-0 fw-bold">اکسپو مدیا</span>
                        </a>
                    </div>
                    <!-- /Logo -->
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
                    <form id="formAuthentication" class="mb-3" action="{{route('user.register.store')}}" method="POST">
                        @csrf
                        <div class="row g-3">
                            <div class="col-sm-6">
                                <label class="form-label" for="multiStepsFirstName">نام* </label>
                                <input type="text" value="{{old('first_name')}}"  id="multiStepsFirstName" name="first_name" class="form-control" >
                            </div>
                            <div class="col-sm-6">
                                <label class="form-label" for="multiStepsLastName">نام خانوادگی*</label>
                                <input type="text" value="{{old('last_name')}}"  id="multiStepsFirstName" name="last_name" class="form-control" >
                            </div>
                            <div class="col-sm-6">
                                <label class="form-label" for="multiStepsLastName">موبایل*</label>
                                <input type="text" value="{{old('mobile')}}"  id="multiStepsFirstName" name="mobile" class="form-control" >
                            </div>
                            <div class="col-sm-6">
                                <label class="form-label" for="multiStepsLastName">ایمیل</label>
                                <input type="email" value="{{old('email')}}"  id="multiStepsFirstName" name="email" class="form-control" >
                            </div>
                            <div class="col-md-12">
                                <label class="form-label" for="multiStepsMobile">آدرس </label>
                                <div class="input-group input-group-merge">
                                    <input type="text" value="{{old('address')}}" id="multiStepsMobile" name="address" class="form-control text-start" dir="ltr" >
                                </div>
                            </div>
                            <div class="col-sm-4">
                                <label class="form-label" for="multiStepsState">حوزه فعالیت های مورد علاقه</label>
                                <select  name="activities[]" class="select2 form-select" multiple>
                                    @foreach($activities as $activity)
                                        <option @if(old('activities') != null) {{ in_array( $activity->id , old('activities') ) ? 'selected' : '' }} @endif value="{{$activity->id}}">{{$activity->name}}</option>
                                    @endforeach
                                </select>
                            </div>
                            <div class="col-sm-4">
                                <label class="form-label" for="multiStepsState">نمایشگاه های مورد علاقه</label>
                                <select name="fairs[]" class="select2 form-select" multiple>
                                    @foreach($fairs as $fair)
                                        <option @if(old('fairs') != null) {{ in_array( $fair->id , old('fairs')) ? 'selected' : '' }} @endif value="{{$fair->id}}">{{$fair->name}}</option>
                                    @endforeach
                                </select>
                            </div>
                            <div class="col-sm-4">
                                <label class="form-label" for="multiStepsState">شرکت های مورد علاقه</label>
                                <select name="companies[]" class="select2 form-select" multiple>
                                    @foreach($companies as $company)
                                        <option @if(old('companies') != null) {{ in_array( $company->id , old('companies')) ? 'selected' : '' }} @endif value="{{$company->id}}">{{$company->company_name}}</option>
                                    @endforeach
                                </select>
                            </div>
                        </div>
                        <button class="btn btn-label-linkedin mt-3 d-grid w-75 m-auto">مشاهده کارت دعوت شما</button>

                </div>
            <!-- Register Card -->
        </div>
    </div>
</div>

<!-- / Content -->

    <!-- Core JS -->
    <!-- build:js assets/vendor/js/core.js -->
    <script src="{{asset('/assets/vendor/libs/jquery/jquery.js')}}"></script>
    <script src="{{asset('/assets/vendor/libs/popper/popper.js')}}"></script>
    <script src="{{asset('/assets/vendor/js/bootstrap.js')}}"></script>
    <script src="{{asset('/assets/vendor/libs/perfect-scrollbar/perfect-scrollbar.js')}}"></script>

    <script src="{{asset('/assets/vendor/libs/hammer/hammer.js')}}"></script>

    <script src="{{asset('/assets/vendor/libs/i18n/i18n.js')}}"></script>
    <script src="{{asset('/assets/vendor/libs/typeahead-js/typeahead.js')}}"></script>
    <script src="{{asset('/assets/vendor/js/menu.js')}}"></script>

    <!-- Vendors JS -->
    <script src="{{asset('/assets/vendor/libs/cleavejs/cleave.js')}}"></script>
    <script src="{{asset('/assets/vendor/libs/cleavejs/cleave-phone.js')}}"></script>
    <script src="{{asset('/assets/vendor/libs/bs-stepper/bs-stepper.js')}}"></script>
    <script src="{{asset('/assets/vendor/libs/select2/select2.js')}}"></script>
    <script src="{{asset('/assets/vendor/libs/select2/i18n/fa.js')}}"></script>
    <script src="{{asset('/assets/vendor/libs/formvalidation/dist/js/FormValidation.min.js')}}"></script>
    <script src="{{asset('/assets/vendor/libs/formvalidation/dist/js/plugins/Bootstrap5.min.js')}}"></script>
    <script src="{{asset('/assets/vendor/libs/formvalidation/dist/js/plugins/AutoFocus.min.js')}}"></script>



    <!-- Page JS -->
    <script src="{{asset('/assets/js/pages-auth-multisteps.js')}}"></script>

    <script>


    </script>

</body>
</html>
