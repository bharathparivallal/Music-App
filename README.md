# Music-App

API are in Postman : https://documenter.getpostman.com/view/11739145/VUqpsx9i

User Schema
![image](https://user-images.githubusercontent.com/50397972/185789129-0b27703f-3426-4207-b5cf-e88613799362.png)

Song Schema
![image](https://user-images.githubusercontent.com/50397972/185789136-e383cc22-28c1-484a-9105-d063a8f0bfe4.png)

Playlist Schema
![image](https://user-images.githubusercontent.com/50397972/185789144-cfdc257b-35dc-49b8-af6e-606008d0a6a8.png)

Step To Run
1. Clone code from git
2. npm i
3. Add .env file in your code 
![image](https://user-images.githubusercontent.com/50397972/185789180-e666829f-34d7-4fab-9fb1-c801005f7e44.png)

content :

NODE_ENV='production'

PORT=3000

dbUrl=mongodb+srv://pbp:kkV2p9DYZHJtOB2m@music-app.i8fbjsa.mongodb.net/musicapp

JWT_SECRET='pbpMusicApp'

JWT_ACCESS_DURATION=1h

JWT_REFRESH_DURATION=2h

4. Run by "npm run start:dev"
