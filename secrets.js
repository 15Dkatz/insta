// picanalysis
// client id
// 622215ba504b46648b8b692691c1d470

// client secret
// 460a12cab33c455a8eeaac7d1f7cc656

// authorization redirect_uri
// https://www.instagram.com/oauth/authorize/?client_id=622215ba504b46648b8b692691c1d470&redirect_uri=http://davidtkatz.com/&response_type=code&scope=follower_list+public_content

// david's code: 8cdfa65962a34131b44a408aa1500f5d
// david's code with follower list: 9383dbda4a2e471896e41cd4a4d79e2c


// then POST request after authorization

    // curl -F 'client_id=622215ba504b46648b8b692691c1d470' \
    // -F 'client_secret=460a12cab33c455a8eeaac7d1f7cc656' \
    // -F 'grant_type=authorization_code' \
    // -F 'redirect_uri=http://davidtkatz.com/' \
    // -F 'code=3d9b0ba5a2ed4c858ef59c124f2e0b0b' \
    // https://api.instagram.com/oauth/access_token

// test response
// {"access_token": "1400541818.622215b.c487696346e6408b879346ef29e9e78b", "user": {"username": "davidjtk", "bio": "I swear I'm not a muggle. twitter @15Dkatz", "website": "", "profile_picture": "https://scontent.cdninstagram.com/t51.2885-19/10706987_1536344253243743_1643696060_a.jpg", "full_name": "David Katz", "id": "1400541818"}}
// {"access_token": "1400541818.622215b.c487696346e6408b879346ef29e9e78b", "user": {"username": "davidjtk", "bio": "I swear I'm not a muggle. twitter @15Dkatz", "website": "", "profile_picture": "https://scontent.cdninstagram.com/t51.2885-19/10706987_1536344253243743_1643696060_a.jpg", "full_name": "David Katz", "id": "1400541818"}}

// get user follows
  // https://api.instagram.com/v1/users/self/follows?access_token=1400541818.622215b.c487696346e6408b879346ef29e9e78b



// my follower_list
