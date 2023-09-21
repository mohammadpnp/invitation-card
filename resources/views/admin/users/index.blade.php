<!DOCTYPE html>
<html lang="fa" class="light-style layout-navbar-fixed layout-menu-fixed" dir="rtl" data-theme="theme-default" data-assets-path="../../assets/" data-template="vertical-menu-template">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no, minimum-scale=1.0, maximum-scale=1.0">

    <title>های طب | لیست کارمندان</title>

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

                <div class="card">

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
                                    <th>ردیف</th>
                                    <th>کاربر</th>
                                    <th>شماره موبایل</th>
                                    <th>ایمیل</th>
                                    <th></th>
                                </tr>
                                </thead>
                                <tbody class="table-border-bottom-0">
                                @foreach($users as $user)
                                    <tr class="text-center">
                                        <td>
                                            <span class="fw-semibold">{{$user->id}}</span>
                                        </td>
                                        <td>
                                            <div class="d-flex justify-content-start align-items-center user-name">

                                                <div class="d-flex flex-column justify-content-center w-100">
                                                    <span class="text-body text-truncate">
                                                        <a href="{{route('users.show',$user->id)}}" class="text-body text-truncate">
                                                        <span class="fw-semibold"> {{$user['first_name'] . ' ' . $user['last_name']}}</span>
                                                        </a>
                                                    </span>
                                                    @can('create' , \App\Models\Ticket::class)
                                                    <small class="text-muted d-flex justify-content-center" data-toggle="tooltip" data-placement="top" title="{{__('messages.attributes.ticket')}}">
                                                        <form action="{{route('ticket-list.create')}}" method="get">
                                                            <input name="user_type" type="hidden" value="{{$user->getMorphClass()}}">
                                                            <input name="user_id" type="hidden" value="{{$user->id}}">
                                                            <button class="btn p-0 text-body"><i class='bx bx-mail-send me-1'></i></button>
                                                        </form>
                                                        @endcan

                                                    </small>
                                                </div>
                                            </div>
                                        </td>

                                        <td>
                                            <span class="fw-semibold">{{$user['mobile']}}</span>
                                        </td>

                                        <td>
                                            <span class="fw-semibold">{{$user['email']}}</span>
                                        </td>

                                        <td>
                                            <div class="d-inline-block text-nowrap">
                                                <a href="{{route('users.edit',$user->id)}}" class="btn btn-sm btn-icon">
                                                    <i class="h3 m-0 bx bx-edit" data-toggle="tooltip" data-placement="top" title="{{__('messages.attributes.edit')}}"></i>
                                                </a>
                                            </div>
                                        </td>
                                    </tr>
                                @endforeach

                                </tbody>

                            </table>
                            <div class="my-3 mx-auto paginate">
                                <style> .pagination{justify-content: center} </style>
                                {!! $users->links() !!}
                            </div>
                        </div>
                    </div>
                {{--/Table body--}}

            <!-- / Content -->
                    <!-- Create User Modal -->
                    <div class="modal fade" id="editUser" tabindex="-1" aria-hidden="true">
                        <div class="modal-dialog modal-lg modal-simple modal-edit-user">
                            <div class="modal-content p-3 p-md-5">
                                <div class="modal-body">
                                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                    <div class="text-center mb-4">
                                        <h3 class="secondary-font">ایجاد کارمند جدید</h3>
                                    </div>
                                    <form action="{{route('users.store')}}" method="post" class="row g-3" enctype="multipart/form-data">
                                        @csrf
                                        <div class="col-12 col-md-6">
                                            <label class="form-label" for="modalEditUserFirstName">نام</label>
                                            <input type="text" value="{{old('first_name')}}"  name="first_name" class="form-control">
                                        </div>
                                        <div class="col-12 col-md-6">
                                            <label class="form-label" for="modalEditUserLastName">نام خانوادگی</label>
                                            <input type="text" value="{{old('last_name')}}"  name="last_name" class="form-control">
                                        </div>
                                        <div class="col-12 col-md-6">
                                            <label class="form-label" for="modalEditUserName">شماره موبایل</label>
                                            <input type="text" value="{{old('mobile')}}" name="mobile" class="form-control text-start" dir="ltr">
                                        </div>
                                        <div class="col-12 col-md-6">
                                            <label class="form-label" for="modalEditTaxID">آدرس ایمیل</label>
                                            <input type="text" value="{{old('email')}}" name="email" class="form-control" >
                                        </div>
                                        <div class="col-12 col-md-6">
                                            <label class="form-label" for="modalEditUserEmail">کد ملی</label>
                                            <input type="text" value="{{old('national_code')}}" name="national_code" class="form-control text-start" dir="ltr">
                                        </div>
                                        <div class="col-12 col-md-6">
                                            <label class="form-label" for="modalEditUserStatus">وضعیت</label>
                                            <select name="status" class="form-select" >
                                                <option {{ old('status') == 1 ? 'selected' : '' }} value="1">تایید شده</option>
                                                <option {{ old('status') == 2 ? 'selected' : '' }} value="2">در انتظار</option>
                                                <option {{ old('status') == 3 ? 'selected' : '' }} value="3">رد شده</option>
                                                <option {{ old('status') == 4 ? 'selected' : '' }} value="4">مسدود شده</option>
                                            </select>
                                        </div>
                                        <div class="col-12 col-md-6">
                                            <label class="form-label" for="modalEditUserEmail">تاریخ تولد</label>
                                            <input type="text" value="{{old('birthdate')}}" class="form-control" name="birthdate" id="flatpickr-date">
                                            <span style="opacity: 0;height:1px;display: block">++2022-09-09++</span>
                                        </div>
                                        <div class="col-12 col-md-6">
                                            <label class="form-label" for="modalEditTaxID">جنسیت</label>
                                            <select  name="gender" class="form-select" >
                                                <option {{ old('gender') === '1' ? 'selected' : '' }} value="1">آقا</option>
                                                <option {{ old('gender') === '2' ? 'selected' : '' }} value="2">خانم</option>
                                            </select>
                                        </div>
                                        <div class="col-12">
                                            <label class="form-label" >تصویر پروفایل</label>
                                            <input type="file" name="picture" class="form-control" accept="image/png, image/jpeg">
                                        </div>
                                        <div class="col-12 text-center mt-4">
                                            <button type="submit" class="btn btn-primary me-sm-3 me-1">ثبت</button>
                                            <button type="reset" class="btn btn-label-secondary" data-bs-dismiss="modal" aria-label="Close">
                                                انصراف
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!--/ Edit User Modal -->


                    <!-- Delete user modal -->
                    <div class="modal fade" id="addNewCCModal" tabindex="-1" aria-hidden="true">
                        <div class="modal-dialog modal-dialog-centered1 modal-simple modal-add-new-cc">
                            <div class="modal-content p-3 p-md-5">
                                <div class="modal-body">
                                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                    <div class="text-center mb-4">
                                        <h3 class="secondary-font">بلاک کردن کاربر</h3>
                                        <p>آیا از انجام این عملیات مطمئن هستید؟</p>
                                    </div>
                                    <form id="addNewCCForm" class="row g-3" onsubmit="return false">
                                        <div class="col-12 text-center mt-4">
                                            <button type="submit" class="btn btn-danger me-sm-3 me-1">بلاک</button>
                                            <button type="reset" class="btn btn-label-secondary btn-reset" data-bs-dismiss="modal" aria-label="Close">
                                                انصراف
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                    {{--/Delete user modal--}}


                </div>
                <!-- Content wrapper -->
            </div>
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

          {{--persian calender--}}
          <script src={{asset('/assets/vendor/libs/moment/moment.js')}}"></script>
            <script src="{{asset('/assets/vendor/libs/jdate/jdate.js')}}"></script>
          <script src="{{asset('/assets/vendor/libs/flatpickr/flatpickr-jdate.js')}}"></script>
          <script src="{{asset('/assets/vendor/libs/flatpickr/l10n/fa-jdate.js')}}"></script>
          <script src="{{asset('/assets/vendor/libs/bootstrap-datepicker/bootstrap-datepicker.js')}}"></script>
          <script src="{{asset('/assets/js/forms-pickers.js')}}"></script>


  </body>
</html>
