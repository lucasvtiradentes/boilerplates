# Create a file uploader on Aws S3/Heroku

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

   * **setup aws credential keys on heroku**
      * `heroku config:set BOT_TOKEN=[key here]`

   * **upload to heroku** 
      * git push heroku master
