const Sequelize = require('sequelize');
const crypto = require('crypto');

const sequelize = new Sequelize('ngblog', 'root', 'example', {
  host: 'blog-mariadb',
  dialect: 'mariadb',
  port: 3306,
});

const User = sequelize.define('user', {
  name: { type: Sequelize.STRING, allowNull: false },
  password: { type: Sequelize.STRING, allowNull: false },
  salt: { type: Sequelize.STRING, allowNull: false },
});

const Article = sequelize.define('article', {
  title: { type: Sequelize.STRING },
  key: { type: Sequelize.STRING },
  date: { type: Sequelize.DATE },
  content: { type: Sequelize.TEXT },
  description: { type: Sequelize.TEXT },
  imageUrl: { type: Sequelize.STRING },
  viewCount: { type: Sequelize.INTEGER },
  published: { type: Sequelize.BOOLEAN }
});

const articlesToSave = [
  {
    title: 'My First Article',
    content:
      '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent nec lectus eu quam semper hendrerit. Nam sed massa in nunc pellentesque vestibulum. Donec justo ipsum, dictum a sapien ac, vestibulum ultricies urna. Nam consectetur libero eu ullamcorper vestibulum. Mauris vulputate tortor ac elit porta, vel scelerisque ante aliquet. Suspendisse ac leo dolor. In pellentesque augue in tortor congue iaculis. Vestibulum in porta nunc. Pellentesque fringilla mi sit amet ligula iaculis varius.</p><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent nec lectus eu quam semper hendrerit. Nam sed massa in nunc pellentesque vestibulum. Donec justo ipsum, dictum a sapien ac, vestibulum ultricies urna. Nam consectetur libero eu ullamcorper vestibulum. Mauris vulputate tortor ac elit porta, vel scelerisque ante aliquet. Suspendisse ac leo dolor. In pellentesque augue in tortor congue iaculis. Vestibulum in porta nunc. Pellentesque fringilla mi sit amet ligula iaculis varius.</p><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent nec lectus eu quam semper hendrerit. Nam sed massa in nunc pellentesque vestibulum. Donec justo ipsum, dictum a sapien ac, vestibulum ultricies urna. Nam consectetur libero eu ullamcorper vestibulum. Mauris vulputate tortor ac elit porta, vel scelerisque ante aliquet. Suspendisse ac leo dolor. In pellentesque augue in tortor congue iaculis. Vestibulum in porta nunc. Pellentesque fringilla mi sit amet ligula iaculis varius.</p>',
    description: 'This is my first article! It\'s great. Please read it.',
    key: 'my-first-article',
    date: new Date(),
    imageUrl: 'http://angular.io/assets/images/logos/angular/angular.png',
    published: true
  },
  {
    title: 'My Second Article',
    content: '',
    description: 'Also a great article.',
    key: 'my-second-article',
    date: new Date(),
    imageUrl: 'http://angular.io/assets/images/logos/angular/angular_solidBlack.png',
    published: false
  },
];

module.exports.init = async () => {
  console.log('init()');
  try {
    await sequelize.authenticate();
    await Article.sync({ force: true });
    articlesToSave.forEach(async (a) => await Article.create(a));
    await User.sync({ force: true });
  } catch (error) {
    console.log('init()', error);
  }
};

// ARTICLES

module.exports.getArticles = async () => {
  console.log('getArticles()');
  try {
    return await Article.findAll({ 
      where: { published: true },
      order: sequelize.literal('date DESC') 
    });
  } catch (error) {
    console.log('getArticles()', error);
    return [];
  }
};

module.exports.getArticleByKey = async (options) => {
  console.log('getArticleByKey(', options, ')');
  try {
    const article = await Article.findOne({ 
      where: { key: options.key, published: true } 
    });
    
    if (article) {
      await article.update({ viewCount: ++article.viewCount });
    }

    return article;
  } catch (error) {
    console.log('getArticleByKey(', options, ')', error);
    return null;
  }
};

// DASHBOARD
module.exports.getDashboardArticles = async () => {
  console.log('getDashboardArticles()');
  try {
    return await Article.findAll({ order: sequelize.literal('date DESC') });
  } catch (error) {
    console.log('getDashboardArticles()', error);
    return [];
  }
};

module.exports.updateArticlePublishState = async (req) => {
  console.log('updateArticlePublishState(', req, ')');
  try {
    const article = await Article.findOne({ 
      where: { id: req.id } 
    });
    if (article) {
      await article.update({ published: req.published });
    }
    return article;
  } catch (error) {
    console.log('updateArticlePublishState(', req, ')', error);
    return null;
  }
};

module.exports.getDashboardArticleByKey = async (req) => {
  console.log('getDashboardArticleByKey(', req, ')');
  try {
    return await Article.findOne({ 
      where: { key: req.key } 
    });
  } catch (error) {
    console.log('getDashboardArticleByKey(', req, ')', error);
    return null;
  }
};

module.exports.putDashboardArticle = async (req) => {
  console.log('putDashboardArticle(', req, ')');
  try {
    const article = await Article.findOne({ 
      where: { id: req.id } 
    });

    if (article) {
      article.update({
        title: req.article.title,
        key: req.article.key,
        date: req.article.date,
        imageUrl: req.article.imageurl,
        description: req.article.description,
        content: req.article.content,
      });
    }

    return article;
  } catch (error) {
    console.log('putDashboardArticle(', req, ')', error);
    return null;
  }
};

module.exports.deleteDashboardArticleById = async (req) => {
  console.log('deleteDashboardArticleById(', req, ')');
  try {
    const article = await Article.findOne({ 
      where: { id: req.id } 
    });

    return await article.destroy();
  } catch (error) {
    console.log('deleteDashboardArticleById(', req, ')', error);
    return null;
  }
}; 

module.exports.createNewDashboardArticle = async (req) => {
  console.log('createNewDashboardArticle(', req, ')');
  try {
    return Article.create({
      title: req.article.title,
      key: req.article.key,
      date: req.article.date,
      imageUrl: req.article.imageurl,
      description: req.article.description,
      content: req.article.content,
    });
  } catch (error) {
    console.log('createNewDashboardArticle(', req, ')', error);
    return null;
  }
}; 

module.exports.addUser = async (req) => {
  return User.create({
    name: req.name.toLowerCase(),
    password: req.password,
    salt: req.salt,
  });
};

module.exports.login = async (req) => {
  const jwtUtil = require('./jwtUtil');

  const user = await User.findOne({
    where: { name: req.name } 
  });
  
  if (user) {
    const hashPass = crypto.pbkdf2Sync(req.password, user.salt, 1000, 64, 'sha512').toString('hex');
  
    if (hashPass === user.password) {
      return { token: jwtUtil.signJwt(user.name) };
    }
  }

  throw new Error('Username or Password is wrong.');
};


// module.exports.init
// module.exports.getArticles
// module.exports.getArticleByKey
// module.exports.getDashboardArticles
// module.exports.updateArticlePublishState
// module.exports.getDashboardArticleByKey
// module.exports.putDashboardArticle
// module.exports.deleteDashboardArticleById
// module.exports.createNewDashboardArticle 
// module.exports.addUser 
// module.exports.login 