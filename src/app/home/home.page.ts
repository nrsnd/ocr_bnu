import { Component } from '@angular/core';
import { Camera, PictureSourceType, DestinationType } from '@ionic-native/camera/ngx';
import { OCR, OCRSourceType, OCRResult } from '@ionic-native/ocr/ngx';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  selectedImage: string;
  imageText: any = [];
  imagePreview: any

  constructor(private camera: Camera, private ocr: OCR) {}

  selectSource(){
    this.getPicture(this.camera.PictureSourceType.CAMERA);
  }

  getPicture(sourceType: PictureSourceType) {
    this.camera.getPicture({
      quality: 100,
      sourceType: sourceType,
      destinationType: DestinationType.FILE_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      allowEdit: true,
      saveToPhotoAlbum: false,
      correctOrientation: true
    }).then((imageData) => {
      this.selectedImage = imageData;
      this.imagePreview = (<any>window).Ionic.WebView.convertFileSrc(imageData)
      this.recognizeImage()
    });
  }

  recognizeImage() {
    this.ocr.recText(OCRSourceType.NORMFILEURL, this.selectedImage)
    .then((res: OCRResult) => {
    console.log(JSON.stringify(res))
    //alert(JSON.stringify(res.blocks.blocktext))
    this.imageText = res.blocks.blocktext
    
    })
    .catch((error: any) => {
      console.error(error)
      alert(JSON.stringify(error))
    });
    
  }

}
