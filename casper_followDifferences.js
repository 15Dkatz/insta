var casper = require('casper').create({
  pageSettings: {
    loadImages: false
  }
});

// get username and password from command line arguments
// through node post request
var username, password;

// example request : casperjs casper_followDifferences.js <username> <password> > test.html
username = casper.cli.args[0];
password = casper.cli.args[1];

var url = 'https://www.instagram.com/' + username;


var loginurl = 'https://www.instagram.com/accounts/login/';

casper.start(loginurl, function() {
  console.log('casper started');
  if (this.exists('body')) {
    this.echo(this.getCurrentUrl());
    this.waitForSelector('form', function() {
      // this.echo(this.getHTML('form'));
      console.log("***** login *************")
    })
  }
})


casper.then(function() {
  console.log('attempting to fill labels');
  this.fillSelectors('form', {
    'input[name="username"]': username,
    'input[name="password"]': password
  }, true);
  console.log('filled labels');
})


casper.then(function() {
  if (this.exists('form')) {
    // this.echo(this.getHTML('form'));
    this.click('button');
    console.log("\n******************** clicking button to login  *************");
  }
})

casper.then(function() {
  this.waitForSelector('main', function() {
    this.echo(this.getCurrentUrl());
    console.log('**** main ****');
    // this.echo(this.getHTML('main'));
    console.log('**************** found main *****************');
  })
})

var profile_url = 'https://www.instagram.com/' + username;

casper.thenOpen(profile_url, function() {
  this.waitForSelector('body', function() {
    console.log("******************");
    this.echo(this.getCurrentUrl());
    // this.echo(this.getHTML('ul a'));
    // followers link
    this.click('ul a');
  })
})

var getBigUl;

var nextUrl = function() {
  casper.then(function() {
    this.waitForSelector('div', function() {
      console.log('\n new url:');
      this.echo(this.getCurrentUrl());
      console.log('finding the ul of users');
      getBigUl(this, 200);
    })
  })
}

nextUrl();

getBigUl = function(csp, limit) {
  csp.waitForSelector('ul', function() {
    var ul = this.getHTML('body ul');
    // console.log('reg ul', ul);
    if (ul.length > limit) {
      // console.log('\n\n\nwe have a big ul', ul);
      return;
    } else {
      getBigUl(csp, limit);
    }
  })
}


var loadList = function() {
  // set the repeat based on the followers count
  // adjust this number
  var repeat = 150;
  // calculate the ratio based on the number it took for me with ~500 followers
  for (var c=0; c<repeat; c++) {
    casper.then(function() {
      console.log('\nscrolling...');
      this.scrollToBottom();
      // adjust this number
      var n = 6;
      for (var i=0; i<n; i++) {
        this.waitForSelector('li', function() {
          console.log('...');
        })  
      }
    })  
  }
}

// ******************* UNCOMMENT THIS TO ACTIVATE ***********************
// **** call to create the massive ul of followers
loadList();
// *******************

// why won't sets work
// return an array of users from the HTML
var findUsers = function(HTML) {
  HTML.replace("\'", "");
  // console.log('BIG HTML', HTML);

  // go through the string and add users to the array 
  var index = 1; // default to the first capturing group
  // var users = new Set();
  var users = [];
  var match;
  var regex = /href="\/([^\/]+)\/"/g;

  console.log('\nusers');

  while (match = regex.exec(HTML)) {
    console.log('found a match', match[index]);
    // users.add(match[index]);
    if (users.indexOf(match[index]) < 0) {
      users.push(match[index]);
    }
  }
  return users;
}

var followers;


//  ************ UNCOMMENT FOR FOLLOWERS AND PROGRAM **************
casper.then(function() {
  // console.log("\n\n\n**** SUPER FAT UL ****");
  // this.echo(this.getHTML('ul'));
  followers = findUsers(this.getHTML('ul'));
  console.log('followers length', followers.length);
  console.log('\n****followers****\n', followers); 
})


casper.thenOpen(profile_url, function() {
  this.waitForSelector('body', function() {
    console.log("\n******************");
    this.echo(this.getCurrentUrl());
    console.log("\n\n following");
    console.log('\nnext ul a')
    this.echo(this.getHTML('li:nth-child(3) a'));


    this.click('li:nth-child(3) a');
  })
})

nextUrl();

loadList();

var following;

casper.then(function() {
  following = findUsers(this.getHTML('ul'));
  console.log('following length', following.length);
  // console.log('\n**********following*************\n', following);
})


// THEN COMPARE THE ARRAYS

// return an array of values in arr1 but not in arr2
var arrDiff = function(arr1, arr2) {
  var diffArr = [];
  for (var i=0; i<arr1.length; i++) {
    if (arr2.indexOf(arr1[i]) < 0) {
      diffArr.push(arr1[i]);
    }
  }
  return diffArr;
}

casper.then(function() {
  console.log("\n\n\n\n************** DIAGNOSIS **************");
  console.log("\n\nfollowers\n", followers);
  console.log("\n\nfollowing\n", following);
  var notFollowBacks = arrDiff(following, followers);
  console.log("\n\n*****" + notFollowBacks.length + " people not following me back! *****\n", notFollowBacks);
})


casper.run();




// in the frontend
// give feedback on what is loading as well as percentage bars