import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
declare let MediaRecorder: any;

@Component({
  selector: 'univ-exam-webcam',
  templateUrl: './webcam.component.html',
  styleUrls: ['./webcam.component.css'],
})
export class WebcamComponent implements OnInit {

  @ViewChild('video') videoElementRef: ElementRef = {} as ElementRef;

  videoElement!: HTMLVideoElement;
  mediaRecorder: any;
  stream!: MediaStream;
  cameraIsActivated: boolean;
  constructor() {
    this.cameraIsActivated = true
  }

  ngOnInit(): void {}

  
  
  async ngAfterViewInit() {
    
    const permissionName = "camera" as PermissionName;
  
    console.log(navigator.mediaDevices);
    this.videoElement = this.videoElementRef.nativeElement;
    
    navigator.mediaDevices
      .getUserMedia({
        video: {
          width:1120,
          height: 600,
          facingMode: "user" 
        }
      })
      .then((stream)=>{
        
        
        this.cameraIsActivated = true;
        
        this.stream = stream;
        console.log("stream", this.stream)
        this.videoElement.srcObject = this.stream;
        
        /*this.stream.getTracks().forEach(track => track.onended = () => {
          console.log('stopped')
          this.setCameraIsActivated(false);
        })*/
        this.stream.getTracks().forEach((track) => console.log('enabled',track.readyState))
       
        
      })
      .catch(err=>{
        this.cameraIsActivated = false;
        console.log("ERROR : !!!!you need to turn on the camera", err);
        alert("You need to turn on your camera");
        
      }); 
         
    
  }
  public setCameraIsActivated(cameraIsActivated: boolean){
    this.cameraIsActivated = cameraIsActivated;
    console.log('cameraIsActivated',cameraIsActivated)
  }
  public handleInitError(error: any): void {
    console.warn("ddd");
    if (error.mediaStreamError && error.mediaStreamError.name === "NotAllowedError") {
      console.warn("Camera access was not allowed by user!");
    }
  }
}
