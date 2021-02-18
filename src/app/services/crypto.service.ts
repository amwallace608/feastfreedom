import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root',
})
export class CryptoService {
  private KEY = "123456$#@$^@1ERF";

  constructor() {}

  //encrypt string method
  encrypt(value: string){
    var key = CryptoJS.enc.Utf8.parse(this.KEY);
    var iv = CryptoJS.enc.Utf8.parse(this.KEY);

    var encrypted = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(value), key, {
      keySize: 128/8,
      iv: iv,
      mode: CryptoJS.mode.CBC,
      padding:CryptoJS.pad.Pkcs7
    });

    console.log(encrypted.toString());
    return encrypted.toString();
  }

  //decrypt method
  decrypt(value){
    var key = CryptoJS.enc.Utf8.parse(this.KEY);
    var iv = CryptoJS.enc.Utf8.parse(this.KEY);

    var decrypted = CryptoJS.AES.decrypt(value, key, {
      keySize: 128/8,
      iv: iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7
    });

    console.log(decrypted.toString(CryptoJS.enc.Utf8));
    return decrypted.toString(CryptoJS.enc.Utf8);
  }
}
