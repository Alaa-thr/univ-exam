import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'univ-exam-webcam',
  templateUrl: './webcam.component.html',
  styleUrls: ['./webcam.component.css'],
})
export class WebcamComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('video') videoElementRef: ElementRef = {} as ElementRef;

  videoElement!: HTMLVideoElement;
  mediaRecorder: any;
  stream!: MediaStream;
  cameraIsActivated: boolean;
  componentIsDestroyed: boolean;
  constructor(private readonly activatedRoute: ActivatedRoute) {
    this.cameraIsActivated = true;
    this.componentIsDestroyed = false;
  }

  ngOnInit(): void {}

  ngAfterViewInit() {
    this.videoElement = this.videoElementRef.nativeElement;
    this.videoElement.addEventListener('click', ()=>{
      return false;
    })
    this.initCamera();
  }

  private initCamera() {
    let trackKindVideo = true;
    let trackKindAudio = true;
    navigator.mediaDevices
      .getUserMedia({
        audio: true,
        video: {
          width: 1120,
          height: 600,
          facingMode: 'user'
        }
      })
      .then((stream) => {
        trackKindVideo = false;
        trackKindAudio = false;
        this.cameraIsActivated = true;
        this.stream = stream;
        this.videoElement.srcObject = this.stream;
        this.stream.getTracks().forEach((track) => {        
          track.addEventListener('ended', () => {
            if(track.kind == "video"){
              trackKindVideo = true;
              if(!trackKindAudio)
                this.setCameraIsActivated(false);
            }else if(track.kind == "audio"){
              trackKindAudio = true;
              if(!trackKindVideo)
                this.setCameraIsActivated(false);
            }
          });   
        });
      })
      .catch((err) => {
        alert('You need to TURN ON your CAMERA and AUDIO');
        this.setCameraIsActivated(false);
      });
  }
  private setCameraIsActivated(cameraIsActivated: boolean) {
    this.cameraIsActivated = cameraIsActivated;
    if (!this.cameraIsActivated) {
      setTimeout(() => {
        if(!this.componentIsDestroyed){
          this.initCamera();
        }  
      }, 6000);
    }
  }
  goToExam(){
    this.activatedRoute.params.subscribe(
      (params) => { 
        const examId = params['id'];
        const link = "exam/scheduled-exams/preparation-exam/"+examId+"/start";
        location.href = link;
      }
    ); 
  }
  ngOnDestroy(): void {
    this.componentIsDestroyed = true;
    if(this.cameraIsActivated){
      this.stream.getTracks().forEach((track) => {        
        track.removeAllListeners;
        track.stop(); 
      });
    }
  }
}