
<!DOCTYPE html>
<html lang="fa" class="light-style layout-navbar-fixed layout-menu-fixed h-100" dir="rtl" data-theme="theme-default" data-assets-path="../../assets/" data-template="vertical-menu-template">
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
              src: url('/assets/font/IranNastaliq.ttf');
              font-weight: normal;
              font-style: normal;
                  }

        @font-face {
              font-family: armita;
              src: url('/assets/font/Armita.ttf');
              font-weight: normal;
              font-style: normal;
                  }

         .img {
              /*width: 100%;*/
             margin: auto;
              height: 100vh; /* 100% of viewport height */
              object-fit: cover; /* preserves aspect ratio */
              overflow-y: auto; /* enables vertical scrolling */
                max-width: 100%;
             z-index: -1;
            }
         html body {
            background-color: rgba(129, 124, 123, 0.45)
         }

         .text-gold {
             color : #f9f2a6;
         }

    </style>

  </head>
<body class="h-100">
  {{-- first page --}}
    <div class=" position-relative">

        {{-- main image --}}
        <img src="{{url('/assets/img/products/paper_card.jpeg')}}" class="first_div img position-absolute translate-middle-x start-50" >

        <div style="width: 60vh" class=" d-flex position-absolute flex-column justify-content-center translate-middle-x start-50 justify-content-center text-center">
            <p style="font-family : laleh;font-size: 6vh;top: 5vh" class=" position-absolute text-gold translate-middle-x start-50 outline mt-5" >{{$invitationCard->card->title}}</p>
            <p style="font-family : laleh;font-size: 12vh;top: 12vh" class="w-100 position-absolute text-gold translate-middle-x start-50 outline mt-5" >{{$invitationCard->card->gender === \App\Models\PaperCard::MAN_GENDER ? 'جناب آقای ' : 'سرکار خانم '}} {{$invitationCard->card->first_name.' '.$invitationCard->card->last_name}}</p>
            <p style="font-family : laleh;font-size: 5vh;top: 30vh" class="w-100 position-absolute text-gold translate-middle-x start-50 outline mt-5" >{{$invitationCard->card->text}}</p>
            <p style="font-family : armita;font-size: 4vh;top: 50vh" class="w-100 position-absolute translate-middle-x start-50 outline mt-5" >زمان برگذاری :</p>
            <p style="font-size: 3vh;top: 56vh;font-weight: bold" class=" w-100 position-absolute translate-middle-x start-50 outline mt-5" >{{jdate($invitationCard->card->started_at)->format('H:i Y/m/d')}} الی {{jdate($invitationCard->card->finished_at)->format('H:i Y/m/d')}}</p>
            <p style="font-family : armita;font-size: 4vh;top: 65vh" class="w-100 position-absolute translate-middle-x start-50 outline mt-5" >مکان برگذاری :</p>
            <p style="font-family : armita;font-size: 3vh;top: 70vh" class="w-100 position-absolute translate-middle-x start-50 outline mt-5" >{{$invitationCard->card->address}}</p>
        </div>

    </div>

{{--  <script>--}}
{{--      $(document).ready(function() {--}}
{{--          $(".second_div").css({--}}
{{--              'width': ($(".first_div").width() - 60 + 'px')--}}
{{--          });--}}
{{--      });--}}
{{--  </script>--}}
</body>
</html>
