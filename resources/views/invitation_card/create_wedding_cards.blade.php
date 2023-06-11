<!DOCTYPE html>
<html lang="fa" class="light-style layout-navbar-fixed layout-menu-fixed" dir="rtl" data-theme="theme-default"
      data-assets-path="../../assets/" data-template="vertical-menu-template">
<head>
    <meta charset="utf-8">
    <meta name="viewport"
          content="width=device-width, initial-scale=1.0, user-scalable=no, minimum-scale=1.0, maximum-scale=1.0">

    <title>اکسپومدیا | ساخت کارت دعوت</title>

    <meta name="description" content="">

@include('common.css-links')

<!-- Vendors CSS -->
    <link rel="stylesheet" href="{{asset('/assets/vendor/libs/datatables-bs5/datatables.bootstrap5.css')}}">
    <link rel="stylesheet" href="{{asset('/assets/vendor/libs/datatables-responsive-bs5/responsive.bootstrap5.css')}}">
    <link rel="stylesheet" href="{{asset('/assets/vendor/libs/datatables-buttons-bs5/buttons.bootstrap5.css')}}">
    <link rel="stylesheet" href="{{asset('/assets/vendor/libs/select2/select2.css')}}">
    <link rel="stylesheet" href="{{asset('/assets/vendor/libs/formvalidation/dist/css/formValidation.min.css')}}">

    <!-- Page CSS -->
    {{--map--}}
    <link href="https://static.neshan.org/sdk/leaflet/1.4.0/leaflet.css" rel="stylesheet" type="text/css">
    <script src="https://static.neshan.org/sdk/leaflet/1.4.0/leaflet.js" type="text/javascript"></script>
    <!-- Page CSS -->
    <script src="{{asset('/assets/js/SendTwoPicture.js')}}"></script>

    {{--persian calender--}}
    <link rel="stylesheet" href="{{asset('/assets/vendor/libs/flatpickr/flatpickr.css')}}">
    <link rel="stylesheet" href="{{asset('/assets/vendor/libs/bootstrap-datepicker/bootstrap-datepicker.css')}}">
    <link rel="stylesheet" href="{{asset('/assets/vendor/libs/bootstrap-daterangepicker/bootstrap-daterangepicker.css')}}">
    <link rel="stylesheet" href="{{asset('/assets/vendor/libs/jquery-timepicker/jquery-timepicker.css')}}">

    {{--persian date picker--}}
    <link rel="stylesheet" href="https://unpkg.com/persian-datepicker@1.2.0/dist/css/persian-datepicker.css">

    <!-- Helpers -->
    <script src="{{asset('/assets/vendor/js/helpers.js')}}"></script>


    <style>

        .image-preview-container {
            margin: 0 auto;
            border: 1px solid rgba(0, 0, 0, 0.1);
            padding: 1rem;
            border-radius: 20px;
        }

        .image-preview-container img {
            width: 100%;
            height: 10rem;
            display: none;
            margin-bottom: 30px;
            border-radius: 10px;

        }
        .image-preview-container input {
            display: none;
        }

    </style>
</head>

<body onload="setup()">
<!-- Layout wrapper -->
<div class="layout-wrapper layout-content-navbar">
    <div class="layout-container">

    {{-- sidebar --}}
    @include('common.sidebar')

    <!-- Layout container -->
        <div class="layout-page">

        {{-- header --}}
        {{-- @include('common.header') --}}


        <!-- Content wrapper -->
            <div class="content-wrapper">
                <!-- Content -->

                <div class="container-fluid  flex-grow-1 container-p-y">

                    <!-- Users List Table -->
                    <div class="card p-3">
                        <!-- Edit User -->

                        <div class=" mb-4">
                            <h3 class="text-center secondary-font">ساخت کارت دعوت</h3>
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
                    <div class="d-flex flex-column">
                        <form action="{{route('invitation-card.store.wedding')}}" method="post" enctype="multipart/form-data"  class="row g-3" >
                            @csrf
                            @method('POST')

                            <div class="col-12 col-md-3">
                                <div class="image-preview-container text-center">
                                    <div class="preview">
                                        <img id="file1-preview" src="#" />
                                    </div>
                                    <label for="file1" class="btn btn-success m-auto">عکس پس زمینه اول*</label>
                                    <input name="file1" class="form-control" type="file" id="file1" accept="image/*"  onchange="previewFile(this)"/>
                                </div>
                            </div>
                            <div class="col-12 col-md-3">
                                <div class="image-preview-container text-center">
                                    <div class="preview">
                                        <img id="file2-preview" src="#" />
                                    </div>
                                    <label for="file2" class="btn btn-warning m-auto">عکس پس زمینه دوم</label>
                                    <input name="file2" class="form-control" type="file" id="file2" accept="image/*"  onchange="previewFile(this)" />
                                </div>
                            </div>
                            <div class="col-12 col-md-3">
                                <div class="image-preview-container text-center">
                                    <div class="preview">
                                        <img id="file3-preview" src="#" />
                                    </div>
                                    <label for="file3" class="btn btn-info m-auto">عکس پس زمینه سوم</label>
                                    <input name="file3" class="form-control" type="file" id="file3" accept="image/*" onchange="previewFile(this)" />
                                </div>
                            </div>
                            <div class="col-12 col-md-3">
                                <div class="image-preview-container text-center">
                                    <div class="preview">
                                        <img id="file4-preview" src="#" />
                                    </div>
                                    <label for="file4" class="btn btn-danger m-auto">عکس پس زمینه چهارم</label>
                                    <input name="file4" class="form-control" type="file" id="file4" accept="image/*" onchange="previewFile(this)" />
                                </div>
                            </div>
                            <div class="col-12">
                                <div class="col-6 m-auto">
                                    <label class="form-label" for="modalEditUserFirstName">عنوان دعوت*</label>
                                    <input type="text" value="{{old('title')}}" name="title"
                                           class="form-control">
                                </div>
                            </div>
                            <div class="col-12 col-md-3">
                                <label class="form-label" for="modalEditUserLastName">تاریخ شروع رویداد*</label>
                               <input type="text" class="form-control observer-example"
                                       placeholder="YYYY/mm/dd H:i"
                                       name="start_date">
                            </div>
                             <div class="col-12 col-md-3">
                                <label class="form-label" for="modalEditUserLastName">ساعت شروع رویداد*</label>
                                 <input type="time" name="start_time" class="form-control" placeholder="HH:MM" >
                            </div>
                            <div class="col-12 col-md-3">
                                <label class="form-label" for="modalEditUserLastName">تاریخ پایان رویداد*</label>
                               <input type="text" class="form-control observer-example"
                                       placeholder="YYYY/mm/dd H:i"
                                       name="finish_date">
                            </div>
                            <div class="col-12 col-md-3">
                                <label class="form-label" for="modalEditUserLastName">ساعت پایان رویداد*</label>
                                <input name="finish_time" type="time" class="form-control" placeholder="HH:MM">
                            </div>

                                <h5 class="mb-0 secondary-font mt-4">مکان برگذاری</h5>
                            <div class="col-12 col-md-2 mt-0">
                                <label class="form-label" for="modalEditTaxID">استان</label>
                                <input type="text" value="{{old('province')}}" name="province" class="form-control">
                            </div>
                            <div class="col-12 col-md-2 mt-0">
                                <label class="form-label" for="modalEditTaxID">شهر</label>
                                <input type="text" value="{{old('city')}}" name="city" class="form-control">
                            </div>
                            <div class="col-12 col-md-4 mt-0">
                                <label class="form-label" for="modalEditTaxID">نام مراکز نمایشگاهی*</label>
                                <select id="select2Basic3" name="fair_id" class="select2 form-select form-select-md" data-allow-clear="true">
                                    <option selected disabled> انتخاب نمایشگاه ...</option>
                                    @foreach($fairs as $fair)
                                        <option {{old('fair') == $fair->id ? 'selected' : ''}} value="{{$fair->id}}">{{$fair->name ?? null}}</option>
                                    @endforeach
                                </select>
                            </div>
                            <div class="col-12 col-md-2 mt-0">
                                <label class="form-label" for="modalEditTaxID">نام و شماره سالن</label>
                                <input type="text" value="{{old('saloon')}}" name="saloon" class="form-control">
                            </div>
                            <div class="col-12 col-md-2 mt-0">
                                <label class="form-label" for="modalEditTaxID">شماره غرفه</label>
                                <input type="text" value="{{old('booth')}}" name="booth" class="form-control">
                            </div>

                            <h5 class="mb-0 secondary-font mt-4">اطلاعات شرکت</h5>
                            <div class="col-12 col-md-4 mt-0">
                                <label class="form-label" for="modalEditUserStatus">*عکس لوگو</label>
                                <input class="form-control" type="file" name="logo">
                            </div>
                            <div class="col-12 col-md-4 mt-0">
                                <label class="form-label" for="modalEditTaxID">نام شرکت*</label>
                                <input type="text" value="{{old('brand')}}" name="brand" class="form-control">
                            </div>
                            <div class="col-12 col-md-4 mt-0">
                                <label class="form-label" for="modalEditTaxID">شعار شرکت</label>
                                <input type="text" value="{{old('slogan')}}" name="slogan" class="form-control">
                            </div>
                            <div class="col-12 col-md-4">
                                <label class="form-label" for="modalEditTaxID">لینک اینستاگرام</label>
                                <input type="text" value="{{old('instagram_link')}}" name="instagram_link" class="form-control">
                            </div>
                            <div class="col-12 col-md-4">
                                <label class="form-label" for="modalEditTaxID">لینک وب سایت</label>
                                <input type="text" value="{{old('website_link')}}" name="website_link" class="form-control">
                            </div>
                            <div class="col-12 col-md-4">
                                <label class="form-label" for="modalEditTaxID">لینک یوتیوب یا آپارات</label>
                                <input type="text" value="{{old('youtube_link')}}" name="youtube_link" class="form-control">
                            </div>

                            <h5 class="mb-0 secondary-font mt-4">متن دعوت نامه</h5>
                            <div class="col-12 mt-0">
                                <label class="form-label" for="modalEditTaxID">سرتیتر*</label>
                                <select class="form-control" id="selAnimals" name="description_header">
                                    @foreach($descriptions->where('type' , \App\Models\Description::TYPE_HEADER) as $description)
                                        <option value="{{$description->description}}">{{$description->description}}</option>
                                    @endforeach
                                </select>

                            </div>
                            <div class="col-12">
                                <label class="form-label" for="modalEditTaxID">متن اصلی*</label>
                                <select class="form-control" id="selAnimals2" name="description">
                                    @foreach($descriptions->where('type' , \App\Models\Description::TYPE_MAIN) as $description)
                                        <option value="{{$description->description}}">{{$description->description}}</option>
                                    @endforeach
                                </select>

                            </div>
                            <div class="col-12">
                                <label class="form-label" for="modalEditTaxID">پی نوشت*</label>
                                <select class="form-control" id="selAnimals3" name="description_footer">
                                    @foreach($descriptions->where('type' , \App\Models\Description::TYPE_FOOTER) as $description)
                                        <option value="{{$description->description}}">{{$description->description}}</option>
                                    @endforeach
                                </select>

                            </div>

                            <h5 class="mb-0 secondary-font mt-4">اطلاعات مدیرعامل</h5>
                            <div class="col-12 mt-0">
                                <label class="form-label" for="modalEditUserStatus">عکس مدیرعامل</label>
                                <input class="form-control" type="file" name="manager_photo">
                            </div>

                            <h5 class="mb-0 secondary-font mt-4">سایر اطلاعات</h5>

                            <div class="col-12 col-md-4 mt-0">
                                <label class="form-label" for="modalEditUserStatus">آیا نمایش شعر نیاز است؟*</label>
                                <select name="have_poem" class="form-select">
                                    <option {{old('have_poem') === true ? 'selected' : ''}} value="1">بله</option>
                                    <option {{old('have_poem') === false ? 'selected' : ''}} value="0">خیر</option>
                                </select>
                            </div>

                            <div class="col-12 col-md-4 mt-0">
                                <label class="form-label" for="modalEditUserStatus">آیا نظرسنجی نیاز است؟*</label>
                                <select name="have_survey" class="form-select">
                                    <option {{old('have_survey') === true ? 'selected' : ''}} value="1">بله</option>
                                    <option {{old('have_survey') === false ? 'selected' : ''}} value="0">خیر</option>
                                </select>
                            </div>
                            <div class="col-12 col-md-4 mt-0">
                                <label class="form-label" for="modalEditUserStatus">پوستر نمایشگاه</label>
                                <input class="form-control" type="file" name="poster">
                            </div>

                            <h5 class="mb-0 secondary-font mt-4">مکان برگذاری</h5>
                            <div class="col-12 mt-0">
                                <label class="form-label" for="modalEditTaxID">آدرس*</label>
                                <input type="text" value="{{old('address')}}" name="address" class="form-control">
                            </div>
                            <div class="col-12">
                                <div id="map" style=" height: 350px; background: #eee; border: 2px solid #aaa;"></div>
                                <input type="hidden" name="lat" id="lat" value="35.699739">
                                <input type="hidden" name="lng" id="lng" value="51.338097">
                            </div>
                            <div class="col-12 text-center mt-4">
                                <button type="submit" class="btn btn-primary me-sm-3 me-1">ثبت</button>
                                <a href="{{route('invitation-card.index')}}" class="btn btn-label-secondary">
                                    انصراف
                                </a>
                            </div>
                        </form>
                        <!--/ Edit User -->
                    </div>
                </div>

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
        <script src="{{asset('/assets/js/modal-add-new-cc.js')}}"></script>

        {{--map--}}
        <script src="https://unpkg.com/axios/dist/axios.min.js"></script>
        <script src="{{asset('/assets/js/map.js')}}"></script>

              {{--persian date picker--}}
        <script src="https://unpkg.com/persian-date@1.1.0/dist/persian-date.js"></script>
        <script src="https://unpkg.com/persian-datepicker@1.2.0/dist/js/persian-datepicker.js"></script>

        <script type="text/javascript">
            $(document).ready(function () {
                $('.observer-example').persianDatepicker({
                    format: 'YYYY-MM-DD',
                    calendar: {
                        persian: {
                            locale: 'en'
                        }
                    }
                });
            });
        </script>

            <script>
                function previewFile(input) {
                    var preview = document.getElementById(input.id + "-preview");
                    var file = input.files[0];
                    var reader = new FileReader();
                    reader.onloadend = function() {
                        preview.src = reader.result;
                    }
                    if (file) {
                        reader.readAsDataURL(file);
                        preview.style.display = "block";
                    } else {
                        preview.src = "";
                    }
                }
            </script>

            <script>
                $(document).ready(function() {
                    makeInputSelect("selAnimals");
                });
                function makeInputSelect(id) {
                    var $sel = $("#" + id);
                    var $inp = $("<input type='TEXT' id='" + id + "_input' />");
                    var selW = $sel.width();
                    var selH = $sel.height();
                    var selOff = $sel.offset();
                    $inp.width(selW);
                    //
                    $sel.click(function(event) {
                        if(event.which <= 1) { //left click
                            var offX = event.pageX - selOff.left;
                            var offY = event.pageY - selOff.top;
                            if(offX < $sel.width() - 22 && offY < selH) { // input
                                $sel.hide();
                                $inp.show().focus();
                            }
                        }
                    });
                    $sel.change(function() {
                        $inp.val($sel.val());
                    });
                    $inp.blur(function() {
                        // remove selected attribute
                        $sel.find("option:selected").attr("selected",false);
                        // remove old user input option
                        $sel.find("option[frominput=1]").remove();
                        // add and select a new user input option
                        $sel.append($("<option />").val($inp.val()).text($inp.val()).attr("frominput", 1).attr("selected", true));
                        $inp.hide();
                        $sel.show();
                    });
                    //
                    $sel.after($inp);
                    $inp.hide();
                }
            </script>

            <script>
                $(document).ready(function() {
                    makeInputSelect("selAnimals2");
                });
                function makeInputSelect(id) {
                    var $sel = $("#" + id);
                    var $inp = $("<input type='TEXT' id='" + id + "_input' />");
                    var selW = $sel.width();
                    var selH = $sel.height();
                    var selOff = $sel.offset();
                    $inp.width(selW);
                    //
                    $sel.click(function(event) {
                        if(event.which <= 1) { //left click
                            var offX = event.pageX - selOff.left;
                            var offY = event.pageY - selOff.top;
                            if(offX < $sel.width() - 22 && offY < selH) { // input
                                $sel.hide();
                                $inp.show().focus();
                            }
                        }
                    });
                    $sel.change(function() {
                        $inp.val($sel.val());
                    });
                    $inp.blur(function() {
                        // remove selected attribute
                        $sel.find("option:selected").attr("selected",false);
                        // remove old user input option
                        $sel.find("option[frominput=1]").remove();
                        // add and select a new user input option
                        $sel.append($("<option />").val($inp.val()).text($inp.val()).attr("frominput", 1).attr("selected", true));
                        $inp.hide();
                        $sel.show();
                    });
                    //
                    $sel.after($inp);
                    $inp.hide();
                }
            </script>

            <script>
                $(document).ready(function() {
                    makeInputSelect("selAnimals3");
                });
                function makeInputSelect(id) {
                    var $sel = $("#" + id);
                    var $inp = $("<input type='TEXT' id='" + id + "_input' />");
                    var selW = $sel.width();
                    var selH = $sel.height();
                    var selOff = $sel.offset();
                    $inp.width(selW);
                    //
                    $sel.click(function(event) {
                        if(event.which <= 1) { //left click
                            var offX = event.pageX - selOff.left;
                            var offY = event.pageY - selOff.top;
                            if(offX < $sel.width() - 22 && offY < selH) { // input
                                $sel.hide();
                                $inp.show().focus();
                            }
                        }
                    });
                    $sel.change(function() {
                        $inp.val($sel.val());
                    });
                    $inp.blur(function() {
                        // remove selected attribute
                        $sel.find("option:selected").attr("selected",false);
                        // remove old user input option
                        $sel.find("option[frominput=1]").remove();
                        // add and select a new user input option
                        $sel.append($("<option />").val($inp.val()).text($inp.val()).attr("frominput", 1).attr("selected", true));
                        $inp.hide();
                        $sel.show();
                    });
                    //
                    $sel.after($inp);
                    $inp.hide();
                }
            </script>

</body>
</html>
