// تابع ResponseFormat برای ایجاد یک ساختار استاندارد پاسخ
let ResponseFormat = (ok: boolean, status: number, message: string, data: any) => {
    return {
        ok,
        status,
        message: ResponseMessage(message),
        // token,
        data
    };
}

const ResponseMessage = (message) => {
    switch (message) {
      case "OK":
        return "اطلاعات با موفقیت دریافت شد";
      case "CREATED":
        return "با موفقیت افزوده شد";
      case "NOT-FOUND":
        return "چیزی وجود ندارد";
      case "SERVER-ERROR":
        return "متأسفانه خطایی درون سرور رخ داده است";
      case "PASSWORD-ERROR":
        return "رمز عبور وارد شده صحیح نیست!";
      case "USER-NOT-FOUND":
        return "کاربری پیدا نشد!";
      case "LOGINED":
        return "ورود با موفقیت انجام شد";
      default:
        return message;
    }
  }


// نوع داده‌ای ResponseFormatType برای تعریف ساختار پاسخ استفاده شده در توابع
export type ResponseFormatType = {
    ok: boolean, // وضعیت موفقیت عملیات
    status: number, // کد وضعیت HTTP
    message: string, // پیام مرتبط با پاسخ
    // token: string | null, // توکن امنیتی
    data: any // داده‌های پاسخ
}

// صادر کردن تابع ResponseFormat به عنوان ماژول پیش‌فرض
export default ResponseFormat;