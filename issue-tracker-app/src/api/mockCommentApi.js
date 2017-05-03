import delay from './delay';

// This file mocks a web API by working with the hard-coded data below.
// It uses setTimeout to simulate the delay of an AJAX call.
// All calls return promises.
const comments = {
  "1":[
    {
      "text":"Fixed",
      "movement":"Fixed",
      "user": "Adam Boothroyd",
      "time": "12:55pm 12/12/2016"
    },
    {
      "text":"Not Fixed",
      "movement":"Ready to Fix",
      "user": "Simon Hollobon",
      "time": "12:55pm 12/12/2016"
    },
    {
      "text":"@jdaveknox yes!",
      "movement":"",
      "user": "wesbos",
      "time": "12:55pm 12/12/2016"
    },
    {
      "text":"Yes this is an issue yes yes!",
      "movement":"",
      "user": "willowtreemegs",
      "time": "12:55pm 12/12/2016"
    }
  ],
  "2":[
    {
      "text":"Wes. WE should have lunch.",
      "movement":"",
      "user": "jdaveknox",
      "time": "12:55pm 12/12/2016"
    },
    {
      "text":"#adults",
      "movement":"",
      "user": "jdaveknox",
      "time": "12:55pm 12/12/2016"
    },
    {
      "text":"@jdaveknox yes!",
      "movement":"",
      "user": "wesbos",
      "time": "12:55pm 12/12/2016"
    },
    {
      "text":"ðŸ˜ love Hamilton!",
      "movement":"",
      "user": "willowtreemegs",
      "time": "12:55pm 12/12/2016"
    }
  ],
  "3":[
    {
      "text":"Those are cute! They're like silver dollar pancakes.",
      "movement":"",
      "user": "rrsimonsen",
      "time": "12:55pm 12/12/2016"
    },
    {
      "text":"I like baby pancakes but gluten free please!! I'll bring the coffee!! See you in 6 days!!!!!! ðŸ˜ðŸ˜›ðŸ˜â™¥ï¸",
      "movement":"",
      "user": "terzisn",
      "time": "12:55pm 12/12/2016"
    },
    {
      "text":"... and apparently growing baby. ðŸ‘€. Yum.",
      "movement":"",
      "user": "henrihelvetica",
      "time": "12:55pm 12/12/2016"
    },
    {
      "text":"@wesbos ðŸ‘ my daughter is a pancake eating machine!",
      "movement":"",
      "user": "brentoage",
      "time": "12:55pm 12/12/2016"
    },
    {
      "text":"Nice stove!",
      "movement":"",
      "user": "haaps",
      "time": "12:55pm 12/12/2016"
    },
    {
      "text":"Genius bottle use! Do you make a single batch of batter or make a lot and freeze it?",
      "movement":"",
      "user": "gobananna",
      "time": "12:55pm 12/12/2016"
    },
    {
      "text":"@gobananna I just made a batch and put in in a FIFO bottle. Keeps in the fridge for a few days.",
      "movement":"",
      "user": "wesbos",
      "time": "12:55pm 12/12/2016"
    },
    {
      "text":"@haaps thanks! It's a Jenn air - so nice to cool with!",
      "movement":"",
      "user": "wesbos",
      "time": "12:55pm 12/12/2016"
    },
    {
      "text":"Where would you go and for how long, if you had location freedom? - Greg ðŸŒŽ",
      "movement":"",
      "user": "world_greg",
      "time": "12:55pm 12/12/2016"
    }
  ],
  "4":[
    {
      "text":"Looking great Wes! I'd like to see the other side of the room too.",
      "movement":"",
      "user": "axcdnt",
      "time": "12:55pm 12/12/2016"
    },
    {
      "text":"I've never caught your podcast. Have one right? Btw - they don't have a Canary pillow? ðŸ˜",
      "movement":"",
      "user": "henrihelvetica",
      "time": "12:55pm 12/12/2016"
    },
    {
      "text":"Great way to start the year.",
      "movement":"",
      "user": "pmgllc",
      "time": "12:55pm 12/12/2016"
    },
    {
      "text":"Are there 4k monitors?",
      "movement":"",
      "user": "alexbaumgertner",
      "time": "12:55pm 12/12/2016"
    },
    {
      "text":"@axcdnt that is where I put all the junk. I'll have to clean that side too @henrihelvetica no podcast yet! @pmgllc ohh yeah! @alexbaumgertner yep - the main one is 4K - I'm loving it",
      "movement":"",
      "user": "wesbos",
      "time": "12:55pm 12/12/2016"
    },
    {
      "text":"That chrome pillow. ðŸ˜‰",
      "movement":"",
      "user": "imagesofthisandthat",
      "time": "12:55pm 12/12/2016"
    },
    {
      "text":"@wesbos is that the Dell 4k? The MacBook Pro powers it well? I also have a Retinaâ„¢ / x1 setup as well. Very handy.",
      "movement":"",
      "user": "henrihelvetica",
      "time": "12:55pm 12/12/2016"
    },
    {
      "text":"#minimalsetups",
      "movement":"",
      "user": "wesbos",
      "time": "12:55pm 12/12/2016"
    }
  ],
  "5":[
    {
      "text":"that is the sound of success!",
      "movement":"",
      "user": "mdxprograms",
      "time": "12:55pm 12/12/2016"
    }
  ],
  "6":[
    {
      "text":"Did she get to eat her letter?",
      "movement":"",
      "user": "pathiebert",
      "time": "12:55pm 12/12/2016"
    },
    {
      "text":"Nope @pathiebert! She has too much teeth now (8) so that would definitely be her first cavity ðŸ˜‰",
      "movement":"",
      "user": "kaitbos",
      "time": "12:55pm 12/12/2016"
    }
  ],
  "_rmvQfQce8":[
    {
      "text":"A+",
      "movement":"",
      "user": "mrjoedee",
      "time": "12:55pm 12/12/2016"
    },
    {
      "text":"I recently went to a ramen place in Philly. So amazing!",
      "movement":"",
      "user": "jrtashjian",
      "time": "12:55pm 12/12/2016"
    }
  ],
  "_ep9kiQcVy":[
    {
      "text":"All bundled up!  Where ya goin?",
      "movement":"",
      "user": "sophie_and_sadie",
      "time": "12:55pm 12/12/2016"
    }
  ],
  "_XpJcrwcSn":[
    {
      "text":"Super congrats! That's wicked cool and looks great.",
      "movement":"",
      "user": "pmgllc",
      "time": "12:55pm 12/12/2016"
    },
    {
      "text":"real live paper magazine? woah haha. flex box is awesome though, could rage quit without it",
      "movement":"",
      "user": "tjholowaychuk2",
      "time": "12:55pm 12/12/2016"
    },
    {
      "text":"@tjholowaychuk2 haha yes! Old school stylez!",
      "movement":"",
      "user": "wesbos",
      "time": "12:55pm 12/12/2016"
    }
  ],
  "_KnU7MwceA":[

  ],
  "_HMejJQcY5":[
    {
      "text":"ðŸ‘Œ",
      "movement":"",
      "user": "t_volpe",
      "time": "12:55pm 12/12/2016"
    },
    {
      "text":"Nice shot, mister!",
      "movement":"",
      "user": "imagesofthisandthat",
      "time": "12:55pm 12/12/2016"
    }
  ],
  "_Fq2zmwcaz":[
    {
      "text":"ðŸ˜",
      "movement":"",
      "user": "melsariffodeen",
      "time": "12:55pm 12/12/2016"
    },
    {
      "text":"Very cool!",
      "movement":"",
      "user": "ka11away",
      "time": "12:55pm 12/12/2016"
    }
  ],
  "_A2r0aQcfD":[
    {
      "text":"Uhu!",
      "movement":"",
      "user": "lucascaixeta",
      "time": "12:55pm 12/12/2016"
    }
  ],
  "1rhFawccs":[
    {
      "text":"What's your lighting source?",
      "user": "seth_mcleod",
      "time": "12:55pm 12/12/2016"
    },
    {
      "text":"And what are you using for XLR mix adapter? I found a big price jump between $55 range and $170 range.",
      "user": "pmgllc",
      "time": "12:55pm 12/12/2016"
    },
    {
      "text":"I still need a desk boom for mine mic. Nice upgrades",
      "user": "stolinski",
      "time": "12:55pm 12/12/2016"
    }
  ],
  "pjx-gQcVi":[

  ],
  "oTZ0zQcWt":[
    {
      "text":"Love the coat! Where's it from? Lol",
      "user": "_lindersss",
      "time": "12:55pm 12/12/2016"
    }
  ],
  "mxKQoQcQh":[

  ],
  "hZh6IQcfN":[
    {
      "text":"What do we gotta do to get some :)? @wesbos",
      "user": "jonasbad",
      "time": "12:55pm 12/12/2016"
    },
    {
      "text":"Might drop by today - real quick. Trade you an illegal pin for these? Lol. @wesbos",
      "user": "henrihelvetica",
      "time": "12:55pm 12/12/2016"
    },
    {
      "text":"I'm with @jonasbad on this. What we gotta do? :D",
      "user": "datamoshr",
      "time": "12:55pm 12/12/2016"
    },
    {
      "text":"@jonasbad @datamoshr I'll issue them up on my blog soon!",
      "user": "wesbos",
      "time": "12:55pm 12/12/2016"
    },
    {
      "text":"Want",
      "user": "kamuelafranco",
      "time": "12:55pm 12/12/2016"
    },
    {
      "text":"want!",
      "user": "josemanuelxyz",
      "time": "12:55pm 12/12/2016"
    },
    {
      "text":"#Top",
      "user": "gabrielvieira.me",
      "time": "12:55pm 12/12/2016"
    }
  ],
  "fasqlQceO":[
    {
      "text":"Where's lux at? ðŸ’¤?",
      "user": "henrihelvetica",
      "time": "12:55pm 12/12/2016"
    },
    {
      "text":"Love this house during the holidays! And all other times of the year...",
      "user": "danielleplas",
      "time": "12:55pm 12/12/2016"
    }
  ],
  "VBgtGQcSf":[
    {
      "text":"@dogsandbrew",
      "user": "likea_bos",
      "time": "12:55pm 12/12/2016"
    },
    {
      "text":"Next on my list!",
      "user": "tomwalsham",
      "time": "12:55pm 12/12/2016"
    },
    {
      "text":"Is that from collective arts ?",
      "user": "trevorb_91",
      "time": "12:55pm 12/12/2016"
    }
  ],
  "FpTyHQcau":[
    {
      "text":"@kaitbos  that vest!!! ðŸ˜",
      "user": "courtneyeveline",
      "time": "12:55pm 12/12/2016"
    },
    {
      "text":"I just love her! @kaitbos",
      "user": "kalibrix",
      "time": "12:55pm 12/12/2016"
    },
    {
      "text":"@courtneyeveline I know! My friend gave it to her and I wanted a matching one but only Lux can pull it off. She's so fancy ðŸ˜‰",
      "user": "kaitbos",
      "time": "12:55pm 12/12/2016"
    },
    {
      "text":"Char has that vest!!! Super cute!",
      "user": "jennlensink",
      "time": "12:55pm 12/12/2016"
    },
    {
      "text":"You'll have to meet her soon @kalibrix!!",
      "user": "kaitbos",
      "time": "12:55pm 12/12/2016"
    },
    {
      "text":"Haha @kaitbos so true, babies these days are sooo stylish. ðŸ˜Ž",
      "user": "courtneyeveline",
      "time": "12:55pm 12/12/2016"
    },
    {
      "text":"JavaScript ðŸ˜„ðŸ˜†ðŸ™‹",
      "user": "lucascaixeta",
      "time": "12:55pm 12/12/2016"
    },
    {
      "text":"That hoodie is amazing! Where did you get it?",
      "user": "br11x",
      "time": "12:55pm 12/12/2016"
    },
    {
      "text":"@br11x I did a teespring a few months ago - maybe I'll do another one soon",
      "user": "wesbos",
      "time": "12:55pm 12/12/2016"
    }
  ],
  "B3eiIwcYV":[
    {
      "text":"If you get in the mood for authentic Italian pizza, check out @backspaceaustin - it'sðŸ‘ŒðŸ»",
      "user": "dessie.ann",
      "time": "12:55pm 12/12/2016"
    },
    {
      "text":"ðŸ˜± jealous",
      "user": "jenngbrewer",
      "time": "12:55pm 12/12/2016"
    }
  ]
};

function replaceAll(str, find, replace) {
  return str.replace(new RegExp(find, 'g'), replace);
}

//This would be performed on the server in a real app. Just stubbing in.
const generateId = (comment) => {
  return replaceAll(comment.title, ' ', '-');
};

class IssueApi {
  static getAllComments() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(Object.assign([], comments));
      }, delay);
    });
  }


 
}

export default IssueApi;
