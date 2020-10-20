
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
        default:
            break;
    }
}