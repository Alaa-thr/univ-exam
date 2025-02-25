import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import * as RecordRTC from 'recordrtc';

@Component({
  selector: 'univ-exam-record-video',
  templateUrl: './record-video.component.html',
  styleUrls: ['./record-video.component.css'],
})
export class RecordVideoComponent implements OnInit {

  @Output() sendVideoRecording = new EventEmitter();

  stream!: MediaStream;
  recorder!: RecordRTC;
  videoRecordingBlob: any
  constructor() { }

  ngOnInit(): void {}

 
  startRecording(){
    this.recorder = new RecordRTC(this.stream, {
      type: 'video',
      videoBitsPerSecond: 199000,
      mimeType: "video/webm"
    });
    this.recorder.startRecording();
  }
  stopRecording(){
    this.recorder.stopRecording(() => {
      this.videoRecordingBlob = this.recorder.getBlob();
      this.sendVideoRecordingRequest();
    });
  }
  getStreamRequest(event: any){
    this.stream = event.stream;
  }
  sendVideoRecordingRequest(){
    this.sendVideoRecording.emit(
      {
        videoRecorded : this.videoRecordingBlob
      }
    )
  }


}
