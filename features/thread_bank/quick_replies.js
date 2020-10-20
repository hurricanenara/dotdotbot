
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
        default:
            break;
    }
}