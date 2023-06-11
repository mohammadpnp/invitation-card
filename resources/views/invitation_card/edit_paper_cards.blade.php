<!DOCTYPE html>
<html lang="fa" class="light-style layout-navbar-fixed layout-menu-fixed" dir="rtl" data-theme="theme-default"
      data-assets-path="../../assets/" data-template="vertical-menu-template">
<head>
    <meta charset="utf-8">
    <meta name="viewport"
          content="width=device-width, initial-scale=1.0, user-scalable=no, minimum-scale=1.0, maximum-scale=1.0">

    <title>اکسپومدیا | اپدیت کارت دعوت</title>

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
    <link rel="stylesheet"
          href="{{asset('/assets/vendor/libs/bootstrap-daterangepicker/bootstrap-daterangepicker.css')}}">
    <link rel="stylesheet" href="{{asset('/assets/vendor/libs/jquery-timepicker/jquery-timepicker.css')}}">

    {{--persian date picker--}}
    <link rel="stylesheet" href="https://unpkg.com/persian-datepicker@1.2.0/dist/css/persian-datepicker.css">

    <!-- Helpers -->
    <script src="{{asset('/assets/vendor/js/helpers.js')}}"></script>

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
                            <h3 class="text-center secondary-font">اپدیت کارت دعوت کاغذی</h3>
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
                    <div class="d-flex">
                        <form action="{{route('invitation-card.update.paper',$card->id)}}" method="post" enctype="multipart/form-data" class="row g-3">
                            @csrf
                            @method('PATCH')
                            <div class="col-12 col-md-4">
                                <label class="form-label" for="modalEditUserFirstName">عنوان</label>
                                <input type="text" value="{{$card->card->title}}" name="title"
                                       class="form-control">
                            </div>
                            <div class="col-12 col-md-4">
                                <label class="form-label" for="modalEditUserFirstName">نام</label>
                                <input type="text" value="{{$card->card->first_name}}" name="first_name"
                                       class="form-control">
                            </div>
                            <div class="col-12 col-md-4">
                                <label class="form-label" for="modalEditUserFirstName">نام خانوادگی</label>
                                <input type="text" value="{{$card->card->last_name}}" name="last_name"
                                       class="form-control">
                            </div>
                            <div class="col-12 col-md-4">
                                <label class="form-label" for="modalEditUserFirstName">جنسیت</label>
                                <select  name="gender" class="form-select" >
                                    <option {{$card->card->gender === \App\Models\PaperCard::MAN_GENDER ? 'selected' : ''}} value="{{\App\Models\PaperCard::MAN_GENDER}}">آقا</option>
                                    <option {{$card->card->gender === \App\Models\PaperCard::WOMAN_GENDER ? 'selected' : ''}} value="{{\App\Models\PaperCard::WOMAN_GENDER}}">خانم</option>
                                </select>
                            </div>
                            <div class="col-12 col-md-4">
                                <label class="form-label" for="modalEditUserLastName">زمان شروع رویداد</label>
                                <input type="text" class="form-control observer-example"
                                       placeholder="YYYY/mm/dd H:i"
                                       value="{{$card->card->started_at}}"
                                       name="started_at">
                            </div>
                            <div class="col-12 col-md-4">
                                <label class="form-label" for="modalEditUserLastName">زمان پایان رویداد</label>
                                <input type="text" class="form-control observer-example"
                                       placeholder="YYYY/mm/dd H:i"
                                       value="{{$card->card->finished_at}}"
                                       name="finished_at">
                            </div>
                            <div class="col-12">
                                <label class="form-label" for="modalEditTaxID">آدرس</label>
                                <input type="text" value="{{$card->card->address}}" name="address" class="form-control">
                            </div>
                            <div class="col-12">
                                <label class="form-label" for="modalEditTaxID">متن نامه</label>
                                <textarea class="form-control" name="text" cols="30" rows="10">{{$card->card->text}}</textarea>
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
                    format: 'YYYY-MM-DD HH:mm',
                    timePicker: {
                            enabled: true,
                            second : false,
                                },
                    calendar: {
                        persian: {
                            locale: 'en'
                        }
                    }
                });
            });
        </script>

</body>
</html>
