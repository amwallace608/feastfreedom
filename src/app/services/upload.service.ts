import { Injectable } from '@angular/core';
import * as AWS from 'aws-sdk/global';
import * as S3 from 'aws-sdk/clients/s3';

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  constructor() { }

  //upload file (image) to s3 bucket
  uploadFile(file){
    const contentType = file.type;
    //create bucket w/ config
    const bucket = new S3({
      accessKeyId: 'AKIAU7NCOJRGGXXUF3G2',
      secretAccessKey: '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',
      region: 'us-west-2',
    });

    //define params
    const params = {
      Bucket: 'feastfreedom',
      Key: 'images' + file.name,
      Body: file,
      ACL: 'public-read',
      ContentType: contentType,
    };

    return bucket.upload(params, function (err, data) {
      if(err) {
        console.log('There was an error uploading the file: ', err);
        return null;
      } 
    }).promise();
  }
}
