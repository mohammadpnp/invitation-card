
<!DOCTYPE html>
<html style="background-color: orange" lang="fa" class="light-style layout-navbar-fixed layout-menu-fixed h-100" dir="rtl" data-theme="theme-default" data-assets-path="../../assets/" data-template="vertical-menu-template">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no, minimum-scale=1.0, maximum-scale=1.0">

    <title>اکسپو مدیا | مشاهده کارت ها</title>

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

     {{--map--}}
      <link href="https://static.neshan.org/sdk/leaflet/1.4.0/leaflet.css" rel="stylesheet" type="text/css">
      <script src="https://static.neshan.org/sdk/leaflet/1.4.0/leaflet.js" type="text/javascript"></script>

       {{--persian calender--}}
      <link rel="stylesheet" href="{{asset('/assets/vendor/libs/flatpickr/flatpickr.css')}}">
      <link rel="stylesheet" href="{{asset('/assets/vendor/libs/bootstrap-datepicker/bootstrap-datepicker.css')}}">
      <link rel="stylesheet" href="{{asset('/assets/vendor/libs/bootstrap-daterangepicker/bootstrap-daterangepicker.css')}}">
      <link rel="stylesheet" href="{{asset('/assets/vendor/libs/jquery-timepicker/jquery-timepicker.css')}}">

  <script src="https://code.jquery.com/jquery-3.5.1.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.29.1/moment.min.js"></script>

    <style>
        .outline {
            color: white;
            text-shadow: -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000;
        }

         .outline2 {
            color: black;
            text-shadow: -.5px -.5px 0 #000, .5px -.5px 0 #000, -.5px .5px 0 #000, .5px .5px 0 #000;
        }

        @font-face {
              font-family: laleh;
              src: url('/assets/font/AFarzian2.ttf');
              font-weight: normal;
              font-style: normal;
                  }

        @font-face {
              font-family: armita;
              src: url('/assets/font/Lalezar-Regular.ttf');
              font-weight: normal;
              font-style: normal;
                  }

         .img {
              width: 100%;
              height: 100vh; /* 100% of viewport height */
              object-fit: cover; /* preserves aspect ratio */
              overflow-y: auto; /* enables vertical scrolling */
                max-width: 100%;
            }

        #notification {
            display: none;
            position: fixed;
            top: 0;
            right: 0;
            /*transform: translateX(-50%);*/
            z-index: 9999;
        }

    </style>

  </head>
<body class="h-100">
@if ($errors->any())
    <div id="notification" class="px-5 py-3 m-2 bg-danger rounded text-white h4">
        <ul class="m-0">
            @foreach ($errors->all() as $error)
                <li>{{ $error }}</li>
            @endforeach
        </ul>
    </div>
@endif
@if(session()->has('message'))
    <div id="notification" class="px-5 py-3 m-2 bg-success rounded text-white h4">
    {{ session()->get('message') }}
    </div>
@endif



  {{-- first page --}}
    <div class=" position-relative">

      {{-- tilte --}}
        <p style="font-family : laleh;font-size: 4rem" class="h1 w-100 text-center text-warning m-auto position-absolute translate-middle-x start-50 outline mt-5" >{{$invitationCard->card->title}}</p>

        {{-- main image --}}
        <img src="{{$invitationCard->card->header_picture_url}}" class="img" >

        {{-- timer --}}
        <span style="background-color:rgba(255, 255, 255, 0.7);" class=" m-auto position-absolute top-50 start-50 translate-middle h1 rounded py-4 w-25 text-center ">
          <div class="row justify-content-center">
            <span class="h4 text-warning outline2">زمان باقی مانده تا شروع رویداد :</span>
            <!-- wherever you want the countdown timer to appear -->
            <div class="d-flex w-100 justify-content-center flex-wrap gap-3">
            <span id="d" class="col-2 m-0 h5 text-warning outline2"></span>
            <span id="h" class="h5  m-0 col-2 text-warning outline2"></span>
            <span id="m" class="h5  m-0 col-2 text-warning outline2"></span>
            <span id="s" class="h5  m-0 col-2 text-warning outline2"></span>
            <span class="col-2 h5  m-0 text-warning outline2">روز</span>
            <span class="h5 col-2  m-0 text-warning outline2">ساعت</span>
            <span class="h5 col-2  m-0 text-warning outline2">دقیقه</span>
            <span class="h5 col-2  m-0 text-warning outline2">ثانیه</span>
            </div>

          </div>
        </span>

    </div>

    {{-- description --}}
    <div class="d-flex justify-content-center my-5">
      <span style="font-size: 2rem ; line-height: 200%" class="bg-white rounded w-75 text-center p-5">{{$invitationCard->card->description}}</span>
    </div>

    {{-- time --}}
    <div style="background-color: #a500ff" class="w-100 p-5">
      <div class="d-flex justify-content-evenly">
        <div style="font-family : armita;" class="col-4 h1 d-flex flex-column">
          <span class=" text-warning text-center">تاریخ شروع :</span>
          <span class=" text-warning text-center">{{jdate($invitationCard->card->started_at)->format('l j F Y')}}</span>
          <span class=" text-warning text-center">{{jdate($invitationCard->card->started_at)->format('H:i')}}</span>
        </div>
        <div style="font-family : armita;" class="col-4 h1 d-flex flex-column">
          <span class=" text-warning text-center">تاریخ پایان :</span>
          <span class=" text-warning text-center">{{jdate($invitationCard->card->finished_at)->format('l j F Y')}}</span>
          <span class=" text-warning text-center">{{jdate($invitationCard->card->finished_at)->format('H:i')}}</span>
        </div>
      </div>
    </div>

{{-- map --}}
       <h3 class="text-center mt-5 text-danger outline2">مکان برگزاری :</h3>
          <div id="map" class="rounded w-75" style="margin: auto; height: 20rem; background: #eee; border: 2px solid #aaa;"></div>


          @if($invitationCard->card->have_survey)
          {{-- border --}}
          <div class="d-flex justify-content-center my-5">
            <img src="{{asset('/assets/img/border.png')}}" alt="">
          </div>


          {{-- survey --}}
       <h4 style="color: #343a40;vertical-align: middle;" class="text-center mt-5">از اینکه نظرسنجی مارا تکمیل میکنید سپاسگزاریم &#129321;</h4>
          <div style="background-color: #af1812" class="d-flex w-50 rounded p-3 m-auto justify-content-center my-5 text-warning">
             <form @if(Request::route()->getName() == 'user.show.card') action="{{route('user.submit-survey',$invitationCard->id)}}" method="post" @endif class="row g-3">
                            @csrf
                            @method('POST')
                            <div class="col-12 col-md-6">
                                <label class="form-label" for="modalEditUserFirstName">آیا در این رویداد شرکت میکنید؟</label>
                                <select id="select2Basic3" name="is_participate" class="select2 form-select form-select-md" data-allow-clear="true">
                                                <option  value="1">شرکت میکنم</option>
                                                <option  value="0">شاید در فرصتی دیگر</option>
                                        </select>
                            </div>
                            <div class="col-12 col-md-6">
                                <label class="form-label" for="modalEditUserLastName">زمان تشریف فرمایی</label>
                                  <input type="text" class="form-control"
                                       name="come_datetime" id="flatpickr-datetime">
                            </div>
                            <div class="col-12">
                                <label class="form-label" for="modalEditUserLastName">یادداشت شما</label>
                                 <textarea name="note" class="form-control" cols="10" rows="1"></textarea>
                            </div>
                               <div class="col-12 text-center mt-4">
                                <button type="submit" class="btn btn-primary me-sm-3 me-1">ثبت</button>
                               </div>
             </form>

          </div>
@endif

{{-- footer --}}
    <div style="background-color: #343a40 ; height: 10rem" class="w-100 p-5 mt-5">
      <h2 style="font-family:laleh" class="text-center text-light">طراحی شده توسط تیم فنی اکسپومدیا</h2>
    </div>


      {{--persian calender--}}
        <script src={{asset('/assets/vendor/libs/moment/moment.js')}}"></script>
        <script src="{{asset('/assets/vendor/libs/jdate/jdate.js')}}"></script>
        <script src="{{asset('/assets/vendor/libs/flatpickr/flatpickr-jdate.js')}}"></script>
        <script src="{{asset('/assets/vendor/libs/flatpickr/l10n/fa-jdate.js')}}"></script>
        <script src="{{asset('/assets/vendor/libs/bootstrap-datepicker/bootstrap-datepicker.js')}}"></script>
        <script src="{{asset('/assets/js/forms-pickers.js')}}"></script>

 {{--map js--}}
        <script>
            var myMap = new L.Map('map', {
                key: 'web.359f1fc59e134fa196ab318cba9b05d9',
                scrollWheelZoom: false,
                maptype: 'dreamy',
                poi: true,
                traffic: false,
                center: [{{$invitationCard->card->lat}}, {{$invitationCard->card->lng}}],
                zoom: 14
            });
            var marker = L.marker([{{$invitationCard->card->lat}}, {{$invitationCard->card->lng}}]).addTo(myMap);
        </script>


<script>
// get the end time parameter from Laravel
var endTime = "{{ $invitationCard->card->started_at }}"; // assuming $endTime is the variable holding the end time value in Y-m-d H:i:s format

// parse the end time string using moment.js
var endMoment = moment(endTime, "YYYY-MM-DD HH:mm:ss");

// calculate the remaining time in milliseconds
var remainingTime = endMoment.diff(moment());

if(remainingTime > 0){

// update the countdown timer every second
setInterval(function() {
  // calculate remaining time in seconds, minutes, and hours
  var remainingSeconds = Math.floor((remainingTime / 1000) % 60);
  var remainingMinutes = Math.floor((remainingTime / 1000 / 60) % 60);
  var remainingHours = Math.floor((remainingTime / (1000 * 60 * 60)) % 24);
  var remainingDays = Math.floor(remainingTime / (1000 * 60 * 60 * 24));;

  // update the countdown display HTML
   document.getElementById("s").innerHTML = remainingSeconds ;
  document.getElementById("m").innerHTML = remainingMinutes ;
  document.getElementById("h").innerHTML = remainingHours ;
  document.getElementById("d").innerHTML = remainingDays ;
  // document.getElementById("d").innerHTML = days ;

  // subtract 1 second from remaining time
  remainingTime -= 1000;
}, 1000);
}else{
    document.getElementById("s").innerHTML = 0 ;
  document.getElementById("m").innerHTML = 0 ;
  document.getElementById("h").innerHTML = 0 ;
  document.getElementById("d").innerHTML = 0 ;

}
</script>

<script>
    // Show notification
    $('#notification').fadeIn();

    // Hide notification after 3 seconds
    setTimeout(function() {
        $('#notification').fadeOut();
    }, 3000);

</script>
</body>
</html>
