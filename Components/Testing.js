const contactDetails = [
  {
    contactType: "person",
    firstName: "React",
    id: "1",
    imageAvailable: false,
    lastName: "User",
    lookupKey: "0r1-4C322A2E50524E324C",
    name: "React User",
    phoneNumbers: [
      {
        id: "1",
        isPrimary: 0,
        label: "mobile",
        number: "045030934",
        type: "2",
      },
    ],
  },
  {
    contactType: "person",
    firstName: "Test ",
    id: "2",
    imageAvailable: false,
    lastName: "User",
    lookupKey: "0r2-50324E50524E324C",
    name: "Test User",
    phoneNumbers: [
      {
        id: "5",
        isPrimary: 0,
        label: "mobile",
        number: "(893) 434-134",
        type: "2",
      },
    ],
  },
  {
    contactType: "person",
    firstName: "User",
    id: "3",
    imageAvailable: false,
    lastName: "Testing",
    lookupKey: "0r3-524E324C50324E503A4436",
    name: "User Testing",
    phoneNumbers: [
      {
        id: "7",
        isPrimary: 0,
        label: "mobile",
        number: "555-5555",
        type: "2",
      },
    ],
  },
];

// const dataObject = contactDetails.map((data) => {
//   return data.id;
// });

// const matchIndex = (elem) => elem === "2";

// const findIndex = dataObject.findIndex(matchIndex);

// const newCotactDetails = contactDetails.splice(1, 1);

// const editData = newCotactDetails.map((item) => item.name === "User changes")

let result = contactDetails.filter((data) => data.id == 2);

if (result) {
  result.map((data) => (data.name = "User changes"));
}

console.log(contactDetails);
