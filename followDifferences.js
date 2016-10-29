var request = require('tinyreq');
var cheerio = require('cheerio');


function getFollowers(string, regex, index) {
  index || (index = 1); // default to the first capturing group
  var followers = new Set();
  var match;
  while (match = regex.exec(string)) {
    followers.add(match[index]);
  }
  return followers;
}

function getFollows(string, regex, index) {
  index || (index = 1);
  var follows = new Set();
  var match;
  while (match = regex.exec(string)) {
    follows.add(match[index]);
  }
  return follows;
}

var myRegEx = /href="\/([^\/]+)\/"/g;


// replace all apostrophes with a blank character.

// Get an array containing the first capturing group for every match
import {followerString, followString} from './followStrings.js';
// followerString.replace('\'', "");
var followers = getFollowers(followerString, myRegEx, 1);
// followString.replace('\'', "");
var follows = getFollows(followString, myRegEx, 1);

function notFollowingMe(follows, followers) {
  // console.log('follows in notFollowingMe', follows);
  var notFollowBacks = [];
  for (let follow of follows) {
    // console.log('follow in follows', follow);
    if (!followers.has(follow)) {
      console.log("not following me ->", follow);
      notFollowBacks.push(follow);
    }
  }
  return notFollowBacks;
}

// console.log('followers', followers);
// console.log('follows', follows);

// replace ' characters

// var notFollowBacks = notFollowingMe(follows, followers);

// console.log('not following me back ', notFollowBacks);


// make a script that unfollows and refollows the list of people who aren't following you
// unfollows all these people automatically

// allow user to follow these people again
// function instaHtml(username) {
//   // request("https://www.instagram.com/" + username + "/followers", function(err, body) {
//   //   console.log("followers", body);
//   //   console.log('request done');
//   // })
//   var url = 'https://www.instagram.com/' + username;
//   // var url = 'https://www.instagram.com/' + username + '/followers';
//
//   var options = {
//     url: url,
//     headers: {
//        'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 8_0 like Mac OS X) AppleWebKit/600.1.3 (KHTML, like Gecko) Version/8.0 Mobile/12A4345d Safari/600.1.4'
//     }
//   };
//
//   request(options, function(error, response, html) {
//     if (!error) {
//       console.log('Scraper running on Insta');
//
//       var $ = cheerio.load(html);
//
//       // console.log('$', $);
//       console.log('html', html);
//
//       var follows = $.html();
//
//       console.log('follows', follows);
//
//     }
//   });
//
// }


// var insta_html = instaHtml("davidjtk");
// **********************
// look up a username and find the unfollowers
