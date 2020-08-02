# Run aws tasks from node js

## SETUP AWS
   * create an aws bucket (`https://s3.console.aws.amazon.com/s3/home?region=us-east-2`)
   * set its cors as fallows (permissons / cors configuration):
   ```
   <?xml version="1.0" encoding="UTF-8"?>
   <CORSConfiguration xmlns="http://s3.amazonaws.com/doc/2006-03-01/">
   <CORSRule>
      <AllowedOrigin>*</AllowedOrigin>
      <AllowedMethod>GET</AllowedMethod>
      <AllowedMethod>POST</AllowedMethod>
      <AllowedMethod>PUT</AllowedMethod>
      <AllowedHeader>*</AllowedHeader>
   </CORSRule>
   </CORSConfiguration>
   ```
   * set bucket as public
   * got to (`https://console.aws.amazon.com/iam/home?region=us-east-2#security_credential`) and get your credential keys

## SETUP THIS PROJECT

   * **setup dependencies**
      * npm install

   * **setup git**
      * git init
      * git add .
      * git commit -m "initial release"

   * **log in into aws s3**
      * choose on of the tree available methods to login and use your keys

## Known issues

   * promisses are currently not working in aws-sdk module