
module.exports =  function quickReplies(type) {
    switch (type) {
        case "main":
            return [
                    {
                        title: 'About',
                        payload: 'about',
                    },
                    {
                        title: 'Education',
                        payload: 'education',
                    },
                    {
                        title: 'Experience',
                        payload: 'experience',
                    },
                    {
                        title: 'Fun Facts',
                        payload: 'fun_facts',
                    },
                    {
                        title: 'Tech Stack',
                        payload: 'tech_stack',
                    },
                    {
                        title: 'Projects',
                        payload: 'projects',
                    },
                    {
                        title: 'Contact',
                        payload: 'contact',
                    }
                ];
        case "experience":
            return [
                    {
                        title: 'Scorpio USA LLC',
                        payload: 'scorpio',
                    },
                    {
                        title: 'SDSM&T',
                        payload: 'sdsmt',
                    },
                    {
                        title: 'BD',
                        payload: 'bd',
                    },
                    {
                        title: 'Samsung C&T',
                        payload: 'samsung',
                    },
                    {
                        title: 'Hanwha E&C',
                        payload: 'hanwha',
                    },
                    {
                        title: 'back',
                        payload: 'back',
                    }
                ];
        case 'fun':
            return [`I lived in four different countries`, `I ate an entire watermelon in one day once`, `I want to learn Chinese!`, `I used to live in South Dakota`]
        case 'edu':
            return [
                    {
                        title: 'What is Industrial Engineering?',
                        payload: 'whatisIE',
                    },
                    {
                        title: 'What are your academic goals?',
                        payload: 'academic_goals',
                    },
                    {
                        title: 'back',
                        payload: 'back',
                    }
                ]
        case 'about':
            return [
                    {
                        title: 'First Line of code',
                        payload: 'first_line',
                    },
                    {
                        title: 'Favorite Game',
                        payload: 'fave_game',
                    },
                    {
                        title: 'Hobbies',
                        payload: 'hobbies',
                    },
                    {
                        title: 'back',
                        payload: 'back',
                    }
                ]
        case 'projects':
            return [
                    {
                        title: 'Quiche (Robinhood Clone)',
                        payload: 'quiche',
                    },
                    {
                        title: 'Oil (d3.js)',
                        payload: 'oil',
                    },
                    {
                        title: 'RPSkill (MERN)',
                        payload: 'rps',
                    },
                    {
                        title: 'back',
                        payload: 'back',
                    }
                ]
        case 'contact':
            return [
                    {
                        title: 'LinkedIn',
                        payload: 'linkedin',
                    },
                    {
                        title: 'Github',
                        payload: 'gh',
                    },
                    {
                        title: 'Email',
                        payload: 'email',
                    },
                    {
                        title: 'back',
                        payload: 'back',
                    }
                ]
        default:
            break;
    }
}