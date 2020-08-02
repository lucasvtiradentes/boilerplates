# Create a file uploader on Aws S3/Heroku

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

## SETUP THIS PROJECT

   * **setup dependencies**
      * npm install

   * **setup git**
      * git init
      * git add .
      * git commit -m "initial release"

   * **create a heroku repository**
      * heroku create [myappname]
      * heroku git:remote -a [myappname]
      * heroku buildpacks:add heroku/nodejs

   * **setup aws credential keys on heroku**
      * `heroku config:set AWS_ACCESS_KEY_ID=`
      * `heroku config:set AWS_SECRET_ACCESS_KEY=`
      * `heroku config:set S3_BUCKET=`

   * **upload to heroku** 
      * git push heroku master

## Known issues

   * the `heroku local` command is currently not workink for some unknown reason, so to test this project upload to heroku.