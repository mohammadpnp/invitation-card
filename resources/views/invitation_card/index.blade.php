<!DOCTYPE html>
<html lang="fa" class="light-style layout-navbar-fixed layout-menu-fixed" dir="rtl" data-theme="theme-default" data-assets-path="../../assets/" data-template="vertical-menu-template">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no, minimum-scale=1.0, maximum-scale=1.0">

    <title>اکسپو مدیا | لیست کارت ها</title>

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
        {{-- @include('common.header') --}}


          <!-- Content wrapper -->
            <div class="content-wrapper">
                <!-- Content -->

                <div class="container-xxl flex-grow-1 container-p-y">
                    <h4 class="py-3 breadcrumb-wrapper mb-2">لیست کارت های دعوت</h4>

                    <p>
                        یک نقش، دسترسی به منوها و امکانات از پیش تعریف شده را فراهم می کند که <br>
                        بر اساس نقش اختصاص یافته، مدیر می تواند دسترسی های مورد نیاز کاربر را ایجاد کند.
                    </p>
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
                    <!-- Role cards -->
                    <div class="row g-4">
                        @foreach($data as $card)
                        <div class="col-xl-4 col-lg-6 col-md-6 h-100">
                            <div class="card">
                                <div class="card-body">
                                    <div class="d-flex justify-content-center align-items-center flex-column">
                                        @if($card->card_type == \App\Models\PaperCard::class)
                                            <i class=" m-0 bx bx-envelope"></i>
                                        @endif
                                        <h6 class="fw-normal">عنوان :  {{$card->title}}</h6>
                                        <div class="d-flex flex-row">
                                            <a target="_blank" href="{{route('invitation-card.show',$card->url)}}" class="btn btn-info mb-2">
                                                پیش نمایش
                                            </a>
                                            @if($card->card_type == \App\Models\PaperCard::class)
                                                <a href="" class="btn btn-label-warning mb-2 ms-2">
                                                    دانلود pdf
                                                </a>
                                            @else
                                            @if($card->status == \App\Models\InvitationCard::CREATED_STATUS)
                                                <button class="btn btn-warning mb-2 ms-2" data-bs-toggle="modal" data-bs-target="#sendNotifModal" data-href="{{route('invitation-card.confirm-request',$card->id)}}">
                                                    درخواست انتشار
                                                </button>
                                            @elseif($card->status == \App\Models\InvitationCard::WAITING_CONFIRM_STATUS)
                                                <button class="btn btn-secondary mb-2 ms-2" disabled>
                                                    در انتظار تایید
                                                </button>
                                            @elseif($card->status == \App\Models\InvitationCard::CONFIRMED_STATUS)
                                                <button value="{{env('APP_URL').'/user/'.$card->url}}" onclick="copy(this)" class="btn btn-success mb-2 ms-2">
                                                    کپی لینک
                                                </button>
                                            @elseif($card->status == \App\Models\InvitationCard::WAITING_EDIT_CONFIRM_STATUS)
                                                <button class="btn-sm btn-label-secondary mb-2 ms-2" disabled>
                                                    در انتظار تایید تغییرات
                                                </button>
                                            @endif
                                            @endif
                                        </div>
                                        @if($card->status == \App\Models\InvitationCard::CONFIRMED_STATUS)
                                            <input id="link" type="text" value="{{env('APP_URL').'/user/'.$card->url}}" class="form-control text-center" disabled>
                                        @endif
                                            <div class="d-flex mt-2">
                                                @if($card->status == \App\Models\InvitationCard::CREATED_STATUS || $card->status == \App\Models\InvitationCard::CONFIRMED_STATUS)
                                                    @if($card->card_type == \App\Models\WeddingCard::class)
                                                        <a href="{{route('invitation-card.edit.wedding',$card->id)}}" class="btn btn-sm btn-icon">
                                                            <i class="h3 m-0 bx bx-edit" data-toggle="tooltip" data-placement="top" title="{{__('messages.attributes.edit')}}"></i>
                                                        </a>
                                                    @elseif($card->card_type == \App\Models\PaperCard::class)
                                                        <a href="{{route('invitation-card.edit.paper',$card->id)}}" class="btn btn-sm btn-icon">
                                                            <i class="h3 m-0 bx bx-edit" data-toggle="tooltip" data-placement="top" title="{{__('messages.attributes.edit')}}"></i>
                                                        </a>
                                                    @endif
                                                @endif
                                                <button class="btn btn-sm btn-icon delete-record" data-bs-toggle="modal" data-bs-target="#deleteModal" data-href="{{route('invitation-card.destroy.wedding',$card->id)}}">
                                                    <i class="h3 m-0 bx bx-trash" data-toggle="tooltip" data-placement="top" title="{{__('messages.attributes.delete')}}"></i>
                                                </button>
                                                    @if($card->card_type == \App\Models\WeddingCard::class)
                                                        <a href="{{route('invitation-card.show-survey',$card->id)}}" class="btn btn-sm btn-icon">
                                                            <i class="h3 m-0 bx bx-show" data-toggle="tooltip" data-placement="top" title="{{'مشاهده آمار'}}"></i>
                                                        </a>
                                                    @endif
                                            </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        @endforeach
                            <div class="col-xl-4 col-lg-6 col-md-6">
                                <div class="card h-100">
                                    <div class="row h-100">
                                        <div class="col-sm-5">
                                            <div class="d-flex align-items-end h-100 justify-content-center mt-sm-0 mt-3">
                                                <img src="{{asset('/assets/img/illustrations/lady-with-laptop-light.png')}}" class="img-fluid" alt="Image" width="100" data-app-light-img="illustrations/lady-with-laptop-light.png" data-app-dark-img="illustrations/lady-with-laptop-dark.png">
                                            </div>
                                        </div>
                                        <div class="col-sm-7">
                                            <div class="card-body text-sm-end text-center ps-sm-0">
                                                <button data-bs-target="#addRoleModal" data-bs-toggle="modal" class="btn btn-primary mb-3 text-nowrap add-new-role">
                                                    افزودن کارت جدید
                                                </button>
                                                <p class="mb-0">اگر کارتی وجود ندارد اضافه کنید</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                    </div>
                </div>

            <!-- / Content -->
                <!-- Add Role Modal -->
                <div class="modal fade" id="addRoleModal" tabindex="-1" aria-hidden="true">
                    <div class="modal-dialog modal-lg modal-dialog-centered modal-add-new-role">
                        <div class="modal-content p-3 p-md-5">
                            <button type="button" class="btn-close btn-pinned" data-bs-dismiss="modal" aria-label="Close"></button>
                            <div class="modal-body">
                                <div class="text-center mb-4">
                                    <h3 class="role-title">افزودن کارت دعوت جدید</h3>
                                    <p>لطفا نوع کارت دعوت خود را انتخاب نمایید</p>
                                </div>
                                <!-- Add role form -->
                                <form action="{{route('invitation-card.create')}}" class="row g-3 justify-content-center" method="get" action="">
                                    @csrf
                                    {{-- @method('GET') --}}
                                    <div class="col-12 col-md-4">
                                        <img class="rounded w-3 h-3" src="{{asset('/assets/img/products/wedding.jpeg')}}" width="200px" height="200px">
                                        <div class="text-center mt-2">
                                            <input type="radio" id="card1" name="card" value="{{App\Models\WeddingCard::class}}">
                                            <label for="card1">کارت دعوت نمایشگاه</label>
                                        </div>
                                    </div>
                                    <div class="col-12 col-md-4">
                                        <img class="rounded w-3 h-3" src="{{asset('/assets/img/products/paper.jpeg')}}" width="200px" height="200px">
                                        <div class="text-center mt-2">
                                            <input type="radio" id="card2" name="card" value="{{\App\Models\PaperCard::class}}">
                                            <label for="card2">کارت دعوت کاغذی</label>
                                        </div>
                                    </div>
                                    <div class="col-12 text-center">
                                        <button type="submit" class="btn btn-primary me-sm-3 me-1">ثبت</button>
                                        <button type="reset" class="btn btn-label-secondary" data-bs-dismiss="modal" aria-label="Close">
                                            انصراف
                                        </button>
                                    </div>
                                </form>
                                <!--/ Add role form -->
                            </div>
                        </div>
                    </div>
                </div>
                <!--/ Add Role Modal -->


                    <!-- Delete user modal -->
                    <div class="modal fade" id="deleteModal" tabindex="-1" aria-hidden="true">
                        <div class="modal-dialog modal-dialog-centered1 modal-simple modal-add-new-cc">
                            <div class="modal-content p-3 p-md-5">
                                <div class="modal-body">
                                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                    <div class="text-center mb-4">
                                        <h4>با حذف کردن این کارت تمام اطلاعات پاک خواهند شد و کارت دیگر قابل نمایش نیست</h4>
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


                <div class="modal fade" id="sendNotifModal" tabindex="-1" aria-hidden="true">
                    <div class="modal-dialog modal-dialog-centered1 modal-simple modal-add-new-cc">
                        <div class="modal-content p-3 p-md-5">
                            <div class="modal-body">
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                <div class="text-center mb-4">
                                    <h3 class="secondary-font">درخواست انتشار کارت دعوت</h3>
                                </div>
                                <div class="col-12 text-center mt-4">
                                    <form  id="deleteModalForm" >
                                        @csrf
                                        <a href="" class="btn-ok"></a>
                                        <h5>درخواست شما برای ادمین های ما ارسال خواهد شد و آن را بررسی میکنند.</h5>
                                        <button type="submit" class="btn btn-primary me-sm-3 me-1">ارسال</button>
                                        <button type="reset" class="btn btn-label-secondary btn-reset" data-bs-dismiss="modal" aria-label="Close">
                                            انصراف
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
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

        <script>
            $('#sendNotifModal').on('show.bs.modal', function(e) {
                $(this).find('#deleteModalForm').attr('action', $(e.relatedTarget).data('href'));
            });
        </script>

        <script>
            function copy(that){
                var inp =document.createElement('input');
                document.body.appendChild(inp)
                inp.value =that.value
                inp.select();
                document.execCommand('copy',false);
                inp.remove();
                that.innerText = 'کپی شد!';
            }
        </script>

  </body>
</html>
