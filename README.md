This app is a video-sharing app very similar to YouTube called Jimtube, using React Node.js/Express, and MongoDB/Firebase. In this app, you can create an account, upload videos, leave likes and comments for videos, subscribe to other users and more.
Once you first open the app you will be greeted with the Home screen displaying all the popular videos right now. If you look at the nav bar on the top you will notice tags for these videos you can use to filter to your preferences, and if you hover over these videos you
will see a short 10-second preview of the video. 

![YT demo hover](https://github.com/jdemar5/video-app-react/assets/60453324/a44d2c20-ee3f-47d9-a801-b3572ce10ac2)

![Yt tag demo](https://github.com/jdemar5/video-app-react/assets/60453324/80f9a9fa-7298-4d33-be37-9d3c280d6fce)

If you click on one of these videos you will be directed to the video page for it. On this page, you can watch the video, download, share, and get recommendations for videos like it, but you will not be able to like comment or subscribe until you have signed into your
account. 

![YT demo video](https://github.com/jdemar5/video-app-react/assets/60453324/0223d3bb-0209-4a14-9f6e-80f9f65544f3)

![YT demo share](https://github.com/jdemar5/video-app-react/assets/60453324/a5eeeef0-8b14-49cd-8d81-655f778c93e6)

In the top right of the screen, you will see the sign-in button which will of course let you sign up for or sign into your account with an encrypted password.

![YT demo signin](https://github.com/jdemar5/video-app-react/assets/60453324/2bbf3a6e-c15b-4710-9dd2-30af8c082294)


Once you are signed into your account you will see that the sign-in button has been replaced by the upload and profile button. the profile button has the image of your profile picture and opens the menu for your profile, which gives you the options to view your channel, 
sign out and change the light/dark mode. The upload button lets you of course upload videos of your choosing to Jimtube. On the upload screen, you will have the choice of thumbnail, title, description and tags for the video. Once you've uploaded the video it will direct you 
to the video for you to watch it.

![YT demo profile menu](https://github.com/jdemar5/video-app-react/assets/60453324/50990873-7388-4719-9648-edd91cc99a16)

![YT demo upload](https://github.com/jdemar5/video-app-react/assets/60453324/fab07eca-b7a7-4ce7-a7ac-6f65862f7f8c)

If you visit your channel you will see the page everyone sees when they visit your channel except the subscribe button is now the edit profile button. In the edit profile menu, you can change the profile picture, banner and bio as you see fit. When uploading any picture 
on JimTube you will use the built-in image cropping tool to help keep things uniform, and the profile will update in live-time.

![YT demo your channel](https://github.com/jdemar5/video-app-react/assets/60453324/6dea4d63-1909-4093-b16f-b7c6284b15a2)

![YT demo edit profile2](https://github.com/jdemar5/video-app-react/assets/60453324/990f59b4-b6be-4af6-9481-b82a5272ccae)

![YT demo crop](https://github.com/jdemar5/video-app-react/assets/60453324/8901dc30-e291-4a9e-b133-58e9f693887d)

On the left-hand side of the app, you will notice a collapsible menu with various links to different pages. The first section of the menu lets you filter your home page to have random popular videos in explore, or random videos from users you are subscribed to.

![YT demo menu](https://github.com/jdemar5/video-app-react/assets/60453324/6d1a4a3f-9563-4012-883c-79481b7c8717)

The next part is your personal section of the menu with your library, history, Your videos, watch later, and liked videos. The library is a navigational page to display all the options below it. The history page shows all videos you've viewed in the past, your videos 
just sends you to your channel, watch later is your playlist for videos you are saving for later, and liked videos is of course all the videos you've liked in the past.

![YT demo library](https://github.com/jdemar5/video-app-react/assets/60453324/9fa1b534-bfcc-424f-beb8-c4a59bb35300)

![YT demo history](https://github.com/jdemar5/video-app-react/assets/60453324/40d528e9-dd20-48d2-aa6e-424174ff3ecd)

![YT demo watchlater](https://github.com/jdemar5/video-app-react/assets/60453324/feb86dfd-e36b-4420-88f9-9eb80e940dda)

![YT demo likedvideos](https://github.com/jdemar5/video-app-react/assets/60453324/a6135500-4677-49a0-bcf7-35eb4f164df5)

Below that, there is a list of all the users you are subscribed to. After clicking on the user you want this will bring you to their channel page where you can unsubscribe or browse their videos further.

![YT demo subscription](https://github.com/jdemar5/video-app-react/assets/60453324/27394adb-fa89-4cec-8d3b-a8eb56ec55e4)

The last section of the menu is another spot for you to filter videos on your home page based on popular tags in JimTube, like Music or Gaming. Then you have another section to change the light/dark mode of the app how you like.

![YT demo light mode](https://github.com/jdemar5/video-app-react/assets/60453324/09e313b4-f8a6-43fc-8c36-91a0da4001bf)

The last two major features of the app are the search and dots menu features. The search function is a part of the navbar at the top of the app, and it lets you search for videos and tags on videos in JimTube that match your query. The Dots menu is on the right
side of all the title cards in the app that once you click lets you download, add to watch later, and download the video.

![YT demo search](https://github.com/jdemar5/video-app-react/assets/60453324/7a4e0a35-a2bb-407c-a5ac-cc0462895a1a)

![YT demo dots](https://github.com/jdemar5/video-app-react/assets/60453324/f0156ad7-09a1-4307-a6f6-0ae408c7c76f)

Some unspoken features worth mentioning in this app are how a video gets recommended to you and how it gets added to your history. Once you have gotten half-way through a video it is then considered "watched" by you and will be added to your history. At the same time the 
tags of the video will be added to your personal tags on your account if they are not already on there, this will determine the videos you are recommended in the future.

You may notice that there are some buttons on the application that have no functionality(settings, report, help, and not interested), and that is because for the amount of effort it would take to implement these features it would not be worth my time for this 
educational app.

That being said this app was made for strictly educational purposes and is in no way meant for monetary gain. 
Thank you for looking at my app any constructive criticism would greatly be appreciated.
