<!DOCTYPE html>
<html lang="fa" class="light-style layout-navbar-fixed layout-menu-fixed" dir="rtl" data-theme="theme-default" data-assets-path="../../assets/" data-template="vertical-menu-template">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no, minimum-scale=1.0, maximum-scale=1.0">

    <title>اکسپومدیا | مشاهده آمار</title>

    <meta name="description" content="">

    @include('common.css-links')

    <!-- Vendors CSS -->
    <link rel="stylesheet" href="{{asset('/assets/vendor/libs/datatables-bs5/datatables.bootstrap5.css')}}">
    <link rel="stylesheet" href="{{asset('/assets/vendor/libs/datatables-responsive-bs5/responsive.bootstrap5.css')}}">
    <link rel="stylesheet" href="{{asset('/assets/vendor/libs/datatables-buttons-bs5/buttons.bootstrap5.css')}}">
    <link rel="stylesheet" href="{{asset('/assets/vendor/libs/select2/select2.css')}}">
    <link rel="stylesheet" href="{{asset('/assets/vendor/libs/formvalidation/dist/css/formValidation.min.css')}}">

    <!-- Page CSS -->

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
{{--            @include('admin.common.header')--}}


            <!-- Content wrapper -->
            <div class="content-wrapper">
                <!-- Content -->

                <div class="container-fluid  flex-grow-1 container-p-y">

                    <!-- Users List Table -->
                    <div class="card">
                        {{--Table header--}}
                        <div class="d-flex justify-content-between border-bottom p-3 ">
                                <h5 class="col-10 card-title m-0 ps-4">مشاهده آمار کارت : {{$card->title}}</h5>
                        </div>
                        {{--/Table header--}}
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
                        <style>
                            td {
                                padding: 5px !important;
                            }
                        </style>
                        {{--Table body--}}
                        <div class="card">
                            <div class="card-datatable table-responsive pt-0">
                                <table class="datatables-basic table table-bordered">
                                    <thead>
                                    <tr class="text-center">
                                        <th>شناسه</th>
                                        <th>نام کاربر</th>
                                        <th>موبایل</th>
                                        <th>آدرس</th>
                                        <th>زمان حضور</th>
                                        <th>یادداشت</th>
                                    </tr>
                                    </thead>
                                    <tbody class="table-border-bottom-0">
                                    @foreach($card->surveys as $survey)
                                        <tr class="text-center">
                                            <td>
                                                <span class="fw-semibold">{{$survey->id}}</span>
                                            </td>
                                            <td>
                                                <span class="fw-semibold">{{$survey->user->first_name .' '. $survey->user->last_name}}</span>
                                            </td>
                                            <td>
                                                <div class="d-flex flex-column">
                                                    <span class="fw-semibold">{{$survey->user->mobile ?? null}}</span>
                                                    <small class="text-muted">{{$survey->user->email ?? null}}</small>
                                                </div>
                                            </td>
                                            <td>
                                            <span class="fw-semibold">
                                                {{$survey->user->address ?? null}}
                                            </span>
                                            </td>
                                            <td>
                                                <div class="d-flex flex-column">
                                                    @if($survey->is_participate)
                                                        <span class="fw-semibold"><i class='h2 m-0 bx bx-checkbox{{$survey->is_participate ? '-checked' : ''}}'></i></span>
                                                    @endif
                                                    <span class="fw-semibold">@if($survey->come_datetime) {{jdate($survey->come_datetime)}} @endif</span>
                                                </div>
                                            </td>
                                            <td>
                                                <span class="fw-semibold">{{$survey->note ?? null}}</span>
                                            </td>
                                        </tr>
                                    @endforeach

                                    </tbody>
                                    <tfoot>
                                    <tr class="text-center">
                                        <th>شناسه</th>
                                        <th>نام کاربر</th>
                                        <th>موبایل</th>
                                        <th>آدرس</th>
                                        <th>زمان حضور</th>
                                        <th>یادداشت</th>
                                    </tr>
                                    </tfoot>
                                </table>
                            </div>
                        </div>
                        {{--/Table body--}}
                        <!-- Delete user modal -->
                        <div class="modal fade" id="deleteModal" tabindex="-1" aria-hidden="true">
                            <div class="modal-dialog modal-dialog-centered1 modal-simple modal-add-new-cc">
                                <div class="modal-content p-3 p-md-5">
                                    <div class="modal-body">
                                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                        <div class="text-center mb-4">
                                            <h4>این تگ از تمام مقالات و بیماری ها حذف خواهد شد.</h4>
                                            <h5>آیا از انجام این عملیات مطمئن هستید؟</h5>
                                        </div>
                                        <div class="col-12 text-center mt-4">
                                            <form  id="deleteModalForm" method="post">
                                                @csrf
                                                @method('DELETE')
                                                <a href="" class="btn-ok"></a>
                                                <button type="submit" class="btn btn-danger me-sm-3 me-1">حذف</button>
                                                <button type="reset" class="btn btn-label-secondary btn-reset" data-bs-dismiss="modal" aria-label="Close">
                                                    انصراف
                                                </button>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {{--/Delete user modal--}}

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


        <!-- Page JS -->
        {{--    <script src="{{asset('/assets/js/tables-datatables-extensions.js')}}"></script>--}}
        <script src="{{asset('/assets/js/modal-edit-user.js')}}"></script>
        <script src="{{asset('/assets/js/modal-add-new-cc.js')}}"></script>



</body>
</html>
