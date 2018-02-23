// we use ES5 code because current mongo versions are not compatible with ES6

// *** users
var derek = {
    _id: ObjectId(),
    email: "derek@dkit.ie"
};
var Kylian = {
    _id: ObjectId(),
    email: "kylian@iut.fr"
};
db.users.drop();
db.users.insert([derek, Kylian]);


// *** activities
var festivcolor = {
    _id: ObjectId(),
    name: "Festival of Colours",
    nature: "event",
    editor: {
        _id: Kylian._id,
        email: Kylian.email
    },
    pictures: ["/images/Gdansk/event1.jpg", "/images/Gdansk/event1a.jpg"],
    comments: [{
        user: {
            _id: derek._id,
            email: derek.email
        },
        date: new Date("2014"),
        text: "I love this place !!"
    }, {
        user: {
            _id: Kylian._id,
            email: Kylian.email
        },
        date: new Date("2015"),
        text: "Bof!"
    }],
    likers: [],
    description: "The Festival of Colors is the largest colorful party in Poland! This popular game is about throwing up the thousands of colorful Holi colors that create a great cloud of colors! The festival is filled with the atmosphere of eternal merriment. Young and old, everyone is dancing, singing and playing, throwing Colors in the air!\n" +
    "Color reproaches at every full hour, in which thousands of participants take part will have to have each schedule! Yellow glasses from our yellow sponsor Lipton Ice Tea like every year will fall from the sky like stars. In selected cities, they are also organized in the green-fruit photo shoot of Tutti-Frutti and the colorful Maoam wheel. Your food will be taken care of by foodtrucks in a gastronomic town with delicacies from different parts of the world. Our galleries will be bursting at the seams of Janka Ulicki's photographic relations, and we will prepare a video report from each event!\n" +
    "We want to change for the better for you, because thanks to this our summer color therapy works better and better!\n" +
    "Because we have noticed that there are people who love colors, just like us, who, like us, draw energy from space and follow us to different cities, decided to reward all those who send us their photos to the end of September our events :)",
    url: ""
};
var oldtown = {
    _id: ObjectId(),
    name: "Old Town",
    nature: "place",
    editor: {
        _id: Kylian._id,
        email: Kylian.email
    },
    pictures: ["/images/Gdansk/place1.jpg", "/images/Gdansk/place1a.jpg"],
    comments: [{
        user: {
            _id: derek._id,
            email: derek.email
        },
        date: new Date(),
        text: "great"
    }],
    likers: [],
    description: "We should point out that our definition of the old town is not the strict definition of Old Town (Stare Miasto). In terms of defining a district for you the reader, we have defined the old town as the area to the east of Wały Jagiellońskie, the north of Podwale Przedmiejskie (that horrible dual-carriageay driven through the remains of the city by the post-war authorities) and west from the far banks of the Nowa Motława river. The northern border can be imagined as being the area by the European Solidarity Centre and Pl. Solidarnosci. While describing this area as the old town is not strictly correct, it is the area most locals would refer to as the Starówka and covers the area where you will find most of the historic places of interest. It's official name is Śródmieście (literally Downtown).\n" +
    "\n" +
    "The strick definition of Old Town meanwhile is the area of the Starówka where the city began. If you head for the church of St. Nicholas (św. Mikołaja) and the adjacent market hall and square, you'll find yourself on the southern edge of the district of the city named Stare Miasto (Old Town). Take a visit to Romanesque Cellar where you can see the results of years of archaelogical research and a short film showing how the original settlement grew up in this area."
};
var connemara = {
    _id: ObjectId(),
    name: "The Connemara Mountain Walking Festival",
    nature: "place",
    editor: {
        _id: Kylian._id,
        email: Kylian.email
    },
    pictures: ["/images/Galway/event1.jpg", "/images/Galway/event1a.jpg"],
    comments: [{
        user: {
            _id: derek._id,
            email: derek.email
        },
        date: new Date(),
        text: ""
    }],
    likers: [],
    description: "The Connemara Mountain Walking Festival is an amazing chance to experience the natural beauty surrounding the village of Leenane and Killary Harbour, with a series of guided walks that explore the nearby mountains across the May Bank Holiday Weekend.\n" +
    "The hikes in this year’s programme include treks to mountains of Mweelrea, Benbaun, and Maumtrasna amongst others. There will be at least three walks available each day, with hikes suitable for everyone from the very experienced to the casual walker.\n" +
    "As it’s the tenth anniversary of the festival, the organisers will also be putting some unique events outside the walks, including a table quiz on Saturday evening and céilí on the Sunday night.\n" +
    "All the walks are led by experienced and qualified guides and undertaken with the permission of the farmers who own the land, who are happy to share the beauty of Connemara with those who take part.\n",
    url: "",
    dateStart: new Date('2016-6-15'),
    dateEnd: new Date('2016-7-10')
}
var seafest = {
    _id: ObjectId(),
    name: "SeaFest",
    nature: "event",
    editor: {
        _id: Kylian._id,
        email: Kylian.email
    },
    pictures: ["/images/Galway/event2.jpg", "/images/Galway/event2a.jpg"],
    comments: [{
        user: {
            _id: derek._id,
            email: derek.email
        },
        date: new Date(),
        text: ""
    }],
    likers: [],
    description: "July. Taking in a multitude events, the festival covers everything to do with the sea and will have something for all ages.\n" +
    "The line-up includes such treats as a Bord Bia seafood cookery showcase, an exhibition by flyboarders performing acrobatic stunts, tours of boats and ships of all different sorts and even some shipwrecks and creatures of the deep.\n" +
    "One of the highlights is the Our Ocean Wealth Summit, which is a feature of each edition of the festival and examines our commercial relationship with our maritime resources, Meanwhile also on offer are historical and cultural explorations of Ireland’s seafaring history, as well as dedicated kids’ zones.\n" +
    "Most of events taking place across the weekend are free, just some require tickets, so why not climb aboard for SeaFest 2018",
    url: "http://festival-aix.com/en",
    dateStart: new Date('2016-6-15'),
    dateEnd: new Date('2016-7-10')
};
db.activities.drop();
db.activities.insert([oldtown, festivcolor, seafest, connemara]);


// **** cities
var gdansk = {
    _id: ObjectId(),
    name: 'Gdańsk\n',
    coordinates: {
        long: "18.64663840000003",
        lat: "54.35202520000001"
    },
    description: "Gdansk is a Polish city on the Baltic coast. It is the capital of the Pomeranian Voivodeship, Poland's principal seaport and the centre of the country's fourth-largest metropolitan area.[2]\n" +
    "\n" +
    "Gdańsk is the capital of Gdańsk Pomerania and the largest city of Kashubia. With its origins as a Polish stronghold erected in the 980s by Mieszko I of Poland, the city's history is complex, with periods of Polish rule, periods of Prussian or German rule, and periods of autonomy or self-rule as a \"free city\". In the early-modern age Gdańsk was a royal city of Poland. It was considered the wealthiest and the largest city of Poland, prior to the 18th century rapid growth of Warsaw. Between the world wars, the Free City of Danzig was in a customs union with Poland and was located between German East Prussia and the so-called Polish Corridor.\n" +
    "\n" +
    "Gdańsk lies at the mouth of the Motława River, connected to the Leniwka, a branch in the delta of the nearby Vistula River, which drains 60 percent of Poland and connects Gdańsk with the Polish capital, Warsaw. Together with the nearby port of Gdynia, Gdańsk is also an important industrial center. In the late Middle Ages it was an important seaport and shipbuilding town, and in the 14th and 15th centuries a member of the Hanseatic League.",
    picture: '/images/Gdansk/gdansk-bg.jpg',
    activities: [{
        _id: festivcolor._id,
        name: festivcolor.name,
        nature: festivcolor.nature,
        picture: festivcolor.pictures[0]
    }, {
        _id: oldtown._id,
        name: oldtown.name,
        nature: oldtown.nature,
        picture: oldtown.pictures[0]
    }]
};

var galway = {
    _id: ObjectId(),
    name: 'Galway',
    coordinates: {
        lat: "53.270962",
        long: "-9.062691"
    },
    description: "Galway is a city in the West of Ireland in the province of Connacht. Galway City Council is the local authority for the city. Galway lies on the River Corrib between Lough Corrib and Galway Bay and is surrounded by County Galway. It is the fourth most populous urban area in the Republic of Ireland and the sixth most populous city in the island of Ireland.\n" +
    "" +
    "According to the 2016 Irish Census, Galway city has a population of 79,504; however, the rural county agglomeration is far more populous." +
    "" +
    "Galway will be the European Capital of Culture in 2020, alongside Rijeka, Croatia.",
    picture: '/images/Galway/galway-bg.jpg',
    activities: [{
        _id: connemara._id,
        name: connemara.name,
        nature: connemara.nature,
        picture: connemara.pictures[0]
    },{
        _id: seafest._id,
        name: seafest.name,
        nature: seafest.nature,
        picture: seafest.pictures[0]
    }
    ]
};
db.cities.drop();
db.cities.insert([gdansk, galway]);
