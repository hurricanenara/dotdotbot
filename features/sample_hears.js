/**
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
const masterArrayFunc = require('./thread_bank/master');
const masterArray = masterArrayFunc();
// const masterArray = [
//     {
//         "command": "hello",
//         "description": "Respond when a human says hello!",
//         "script": [
//             {
//                 "topic": "default",
//                 "script": [
//                     {
//                         "text": [
//                             "Hello Human!",
//                             "How do you do?",
//                             "Nice to meet you Human.",
//                             "Hi!",
//                             "How’s it going?",
//                             "Hey!",
//                             "Hey there!",
//                             "Howdy!",
//                             "G`day human!",
//                             "Salut!",
//                             "Ciao!",
//                             "Hola!",
//                             "Shalom!"
//                         ],
//                         "collect": null
//                     },
//                     {
//                         "action": "main_thread"
//                     }
//                 ]
//             },
//             {
//                 "topic": "main_thread",
//                 "script": [
//                     {
//                         "text": [
//                             "Ask me something or say 'help'"
//                         ],
//                         "collect": {
//                             "key": "temporary_value",
//                             "options": [
//                                 {
//                                     "default": true,
//                                     "pattern": "default",
//                                     "action": "repeat"
//                                 },
//                                 {
//                                     "pattern": "help",
//                                     "type": "regex",
//                                     "action": "main_thread_qr"
//                                 }
//                             ]
//                         }
//                     },
//                     {
//                         "action": "complete"
//                     }
//                 ]
//             },
//             {
//                 "topic": "about_thread",
//                 "script": [
//                     {
//                         "text": [
//                             "You clicked 'About'"
//                         ]
//                     },
//                     {
//                         "text": [
//                             "I'm Nara! I recently graduated from App Academy and I live in New York."
//                         ]
//                     },
//                     {
//                         "action": "about_qr1"
//                     }
//                 ]
//             },
//             {
//                 "topic": "education_thread",
//                 "script": [
//                     {
//                         "text": [
//                             "I have a B.S. from South Dakota School of Mines. My background is in Industrial Engineering and Human Factors."
//                         ]
//                     },
//                     {
//                         "action": "education_qr"
//                     }
//                 ]
//             },
//             {
//                 "topic": "funfacts_thread",
//                 "script": [
//                     {
//                         "text": [
//                             "This is funfacts_thread"
//                         ]
//                     },
//                     {
//                         "action": "complete"
//                     }
//                 ]
//             },
//             {
//                 "topic": "experience_thread",
//                 "script": [
//                     {
//                         "text": [
//                             "I have 4 years of experience as an analyst and handful of engineering internships."
//                         ]
//                     },
//                     {
//                         "text": [
//                             "Click one of the below to find out more:"
//                         ]
//                     },
//                     {
//                         "action": "exp_thread_qr"
//                     }
//                 ]
//             },
//             {
//                 "topic": "favoriateFood_sub",
//                 "script": [
//                     {
//                         "text": [
//                             "My favorite food is anything spicy. I love Korean food, Indian, American, etc."
//                         ]
//                     },
//                     {
//                         "text": [
//                             "Do you want to know anything else?"
//                         ],
//                         "quick_replies": [
//                             {
//                                 "title": "Favorite Fruit",
//                                 "payload": "favoriteFruit",
//                                 "content_type": "text"
//                             },
//                             {
//                                 "title": "Favoriate Resto in NYC",
//                                 "payload": "faveRestoNYC",
//                                 "content_type": "text"
//                             },
//                             {
//                                 "title": "No, that's all.",
//                                 "payload": "no",
//                                 "content_type": "text"
//                             }
//                         ],
//                         "collect": {
//                             "key": "temporary_value",
//                             "options": [
//                                 {
//                                     "default": true,
//                                     "pattern": "default",
//                                     "action": "next"
//                                 },
//                                 {
//                                     "pattern": "favoriteFruit",
//                                     "type": "regex",
//                                     "action": "favoriteFruit_subsub"
//                                 },
//                                 {
//                                     "pattern": "faveRestoNYC",
//                                     "type": "regex",
//                                     "action": "favoriateResto_subsub"
//                                 },
//                                 {
//                                     "pattern": "no",
//                                     "type": "utterance",
//                                     "action": "next"
//                                 }
//                             ]
//                         }
//                     },
//                     {
//                         "action": "complete"
//                     }
//                 ]
//             },
//             {
//                 "topic": "musical_sub",
//                 "script": [
//                     {
//                         "text": [
//                             "I've played the piano since I was 8."
//                         ]
//                     },
//                     {
//                         "action": "musical_sub_qr"
//                     }
//                 ]
//             },
//             {
//                 "topic": "favoriateGame_sub",
//                 "script": [
//                     {
//                         "text": [
//                             "I'm a big fan of Age of Empires (oldie but a goodie) and other games alike. I'm also crazy about Tetris."
//                         ]
//                     },
//                     {
//                         "action": "about_qr1"
//                     }
//                 ]
//             },
//             {
//                 "topic": "favoriteFruit_subsub",
//                 "script": [
//                     {
//                         "text": [
//                             "My favorite fruit is watermelon. One summer, I ate an entire watermelon in one day."
//                         ],
//                         "meta": []
//                     },
//                     {
//                         "action": "favoriate_food_sub_qr"
//                     }
//                 ]
//             },
//             {
//                 "topic": "favoriate_food_sub_qr",
//                 "script": [
//                     {
//                         "text": [
//                             "Do you want to know anything else?"
//                         ],
//                         "quick_replies": [
//                             {
//                                 "title": "Favorite Fruit",
//                                 "payload": "favoriteFruit",
//                                 "content_type": "text"
//                             },
//                             {
//                                 "title": "Favoriate Resto in NYC",
//                                 "payload": "faveRestoNYC",
//                                 "content_type": "text"
//                             },
//                             {
//                                 "title": "No, that's all.",
//                                 "payload": "no",
//                                 "content_type": "text"
//                             }
//                         ],
//                         "collect": {
//                             "key": "temporary_value",
//                             "options": [
//                                 {
//                                     "default": true,
//                                     "pattern": "default",
//                                     "action": "next"
//                                 },
//                                 {
//                                     "pattern": "favoriteFruit",
//                                     "type": "regex",
//                                     "action": "favoriteFruit_subsub"
//                                 }
//                             ]
//                         }
//                     },
//                     {
//                         "action": "complete"
//                     }
//                 ]
//             },
//             {
//                 "topic": "favoriateResto_subsub",
//                 "script": [
//                     {
//                         "text": [
//                             "My favorite restaurant in NYC is Jongro KBBQ in K-town. Their galbi and pork belly are a must-try!"
//                         ]
//                     },
//                     {
//                         "action": "favoriateFood_sub"
//                     }
//                 ]
//             },
//             {
//                 "topic": "ask_main_menu",
//                 "script": [
//                     {
//                         "text": [
//                             "Go back to main?"
//                         ],
//                         "quick_replies": [
//                             {
//                                 "title": "Yes",
//                                 "payload": "yes",
//                                 "content_type": "text"
//                             },
//                             {
//                                 "title": "No",
//                                 "payload": "hello",
//                                 "content_type": "text"
//                             }
//                         ],
//                         "collect": {
//                             "key": "temporary_value",
//                             "options": [
//                                 {
//                                     "default": true,
//                                     "pattern": "default",
//                                     "action": "next"
//                                 },
//                                 {
//                                     "pattern": "yes",
//                                     "type": "utterance",
//                                     "action": "about_qr1"
//                                 },
//                                 {
//                                     "pattern": "no",
//                                     "type": "utterance",
//                                     "action": "quit_convo_undo"
//                                 }
//                             ]
//                         }
//                     },
//                     {
//                         "action": "complete"
//                     }
//                 ]
//             },
//             {
//                 "topic": "quit_convo_undo",
//                 "script": [
//                     {
//                         "text": [
//                             "Fun chattin' with you!"
//                         ],
//                         "quick_replies": [
//                             {
//                                 "title": "Go back",
//                                 "payload": "back",
//                                 "content_type": "text"
//                             },
//                             {
//                                 "title": "Quit Chat",
//                                 "payload": "quit",
//                                 "content_type": "text"
//                             }
//                         ],
//                         "meta": [],
//                         "collect": {
//                             "key": "temporary_value",
//                             "options": [
//                                 {
//                                     "default": true,
//                                     "pattern": "default",
//                                     "action": "next"
//                                 },
//                                 {
//                                     "pattern": "quit",
//                                     "type": "regex",
//                                     "action": "complete"
//                                 },
//                                 {
//                                     "pattern": "back",
//                                     "type": "regex",
//                                     "action": "undo_backsosoon"
//                                 }
//                             ]
//                         }
//                     },
//                     {
//                         "action": "complete"
//                     }
//                 ]
//             },
//             {
//                 "topic": "undo_backsosoon",
//                 "script": [
//                     {
//                         "text": [
//                             "Back so soon!"
//                         ]
//                     },
//                     {
//                         "action": "about_qr1"
//                     }
//                 ]
//             },
//             {
//                 "topic": "about_qr1",
//                 "script": [
//                     {
//                         "action": "complete"
//                     },
//                     {
//                         "text": [
//                             "Ask me questions or choose from below:"
//                         ],
//                         "quick_replies": [
//                             {
//                                 "title": "Favorite Food",
//                                 "payload": "favoriteFood",
//                                 "content_type": "text"
//                             },
//                             {
//                                 "title": "Musical Instrument",
//                                 "payload": "musical",
//                                 "content_type": "text"
//                             },
//                             {
//                                 "title": "Favorite Game",
//                                 "payload": "favoriteGame",
//                                 "content_type": "text"
//                             },
//                             {
//                                 "title": "Go Back",
//                                 "payload": "back",
//                                 "content_type": "text"
//                             }
//                         ],
//                         "collect": {
//                             "key": "temporary_value",
//                             "options": [
//                                 {
//                                     "default": true,
//                                     "pattern": "default",
//                                     "action": "next"
//                                 },
//                                 {
//                                     "pattern": "favoriateFood",
//                                     "type": "regex",
//                                     "action": "favoriateFood_sub"
//                                 },
//                                 {
//                                     "pattern": "musical",
//                                     "type": "regex",
//                                     "action": "musical_sub"
//                                 },
//                                 {
//                                     "pattern": "favoriteGame",
//                                     "type": "regex",
//                                     "action": "favoriateGame_sub"
//                                 },
//                                 {
//                                     "pattern": "back",
//                                     "type": "regex",
//                                     "action": "main_thread_qr"
//                                 }
//                             ]
//                         }
//                     }
//                 ]
//             },
//             {
//                 "topic": "main_thread_qr",
//                 "script": [
//                     {
//                         "text": [
//                             ""
//                         ],
//                         "collect": {
//                             "key": "temporary_value",
//                             "options": [
//                                 {
//                                     "default": true,
//                                     "pattern": "default",
//                                     "action": "next"
//                                 },
//                                 {
//                                     "pattern": "about",
//                                     "type": "regex",
//                                     "action": "about_thread"
//                                 },
//                                 {
//                                     "pattern": "education",
//                                     "type": "regex",
//                                     "action": "education_thread"
//                                 },
//                                 {
//                                     "pattern": "funfacts",
//                                     "type": "regex",
//                                     "action": "funfacts_thread"
//                                 },
//                                 {
//                                     "pattern": "experience",
//                                     "type": "regex",
//                                     "action": "experience_thread"
//                                 },
//                                 {
//                                     "pattern": "main",
//                                     "type": "string",
//                                     "action": "main_thread"
//                                 },
//                                 {
//                                     "pattern": "techStack",
//                                     "type": "regex",
//                                     "action": "techStack_thread"
//                                 },
//                                 {
//                                     "pattern": "contact",
//                                     "type": "regex",
//                                     "action": "contact_thread"
//                                 }
//                             ]
//                         },
//                         "quick_replies": [
//                             {
//                                 "title": "About",
//                                 "payload": "about",
//                                 "content_type": "text"
//                             },
//                             {
//                                 "title": "Education",
//                                 "payload": "education",
//                                 "content_type": "text"
//                             },
//                             {
//                                 "title": "Experience",
//                                 "payload": "experience",
//                                 "content_type": "text"
//                             },
//                             {
//                                 "title": "Fun Facts",
//                                 "payload": "funfacts",
//                                 "content_type": "text"
//                             },
//                             {
//                                 "title": "Tech Stack",
//                                 "payload": "techStack",
//                                 "content_type": "text"
//                             },
//                             {
//                                 "title": "Contact",
//                                 "payload": "contact",
//                                 "content_type": "text"
//                             }
//                         ],
//                         "meta": []
//                     },
//                     {
//                         "action": "complete"
//                     }
//                 ]
//             },
//             {
//                 "topic": "musical_sub_qr",
//                 "script": [
//                     {
//                         "text": [
//                             "Want to know more?"
//                         ],
//                         "quick_replies": [
//                             {
//                                 "title": "Favorite Composer",
//                                 "payload": "composer",
//                                 "content_type": "text"
//                             },
//                             {
//                                 "title": "Favorite Music",
//                                 "payload": "faveMusic",
//                                 "content_type": "text"
//                             },
//                             {
//                                 "title": "No, go back",
//                                 "payload": "back",
//                                 "content_type": "text"
//                             }
//                         ],
//                         "collect": {
//                             "key": "temporary_value",
//                             "options": [
//                                 {
//                                     "default": true,
//                                     "pattern": "default",
//                                     "action": null
//                                 },
//                                 {
//                                     "pattern": "composer",
//                                     "type": "regex",
//                                     "action": "composer_thread"
//                                 }
//                             ],
//                             "multiple": false
//                         }
//                     },
//                     {
//                         "action": "complete"
//                     }
//                 ]
//             },
//             {
//                 "topic": "composer_thread",
//                 "script": [
//                     {
//                         "text": [
//                             "My favorite composers are Bach, Handel, Pachelbel to name a few. I like Baroque music!"
//                         ]
//                     },
//                     {
//                         "action": "main_thread_qr"
//                     }
//                 ]
//             },
//             {
//                 "topic": "education_qr",
//                 "script": [
//                     {
//                         "text": [
//                             "Education"
//                         ],
//                         "quick_replies": [
//                             {
//                                 "title": "Where is School of Mines?",
//                                 "payload": "sdsmt",
//                                 "content_type": "text"
//                             },
//                             {
//                                 "title": "Why Industrial Engineering?",
//                                 "payload": "whyIE",
//                                 "content_type": "text"
//                             },
//                             {
//                                 "title": "Go back",
//                                 "payload": "goBack",
//                                 "content_type": "text"
//                             }
//                         ],
//                         "collect": {
//                             "key": "temporary_value",
//                             "options": [
//                                 {
//                                     "default": true,
//                                     "pattern": "default",
//                                     "action": "next"
//                                 },
//                                 {
//                                     "pattern": "goBack",
//                                     "type": "regex",
//                                     "action": "main_thread_qr"
//                                 }
//                             ]
//                         }
//                     },
//                     {
//                         "action": "complete"
//                     }
//                 ]
//             },
//             {
//                 "topic": "exp_thread_qr",
//                 "script": [
//                     {
//                         "text": [
//                             ""
//                         ],
//                         "quick_replies": [
//                             {
//                                 "title": "Scorpio USA LLC",
//                                 "payload": "scorpio",
//                                 "content_type": "text"
//                             },
//                             {
//                                 "title": "School of Mines",
//                                 "payload": "schoolofmines",
//                                 "content_type": "text"
//                             },
//                             {
//                                 "title": "BD",
//                                 "payload": "bd",
//                                 "content_type": "text"
//                             },
//                             {
//                                 "title": "Samsung C&T",
//                                 "payload": "samsung",
//                                 "content_type": "text"
//                             },
//                             {
//                                 "title": "Hanwha E&C",
//                                 "payload": "hanwha",
//                                 "content_type": "text"
//                             },
//                             {
//                                 "title": "Go back",
//                                 "payload": "back",
//                                 "content_type": "text"
//                             }
//                         ],
//                         "collect": {
//                             "key": "temporary_value",
//                             "options": [
//                                 {
//                                     "default": true,
//                                     "pattern": "default",
//                                     "action": "repeat"
//                                 },
//                                 {
//                                     "pattern": "back",
//                                     "type": "regex",
//                                     "action": "main_thread_qr"
//                                 },
//                                 {
//                                     "pattern": "scorpio",
//                                     "type": "regex",
//                                     "action": "scorpio_thread"
//                                 },
//                                 {
//                                     "pattern": "schoolofmines",
//                                     "type": "regex",
//                                     "action": "mines_thread"
//                                 },
//                                 {
//                                     "pattern": "bd",
//                                     "type": "regex",
//                                     "action": "bd_thread"
//                                 },
//                                 {
//                                     "pattern": "samsung",
//                                     "type": "regex",
//                                     "action": "samsung_thread"
//                                 }
//                             ]
//                         }
//                     },
//                     {
//                         "action": "complete"
//                     }
//                 ]
//             },
//             {
//                 "topic": "scorpio_thread",
//                 "script": [
//                     {
//                         "text": [
//                             "Largest product tanker company in the world, Scorpio owns both refined oil (clean) tankers and drybulk carriers (grains, metals, wood, etc)."
//                         ]
//                     },
//                     {
//                         "text": [
//                             "I worked as an analyst (09/2015 - 09/2019), monitoring the oil and shipping markets, analyzing cargo and ship movement data using advanced Excel, macros, and VBA"
//                         ],
//                         "quick_replies": [
//                             {
//                                 "title": "Go back",
//                                 "payload": "back",
//                                 "content_type": "text"
//                             }
//                         ],
//                         "collect": {
//                             "key": "temporary_value",
//                             "options": [
//                                 {
//                                     "default": true,
//                                     "pattern": "default",
//                                     "action": "next"
//                                 },
//                                 {
//                                     "pattern": "back",
//                                     "type": "regex",
//                                     "action": "exp_thread_qr"
//                                 }
//                             ]
//                         }
//                     },
//                     {
//                         "action": "complete"
//                     }
//                 ]
//             },
//             {
//                 "topic": "mines_thread",
//                 "script": [
//                     {
//                         "text": [
//                             "I tutored college students 20hr/week (04/2013 - 05/2015) in Differential Equations, Calculus I & II, Probability & Statistics I & II, Biostatistics, and Statics."
//                         ],
//                         "quick_replies": [
//                             {
//                                 "title": "Go back",
//                                 "payload": "back",
//                                 "content_type": "text"
//                             }
//                         ],
//                         "collect": {
//                             "key": "temporary_value",
//                             "options": [
//                                 {
//                                     "default": true,
//                                     "pattern": "default",
//                                     "action": "next"
//                                 },
//                                 {
//                                     "pattern": "back",
//                                     "type": "regex",
//                                     "action": "exp_thread_qr"
//                                 }
//                             ]
//                         }
//                     },
//                     {
//                         "action": "complete"
//                     }
//                 ]
//             },
//             {
//                 "topic": "bd_thread",
//                 "script": [
//                     {
//                         "text": [
//                             "At BD, I worked as a Quality/EHS Intern in Preanalytical Systems. I managed and performed various statistical analysis on production performance. I also conducted the annual hearing conservation program to assure workers' health and safety (per OSHA guidelines)."
//                         ],
//                         "quick_replies": [
//                             {
//                                 "title": "Go back",
//                                 "payload": "back",
//                                 "content_type": "text"
//                             }
//                         ],
//                         "collect": {
//                             "key": "temporary_value",
//                             "options": [
//                                 {
//                                     "default": true,
//                                     "pattern": "default",
//                                     "action": "next"
//                                 },
//                                 {
//                                     "pattern": "back",
//                                     "type": "regex",
//                                     "action": "exp_thread_qr"
//                                 }
//                             ]
//                         }
//                     },
//                     {
//                         "action": "complete"
//                     }
//                 ]
//             },
//             {
//                 "topic": "samsung_thread",
//                 "script": [
//                     {
//                         "text": [
//                             "At Samsung, I worked as an IT Intra Intern (06/2011 - 07-2011), where I contributed in research of their then mega project of attempt to expand Seoul, South Korea's T-Money transit card system into Chicago. I researched some of the top investors."
//                         ],
//                         "quick_replies": [
//                             {
//                                 "title": "Go back",
//                                 "payload": "back",
//                                 "content_type": "text"
//                             }
//                         ],
//                         "collect": {
//                             "key": "temporary_value",
//                             "options": [
//                                 {
//                                     "default": true,
//                                     "pattern": "default",
//                                     "action": "next"
//                                 },
//                                 {
//                                     "pattern": "back",
//                                     "type": "regex",
//                                     "action": "exp_thread_qr"
//                                 }
//                             ]
//                         }
//                     },
//                     {
//                         "action": "complete"
//                     }
//                 ]
//             },
//             {
//                 "topic": "techStack_thread",
//                 "script": [
//                     {
//                         "text": [
//                             "I am proficient in:"
//                         ],
//                         "quick_replies": [
//                             {
//                                 "title": "JavaScript",
//                                 "payload": "js",
//                                 "content_type": "text"
//                             },
//                             {
//                                 "title": "React/Redux",
//                                 "payload": "react-redux",
//                                 "content_type": "text"
//                             },
//                             {
//                                 "title": "Ruby",
//                                 "payload": "rb",
//                                 "content_type": "text"
//                             },
//                             {
//                                 "title": "Rails",
//                                 "payload": "rails",
//                                 "content_type": "text"
//                             }
//                         ],
//                         "meta": [],
//                         "collect": {
//                             "key": "temporary_value",
//                             "options": [
//                                 {
//                                     "default": true,
//                                     "pattern": "default",
//                                     "action": "next"
//                                 },
//                                 {
//                                     "pattern": "back",
//                                     "type": "regex",
//                                     "action": "main_thread_qr"
//                                 }
//                             ]
//                         }
//                     },
//                     {
//                         "text": [
//                             "And currently learning:"
//                         ],
//                         "quick_replies": [
//                             {
//                                 "title": "Python",
//                                 "payload": "py",
//                                 "content_type": "text"
//                             },
//                             {
//                                 "title": "Deep Learning",
//                                 "payload": "dl",
//                                 "content_type": "text"
//                             },
//                             {
//                                 "title": "React Native",
//                                 "payload": "react-native",
//                                 "content_type": "text"
//                             }
//                         ],
//                         "collect": {
//                             "key": "temporary_value",
//                             "options": [
//                                 {
//                                     "default": true,
//                                     "pattern": "default",
//                                     "action": "next"
//                                 },
//                                 {
//                                     "pattern": "back",
//                                     "type": "regex",
//                                     "action": "main_thread_qr"
//                                 }
//                             ]
//                         }
//                     },
//                     {
//                         "text": [
//                             "You can say 'back' anytime to go back to the previous thread."
//                         ],
//                         "collect": {
//                             "key": "temporary_value",
//                             "options": [
//                                 {
//                                     "default": true,
//                                     "pattern": "default",
//                                     "action": "next"
//                                 },
//                                 {
//                                     "pattern": "back",
//                                     "type": "regex",
//                                     "action": "main_thread_qr"
//                                 }
//                             ]
//                         }
//                     },
//                     {
//                         "action": "complete"
//                     }
//                 ]
//             },
//             {
//                 "topic": "contact_thread",
//                 "script": [
//                     {
//                         "text": [
//                             "You can contact/add me through:"
//                         ],
//                         "quick_replies": [
//                             {
//                                 "title": "LinkedIn",
//                                 "payload": "li",
//                                 "content_type": "text"
//                             },
//                             {
//                                 "title": "Github",
//                                 "payload": "gh",
//                                 "content_type": "text"
//                             },
//                             {
//                                 "title": "AngelList",
//                                 "payload": "al",
//                                 "content_type": "text"
//                             }
//                         ]
//                     },
//                     {
//                         "action": "complete"
//                     }
//                 ]
//             }
//         ],
//         "triggers": [
//             {
//                 "pattern": "hell.*",
//                 "type": "regexp",
//                 "id": "495"
//             },
//             {
//                 "type": "string",
//                 "pattern": "hello"
//             },
//             {
//                 "type": "string",
//                 "pattern": "hey"
//             },
//             {
//                 "type": "string",
//                 "pattern": "hi"
//             },
//             {
//                 "type": "string",
//                 "pattern": "howdy"
//             }
//         ],
//         "variables": [
//             {
//                 "name": "temporary_value",
//                 "type": "string",
//                 "id": 430
//             }
//         ]
//     }
// ];


module.exports = function(controller) {

    // use a function to match a condition in the message
    controller.hears(async (message) => message.text && message.text.toLowerCase() === 'foo', ['message'], async (bot, message) => {
        await bot.reply(message, 'I heard "foo" via a function test');
    });

    // use a regular expression to match the text of the message
    controller.hears(new RegExp(/^\d+$/), ['message','direct_message'], async function(bot, message) {
        await bot.reply(message,{ text: 'I heard a number using a regular expression.' });
    });

    // match any one of set of mixed patterns like a string, a regular expression
    controller.hears(['allcaps', new RegExp(/^[A-Z\s]+$/)], ['message','direct_message'], async function(bot, message) {
        await bot.reply(message,{ text: 'I HEARD ALL CAPS!' });
    });

    controller.hears('typing1','message', async function(bot, message) {
        await bot.reply(message,{
        text: 'This message used the automatic typing delay',
        typing: true,
        });
    });

    controller.hears('typing2','message', async function(bot, message) {
        await bot.reply(message,{
        text: 'This message specified a 4000ms typing delay',
        typingDelay: 4000,
        });
    });
    
    controller.hears(['hello', 'hi', 'yo'], ['message'], async (bot, message) => {
        const greetings = masterArray[0]['script'][0]['script'][0]['text'];
        console.log(greetings);
        const rand = Math.floor(Math.random() * greetings.length)
        await bot.reply(message, greetings[rand]);
        await bot.beginDialog('main_thread');
        return new Promise(resolve => {
            setTimeout(resolve, 1000);
        });
    });

    controller.hears(['main', 'main menu', 'beginning'], ['message'], async (bot, message) => {
        await bot.beginDialog('main_thread_qr');
        return new Promise(resolve => {
            setTimeout(resolve, 600);
        });
    });

    controller.hears(["help"], ['message'], async (bot, message) => {
        const main_thread = masterArray[1]['script']['collect']['options'];
    });
}