<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Messages Language Lines
    |--------------------------------------------------------------------------
    |
    | The following language lines are used in apis. You are free to modify
    | these language lines according to your application's requirements.
    |
    */

    'code_sent' => 'کد تایید ارسال شده است',
    'code_is_wrong' => 'کد تایید نامعتبر است',
    'code_is_expired' => 'کد تایید منقضی شده است',
    'deactive_account' => 'حساب شما فعال نیست',
    'register_error' => 'خطایی در ثبت نام رخ داده است',
    'registered_before' => 'با این شماره موبایل قبلا ثبت نام کرده اید',
    'sampler_registered' => 'ثبت نام شما با موفقیت انجام شد، منتظر تایید حساب کاربری تان توسط کارشناس مربوطه باشید',
    'not_found' => ':attribute یافت نشد',
    "patient_created_before" => "بیمار قبلا ثبت شده است",
    'not_active' => ':attribute فعال نیست',
    'not_authorized' => "شما دسترسی مجاز ندارید",
    'success'          =>'عملیات با موفقیت انجام شد',
    'failed_operation' => "عملیات ناموفق بود",
    'illegal_operation' => "عملیات غیرمجاز است",
    'discount_expired' => "این تخفیف منقضی شده",
    'discount_used' => "این تخفیف استفاده شده",
    'answered_before' => "قبلا به این نظرسنجی پاسخ داده اید",
    'not_exist_enough_scores' => "امتیاز کافی برای تبدیل ندارید",
    'not_enough_balance' => "موجودی کیف پول کافی ندارید",
    'canceled_before' => "قبلا لغو شده است",
    'has_open_rent_request' => 'درخواست تمدید قبلی شما در حال بررسی است برای ثبت درخواست جدید درخواست قبلی را لغو کنید',
    'capacity_fulled' => 'ظرفیت تکمیل شده است',
    'cant_access_now' => 'آزمایش برای روزهای آینده ثبت شده لطفا در زمان انتخابی اقدام کنید',
    'time_ranges_have_interference' => 'بازه های زمانی انتخابی تداخل دارد',
    'referral_code_is_wrong' => 'کد معرف صحیح نیست، در صورتی که کد معرف ندارید این قسمت را خالی بگذارید',
    'invalid_referral_code' => 'کد معرف نامعتبر است',
    'should_have_one_done_test_request' => 'شما باید حداقل یک درخواست آزمایش انجام شده داشته باشید',
    'answered_before' => 'قبلا به این پرسش پاسخ داده اید',

    /*
    |--------------------------------------------------------------------------
    | Custom Messages Attributes
    |--------------------------------------------------------------------------
    |
    | The following language lines are used to swap our attribute placeholder
    | with something more reader friendly such as "E-Mail Address" instead
    | of "email". This simply helps us make our message more expressive.
    |
    */

    'attributes' => [
        'male' => 'آقا',
        'female' => 'خانم',
        'diploma' => 'دیپلم',
        'associate' => 'کاردانی',
        'bachelor' => 'کارشناسی',
        'master' => 'کارشناسی ارشد',
        'PHD' => 'دکترا',
        'customer' => 'کاربر',
        'patient' => 'بیمار',
        'address' => 'آدرس',
        'test_request' => 'درخواست آزمایش',
        'article' => 'مقاله',
        'doctor' => 'دکتر',
        'sampling_package' => 'پکیج چکاپ',
        'tag' => 'تگ',
        'ticket' => 'تیکت',
        'department' => 'واحد',
        'transaction' => 'تراکنش',
        'notification' => 'اطلاعیه',
        'lab' => 'آزمایشگاه',
        'discount' => 'کد تخفیف',
        'slider' => 'بنر اسلایدر',
        'canceling_reason' => 'علت لغو آزمایش',
        'status' => 'وضعیت',
        'version'=> 'ورژن',
        'constant'=>'تنظیمات',
        'question' => 'سوال',
        'wallet' => 'کیف پول',
        'role' => 'نقش',
        'disease' => 'بیماری',
        'admin_update' => 'اپدیت ادمین',
        'admin_create' => 'ساخت ادمین',
        'admin_delete' => 'حذف ادمین',
        'ticket_show' => 'نمایش تیکت',
        'ticket_create' => 'ساخت تیکت',
        'ticket_update' => 'اپدیت تیکت',
        'ticket_delete' => 'حذف تیکت',
        'super_admin' => 'سوپرادمین',
        'prescription_cost' => 'هزینه نسخه نویسی',
        'bronze' => 'برنز',
        'silver' => 'نقره ای',
        'golden' => 'طلایی',
        'platinum' => 'پلاتین',
        'vacation' => 'مرخصی',
        'rental_request' => 'درخواست اجاره دستگاه',
        'location' => 'مکان',
        'device' => 'دستگاه',
        'edit' => 'تغییر دادن',
        'delete' => 'حذف کردن',
        'details' => 'جزئیات',
        'canceling' => 'غیرفعال کردن',
        'extension_request' => 'درخواست تمدید اجاره',
        'insurance' => 'بیمه',
        'extra_insurance' => 'بیمه تکمیلی',
        'invoice' => 'ریزفاکتور',
        'postal_package' => 'آزمایش پستی',
        'postal_test_request' => 'درخواست آزمایش پستی',
        'postal_package_price' => 'قیمت آزمایش پستی',
        'setting' => 'تنظیمات',
        'organization' => 'سازمان',
        'kit_delivery_request' => 'درخواست تحویل کیت',
        'extra_field' => 'ویژگی اضافی',
        'time_interval' => 'بازه زمانی',
        'referral_exception' => 'استثنا کد معرف',
        'related_person' => 'شخص وابسته',
        'sampling_package_types' => 'نوع آزمایش',
        'activity_type' => 'نوع فعالیت',
        'activity' => 'فعالیت',
    ],
];
