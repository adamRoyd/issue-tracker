import delay from './delay';
import status from '../constants/status';
import users from '../constants/users';

// This file mocks a web API by working with the hard-coded data below.
// It uses setTimeout to simulate the delay of an AJAX call.
// All calls return promises.
const comments = {
  "1":[
    {
      "text":"Fixed",
      "movement":"Fixed",
      "user": "Adam Boothroyd"
      //time
      //attachment
    },
    {
      "text":"Not Fixed",
      "movement":"Ready to Fix",
      "user": "Simon Hollobon"
    },
    {
      "text":"@jdaveknox yes!",
      "movement":"",
      "user": "wesbos"
    },
    {
      "text":"Yes this is an issue yes yes!",
      "movement":"",
      "user": "willowtreemegs"
    }
  ],
  "2":[
    {
      "text":"Wes. WE should have lunch.",
      "movement":"",
      "user": "jdaveknox"
    },
    {
      "text":"#adults",
      "movement":"",
      "user": "jdaveknox"
    },
    {
      "text":"@jdaveknox yes!",
      "movement":"",
      "user": "wesbos"
    },
    {
      "text":"ðŸ˜ love Hamilton!",
      "movement":"",
      "user": "willowtreemegs"
    }
  ],
  "3":[
    {
      "text":"Those are cute! They're like silver dollar pancakes.",
      "movement":"",
      "user": "rrsimonsen"
    },
    {
      "text":"I like baby pancakes but gluten free please!! I'll bring the coffee!! See you in 6 days!!!!!! ðŸ˜ðŸ˜›ðŸ˜â™¥ï¸",
      "movement":"",
      "user": "terzisn"
    },
    {
      "text":"... and apparently growing baby. ðŸ‘€. Yum.",
      "movement":"",
      "user": "henrihelvetica"
    },
    {
      "text":"@wesbos ðŸ‘ my daughter is a pancake eating machine!",
      "movement":"",
      "user": "brentoage"
    },
    {
      "text":"Nice stove!",
      "movement":"",
      "user": "haaps"
    },
    {
      "text":"Genius bottle use! Do you make a single batch of batter or make a lot and freeze it?",
      "movement":"",
      "user": "gobananna"
    },
    {
      "text":"@gobananna I just made a batch and put in in a FIFO bottle. Keeps in the fridge for a few days.",
      "movement":"",
      "user": "wesbos"
    },
    {
      "text":"@haaps thanks! It's a Jenn air - so nice to cool with!",
      "movement":"",
      "user": "wesbos"
    },
    {
      "text":"Where would you go and for how long, if you had location freedom? - Greg ðŸŒŽ",
      "movement":"",
      "user": "world_greg"
    }
  ],
  "4":[
    {
      "text":"Looking great Wes! I'd like to see the other side of the room too.",
      "movement":"",
      "user": "axcdnt"
    },
    {
      "text":"I've never caught your podcast. Have one right? Btw - they don't have a Canary pillow? ðŸ˜",
      "movement":"",
      "user": "henrihelvetica"
    },
    {
      "text":"Great way to start the year.",
      "movement":"",
      "user": "pmgllc"
    },
    {
      "text":"Are there 4k monitors?",
      "movement":"",
      "user": "alexbaumgertner"
    },
    {
      "text":"@axcdnt that is where I put all the junk. I'll have to clean that side too @henrihelvetica no podcast yet! @pmgllc ohh yeah! @alexbaumgertner yep - the main one is 4K - I'm loving it",
      "movement":"",
      "user": "wesbos"
    },
    {
      "text":"That chrome pillow. ðŸ˜‰",
      "movement":"",
      "user": "imagesofthisandthat"
    },
    {
      "text":"@wesbos is that the Dell 4k? The MacBook Pro powers it well? I also have a Retinaâ„¢ / x1 setup as well. Very handy.",
      "movement":"",
      "user": "henrihelvetica"
    },
    {
      "text":"#minimalsetups",
      "movement":"",
      "user": "wesbos"
    }
  ],
  "5":[
    {
      "text":"that is the sound of success!",
      "movement":"",
      "user": "mdxprograms"
    }
  ],
  "6":[
    {
      "text":"Did she get to eat her letter?",
      "movement":"",
      "user": "pathiebert"
    },
    {
      "text":"Nope @pathiebert! She has too much teeth now (8) so that would definitely be her first cavity ðŸ˜‰",
      "movement":"",
      "user": "kaitbos"
    }
  ],
  "_rmvQfQce8":[
    {
      "text":"A+",
      "movement":"",
      "user": "mrjoedee"
    },
    {
      "text":"I recently went to a ramen place in Philly. So amazing!",
      "movement":"",
      "user": "jrtashjian"
    }
  ],
  "_ep9kiQcVy":[
    {
      "text":"All bundled up!  Where ya goin?",
      "movement":"",
      "user": "sophie_and_sadie"
    }
  ],
  "_XpJcrwcSn":[
    {
      "text":"Super congrats! That's wicked cool and looks great.",
      "movement":"",
      "user": "pmgllc"
    },
    {
      "text":"real live paper magazine? woah haha. flex box is awesome though, could rage quit without it",
      "movement":"",
      "user": "tjholowaychuk2"
    },
    {
      "text":"@tjholowaychuk2 haha yes! Old school stylez!",
      "movement":"",
      "user": "wesbos"
    }
  ],
  "_KnU7MwceA":[

  ],
  "_HMejJQcY5":[
    {
      "text":"ðŸ‘Œ",
      "movement":"",
      "user": "t_volpe"
    },
    {
      "text":"Nice shot, mister!",
      "movement":"",
      "user": "imagesofthisandthat"
    }
  ],
  "_Fq2zmwcaz":[
    {
      "text":"ðŸ˜",
      "movement":"",
      "user": "melsariffodeen"
    },
    {
      "text":"Very cool!",
      "movement":"",
      "user": "ka11away"
    }
  ],
  "_A2r0aQcfD":[
    {
      "text":"Uhu!",
      "movement":"",
      "user": "lucascaixeta"
    }
  ],
  "1rhFawccs":[
    {
      "text":"What's your lighting source?",
      "user": "seth_mcleod"
    },
    {
      "text":"And what are you using for XLR mix adapter? I found a big price jump between $55 range and $170 range.",
      "user": "pmgllc"
    },
    {
      "text":"I still need a desk boom for mine mic. Nice upgrades",
      "user": "stolinski"
    }
  ],
  "pjx-gQcVi":[

  ],
  "oTZ0zQcWt":[
    {
      "text":"Love the coat! Where's it from? Lol",
      "user": "_lindersss"
    }
  ],
  "mxKQoQcQh":[

  ],
  "hZh6IQcfN":[
    {
      "text":"What do we gotta do to get some :)? @wesbos",
      "user": "jonasbad"
    },
    {
      "text":"Might drop by today - real quick. Trade you an illegal pin for these? Lol. @wesbos",
      "user": "henrihelvetica"
    },
    {
      "text":"I'm with @jonasbad on this. What we gotta do? :D",
      "user": "datamoshr"
    },
    {
      "text":"@jonasbad @datamoshr I'll issue them up on my blog soon!",
      "user": "wesbos"
    },
    {
      "text":"Want",
      "user": "kamuelafranco"
    },
    {
      "text":"want!",
      "user": "josemanuelxyz"
    },
    {
      "text":"#Top",
      "user": "gabrielvieira.me"
    }
  ],
  "fasqlQceO":[
    {
      "text":"Where's lux at? ðŸ’¤?",
      "user": "henrihelvetica"
    },
    {
      "text":"Love this house during the holidays! And all other times of the year...",
      "user": "danielleplas"
    }
  ],
  "VBgtGQcSf":[
    {
      "text":"@dogsandbrew",
      "user": "likea_bos"
    },
    {
      "text":"Next on my list!",
      "user": "tomwalsham"
    },
    {
      "text":"Is that from collective arts ?",
      "user": "trevorb_91"
    }
  ],
  "FpTyHQcau":[
    {
      "text":"@kaitbos  that vest!!! ðŸ˜",
      "user": "courtneyeveline"
    },
    {
      "text":"I just love her! @kaitbos",
      "user": "kalibrix"
    },
    {
      "text":"@courtneyeveline I know! My friend gave it to her and I wanted a matching one but only Lux can pull it off. She's so fancy ðŸ˜‰",
      "user": "kaitbos"
    },
    {
      "text":"Char has that vest!!! Super cute!",
      "user": "jennlensink"
    },
    {
      "text":"You'll have to meet her soon @kalibrix!!",
      "user": "kaitbos"
    },
    {
      "text":"Haha @kaitbos so true, babies these days are sooo stylish. ðŸ˜Ž",
      "user": "courtneyeveline"
    },
    {
      "text":"JavaScript ðŸ˜„ðŸ˜†ðŸ™‹",
      "user": "lucascaixeta"
    },
    {
      "text":"That hoodie is amazing! Where did you get it?",
      "user": "br11x"
    },
    {
      "text":"@br11x I did a teespring a few months ago - maybe I'll do another one soon",
      "user": "wesbos"
    }
  ],
  "B3eiIwcYV":[
    {
      "text":"If you get in the mood for authentic Italian pizza, check out @backspaceaustin - it'sðŸ‘ŒðŸ»",
      "user": "dessie.ann"
    },
    {
      "text":"ðŸ˜± jealous",
      "user": "jenngbrewer"
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
