/* tslint:disable */
/* eslint-disable */
import "sst"
declare module "sst" {
  export interface Resource {
    "frontend": {
      "type": "sst.aws.StaticSite"
      "url": string
    }
  }
}
export {}
