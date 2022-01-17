// Constants 
const sequelize = require('../config/connection');
const { User, Post, Comment } = require('../models');

const router = require('express').Router();

 
/** Render homepage and pass posts data to it.
// TODO: We will need to add Best bad post, and best good answer
*/
// router.get('/', (req, res) => {
//     Post.findAll({
//         where: {
//             tag_genre: 'Advice'
//         },
//         attributes: [
//             'id',
//             'post_body',
//             'title',
//             'created_at',
//             'vote_count',
//             'user_id',
//             'tag_genre',
//             'tag_language'
//         ],
//         include: [
//             {
//                 model: User,
//                 attributes: ['username']
//             }
//         ],
//         include: [
//             {
//                 model: Comment,
//                 attributes: ['id', 'comment_body']
//             }
//         ],
//         order: [['vote_count', 'DESC']]
//     })
//     .then(dbAdviceData => {
//         if (!dbAdviceData) {
//             res.status(404).json({ message: 'no post found with this tag genre' });
//             return;
//         }
//         const advicePosts = dbAdviceData.map( post => post.get({ plain: true }));
//         res.render('homepage', {
//             advicePosts,
//             loggedIn: req.session.loggedIn
//         })
//     })
//     .catch(err => {
//         console.log(err);
//         res.status(500).json(err);
//     })
// })
// POST  /   get all Posts
router.get('/', (req, res) => {
   //res.render('homepage');
    Post.findAll({

         //Query config
         attributes: [
            'id', 
            'post_body', 
            'title', 
            'created_at',
            'vote_count',
            'user_id',
            'tag_genre',
            'tag_language'
          ],
          // We could use 
        //  order: [['created_at', 'DESC']],
          include: [
              // TODO: Will most likely need to be adjusted
              {
                model: Comment,
                attributes: [
                  'id', 
                  'comment_body',
                  'post_id',
                  'user_id',
                  'created_at'
                ],
                // Attach the username to the comment
                include: {
                  model:User,
                  attributes: ['username']
                }
  
              },
              {   // User who posted
                  model: User, 
                  attributes: ['username']
              }
          ]

    })
    .then(dbPostData => {
        // serialize the post data
        const posts = dbPostData.map( post => post.get({ plain : true }));
        //TODO: This will need to be changed
        res.render('homepage', {
            posts,
            loggedIn: req.session.loggedIn
        });
    })
    .catch(err => {
        // Server error
        console.log(err);
        res.status(500).json(err);
    });

});

// Redirect to the login page
router.get('/login', (req, res)=> {
    // if they are logged in redirect to a homepage if one exists.
    if (req.session.loggedIn) {
        res.redirect('/');
        return;
    }
    // if not logged in, direct to login
    res.render('login');
});

// Redirect to the Signup page
router.get('/signup', (req, res)=> {
    // if they are logged in redirect to a homepage if one exists.
    if (req.session.loggedIn) {
        res.redirect('/');
        return;
    }
    // if not logged in, direct to signup page.
    res.render('signup');
});

// GET /1      Get post by 1
router.get('/post/:id', (req,res) => {
   
    Post.findOne({
        // TODO: Will have to be redon for sure.
        where: {
            id: req.params.id
        },
        attributes: [

            'id', 
            'post_body', 
            'title', 
            'created_at',
            'vote_count',
            'user_id',
            'tag_genre',
            'tag_language'
           
        ],
        include: [
            {
                model: Comment,
                attributes: [
                    'id', 
                    'comment_body',
                    'post_id',
                    'user_id',
                    'created_at'
                ],
                include: {
                    model: User, 
                    attributes: ['username']

                }
            },
            {
                model: User,
                attributes: ['username']
            }
        ]
    })
    .then(dbPostData => {
        if(!dbPostData) {
            res.status(404).json({ message: 'No post found with this id'});
            return;
        }
        // serialize data
        const post = dbPostData.get({ plain: true });

        // pass data to template
        // also pass if the user is logged in
        res.render('single-post', { 
            post,
            loggedIn: req.session.loggedIn
        
        });
    })
    .catch(err => {
        // Server error
        console.log(err);
        res.status(500).json(err);
    })

    
});



module.exports = router;