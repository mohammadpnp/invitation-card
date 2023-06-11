<aside id="layout-menu" class="layout-menu menu-vertical menu bg-menu-theme">
    <div class="app-brand demo pt-3">
        <a href="index.html" class="app-brand-link">
            <img class="h-px-50" src="{{asset('/assets/img/icons/brands/hiteb-tree-icon.png')}}">
            <img class="h-px-50 ps-2" src="{{asset('/assets/img/icons/brands/hiteb-text-icon.png')}}">

        </a>

        <a href="javascript:void(0);" class="layout-menu-toggle menu-link text-large ms-auto">
            <i class="bx menu-toggle-icon d-none d-xl-block fs-4 align-middle text-info"></i>
            <i class="bx bx-x d-block d-xl-none bx-sm align-middle"></i>
        </a>
    </div>

    <div class="menu-divider mt-0"></div>

    <div class="menu-inner-shadow"></div>

    {{--pages--}}
    <ul class="menu-inner py-4">

        <li class="menu-item @if(Request::route()->getName() == 'invitation-card.index'){{'active open'}}@endif">
            <a href="javascript:void(0);" class="menu-link menu-toggle">
                <i class="menu-icon tf-icons bx bx-envelope"></i>
                <div>مدیریت کارت دعوت </div>
            </a>
            <ul class="menu-sub">
                <li class="menu-item
                      @if(Request::route()->getName() == 'invitation-card.index') {{'active'}}
                @endif ">
                    <a href="{{route('invitation-card.index')}}" class="menu-link">
                        <i class="menu-icon tf-icons bx bx-list-ul"></i>
                        <div>لیست کارت های دعوت </div>
                    </a>
                </li>
            </ul>
        </li>



        <li class="menu-item
              @if(Request::route()->getName() == 'test-request.index') {{'active'}}
        @endif ">
            <a href="" class="menu-link">
                <i class="menu-icon tf-icons bx bxl-pocket"></i>
                <div>پیشخوان</div>
            </a>
        </li>
        <li class="menu-item
              @if(Request::route()->getName() == 'request-map') {{'active'}}
        @endif ">
            <a href="" class="menu-link">
                <i class="menu-icon tf-icons bx bxs-user"></i>
                <div>مشخصات کاربری</div>
            </a>
        </li>


        {{--exit--}}
        <li class="menu-item" style="cursor: pointer">
            <a data-bs-toggle="modal" data-bs-target="#logoutModal" class="menu-link">
                <i class="menu-icon tf-icons bx bx-exit"></i>
                <div>خروج کاربر</div>
            </a>
        </li>

    </ul>
    </li>
    </ul>
</aside>


<!-- Exit user modal -->
<div class="modal fade" id="logoutModal" tabindex="-1" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered1 modal-simple modal-add-new-cc">
        <div class="modal-content p-3 p-md-5">
            <div class="modal-body">
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                <div class="text-center mb-4">
                    <h4>خروج از حساب کاربری</h4>
                    <h5>آیا از انجام این عملیات مطمئن هستید ؟</h5>
                </div>
                <div class="col-12 text-center mt-4">
                    <form id="deleteModalForm" method="post" action="{{route('logout')}}">
                        @csrf
                        <a href="" class="btn-ok"></a>
                        <button type="submit" class="btn btn-danger me-sm-3 me-1">خروج</button>
                        <button type="reset" class="btn btn-label-secondary btn-reset" data-bs-dismiss="modal"
                                aria-label="Close">
                            انصراف
                        </button>
                    </form>
                </div>
            </div>
        </div>
    </div>
</div>
{{--/Exit user modal--}}


<script src="{{asset('/assets/js/modal-add-new-cc.js')}}"></script>
