import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { IOrganization } from '../IOrganization';
import { OrganizationService } from '../organization.service';
import { ConfigService } from '../../config/config.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FileUploader, FileItem } from 'ng2-file-upload';
import { Constants } from '../../config/Constant';
import { DomSanitizer } from '@angular/platform-browser';
import { SharedService } from '../../shared/shared.service';
@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {
  private imageshow: any;
  private update = false;
  private uuid: any;
  private orgUUID;
  private isImage = false;
  private organization: IOrganization = {
    'id': 0,
    'uuid': '',
    'organizationname': '',
    'orgImage': ''
  };
  private token;
  public uploader: FileUploader = new FileUploader({
    url: '',
    authTokenHeader: '',
    authToken: '',
    isHTML5: true,
  });
  private createOrgnization: any;

  private Uploadresponse: any;

  private localUrl: any;

  private baseurl: any;

  private editimage: any;

  private location: any;

  private orgninfo: any;

  constructor(private router: Router, private route: ActivatedRoute, private config: ConfigService,
    private OrganizationService: OrganizationService, private configService: ConfigService, private http: HttpClient,
    private domSanitizer: DomSanitizer, private service: SharedService) {
    if (JSON.parse(sessionStorage.getItem('currentUser')).user.organization) {
      this.orgUUID = JSON.parse(sessionStorage.getItem('currentUser')).user.organization.uuid;
    }
  }

  ngOnInit() {
    this.imageshow = false;
    this.getquerydetails();
    this.currentUserDetails();
    this.uploader.queue.length = 0;
    const URL = this.config.api_url + Constants.uploadImage;
    this.uploader.onBeforeUploadItem = (item) => {
      item.url = URL + '';
    };
    this.uploader.authTokenHeader = 'Authorization';
    this.uploader.authToken = 'Bearer ' + this.token;

    this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {

      if (this.update === true) {
        this.orgninfo = {
          'organizationname': this.organization.organizationname,
          'uuid': this.uuid,
          'orgImage': JSON.parse(response).path,
        };
      } else {
        this.orgninfo = {
          'organizationname': this.createOrgnization.organizationname,
          'uuid': this.createOrgnization.uuid,
          'orgImage': JSON.parse(response).path
        };
      }
      this.OrganizationService.updateOrganization(this.orgninfo).subscribe(data => {
        this.router.navigate(['/organization']);
      }, error => {
        console.log(error);
      });


    };
  }

  currentUserDetails() {
    const json = JSON.parse(sessionStorage.getItem('currentUser'));
    this.token = json.token;
    // this.currentUser = json.user;
  }

  omit_special_char(event) {
    let k;
    k = event.charCode;  //         k = event.keyCode;  (Both can be used)
    return ((k > 64 && k < 91) || (k > 96 && k < 123) || k === 8 || k === 32);
  }

  createOrg() {
    // this.update = false;
    const orginfo = {
      'organizationname': this.organization.organizationname
    };
    this.OrganizationService.saveOrganization(orginfo).subscribe(
      data => {
        console.log('data create----------------->', data);
        this.createOrgnization = data;
        this.uploader.uploadAll();
      },
      error => {
        console.log(error);
      });
    this.router.navigate(['/organization']);
  }
  getquerydetails() {
    this.route.queryParams.subscribe(params => {
      this.uuid = params['id'];
      if (this.uuid === undefined) {
        this.update = false;
      } else {
        this.update = true;
        this.OrganizationService.getOrganizationbyid(this.uuid).subscribe(data => {
          this.organization = data;
          this.baseurl = this.service.baseUrl;
          console.log('-----------url---------', this.baseurl);
          this.editimage = this.organization.orgImage;
          this.location = this.baseurl + '/' + this.editimage;
          console.log('-----------orgimage-----------', this.location);
        }, error => { });

      }
    });
  }


  updateOrg() {
    console.log('update image------------>', this.localUrl);
    if (this.localUrl === undefined) {
      const orgninfo = {
        'organizationname': this.organization.organizationname,
        'uuid': this.uuid,
        'orgImage': this.organization.orgImage,
      };
      console.log('-----------test-----------', orgninfo);
      this.OrganizationService.updateOrganization(orgninfo).subscribe(data => {
        // this.uploader.uploadAll();
      }, error => {
        console.log(error);
      });
      this.router.navigate(['/organization']);

    } else {
      const orgninfo = {
        'organizationname': this.organization.organizationname,
        'uuid': this.uuid,
        'orgImage': this.localUrl.changingThisBreaksApplicationSecurity,
      };
      console.log('-----------test-----------', orgninfo);
      this.OrganizationService.updateOrganization(orgninfo).subscribe(data => {
        this.uploader.uploadAll();
      }, error => {
        console.log(error);
      });
      this.router.navigate(['/organization']);
    }
    // console.log('-----------test-----------', orgninfo);
    // this.OrganizationService.updateOrganization(orgninfo).subscribe(data => {
    //   this.uploader.uploadAll();
    // }, error => {
    //   console.log(error);
    // });
    // this.router.navigate(['/organization']);

  }

  Previewimage(event: any) {
    console.log('============event==========', event);
    if (event.target.files && event.target.files[0]) {
      this.isImage = true;
      const reader = new FileReader();
      console.log('-------------reader-----------', reader);
      // tslint:disable-next-line:no-shadowed-variable
      reader.onload = (event: any) => {
        this.imageshow = true;
        this.localUrl = this.domSanitizer.bypassSecurityTrustUrl(event.target.result);
        console.log('-----------localurl---------', this.localUrl);
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  }
  // test(){
  //   this.uploader.uploadAll();
  // }

}
