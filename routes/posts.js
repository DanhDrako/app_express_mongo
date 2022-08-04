const express= require('express')
const Posts = require('../models/Posts')
const router= express.Router()

// Load model
const Post= require('../models/Posts')

//Hien thi tat ca cac bai viet
router.get('/',async(req,res)=>{
    const posts= await Post.find().lean().sort({date: -1})
    res.render('posts/index', {posts})
})

//Hien thi form de tao bai viet moi
router.get('/add', (req,res) =>{
    res.render('posts/add')
})

//Tao post moi
router.post('/', async(req,res) =>{
    // console.log(typeof req.body)

    const { title, text } = req.body

    let errors=[]
    if(!title) errors.push({msg: 'Title required'})
    if(!text) errors.push({msg: 'Text required'})
    if(errors.length > 0) res.render('posts/add', {title,text})
    else{
        const newPostData= {title,text}
        const newPost= new Post(newPostData)
        await newPost.save()
        res.redirect('/posts')
    }
})

//Hien thi form de nguoi dung thay doi bai viet
router.get('/edit/:id', async(req,res)=>{
    const post= await Posts.findOne({_id: req.params.id}).lean()
    res.render('posts/edit', {post})
})

//Cap nhat thay doi bai viet vao database
router.put('/:id', async(req,res)=>{
    const{title, text}= req.body
    await Post.findOneAndUpdate({_id: req.params.id}, {title,text})
    res.redirect('/posts')
})

//Xoa bai viet
router.delete('/:id', async(req,res)=>{
    const{title, text}= req.body
    await Post.deleteOne({_id: req.params.id}, {title,text})
    res.redirect('/posts')
})
module.exports= router