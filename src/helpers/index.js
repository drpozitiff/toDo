export const sortArticles = (status, articles) =>{
    let tempArticles = articles.slice(0);
    let newArticle = tempArticles.map(article => {
        if (article && article.priority === 'High') {
            article.priorityValue = "1";
        } else if (article && article.priority === 'Medium'){
            article.priorityValue = "2";
        } else if (article && article.priority === 'Low'){
            article.priorityValue = "3";
        } else if (article && article.priority === 'No Priority'){
            article.priorityValue = "4";
        }
        return article.status===status && article;
    });
    return (newArticle
        .filter(function (el) {
            return el !== false;
        })
        .sort(function(objName1, objName2) {
            if (objName1 && objName2) {
                return objName1.priorityValue - objName2.priorityValue;
            } else return 0;
        }));
};

export const getCookie = (cname = 'isAuth') => {
    let value = null;
    let name = cname + '=';
    let ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) === 0) {
            value = c.substring(name.length, c.length);
        }
    }
    return value;
};