import { PlatformEnum } from './../enums/platforms';



export  class PlatformUtil {

    public static isMobile(): boolean {
        let os = this.getDeviceOperatingSystem();
        return os === PlatformEnum.Android ||
            os === PlatformEnum.IOS;
    }

    public static isDesktop(): boolean {
        let os = this.getDeviceOperatingSystem();
        return os === PlatformEnum.Desktop; 
    }


    public static getDeviceOperatingSystem(): PlatformEnum {
        let userAgent = navigator.userAgent || navigator.vendor || window['opera'];

        if (/android/i.test(userAgent)) {
            return PlatformEnum.Android;
        }

        if (/iPad|iPhone|iPod/.test(userAgent) && !window['MSStream']) {
            return PlatformEnum.IOS;
        }

        return PlatformEnum.Desktop;
    }
}