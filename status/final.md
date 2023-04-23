## 1. Synopsis of Project Goals
 - Allow users to upload photos in their closet
 - Allow user to select an existing clothing item
    - edit
    - delete
 - Allow users to upload new clothing item
  - take photo
  - upload an existing photo
  - fill out tags and relevant info
 - Allow user to create an outfit given a tag
    - select a tag
    - select an item from each category
    - save if desired

## 2. Link To Written Status Updates
- [Status 1](https://github.com/mwodahl/style-sense/blob/main/status/status1.md)
- [Status 2](https://github.com/mwodahl/style-sense/blob/main/status/status2.md)
- [Status 3](https://github.com/mwodahl/style-sense/blob/main/status/status3.md)
- [Status 4](https://github.com/mwodahl/style-sense/blob/main/status/status4.md)

## 3. Links to all videos created
- [Demo Video](https://github.com/mwodahl/style-sense/blob/main/demo.mp4)

## 4. Project Planning and Execution
- [Design Requirements and Specification](https://github.com/mwodahl/style-sense/blob/main/StyleSensePlan.pdf)
- [Expected Plan of Work](https://github.com/mwodahl/style-sense/blob/main/Project-proposal.pdf)
- Actual Plan of Work:
   - Our final design for this project differed from our originally proposed design slightly, meaning that our actual plan of work differed, as well. We made two main deviations from our original plan. First, we switched from a PostgreSQL relational database to a DynamoDB non-relational database using GraphQL. Second, we incorporated AWS amplify, which led to the first few weeks of the semester being spent familiarizing ourselves with these different technologies. We were able to create our React skeleton project by the beginning of February. Then we developed a basic UI and initialised the backend by the being of March. Finally, we styled the application and worked on frontend and backend integration through April.
## 5. Summary of Final Implementation
 - **Design**: Our project allows users to upload photos of their clothing into their digital closet and tag them for later sorting and use in outfit creation. The front end was implemented using React, Amplify CLI, and Javascript and it includes a weather API, login page, and custom styling. Our back-end was built with AWS Cognito for user authentication, AWS S3 buckets for media storage, and GraphQL and DynamoDB for our database API and database. 
 - **Limitations**: The current limitations of StyleSense include having a slow upload process and our outfit generation feature is limited to a random selection of clothing items within certain tags.
 - **Future Direction**: Possible goals for future improvement include hosting our web app online, expanding to a mobile application, enhancing the user interface and image upload experience, and integrating a social aspect for users to interact with each other.
 - **Statement of Work**:
   - As a team: As a team, we were able to create a responsive frontend utilizing React and various javascript libraries. We were able to create a storage bucket and control user resource access by specifying permissions in AWS. We were able to create a NoSQL database and utilize GraphQL to access our data. Additionally, we were able to use AWS Cognito for user authentication and to prevent unwanted data access in our database.
   - Jenna: For this project I assisted with the development of the front-end, helping create and style components and integrating a weather API. I created materials for our presentation and worked with my teammates to write status updates and other documentation.
   - Marc: For this project I was able to initialize the AWS Cognito user pool and leverage this to handle user authentication on the frontend. Additionally, I created the React components and handled styling. I worked with storage bucket resources and permissions for users. I also worked on styling for the frontend and handled data display / backend integration.
   - Alicia: I worked on the backend of our application. This included learning GraphQL and how to properly set up authentication with our database. I worked with Marc to integrate the frontend with the backend and contributed to the styling of some pages.
## 6. Reflection
 - **Lessons Learned**: Planning is a key metric of success. We found that our success in this project relied heavily on having a good plan. This proved to be an especially important part when integrating our frontend with our backend. Documentation is your best friend. We utilized documentation to develop components, to integrate the different pieces of the project, and to problem solve when we hit roadblocks. During this project, we also learned the importance of keeping our skillsets up to date and the power of industry-standard technologies.
 - **"If you had to do it all over again"**: The first thing we'd do is start learning the technologies earlier in the year. We pivoted from one tech stack to another between semesters which required quite a bit of time getting up to speed. Also, we would plan on spending more time on the backend. We knew who our intended audience was for our final project. Therefore, we focused quite a bit on the frontend. However, we didn't feel as though we adequately tackled the styling problem. Putting more time into the backend would have allowed us to create a better solution for this.
 - **Advice for future teams**: Start early - if you don't think of the first semester as only a planning semester it's much easier to implement your project when it comes time. Pick a tech stack and give it a try - we pivoted from our original backend which led to more time learning. If we were to have picked something earlier in the semester and stuck to it (unless it absolutely didn't meet our needs) it would have been much less of a time crunch. Designate a lead - we found that our project worked best when someone was able to create tasking for other team members and assist where needed.


