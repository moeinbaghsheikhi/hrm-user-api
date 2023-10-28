import { HttpService } from '@nestjs/axios';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import * as kavenegar from 'kavenegar';

@Injectable()
export class AuthService {
    constructor(
        private readonly httpService: HttpService,
        private userService: UserService
      ) { }
    
      // async otpsend(mobile: string, otp: string) {
      //   // Send by pattern
      //   try {
      //     const response = await this.httpService
      //       .get('http://api.payamak-panel.com/post/Send.asmx/SendByBaseNumber3?username=09135882813&password=T13Y7&text=@161754@' + otp + ';&to=' + mobile)
      //       .toPromise();
      //       // this.updateOtp(mobile, otp)
      //       console.log(JSON.stringify(response.data));
      //     return response 
      //   } catch (error) {
      //       console.log(error);
      //     return error
      //   }
      // }

      async otpsend(mobile: string, otp: string) {
        const message  = "کد ورود شما: " + otp
        const sender   = "90004607"
        const receptor = mobile

        const apiKey = '3467515A6847665178754259364948633955596A4F4F49546F644855537A5047734A35484A496A574756493D';
        const kavenegarApi = new kavenegar.KavenegarApi({ apikey: apiKey });
        try {
          const response = await kavenegarApi.Send({
            message,
            sender,
            receptor,
          });
          console.log(response)
          return response
        } catch (error) {
          console.log(error)
          return error
        }
      }

      // async updateOtp(mobile: string, otp: string) {
      //   const user = await this.userService.findByMobile(mobile)
      //   user.password = otp

      //   return this.userService.update(user.id, { ...user });
      // }

      getUserByMobile(mobile: string){
        return this.userService.findByMobile(mobile)
      }
}