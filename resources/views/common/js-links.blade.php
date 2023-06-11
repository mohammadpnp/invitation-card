
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
<!-- endbuild -->

<!-- Main JS -->
<script src="{{asset('/assets/js/main.js')}}"></script>

<!-- Toastr -->
<link rel="stylesheet" type="text/css" href="{{asset('assets/css/plugins/extensions/toastr.min.css')}}">
<script src="{{asset('assets/vendor/js/extensions/toastr.min.js')}}"></script>

<script src="{{ asset('js/app.js') }}"></script>
<script>
    Echo.channel('notification-channel')
        .listen('.notification', (data) => {
            toastr.options = {
                "positionClass": "toast-bottom-right",
                "timeOut": "10000"
            };
            toastr.success(data.message, data.title);
        });
</script>
