import express from "express"
import bodyParser from "body-parser";

var app = express();

var title=null;
var content = null;
var titleArray = [];
var contentArray = [];

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/",(req,res)=>{
    title=null;
    titleArray=[];
    contentArray=[];
    res.render("index.ejs",{blogTitles : titleArray, blogContents: contentArray});
    
})

app.post("/submit", (req,res)=>{
    res.render("blogPage.ejs");
})

app.post("/submit/new", (req,res)=>{
    title = req.body['title'];
    content = req.body['content'];
    if(title != "" && content !=""){
        titleArray.push(title);
        contentArray.push(content);
    }
    console.log(titleArray);
    console.log(contentArray);
    res.render("index.ejs",{blogTitles : titleArray, blogContents: contentArray});
});

app.post("/submit/edit", (req,res)=>{
    title = req.body['title'];
    content = req.body['content'];
    if(title != "" && content !=""){
        titleArray[titleArray.length-1]=title;
        contentArray[contentArray.length-1]=content;
    }
    console.log(titleArray);
    console.log(contentArray);
    res.render("index.ejs",{blogTitles : titleArray, blogContents: contentArray});
});
app.post("/delete",(req,res)=>{
    titleArray.pop();
    contentArray.pop();
    res.render("index.ejs",{blogTitles : titleArray, blogContents: contentArray});
});

app.post("/update",(req,res)=>{
    res.render("blogPage.ejs",{blogTitle : title, blogContent : content} );
})


app.listen(3000, ()=> {
    console.log("3000 go boom");
})